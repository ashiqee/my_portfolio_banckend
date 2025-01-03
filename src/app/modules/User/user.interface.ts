/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE, USER_STATUS } from './user.constant';

export type TSkills = {
  skillName: string;
  skillPercentage?: string;  
  iconUrl?: string;
};

export type TEducation = {
  degree: string;
  institution: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  iconUrl?: string;
  point?: string;
};

export type TExperience = {
  jobTitle: string;
  company: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  iconUrl?: string;
  expertises?: string[];
}

export type TUser = {
  _id?: string;
  name: string;
  role: keyof typeof USER_ROLE;
  isVerified:boolean;
  email: string;
  password: string;
  status: keyof typeof USER_STATUS;
  address?:string;
  passwordChangedAt?: Date;
  mobileNumber?: string;
  profilePhoto?: string;
  skills?: TSkills[];
  education?: TEducation[];
  experience?: TExperience[];
  follow?:string[];
  followers?:string[];
  blockUser?:string[];
  createdAt?: Date;
  updatedAt?: Date;
};

export interface IUserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}
