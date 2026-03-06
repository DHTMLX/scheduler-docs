---
sidebar_label: "preserve_length"
title: "preserve_length config"
description: "在沿非线性时间轴拖动事件时保持事件的可见长度不变"
---

# preserve_length

### Description

@short: 在沿非线性时间轴拖动事件时保持事件的可见长度不变

@signature: preserve_length: boolean

### Example

~~~jsx
scheduler.config.preserve_length = true;
~~~

**Default value:** true

**Applicable views:** [Month view](views/month.md), [Timeline view](views/timeline.md)

### Details

此模式默认开启。

启用此模式后，事件在拖放过程中保持其可见长度不变，而不是根据开始和结束日期定义的实际长度。
<br> 例如，在月视图中有一个为期两天的事件，且周末被隐藏时，将该事件拖动跨越周五和周一，实际的开始和结束时间跨度会变为4天。但调度器会保持事件的可见长度为2天。
