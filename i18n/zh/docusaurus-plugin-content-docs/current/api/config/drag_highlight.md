---
sidebar_label: "drag_highlight"
title: "drag_highlight config"
description: "此选项在拖动事件穿过scheduler的时间刻度时，高亮显示事件的起始点和持续时间。"
---

# drag_highlight

### Description

@short: 此选项在拖动事件穿过scheduler的时间刻度时，高亮显示事件的起始点和持续时间。

@signature: drag_highlight: boolean

### Example

~~~jsx
//关闭高亮显示
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
- 在v7.1版本中引入了拖动时高亮显示事件原始位置的功能。
