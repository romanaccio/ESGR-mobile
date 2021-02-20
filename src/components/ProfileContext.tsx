import React from 'react';

export interface ProfileInterface {
  firstname: string;
  lastname: string;
  username: string;
  score: number;
}

export const defaultProfile: ProfileInterface = {
  firstname: 'John',
  lastname: 'Doe',
  username: 'jdoe',
  score: 0,
};

const ProfileContext = React.createContext({
  profile: defaultProfile,
  setTheProfile: (newprofile: ProfileInterface) => {},
});
export default ProfileContext;
