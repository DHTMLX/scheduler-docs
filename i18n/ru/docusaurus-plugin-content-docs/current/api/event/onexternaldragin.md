---
sidebar_label: "onExternalDragIn"
title: "onExternalDragIn event"
description: "срабатывает, когда данные перетаскиваются в scheduler из внешнего компонента DHTMLX (требуется включение расширения dnd)"
---

# onExternalDragIn

### Description

@short: Срабатывает, когда данные перетаскиваются в scheduler из внешнего компонента DHTMLX (требуется включение расширения dnd)

@signature: onExternalDragIn: (id: string, source: object, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - ID перетаскиваемого элемента данных
- `source` - (required) *object* - исходный HTML-элемент, который был перетащен в scheduler
- `e` - (required) *Event* - родительский объект события

### Returns
- ` result` - (boolean) - указывает, будет ли выполнено действие по умолчанию для события (<b>true</b>) или оно будет отменено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onExternalDragIn", function (id, source, e){
    scheduler.getEvent(id).text = source.innerHTML;
    return true;
});
~~~

### Related samples
- 10_integration/02_dhtmlxTree_outer_drag.html

### Details

:::note
 Это событие требует включения плагина [outerdrag](guides/extensions-list.md#outerdrag). 
:::

- Это событие позволяет настраивать вновь создаваемые события, которые возникают в результате действия drag-in.
- Событие можно заблокировать, вернув *false*, что предотвратит создание нового события во время перетаскивания.

### Related API
- [onBeforeExternalDragIn](api/event/onbeforeexternaldragin.md)
