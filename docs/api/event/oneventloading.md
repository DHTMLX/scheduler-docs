---
sidebar_label: onEventLoading
title: "onEventLoading event"
description: "fires when an event is being loaded from the data source"
---

# onEventLoading

### Description

@short: Fires when an event is being loaded from the data source

@signature: onEventLoading: (ev: object) =\> boolean;

### Parameters

- `ev` - (required) *object* - the event object (the object of a data item)

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onEventLoading", function(ev){
    //any custom logic here
    return true;
});
~~~

### Details

- The event is blockable. Return *false*  and the data item won't be loaded into the scheduler.
- The event is called for each data item  in the data source.
