---
sidebar_label: "updateView"
title: "updateView method"
description: "显示指定的视图和日期，但不触发任何事件"
---

# updateView

### Description

@short: 显示指定的视图和日期，但不触发任何事件

@signature: updateView: (date?: Date, view?: string) =\> void

### Parameters

- `date` - (optional) *Date* - （可选）要设置的日期
- `view` - (optional) *string* - （可选）视图名称

### Example

~~~jsx
// 刷新当前视图和日期，但不做任何更改
scheduler.updateView();
// 在当前视图中显示2027年7月4日
scheduler.updateView(new Date(2027,7,4));
// 在“week”视图中显示2027年5月3日
scheduler.updateView(new Date(2027,5,3), "week");
~~~

### Related samples
- [Filtering events](https://docs.dhtmlx.com/scheduler/samples/09_api/09_filtering_events.html)

### Details

- 调用此函数而不传入任何参数，仅刷新当前视图。
- 默认视图名称为 'day'、'week' 和 'month'。若要使用其他视图，请提供其**name**参数。
- 此方法与 [setCurrentView](api/method/setcurrentview.md) 类似。主要区别是，[setCurrentView](api/method/setcurrentview.md) 会触发 [onBeforeViewChange](api/event/onbeforeviewchange.md) 和 [onViewChange](api/event/onviewchange.md) 事件，而 **updateView** 则不会。

### Related API
- [setCurrentView](api/method/setcurrentview.md)
- [onBeforeViewChange](api/event/onbeforeviewchange.md)
- [onViewChange](api/event/onviewchange.md)
