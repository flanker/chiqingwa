# 吃青蛙 🐸

一个专注于分层目标管理和执行的个人目标管理应用。核心功能是多层级目标查看：日目标、周目标、月目标和年目标。这是一个系统性工具，帮助用户实现从"年度大目标"到"每日小行动"的完整循环。

## 应用理念

- **目标层次结构**：年 → 月 → 周 → 日的目标分解
- **核心关注点**：将长期目标系统性地分解为可执行的日常任务
- **设计哲学**：遵循"吃青蛙"方法 - 优先处理重要任务

这是一个使用 Expo Router 构建的 React Native 移动应用，支持 iOS、Android 和 Web 平台。应用使用 TypeScript 开发，遵循现代 React Native 开发模式，基于 Expo SDK 53。

## 开始使用

1. 安装依赖

   ```bash
   npm install
   ```

2. 启动应用

   ```bash
   npm start
   # 或者
   npx expo start
   ```

启动后，你可以选择在以下平台打开应用：

- [开发构建](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android 模拟器](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS 模拟器](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go) - 用于体验 Expo 应用开发的有限沙盒环境

## 开发命令

- `npm start` 或 `npx expo start` - 启动开发服务器
- `npm run android` - 在 Android 模拟器上启动
- `npm run ios` - 在 iOS 模拟器上启动
- `npm run web` - 启动 Web 版本
- `npm run lint` - 运行 ESLint 代码质量检查
- `npm run reset-project` - 重置为空白应用（移除启动代码）

## 技术架构

### 基于文件的路由 (Expo Router)
- 使用 Expo Router v5 的文件路由系统
- 主要导航结构位于 `app/` 目录
- 支持嵌套路由和动态路由

### 主要技术栈
- **Expo SDK 53** - 启用新架构
- **React 19** 和 **React Native 0.79.5**
- **TypeScript** - 严格模式和路径别名 (`@/*`)
- **React Navigation** - 带触觉反馈的导航
- **React Native Paper** - Material Design UI 组件库
- **React Native Reanimated** - 动画支持
- **Expo Router** - 基于文件的路由和类型化路由

### 主题系统
- 支持亮色/暗色主题自动切换
- 主题感知组件自动适配颜色方案
- 跨平台设计一致性

## 项目结构

```
app/                    # 路由目录
├── (tabs)/            # 标签页导航组
├── _layout.tsx        # 根布局
└── +not-found.tsx     # 404 页面

components/            # 组件目录
├── ui/               # UI 组件
└── themed/           # 主题组件

constants/            # 常量配置
hooks/               # 自定义 Hooks
assets/              # 静态资源
```

## 了解更多

要了解更多关于使用 Expo 开发项目的信息，请查看以下资源：

- [Expo 文档](https://docs.expo.dev/)：学习基础知识或深入了解高级主题
- [Expo 教程](https://docs.expo.dev/tutorial/introduction/)：跟随分步教程创建在 Android、iOS 和 Web 上运行的项目

## 加入社区

加入我们的开发者社区，一起构建通用应用：

- [Expo GitHub](https://github.com/expo/expo)：查看开源平台并贡献代码
- [Discord 社区](https://chat.expo.dev)：与 Expo 用户交流并提问
