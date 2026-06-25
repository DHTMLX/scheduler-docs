---
sidebar_label: onExternalDragIn
title: "onExternalDragIn событие"
description: "выполняется, когда данные перетаскиваются в планировщик из внешнего компонента DHTMLX (только с включенным расширением dnd)"
---

# onExternalDragIn

### Description

@short: Вызывает событие, когда данные перетаскиваются в планировщик из внешнего компонента DHTMLX (только с включенным расширением dnd)

@signature: onExternalDragIn: (id: string, source: object, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - идентификатор элемента данных
- `source` - (required) *object* - исходный HTML-элемент, который был перетащён в планировщик
- `e` - (required) *Event* - объект нативного события

### Returns
- `result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onExternalDragIn", function (id, source, e){
    scheduler.getEvent(id).text = source.innerHTML;
    return true;
});
~~~

### Related samples
- [Integration with dhtmlxTree](https://docs.dhtmlx.com/scheduler/samples/10_integration/02_dhtmlxtree_outer_drag.html)

### Details

:::note
 The event requires the [outerdrag](guides/extensions-list.md#outerdrag) plugin to be activated. 
:::

- Это событие можно использовать для настройки создаваемых заново событий (которые возникают в результате операций drag-in).
- Это событие можно заблокировать. Возвращение *false* приведёт к тому, что перетаскивание не создаст новое событие.

### Related API
- [onBeforeExternalDragIn](api/event/onbeforeexternaldragin.md)