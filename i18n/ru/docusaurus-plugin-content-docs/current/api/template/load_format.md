---
sidebar_label: "load_format"
title: "load_format template"
description: "определяет формат запроса, используемый в режиме динамической загрузки"
---

# load_format

### Description

@short: Определяет формат запроса, используемый в режиме динамической загрузки

@signature: load_format: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - дата, которую необходимо отформатировать

### Returns
- ` text` - (string) - html текст для отображения в scheduler

### Example

~~~jsx
scheduler.templates.load_format = function(date){
    const dateToStr_func = scheduler.date.date_to_str(scheduler.config.load_date);
    return  dateToStr_func(date);
    
}
~~~

### Details

По умолчанию запросы имеют следующий формат:

~~~js
some.php?from=DATEHERE&to=DATEHERE
~~~

где DATEHERE представляет собой корректное значение даты, отформатированное согласно опции [load_date](api/config/load_date.md) *(на основе стандартного определения шаблона **load_format**).*

### Related API
- [setLoadMode](api/method/setloadmode.md)
- [load_date](api/config/load_date.md)

### Related Guides
- [Загрузка данных](guides/loading-data.md#dynamic-loading)
