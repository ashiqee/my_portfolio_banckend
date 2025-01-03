import { QueryBuilder } from '../../builder/QueryBuilder';
import { UserSearchableFields } from './user.constant';
import { TEducation, TExperience, TSkills, TUser } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: TUser) => {
  const user = await User.create(payload);

  return user;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const users = new QueryBuilder(User.find(), query)
    .fields()
    .paginate()
    .sort()
    .filter()
    .search(UserSearchableFields);

  const result = await users.modelQuery;

  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const user = await User.findById(id).populate("follow followers","name profilePhoto");

  return user;
};


const updateUser = async (id: string, payload: Partial<TUser>) => {
  const user = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return user;
};


// Add skills, education, or experience
export const addSkills = async (id: string, skills: TSkills[]) => {
  const user = await User.findOneAndUpdate(
    { _id: id },
    { $push: { skills: { $each: skills } } },
    { new: true }
  );
  return user;
};

export const addEducation = async (id: string, education: TEducation) => {
  const user = await User.findOneAndUpdate(
    { _id: id },
    { $push: { education } },
    { new: true }
  );
  return user;
};

export const addExperience = async (id: string, experience: TExperience) => {
  const user = await User.findOneAndUpdate(
    { _id: id },
    { $push: { experience } },
    { new: true }
  );
  return user;
};

// Update specific skills, education, or experience
export const updateSkill = async (id: string, skillId: string, updatedSkill: Partial<TSkills>) => {
  const user = await User.findOneAndUpdate(
    { _id: id, 'skills._id': skillId },
    { $set: { 'skills.$': updatedSkill } },
    { new: true }
  );
  return user;
};

export const updateEducation = async (id: string, educationId: string, updatedEducation: Partial<TEducation>) => {
  const user = await User.findOneAndUpdate(
    { _id: id, 'education._id': educationId },
    { $set: { 'education.$': updatedEducation } },
    { new: true }
  );
  return user;
};

export const updateExperience = async (id: string, experienceId: string, updatedExperience: Partial<TExperience>) => {
  const user = await User.findOneAndUpdate(
    { _id: id, 'experience._id': experienceId },
    { $set: { 'experience.$': updatedExperience } },
    { new: true }
  );
  return user;
};

// Delete specific skills, education, or experience
export const deleteSkill = async (id: string, skillId: string) => {
  const user = await User.findOneAndUpdate(
    { _id: id },
    { $pull: { skills: { _id: skillId } } },
    { new: true }
  );
  return user;
};

export const deleteEducation = async (id: string, educationId: string) => {
  const user = await User.findOneAndUpdate(
    { _id: id },
    { $pull: { education: { _id: educationId } } },
    { new: true }
  );
  return user;
};

export const deleteExperience = async (id: string, experienceId: string) => {
  const user = await User.findOneAndUpdate(
    { _id: id },
    { $pull: { experience: { _id: experienceId } } },
    { new: true }
  );
  return user;
};



export const UserServices = {
  createUser,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUser,

  addSkills,
  addEducation,
  addExperience,

  updateSkill,
  updateEducation,
  updateExperience,

  deleteSkill,
  deleteEducation,
  deleteExperience
};
