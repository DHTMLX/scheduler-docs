--- 
title: "数据与状态管理" 
description: "如何将 React Scheduler 与 React 状态或状态管理器绑定、处理用户编辑，并在 React 管理的数据模型与 Scheduler 管理的数据模型之间进行选择。" 
---

本节介绍如何让 Scheduler 数据与应用程序状态保持同步。内容涵盖推荐的以 React 为驱动的模型（以 React 或存储作为唯一数据源）、面向性能的 Scheduler 管理数据模型，以及对广泛使用的状态库的实际实现。

## 从这里开始

请先阅读以下内容，以了解两种受支持的数据模型及常见的集成模式：

- [数据绑定与状态管理基础](integrations/react/state/state-management-basics.md)

它解释了如何使用 `data.save` 和 `data.batchSave` 回调、加载在各模型中的作用，以及 Scheduler 内部管理数据时有哪些变化。

## 选择你的状态库

下面的每个教程都应用相同的核心模式（state -> props -> Scheduler，changes -> callbacks -> state），但使用各库的特有实现风格：

- [Redux Toolkit](integrations/react/state/redux-toolkit.md)
- [Zustand](integrations/react/state/zustand.md)
- [MobX](integrations/react/state/mobx.md)
- [XState](integrations/react/state/xstate.md)
- [Jotai](integrations/react/state/jotai.md)
- [Valtio](integrations/react/state/valtio.md)

## 实时同步

如果你需要实时更新，请从这里开始：

- [Firebase Integration](integrations/react/firebase-integration.md)

## 性能注意事项

如果你的应用执行大量操作（批量编辑、频繁更新、海量数据集），请关注：

- 使用 `data.batchSave` 以降低更新开销，
- 当 React 不需要立即反映每个变更时，使用 **Scheduler-managed data** 模型。

这两个主题都在 [数据绑定与状态管理基础](integrations/react/state/state-management-basics.md) 中有所涵盖。