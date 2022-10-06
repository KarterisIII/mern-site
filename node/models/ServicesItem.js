import mongoose from 'mongoose';

const ServicesItemSchema = new mongoose.Schema(
	{
		title: {
			type: String,
		},	
		descript:  {
			type: String,
		},
		imageUrl: String		
	},
	{
		timestamps: true,
	},
)

export default mongoose.model('ServicesItem', ServicesItemSchema)