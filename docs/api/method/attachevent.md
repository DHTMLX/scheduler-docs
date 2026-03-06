---
sidebar_label: attachEvent
title: "attachEvent method"
description: "attaches the handler to an inner event of dhtmlxScheduler"
---

# attachEvent

### Description

@short: Attaches the handler to an inner event of dhtmlxScheduler

@signature: attachEvent: (name: SchedulerEventName, handler: SchedulerCallback, settings?: any) =\> string

### Parameters

- `name` - (required) *SchedulerEventName* - the event's name, case-insensitive
- `handler` - (required) *function* - the handler function
- `settings` - (optional) *object* - optional, an [object with settings](#properties-of-settings-object) for the event handler

### Returns
- `event` - (string) - id the id of the attached event handler

### Example

~~~jsx
scheduler.attachEvent("onEventSave",function(id,ev){
    if (!ev.text) {
        alert("Text must not be empty");
        return false;
    }
    return true;
})
~~~

### Related samples
- [Validating lightbox fields](https://docs.dhtmlx.com/scheduler/samples/02_customization/08_validation.html)
- [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)

### Details

You can attach several handlers to the same event and all of them will be executed.<br> If some of handlers will return *false* - the related operation will be blocked.<br>
Event handlers are processed in the same order that they were attached.

All event listeners attached using [event](api/method/event.md) will be detached automatically when the [destructor](api/method/destructor.md) is called.

## Properties of settings object 

The settings object can contain two properties:

1\. **id** - (*string*) the id of the event handler 

For example, you can easily detach a handler from the specified event:

~~~js
scheduler.attachEvent("onClick", function(){
    console.log("event click");
}, {id: "my-click"}); /*!*/
... //after a while:
scheduler.detachEvent("my-click");
~~~

2\. **once** - (*boolean*) defines whether the event will be executed only once

Set the property to *true* if you want to capture the first triggering of the event, as in:

~~~js
scheduler.attachEvent("onClick", function(){
    console.log("capture next event click");
    return true;
}, {once: true}); /*!*/
~~~

### Related API
- [detachEvent](api/method/detachevent.md)
