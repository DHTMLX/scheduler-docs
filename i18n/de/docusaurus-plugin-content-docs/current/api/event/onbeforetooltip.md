---
sidebar_label: "onBeforeTooltip"
title: "onBeforeTooltip event"
description: "Wird unmittelbar ausgelöst, bevor der Tooltip für ein Daten-Item erscheint (nur wenn die 'tooltip'-Erweiterung aktiv ist)"
---

# onBeforeTooltip

### Description

@short: Wird unmittelbar ausgelöst, bevor der Tooltip für ein Daten-Item erscheint (nur wenn die 'tooltip'-Erweiterung aktiv ist)

@signature: onBeforeTooltip: (id: string) =\> boolean

### Parameters

- `id` - (required) *string* - die ID des Daten-Items, für das der Tooltip angezeigt werden soll

### Returns
- ` result` - (boolean) - bestimmt, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeTooltip", function (id){
    //eigene Logik hier
    return true;
});
~~~

### Details

Dieses Event kann blockiert werden. Die Rückgabe von *false* verhindert, dass der Tooltip angezeigt wird.
