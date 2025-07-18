import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Goal, GoalType } from '@/types/Goal';
import { PlusIcon } from '@/components/icons/ActionIcons';
import React, { useState } from 'react';
import { Modal, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface AddGoalButtonProps {
  type: GoalType;
  onAdd: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export function AddGoalButton({ type, onAdd }: AddGoalButtonProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const tintColor = useThemeColor({}, 'tint');
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

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
      setModalVisible(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: tintColor }]}
        onPress={() => setModalVisible(true)}
      >
        <PlusIcon size={24} color={tintColor === '#0a7ea4' ? '#fff' : '#000'} />
        <ThemedText style={[styles.addButtonText, { color: tintColor === '#0a7ea4' ? '#fff' : '#000' }]}>添加{typeLabels[type]}目标</ThemedText>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancel}
      >
        <View style={styles.modalOverlay}>
          <ThemedView style={[styles.modalContent, { backgroundColor }]}>
            <ThemedText style={styles.modalTitle}>添加{typeLabels[type]}目标</ThemedText>

            <TextInput
              style={[styles.input, { color: textColor, borderColor: tintColor }]}
              value={title}
              onChangeText={setTitle}
              placeholder="目标标题"
              placeholderTextColor={textColor + '80'}
              autoFocus
            />

            <TextInput
              style={[styles.input, styles.descriptionInput, { color: textColor, borderColor: tintColor }]}
              value={description}
              onChangeText={setDescription}
              placeholder="目标描述（可选）"
              placeholderTextColor={textColor + '80'}
              multiline
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: textColor + '20' }]}
                onPress={handleCancel}
              >
                <ThemedText>取消</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: tintColor }]}
                onPress={handleAdd}
              >
                <ThemedText style={{ color: tintColor === '#0a7ea4' ? '#fff' : '#000', fontSize: 16, fontWeight: '600' }}>添加</ThemedText>
              </TouchableOpacity>
            </View>
          </ThemedView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    margin: 16,
    borderRadius: 12,
    gap: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxWidth: 400,
    padding: 24,
    borderRadius: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  descriptionInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
});