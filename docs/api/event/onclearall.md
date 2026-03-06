---
sidebar_label: onClearAll
title: "onClearAll event"
description: "fires after data in the scheduler was cleared"
---

# onClearAll

### Description

@short: Fires after data in the scheduler was cleared

@signature: onClearAll: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onClearAll", function (){
    //any custom logic here
});
~~~

### Details

The event is invoked from the [clearAll](api/method/clearall.md) method.
