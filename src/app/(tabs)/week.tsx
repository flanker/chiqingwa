import { AddGoalButton } from '@/components/AddGoalButton';
import { GoalManager } from '@/components/GoalManager';
import { Goal } from '@/types/Goal';
import { GoalStorage } from '@/utils/storage';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WeekScreen() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddGoal = async (goalData: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newGoal: Goal = {
        ...goalData,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await GoalStorage.addGoal('week', newGoal);
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      console.error('Failed to add week goal:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={[]}>
      <GoalManager
        key={refreshKey}
        type="week"
        title="本周目标"
        emptyMessage="添加一些这周要完成的重要任务吧！"
      />
      <AddGoalButton type="week" onAdd={handleAddGoal} />
    </SafeAreaView>
  );
}