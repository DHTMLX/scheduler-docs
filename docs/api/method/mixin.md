---
sidebar_label: mixin
title: "mixin method"
description: "adds properties of the 'source' object into the 'target' object"
---

# mixin

### Description

@short: Adds properties of the 'source' object into the 'target' object

@signature: mixin: (target: any, source: any, force: boolean) =\> void

### Parameters

- `target` - (required) *object* - the target object
- `source` - (required) *object* - the source object
- `force` - (required) *boolean* - if true, properties of the 'source' will overwrite the matching properties of the 'target', if there are any. If false, the properties that already exist in the 'target' will be omitted

### Example

~~~jsx
scheduler.mixin(target, source, force);
~~~

### Change log
- added in version 6.0
