---
sidebar_label: "onLoadStart"
title: "onLoadStart event"
description: "wird unmittelbar vor Beginn des Datenladevorgangs aus der Datenquelle ausgelöst"
---

# onLoadStart

### Description

@short: Wird unmittelbar vor Beginn des Datenladevorgangs aus der Datenquelle ausgelöst

@signature: onLoadStart: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onLoadStart", function(){  
    scheduler.config.readonly = true;  
});  

scheduler.attachEvent("onLoadEnd", function(){  
    scheduler.config.readonly = false;  
});
~~~

### Related API
- [load](api/method/load.md)
- [onLoadEnd](api/event/onloadend.md)
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)

### Related Guides
- [Daten laden](guides/loading-data.md)
- [Serverseitige Integration](guides/server-integration.md)
