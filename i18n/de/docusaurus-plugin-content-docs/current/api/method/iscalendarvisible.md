---
sidebar_label: "isCalendarVisible"
title: "isCalendarVisible method"
description: "ermittelt, ob der Kalender derzeit im Scheduler angezeigt wird"
---

# isCalendarVisible

### Description

@short: Ermittelt, ob der Kalender derzeit im Scheduler angezeigt wird

@signature: isCalendarVisible: () =\> boolean | HTMLElement

### Returns
- ` cal` - (boolean, HTMLElement) - <ul><li><b>das HTML-Element des Mini-Kalenders</b> - wenn der Mini-Kalender sichtbar ist</li> <li><b>false</b> - wenn der Mini-Kalender nicht sichtbar ist</li> </ul>

### Example

~~~jsx
//Überprüfung, ob der Mini-Kalender sichtbar ist
var check = scheduler.isCalendarVisible(); // -> <div class="dhx_minical_popup">…</div>
~~~

### Related samples
- [Mini calendar in the scheduler header](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)
- [Mini calendar with the recurring events](https://docs.dhtmlx.com/scheduler/samples/05_calendar/06_recurring_form.html)

### Details

:::note
 Diese Methode funktioniert nur, wenn das [minical](guides/extensions-list.md#mini-calendar-date-picker) Plugin aktiviert ist. 
:::

### Related Guides
- [Mini-Kalender (Datumsauswahl)](guides/minicalendar.md)
