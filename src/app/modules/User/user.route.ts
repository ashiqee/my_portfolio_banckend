import express from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-user',
  auth(USER_ROLE.ADMIN),
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.userRegister
);

router.get('/', UserControllers.getAllUsers);
router.get('/:id', UserControllers.getSingleUser);

router.put('/:id', auth(USER_ROLE.ADMIN), UserControllers.updateUser);

router.put(
  '/add-skill',
  auth(USER_ROLE.ADMIN),

  UserControllers.addSkills
);
router.put(
  '/update-skill',
  auth(USER_ROLE.ADMIN),

  UserControllers.updateSkill
);
router.put(
  '/delete-skill',
  auth(USER_ROLE.ADMIN),

  UserControllers.deleteSkill
);

router.put(
  '/add-education',
  auth(USER_ROLE.ADMIN),

  UserControllers.addEducation
);
router.put(
  '/update-education',
  auth(USER_ROLE.ADMIN),

  UserControllers.updateEducation
);
router.put(
  '/delete-education',
  auth(USER_ROLE.ADMIN),

  UserControllers.deleteEducation
);

router.put(
  '/add-experience',
  auth(USER_ROLE.ADMIN),
  UserControllers.addExperience
);
router.put(
  '/update-experience',
  auth(USER_ROLE.ADMIN),
  UserControllers.updateExperience
);
router.put(
  '/delete-experience',
  auth(USER_ROLE.ADMIN),
  UserControllers.deleteExperience
);

export const UserRoutes = router;
