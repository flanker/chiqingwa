import AsyncStorage from '@react-native-async-storage/async-storage';
import { Goal, GoalType } from '@/types/Goal';

const STORAGE_KEYS = {
  TODAY_GOALS: 'goals_today',
  WEEK_GOALS: 'goals_week',
  MONTH_GOALS: 'goals_month',
  YEAR_GOALS: 'goals_year',
} as const;

export class GoalStorage {
  private static getStorageKey(type: GoalType): string {
    const keyMap: Record<GoalType, string> = {
      today: STORAGE_KEYS.TODAY_GOALS,
      week: STORAGE_KEYS.WEEK_GOALS,
      month: STORAGE_KEYS.MONTH_GOALS,
      year: STORAGE_KEYS.YEAR_GOALS,
    };
    return keyMap[type];
  }

  /**
   * 加载指定类型的目标数据
   */
  static async loadGoals(type: GoalType): Promise<Goal[]> {
    try {
      const key = this.getStorageKey(type);
      const data = await AsyncStorage.getItem(key);
      
      if (!data) {
        return [];
      }

      const goals: Goal[] = JSON.parse(data);
      
      // 将日期字符串转换回 Date 对象
      return goals.map(goal => ({
        ...goal,
        createdAt: new Date(goal.createdAt),
        updatedAt: new Date(goal.updatedAt),
      }));
    } catch (error) {
      console.error(`Error loading ${type} goals:`, error);
      return [];
    }
  }

  /**
   * 保存指定类型的目标数据
   */
  static async saveGoals(type: GoalType, goals: Goal[]): Promise<void> {
    try {
      const key = this.getStorageKey(type);
      const data = JSON.stringify(goals);
      await AsyncStorage.setItem(key, data);
    } catch (error) {
      console.error(`Error saving ${type} goals:`, error);
      throw new Error(`Failed to save ${type} goals`);
    }
  }

  /**
   * 添加新目标
   */
  static async addGoal(type: GoalType, goal: Goal): Promise<void> {
    const goals = await this.loadGoals(type);
    goals.push(goal);
    await this.saveGoals(type, goals);
  }

  /**
   * 更新目标
   */
  static async updateGoal(type: GoalType, updatedGoal: Goal): Promise<void> {
    const goals = await this.loadGoals(type);
    const index = goals.findIndex(goal => goal.id === updatedGoal.id);
    
    if (index !== -1) {
      goals[index] = updatedGoal;
      await this.saveGoals(type, goals);
    } else {
      throw new Error(`Goal with id ${updatedGoal.id} not found`);
    }
  }

  /**
   * 删除目标
   */
  static async deleteGoal(type: GoalType, goalId: string): Promise<void> {
    const goals = await this.loadGoals(type);
    const filteredGoals = goals.filter(goal => goal.id !== goalId);
    await this.saveGoals(type, filteredGoals);
  }

  /**
   * 清空指定类型的所有目标
   */
  static async clearGoals(type: GoalType): Promise<void> {
    try {
      const key = this.getStorageKey(type);
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error clearing ${type} goals:`, error);
      throw new Error(`Failed to clear ${type} goals`);
    }
  }

  /**
   * 清空所有目标数据
   */
  static async clearAllGoals(): Promise<void> {
    try {
      const keys = Object.values(STORAGE_KEYS);
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error('Error clearing all goals:', error);
      throw new Error('Failed to clear all goals');
    }
  }

  /**
   * 获取存储使用统计
   */
  static async getStorageStats(): Promise<{
    today: number;
    week: number;
    month: number;
    year: number;
    total: number;
  }> {
    try {
      const [todayGoals, weekGoals, monthGoals, yearGoals] = await Promise.all([
        this.loadGoals('today'),
        this.loadGoals('week'),
        this.loadGoals('month'),
        this.loadGoals('year'),
      ]);

      const stats = {
        today: todayGoals.length,
        week: weekGoals.length,
        month: monthGoals.length,
        year: yearGoals.length,
        total: todayGoals.length + weekGoals.length + monthGoals.length + yearGoals.length,
      };

      return stats;
    } catch (error) {
      console.error('Error getting storage stats:', error);
      return { today: 0, week: 0, month: 0, year: 0, total: 0 };
    }
  }
}