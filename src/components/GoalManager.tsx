import { GoalItem } from "@/components/GoalItem";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Goal, GoalType } from "@/types/Goal";
import { GoalStorage } from "@/utils/storage";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";

interface GoalManagerProps {
  type: GoalType;
  title: string;
  emptyMessage?: string;
}

export function GoalManager({ type, title, emptyMessage }: GoalManagerProps) {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  // 添加一些示例数据用于演示（仅在开发时）
  const addDemoData = async () => {
    if (goals.length === 0 && type === "today") {
      const demoGoals: Goal[] = [
        {
          id: "demo-1",
          title: "完成重要项目报告",
          completed: false,
          type: "today",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "demo-2",
          title: "运动30分钟",
          completed: true,
          type: "today",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      // 先保存到存储，再设置到状态
      try {
        await GoalStorage.saveGoals(type, demoGoals);
        setGoals(demoGoals);
        console.log("演示数据已保存到存储");
      } catch (error) {
        console.error("保存演示数据失败:", error);
        setGoals(demoGoals); // 即使保存失败也显示数据
      }
    }
  };

  // 加载数据
  useEffect(() => {
    loadGoalsFromStorage();
  }, [type]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadGoalsFromStorage = async () => {
    try {
      setLoading(true);
      const storedGoals = await GoalStorage.loadGoals(type);
      setGoals(storedGoals);

      // 如果没有数据，添加演示数据
      if (storedGoals.length === 0) {
        await addDemoData();
      }
    } catch (error) {
      console.error(`Failed to load ${type} goals:`, error);
    } finally {
      setLoading(false);
    }
  };

  const updateGoal = async (updatedGoal: Goal) => {
    try {
      await GoalStorage.updateGoal(type, updatedGoal);
      setGoals((prev) => prev.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal)));
    } catch (error) {
      console.error(`Failed to update ${type} goal:`, error);
      // 可以在这里添加错误提示
    }
  };

  const deleteGoal = async (id: string) => {
    try {
      console.log(`正在删除 ${type} 目标:`, id);
      console.log(
        "当前目标列表:",
        goals.map((g) => ({ id: g.id, title: g.title }))
      );

      // 先从 UI 中移除，提供即时反馈
      setGoals((prev) => prev.filter((goal) => goal.id !== id));

      // 然后从存储中删除
      await GoalStorage.deleteGoal(type, id);

      console.log("删除成功");
    } catch (error) {
      console.error(`Failed to delete ${type} goal:`, error);
      // 如果存储删除失败，重新加载数据恢复状态
      loadGoalsFromStorage();
    }
  };

  const completedGoals = goals.filter((goal) => goal.completed);
  const pendingGoals = goals.filter((goal) => !goal.completed);

  if (loading) {
    return null;
  }

  return (
    <ThemedView style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title={title} />
      </Appbar.Header>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, goals.length === 0 && styles.scrollContentEmpty]}
        showsVerticalScrollIndicator={false}
      >
        {goals.length === 0 ? (
          <ThemedView style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>{emptyMessage || `暂无${title.replace("目标", "")}目标`}</ThemedText>
          </ThemedView>
        ) : (
          <>
            {pendingGoals.length > 0 && (
              <ThemedView style={styles.section}>
                <ThemedText style={styles.sectionTitle}>进行中</ThemedText>
                {pendingGoals.map((goal) => (
                  <GoalItem key={goal.id} goal={goal} onUpdate={updateGoal} onDelete={deleteGoal} />
                ))}
              </ThemedView>
            )}

            {completedGoals.length > 0 && (
              <ThemedView style={styles.section}>
                <ThemedText style={styles.sectionTitle}>已完成</ThemedText>
                {completedGoals.map((goal) => (
                  <GoalItem key={goal.id} goal={goal} onUpdate={updateGoal} onDelete={deleteGoal} />
                ))}
              </ThemedView>
            )}
          </>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  header: {
    padding: 20,
    paddingBottom: 0,
  },
  title: {
    marginBottom: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  scrollContentEmpty: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    opacity: 0.6,
    lineHeight: 24,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 20,
    marginBottom: 8,
    opacity: 0.8,
  },
});
