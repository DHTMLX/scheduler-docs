---
sidebar_label: onBeforeBatchUpdate
title: "событие onBeforeBatchUpdate"
description: "срабатывает перед вызовом метода batchUpdate"
---

# onBeforeBatchUpdate

### Description

@short: Срабатывает до вызова метода [batchUpdate](api/method/batchupdate.md)

@signature: onBeforeBatchUpdate: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onBeforeBatchUpdate", function(){
    // любая ваша логика здесь
});
~~~

### Related API
- [batchUpdate](api/method/batchupdate.md)
- [onAfterBatchUpdate](api/event/onafterbatchupdate.md)

### Change log
- добавлено в версии 7.1