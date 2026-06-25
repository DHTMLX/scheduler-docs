---
sidebar_label: onBeforeEventChanged
title: "onBeforeEventChanged event"
description: "Feuert, wenn das Event per Drag-and-Drop geändert wurde, die Änderungen sind jedoch noch nicht gespeichert."
---

# onBeforeEventChanged

### Description

@short: Wird ausgelöst, wenn das Event per Drag-and-Drop geändert wurde, die Änderungen sind jedoch noch nicht gespeichert.

@signature: onBeforeEventChanged: (ev: object, e: Event, is_new: boolean, original: object) =\> boolean

### Parameters

- `ev` - (required) *object* - das Datenobjekt des Events nach den Änderungen
- `e` - (required) *Event* - ein natives Event-Objekt
- `is_new` - (required) *boolean* - gibt 'true' zurück, wenn der Benutzer ein neues Event ändert; 'false', wenn das bearbeitete Event bereits existiert
- `original` - (required) *object* - das Datenobjekt des Events vor den Änderungen

### Returns
- `result` - (boolean) - legt fest, ob die Standardaktion des Events ausgelöst wird (`true`) oder abgebrochen wird (`false`)

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventChanged", (ev, e, is_new, original) => {
    // any custom logic here
    return true;
});
~~~

### Details

Das Ereignis tritt auf, wenn ein neues Event hinzugefügt wird oder ein bestehendes durch Drag-and-Drop geändert wird.

- Achtung: Der erste Parameter der Handler-Funktion enthält das Daten-Item-Objekt, nicht die ID des Daten-Items, weil neu erstellte Daten-Items möglicherweise noch keine ID besitzen.
- Das unveränderte Event-Objekt ist ein leeres Objekt, wenn neue Dateneinträge erstellt werden.
- Das Event ist blockierbar: Wenn der Handler `false` zurückgibt, wird das Datenupdate verhindert.