---
sidebar_label: "onLoadEnd"
title: "onLoadEnd event"
description: "Wird ausgelöst, sobald das Laden der Daten aus der Datenquelle abgeschlossen ist"
---

# onLoadEnd

### Description

@short: Wird ausgelöst, sobald das Laden der Daten aus der Datenquelle abgeschlossen ist

@signature: onLoadEnd: () =\> void

### Example

~~~jsx
```javascript
scheduler.attachEvent("onLoadStart", function(){
    scheduler.config.readonly = true;
});

scheduler.attachEvent("onLoadEnd", function(){
    scheduler.config.readonly = false;
});
```
~~~

### Related API
- [load](api/method/load.md)
- [onLoadStart](api/event/onloadstart.md)
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)

### Related Guides
- [Daten laden](guides/loading-data.md)
- [Serverseitige Integration](guides/server-integration.md)
