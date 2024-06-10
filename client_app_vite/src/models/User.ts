export type UserProfileToken = {
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  role: string; // enum maybe
};

export type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};
