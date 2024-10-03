const UserModel = require('../models/userModel')

class UsersController {
	async getAllUsers(req, res) {
		try {
			let users = await UserModel.find({
				name: new RegExp(req.query.search, 'i')
			});

			if ('notification' in req.query) {
				if (req.query.notification && req.query.notification.length) {
					let arr = req.query.notification.split(',')
					users = users.filter(item => arr.includes(item._id.toString()))
				} else {
					users = []
				}
			}

			if ('requests' in req.query) {
				if (req.query.requests && req.query.requests.length) {
					let arr = req.query.requests.split(',')
					users = users.filter(item => arr.includes(item._id.toString()))
				} else {
					users = []
				}
			}

			if ('friends' in req.query) {
				if (req.query.friends && req.query.friends.length) {
					let arr = req.query.friends.split(',')
					users = users.filter(item => arr.includes(item._id.toString()))
				} else {
					users = []
				}

			}

			users = Array.from(users).filter((item) => item.login !== req.query.not)

			res.json(users)
		} catch (e) {
			res.status(400).json({ message: 'Произошла ошибка при получении' })
		}
	}

	async login(req, res) {

		try {
			const doc = new UserModel({
				phone: req.body.phone,
				login: req.body.login,
				birthday: req.body.birthday,
				city: req.body.city,
				gender: req.body.gender,
				name: req.body.name,
				surname: req.body.surname,
				password: req.body.password,
				userType: req.body.userType,
			})

			const log = await UserModel.findOne({ login: req.body.login })
			const pass = await UserModel.findOne({ password: req.body.password })
			const user = log._doc

			if (!log || !pass) {
				return res.status(400).json({ message: 'Такого аккаунта не существует' })
			}

			res.json(user)
		} catch (err) {
			console.log(err)
			res.status(400).json({ message: 'Не удалось войти' })
		}
	}

	async getMe(req, res) {
		try {
			const userId = req.body.id
			const user = await UserModel.findById(userId)

			if (!user) {
				return res.status(400).json({ message: 'Пользователь не найден' })
			}
			res.json(user)
		} catch (err) {
			console.log(err)
			res.status(400).json({ message: 'Нет доступа' })
		}
	}
	async addPost(req, res) {
		try {
			const userId = req.params.id
			const user = await UserModel.findById(userId)

			const userModel = await UserModel.findByIdAndUpdate({ _id: userId }, { posts: [req.body, ...user.posts] }, { returnDocument: 'after' })

			await userModel.save()

			res.json(userModel)
		} catch (e) {
			res.status(400).json({ message: 'Произошла ошибка при добавлении' })
		}
	}

	async addComment(req, res) {
		try {
			const userId= req.params.id
			const user = await UserModel.findById(userId)
			const postID = req.body.postId

			const userModel = await UserModel.findByIdAndUpdate({ _id: userId }, { comments: [...user.comments, req.body] }, { returnDocument: 'after' })

			await userModel.save()

			res.json(userModel)

		} catch (e) {
			res.status(400).json({ message: 'Произошла ошибка при добавлении' })
		}
	}

	async deletePost(req, res) {
		try {
			const postId = req.body.postId;
			const userId= req.params.id
			const user = await UserModel.findById(userId)

			const postComments = user.comments.filter(item=> item.postId !== postId)

			const userModel = await UserModel.findByIdAndUpdate({ _id: userId }, { posts: user.posts.filter(item=> item.id !== postId) }, { returnDocument: 'after' })

			await userModel.save() 

			const commentsModel = await UserModel.findByIdAndUpdate({ _id: userId }, { comments: postComments}, { returnDocument: 'after' })

			await commentsModel.save() 

			res.json(user)
		} catch (e) {
			res.status(400).json({ message: 'Произошла ошибка при удалении' })
		}
	}

	async register(req, res) {
		try {
			const doc = new UserModel({
				phone: req.body.phone,
				login: req.body.login,
				birthday: req.body.birthday,
				city: req.body.city,
				gender: req.body.gender,
				name: req.body.name,
				surname: req.body.surname,
				password: req.body.password,
				userType: req.body.userType,
			})

			const user = await doc.save()

			res.json(user)

		} catch (err) {
			console.log(err)
			res.status(400).json({
				message: 'Не удалось зарегистрироваться'
			})
		}
	}
	async sendRequest(req, res) {
		try {

			const userId = req.params.id
			const userIdGet = req.body.requests

			let user = await UserModel.findById(userId)
			let userGet = await UserModel.findById(userIdGet)

			const notification = await UserModel.findByIdAndUpdate({ _id: userIdGet }, { notification: [...userGet.notification, userId] }, { returnDocument: 'after' })

			await notification.save()

			const request = await UserModel.findByIdAndUpdate({ _id: userId }, { requests: [...user.requests, userIdGet] }, { returnDocument: 'after' })

			await request.save()

			res.json(request)
		} catch (err) {
			console.log(err)
			res.status(400).json({ message: 'Не удалось отправить заявку' })
		}
	}
	async acceptRequest(req, res) {
		try {
			const userId = req.body.recieverId
			const user = await UserModel.findById(userId)

			const senderId = req.body.senderId
			const sender = await UserModel.findById(senderId)

			const addFriend = await UserModel.findByIdAndUpdate(
				{ _id: senderId },
				{
					requests: sender.requests.filter(item => item !== userId),
					friends: [...sender.friends, userId]
				},
				{ returnDocument: 'after' }
			)
			await addFriend.save()

			const accept = await UserModel.findByIdAndUpdate(
				{ _id: userId },
				{
					notification: user.notification.filter(item => item !== senderId),
					friends: [...user.friends, senderId]
				},
				{ returnDocument: 'after' }
			)
			await accept.save()

			res.json(accept)
		} catch (err) {
			console.log(err)
			res.status(400).json({ message: 'Не удалось отправить заявку' })
		}
	}
}

module.exports = new UsersController