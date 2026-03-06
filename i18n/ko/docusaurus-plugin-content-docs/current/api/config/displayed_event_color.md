---
sidebar_label: "displayed_event_color"
title: "displayed_event_color config"
description: "showEvent() 메서드로 표시되는 이벤트의 기본 배경색을 정의합니다."
---

# displayed_event_color

### Description

@short: ShowEvent() 메서드로 표시되는 이벤트의 기본 배경색을 정의합니다.

@signature: displayed_event_color: string

### Example

~~~jsx
scheduler.config.displayed_event_color="#DFEDF7";
...
scheduler.init('scheduler_here',new Date(2013,0,10),"week");
~~~

**Default value:** #ffc5ab

### Details

이 설정은 버전 3.5부터 제공되며, [showEvent](api/method/showevent.md) 메서드 내에서 사용됩니다.

### Related API
- [showEvent](api/method/showevent.md)
- [displayed_event_text_color](api/config/displayed_event_text_color.md)
