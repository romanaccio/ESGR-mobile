import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import ProfileContext, {
  defaultProfile,
} from './src/components/ProfileContext';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ProfileContext.Provider value={defaultProfile}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </ProfileContext.Provider>
      </SafeAreaProvider>
    );
  }
}
