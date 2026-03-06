---
sidebar_label: "onAfterBatchUpdate"
title: "onAfterBatchUpdate event"
description: "wird unmittelbar ausgelöst, nachdem die Methode [batchUpdate](api/method/batchupdate.md) ausgeführt wurde"
---

# onAfterBatchUpdate

### Description

@short: Wird unmittelbar ausgelöst, nachdem die Methode [batchUpdate](api/method/batchupdate.md) ausgeführt wurde

@signature: onAfterBatchUpdate: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onAfterBatchUpdate", function(){
    // Ihr Code hier
});
~~~

### Related API
- [batchUpdate](api/method/batchupdate.md)
- [onBeforeBatchUpdate](api/event/onbeforebatchupdate.md)

### Change log
- hinzugefügt in Version 7.1
