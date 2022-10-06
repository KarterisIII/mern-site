import TeamServicesModal from '../models/TeamServices.js'

export const createTeamServices = async (req, res) => {
	try {

		const doc = new TeamServicesModal({
			title: req.body.title,
			summ: req.body.summ,
		})

		const teamServeces = await doc.save()

		res.json(teamServeces)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			massege: 'не удалось создать сервисы '
		})
	}
}

export const getOneTeamServices = async (req, res) => {
	try {
		const postId = req.params.id
		
		TeamServicesModal.findOneAndUpdate(
			{
				_id: postId,
			},
			{
				returnDocument: 'after',
			},
			(err, doc) => {
				if (err) {
					console.log(err)
					return res.status(400).json({
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

export const updateTeamServices = async (req, res) => {
	try {
		const postId = req.params.id
		
		await TeamServicesModal.updateOne(
			{
				_id: postId
			},
			{
				title: req.body.title,
				summ: req.body.summ,				
			}
		)
		res.json({
			success: true,
		})
		
	} catch (err) {
		console.log(err)
		res.status(500).json({
			massege: 'Не удалось обновить сервис'
		})
	}
}

export const getAllTeamServices = async (req, res) => {
	try {
		const teamServices = await TeamServicesModal.find().populate('descript')
		res.json(teamServices)
	}
	catch (err) {
		console.log(err)
		res.status(500).json({
			massege: 'не удалось получить статьи'
		})
	}
}