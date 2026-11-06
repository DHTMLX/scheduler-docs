---
sidebar_label: onBeforeEventDisplay
title: "onBeforeEventDisplay 事件"
description: "在渲染前过滤事件"
---

# onBeforeEventDisplay

### 描述

@short: 在事件渲染前触发，并可阻止其显示

@signature: onBeforeEventDisplay: (id: string | number, event: object) =\> boolean

### 参数

- `id` - （必需）*string | number* - 事件 ID
- `event` - （必需）*object* - 事件对象

### 返回值
- `result` - (boolean) - 定义默认操作是触发（**true**）还是取消（**false**）

### 示例

~~~jsx
scheduler.attachEvent("onBeforeEventDisplay", function(id, event){
    return event.priority !== "low";
});
~~~

### 详细说明

对于每个考虑渲染的事件都会触发，包括重复事件实例和用于迷你日历标记的事件。它与当前视图的 `filter_<view>` 函数同时运行。

可以附加多个 `onBeforeEventDisplay` 处理器。仅当视图过滤器和所有处理器都返回 `true` 时才显示事件。分离一个处理器不会影响其他处理器。

### 从 v7.2 迁移

在 v7.2 中，`onBeforeEventDisplay(event, view)` 属于 `showEvent()` 生命周期。在 v8.0 中请使用 [onBeforeEventShow](api/event/onbeforeeventshow.md) 实现该行为。v8.0 的 `onBeforeEventDisplay` 是本页介绍的渲染条件，接收 `(id, event)`。

### 相关 API
- [onBeforeEventShow](api/event/onbeforeeventshow.md)
- [onAfterEventShow](api/event/onaftereventshow.md)