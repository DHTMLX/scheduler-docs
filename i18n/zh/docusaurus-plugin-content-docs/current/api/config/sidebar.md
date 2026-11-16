---
sidebar_label: sidebar
title: "sidebar 配置"
description: "配置 Scheduler Sidebar 插件"
---

# sidebar

### 描述

@short: 配置 Scheduler Sidebar 插件

@signature: sidebar: SidebarConfig | false

### 示例

~~~js
scheduler.plugins({ toolbar: true, sidebar: true });
scheduler.config.sidebar = {
    items: ["minicalendar", "event_groups"],
    position: "left",
    width: 260,
    collapsed: false,
    overlay_width: 768
};
~~~

### 详细说明

请在 `init()` 之前启用 `sidebar: true`。若没有此配置，Sidebar 会使用 `minicalendar`，并在配置了事件组时使用 `event_groups`。默认值为 `position: "left"`、`width: 260`、`collapsed: false` 和 `overlay_width: 768`。

`items` 包含内置 ID 或 `{ id, css }` 自定义项。自定义项是通过 `onSidebarItemRender` 提供的空节点。内置事件组项接受 `label` 和 `select_all` 覆盖值。

低于 `overlay_width` 时，只有 Toolbar 中渲染了可见的 `toggle_sidebar` 项，Sidebar 才会成为关闭的覆盖层。没有该控件时，面板保持停靠。`collapsed` 是初始停靠状态；`scheduler.ext.sidebar` 的运行时调用不会将状态写回此配置。将 `sidebar` 设为 `false` 可隐藏该区域。

### 相关 API

- [sidebar](api/other/sidebar.md)
- [header](api/config/header.md)

### 相关指南

- [Sidebar](guides/sidebar.md)
- [应用布局](guides/application-layout.md)