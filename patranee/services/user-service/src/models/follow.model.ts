

import mongoose, { Schema, Document } from 'mongoose';
import 'dotenv/config';
import { FollowType } from '../Types';


const followSchema = new Schema<FollowType>({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    following: {
        type : [Schema.Types.ObjectId],
        ref : 'users',
        default : []
    },
    followers: {
        type : [Schema.Types.ObjectId],
        ref : 'users',
        default : []
    },
    following_count: {
        type: Number,
        default: 0,
    },
    followers_count: {
        type: Number,
        default: 0,
        
    },


}, {
    timestamps: {
        createdAt: "joinedAt",
    },
},);


const Follow = mongoose.model<FollowType>('Follow', followSchema);
export default Follow;
