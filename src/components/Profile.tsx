import React, { useReducer, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, TextInput } from '../components/Themed';
import { ProfileInterface } from './ProfileContext';
import MyButton from './MyButton';
import { AntDesign } from '@expo/vector-icons';

interface ProfileProps {
  profile: ProfileInterface;
  setProfile(updatedProfile: ProfileInterface): void;
}

enum Actions {
  setUsername,
  setFirstname,
  setLastname,
}
interface ActionInterface {
  type: Actions;
  payload: string;
}

const reducer = (state: ProfileInterface, action: ActionInterface) => {
  switch (action.type) {
    case Actions.setUsername:
      return { ...state, username: action.payload };
    case Actions.setFirstname:
      return { ...state, firstname: action.payload };
    case Actions.setLastname:
      return { ...state, lastname: action.payload };

    default:
      return state;
  }
};
const Profile = ({ profile, setProfile }: ProfileProps) => {
  const [state, dispatch] = useReducer(reducer, profile);
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState('');

  const handleEnter = () => {
    console.log('handleEnter');
    console.log(state);

    if (state.username.length === 0) setError('Username cannot be empty');
    else if (state.firstname.length === 0)
      setError('Firstname cannot be empty');
    else if (state.lastname.length === 0) setError('Lastname cannot be empty');
    else {
      setError('');
      setEdit(false);
      setProfile(state);
    }
  };

  const handleEdit = () => {
    console.log('handleEdit');
    console.log(state);
    setEdit(true);
  };

  return (
    <View>
      <View style={styles.profileBlock}>
        <View>
          <TextInput
            style={edit ? styles.input : styles.display}
            onChangeText={(username) =>
              dispatch({ type: Actions.setUsername, payload: username })
            }
            value={state.username}
            placeholder='Enter Username'
            autoCapitalize='none'
            autoCorrect={false}
            editable={edit}
          />

          <TextInput
            style={edit ? styles.input : styles.display}
            onChangeText={(firstname) =>
              dispatch({ type: Actions.setFirstname, payload: firstname })
            }
            value={state.firstname}
            placeholder='Enter Firstname'
            autoCapitalize='none'
            autoCorrect={false}
            editable={edit}
          />
          <TextInput
            style={edit ? styles.input : styles.display}
            onChangeText={(lastname) =>
              dispatch({ type: Actions.setLastname, payload: lastname })
            }
            value={state.lastname}
            placeholder='Enter Lastname'
            autoCapitalize='none'
            autoCorrect={false}
            editable={edit}
          />
        </View>
        <View>
          {edit ? (
            <MyButton handleAction={handleEnter}>
              <AntDesign name='enter' size={24} color='black' />
            </MyButton>
          ) : (
            <MyButton handleAction={handleEdit}>
              <AntDesign name='edit' size={24} color='black' />
            </MyButton>
          )}
        </View>
      </View>
      {error.length > 0 ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};
export default Profile;

const styles = StyleSheet.create({
  profileBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    margin: 5,
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'dotted',
  },
  display: {
    margin: 1,
  },
  error: {
    color: 'red',
  },
});
