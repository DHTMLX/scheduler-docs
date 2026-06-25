---
sidebar_label: "render"
title: "render method"
description: "刷新scheduler显示"
---

# render

### Description

@short: 刷新scheduler显示

@signature: render: (date?: Date, view?: string) =\> void

### Parameters

- `date` - (optional) *Date* - 要显示的日期
- `view` - (optional) *string* - 要切换到的视图名称

### Example

~~~jsx
// 使用新配置更新布局
scheduler.config.hour_size_px = 88;
scheduler.render();


// 切换到不同日期
scheduler.render(new Date(2027,7,4));

// 切换到不同视图
scheduler.render(null, "week");
~~~

### Details

此方法是 [scheduler.setCurrentView](api/method/setcurrentview.md) 的别名，功能相同。

- 默认视图名称包括 'day'、'week' 和 'month'。对于其他视图，请使用它们的 <b>name</b> 参数。
- 调用此方法会触发 [onBeforeViewChange](api/event/onbeforeviewchange.md) 和 [onViewChange](api/event/onviewchange.md) 事件。
- 它类似于 [updateView](api/method/updateview.md)，但关键区别在于 [updateView](api/method/updateview.md) **不会触发任何事件**。

### Related API
- [setCurrentView](api/method/setcurrentview.md)
- [onBeforeViewChange](api/event/onbeforeviewchange.md)
- [onViewChange](api/event/onviewchange.md)
- [updateView](api/method/updateview.md)
