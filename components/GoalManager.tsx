import { AddGoalButton } from '@/components/AddGoalButton';
import { GoalItem } from '@/components/GoalItem';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Goal, GoalType } from '@/types/Goal';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GoalStorage } from '@/utils/storage';

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
    if (goals.length === 0 && type === 'today') {
      const demoGoals: Goal[] = [
        {
          id: 'demo-1',
          title: '完成重要项目报告',
          description: '整理Q4季度总结，准备明天的会议',
          completed: false,
          type: 'today',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'demo-2', 
          title: '运动30分钟',
          description: '跑步或瑜伽，保持健康',
          completed: true,
          type: 'today',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ];
      
      // 先保存到存储，再设置到状态
      try {
        await GoalStorage.saveGoals(type, demoGoals);
        setGoals(demoGoals);
        console.log('演示数据已保存到存储');
      } catch (error) {
        console.error('保存演示数据失败:', error);
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

  const addGoal = async (goalData: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newGoal: Goal = {
        ...goalData,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      await GoalStorage.addGoal(type, newGoal);
      setGoals(prev => [...prev, newGoal]);
    } catch (error) {
      console.error(`Failed to add ${type} goal:`, error);
      // 可以在这里添加错误提示
    }
  };

  const updateGoal = async (updatedGoal: Goal) => {
    try {
      await GoalStorage.updateGoal(type, updatedGoal);
      setGoals(prev => prev.map(goal =>
        goal.id === updatedGoal.id ? updatedGoal : goal
      ));
    } catch (error) {
      console.error(`Failed to update ${type} goal:`, error);
      // 可以在这里添加错误提示
    }
  };

  const deleteGoal = async (id: string) => {
    try {
      console.log(`正在删除 ${type} 目标:`, id);
      console.log('当前目标列表:', goals.map(g => ({id: g.id, title: g.title})));
      
      // 先从 UI 中移除，提供即时反馈
      setGoals(prev => prev.filter(goal => goal.id !== id));
      
      // 然后从存储中删除
      await GoalStorage.deleteGoal(type, id);
      
      console.log('删除成功');
    } catch (error) {
      console.error(`Failed to delete ${type} goal:`, error);
      // 如果存储删除失败，重新加载数据恢复状态
      loadGoalsFromStorage();
    }
  };

  const completedGoals = goals.filter(goal => goal.completed);
  const pendingGoals = goals.filter(goal => !goal.completed);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>{title}</ThemedText>
        {goals.length > 0 && (
          <ThemedText style={styles.stats}>
            {completedGoals.length}/{goals.length} 已完成
          </ThemedText>
        )}
      </ThemedView>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <AddGoalButton type={type} onAdd={addGoal} />

        {loading ? (
          <ThemedView style={styles.emptyContainer}>
            <ActivityIndicator size="large" />
            <ThemedText style={styles.emptyText}>加载中...</ThemedText>
          </ThemedView>
        ) : goals.length === 0 ? (
          <ThemedView style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>
              {emptyMessage || `还没有${title}目标，点击上方按钮添加第一个目标吧！`}
            </ThemedText>
          </ThemedView>
        ) : (
          <>
            {pendingGoals.length > 0 && (
              <ThemedView style={styles.section}>
                <ThemedText style={styles.sectionTitle}>进行中</ThemedText>
                {pendingGoals.map(goal => (
                  <GoalItem
                    key={goal.id}
                    goal={goal}
                    onUpdate={updateGoal}
                    onDelete={deleteGoal}
                  />
                ))}
              </ThemedView>
            )}

            {completedGoals.length > 0 && (
              <ThemedView style={styles.section}>
                <ThemedText style={styles.sectionTitle}>已完成</ThemedText>
                {completedGoals.map(goal => (
                  <GoalItem
                    key={goal.id}
                    goal={goal}
                    onUpdate={updateGoal}
                    onDelete={deleteGoal}
                  />
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
  },
  header: {
    padding: 20,
    paddingBottom: 0,
  },
  title: {
    marginBottom: 8,
  },
  stats: {
    fontSize: 16,
    opacity: 0.7,
  },
  scrollView: {
    flex: 1,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.6,
    lineHeight: 24,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
    marginBottom: 8,
    opacity: 0.8,
  },
});