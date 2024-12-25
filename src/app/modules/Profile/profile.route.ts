import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { ProfileController } from './profile.controller';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middlewares/bodyParser';

const router = express.Router();

router.get(
    '/',
    auth(USER_ROLE.ADMIN, USER_ROLE.USER),
    ProfileController.getMyProfile
);

router.get(
    '/:id',
    auth(USER_ROLE.ADMIN, USER_ROLE.USER),
    ProfileController.getOtherProfileFromDB
);

router.put(
    '/',
    auth(USER_ROLE.ADMIN, USER_ROLE.USER),
    multerUpload.single('profilePhoto'),
    parseBody,
    ProfileController.updateMyProfile
)


router.post(
    '/subcribe',
    auth(USER_ROLE.ADMIN, USER_ROLE.USER),
      ProfileController.createPremiumUser
)

export const ProfileRoutes = router;