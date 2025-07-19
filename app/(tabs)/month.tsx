import { AddGoalButton } from '@/components/AddGoalButton';
import { GoalManager } from '@/components/GoalManager';
import { Goal } from '@/types/Goal';
import { GoalStorage } from '@/utils/storage';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MonthScreen() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddGoal = async (goalData: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newGoal: Goal = {
        ...goalData,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await GoalStorage.addGoal('month', newGoal);
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      console.error('Failed to add month goal:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={[]}>
      <GoalManager
        key={refreshKey}
        type="month"
        title="本月目标"
        emptyMessage="规划一些这个月要达成的里程碑吧！"
      />
      <AddGoalButton type="month" onAdd={handleAddGoal} />
    </SafeAreaView>
  );
}