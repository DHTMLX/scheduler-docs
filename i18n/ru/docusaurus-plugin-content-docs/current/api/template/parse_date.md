---
sidebar_label: "parse_date"
title: "parse_date template"
description: "преобразует строку с датой в объект Date"
---

# parse_date

### Description

@short: Преобразует строку с датой в объект Date

@signature: parse_date: (date: string) =\> Date

### Parameters

- `date` - (required) *string* - строка, которую нужно преобразовать

### Returns
- ` date` - (Date) - объект Date

### Example

~~~jsx
var cfg = scheduler.config;
var strToDate = scheduler.date.str_to_date(cfg.date_format, cfg.server_utc);

scheduler.templates.parse_date = function(date){
    return strToDate (date);
};
~~~

### Details

Эта функция вызывается при выполнении **scheduler.load()** или **scheduler.parse()** для разбора свойств *start_date/end_date* событий, если они представлены в виде строк. 
Вы можете переопределить эту функцию, если ваш формат даты отличается и стандартный парсер не подходит. Подробнее см. в [Спецификация формата даты](guides/settings-format.md).

[Подробнее о date объектах](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).

### Related API
- [parse](api/method/parse.md)
- [load](api/method/load.md)

### Related Guides
- [Загрузка данных](guides/loading-data.md)
- [Спецификация формата даты](guides/settings-format.md)
- [Интеграция с серверной стороной](guides/server-integration.md)
