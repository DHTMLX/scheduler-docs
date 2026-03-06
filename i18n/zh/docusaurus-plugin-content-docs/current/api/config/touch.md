---
sidebar_label: "touch"
title: "touch config"
description: "开启或关闭调度器中的touch支持"
---

# touch

### Description

@short: 开启或关闭调度器中的touch支持

@signature: touch: boolean | string

### Example

~~~jsx
scheduler.config.touch = "force";
...
scheduler.init('scheduler_here',new Date(2013,3,10),"week");
~~~

**Default value:** true

### Related samples
- [Responsive scheduler](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/13_touch_ui.html)

### Details

当参数为字符串时，仅接受一个值 - **'force'**。

<br>

这意味着该参数可以有三种不同的取值:

- *true* - 调度器通过检查浏览器的user-agent字符串尝试识别touch设备，若检测到则启用touch支持。
- *'force'* - 始终保持touch支持开启，无论使用的设备类型。
- *false* - 关闭touch支持。

### Related API
- [touch_drag](api/config/touch_drag.md)
- [touch_tip](api/config/touch_tip.md)
- [touch_tooltip](api/config/touch_tooltip.md)

### Related Guides
- [Mobile Responsive Scheduler](guides/touch-support.md)
