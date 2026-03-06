---
sidebar_label: copy
title: "copy method"
description: "creates a deep copy of the provided object"
---

# copy

### Description

@short: Creates a deep copy of the provided object

@signature: copy: (event: any) =\> any

### Parameters

- `event` - (required) *object* - the object that needs to be copied

### Returns
- ` backupEvent` - (object) - a deep copy of the provided object

### Example

~~~jsx
var backupEvent = scheduler.copy(scheduler.getEvent(id));
~~~

### Change log
- added in version 6.0
