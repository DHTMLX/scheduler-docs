---
sidebar_label: "onTimelineCreated"
title: "onTimelineCreated event"
description: "当Timeline视图已被设置完成但尚未显示在页面上时触发（仅适用于Timeline视图）"
---

# onTimelineCreated

### Description

@short: 当Timeline视图已被设置完成但尚未显示在页面上时触发（仅适用于Timeline视图）

@signature: onTemplatesReady: (config: object) =\> void

### Parameters

- `config` - (required) *object* - Timeline视图的配置对象

### Example

~~~jsx
scheduler.attachEvent("onTimelineCreated", function (config){
    // 在这里编写任何自定义逻辑
});
~~~

### Details

该事件由[createTimelineView](api/method/createtimelineview.md)方法调用。
