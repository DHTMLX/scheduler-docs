---
sidebar_label: getActionData
title: "getActionData method"
description: "returns the current cursor-pointed date and section (if defined)"
---

# getActionData

### Description

@short: Returns the current cursor-pointed date and section (if defined)

@signature: getActionData: (e: Event) =\> any

### Parameters

- `e` - (required) *Event* - a native event object

### Returns
- ` point` - (object) - an object with 2 properties: <ul><li><b>date</b> - (<i>Date</i>) the object of the cursor-pointed date </li> <li><b>section</b> - (<i>string, number</i>) the id of the cursor-pointed section (<i>for the Timeline and Units view</i>)</li></ul>

### Example

~~~jsx
scheduler.attachEvent("onMouseMove", function(id, e){
   const action_data = scheduler.getActionData(e);
   // -> {date:Tue Jun 30 2027 09:10:00, section:2}
   ...
})
~~~

### Related samples
- [Tracking the cursor position](https://docs.dhtmlx.com/scheduler/samples/09_api/01_action_data.html)
- [Tooltips](https://docs.dhtmlx.com/scheduler/samples/06_timeline/12_section_tooltip.html)

### Details

:::note

Available from version 3.5
 
:::
