---
title: "React Scheduler"
sidebar_label: React Scheduler
description: "在 React 中通过官方包装器安装、配置并使用 DHTMLX Scheduler。"
image: /img/frameworks/react.png
---

React Scheduler 是 DHTMLX Scheduler 的官方 React 包装器。它允许将 Scheduler 图表作为一个 React 组件使用，同时仍然支持完整的配置 API。

如果您想要了解 React Scheduler 的工作原理及其提供的功能，请从 [概览](integrations/react/overview.md) 开始。

## 快速开始

如果您是此包装器的新手，请按以下顺序进行：

1. [安装](integrations/react/installation.md) - 选择 React Scheduler 的评估版（公开 npm）或专业版（私有 npm）版本。
2. [快速开始](integrations/react/quick-start.md) - 渲染您的第一个图表并验证设置。
3. [配置](integrations/react/configuration-props.md) - 了解如何使用 props、templates 和 event handlers。

## 框架集成

如果您的应用程序是使用元框架构建的，请使用这些指南以获得框架相关的设置：

- [Next.js](integrations/react/nextjs.md) - 客户端组件设置和常见的 SSR 限制
- [Remix](integrations/react/remix.md) - 基于路由的设置和集成说明

## 选择数据绑定模型

React Scheduler 支持两种数据绑定方法：

- **React 管理的数据**（对大多数 React 应用推荐）。您将事件保存在 React 中或在状态管理器中，作为 props 传递，并通过 `data.save`/`data.batchSave` 回调来处理更新。

- **Scheduler 管理的数据**（在特定、对性能敏感的场景中有用）
您初始化数据一次，让 Scheduler（以及您的后端）拥有数据生命周期。React 不会在每次变更后重新应用更新的 props。

要了解这两种方法及其取舍，请阅读 [数据绑定与状态管理基础](integrations/react/state/state-management-basics.md)。

## 数据与状态教程

如果您正在使用状态管理库，位于 [数据与状态管理](/integrations/react/state/) 的指南展示了为每个库实现的相同集成模式（Redux Toolkit、Zustand、MobX 等），以及与 Firebase 的实时同步。

## 示例与评估资源

如果您正在评估 React Scheduler，评估页在评估期间提供技术支持。请参阅 [安装](integrations/react/installation.md)。