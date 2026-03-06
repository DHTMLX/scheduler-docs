---
sidebar_label: "map_info_content"
title: "map_info_content template"
description: "определяет, что отображается внутри окна информации в Map View"
---

# map_info_content

### Description

@short: Определяет, что отображается внутри окна информации в Map View

@signature: map_info_content: (event: any) =\> void

### Parameters

- `event` - (required) *object* - объект события

### Example

~~~jsx
scheduler.templates.map_info_content = function(event){
    const formatDate = scheduler.templates.tooltip_date_format;
    return `<div><b>Event's text:</b> ${event.text}
        <div><b>Location:</b> ${event.event_location}</div>
        <div><b>Starts:</b> ${formatDate(event.start_date)}</div>
        <div><b>Ends:</b> ${formatDate(event.end_date)}</div>
    </div>`;
};
~~~

### Details

Этот шаблон задаёт содержимое всплывающего окна [InfoWindow](https://developers.google.com/maps/documentation/javascript/infowindows), которое появляется при клике на маркер события в Map View.

Он заменяет устаревшие шаблоны `scheduler.templates.marker_text` и `scheduler.templates.marker_date`, которые были удалены в Scheduler версии 7.1.

### Related Guides
- [Map View](views/map.md)

### Change log
- Добавлено в версии 7.1
