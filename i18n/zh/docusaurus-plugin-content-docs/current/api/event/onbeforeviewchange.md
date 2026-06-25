--- 
sidebar_label: onBeforeViewChange
title: "onBeforeViewChange 事件"
description: "在用户将当前视图切换到其他视图之前触发"
---

# onBeforeViewChange

### Description

@short: 在用户将当前视图切换到其他视图之前触发

@signature: onBeforeViewChange: (old_mode: string, old_date: Date, mode: string, date: Date) =\> boolean

### Parameters

- `old_mode` - (required) *string* - 当前活动的视图
- `old_date` - (required) *Date* - 当前活动日期
- `mode` - (required) *string* - 新视图
- `date` - (required) *Date* - 新日期

### Returns
- `result` - (boolean) - 定义事件的默认操作是否将被触发（`true`）还是取消（`false`）

### Example

~~~jsx
scheduler.attachEvent("onBeforeViewChange", (old_mode, old_date, mode, date) => {
    // 在此处编写任意自定义逻辑
    return true;
});
~~~

### Related samples
- [配置地图视图](https://docs.dhtmlx.com/scheduler/samples/03_extensions/23_map_view_timeframes.html)

### Details

- 事件是可被阻塞的。返回 `false`，Scheduler 将保持当前视图打开。
- 事件也会在 Scheduler 最初渲染到页面上时触发。在这种情况下，`old_mode` 和 `old_date` 参数未定义。