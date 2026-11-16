---
sidebar_label: onLayoutSizeChange
title: "onLayoutSizeChange 事件"
description: 可见 Scheduler 布局大小更改时触发
---

# onLayoutSizeChange

### 描述

@short: 在可见布局外壳大小更改时触发

@signature: onLayoutSizeChange: (size: LayoutSize) => void

### 参数

- `size` - （必需）*LayoutSize* - 以整数像素表示的 `{ width, height }` 外壳大小

### 示例

~~~js
scheduler.attachEvent("onLayoutSizeChange", size => {
  scheduler.config.header = size.width < 600 ? compactHeader : wideHeader;
});
~~~

### 详细说明

在可见的 Toolbar 或 Sidebar 外壳模式下，当 `clientWidth` 或 `clientHeight` 更改时触发。它会在 Toolbar 标题协调前接收 `{ width, height }`，因此处理器可在同一次渲染中选择响应式标题。

请参阅[移动端响应式 Scheduler](guides/touch-support.md)。
