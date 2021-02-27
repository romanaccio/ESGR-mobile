import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import ProfileContext from '../components/ProfileContext';
import ESGProfile from '../components/ESGProfile';
import Profile from '../components/Profile';
import { FlatList } from 'react-native-gesture-handler';
import { readReports, ReportInterface } from '../services/database';
import Toast from 'react-native-tiny-toast';
import formatDateTime from '../util/formatDateTime';
import MyButton from '../components/MyButton';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const [loading, setLoading] = useState(false);
  const [surveys, setSurveys] = useState([] as ReportInterface[]);

  const loadSurveys = async () => {
    try {
      setLoading(true);
      const surveys = await readReports();
      setSurveys(surveys);
      setLoading(false);
    } catch (error) {
      console.log('useEffect, readReports: ' + error.message);
      Toast.show(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Create an scoped async function in the hook
    async function anyNameFunction() {
      await loadSurveys();
    }
    anyNameFunction();
  }, []);

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
            <>
              <View style={styles.box}>
                <Profile
                  key={value.profile.score} // adding this key so that a score change makes the Profile re-render.
                  profile={value.profile}
                  setProfile={(newProfile) => {
                    console.log('before setTheProfile');
                    console.log(newProfile);
                    value.setTheProfile(newProfile);
                  }}
                />
                <Text style={{ textAlign: 'center' }}>Current score</Text>
                <ESGProfile score={value.profile.score} />
              </View>
              <View style={styles.list}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}
                >
                  <Text>Usage stats</Text>
                  <MyButton handleAction={loadSurveys}>
                    <Ionicons name='reload' size={24} color='black' />
                  </MyButton>
                </View>
                {loading ? (
                  <Text>Loading...</Text>
                ) : (
                  <FlatList
                    keyExtractor={(item) => `${item.reportStart}`}
                    data={surveys}
                    renderItem={(element) => {
                      const ret = null;
                      if (element.item.username === value.profile.username)
                        return (
                          <View style={styles.thinSeparator}>
                            <Text>
                              {formatDateTime(element.item.reportStart)}
                            </Text>
                            <ESGProfile score={element.item.score} />
                          </View>
                        );
                      else return null;
                    }}
                  />
                )}
              </View>
            </>
          );
        }}
      </ProfileContext.Consumer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'flex-start',
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
  thinSeparator: {
    marginVertical: 1,
    borderTopWidth: 1,
  },
  box: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    minWidth: '60%',
  },
  list: {
    maxHeight: '50%',
    minWidth: '60%',
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
  },
});
