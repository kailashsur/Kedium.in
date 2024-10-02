import mongoose from 'mongoose';
import { Schema, Document } from "mongoose";





const activitySchema = new mongoose.Schema({
    post_id : {
        type : Schema.Types.ObjectId,
        ref : 'posts',
        required : true,
    },
    slug : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
    },
    likes : {
        type : [Schema.Types.ObjectId],
        default : [],
    },
    comments : {
        type : [Schema.Types.ObjectId],
        default : [],
    },
},{
    timestamps : true,
})


const Activity = mongoose.model('Activity', activitySchema);
export default Activity;