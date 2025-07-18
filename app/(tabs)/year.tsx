import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GoalManager } from '@/components/GoalManager';

export default function YearScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <GoalManager
        type="year"
        title="今年目标"
        emptyMessage="今年还没有设定目标，设定一些年度重要目标，让这一年更有意义！"
      />
    </SafeAreaView>
  );
}