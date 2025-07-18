import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { GoalStorage } from '@/utils/storage';
import { Goal } from '@/types/Goal';

export function StorageDebug() {
  const [stats, setStats] = useState<any>(null);

  const testAddGoal = async () => {
    try {
      const testGoal: Goal = {
        id: Date.now().toString(),
        title: '测试目标 ' + new Date().toLocaleTimeString(),
        description: '这是一个测试目标',
        completed: false,
        type: 'today',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      await GoalStorage.addGoal('today', testGoal);
      Alert.alert('成功', '测试目标已添加');
      await updateStats();
    } catch (error) {
      Alert.alert('错误', '添加目标失败: ' + error);
    }
  };

  const testLoadGoals = async () => {
    try {
      const goals = await GoalStorage.loadGoals('today');
      Alert.alert('今日目标', `共有 ${goals.length} 个目标\n\n${goals.map(g => `- ${g.title}`).join('\n')}`);
    } catch (error) {
      Alert.alert('错误', '加载目标失败: ' + error);
    }
  };

  const updateStats = async () => {
    try {
      const storageStats = await GoalStorage.getStorageStats();
      setStats(storageStats);
    } catch (error) {
      console.error('获取统计信息失败:', error);
    }
  };

  const clearAllData = async () => {
    Alert.alert(
      '确认清空',
      '确定要清空所有目标数据吗？',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '清空',
          style: 'destructive',
          onPress: async () => {
            try {
              await GoalStorage.clearAllGoals();
              Alert.alert('成功', '所有数据已清空');
              await updateStats();
            } catch (error) {
              Alert.alert('错误', '清空数据失败: ' + error);
            }
          },
        },
      ]
    );
  };

  React.useEffect(() => {
    updateStats();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>存储调试工具</ThemedText>
      
      {stats && (
        <ThemedView style={styles.statsContainer}>
          <ThemedText style={styles.statsTitle}>存储统计:</ThemedText>
          <ThemedText>今日: {stats.today} 个目标</ThemedText>
          <ThemedText>本周: {stats.week} 个目标</ThemedText>
          <ThemedText>本月: {stats.month} 个目标</ThemedText>
          <ThemedText>今年: {stats.year} 个目标</ThemedText>
          <ThemedText style={styles.total}>总计: {stats.total} 个目标</ThemedText>
        </ThemedView>
      )}

      <TouchableOpacity style={styles.button} onPress={testAddGoal}>
        <ThemedText style={styles.buttonText}>添加测试目标</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={testLoadGoals}>
        <ThemedText style={styles.buttonText}>查看今日目标</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={updateStats}>
        <ThemedText style={styles.buttonText}>刷新统计</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.dangerButton]} onPress={clearAllData}>
        <ThemedText style={styles.buttonText}>清空所有数据</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  statsContainer: {
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
    marginBottom: 20,
  },
  statsTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  total: {
    fontWeight: 'bold',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 4,
  },
  dangerButton: {
    backgroundColor: '#FF3B30',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});