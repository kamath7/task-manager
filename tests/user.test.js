const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/user');

const {userOneId,userOne,setupDatabase} = require('./fixtures/db');
beforeEach(setupDatabase);

test('Should signup a new user', async()=>{
    const response =await request(app).post('/users').send({
        name: 'Kams',
        email:'kamathapp7@gmail.com',
        password: 'LmaoRofl123'
    }).expect(201);

    //Assert that db was changed correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    //assertions on response
    expect(response.body).toMatchObject({
        user:{
            name: 'Kams',
            email: 'kamathapp7@gmail.com'
        },
        token: user.tokens[0].token
    });
    expect(user.password).not.toBe('LmaoRofl123');
});

test('Should be able to login existing user',async()=>{
    const response = await request(app).post('/users/login').send({
        email:userOne.email,
        password: userOne.password
    }).expect(200);
    const user = await User.findById(userOneId);

    expect(response.body.token).toBe(user.tokens[1].token);
});
test('Should not login non-existant user',async ()=>{
    await request(app).post('/users/login').send({
        email: 'dumbdum@dum.com',
        password: 'pass@123'
    }).expect(400);
});
test('Fetch user profile',async ()=>{
    await request(app)
        .get('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test('Should not get profile for unauthenticated user',async()=>{
    await request(app)
        .get('/users/me')
        .send()
        .expect(401);
});

test('Should delete account user',async()=>{
   await request(app)
         .delete('/users/me')
         .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
         .send()
         .expect(200);

    const user = await User.findById(userOneId);
    expect(user).toBeNull();

});
test('Should not delete user for unauthenticated user', async()=>{
    await request (app)
        .delete('/users/me')
        .send()
        .expect(401);
});

test('Should upload avatar', async()=>{
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .attach('avatar','tests/fixtures/profile-pic.jpg')
        .expect(200);
        
    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer)); //checking if avatar is a buffer
});

test('Should update valid user updated',async()=>{
    await request(app)
        .patch('/users/me')
        .send({
            name: 'Jessica'
        })
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .expect(200);
    
    const user = await User.findById(userOneId);
    expect(user.name).toEqual('Jessica');
        
});
test('Should not create ivalid user updates',async()=>{
    await request(app)
        .patch('/users/me')
        .send({
            location: 'Dubai'
        })
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .expect(400);
});