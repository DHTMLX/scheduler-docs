---
sidebar_label: "getState"
title: "getState method"
description: "ruiert den aktuellen Zustand des Schedulers ab"
---

# getState

### Description

@short: Ruiert den aktuellen Zustand des Schedulers ab

@signature: getState: () =\> any

### Returns
- `state` - (object) - Das Zustandsobjekt

### Example

~~~jsx
const mode = scheduler.getState().mode;
if(mode == "day"){
    // benutzerdefinierte Logik hier
}
else {
    // benutzerdefinierte Logik hier
}
~~~

### Related samples
- [Fully custom lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)
- [Removing needless hours from the time scale](https://docs.dhtmlx.com/scheduler/samples/06_timeline/09_drag_duration.html)

### Details

Das Zustandsobjekt repräsentiert die interne UI-Konfiguration des Schedulers und enthält die folgenden Eigenschaften:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>mode</b></td>
  <td>(<i>string</i>) die aktuell aktive Ansicht</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>date</b></td>
  <td>(<i>Date</i>) das ausgewählte Datum</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>min_date</b></td>
  <td>(<i>Date</i>) das Startdatum, ab dem Ereignisse in der aktuellen Ansicht angezeigt werden</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>max_date</b></td>
  <td>(<i>Date</i>) das Enddatum, bis zu dem Ereignisse in der aktuellen Ansicht angezeigt werden</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>editor_id</b></td>
  <td>(<i>string</i>) die ID des Ereignisses, das aktuell inline bearbeitet wird. Ist 'undefined' oder 'null', wenn kein Ereignis inline bearbeitet wird.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>lightbox_id</b></td>
  <td>(<i>string</i>) die ID des Ereignisses, das aktuell im Lightbox geöffnet ist. Ist 'undefined' oder 'null', wenn kein Ereignis in der Lightbox geöffnet ist.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>new_event</b></td>
  <td>(<i>Date</i>) zeigt an, ob gerade ein neues Ereignis erstellt wird. Enthält das aktuelle Datum, wenn ein neues Ereignis erstellt wird, sonst 'undefined' oder 'null'.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>select_id</b></td>
  <td>(<i>string</i>) die ID des aktuell ausgewählten Ereignisses. Ist 'undefined' oder 'null', wenn kein Ereignis ausgewählt ist.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>expanded</b></td>
  <td>(<i>boolean</i>) true, wenn der Scheduler erweitert ist. Ist 'undefined' oder 'null', wenn der Scheduler seine normale Größe hat oder wenn die [expand](guides/extensions-list.md#expand)-Extension nicht aktiviert ist.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>drag_id</b></td>
  <td>(<i>string</i>) die ID des Ereignisses, das gerade gezogen wird. Ist 'undefined' oder 'null', wenn kein Ereignis gezogen wird.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>drag_mode</b></td>
  <td>(<i>'move','resize','create', 'new-size'</i>) der aktuelle Drag-Modus. Ist 'undefined' oder 'null', wenn kein Ereignis gezogen wird.</td>
  </tr>
  </tbody>
</table>

:::note

Hinweis: Eine Änderung dieses Objekts hat keine Auswirkung auf das Verhalten des Schedulers.
 
:::
