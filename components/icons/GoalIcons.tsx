import React from 'react';
import Svg, { Path, Circle, Rect, Line, Polygon } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

// 今日目标 - 太阳与检查清单的组合
export function TodayIcon({ size = 24, color = '#000' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* 太阳外圈光芒 */}
      <Path
        d="M12 2V4M12 20V22M4 12H2M6.31 6.31L4.93 4.93M17.69 6.31L19.07 4.93M6.31 17.69L4.93 19.07M17.69 17.69L19.07 19.07M22 12H20"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* 太阳中心圆圈 */}
      <Circle
        cx="12"
        cy="12"
        r="5"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      {/* 中心的检查标记 */}
      <Path
        d="M9 12L11 14L15 10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// 本周目标 - 7天格子与进度条
export function WeekIcon({ size = 24, color = '#000' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* 日历网格 */}
      <Rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      {/* 顶部标题栏 */}
      <Line
        x1="3"
        y1="8"
        x2="21"
        y2="8"
        stroke={color}
        strokeWidth="1.5"
      />
      {/* 7天的小格子 */}
      <Rect x="5" y="10" width="2" height="2" fill={color} />
      <Rect x="8" y="10" width="2" height="2" fill={color} />
      <Rect x="11" y="10" width="2" height="2" fill={color} />
      <Rect x="14" y="10" width="2" height="2" fill={color} />
      <Rect x="17" y="10" width="2" height="2" fill={color} opacity="0.3" />
      
      {/* 进度条 */}
      <Rect
        x="5"
        y="15"
        width="14"
        height="3"
        rx="1.5"
        stroke={color}
        strokeWidth="1"
        fill="none"
      />
      <Rect
        x="5"
        y="15"
        width="8"
        height="3"
        rx="1.5"
        fill={color}
      />
    </Svg>
  );
}

// 本月目标 - 月历与目标圆环
export function MonthIcon({ size = 24, color = '#000' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* 日历主体 */}
      <Rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      {/* 顶部 */}
      <Line
        x1="3"
        y1="8"
        x2="21"
        y2="8"
        stroke={color}
        strokeWidth="1.5"
      />
      {/* 日历挂钩 */}
      <Line
        x1="8"
        y1="2"
        x2="8"
        y2="6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Line
        x1="16"
        y1="2"
        x2="16"
        y2="6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* 月历网格点 */}
      <Circle cx="7" cy="11" r="0.5" fill={color} />
      <Circle cx="10" cy="11" r="0.5" fill={color} />
      <Circle cx="13" cy="11" r="0.5" fill={color} />
      <Circle cx="16" cy="11" r="0.5" fill={color} />
      <Circle cx="19" cy="11" r="0.5" fill={color} />
      
      <Circle cx="7" cy="14" r="0.5" fill={color} />
      <Circle cx="10" cy="14" r="0.5" fill={color} />
      <Circle cx="13" cy="14" r="0.5" fill={color} />
      <Circle cx="16" cy="14" r="0.5" fill={color} />
      
      {/* 目标圆环 */}
      <Circle
        cx="16"
        cy="16"
        r="3"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="12 6"
      />
      <Circle cx="16" cy="16" r="1" fill={color} />
    </Svg>
  );
}

// 今年目标 - 奖杯与星星
export function YearIcon({ size = 24, color = '#000' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* 奖杯杯身 */}
      <Path
        d="M8 6H16C16.5523 6 17 6.44772 17 7V11C17 13.2091 15.2091 15 13 15H11C8.79086 15 7 13.2091 7 11V7C7 6.44772 7.44772 6 8 6Z"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      {/* 奖杯把手 */}
      <Path
        d="M7 9H5C4.44772 9 4 9.44772 4 10V10C4 11.1046 4.89543 12 6 12H7"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      <Path
        d="M17 9H19C19.5523 9 20 9.44772 20 10V10C20 11.1046 19.1046 12 18 12H17"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      {/* 奖杯底座 */}
      <Rect
        x="9"
        y="15"
        width="6"
        height="3"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      <Rect
        x="7"
        y="18"
        width="10"
        height="2"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      
      {/* 顶部星星 */}
      <Polygon
        points="12,2 12.5,3.5 14,4 12.5,4.5 12,6 11.5,4.5 10,4 11.5,3.5"
        fill={color}
      />
      
      {/* 杯身上的成就标记 */}
      <Circle cx="12" cy="10" r="1.5" fill={color} opacity="0.3" />
      <Path
        d="M10.5 10L11.5 11L13.5 9"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}