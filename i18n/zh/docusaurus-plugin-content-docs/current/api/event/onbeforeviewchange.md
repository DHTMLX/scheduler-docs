---
sidebar_label: "onBeforeViewChange"
title: "onBeforeViewChange event"
description: "在用户从当前视图切换到另一个视图之前触发"
---

# onBeforeViewChange

### Description

@short: 在用户从当前视图切换到另一个视图之前触发

@signature: onBeforeViewChange: (old_mode: string, old_date: object, mode: string, date: object) =\> boolean

### Parameters

- `old_mode` - (required) *string* - 当前激活的视图
- `old_date` - (required) *object* - 当前聚焦的日期
- `mode` - (required) *string* - 即将激活的视图
- `date` - (required) *object* - 被选择的新日期

### Returns
- ` result` - (boolean) - 指示是否应继续执行默认事件操作（<b>true</b>）或阻止操作（<b>false</b>）

### Example

~~~jsx
scheduler.attachEvent("onBeforeViewChange", function(old_mode,old_date,mode,date){
    // 可以在这里添加自定义逻辑
    return true;
});
~~~

### Related samples
- [Configuring the Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/23_map_view_timeframes.html)

### Details

- 通过返回 *false* 可以阻止此事件，从而保持调度器停留在当前视图。
- 当调度器首次加载页面时，该事件也会触发；此时，**old_mode** 和 **old_date** 将是未定义的。
