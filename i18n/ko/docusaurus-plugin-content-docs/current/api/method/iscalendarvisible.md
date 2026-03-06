---
sidebar_label: "isCalendarVisible"
title: "isCalendarVisible method"
description: "스케줄러에서 캘린더가 현재 표시되고 있는지 식별합니다."
---

# isCalendarVisible

### Description

@short: 스케줄러에서 캘린더가 현재 표시되고 있는지 식별합니다.

@signature: isCalendarVisible: () =\> boolean | HTMLElement

### Returns
- ` cal` - (boolean | HTMLElement) - <ul><li><b>미니 캘린더의 HTML 요소</b> - 미니 캘린더가 보일 때 </li> <li><b>false</b> - 미니 캘린더가 보이지 않을 때 </li> </ul>

### Example

~~~jsx
//미니 캘린더가 보이는지 확인
var check = scheduler.isCalendarVisible(); // -> <div class="dhx_minical_popup">…</div>
~~~

### Related samples
- [Mini calendar in the scheduler header](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)
- [Mini calendar with the recurring events](https://docs.dhtmlx.com/scheduler/samples/05_calendar/06_recurring_form.html)

### Details

:::note
 이 메서드는 [minical](guides/extensions-list.md#mini-calendar-date-picker) 플러그인이 활성화된 경우에만 작동합니다. 
:::

### Related Guides
- ["미니 캘린더(날짜 선택기)"](guides/minicalendar.md)
