import { Goal } from '@/types/Goal';
import { GoalStorage } from '../storage';

// 模拟 AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  multiRemove: jest.fn(),
}));

const mockGoal: Goal = {
  id: '1',
  title: '测试目标',
  description: '这是一个测试目标',
  completed: false,
  type: 'today',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

describe('GoalStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loadGoals', () => {
    it('should return empty array when no data exists', async () => {
      const AsyncStorage = require('@react-native-async-storage/async-storage');
      AsyncStorage.getItem.mockResolvedValue(null);

      const goals = await GoalStorage.loadGoals('today');
      expect(goals).toEqual([]);
    });

    it('should parse and return goals with converted dates', async () => {
      const AsyncStorage = require('@react-native-async-storage/async-storage');
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify([mockGoal]));

      const goals = await GoalStorage.loadGoals('today');
      expect(goals).toHaveLength(1);
      expect(goals[0].createdAt).toBeInstanceOf(Date);
      expect(goals[0].updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('saveGoals', () => {
    it('should stringify and save goals', async () => {
      const AsyncStorage = require('@react-native-async-storage/async-storage');

      await GoalStorage.saveGoals('today', [mockGoal]);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'goals_today',
        JSON.stringify([mockGoal])
      );
    });
  });

  describe('addGoal', () => {
    it('should add goal to existing goals and save', async () => {
      const AsyncStorage = require('@react-native-async-storage/async-storage');
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify([]));

      await GoalStorage.addGoal('today', mockGoal);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'goals_today',
        JSON.stringify([mockGoal])
      );
    });
  });
});