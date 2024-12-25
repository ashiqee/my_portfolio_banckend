import { Document, ObjectId } from "mongoose";

// Post Interface
export interface IProject extends Document {
  user: ObjectId;
  postContent?: string;
  video?: string;
  images?: string[];
  isPremium: boolean;
  upVotes: string[]; 
  downVotes: string[]; 
  comments: IComment[];
  tags?: string[];
  category: string;
  postId?:string;
  upVotesCount?: number;
  commentsCount?: number;
  downVotesCount?: number;
  
}

export interface IReplies extends Document  {
  userId?:ObjectId;
  replyText:string;
}
// Comment Interface
export interface IComment extends Document {
  user: ObjectId;
  post: ObjectId;
  commentText: string;
  replies?: IReplies[];
 }

