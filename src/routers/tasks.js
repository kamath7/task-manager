const express = require('express');
const Tasks = require('../models/Tasks');
const auth = require('../middleware/auth');
const router = new express.Router();

//Tasks module

router.post('/tasks',auth,async(req,res)=>{
    // const task = new Tasks(req.body);
    const task = new Tasks({
        //read about ES6 spread operator
        ...req.body,
        owner: req.user._id
    });
    try{
        await task.save();
        res.status(201).send(task);
    }catch(e){
        res.status(400).send(e);
    }
    // task.save().then(()=>{
    //     res.status(201).send(task);
    // }).catch((e)=>{
    //     res.status(400).send(e);
    // });
});


router.get('/tasks',auth, async (req,res)=>{
    const match ={};
    const sort = {};
    if(req.query.completed){
        match.completed = req.query.completed === 'true';

    }
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc'? -1 : 1;
    }
    try{
        // const tasks = await Tasks.find({owner: req.user._id});
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                //enabling pagination using limit and skip
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        //alternate -> await req.user.populate('tasks').execPopulate();
        res.send(req.user.tasks);

    }catch(e){
        res.status(400).send(e);
    }
    // Tasks.find({}).then((tasks)=>{
    //     res.status(200).send(tasks);
    // }).catch((e)=>{
    //     res.status(500).send(e);
    // });
});

router.get('/tasks/:id',auth,async(req,res)=>{
    const _id = req.params.id;
    try{
        const task = await Tasks.findOne({ _id,owner: req.user._id});
        if(!task){
            res.status(404).send();
        }
        res.send(task);
    }catch(e){
        res.status(500).send(e);
    }
    // Tasks.findById({_id}).then((tasks)=>{
    //     res.status(200).send(tasks);
    // }).catch((e)=>{
    //     res.status(500).send(e);
    // });
});

router.patch('/tasks/:id',auth, async (req,res)=>{
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description","completed"];
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid update!'});
    }

    try{
        const task =  await Tasks.findOne({_id:req.params.id, owner: req.user._id});

        
        // const task = await Tasks.findByIdAndUpdate(_id,req.body,{new : true, runValidators: true});

        if(!task){
            return res.status(400).send();
        }
        updates.forEach((update)=>{
            task[update] = req.body[update];
        });
        await task.save();
         res.send(task);
    }catch(e){
        res.status(400).send(e);
    }
});

router.delete('/tasks/:id',auth, async(req,res)=>{
    try{
        const tasks = await Tasks.findOneAndDelete({_id: req.params.id, owner: req.user._id});
       
        if(!tasks){
            res.status(404).send()
        }
        res.send(tasks);
    }catch(e){
        res.status(500).send(e);
    }
});

module.exports = router;