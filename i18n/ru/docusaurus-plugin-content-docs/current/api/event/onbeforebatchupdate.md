---
sidebar_label: "onBeforeBatchUpdate"
title: "onBeforeBatchUpdate event"
description: "вызывается непосредственно перед выполнением метода [batchUpdate](api/method/batchupdate.md)"
---

# onBeforeBatchUpdate

### Description

@short: Вызывается непосредственно перед выполнением метода [batchUpdate](api/method/batchupdate.md)

@signature: onBeforeBatchUpdate: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onBeforeBatchUpdate", function(){
    // ваш код здесь
});
~~~

### Related API
- [batchUpdate](api/method/batchupdate.md)
- [onAfterBatchUpdate](api/event/onafterbatchupdate.md)

### Change log
- добавлено в версии 7.1
