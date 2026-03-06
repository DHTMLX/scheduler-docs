---
sidebar_label: "onXLS"
title: "onXLS event"
description: "Wird unmittelbar ausgelöst, bevor die Datenquelle mit dem Laden beginnt"
---

# onXLS
:::warning
Die Funktion ist veraltet
:::
### Description

@short: Wird unmittelbar ausgelöst, bevor die Datenquelle mit dem Laden beginnt

@signature: onXLS: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onXLS", function (){
    //Fügen Sie hier beliebige benutzerdefinierte Logik ein
});
~~~

### Related API
- [onXLE](api/event/onxle.md)
- [load](api/method/load.md)

### Related Guides
- [Daten laden](guides/loading-data.md)

### Change log
- deprecated seit Version 5.2
