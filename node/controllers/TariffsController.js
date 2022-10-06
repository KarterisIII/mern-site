import TarifModel from '../models/Tarif.js';

export const getAllTariffs = async (req, res) => {
	try {
		const posts = await TarifModel.find()
		res.json(posts)
	}
	catch (err) {
		console.log(err)
		res.status(500).json({
			massege: 'не удалось получить статьи'
		})
	}
}

export const getOneTarif = async (req, res) => {
	try {
		const postId = req.params.id
		
		TarifModel.findOneAndUpdate(
			{
				_id: postId,
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
		)
		
	}
	catch (err) {
		console.log(err)
		res.status(500).json({
			massege: 'не удалось получить статьи'
		})
	}
}

export const updateTarif = async (req, res) => {
	try {
		const postId = req.params.id
		console.log(req.body)
		
		await TarifModel.updateOne(
			{
				_id: postId
			},
			{
				title: req.body.title,
				descri: req.body.descri,
				summ: req.body.summ,
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

export const createTarif = async (req, res) => {
	try {
		const doc = new TarifModel({
			title: req.body.title,
			descri: req.body.descri,
			summ: req.body.summ,
		})

		const tarif = await doc.save()

		res.json(tarif)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			massege: 'не удалось создать пост'
		})
	}
}