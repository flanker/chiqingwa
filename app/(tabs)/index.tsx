import { AddGoalButton } from "@/components/AddGoalButton";
import { GoalManager } from "@/components/GoalManager";
import { Goal } from "@/types/Goal";
import { GoalStorage } from "@/utils/storage";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TodayScreen() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddGoal = async (goalData: Omit<Goal, "id" | "createdAt" | "updatedAt">) => {
    try {
      const newGoal: Goal = {
        ...goalData,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await GoalStorage.addGoal("today", newGoal);
      setRefreshKey((prev) => prev + 1); // 触发 GoalManager 重新加载
    } catch (error) {
      console.error("Failed to add today goal:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <GoalManager key={refreshKey} type="today" title="今日目标" emptyMessage="安排一些今天要完成的重要事项吧！" />
      <AddGoalButton type="today" onAdd={handleAddGoal} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
