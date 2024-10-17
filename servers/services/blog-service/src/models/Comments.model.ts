import mongoose, { Schema } from "mongoose";




export interface CommentType extends mongoose.Document{
    _id : Schema.Types.ObjectId;
    comment : string;
    author : Schema.Types.ObjectId;
    post_id : Schema.Types.ObjectId;
    likes : number;
    dislikes : number;
    parent_id : Schema.Types.ObjectId;
    replies : Schema.Types.ObjectId[];
    createdAt : Date;
    updatedAt : Date;
}




const commentSchema = new mongoose.Schema({


    post_id : {
        type : Schema.Types.ObjectId,
        ref : "Blog",
        required : true
    },

    comment : {
        type : String,
        required : true
    },
    author : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    }, 
    likes : {
        type : Number,
        default : 0
    },  
    dislikes : {
        type : Number,
        default : 0
    },
    parent_id : {
        type : Schema.Types.ObjectId,
        ref : "Comment",
        default : null
    },  
    replies : [{
        type : Schema.Types.ObjectId,
        ref : "Comment",
        default : null
    }], 

},{
    timestamps : true
});


const Comment = mongoose.model('Comments', commentSchema);
export default Comment;