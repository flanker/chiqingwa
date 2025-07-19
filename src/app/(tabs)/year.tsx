import { AddGoalButton } from '@/components/AddGoalButton';
import { GoalManager } from '@/components/GoalManager';
import { Goal } from '@/types/Goal';
import { GoalStorage } from '@/utils/storage';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function YearScreen() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddGoal = async (goalData: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newGoal: Goal = {
        ...goalData,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await GoalStorage.addGoal('year', newGoal);
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      console.error('Failed to add year goal:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={[]}>
      <GoalManager
        key={refreshKey}
        type="year"
        title="今年目标"
        emptyMessage="设定一些年度重要目标，让这一年更有意义！"
      />
      <AddGoalButton type="year" onAdd={handleAddGoal} />
    </SafeAreaView>
  );
}