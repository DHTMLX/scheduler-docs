---
sidebar_label: Promise
title: "Promise method"
description: "Promise object constructor"
---

# Promise

### Description

@short: Promise object constructor

@signature: Promise: (executor: SchedulerCallback) =\> any

### Parameters

- `executor` - (required) *function* - a callback used to initialize the promise

### Returns
- ` promise` - (object) - the promise object

### Example

~~~jsx
new scheduler.Promise(function(resolve, reject) {
    setTimeout(function(){
        resolve();
    }, 5000);
}).then(function(){
    alert("Resolved")
});
~~~

### Details

The Promise object constructor.

### Change log
- Added in v6.0.
- Switched from Bluebird to native Promise in v7.0.
