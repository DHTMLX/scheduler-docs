---
sidebar_label: "onBeforeParse"
title: "onBeforeParse event"
description: "wird unmittelbar vor dem Beginn der Datenparsing ausgelöst"
---

# onBeforeParse

### Description

@short: Wird unmittelbar vor dem Beginn der Datenparsing ausgelöst

@signature: onBeforeParse: () =\> void

### Example

~~~jsx
scheduler.init("scheduler_here");
scheduler.attachEvent("onBeforeParse", function(){ 
    //beliebige benutzerdefinierte Logik hier
});
scheduler.parse(events);
~~~

### Related API
- [load](api/method/load.md)
- [parse](api/method/parse.md)
- [onParse](api/event/onparse.md)
- [onLoadStart](api/event/onloadstart.md)
- [onLoadEnd](api/event/onloadend.md)

### Related Guides
- [Daten laden](guides/loading-data.md)
