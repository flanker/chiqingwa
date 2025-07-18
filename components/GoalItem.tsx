import { CheckCircleIcon, CircleIcon, DeleteIcon, EditIcon } from '@/components/icons/ActionIcons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Goal } from '@/types/Goal';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

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

  const tintColor = useThemeColor({}, 'tint');
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

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
    console.log('删除目标:', goal.id, goal.title);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    console.log('确认删除目标:', goal.id, goal.title);
    onDelete(goal.id);
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
      <ThemedView style={[styles.container, { backgroundColor }]}>
        <TextInput
          style={[styles.input, { color: textColor, borderColor: tintColor }]}
          value={editTitle}
          onChangeText={setEditTitle}
          placeholder="目标标题"
          placeholderTextColor={textColor + '80'}
        />
        <TextInput
          style={[styles.input, styles.descriptionInput, { color: textColor, borderColor: tintColor }]}
          value={editDescription}
          onChangeText={setEditDescription}
          placeholder="目标描述（可选）"
          placeholderTextColor={textColor + '80'}
          multiline
        />
        <View style={styles.actions}>
          <TouchableOpacity style={[styles.saveButton, { backgroundColor: tintColor }]} onPress={handleSave}>
            <ThemedText style={[styles.buttonText, { color: tintColor === '#0a7ea4' ? '#fff' : '#000' }]}>保存</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.saveButton, { backgroundColor: textColor + '20' }]} onPress={handleCancel}>
            <ThemedText>取消</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.checkbox} onPress={toggleCompleted}>
          {goal.completed ? (
            <CheckCircleIcon size={24} color={tintColor} />
          ) : (
            <CircleIcon size={24} color={textColor + '60'} />
          )}
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <ThemedText
            style={[
              styles.title,
              goal.completed && { textDecorationLine: 'line-through', opacity: 0.6 }
            ]}
          >
            {goal.title}
          </ThemedText>
          {goal.description && (
            <ThemedText
              style={[
                styles.description,
                goal.completed && { opacity: 0.6 }
              ]}
            >
              {goal.description}
            </ThemedText>
          )}
        </View>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.actionButton}>
            <EditIcon size={20} color={textColor + '80'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} style={styles.actionButton}>
            <DeleteIcon size={20} color="#ff4444" />
          </TouchableOpacity>
        </View>
      </View>

      <ConfirmDialog
        visible={showDeleteConfirm}
        title="删除目标"
        message={`确定要删除"${goal.title}"吗？此操作无法撤销。`}
        confirmText="删除"
        cancelText="取消"
        destructive={true}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkbox: {
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    opacity: 0.8,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    padding: 4,
    borderRadius: 4,
    minWidth: 28,
    minHeight: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  descriptionInput: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonText: {
    fontWeight: '600',
  },
});