export type UserProfileToken = {
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

export type Profile = {
  id: string;
} & ProfileData;

export type RawProfile = {
  id: string;
} & RawProfileData

export type RawProfileData = {
  id: string;
  lastName: string;
  address: string;
  city: string;
  country: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  tagIds: string[];
}

export type ProfileData = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  country: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  designations: Tag[];
};

export type Tag = {
  id: number;
  name: string;
};


