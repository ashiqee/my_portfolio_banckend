import express from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/User/user.route';
import { ProfileRoutes } from '../modules/Profile/profile.route';
import {  ProjectPostRoutes } from '../modules/ProjectPost/post.route';
import { FollowRoutes } from '../modules/Follow/follow.route';
import { CommentsRoutes } from '../modules/Comment/comment.route';
import { PaymentRoutes } from '../modules/Payment/payment.route';
import { BlogPostRoutes } from '../modules/BlogPost/post.route';


const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/profile',
    route: ProfileRoutes,
  },
  {
    path: '/posts',
    route: ProjectPostRoutes,
  },
  {
    path: '/blogs',
    route: BlogPostRoutes, // Use BlogPostRoutes,
  },
  {
    path: '/follow',
    route: FollowRoutes,
  },
  {
    path: '/comments',
    route: CommentsRoutes,
  },
  {
    path: '/payment',
    route: PaymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
