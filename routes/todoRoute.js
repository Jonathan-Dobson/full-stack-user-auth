const express = require('express')
const Todo = require('../models/todoSchema')

const todoRouter = express.Router()

todoRouter.route('/')
.get((req, res)=>{
    Todo.find({},(err, todoResult) => {
        if(err){
            res.status(500)
            res.send(err)
        }
        res.status(200)
        res.send(todoResult)
    }
    )
})
.post((req, res)=>{
    const newTodo = new Todo(req.body)
    newTodo.save((err, savedTodo) => {
        if(err){
            res.status(500)
            res.send(err)
        }
        res.status(201)
        res.send(savedTodo)
    }
    )
})
todoRouter.route('/:_id')
.put((req, res) => {
    Todo.findByIdAndUpdate(
        req.params._id, 
        req.body,
        {new: true},
        (err, todoResult) => {
            if (err) return res.status(500).send(err);
            return res.send(todoResult);
        })
    }
)
.delete((req, res) => {
    Todo.findByIdAndDelete(
        req.params._id,
        {},
        (err, deletedTodo) => {
            if (err) return res.status(500).send(err)
            return res.send(`Deleted ${deletedTodo}`)
        }
    )}
)

module.exports = todoRouter