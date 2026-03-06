---
sidebar_label: "TIMELINE_tooltip"
title: "TIMELINE_tooltip template"
description: "提供包含已安排事件的日期单元格的tooltip文本"
---

# TIMELINE_tooltip
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 提供包含已安排事件的日期单元格的tooltip文本

@signature: TIMELINE_tooltip: (start: Date, end; date, event: object) =\> string;

### Parameters

- `start` - (required) *Date* - 事件开始的日期  
- `end` - (required) *Date* - 事件结束的日期
- `event` - (required) *object* - 事件对象

### Returns
- ` text` - (string) - 用于在scheduler tooltip中显示的html内容

### Example

~~~jsx
scheduler.templates.timeline_tooltip = function(start,end,event){
    return event.text;
};
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 该模板仅在启用[timeline](guides/extensions-list.md#timeline)插件时有效。 
:::

### Related Guides
- [타임라인 뷰 템플릿](views/timeline-view-templates.md)
