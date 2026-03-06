---
sidebar_label: "getActionData"
title: "getActionData method"
description: "gibt das Datum und den Bereich zurück, der sich derzeit unter dem Cursor befindet, falls vorhanden"
---

# getActionData

### Description

@short: Gibt das Datum und den Bereich zurück, der sich derzeit unter dem Cursor befindet, falls vorhanden

@signature: getActionData: (e: Event) =\> any

### Parameters

- `e` - (required) *Event* - ein natives Event-Objekt

### Returns
- ` point` - (object) - ein Objekt mit zwei Eigenschaften: <ul><li><b>date</b> - (<i>Date</i>) das Datum an der Cursorposition </li> <li><b>section</b> - (<i>string, number</i>) der Bezeichner des Bereichs unter dem Cursor (<i>anwendbar für Timeline- und Units-Ansicht</i>)</li></ul>

### Example

~~~jsx
scheduler.attachEvent("onMouseMove", function(id, e){
   var action_data = scheduler.getActionData(e);
   // -> {date:Tue Jun 30 2009 09:10:00, section:2}
   ...
})
~~~

### Related samples
- [Tracking the cursor position](https://docs.dhtmlx.com/scheduler/samples/09_api/01_action_data.html)
- [Tooltips](https://docs.dhtmlx.com/scheduler/samples/06_timeline/12_section_tooltip.html)

### Details

:::note

Verfügbar ab Version 3.5
 
:::
