// blogs: {
//     type: [ Schema.Types.ObjectId ],
//     ref: 'blogs',
//     default: [],
// }


import mongoose, { Schema } from "mongoose";

const topicSchema = mongoose.Schema({
    title : {
        type : String,
        maxlength: 200,
        required: true
    },


}, 
{ 
    timestamps: {
        createdAt: 'publishedAt',
        timestamps: true,
		versionKey: false,
    } 

})

export default mongoose.model("Topic", topicSchema);
