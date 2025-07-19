import { Goal, GoalType } from '@/types/Goal';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Dialog, FAB, Portal, TextInput } from 'react-native-paper';

interface AddGoalButtonProps {
  type: GoalType;
  onAdd: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export function AddGoalButton({ type, onAdd }: AddGoalButtonProps) {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [title, setTitle] = useState('');

  const typeLabels = {
    today: '今日',
    week: '本周',
    month: '本月',
    year: '今年',
  };

  const handleAdd = () => {
    if (title.trim()) {
      onAdd({
        title: title.trim(),
        completed: false,
        type,
      });
      setTitle('');
      setDialogVisible(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDialogVisible(false);
  };

  return (
    <>
      <FAB
        icon="plus"
        onPress={() => setDialogVisible(true)}
        style={styles.fab}
        mode="elevated"
      />

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={handleCancel}>
          <Dialog.Title>添加{typeLabels[type]}目标</Dialog.Title>
          <Dialog.Content>
            <TextInput
              value={title}
              onChangeText={setTitle}
              mode="outlined"
              style={styles.input}
              autoFocus
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleCancel}>取消</Button>
            <Button
              mode="contained"
              onPress={handleAdd}
              disabled={!title.trim()}
            >
              添加
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 90,
    right: 24,
    zIndex: 9999,
    elevation: 16,
    backgroundColor: '#6200ea',
  },
  input: {
    marginBottom: 16,
  },
});