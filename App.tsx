import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import ProfileContext, {
  defaultProfile,
  ProfileInterface,
} from './src/components/ProfileContext';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [profile, setProfile] = useState(defaultProfile);
  const setTheProfile = (newProfile: ProfileInterface) => {
    console.log('App');
    console.log(newProfile);
    setProfile(newProfile);
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ProfileContext.Provider value={{ profile, setTheProfile }}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </ProfileContext.Provider>
      </SafeAreaProvider>
    );
  }
}
