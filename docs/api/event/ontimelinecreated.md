---
sidebar_label: onTimelineCreated
title: "onTimelineCreated event"
description: "fires after the Timeline view has been initialized, but is not rendered on the page yet (the Timeline view only)"
---

# onTimelineCreated

### Description

@short: Fires after the Timeline view has been initialized, but is not rendered on the page yet (the Timeline view only)

@signature: onTemplatesReady: (config: object) =\> void

### Parameters

- `config` - (required) *object* - the Timeline view config object

### Example

~~~jsx
scheduler.attachEvent("onTimelineCreated", function (config){
    //any custom logic here
});
~~~

### Details

The event is invoked from the [createTimelineView](api/method/createtimelineview.md) method.
