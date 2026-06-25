---
sidebar_label: isCalendarVisible
title: "isCalendarVisible method"
description: "checks whether the calendar is currently opened in the scheduler"
---

# isCalendarVisible

### Description

@short: Checks whether the calendar is currently opened in the scheduler

@signature: isCalendarVisible: () =\> boolean|HTMLElement

### Returns
- ` cal` - (boolean | HTMLElement) - <ul><li><b>the HTML object element of the mini calendar </b> - if the mini calendar is currently open </li> <li><b>false</b> - if the mini calendar is currently closed </li> </ul>

### Example

~~~jsx
//if the mini calendar is opened
const check= scheduler.isCalendarVisible();// -><div class=​"dhx_minical_popup">​…​</div>​
~~~

### Related samples
- [Mini calendar in the scheduler header](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)
- [Mini calendar with the recurring events](https://docs.dhtmlx.com/scheduler/samples/05_calendar/06_recurring_form.html)

### Details

:::note
 The method requires the [minical](guides/extensions-list.md#mini-calendar-date-picker) plugin to be activated. 
:::

### Related Guides
- [Mini Calendar (Date Picker)](guides/minicalendar.md)
