import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import ProfileContext from '../components/ProfileContext';
import ESGProfile from '../components/ESGProfile';
export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ESGR Profile page</Text>
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />
      <ProfileContext.Consumer>
        {(value) => {
          return (
            <View style={styles.box}>
              <Text>Firstname: {value.profile.firstname}</Text>
              <Text>Lastname: {value.profile.lastname}</Text>
              <Text>Username: {value.profile.username}</Text>
              <Text style={{ textAlign: 'center' }}>Score</Text>
              <ESGProfile score={value.profile.score} />
            </View>
          );
        }}
      </ProfileContext.Consumer>
      <View style={styles.box}>
        <Text>Usage stats</Text>
      </View>
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
  box: {
    borderWidth: 1,
    padding: 5,
  },
});
