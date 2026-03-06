---
sidebar_label: "onEventCollision"
title: "onEventCollision event"
description: "wird ausgelöst, wenn ein Benutzer versucht, ein neues Event zu erstellen oder ein bestehendes innerhalb eines bereits belegten Zeitfensters zu ändern"
---

# onEventCollision

### Description

@short: Wird ausgelöst, wenn ein Benutzer versucht, ein neues Event zu erstellen oder ein bestehendes innerhalb eines bereits belegten Zeitfensters zu ändern

@signature: onEventCollision: (ev: object, evs: array) =\> boolean;

### Parameters

- `ev` - (required) *object* - das Event-Objekt
- `evs` - (required) *array* - eine Sammlung von Event-Objekten, die bereits im gleichen Zeitfenster geplant sind

### Returns
- ` result` - (boolean) - bestimmt, ob die Standardaktion für das Event ausgeführt wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onEventCollision", function (ev, evs){
    // benutzerdefinierte Logik hier
    return true;
});
~~~

### Details

:::note
 Das Event erfordert, dass das [collision](guides/extensions-list.md#collision) Plugin aktiviert ist. 
:::

Die Rückgabe von <i>true</i> im Handler verhindert, dass das Event hinzugefügt oder bearbeitet wird. Die Rückgabe von <i>false</i> erlaubt die Kollision, das heißt, das Event wird trotz Überlappung hinzugefügt oder bearbeitet.
