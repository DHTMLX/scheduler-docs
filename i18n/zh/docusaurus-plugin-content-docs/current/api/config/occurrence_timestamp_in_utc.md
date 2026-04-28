---
sidebar_label: "occurrence_timestamp_in_utc"
title: "occurrence_timestamp_in_utc config"
description: "让您处理重复事件时无需担心时区问题"
---

# occurrence_timestamp_in_utc

### Description

@short: 让您处理重复事件时无需担心时区问题

@signature: occurrence_timestamp_in_utc: boolean

### Example

~~~jsx
scheduler.config.occurrence_timestamp_in_utc = true;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Default value:** false

### Details

:::note
 此属性需要激活[recurring](guides/extensions-list.md#recurring) 扩展。 
:::

:::note

注意！此选项适用于刚开始使用且尚无重复事件的调度器。
对于已有重复事件的调度器启用此选项可能会导致问题。
 
:::
- 启用后，事件时间戳将以UNIX时间保存。
- 此选项自版本3.5起可用。

### Related Guides
- [반복 이벤트](guides/recurring-events.md)
