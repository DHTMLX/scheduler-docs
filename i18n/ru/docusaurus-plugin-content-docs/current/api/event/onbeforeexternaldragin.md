---
sidebar_label: "onBeforeExternalDragIn"
title: "onBeforeExternalDragIn event"
description: "срабатывает непосредственно перед тем, как элемент начнёт перетаскиваться в scheduler из внешнего компонента DHTMLX (требуется включённое расширение dnd)"
---

# onBeforeExternalDragIn

### Description

@short: Срабатывает непосредственно перед тем, как элемент начнёт перетаскиваться в scheduler из внешнего компонента DHTMLX (требуется включённое расширение dnd)

@signature: onBeforeExternalDragIn: (source: HTMLElement, dhtmlx: object, tArea: HTMLElement, tNode: HTMLElement, e: Event) =\> boolean

### Parameters

- `source` - (required) *HTMLElement* - HTML-элемент, который собираются перетащить в scheduler
- `dhtmlx` - (required) *object* - глобальный объект DHTMLX
- `tArea` - (required) *HTMLElement* - HTML-элемент, представляющий область данных scheduler
- `tNode` - (required) *HTMLElement* - целевой HTML-элемент внутри scheduler (например, колонка в Day view или секция в Timeline view)
- `e` - (required) *Event* - родной объект события

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию (<b>true</b>) или оно отменяется (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeExternalDragIn",function(source,dhtmlx,tArea,tNode,e)
{
    //здесь можно добавить кастомную логику
    return true;
});
~~~

### Details

:::note
 Для работы этого события требуется включённый плагин [outerdrag](guides/extensions-list.md#outerdrag). 
:::

Событие можно заблокировать. Возврат *false* предотвратит перетаскивание внешнего элемента в scheduler.

### Related API
- [onExternalDragIn](api/event/onexternaldragin.md)
