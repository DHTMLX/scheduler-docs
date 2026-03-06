---
sidebar_label: onDestroy
title: "onDestroy event"
description: "fires after scheduler has been cleared by the [destructor](api/method/destructor.md) method"
---

# onDestroy

### Description

@short: Fires after scheduler has been cleared by the [destructor](api/method/destructor.md) method

@signature: onDestroy: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onDestroy", function(){
   alert("free custom resources");
});

scheduler.destructor();
~~~

### Related API
- [destructor](api/method/destructor.md)

### Change log
- added in v6.0
