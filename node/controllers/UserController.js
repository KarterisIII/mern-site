import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import userModal from '../models/User.js'


export const register = async (req, res) => {	
	try { 	

		const password = req.body.password;
		const salt = await bcrypt.genSalt(10)
		const passwordH = await bcrypt.hash(password, salt)

		const doc = new userModal({
			email: req.body.email,
			fullName: req.body.fullName,
			passwordHash: passwordH,
			avatarUrl: req.body.avatarUrl,
		})

		const user = await doc.save()

		const token = jwt.sign(
			{
				_id: user._id,
			},
			'secret123',
			{
				expiresIn: '30d'
			}
		)

		const { passwordHash, ...userData} = user._doc

		res.json({
			...userData,
			token,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			massege: 'не удалось зарегистрироваться'
		})
	}	
}

export const login = async (req, res) => {
	try {
		const user = await userModal.findOne({email: req.body.email})

		if(!user) {
			return res.status(404).json({				
				parent: 'email',
				message: 'Не верный email'
			})
		}

		const isVlidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)

		if (!isVlidPass) {
			return res.status(404).json({
				parent: 'password',
				message: 'Неверный пароль'
			})
		}

		const token = jwt.sign(
			{
				_id: user._id,
			},
			'secret123',
			{
				expiresIn: '30d'
			}
		)

		const { passwordHash, ...userData} = user._doc

		res.json({
			...userData,
			token,
		})
	}
	catch (err) {
		console.log(err)
		res.status(500).json({
			massege: 'не удалось авторизоваться'
		})
	}
}

export const infoAboutMe = async (req, res) => {
	try {
		const user = await userModal.findById(req.userId)

		if (!user) {
			return res.status(404).json({
				message: 'Пользователь не найден'
			})
		}

		const { passwordHash, ...userData} = user._doc

		res.json(userData)
	} catch (err) {
		
		res.status(500).json({
			massege: 'не удалось что-то'
		})
	}
}

