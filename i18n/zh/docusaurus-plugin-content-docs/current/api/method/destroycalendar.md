---
sidebar_label: "destroyCalendar"
title: "destroyCalendar method"
description: "移除之前创建的迷你日历"
---

# destroyCalendar

### Description

@short: 移除之前创建的迷你日历

@signature: destroyCalendar: (name?: any) =\> void

### Parameters

- `name` - (optional) *object* - 要移除的迷你日历对象（如果未提供，scheduler 将尝试移除最近创建的迷你日历）

### Example

~~~jsx
const calendar = scheduler.renderCalendar(...);
...
scheduler.destroyCalendar(calendar);
~~~

### Related samples
- [Mini calendar in the scheduler header](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)
- [Mini calendar with the recurring events](https://docs.dhtmlx.com/scheduler/samples/05_calendar/06_recurring_form.html)

### Details

:::note
 该方法需要激活 [minical](guides/extensions-list.md#minicalendardatepicker) 插件。 
:::

### Related API
- [renderCalendar](api/method/rendercalendar.md)

### Related Guides
- [미니 캘린더(날짜 선택기)](guides/minicalendar.md)
