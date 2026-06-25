---
sidebar_label: "tooltip_date_format"
title: "tooltip_date_format template"
description: "定义在tooltip中开始和结束日期的显示格式"
---

# tooltip_date_format

### Description

@short: 定义在tooltip中开始和结束日期的显示格式

@signature: tooltip_date_format: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 需要格式化的日期

### Returns
- ` text` - (string) - 用于在scheduler中渲染的html文本

### Example

~~~jsx
scheduler.templates.tooltip_date_format=function (date){
    const formatFunc = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
    return formatFunc(date);
}
~~~

### Details

:::note
 该template仅在启用[tooltip](guides/extensions-list.md#tooltip)插件时生效。 
:::

### Related API
- [tooltip_text](api/template/tooltip_text.md)

### Related Guides
- [공통 템플릿](guides/common-templates.md#tooltips)
