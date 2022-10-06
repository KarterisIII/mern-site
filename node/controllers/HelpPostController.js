import HelpModel from '../models/HelpPost.js'


export const getAllHelpPosts = async (req, res) => {
	try {
		const posts = await HelpModel.find().populate('user').exec();
		res.json(posts)
	}
	catch (err) {
		console.log(err)
		res.status(500).json({
			massege: 'не удалось получить статьи'
		})
	}
}

export const getOneHelpPost = async (req, res) => {
	try {
		const postId = req.params.id
		HelpModel.findOneAndUpdate(
			{
				_id: postId,
			},
			{
				$inc: {viewsCount: 1}
			},
			{
				returnDocument: 'after',
			},
			(err, doc) => {
				if (err) {
					console.log(err)
					return res.status(500).json({
						massege: 'не удалось получить статью без причины'
					})
				}

				if (!doc) {
					return res.status(404).json({
						message: 'Статья не найдена'
					})
				}
				res.json(doc)
			}
		).populate('user')
		
	}
	catch (err) {
		console.log(err)
		res.status(500).json({
			massege: 'не удалось получить статьи'
		})
	}
}

export const removeHelpPost = async (req, res) => {
	try {
		const postId = req.params.id

		HelpModel.findOneAndDelete(
			{
				_id: postId,
			},
			(err, doc) => {
				if (err) {
					console.log(err)
					res.status(500).json({
						massege: 'не удалось удалить пост почему-то'
					})
				}

				if (!doc) {
					return res.status(404).json({
						message: 'Статья не найдена'
					})
				}
				
				res.json({
					success: true
				})
			}
		)
		
	} catch (err) {
		console.log(err)
		res.status(500).json({
			massege: 'не удалось удалить пост'
		})
	}
}

export const updateHelpPost = async (req, res) => {
	try {
		const postId = req.params.id

		await HelpModel.updateOne(
			{
				_id: postId
			},
			{
				title: req.body.title,
				text: req.body.text,
				imageUrl: req.body.imageUrl,
				user: req.userId
			}
		)
		res.json({
			success: true,
		})
		
	} catch (err) {
		console.log(err)
		res.status(500).json({
			massege: 'Не удалось обновить статью'
		})
	}
}

export const createHelpPost = async (req, res) => {
	try {
		const doc = new HelpModel({
			title: req.body.title,
			text: req.body.text,
			imageUrl: req.body.imageUrl,
			user: req.userId
		})

		const post = await doc.save()

		res.json(post)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			massege: 'не удалось создать пост'
		})
	}
}