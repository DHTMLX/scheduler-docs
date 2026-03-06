---
sidebar_label: "xml_format"
title: "xml_format template"
description: "一个日期对象会被转换成符合特定模板的字符串。此模板主要用于将数据发送回服务器时的格式化。"
---

# xml_format
:::warning 
此功能已棄用。
:::
### Description

@short: 一个日期对象会被转换成符合特定模板的字符串。此模板主要用于将数据发送回服务器时的格式化。

@signature: xml_format: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 需要格式化的日期对象

### Returns
- ` text` - (string) - 日期的字符串表示形式

### Example

~~~jsx
var cfg = scheduler.config;
var    date_to_str = scheduler.date.date_to_str(cfg.xml_date, cfg.server_utc);

scheduler.templates.xml_format = function(date){
    return date_to_str(date);
};
~~~

### Details

:::note
 此模板已被废弃。请参考 [format_date](api/template/format_date.md) 替代: 
:::

~~~js
var dateToStr = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
scheduler.templates.format_date = function(date){
    return dateToStr (date);
};
~~~

### Related Guides
- [데이터 불러오기](guides/loading-data.md)
- [Server-Side Integration](guides/server-integration.md)

### Change log
- 自 v5.2 起废弃
