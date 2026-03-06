---
sidebar_label: event
title: "event method"
description: "attaches an event handler to an HTML element"
---

# event

### Description

@short: Attaches an event handler to an HTML element

@signature: event: (node: HTMLElement|string, event: string, handler: SchedulerCallback, master?: any) =\> string

### Parameters

- `node` - (required) *HTMLElement|string* - the HTML node or its id
- `event` - (required) *string* - the name of an HTML event (without the 'on' prefix)
- `handler` - (required) *function* - the event handler
- `master` - (optional) *object* - an object that the <i>this</i> keyword refers to

### Returns
- ` id` - (string) - the event handler id (can be used by the <b>eventRemove()</b> method)

### Example

~~~jsx
// adds a handler for the 'onclick' event
scheduler.event("divId", "click", function(e){
    //e - a native event object
    do_something();
});
~~~

### Details

All event listeners attached using **event** will be detached automatically when the [destructor](api/method/destructor.md) is called.

### Related API
- [eventRemove](api/method/eventremove.md)

### Change log
- added in version 4.4
