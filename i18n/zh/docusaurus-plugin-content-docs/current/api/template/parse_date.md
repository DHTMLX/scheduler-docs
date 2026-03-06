---
sidebar_label: "parse_date"
title: "parse_date template"
description: "将日期字符串转换为 Date 对象"
---

# parse_date

### Description

@short: 将日期字符串转换为 Date 对象

@signature: parse_date: (date: string) =\> Date

### Parameters

- `date` - (required) *string* - 需要转换的字符串

### Returns
- ` date` - (Date) - Date 对象

### Example

~~~jsx
var cfg = scheduler.config;
var strToDate = scheduler.date.str_to_date(cfg.date_format, cfg.server_utc);

scheduler.templates.parse_date = function(date){
    return strToDate(date);
};
~~~

### Details

当解析事件的 *start_date/end_date* 属性且它们以字符串形式传入时，该函数由 **scheduler.load()** 或 **scheduler.parse()** 触发。 
如果您的日期格式不同且默认解析器无法正常工作，可以重写此函数。详情请参见 [날짜 형식 지정](guides/settings-format.md)。

[了解更多关于 Date 对象](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)。

### Related API
- [parse](api/method/parse.md)
- [load](api/method/load.md)

### Related Guides
- [데이터 불러오기](guides/loading-data.md)
- [날짜 형식 지정](guides/settings-format.md)
- [Server-Side Integration](guides/server-integration.md)
