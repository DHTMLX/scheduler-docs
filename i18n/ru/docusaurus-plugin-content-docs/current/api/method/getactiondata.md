---
sidebar_label: getActionData
title: "getActionData method"
description: "возвращает дату и секцию, находящиеся в данный момент под курсором, если таковые имеются"
---

# getActionData

### Description

@short: Возвращает дату, на которую указывает курсор, и секцию (если она определена)

@signature: getActionData: (e: Event) =\> any

### Parameters

- `e` - (required) *Event* - нативный объект события

### Returns
- ` point` - (object) - объект с двумя свойствами: <ul><li><b>date</b> - (<i>Date</i>) объект даты, на которую указывает курсор</li> <li><b>section</b> - (<i>string, number</i>) идентификатор секции, на которую указывает курсор (<i>для Timeline и Units view</i>)</li></ul>

### Example

~~~jsx
scheduler.attachEvent("onMouseMove", function(id, e){
   var action_data = scheduler.getActionData(e);
   // -> {date:Tue Jun 30 2027 09:10:00, section:2}
   ...
})
~~~

### Related samples
- [Отслеживание позиции курсора](https://docs.dhtmlx.com/scheduler/samples/09_api/01_action_data.html)
- [Подсказки](https://docs.dhtmlx.com/scheduler/samples/06_timeline/12_section_tooltip.html)

### Details

:::note

Доступно с версии 3.5

:::