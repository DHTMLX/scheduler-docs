---
sidebar_label: "format_date"
title: "format_date template"
description: "将一个日期对象转换为格式化的日期字符串。这对于将日期数据发送回服务器非常有用。"
---

# format_date

### Description

@short: 将一个日期对象转换为格式化的日期字符串。这对于将日期数据发送回服务器非常有用。

@signature: format_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 需要格式化的日期

### Returns
- ` text` - (string) - 日期的字符串表示形式

### Example

~~~jsx
var dateToStr = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
scheduler.templates.format_date = function(date){
    return dateToStr(date);
};
~~~

### Details

详情请参见 [날짜 형식 지정](guides/settings-format.md)。

### Related Guides
- [데이터 불러오기](guides/loading-data.md)
- [날짜 작업](guides/date-formats.md)
- [Server-Side Integration](guides/server-integration.md)
- [날짜 형식 지정](guides/settings-format.md)
