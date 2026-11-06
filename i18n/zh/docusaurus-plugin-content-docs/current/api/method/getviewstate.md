---
sidebar_label: getViewState
title: "getViewState 方法"
description: 返回最后完成的 Scheduler 视图状态
---

# getViewState

### 描述

@short: 返回最后完成的 Scheduler 视图状态

@signature: getViewState(): ViewState | null

### 返回值

- `state` - (ViewState | null) - 最后发布的视图状态；首次完成渲染前为 `null`

### 示例

~~~js
const state = scheduler.getViewState();
if (state) {
  console.log(state.mode, state.label);
}
~~~

### 详细说明

返回由 Scheduler 管理的当前模式、日期、日期标签和 ARIA 标签；首次完成渲染前返回 `null`。返回的日期是副本。该状态优先于 Toolbar 的 `views` 值，包括直接调用 `updateView()` 之后。
