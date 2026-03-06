---
sidebar_label: "matrix"
title: "matrix config"
description: "存储页面上所有时间线配置对象"
---

# matrix

### Description

@short: 存储页面上所有时间线配置对象

@signature: matrix: any

### Example

~~~jsx
scheduler.createTimelineView({
    name:    "myTimeline",
    x_unit:    "minute",
    x_date:    "%H:%i",
    x_step:    30,
    x_size: 24,
    x_start: 16,
    x_length:    48,
    y_unit:    sections,
    y_property:    "section_id",
    render:"bar"
});

var configObj = scheduler.matrix;
~~~

### Related samples
- [Tooltips](https://docs.dhtmlx.com/scheduler/samples/06_timeline/12_section_tooltip.html)

### Details

变量 **configObj** 保存以下结构:

~~~js
{
    myTimeline:{
        name:    "myTimeline",
        x_unit:    "minute",
        ...
    }
}
~~~

:::note

该属性允许您动态调整时间线配置。<br>
但是，如果需要对设置进行较大更改，通常更好的做法是定义多个配置对象，并替换当前时间线，而不是直接修改 **matrix** 属性。
 
:::

例如，如果您想更新上述示例中时间线的 x_step、x_size 和 x_start 值:

~~~
//一种方法是：
configObj.x_step = 50;
configObj.x_size = 28;
configObj.x_start = 20;
scheduler.updateView();

//但更有效的方式是：

scheduler.createTimelineView({
    name:    "myTimeline",
    x_unit:    "minute",
    x_date:    "%H:%i",
    x_step:    50,
    x_size: 28,
    x_start: 20,
    x_length:    48,
    y_unit:    sections,
    y_property:    "section_id",
    render:"bar"
});
~~~
*如果用已存在的名称创建时间线，scheduler 不会添加新的时间线，而是更新现有的时间线。*
