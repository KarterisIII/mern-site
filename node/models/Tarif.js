import mongoose from 'mongoose';


const TarifSchema = new mongoose.Schema(
	{
		title: {
			type: String,
		},
		descri: {
			type: String,
		},
		summ: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
)

export default mongoose.model('Tarif', TarifSchema)