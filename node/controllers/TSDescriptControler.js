import TSDescriptModal from '../models/TSDescript.js';
import TeamServicesModal from '../models/TeamServices.js';

export const createTSDescript= async (req, res) => {
	try {

		const { postId, descript} =req.body

		const teamServeces = await TeamServicesModal.findById(postId)

		if(!teamServeces) return res.status(400).json({msg: "токого не существует"})

		const doc = new TSDescriptModal({
			descript: descript
		})

		await TeamServicesModal.findByIdAndUpdate({_id: postId},{
			$push: {descript: doc._id}
		}, {new: true})

		const tSDescript = await doc.save()

		res.json(tSDescript)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			massege: 'не удалось создать сервисы '
		})
	}
}

export const getOneTSDescript = async (req, res) => {
	try {
		const postId = req.params.id
		
		TSDescriptModal.findOneAndUpdate(
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

export const updateTSDescript = async (req, res) => {
	try {
		const postId = req.params.id		
		
		await TSDescriptModal.updateOne(
			{
				_id: postId
			},
			{
				descript: req.body.descript				
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