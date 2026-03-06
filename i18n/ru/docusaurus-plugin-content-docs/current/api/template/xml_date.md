---
sidebar_label: "xml_date"
title: "xml_date template"
description: "Этот шаблон преобразует строку из XML файла в объект даты на основе указанного формата."
---

# xml_date
:::warning
Эта функицональность устарела
::: 
### Description

@short: Этот шаблон преобразует строку из XML файла в объект даты на основе указанного формата.

@signature: xml_date: (date: string) =\> Date

### Parameters

- `date` - (required) *string* - строка, которую необходимо распарсить

### Returns
- ` date` - (Date) - объект даты

### Example

~~~jsx
var cfg = scheduler.config;
var str_to_date = scheduler.date.str_to_date(cfg.xml_date, cfg.server_utc);

scheduler.templates.xml_date = function(date){
    return str_to_date(date);
};
~~~

### Details

:::note
 Этот шаблон устарел. Пожалуйста, используйте [parse_date](api/template/parse_date.md) вместо него: 
:::

~~~js
var cfg = scheduler.config;
var strToDate = scheduler.date.str_to_date(cfg.date_format, cfg.server_utc);
 
scheduler.templates.parse_date = function(date){
    return strToDate(date);
};
~~~

### Related Guides
- [Загрузка данных](guides/loading-data.md)

### Change log
- отмечено как устаревшее с версии v5.2
