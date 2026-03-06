---
sidebar_label: defined
title: "defined method"
description: "returns false if the provided argument is undefined, otherwise true"
---

# defined

### Description

@short: Returns false if the provided argument is undefined, otherwise true

@signature: defined: (event: any) =\> boolean

### Parameters

- `event` - (required) *object* - the object that should be checked

### Returns
- ` state` - (boolean) - false if the provided argument is undefined, otherwise true

### Example

~~~jsx
// check if the "custom_property" property is defined for the event object
if(scheduler.defined(event.custom_property)){
  // ..
};
~~~

### Change log
- added in version 6.0
