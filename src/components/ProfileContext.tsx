import React from 'react';

export interface ProfileInterface {
  firstname: string;
  lastname: string;
  username: string;
}
export const defaultProfile: ProfileInterface = {
  firstname: 'John',
  lastname: 'Doe',
  username: 'jdoe',
};
const ProfileContext = React.createContext(defaultProfile);
export default ProfileContext;
