---
sidebar_label: "xml_format"
title: "xml_format template"
description: "Объект даты преобразуется в строку согласно этому конкретному шаблону. В основном используется при отправке данных обратно на сервер."
---

# xml_format

:::warning
Эта функицональность устарела
::: 

### Description

@short: Объект даты преобразуется в строку согласно этому конкретному шаблону. В основном используется при отправке данных обратно на сервер.

@signature: xml_format: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - дата, которую нужно отформатировать

### Returns
- ` text` - (string) - строковое представление даты

### Example

~~~jsx
const cfg = scheduler.config;
const date_to_str = scheduler.date.date_to_str(cfg.xml_date, cfg.server_utc);

scheduler.templates.xml_format = function(date){
    return date_to_str(date);
};
~~~

### Details

:::note
 Этот шаблон устарел. Пожалуйста, обратитесь к [format_date](api/template/format_date.md) вместо него: 
:::

~~~js
const dateToStr = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
scheduler.templates.format_date = function(date){
    return dateToStr (date);
};
~~~

### Related Guides
- [Загрузка данных](guides/loading-data.md)
- [Интеграция с серверной стороной](guides/server-integration.md)

### Change log
- устарел с версии v5.2
