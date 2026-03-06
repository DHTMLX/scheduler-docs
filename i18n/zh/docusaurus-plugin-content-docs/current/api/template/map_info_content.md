---
sidebar_label: "map_info_content"
title: "map_info_content template"
description: "定义地图视图中信息窗口内显示的内容"
---

# map_info_content

### Description

@short: 定义地图视图中信息窗口内显示的内容

@signature: map_info_content: (event: any) =\> void

### Parameters

- `event` - (required) *object* - 事件对象

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

该模板设置在地图视图中点击事件标记时弹出的 [InfoWindow](https://developers.google.com/maps/documentation/javascript/infowindows) 窗口的内容。

它取代了旧版本 Scheduler 7.1 中移除的 `scheduler.templates.marker_text` 和 `scheduler.templates.marker_date` 模板。

### Related Guides
- [Map View](views/map.md)

### Change log
- v7.1 版本新增
