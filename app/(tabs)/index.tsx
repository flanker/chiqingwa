import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GoalManager } from '@/components/GoalManager';
import { StorageDebug } from '@/components/StorageDebug';
import { FeatureDemo } from '@/components/FeatureDemo';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function TodayScreen() {
  const [showDebug, setShowDebug] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const tintColor = useThemeColor({}, 'tint');
  const iconColor = useThemeColor({}, 'icon');

  if (showDebug) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <TouchableOpacity 
          style={[styles.toggleButton, { backgroundColor: tintColor }]} 
          onPress={() => setShowDebug(false)}
        >
          <ThemedText style={[styles.toggleText, { color: tintColor === '#0a7ea4' ? '#fff' : '#000' }]}>返回目标管理</ThemedText>
        </TouchableOpacity>
        <StorageDebug />
      </SafeAreaView>
    );
  }

  if (showDemo) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <TouchableOpacity 
          style={[styles.toggleButton, { backgroundColor: tintColor }]} 
          onPress={() => setShowDemo(false)}
        >
          <ThemedText style={[styles.toggleText, { color: tintColor === '#0a7ea4' ? '#fff' : '#000' }]}>返回目标管理</ThemedText>
        </TouchableOpacity>
        <FeatureDemo />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.helpButton, { backgroundColor: iconColor + '20' }]} 
          onPress={() => setShowDemo(true)}
        >
          <ThemedText style={styles.buttonText}>❓</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.debugButton, { backgroundColor: iconColor + '15' }]} 
          onPress={() => setShowDebug(true)}
        >
          <ThemedText style={styles.buttonText}>🔧</ThemedText>
        </TouchableOpacity>
      </View>
      <GoalManager
        type="today"
        title="今日目标"
        emptyMessage="今天还没有设定目标，快来添加一个吧！专注完成今天最重要的事情。"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    top: 10,
    right: 20,
    zIndex: 1000,
    flexDirection: 'row',
    gap: 8,
  },
  helpButton: {
    padding: 8,
    borderRadius: 20,
  },
  debugButton: {
    padding: 8,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 16,
  },
  toggleButton: {
    padding: 12,
    margin: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleText: {
    fontWeight: '600',
  },
});