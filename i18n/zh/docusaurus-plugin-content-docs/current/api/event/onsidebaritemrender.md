---
sidebar_label: onSidebarItemRender
title: "onSidebarItemRender 事件"
description: "在自定义 Sidebar 项挂载时触发"
---

# onSidebarItemRender

### 描述

@short: 在自定义 Sidebar 项挂载时触发

@signature: onSidebarItemRender: (id: string, node: HTMLElement) => void

### 参数

- `id` - （必需）*string* - 自定义项 ID
- `node` - （必需）*HTMLElement* - 空的项容器

### 示例

~~~js
scheduler.attachEvent("onSidebarItemRender", (id, node) => {
    if (id === "summary") node.textContent = "Upcoming events";
});
~~~

### 详细说明

该事件针对自定义 `{ id }` Sidebar 项触发。内置 `minicalendar` 和 `event_groups` 项自行管理其内容。