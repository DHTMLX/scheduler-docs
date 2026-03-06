---
sidebar_label: onSchedulerReady
title: "onSchedulerReady event"
description: "fires after scheduler initialization is complete, but the scheduler is not rendered on the page yet."
---

# onSchedulerReady

### Description

@short: Fires after scheduler initialization is complete, but the scheduler is not rendered on the page yet.

@signature: onSchedulerReady: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onSchedulerReady", function(){
    //any custom logic here
});
~~~
