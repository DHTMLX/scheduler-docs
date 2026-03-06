---
sidebar_label: "onParse"
title: "onParse event"
description: "wird ausgelöst, sobald die Daten geparst und für die API bereit sind, jedoch bevor sie im Scheduler angezeigt werden"
---

# onParse

### Description

@short: Wird ausgelöst, sobald die Daten geparst und für die API bereit sind, jedoch bevor sie im Scheduler angezeigt werden

@signature: onParse: () =\> void

### Example

~~~jsx
scheduler.init("scheduler_here");
scheduler.attachEvent("onParse", function(){alert("Daten wurden geparst")});
scheduler.parse(events);
~~~

### Related API
- [load](api/method/load.md)
- [parse](api/method/parse.md)
- [onBeforeParse](api/event/onbeforeparse.md)
- [onLoadStart](api/event/onloadstart.md)
- [onLoadEnd](api/event/onloadend.md)

### Related Guides
- [Daten laden](guides/loading-data.md)
