---
sidebar_label: "onBeforeEventChanged"
title: "onBeforeEventChanged event"
description: "Wird ausgelöst, wenn ein Event per Drag-and-Drop geändert wird, die Änderungen aber noch nicht gespeichert sind."
---

# onBeforeEventChanged

### Description

@short: Wird ausgelöst, wenn ein Event per Drag-and-Drop geändert wird, die Änderungen aber noch nicht gespeichert sind.

@signature: onBeforeEventChanged: (ev: object, e: Event, is_new: boolean, original: object) =\> boolean

### Parameters

- `ev` - (required) *object* - Das Datenobjekt des Events nach den Änderungen
- `e` - (required) *Event* - Das native Event-Objekt
- `is_new` - (required) *boolean* - Gibt 'true' zurück, wenn der Benutzer ein neues Event bearbeitet; 'false', wenn ein bestehendes Event editiert wird
- `original` - (required) *object* - Das Datenobjekt des Events vor den Änderungen

### Returns
- ` result` - (boolean) - Entscheidet, ob die Standardaktion für das Event ausgeführt wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventChanged", function(ev, e, is_new, original){
    //eigene Logik hier
    return true;
});
~~~

### Details

Dieses Event wird ausgelöst, sobald ein neues Event hinzugefügt oder ein bestehendes Event per Drag-and-Drop aktualisiert wird.

- Beachte, dass der erste Parameter in der Handler-Funktion das Datenobjekt selbst ist, nicht nur die ID (da neue Elemente möglicherweise noch keine ID haben).
- Bei der Erstellung neuer Datenobjekte wird ein unverändertes Event durch ein leeres Objekt dargestellt.
- Das Event ist abbrechbar: Wird *false* aus der Handler-Funktion zurückgegeben, wird die Datenaktualisierung gestoppt.
