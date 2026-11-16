---
sidebar_label: sidebar
title: "sidebar API"
description: "提供对 Sidebar 插件的运行时访问"
---

# sidebar

### 描述

@short: 提供对 Sidebar 插件的运行时访问

@signature: scheduler.ext.sidebar: SidebarApi

### 示例

~~~js
scheduler.plugins({ toolbar: true, sidebar: true });
scheduler.init("scheduler_here");
scheduler.ext.sidebar.toggle();
~~~

### 详细说明

调用 `scheduler.plugins({ sidebar: true })` 后可使用该 API。`show()`、`hide()` 和 `toggle()` 会更改渲染的面板。`isCollapsed()` 报告可见状态，`isOverlay()` 报告 Sidebar 当前是否为覆盖层。`refresh()` 重新读取 `scheduler.config.sidebar`；`getItemNode(id)` 返回项节点或 `null`；`getDefaultItems()` 返回默认项 ID。

### 相关指南

- [Sidebar](guides/sidebar.md)