---
sidebar_label: "onMouseDown"
title: "onMouseDown event"
description: "Wird ausgelöst, wenn ein Benutzer auf ein Scheduler-Element klickt, das keinen vordefinierten 'onclick'-Handler besitzt."
---

# onMouseDown

### Description

@short: Wird ausgelöst, wenn ein Benutzer auf ein Scheduler-Element klickt, das keinen vordefinierten 'onclick'-Handler besitzt.

@signature: onMouseDown: (className: string) =\> void

### Parameters

- `className` - (required) *string* - der CSS-Klassenname des angeklickten Elements

### Example

~~~jsx
scheduler.attachEvent("onMouseDown", function(className){
    //any custom logic here
});
~~~

### Details

Die Scheduler-Elemente mit vordefinierten 'onclick'-Handlern sind in der folgenden Tabelle aufgeführt.

<br>

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <caption class="caption">
  <strong>Tabelle 1 </strong>
  Scheduler-Elemente mit vordefinierten 'onclick'-Handlern
  </caption>
  <thead>
  <tr>
  <th>
  Class name
  </th>
  <th>
  Element
  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>dhx_cal_event_line</td>
  <td>Mehrtägige Events, die in den Day-, Week-, Month-, Units-Views angezeigt werden, sowie jedes Event in der Timeline-Ansicht</td>
  </tr>
  <tr>
  <td>dhx_cal_event_clear</td>
  <td>Einzeltägige Events in der Month-Ansicht</td>
  </tr>
  <tr>
  <td>dhx_event_move</td>
  <td>Der Event-Box-Header, der zum Verschieben von Events in den Day-, Week-, Units-Views verwendet wird</td>
  </tr>
  <tr>
  <td>dhx_wa_ev_body</td>
  <td>Ein Event, das in der WeekAgenda-Ansicht angezeigt wird</td>
  </tr>
  <tr>
  <td>dhx_event_resize</td>
  <td>Der untere Teil der Event-Box, der zum Ändern der Größe von Events in den Day-, Week-, Units-Views verwendet wird</td>
  </tr>
  <tr>
  <td>dhx_scale_holder</td>
  <td>Eine Spalte in den Day-, Week-, Units-Views</td>
  </tr>
  <tr>
  <td>dhx_scale_holder_now</td>
  <td>Eine hervorgehobene Spalte, die das aktuelle Datum in den Day-, Week-, Units-Views darstellt</td>
  </tr>
  <tr>
  <td>dhx_month_body</td>
  <td>Eine Zelle ohne Header in der Month-Ansicht</td>
  </tr>
  <tr>
  <td>dhx_matrix_cell</td>
  <td>Eine Zelle in der Timeline-Ansicht</td>
  </tr>
  <tr>
  <td>dhx_marked_timespan</td>
  <td>Zellen, die markiert (hervorgehoben) sind</td>
  </tr>
  <tr>
  <td>dhx_time_block</td>
  <td>Zellen, die blockiert sind</td>
  </tr>
  </tbody>
</table>
