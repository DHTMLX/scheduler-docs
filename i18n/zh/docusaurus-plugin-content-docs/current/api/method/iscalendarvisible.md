---
sidebar_label: "isCalendarVisible"
title: "isCalendarVisible method"
description: "用于识别调度器中日历当前是否显示"
---

# isCalendarVisible

### Description

@short: 用于识别调度器中日历当前是否显示

@signature: isCalendarVisible: () =\> boolean | HTMLElement

### Returns
- ` cal` - (boolean | HTMLElement) - <ul><li><b>迷你日历的HTML元素</b> - 当迷你日历可见时 </li> <li><b>false</b> - 当迷你日历不可见时 </li> </ul>

### Example

~~~jsx
// 检查迷你日历是否可见
const check = scheduler.isCalendarVisible(); // -> <div class="dhx_minical_popup">…</div>
~~~

### Related samples
- [Mini calendar in the scheduler header](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)
- [Mini calendar with the recurring events](https://docs.dhtmlx.com/scheduler/samples/05_calendar/06_recurring_form.html)

### Details

:::note
 此方法仅在启用了[minical](guides/extensions-list.md#minicalendardatepicker) 插件时有效。 
:::

### Related Guides
- [미니 캘린더(날짜 선택기)](guides/minicalendar.md)
