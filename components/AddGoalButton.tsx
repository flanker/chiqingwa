import { Goal, GoalType } from '@/types/Goal';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Dialog, Portal, TextInput, FAB } from 'react-native-paper';

interface AddGoalButtonProps {
  type: GoalType;
  onAdd: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export function AddGoalButton({ type, onAdd }: AddGoalButtonProps) {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

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
        description: description.trim() || undefined,
        completed: false,
        type,
      });
      setTitle('');
      setDescription('');
      setDialogVisible(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setDialogVisible(false);
  };

  return (
    <>
      <FAB
        icon="plus"
        label={`添加${typeLabels[type]}目标`}
        onPress={() => setDialogVisible(true)}
        style={styles.fab}
        mode="elevated"
      />

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={handleCancel}>
          <Dialog.Title>添加{typeLabels[type]}目标</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="目标标题"
              value={title}
              onChangeText={setTitle}
              mode="outlined"
              style={styles.input}
              autoFocus
            />
            <TextInput
              label="目标描述（可选）"
              value={description}
              onChangeText={setDescription}
              mode="outlined"
              multiline
              numberOfLines={3}
              style={styles.input}
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
    margin: 16,
  },
  input: {
    marginBottom: 16,
  },
});