---
sidebar_label: "load_format"
title: "load_format template"
description: "定义动态加载模式中使用的请求格式"
---

# load_format

### Description

@short: 定义动态加载模式中使用的请求格式

@signature: load_format: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 需要格式化的日期

### Returns
- ` text` - (string) - 用于在scheduler中渲染的html文本

### Example

~~~jsx
scheduler.templates.load_format = function(date){
    var dateToStr_func = scheduler.date.date_to_str(scheduler.config.load_date);
    return  dateToStr_func(date);
}
~~~

### Details

默认情况下，请求格式如下:

~~~js
some.php?from=DATEHERE&to=DATEHERE
~~~

其中 DATEHERE 表示根据 [load_date](api/config/load_date.md) 选项格式化的有效日期值 *(基于**load_format**模板的默认定义)*。

### Related API
- [setLoadMode](api/method/setloadmode.md)
- [load_date](api/config/load_date.md)

### Related Guides
- [데이터 불러오기](guides/loading-data.md#dynamic-loading)
