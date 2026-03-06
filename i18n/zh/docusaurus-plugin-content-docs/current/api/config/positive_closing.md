---
sidebar_label: "positive_closing"
title: "positive_closing config"
description: "控制用户在事件框内直接编辑事件文本时的'保存'行为"
---

# positive_closing

### Description

@short: 控制用户在事件框内直接编辑事件文本时的"保存"行为

@signature: positive_closing: boolean

### Example

~~~jsx
scheduler.config.positive_closing = true;
...
scheduler.init('scheduler_here', new Date(2013,05,11), "week");
~~~

**Default value:** false

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Details

点击选择栏中的编辑按钮会打开一个表单，用于编辑事件文本。通常情况下，点击表单外部会关闭表单并放弃所有更改。将此选项设置为 *true* 时，点击表单外部将保存更改，而不是取消。

![positiveClosing_property](/img/positiveClosing_property.png)
