---
sidebar_label: "displayed_event_text_color"
title: "displayed_event_text_color config"
description: "showEvent() 메서드로 표시되는 이벤트의 기본 글자색을 정의합니다."
---

# displayed_event_text_color

### Description

@short: ShowEvent() 메서드로 표시되는 이벤트의 기본 글자색을 정의합니다.

@signature: displayed_event_text_color: string

### Example

~~~jsx
scheduler.config.displayed_event_text_color="#195D8A";
...
scheduler.init('scheduler_here',new Date(2013,0,10),"week");
~~~

**Default value:** #7e2727

### Details

이 파라미터는 버전 3.5부터 제공되며, 특히 [showEvent](api/method/showevent.md) 메서드와 함께 사용됩니다.

### Related API
- [showEvent](api/method/showevent.md)
- [displayed_event_color](api/config/displayed_event_color.md)
