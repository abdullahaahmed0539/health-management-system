export type UserToken = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  role: null;
  token: string;
};

export type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  role: null;
};

export type RawProfile = {
  _id: string;
} & RawProfileData

export interface RawProfileData {
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string[];
  city: string;
  country: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  designation: string[];
}

export interface Profile {
  _id: string;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string[];
  city: string;
  country: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  designation: string[];
}
