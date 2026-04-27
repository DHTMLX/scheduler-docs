---
sidebar_label: onBeforeExternalDragIn
title: "onBeforeExternalDragIn event"
description: "срабатывает до того, как некоторый элемент начнет перетаскиваться в расписание из внешнего компонента DHTMLX (только при включенном расширении dnd)"
---

# onBeforeExternalDragIn

### Description

@short: Срабатывает до того, как некоторый элемент начнет перетаскиваться в расписание из внешнего компонента DHTMLX (только при включенном расширении dnd)

@signature: onBeforeExternalDragIn: (source: HTMLElement, dhtmlx: object, tArea: HTMLElement, tNode: HTMLElement, e: Event) =\> boolean

### Parameters

- `source` - (required) *HTMLElement* - HTML-элемент, который будет перетаскиваться в расписание
- `dhtmlx` - (required) *object* - глобальный объект DHTMLX
- `tArea` - (required) *HTMLElement* - HTML-объект области данных расписания
- `tNode` - (required) *HTMLElement* - целевой HTML-объект расписания (столбец в дневном представлении, раздел в Timeline- представлении и т. п.)
- `e` - (required) *Event* - объект нативного события

### Returns
- `result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeExternalDragIn",function(source,dhtmlx,tArea,tNode,e)
{
    // любая ваша логика здесь
    return true;
});
~~~

### Details

:::note
 Для этого события требуется активировать плагин [outerdrag](guides/extensions-list.md#outerdrag).
 :::

The event is blockable. Return *false* and the external element won't be dragged to the scheduler.

### Related API
- [onExternalDragIn](api/event/onexternaldragin.md)