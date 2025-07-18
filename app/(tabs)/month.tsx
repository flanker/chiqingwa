import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GoalManager } from '@/components/GoalManager';

export default function MonthScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <GoalManager
        type="month"
        title="本月目标"
        emptyMessage="本月还没有设定目标，规划一些这个月要达成的里程碑吧！"
      />
    </SafeAreaView>
  );
}