---
sidebar_label: "showLightbox"
title: "showLightbox method"
description: "주어진 이벤트에 대한 라이트박스를 엽니다."
---

# showLightbox

### Description

@short: 주어진 이벤트에 대한 라이트박스를 엽니다.

@signature: showLightbox: (id: string) =\> void

### Parameters

- `id` - (required) *string* - 이벤트의 id

### Example

~~~jsx
const eventId = scheduler.addEvent({
    start_date: "08-06-2027 09:00",
    end_date:   "08-06-2027 11:00",
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
