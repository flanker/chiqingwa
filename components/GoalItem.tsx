import { Goal } from "@/types/Goal";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Dialog, IconButton, Portal, Text, TextInput } from "react-native-paper";

interface GoalItemProps {
  goal: Goal;
  onUpdate: (goal: Goal) => void;
  onDelete: (id: string) => void;
}

export function GoalItem({ goal, onUpdate, onDelete }: GoalItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(goal.title);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate({
        ...goal,
        title: editTitle.trim(),
        updatedAt: new Date(),
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(goal.title);
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
            <IconButton
              icon={goal.completed ? "checkbox-marked" : "checkbox-blank-outline"}
              size={24}
              onPress={toggleCompleted}
              iconColor={goal.completed ? "#4caf50" : "#666"}
            />
            <View style={styles.textContainer}>
              <Text
                variant="titleMedium"
                style={[styles.title, goal.completed && { textDecorationLine: "line-through", opacity: 0.6 }]}
              >
                {goal.title}
              </Text>
            </View>
            <View style={styles.actions}>
              <IconButton icon="pencil" size={20} onPress={() => setIsEditing(true)} />
              <IconButton icon="delete" size={20} iconColor="#f44336" onPress={handleDelete} />
            </View>
          </View>
        </Card.Content>
      </Card>

      <Portal>
        <Dialog visible={showDeleteConfirm} onDismiss={() => setShowDeleteConfirm(false)}>
          <Dialog.Title>删除目标</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">确定要删除&ldquo;{goal.title}&rdquo;吗？此操作无法撤销。</Text>
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
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 0,
  },
  actions: {
    flexDirection: "row",
  },
  input: {
    marginBottom: 12,
  },
  editActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
});
