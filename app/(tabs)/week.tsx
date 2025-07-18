import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GoalManager } from '@/components/GoalManager';

export default function WeekScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <GoalManager
        type="week"
        title="本周目标"
        emptyMessage="本周还没有设定目标，添加一些这周要完成的重要任务吧！"
      />
    </SafeAreaView>
  );
}