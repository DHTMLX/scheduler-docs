---
sidebar_label: showLightbox
title: "showLightbox метод"
description: "Открывает lightbox для указанного события"
---

# showLightbox

### Description

@short: Открывает lightbox для указанного события

@signature: showLightbox: (id: string) =\> void

### Parameters

- `id` - (обязательный) *string* - идентификатор события

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
- [Настройка заголовка lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/17_lightbox_header.html)
- [Полностью настраиваемый lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)

### Related API
- [hideLightbox](api/method/hidelightbox.md)