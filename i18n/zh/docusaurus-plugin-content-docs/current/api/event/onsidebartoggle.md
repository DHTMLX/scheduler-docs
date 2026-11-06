---
sidebar_label: onSidebarToggle
title: "onSidebarToggle 事件"
description: "在可见的 Sidebar 状态更改时触发"
---

# onSidebarToggle

### 描述

@short: 在可见的 Sidebar 状态更改时触发

@signature: onSidebarToggle: (collapsed: boolean, overlay: boolean) => void

### 参数

- `collapsed` - （必需）*boolean* - Sidebar 是否隐藏
- `overlay` - （必需）*boolean* - Sidebar 是否以覆盖层方式运行

### 示例

~~~js
scheduler.attachEvent("onSidebarToggle", (collapsed, overlay) => {
    console.log(collapsed ? "Sidebar closed" : overlay ? "Sidebar opened as an overlay" : "Sidebar opened");
});
~~~

### 详细说明

在 `show()`、`hide()`、`toggle()` 以及响应式模式更改后，如果可见状态发生变化，就会触发该事件。它需要 Sidebar 插件。