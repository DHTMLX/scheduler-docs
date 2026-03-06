---
sidebar_label: "map_info_content"
title: "map_info_content template"
description: "맵 뷰에서 정보 창(info window) 안에 표시되는 내용을 정의합니다."
---

# map_info_content

### Description

@short: 맵 뷰에서 정보 창(info window) 안에 표시되는 내용을 정의합니다.

@signature: map_info_content: (event: any) =\> void

### Parameters

- `event` - (required) *object* - 이벤트 객체

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

이 템플릿은 맵 뷰에서 이벤트 마커를 클릭할 때 나타나는 [InfoWindow](https://developers.google.com/maps/documentation/javascript/infowindows) 팝업의 내용을 설정합니다.

이전의 `scheduler.templates.marker_text` 와 `scheduler.templates.marker_date` 템플릿을 대체하며, 해당 템플릿들은 Scheduler 버전 7.1에서 제거되었습니다.

### Related Guides
- ["Map View"](views/map.md)

### Change log
- v7.1에 추가됨
