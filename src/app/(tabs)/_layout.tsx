import React, { useState } from "react";
import { BottomNavigation } from "react-native-paper";
import TodayScreen from "./index";
import MonthScreen from "./month";
import WeekScreen from "./week";
import YearScreen from "./year";

export default function TabLayout() {
  const [index, setIndex] = useState(0);

  const routes = [
    {
      key: "today",
      title: "今日",
      focusedIcon: "calendar-today",
      unfocusedIcon: "calendar-today",
    },
    {
      key: "week",
      title: "本周",
      focusedIcon: "calendar-range",
      unfocusedIcon: "calendar-range",
    },
    {
      key: "month",
      title: "本月",
      focusedIcon: "calendar-month",
      unfocusedIcon: "calendar-month",
    },
    {
      key: "year",
      title: "今年",
      focusedIcon: "calendar-blank",
      unfocusedIcon: "calendar-blank",
    },
  ];

  const renderScene = BottomNavigation.SceneMap({
    today: TodayScreen,
    week: WeekScreen,
    month: MonthScreen,
    year: YearScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{ backgroundColor: "transparent" }}
    />
  );
}
