---
sidebar_label: "showLightbox"
title: "showLightbox method"
description: "открывает лайтбокс для заданного события"
---

# showLightbox

### Description

@short: Открывает лайтбокс для заданного события

@signature: showLightbox: (id: string) =\> void

### Parameters

- `id` - (required) *string* - идентификатор события

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
