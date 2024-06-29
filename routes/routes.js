const express = require('express');
const {registerUser, loginUser, addTodo, deleteTodo, updateTodo, getTodo} = require('../controller/controller');

const router = express.Router()

router.post('/user/register', registerUser)

router.post('/user/login', loginUser)

router.post('/user/add-task', addTodo)

router.get('/user/get-todo', getTodo)

router.delete('/user/delete-task/:id', deleteTodo)

router.put('/user/update-task', updateTodo)
module.exports = router;