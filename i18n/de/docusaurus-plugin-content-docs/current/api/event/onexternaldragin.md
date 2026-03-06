---
sidebar_label: "onExternalDragIn"
title: "onExternalDragIn event"
description: "Wird ausgelöst, wenn Daten aus einer externen DHTMLX-Komponente in den Scheduler gezogen werden (erfordert, dass die dnd-Erweiterung aktiviert ist)"
---

# onExternalDragIn

### Description

@short: Wird ausgelöst, wenn Daten aus einer externen DHTMLX-Komponente in den Scheduler gezogen werden (erfordert, dass die dnd-Erweiterung aktiviert ist)

@signature: onExternalDragIn: (id: string, source: object, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - die ID des Datenobjekts
- `source` - (required) *object* - das Quell-HTML-Element, das in den Scheduler gezogen wurde
- `e` - (required) *Event* - das native Event-Objekt

### Returns
- ` result` - (boolean) - gibt an, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

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
 Dieses Event erfordert, dass das [outerdrag](guides/extensions-list.md#outerdrag) Plugin aktiviert ist. 
:::

- Dieses Event ermöglicht die Anpassung neu erstellter Events, die durch Drag-in-Aktionen entstehen.
- Das Event kann durch Zurückgeben von *false* blockiert werden, wodurch die Erstellung eines neuen Events während des Draggens verhindert wird.

### Related API
- [onBeforeExternalDragIn](api/event/onbeforeexternaldragin.md)
