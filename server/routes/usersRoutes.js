const { Router } = require("express");
const usersController = require('../controllers/usersController')

const usersRoutes = new Router()

usersRoutes.get('/list', usersController.getAllUsers)
usersRoutes.post('/list/:id', usersController.getMe)
usersRoutes.post('/:id/add', usersController.addPost)
usersRoutes.delete('/:id/delete', usersController.deletePost)
usersRoutes.post('/:id/comment/add', usersController.addComment)
usersRoutes.post('/auth/login', usersController.login)
usersRoutes.post('/auth/register',  usersController.register )
usersRoutes.put('/list/request/add',  usersController.acceptRequest )
usersRoutes.put('/list/request/:id',  usersController.sendRequest )

module.exports = usersRoutes