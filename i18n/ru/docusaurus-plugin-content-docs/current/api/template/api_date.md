---
sidebar_label: "api_date"
title: "api_date template"
description: "задаёт формат даты, используемый методами API для обработки дат. Это помогает корректно интерпретировать входящие значения дат."
---

# api_date

### Description

@short: Задаёт формат даты, используемый методами API для обработки дат. Это помогает корректно интерпретировать входящие значения дат.

@signature: api_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - дата, которую необходимо отформатировать

### Returns
- ` text` - (string) - html текст для отображения в scheduler

### Example

~~~jsx
scheduler.templates.api_date = function(date){
    return scheduler.date.str_to_date(scheduler.config.api_date);
};
~~~
