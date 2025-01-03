import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const userRegister = catchAsync(async (req, res) => {
  const user = await UserServices.createUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Created Successfully',
    data: user,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const users = await UserServices.getAllUsersFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users Retrieved Successfully',
    data: users,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const user = await UserServices.getSingleUserFromDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Retrieved Successfully',
    data: user,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const user = await UserServices.updateUser(req.params.id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Updated Successfully',
    data: user,
  });
});

const addSkills = catchAsync(async (req, res) => {
  const result = await UserServices.addSkills(req.params.id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Add skill Successfully',
    data: result,
  });
});

const updateSkill = catchAsync(async (req, res) => {
  const { skillId, ...updatedSkill } = req.body;
  const result = await UserServices.updateSkill(
    req.params.id,
    skillId,
    updatedSkill
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Update skill Successfully',
    data: result,
  });
});

const deleteSkill = catchAsync(async (req, res) => {
  const { skillId } = req.body;
  const result = await UserServices.deleteSkill(req.params.id, skillId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Delete skill Successfully',
    data: result,
  });
});

const addEducation = catchAsync(async (req, res) => {
  const result = await UserServices.addEducation(req.params.id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Add Education Successfully',
    data: result,
  });
});

const updateEducation = catchAsync(async (req, res) => {
  const { educationId, ...updateEducation } = req.body;
  const result = await UserServices.updateEducation(
    req.params.id,
    educationId,
    updateEducation
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Update Education Successfully',
    data: result,
  });
});

const deleteEducation = catchAsync(async (req, res) => {
  const { educationId } = req.body;
  const result = await UserServices.deleteEducation(req.params.id, educationId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Delete Education Successfully',
    data: result,
  });
});

const addExperience = catchAsync(async (req, res) => {
  const result = await UserServices.addExperience(req.params.id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Add Expreience Successfully',
    data: result,
  });
});

const updateExperience = catchAsync(async (req, res) => {
  const { experienceId, ...updateExperience } = req.body;
  const result = await UserServices.updateExperience(
    req.params.id,
    experienceId,
    updateExperience
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Update Experience Successfully',
    data: result,
  });
});

const deleteExperience = catchAsync(async (req, res) => {
  const { experienceId } = req.body;
  const result = await UserServices.deleteExperience(
    req.params.id,
    experienceId
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Delete Experience Successfully',
    data: result,
  });
});

export const UserControllers = {
  getSingleUser,
  userRegister,
  getAllUsers,
  updateUser,

  addSkills,
  updateSkill,
  deleteSkill,

  addEducation,
  updateEducation,
  deleteEducation,

  addExperience,
  updateExperience,
  deleteExperience,
};
