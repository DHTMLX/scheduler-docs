---
sidebar_label: updateView
title: "updateView 方法"
description: "显示指定的视图和日期（不触发任何事件）"
---

# updateView

### Description

@short: 显示指定的视图和日期（不触发任何事件）

@signature: updateView: (date?: Date, view?: string) =\> void

### Parameters

- `date` - (optional) *Date* - 要设置的日期
- `view` - (optional) *string* - 视图名称

### Example

~~~jsx
// 显示当前视图和日期。仅刷新，不改变任何内容
scheduler.updateView();
// 在当前活动视图中显示 2027-08-04
scheduler.updateView(new Date(2027, 7, 4));
// 在周视图中显示 2027-06-03
scheduler.updateView(new Date(2027, 5, 3), "week");
~~~

### Related samples
- [Filtering events](https://docs.dhtmlx.com/scheduler/samples/09_api/09_filtering_events.html)

### Details

- 不带参数调用时，该函数将仅刷新当前视图。
- 默认视图的名称为 'day', 'week', 'month'。要指定其他视图，请使用它的 `name` 参数。
- 此方法类似于 [`setCurrentView()`](api/method/setcurrentview.md)。唯一的区别是，与 `updateView()` 不同， [`setCurrentView()`](api/method/setcurrentview.md) 会触发 [`onBeforeViewChange`](api/event/onbeforeviewchange.md) 和 [`onViewChange`](api/event/onviewchange.md) 事件。

### Related API
- [setCurrentView](api/method/setcurrentview.md)
- [onBeforeViewChange](api/event/onbeforeviewchange.md)
- [onViewChange](api/event/onviewchange.md)