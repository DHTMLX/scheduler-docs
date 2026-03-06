---
sidebar_label: "onYScaleDblClick"
title: "onYScaleDblClick event"
description: "Wird ausgelöst, wenn ein Benutzer in der Timeline-Ansicht auf eine Zelle der y-Achse doppelklickt."
---

# onYScaleDblClick

### Description

@short: Wird ausgelöst, wenn ein Benutzer in der Timeline-Ansicht auf eine Zelle der y-Achse doppelklickt.

@signature: onYScaleDblClick: (index: number, section: object, e: Event) =\> void

### Parameters

- `index` - (required) *number* - der nullbasierte Index der angeklickten Zeile
- `section` - (required) *object* - das Datenobjekt, das mit der angeklickten Zelle verknüpft ist
- `e` - (required) *Event* - das native Event-Objekt

### Example

~~~jsx
scheduler.attachEvent("onYScaleDblClick", function (index, section, e){
    //hier kann benutzerdefinierte Logik hinzugefügt werden
});
~~~
