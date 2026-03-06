---
sidebar_label: "TIMELINE_date"
title: "TIMELINE_date template"
description: "定义视图头部显示的日期"
---

# TIMELINE_date
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 定义视图头部显示的日期

@signature: TIMELINE_date: (date1: Date, date2: Date) =\> string;

### Parameters

- `date1` - (required) *Date* - 事件的开始日期
- `date2` - (required) *Date* - 事件的结束日期

### Returns
- ` text` - (string) - 用于在scheduler中渲染的html文本

### Example

~~~jsx
scheduler.templates.timeline_date = function(date1, date2){
    if (date1.getDay()==date2.getDay() && date2-date1<(24*60*60*1000))
            return scheduler.templates.day_date(date1);
        return scheduler.templates.week_date(date1, date2); 
};
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 该模板需要启用[timeline](guides/extensions-list.md#timeline)插件。 
:::

如果未定义[timeline_date](api/template/timelinename_date.md)模板，头部日期将默认为[week_date](api/template/week_date.md)模板所使用的格式。

### Related Guides
- [타임라인 뷰 템플릿](views/timeline-view-templates.md)
