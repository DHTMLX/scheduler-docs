---
sidebar_label: "destroyCalendar"
title: "destroyCalendar method"
description: "이전에 생성된 미니 캘린더를 제거합니다."
---

# destroyCalendar

### Description

@short: 이전에 생성된 미니 캘린더를 제거합니다.

@signature: destroyCalendar: (name?: any) =\> void

### Parameters

- `name` - (optional) *object* - 제거할 미니 캘린더 객체 (제공하지 않을 경우, 스케줄러는 가장 최근에 생성된 미니 캘린더를 제거하려고 시도합니다)

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
 이 메서드는 [minical](guides/extensions-list.md#mini-calendar-date-picker) 플러그인이 활성화되어 있어야 합니다. 
:::

### Related API
- [renderCalendar](api/method/rendercalendar.md)

### Related Guides
- ["미니 캘린더(날짜 선택기)"](guides/minicalendar.md)
