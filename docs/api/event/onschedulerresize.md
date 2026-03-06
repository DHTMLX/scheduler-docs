---
sidebar_label: onSchedulerResize
title: "onSchedulerResize event"
description: "fires before the scheduler changes its size"
---

# onSchedulerResize

### Description

@short: Fires before the scheduler changes its size

@signature: onSchedulerResize: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onSchedulerResize", function(){
      //any custom logic here
});
~~~

### Details

The event informs that the size of the scheduler was changed, and data area needs repainting. Normally, you don't need to care about this event: it can be useful only if you create some custom view.
