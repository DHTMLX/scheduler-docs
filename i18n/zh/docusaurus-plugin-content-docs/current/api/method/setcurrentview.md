---
sidebar_label: setCurrentView
title: "setCurrentView method"
description: "显示指定的视图和日期"
---

# setCurrentView

### Description

@short: 显示指定的视图和日期

@signature: setCurrentView: (date?: Date, view?: string) =\> void

### Parameters

- `date` - (optional) *Date* - 要显示的日期
- `view` - (optional) *string* - 要显示的视图名称

### Example

~~~jsx
// 刷新当前视图和日期，不做任何更改
scheduler.setCurrentView();
// 显示当前视图中的2027年8月4日
scheduler.setCurrentView(new Date(2027, 7, 4));
// 在周视图中显示2027年6月3日
scheduler.setCurrentView(new Date(2027, 5, 3), "week");
~~~

### Related samples
- [Mini calendar in the scheduler header](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)
- [Mini calendar outside the scheduler](https://docs.dhtmlx.com/scheduler/samples/05_calendar/05_plain_structure.html)

### Details

- 默认视图的名称是 'day', 'week', 'month'. 要指定任何其他视图，请使用其 `name` 参数。
- 该方法会触发 [`onBeforeViewChange`](api/event/onbeforeviewchange.md) 和 [`onViewChange`](api/event/onviewchange.md)。
- 该方法类似于 [`updateView()`](api/method/updateview.md)。唯一的区别是 [`updateView()`](api/method/updateview.md) 不会生成任何事件。

### Related API
- [onBeforeViewChange](api/event/onbeforeviewchange.md)
- [onViewChange](api/event/onviewchange.md)
- [updateView](api/method/updateview.md)