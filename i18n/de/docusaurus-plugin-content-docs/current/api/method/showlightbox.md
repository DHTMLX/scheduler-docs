---
sidebar_label: "showLightbox"
title: "showLightbox method"
description: "öffnet die Lightbox für ein bestimmtes Event"
---

# showLightbox

### Description

@short: Öffnet die Lightbox für ein bestimmtes Event

@signature: showLightbox: (id: string) =\> void

### Parameters

- `id` - (required) *string* - die ID des Events

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: "08-06-2013 09:00",
    end_date:   "08-06-2013 11:00",
    text:   "Meeting"
});
...
scheduler.showLightbox(eventId);
~~~

### Related samples
- [Customizing the lightbox header](https://docs.dhtmlx.com/scheduler/samples/02_customization/17_lightbox_header.html)
- [Fully custom lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)

### Related API
- [hideLightbox](api/method/hidelightbox.md)
