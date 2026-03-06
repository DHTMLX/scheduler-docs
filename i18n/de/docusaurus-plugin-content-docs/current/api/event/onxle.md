---
sidebar_label: "onXLE"
title: "onXLE event"
description: "Wird ausgelöst, sobald das Laden der Daten aus der Datenquelle abgeschlossen ist."
---

# onXLE
:::warning
Die Funktion ist veraltet
:::
### Description

@short: Wird ausgelöst, sobald das Laden der Daten aus der Datenquelle abgeschlossen ist.

@signature: onXLE: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onXLE", function (){
    // Benutzerdefinierte Logik kann hier eingefügt werden
});
~~~

### Related API
- [onXLS](api/event/onxls.md)
- [load](api/method/load.md)

### Related Guides
- [Daten laden](guides/loading-data.md)

### Change log
- seit Version 5.2 veraltet (deprecated)
