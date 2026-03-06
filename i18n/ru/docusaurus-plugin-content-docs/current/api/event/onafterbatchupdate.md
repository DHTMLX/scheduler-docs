---
sidebar_label: "onAfterBatchUpdate"
title: "onAfterBatchUpdate event"
description: "срабатывает сразу после завершения выполнения метода [batchUpdate](api/method/batchupdate.md)"
---

# onAfterBatchUpdate

### Description

@short: Срабатывает сразу после завершения выполнения метода [batchUpdate](api/method/batchupdate.md)

@signature: onAfterBatchUpdate: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onAfterBatchUpdate", function(){
    // ваш код здесь
});
~~~

### Related API
- [batchUpdate](api/method/batchupdate.md)
- [onBeforeBatchUpdate](api/event/onbeforebatchupdate.md)

### Change log
- добавлено в версии 7.1
