import mongoose from 'mongoose';


const TSDescriptSchema = new mongoose.Schema(
	{
		descript: {
			type: String,
			required: true,
		},
		postId: mongoose.Types.ObjectId
	},

	{
		timestamps: true,
	},
)

export default mongoose.model('TSDescript', TSDescriptSchema)