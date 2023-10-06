const router = require('express').Router();

const Schema = require('../model/ToDoListSchema');


router.post('/post/item', async (req, res) => {
    try{
        const {item} = req.body;
        const newToDo = new Schema({
            item
        });
        const result = await newToDo.save();
        console.log(result);
        res.json(result);
    }
    catch(err){
        res.json({message: err});
    }
})

router.get('/get/item', async (req, res) => {
    try{
        const result = await Schema.find();
        res.json(result);
    }
    catch(err){
        res.json({message: err});
    }
})

router.put('/update/item/:id', async (req, res) => {
    try{
        const result = await Schema.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.json(result);
    }
    catch(err){
        console.log(err);
        res.json({message: err});
    }
})

router.delete('/delete/item/:id', async (req, res) => {
    try{
        const result = await Schema.findByIdAndDelete(req.params.id);
        res.json("Deleted item");
    }
    catch(err){
        res.json({message: err});
    }
})

module.exports = router;