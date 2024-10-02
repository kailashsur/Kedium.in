import mongoose from "mongoose";






const commentSchema = new mongoose.Schema({

    post_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'posts',
        required : true,
    },

    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required : true,
    },

    comment : {
        type : String,
        required : true,
        trim : true,
    },

},{
    timestamps : true
});


const Comment = mongoose.model('Comments', commentSchema);
export default Comment;