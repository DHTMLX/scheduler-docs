---
sidebar_label: "onBeforeBatchUpdate"
title: "onBeforeBatchUpdate event"
description: "wird ausgelöst kurz bevor die Methode [batchUpdate](api/method/batchupdate.md) ausgeführt wird"
---

# onBeforeBatchUpdate

### Description

@short: Wird ausgelöst kurz bevor die Methode [batchUpdate](api/method/batchupdate.md) ausgeführt wird

@signature: onBeforeBatchUpdate: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onBeforeBatchUpdate", function(){
    // dein Code hier
});
~~~

### Related API
- [batchUpdate](api/method/batchupdate.md)
- [onAfterBatchUpdate](api/event/onafterbatchupdate.md)

### Change log
- hinzugefügt in Version 7.1
