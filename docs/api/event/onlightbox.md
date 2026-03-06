---
sidebar_label: onLightbox
title: "onLightbox event"
description: "fires after the user has opened the lightbox (edit form)"
---

# onLightbox

### Description

@short: Fires after the user has opened the lightbox (edit form)

@signature: onLightbox: () =\> void

### Parameters

- `id` - (required) *string* - the event's id

### Example

~~~jsx
scheduler.attachEvent("onLightbox", function (id){
    //any custom logic here
});
~~~

### Details

Using this event is a good way to customize something in the lightbox.
