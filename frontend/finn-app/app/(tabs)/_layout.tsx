import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Text } from 'react-native';

import "@/global.css";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#6D8B76",
        tabBarInactiveTintColor: '#000000',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: () => <TabBarBackground />,
        tabBarStyle: {
          position: 'absolute',
          bottom:0
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => <Icon color={focused ? color : Colors[colorScheme ?? 'light'].tabIconDefault} name="home" size={30}/>,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => <Icon color={focused ? color : Colors[colorScheme ?? 'light'].tabIconDefault} name="lightbulb" size={28}/>,
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => <Icon color={focused ? color : Colors[colorScheme ?? 'light'].tabIconDefault} name="attach-money" size={30}/>,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => <Icon color={focused ? color : Colors[colorScheme ?? 'light'].tabIconDefault} name="settings" size={28}/>,
        }}
      />
    </Tabs>
  );
}
