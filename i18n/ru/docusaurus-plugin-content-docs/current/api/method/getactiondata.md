---
sidebar_label: "getActionData"
title: "getActionData method"
description: "возвращает дату и секцию, находящиеся в данный момент под курсором, если таковые имеются"
---

# getActionData

### Description

@short: Возвращает дату и секцию, находящиеся в данный момент под курсором, если таковые имеются

@signature: getActionData: (e: Event) =\> any

### Parameters

- `e` - (required) *Event* - объект нативного события

### Returns
- ` point` - (object) - объект, содержащий два свойства: <ul><li><b>date</b> - (<i>Date</i>) дата в позиции курсора </li> <li><b>section</b> - (<i>string, number</i>) идентификатор секции под курсором (<i>актуально для Timeline и Units view</i>)</li></ul>

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

Доступно начиная с версии 3.5
 
:::
