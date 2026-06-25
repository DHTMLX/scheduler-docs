---
sidebar_label: "event_date"
title: "event_date template"
description: "定义事件开始和结束日期中的时间部分。主要由其他模板使用，用于显示时间区间。"
---

# event_date

### Description

@short: 定义事件开始和结束日期中的时间部分。主要由其他模板使用，用于显示时间区间。

@signature: event_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 需要格式化的日期

### Returns
- ` text` - (string) - 用于在scheduler中渲染的html文本

### Example

~~~jsx
scheduler.templates.event_date = function(date){
    const formatFunc = scheduler.date.date_to_str(scheduler.config.hour_date);
    return formatFunc(date);
}
~~~

### Related Guides
- [공통 템플릿](guides/common-templates.md#lightbox)
