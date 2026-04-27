---
sidebar_label: "xml_date"
title: "xml_date template"
description: "该模板将来自 XML 文件的字符串根据指定格式转换为日期对象。"
---

# xml_date
:::warning 
此功能已棄用。
:::
### Description

@short: 该模板将来自 XML 文件的字符串根据指定格式转换为日期对象。

@signature: xml_date: (date: string) =\> Date

### Parameters

- `date` - (required) *string* - 需要解析的字符串

### Returns
- ` date` - (Date) - 一个日期对象

### Example

~~~jsx
const cfg = scheduler.config;
const str_to_date = scheduler.date.str_to_date(cfg.xml_date, cfg.server_utc);

scheduler.templates.xml_date = function(date){
    return str_to_date(date);
};
~~~

### Details

:::note
 此模板已被弃用。请参阅 [parse_date](api/template/parse_date.md) 替代使用: 
:::

~~~js
const cfg = scheduler.config;
const strToDate = scheduler.date.str_to_date(cfg.date_format, cfg.server_utc);
 
scheduler.templates.parse_date = function(date){
    return strToDate(date);
};
~~~

### Related Guides
- [데이터 불러오기](guides/loading-data.md)

### Change log
- 自 v5.2 起标记为已弃用
