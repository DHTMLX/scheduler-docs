---
sidebar_label: "onBeforeBatchUpdate"
title: "onBeforeBatchUpdate event"
description: "在 [batchUpdate](api/method/batchupdate.md) 方法执行之前触发"
---

# onBeforeBatchUpdate

### Description

@short: 在 [batchUpdate](api/method/batchupdate.md) 方法执行之前触发

@signature: onBeforeBatchUpdate: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onBeforeBatchUpdate", function(){
    // your code here
});
~~~

### Related API
- [batchUpdate](api/method/batchupdate.md)
- [onAfterBatchUpdate](api/event/onafterbatchupdate.md)

### Change log
- added in version 7.1
