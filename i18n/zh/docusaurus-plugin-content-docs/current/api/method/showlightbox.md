---
sidebar_label: "showLightbox"
title: "showLightbox method"
description: "为指定事件打开lightbox"
---

# showLightbox

### Description

@short: 为指定事件打开lightbox

@signature: showLightbox: (id: string) =\> void

### Parameters

- `id` - (required) *string* - 事件的id

### Example

~~~jsx
const eventId = scheduler.addEvent({
    start_date: "08-06-2027 09:00",
    end_date:   "08-06-2027 11:00",
    text:   "会议"
});
...
scheduler.showLightbox(eventId);
~~~

### Related samples
- [Customizing the lightbox header](https://docs.dhtmlx.com/scheduler/samples/02_customization/17_lightbox_header.html)
- [Fully custom lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)

### Related API
- [hideLightbox](api/method/hidelightbox.md)
