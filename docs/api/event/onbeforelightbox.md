---
sidebar_label: onBeforeLightbox
title: "onBeforeLightbox event"
description: "fires immediately before the user opens the lightbox (edit form)"
---

# onBeforeLightbox

### Description

@short: Fires immediately before the user opens the lightbox (edit form)

@signature: onBeforeLightbox: (id: string) =\> boolean

### Parameters

- `id` - (required) *string* - the event's id

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeLightbox", function (id){
    //any custom logic here
    return true;
});
~~~

### Related samples
- [Linking select controls in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/26_linked_selects_in_lightbox.html)
- [Dynamic changing of lightbox configurations](https://docs.dhtmlx.com/scheduler/samples/02_customization/29_changing_lightbox_configurations.html)

### Details

The event is blockable. Return *false* to cancel the default processing (opening of the lightbox).
