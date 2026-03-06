---
sidebar_label: "onBeforeExternalDragIn"
title: "onBeforeExternalDragIn event"
description: "Wird unmittelbar ausgelöst, bevor ein Element aus einer externen DHTMLX-Komponente in den Scheduler gezogen wird (erfordert, dass die dnd-Erweiterung aktiviert ist)."
---

# onBeforeExternalDragIn

### Description

@short: Wird unmittelbar ausgelöst, bevor ein Element aus einer externen DHTMLX-Komponente in den Scheduler gezogen wird (erfordert, dass die dnd-Erweiterung aktiviert ist).

@signature: onBeforeExternalDragIn: (source: HTMLElement, dhtmlx: object, tArea: HTMLElement, tNode: HTMLElement, e: Event) =\> boolean

### Parameters

- `source` - (required) *HTMLElement* - Das HTML-Element, das in den Scheduler gezogen werden soll
- `dhtmlx` - (required) *object* - Das globale DHTMLX-Objekt
- `tArea` - (required) *HTMLElement* - Das HTML-Element, das den Datenbereich des Schedulers repräsentiert
- `tNode` - (required) *HTMLElement* - Das Ziel-HTML-Element innerhalb des Schedulers (z.B. eine Spalte in der Tagesansicht oder ein Abschnitt in der Timeline-Ansicht)
- `e` - (required) *Event* - Das native Event-Objekt

### Returns
- ` result` - (boolean) - Bestimmt, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeExternalDragIn",function(source,dhtmlx,tArea,tNode,e)
{
    // Hier kann benutzerdefinierte Logik hinzugefügt werden
    return true;
});
~~~

### Details

:::note
 Dieses Event erfordert, dass das [outerdrag](guides/extensions-list.md#outerdrag) Plugin aktiviert ist. 
:::

Das Event kann blockiert werden. Wenn *false* zurückgegeben wird, wird verhindert, dass das externe Element in den Scheduler gezogen wird.

### Related API
- [onExternalDragIn](api/event/onexternaldragin.md)
