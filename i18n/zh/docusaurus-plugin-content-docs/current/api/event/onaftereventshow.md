---
sidebar_label: onAfterEventShow
title: "onAfterEventShow 事件"
description: "Scheduler 显示由 'showEvent' 方法请求的事件后触发"
---

# onAfterEventShow

### 描述

@short: Scheduler 显示由 `showEvent` 方法请求的事件后触发

@signature: onAfterEventShow: (event: object, view: string) =\> void

### 参数

- `event` - （必需）*object* - 事件对象
- `view` - （必需）*string* - 用于显示事件的视图名称

### 示例

~~~js
scheduler.attachEvent("onAfterEventShow", function(event, view){
    console.log("event is displayed in " + view);
});
~~~

### 详细说明

该事件属于 `showEvent()` 生命周期，在 Scheduler 切换到包含所请求事件的视图后触发。

### 从 v7.2 迁移

该事件替代原来的 `onAfterEventDisplay(event, view)` 生命周期事件。请将事件重命名为 `onAfterEventShow`；其 `(event, view)` 参数保持不变。

### 相关 API

- [showEvent](api/method/showevent.md)
- [onBeforeEventShow](api/event/onbeforeeventshow.md)
- [从 v7.2 迁移到 v8.0](migration.md#event-display-and-showevent-lifecycle-events)