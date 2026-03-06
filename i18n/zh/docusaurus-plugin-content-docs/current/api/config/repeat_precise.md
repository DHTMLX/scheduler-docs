---
sidebar_label: "repeat_precise"
title: "repeat_precise config"
description: "停止在'weekly'重复事件中包含过去的日期"
---

# repeat_precise

### Description

@short: 停止在"weekly"重复事件中包含过去的日期

@signature: repeat_precise: boolean

### Example

~~~jsx
scheduler.config.repeat_precise = true;
~~~

**Default value:** false

### Details

:::note
 该属性需要启用[recurring](guides/extensions-list.md#recurring)扩展。 
:::

默认情况下，当设置"weekly"重复时，scheduler 会将当前周包含在重复中，无论事件是在指定日期之后、之间还是之前创建的。<br>

例如，如果事件在周四创建，并设置为每周在周一和周三重复，该事件将包含当前周的周一和周三，即使这些日期已经过去。

当 **repeat_precise** 选项设置为 *true* 时，重复事件的开始日期将是实际首次发生的日期，换言之，在我们的例子中，它将是下一周的周一。

### Related Guides
- [반복 이벤트](guides/recurring-events.md)
