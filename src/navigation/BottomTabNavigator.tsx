import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ProfileScreen from '../screens/ProfileScreen';
import TestScreen from '../screens/TestScreen';
import NewsScreen from '../screens/NewsScreen';

import {
  BottomTabParamList,
  ProfileParamList,
  TestParamList,
  NewsParamList,
} from '../components/types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName='Profile'
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name='Profile'
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='ios-code' color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name='Test'
        component={TestNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='ios-code' color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name='News'
        component={NewsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='ios-code' color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const ProfileStack = createStackNavigator<ProfileParamList>();

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name='ProfileScreen'
        component={ProfileScreen}
        options={{ headerTitle: 'Profile Header' }}
      />
    </ProfileStack.Navigator>
  );
}

const TestStack = createStackNavigator<TestParamList>();

function TestNavigator() {
  return (
    <TestStack.Navigator>
      <TestStack.Screen
        name='TestScreen'
        component={TestScreen}
        options={{ headerTitle: ' Test Header ' }}
      />
    </TestStack.Navigator>
  );
}

const NewsStack = createStackNavigator<NewsParamList>();

function NewsNavigator() {
  return (
    <NewsStack.Navigator>
      <NewsStack.Screen
        name='NewsScreen'
        component={NewsScreen}
        options={{ headerTitle: ' News Header ' }}
      />
    </NewsStack.Navigator>
  );
}
