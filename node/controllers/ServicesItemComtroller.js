import ServicesItem from '../models/ServicesItem.js';

export const getAllServicesItem = async (req, res) => {
	try {
		const posts = await ServicesItem.find().populate('user').exec();
		res.json(posts)
	}
	catch (err) {
		console.log(err)
		res.status(500).json({
			massege: 'не удалось получить услуги'
		})
	}
}

export const removeServicesItem = async (req, res) => {
	try {
		const postId = req.params.id

		ServicesItem.findOneAndDelete(
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

export const updateServicesItem = async (req, res) => {
	try {
		const postId = req.params.id
		
		await ServicesItem.updateOne(
			{
				_id: postId
			},
			{
				title: req.body.title,
				text: req.body.text,
				imageUrl: req.body.imageUrl,
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

export const createServicesItem = async (req, res) => {
	try {
		const doc = new ServicesItem({
			title: req.body.title,
			text: req.body.text,
			imageUrl: req.body.imageUrl,
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