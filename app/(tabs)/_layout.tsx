import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TodayIcon, WeekIcon, MonthIcon, YearIcon } from '@/components/icons/GoalIcons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '今日',
          tabBarIcon: ({ color }) => <TodayIcon size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="week"
        options={{
          title: '本周',
          tabBarIcon: ({ color }) => <WeekIcon size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="month"
        options={{
          title: '本月',
          tabBarIcon: ({ color }) => <MonthIcon size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="year"
        options={{
          title: '今年',
          tabBarIcon: ({ color }) => <YearIcon size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
