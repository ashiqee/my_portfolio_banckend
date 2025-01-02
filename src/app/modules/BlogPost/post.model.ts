import mongoose, { Schema } from 'mongoose';
import { IComment, ILink, IPost, IReplies } from './post.interface';



const replySchema = new Schema<IReplies>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      
   },
    replyText: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


// comment Schema
const commentSchema = new Schema<IComment>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    commentText: {
      type: String,
      required: true,
    },
    replies: [replySchema] ,
  },
  {
    timestamps: true,
    virtuals: true,
  }
);
const linkSchema = new Schema<ILink>(
  {
    label: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
  },
  
  
);

// Post Schemaa

const blogPostSchema = new Schema<IPost>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  category:{
    type: String,
  },
  
  tags:{
    type: [String],
  },
  startDate: { type: Date},
  endDate: { type: Date },
  links: [linkSchema],
  video: { type: String },
  images: [{ type: String }],
  isPremium: { type: Boolean, default: false },
  upVotes: [{ type: [String],  }],
  downVotes: [{ type: [String],  }],
  comments: [commentSchema],
},
{
  timestamps: true,
  toJSON: { virtuals: true }, 
  toObject: { virtuals: true },
}
);
// Add virtual field for upVotes count
blogPostSchema.virtual('upVotesCount').get(function () {
  return this.upVotes.length;
});

// Add virtual field for comments count
blogPostSchema.virtual('commentsCount').get(function () {
  return this.comments.length;
});

// Add virtual field for downVotes count (optional if needed)
blogPostSchema.virtual('downVotesCount').get(function () {
  return this.downVotes.length;
});

blogPostSchema.pre('find', function (next) {
  this.sort({ createdAt: -1 }); // Default sort by createdAt (newest first)
  next();
});

blogPostSchema.pre('findOne', function (next) {
  this.sort({ createdAt: -1 }); // Default sort by createdAt (newest first) for findOne as well
  next();
});

export const BlogPost = mongoose.model<IPost>("Blogs", blogPostSchema);
export const Comment = mongoose.model<IComment>("Comment",commentSchema);