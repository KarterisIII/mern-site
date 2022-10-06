import mongoose from 'mongoose';


const TeamServecesSchema = new mongoose.Schema(
	{
		title: {
			type: String,
		},
		summ: {
			type: String,
		},		
		descript: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'TSDescript',
		}],		
	},
	{
		timestamps: true,
	},
)

export default mongoose.model('TeamServeces', TeamServecesSchema)