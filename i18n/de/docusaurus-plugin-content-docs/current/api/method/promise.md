---
sidebar_label: "Promise"
title: "Promise method"
description: "Konstruktor zum Erstellen eines Promise-Objekts"
---

# Promise

### Description

@short: Konstruktor zum Erstellen eines Promise-Objekts

@signature: Promise: (executor: SchedulerCallback) =\> any

### Parameters

- `executor` - (required) *function* - ein Callback, das das Promise einrichtet

### Returns
- ` promise` - (object) - das erstellte Promise-Objekt

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

Dies ist der Konstruktor für das Promise-Objekt.

### Change log
- Eingeführt in Version 6.0.
- Wechsel von Bluebird zu nativen Promise in Version 7.0.
