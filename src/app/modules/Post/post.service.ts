/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { IPost } from './post.interface';
import { Post } from './post.model';
import { QueryBuilder } from '../../builder/QueryBuilder';
import mongoose from 'mongoose';
import { Request } from 'express';
import { IAuthUser } from '../../interfaces/common';
import { User } from '../User/user.model';
import { log } from 'handlebars';

const createPost = async  (req: Request & { user?: any }) => {

  const exitUser = await User.findOne({ _id: req.user._id });
  console.log(exitUser);
  

  if (!exitUser) {
    throw new Error('User not found');
  }


  let imagesUpload: string[] = [];

  if (Array.isArray(req?.files)) {
    imagesUpload = req.files.map((file: any) => file?.path) || [];
  }


const payload = {
  ...JSON.parse(req.body.data),
  user: req.user._id,
  images: imagesUpload,
}


  const post = await Post.create(payload);

  return post;
};

const getAllPostsFromDB = async (query: Record<string, unknown>) => {
  const postsQuery = new QueryBuilder(Post.find(), query)
    .fields()
    .paginate()
    .filter()
    .search(['postContent', 'category', 'tags'])
    .build();

  const posts = await postsQuery
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
        select: 'name profilePhoto isVerified',
      },
    })
    .populate({
      path: 'user',
      select: 'name profilePhoto isVerified',
    });

  // Sort the posts by the upVotesCount or commentsCount (descending order)
  const sortBy = query.sortBy || 'createdAt';
  
  if (sortBy === 'upVotes') {
    return posts.sort((a, b) => 
      (b.upVotesCount ?? 0) - (a.upVotesCount ?? 0) // Handle undefined by using 0 as default
    );
  } else if (sortBy === 'comments') {
    return posts.sort((a, b) => 
      (b.commentsCount ?? 0) - (a.commentsCount ?? 0) // Handle undefined by using 0 as default
    );
  }

  return posts; // Default: Sort by createdAt if no sortBy is provided
};





// debounce and optimze search 
const searchPosts = async (query: Record<string, unknown>) => {
  try {
    const queryBuilder = new QueryBuilder(Post.find(), query);

    // Build the search query using QueryBuilder
    const postsQuery = queryBuilder
      .search(['postContent', 'category', 'tags'])
      .fields() // Include fields if specified
      .build();

    // Execute the query (either aggregation or find)
    const result = await postsQuery;

    // Format the result
    const formattedResult = result.map((post: any) => ({
      _id: post._id,
      postContent: post?.postContent?.slice(0, 70), // Limit content length
      image: post.images?.[0], // Get the first image
      categories: post?.category,
      tags: post.tags,
    }));

    return formattedResult; // Return the formatted results
  } catch (error) {
   
    throw new Error("Unable to search posts");
  }
};




const getAPostFromDB = async (id: string) => {
  const posts = await Post.findById(id).populate('user');

  return posts;
};



// get post categoris
const getPostCategories = async () => {

   const categories = await Post.distinct('category');

  return categories;
};
// delete post 
const deleteAPostFromDB = async (id: string) => {


  
  const posts = await Post.deleteOne({_id:id});

  return posts;
};

// edit a post

const updateAPostFromDB = async (
  id: string,
  payload:IPost
) => {
  const {postId ,...upPayload } = payload;

 
  if(postId!==id){
      throw new Error("post not found")
  }

  const filteredPayload = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(upPayload).filter(([_, value]) => {
   return value !== null && value !== undefined && 
             (typeof value !== 'string' || value.trim() !== '') && 
             (Array.isArray(value) ? value.length > 0 : true);
    })
  );


  if (Object.keys(filteredPayload).length === 0) {
    throw new Error("No valid fields to update");
  }
  
  const posts = await Post.findOneAndUpdate(
    { _id: id },
    { ...filteredPayload },
    { new: true }
  );

  return posts;
};

const getMyPostFormDB = async (query: Record<string, unknown>, id: string) => {
  try {
    let postsQuery = Post.find({ user: id }).populate(
      'user',
      'name profilePhoto isVerified'
    );

    postsQuery = new QueryBuilder(Post.find(), query).build()

    const posts = await postsQuery.exec();

    return posts;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};



const upvotePost = async (postId: string, userId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const post = await Post.findById(postId).session(session);

    if (!post) {
      throw new Error('Post not found');
    }

    if (post.upVotes.includes(userId)) {
      await Post.updateOne(
        { _id: postId },
        { $pull: { upVotes: userId } },
        { session }
      );
    } else {
      await Post.updateOne(
        { _id: postId },
        {
          $pull: { downVotes: userId },
          $addToSet: { upVotes: userId },
        },
        { session }
      );
    }

    await session.commitTransaction();
    return post;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};

const downVotesPost = async (postId: string, userId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const post = await Post.findById(postId).session(session);

    if (!post) {
      throw new Error('Post not found');
    }

    if (post.downVotes.includes(userId)) {
      await Post.updateOne(
        { _id: postId },
        { $pull: { downVotes: userId } },
        { session }
      );
    } else {
      await Post.updateOne(
        { _id: postId },
        {
          $pull: { upVotes: userId },
          $addToSet: { downVotes: userId },
        },
        { session }
      );
    }

    await session.commitTransaction();
    return post;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};

export const PostServices = {
  createPost,
  getAllPostsFromDB,
  getAPostFromDB,
  getMyPostFormDB,
  upvotePost,
  downVotesPost,
  updateAPostFromDB,
  deleteAPostFromDB,
  searchPosts,
  getPostCategories
};
