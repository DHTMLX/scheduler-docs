---
sidebar_label: "format_date"
title: "format_date template"
description: "преобразует объект даты в форматированную строку даты. Это полезно для отправки данных даты обратно на сервер."
---

# format_date

### Description

@short: Преобразует объект даты в форматированную строку даты. Это полезно для отправки данных даты обратно на сервер.

@signature: format_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - дата, которую необходимо отформатировать

### Returns
- ` text` - (string) - строковое представление даты

### Example

~~~jsx
const dateToStr = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
scheduler.templates.format_date = function(date){
    return dateToStr(date);
};
~~~

### Details

Подробнее смотрите в [Спецификация формата даты](guides/settings-format.md).

### Related Guides
- [Загрузка данных](guides/loading-data.md)
- [Операции с датами](guides/date-formats.md)
- [Интеграция с серверной стороной](guides/server-integration.md)
- [Спецификация формата даты](guides/settings-format.md)
