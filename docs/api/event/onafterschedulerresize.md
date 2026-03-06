---
sidebar_label: onAfterSchedulerResize
title: "onAfterSchedulerResize event"
description: "fires after the scheduler has changed its size and data area was repainted"
---

# onAfterSchedulerResize

### Description

@short: Fires after the scheduler has changed its size and data area was repainted

@signature: onAfterSchedulerResize: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onAfterSchedulerResize", function(){
    //any custom logic here
});
~~~
