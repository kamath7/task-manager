const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');
const mongoose = require('mongoose');
const Task = require('../../src/models/Tasks');
const userOneId = new mongoose.Types.ObjectId();

const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: 'Twat123$',
    tokens: [{
        token: jwt.sign({_id: userOneId},process.env.JWT_SECRET)
    }]
};

const userTwoId = new mongoose.Types.ObjectId();

const userTwo = {
    _id: userTwoId,
    name: 'Raven',
    email: 'raven@example.com',
    password: 'Mycar123$',
    tokens: [{
        token: jwt.sign({_id: userTwoId},process.env.JWT_SECRET)
    }]
};

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description :'Eat idli',
    completed: false,
    owner: userOne._id
};
const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description :'Eat dosa',
    completed: true,
    owner: userOne._id
};
const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description :'Eat vada',
    completed: true,
    owner: userTwo._id
};
const setupDatabase = async ()=>{
    await User.deleteMany();
    await Task.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();

};

module.exports = {
    userOneId,
    userOne,
    setupDatabase,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree
};