---
sidebar_label: "api_date"
title: "api_date template"
description: "设置 API 方法用于处理日期的日期格式。这样有助于正确解析传入的日期值。"
---

# api_date

### Description

@short: 设置 API 方法用于处理日期的日期格式。这样有助于正确解析传入的日期值。

@signature: api_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 需要格式化的日期

### Returns
- ` text` - (string) - 用于在 scheduler 中渲染的 html 文本

### Example

~~~jsx
scheduler.templates.api_date = function(date){
    return scheduler.date.str_to_date(scheduler.config.api_date);
};
~~~
