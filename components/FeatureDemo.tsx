import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';

export function FeatureDemo() {
  const tintColor = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.section}>
        <ThemedText type="title" style={styles.title}>目标管理功能说明</ThemedText>
        
        <ThemedView style={styles.featureCard}>
          <View style={styles.featureHeader}>
            <IconSymbol name="checkmark.circle.fill" size={24} color={tintColor} />
            <ThemedText style={styles.featureTitle}>标记完成功能</ThemedText>
          </View>
          <ThemedText style={styles.featureDescription}>
            • 点击目标左侧的圆圈图标可以切换完成状态{'\n'}
            • 已完成的目标会显示打钩图标和删除线{'\n'}
            • 目标会自动分组显示：进行中 / 已完成
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.featureCard}>
          <View style={styles.featureHeader}>
            <IconSymbol name="pencil" size={24} color={tintColor} />
            <ThemedText style={styles.featureTitle}>编辑功能</ThemedText>
          </View>
          <ThemedText style={styles.featureDescription}>
            • 点击目标右侧的铅笔图标进入编辑模式{'\n'}
            • 可以修改目标标题和描述{'\n'}
            • 支持保存和取消操作{'\n'}
            • 修改会自动保存到本地存储
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.featureCard}>
          <View style={styles.featureHeader}>
            <IconSymbol name="trash" size={24} color="#ff4444" />
            <ThemedText style={styles.featureTitle}>删除功能</ThemedText>
          </View>
          <ThemedText style={styles.featureDescription}>
            • 点击目标右侧的垃圾桶图标删除目标{'\n'}
            • 会弹出确认对话框防止误删{'\n'}
            • 删除后数据从本地存储中移除
          </ThemedText>
        </ThemedView>

        <ThemedView style={[styles.featureCard, styles.demoCard]}>
          <ThemedText style={styles.demoTitle}>🎯 使用步骤：</ThemedText>
          <ThemedText style={styles.demoSteps}>
            1. 点击「添加今日目标」按钮创建新目标{'\n'}
            2. 添加目标后，每个目标条目会显示三个操作区域：{'\n'}
            {'   '}• 左侧：圆圈 (点击标记完成){'\n'}
            {'   '}• 右侧：铅笔 (点击编辑) + 垃圾桶 (点击删除){'\n'}
            3. 试试添加一个目标，然后体验这些功能！
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.exampleCard}>
          <ThemedText style={styles.exampleTitle}>示例目标布局：</ThemedText>
          <View style={styles.mockGoal}>
            <View style={styles.mockCheckbox}>
              <IconSymbol name="circle" size={20} color={textColor + '60'} />
            </View>
            <View style={styles.mockContent}>
              <ThemedText style={styles.mockTitle}>学习新技能</ThemedText>
              <ThemedText style={styles.mockDesc}>完成在线课程第一章</ThemedText>
            </View>
            <View style={styles.mockActions}>
              <IconSymbol name="pencil" size={16} color={textColor + '80'} />
              <IconSymbol name="trash" size={16} color="#ff4444" />
            </View>
          </View>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  featureCard: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 120, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(0, 120, 255, 0.1)',
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  demoCard: {
    backgroundColor: 'rgba(255, 193, 7, 0.05)',
    borderColor: 'rgba(255, 193, 7, 0.2)',
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  demoSteps: {
    fontSize: 14,
    lineHeight: 22,
  },
  exampleCard: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(40, 40, 40, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(40, 40, 40, 0.1)',
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  mockGoal: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    borderRadius: 8,
    gap: 12,
  },
  mockCheckbox: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mockContent: {
    flex: 1,
  },
  mockTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  mockDesc: {
    fontSize: 12,
    opacity: 0.7,
  },
  mockActions: {
    flexDirection: 'row',
    gap: 12,
  },
});