---
sidebar_label: "minicalendar"
title: "minicalendar config"
description: "定义 mini calendar 对象"
---

# minicalendar

### Description

@short: 定义 mini calendar 对象

@signature: minicalendar: any

### Example

~~~jsx
scheduler.config.minicalendar.mark_events = false; 
...
scheduler.init('scheduler_here', new Date(2013, 7, 5), "week");
~~~

**Default value:** \{ mark_events: true \}

### Related samples
- [Terrace skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/01_default.html)

### Details

:::note
 此属性需要启用 [minical](guides/extensions-list.md#minicalendardatepicker) 插件。 
::: 

minicalendar 对象包含一个属性:

- **mark_events** - (*array*) 决定是否在 mini calendar 中高亮显示事件

<br>

![minicalendar_property](/img/minicalendar_property.png)
