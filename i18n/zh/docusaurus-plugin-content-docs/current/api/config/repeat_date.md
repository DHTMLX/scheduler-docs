---
sidebar_label: "repeat_date"
title: "repeat_date config"
description: "指定'recurring' lightbox 中'End by'字段使用的日期格式"
---

# repeat_date

### Description

@short: 指定"recurring" lightbox 中"End by"字段使用的日期格式

@signature: repeat_date: string

### Example

~~~jsx
scheduler.config.repeat_date = "%m/%d/%Y";
...
scheduler.init('scheduler_here',new Date(2019,05,11),"month");
~~~

**Default value:** "%m.%d.%Y"

### Details

:::note
 该属性需要启用 [recurring](guides/extensions-list.md#recurring) 扩展。 
:::

默认情况下，"End by"字段中输入的日期被视为排他的。

### Related API
- [include_end_by](api/config/include_end_by.md)

### Related Guides
- [반복 이벤트](guides/recurring-events.md)
