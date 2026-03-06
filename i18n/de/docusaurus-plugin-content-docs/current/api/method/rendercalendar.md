---
sidebar_label: "renderCalendar"
title: "renderCalendar method"
description: "erzeugt einen kompakten Kalender"
---

# renderCalendar

### Description

@short: Erzeugt einen kompakten Kalender

@signature: renderCalendar: (config: any) =\> HTMLElement

### Parameters

- `config` - (required) *object* - die Konfigurationseinstellungen für den Kalender

### Returns
- ` div` - (HTMLElement) - das HTML-Element des Kalenders

### Example

~~~jsx
const calendar = scheduler.renderCalendar({
    container:"cal_here", 
    navigation:true,
    handler:function(date, calendar){
        scheduler.setCurrentView(date, scheduler._mode);
    }
});
~~~

### Related samples
- [Mini calendar in the scheduler header](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)
- [Mini calendar without the scheduler](https://docs.dhtmlx.com/scheduler/samples/05_calendar/02_without_scheduler.html)

### Details

:::note
 Diese Methode erfordert, dass das [minical](guides/extensions-list.md#mini-calendar-date-picker) Plugin aktiviert ist. 
::: 

Das Konfigurationsobjekt kann folgende Eigenschaften enthalten:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>container</b></td>
  <td>(<i>string, object</i>) der HTML-Container (oder dessen ID), in dem der Kalender platziert wird. Diese Angabe ist optional.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>position</b></td>
  <td>(<i>object</i>) gibt die Position des Kalenders an. Dies kann als Koordinaten oder als ID eines HTML-Elements erfolgen.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>date</b></td>
  <td>(<i>string</i>) legt das initial angezeigte Datum im Kalender fest</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>navigation</b></td>
  <td>(<i>boolean</i>) schaltet die Monats-Navigationsbuttons ein oder aus</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>handler</b></td>
  <td>(<i>function</i>) ein Callback, das ausgelöst wird, wenn ein Datum angeklickt wird. Es erhält das angeklickte Datum und die Kalenderinstanz als Argumente</td>
  </tr>
  </tbody>
</table>

~~~js
const calendar = scheduler.renderCalendar({
    container:"for_calendar",
    date:new Date()
});
//
const calendar = scheduler.renderCalendar({
    position:"some_id",
    date:new Date()
});
//
const calendar = scheduler.renderCalendar({
    position: { left: 100, top: 50 },
    date:new Date()
});

~~~

### Related Guides
- [Mini-Kalender (Datumsauswahl)](guides/minicalendar.md)
