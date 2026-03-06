---
sidebar_label: "highlight_displayed_event"
title: "highlight_displayed_event config"
description: "showEvent 메서드로 가져온 이벤트가 표시될 때 하이라이트되는지 여부를 결정합니다."
---

# highlight_displayed_event

### Description

@short: ShowEvent 메서드로 가져온 이벤트가 표시될 때 하이라이트되는지 여부를 결정합니다.

@signature: highlight_displayed_event: boolean

### Example

~~~jsx
scheduler.config.highlight_displayed_event=false;
...
scheduler.init('scheduler_here',new Date(2010,0,10),"week");
~~~

**Default value:** true

### Details

이 옵션은 버전 3.5부터 제공되며, [showEvent](api/method/showevent.md) 메서드에만 적용됩니다.

### Related API
- [showEvent](api/method/showevent.md)
