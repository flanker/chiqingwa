export interface Goal {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  type: 'today' | 'week' | 'month' | 'year';
}

export type GoalType = Goal['type'];