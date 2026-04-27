---
sidebar_label: "setCurrentView"
title: "setCurrentView method"
description: "显示所选的视图和日期"
---

# setCurrentView

### Description

@short: 显示所选的视图和日期

@signature: setCurrentView: (date?: Date, view?: string) =\> void

### Parameters

- `date` - (optional) *Date* - 要显示的日期
- `view` - (optional) *string* - 要显示的视图名称

### Example

~~~jsx
// 刷新当前视图和日期，不做任何更改
scheduler.setCurrentView();
// 显示当前视图中的2012年7月4日
scheduler.setCurrentView(new Date(2027,7,4));
// 在周视图中显示2012年5月3日
scheduler.setCurrentView(new Date(2027,5,3), "week");
~~~

### Related samples
- [Mini calendar in the scheduler header](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)
- [Mini calendar outside the scheduler](https://docs.dhtmlx.com/scheduler/samples/05_calendar/05_plain_structure.html)

### Details

- 默认视图名称包括"day"，"week"和"month"。对于其他任何视图，请使用其<b>name</b>参数。
- 调用此方法会触发 [onBeforeViewChange](api/event/onbeforeviewchange.md) 和 [onViewChange](api/event/onviewchange.md) 事件。
- 此方法类似于 [updateView](api/method/updateview.md)，但关键区别在于 [updateView](api/method/updateview.md) **不会触发任何事件**。

### Related API
- [onBeforeViewChange](api/event/onbeforeviewchange.md)
- [onViewChange](api/event/onviewchange.md)
- [updateView](api/method/updateview.md)
