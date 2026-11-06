---
sidebar_label: onViewStateChange
title: "onViewStateChange 事件"
description: Scheduler 发布视图状态后触发
---

# onViewStateChange

### 描述

@short: 在 Scheduler 发布视图状态后触发

@signature: onViewStateChange: (state: ViewState) => void

### 参数

- `state` - （必需）*ViewState* - 已发布的 Scheduler 视图状态

### 示例

~~~js
scheduler.attachEvent("onViewStateChange", state => {
    document.title = state.label;
});
~~~

### 详细说明

在 Scheduler 发布模式、日期、日期标签或 ARIA 视图状态后触发。它接收与 `getViewState()` 相同的结构，也会在直接调用 `updateView()` 后运行。
