import SlideModel from '../models/SlidePost.js'

export const getAllSlidePosts = async (req, res) => {
	try {
		const posts = await SlideModel.find().populate('user').exec();
		res.json(posts)
	}
	catch (err) {
		console.log(err)
		res.status(500).json({
			massege: 'не удалось получить статьи'
		})
	}
}

export const getOneSlidePost = async (req, res) => {
	try {
		const postId = req.params.id
		SlideModel.findOneAndUpdate(
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

export const removeSlidePost = async (req, res) => {
	try {
		const postId = req.params.id

		SlideModel.findOneAndDelete(
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

export const updateSlidePost = async (req, res) => {
	try {
		const postId = req.params.id

		await SlideModel.updateOne(
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

export const createSlidePost = async (req, res) => {
	try {
		const doc = new SlideModel({
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