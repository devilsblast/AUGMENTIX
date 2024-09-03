const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./models/todo')



const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://tushar:test123@assginment.zth8u.mongodb.net/todos')

//get
app.get('/get',(req, res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})



//post
app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    
    .catch(err => res.json(err))
})

//put
app.put('/update', (req, res) =>{
const{id, done}= req.body 
      
  TodoModel.findByIdAndUpdate({_id: id}, {done: !done})
    .then(result => res.json(result))
   .catch(err => res.json(err)) 
})


//delete
app.delete('/delete/:id', (req, res) =>{
    const {id} = req.params
          
      TodoModel.findByIdAndDelete({_id: id})
        .then(result => res.json(result))
       .catch(err => res.json(err)) 
    })

app.listen(3001, () => {
    console.log("Server is running")
})



app.put('/updatetodo', (req, res) =>{
    const{id, task}= req.body 
    console.log(req.body)
          
      TodoModel.findByIdAndUpdate({_id: id}, {task: task})
        .then(result => res.json(result))
       .catch(err => res.json(err)) 
    })















