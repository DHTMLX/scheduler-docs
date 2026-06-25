---
sidebar_label: "drag_highlight"
title: "drag_highlight config"
description: "이 옵션은 스케줄러에서 이벤트를 드래그할 때 시간 축 상에서 이벤트의 시작 지점과 지속 시간을 하이라이트합니다."
---

# drag_highlight

### Description

@short: 이 옵션은 스케줄러에서 이벤트를 드래그할 때 시간 축 상에서 이벤트의 시작 지점과 지속 시간을 하이라이트합니다.

@signature: drag_highlight: boolean

### Example

~~~jsx
//하이라이트 기능을 끕니다
scheduler.config.drag_highlight = false; /*!*/

scheduler.init('scheduler_here',new Date(2027,0,10),"week");
scheduler.load("./data/events.xml");
~~~

**Default value:** true

### Details

![draghighlight_config](/img/draghighlight_config.png)

### Related API
- [highlightEventPosition](api/method/highlighteventposition.md)
- [drag_marker_class](api/template/drag_marker_class.md)

### Change log
- 이벤트를 드래그하는 동안 원래 위치를 하이라이트하는 기능은 v7.1에서 도입되었습니다.
