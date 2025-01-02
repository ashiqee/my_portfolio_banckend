import { Document, Schema } from "mongoose";

export type TSkills = {
    name: string;
    level?: string;  
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
}

export type TUserProfileUpdate = {
    name: string;
    mobileNumber: string;
    profilePhoto?: string | null;
    skills?: TSkills[];
    education?: TEducation[];
};


export interface IPremiumProfile extends Document {
    user: Schema.Types.ObjectId; 
    subcriptionPlan:'premium'|'gold'|'platinum';
    status: 'active' | 'canceled' | 'expired'; 
    startDate: Date;
    endDate?: Date;
    paymentStatus: string;
    transactionId?: string; 
  }