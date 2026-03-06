---
sidebar_label: "day_column_padding"
title: "day_column_padding config"
description: "为视图列添加内边距"
---

# day_column_padding

### Description

@short: 为视图列添加内边距

@signature: day_column_padding: number

### Example

~~~jsx
scheduler.config.day_column_padding = 20;
~~~

**Default value:** 8

### Details

事件可以横跨整个视图列的宽度。`day_column_padding` 设置限制了事件在每个单元格内所占的最大宽度。这样，列的两侧总会保留一些空白区域，用户可以通过双击这些空白区域来创建新事件。

**禁用内边距**
~~~
scheduler.config.day_column_padding = 0;
~~~

![Scheduler - no padding in day columns](/img/day_column_padding_none.png)

**启用内边距**
~~~
scheduler.config.day_column_padding = 8;
~~~
![Scheduler - padding inside day columns](/img/day_column_padding_set.png)

### Change log
- added in v7.0
