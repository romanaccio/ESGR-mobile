import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import ProfileContext from '../components/ProfileContext';
export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ESGR Landing page</Text>
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />
      <ProfileContext.Consumer>
        {(value) => {
          return (
            <>
              <Text>Firstname: {value.firstname}</Text>
              <Text>Lastname: {value.lastname}</Text>
              <Text>Username: {value.username}</Text>
            </>
          );
        }}
      </ProfileContext.Consumer>

      <Text>Current profile with details</Text>

      <Text>Usage stats</Text>
      <EditScreenInfo path='/screens/TabOneScreen.tsx' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
