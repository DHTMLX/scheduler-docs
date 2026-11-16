---
sidebar_label: onBeforeEventShow
title: "onBeforeEventShow 事件"
description: "Scheduler 显示由 'showEvent' 方法请求的事件前触发"
---

# onBeforeEventShow

### 描述

@short: Scheduler 显示由 `showEvent` 方法请求的事件前触发

@signature: onBeforeEventShow: (event: object, view: string) =\> boolean

### 参数

- `event` - （必需）*object* - 事件对象
- `view` - （必需）*string* - 用于显示事件的视图名称

### 返回值

- `result` - (boolean) - 定义默认操作是触发（**true**）还是取消（**false**）

### 示例

~~~js
scheduler.attachEvent("onBeforeEventShow", function(event, view){
    return true;
});
~~~

### 详细说明

该事件属于 `showEvent()` 生命周期。Scheduler 渲染普通事件时不会运行；请使用 [onBeforeEventDisplay](api/event/onbeforeeventdisplay.md) 过滤渲染事件。

### 从 v7.2 迁移

该事件替代原来的 `onBeforeEventDisplay(event, view)` 生命周期事件。请将事件重命名为 `onBeforeEventShow`；其 `(event, view)` 参数保持不变。

### 相关 API

- [showEvent](api/method/showevent.md)
- [onAfterEventShow](api/event/onaftereventshow.md)
- [从 v7.2 迁移到 v8.0](migration.md#event-display-and-showevent-lifecycle-events)