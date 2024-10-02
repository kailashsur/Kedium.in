import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  slug : {
    type : String,
    required : true,
    unique : true,
    lowercase : true,
    trim : true,
    index : true
  },
  title : {
    type : String,
    required : true,
    trim : true,
    lowercase : true,
  },
  thumbnail : {
    type : String,
    trim : true,
    default : null,
  },
  description : {
    type : String,
    maxlength : 200,
    trim:true,
    default : null,
  },
  content : {
    type : String,
    default : null,
  },
  tags : {
    type : [String],
    default : [],
  },
  category : {
    type : String,
    trim : true,
    lowercase : true,
  },

  author : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'users',
    required : true,
  },

  activity : {
    likes : {
      type : Number,
      default : 0,
    },
    comments : {
      type : Number,
      default : 0,
    },
    views : {
      type : Number,
      default : 0,
    }
  },

  draft : {
    type : Boolean,
    default : true,
  },


},{
  timestamps : {
    createdAt : 'publishedAt',
    updatedAt : 'updatedAt',
  }
});

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
