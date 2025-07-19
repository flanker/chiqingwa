import { Goal } from '@/types/Goal';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Checkbox, IconButton, Text, Button, TextInput, Portal, Dialog } from 'react-native-paper';

interface GoalItemProps {
  goal: Goal;
  onUpdate: (goal: Goal) => void;
  onDelete: (id: string) => void;
}

export function GoalItem({ goal, onUpdate, onDelete }: GoalItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(goal.title);
  const [editDescription, setEditDescription] = useState(goal.description || '');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate({
        ...goal,
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
        updatedAt: new Date(),
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(goal.title);
    setEditDescription(goal.description || '');
    setIsEditing(false);
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    onDelete(goal.id);
    setShowDeleteConfirm(false);
  };

  const toggleCompleted = () => {
    onUpdate({
      ...goal,
      completed: !goal.completed,
      updatedAt: new Date(),
    });
  };

  if (isEditing) {
    return (
      <Card style={styles.container}>
        <Card.Content>
          <TextInput
            label="目标标题"
            value={editTitle}
            onChangeText={setEditTitle}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="目标描述（可选）"
            value={editDescription}
            onChangeText={setEditDescription}
            mode="outlined"
            multiline
            numberOfLines={3}
            style={styles.input}
          />
          <View style={styles.editActions}>
            <Button mode="contained" onPress={handleSave} disabled={!editTitle.trim()}>
              保存
            </Button>
            <Button mode="outlined" onPress={handleCancel}>
              取消
            </Button>
          </View>
        </Card.Content>
      </Card>
    );
  }

  return (
    <>
      <Card style={styles.container}>
        <Card.Content>
          <View style={styles.content}>
            <Checkbox
              status={goal.completed ? 'checked' : 'unchecked'}
              onPress={toggleCompleted}
            />
            <View style={styles.textContainer}>
              <Text
                variant="titleMedium"
                style={[
                  styles.title,
                  goal.completed && { textDecorationLine: 'line-through', opacity: 0.6 }
                ]}
              >
                {goal.title}
              </Text>
              {goal.description && (
                <Text
                  variant="bodyMedium"
                  style={[
                    styles.description,
                    goal.completed && { opacity: 0.6 }
                  ]}
                >
                  {goal.description}
                </Text>
              )}
            </View>
            <View style={styles.actions}>
              <IconButton
                icon="pencil"
                size={20}
                onPress={() => setIsEditing(true)}
              />
              <IconButton
                icon="delete"
                size={20}
                iconColor="#f44336"
                onPress={handleDelete}
              />
            </View>
          </View>
        </Card.Content>
      </Card>

      <Portal>
        <Dialog visible={showDeleteConfirm} onDismiss={() => setShowDeleteConfirm(false)}>
          <Dialog.Title>删除目标</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              确定要删除&ldquo;{goal.title}&rdquo;吗？此操作无法撤销。
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowDeleteConfirm(false)}>取消</Button>
            <Button mode="contained" buttonColor="#f44336" onPress={confirmDelete}>
              删除
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    marginHorizontal: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 4,
  },
  description: {
    opacity: 0.8,
  },
  actions: {
    flexDirection: 'row',
  },
  input: {
    marginBottom: 12,
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
});