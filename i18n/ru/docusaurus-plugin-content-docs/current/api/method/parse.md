---
sidebar_label: parse
title: "parse method"
description: "Загружает данные из ресурса на стороне клиента"
---

# parse

### Description

@short: Загружает данные из ресурса на стороне клиента

@signature: parse: (data: any) =\> void

### Parameters

- `data` - (required) *object* - строка или объект, представляющий данные

### Example

~~~jsx
scheduler.parse([
     { start_date:"2027-05-13 6:00", end_date:"2027-05-13 8:00", text:"Event 1"},
     { start_date:"2027-06-09 6:00", end_date:"2027-06-09 8:00", text:"Event 2"}
]);
~~~

### Related samples
- [Окрашивание событий](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)
- [Отображение событий каскадом](https://docs.dhtmlx.com/scheduler/samples/02_customization/24_cascade_event_display.html)

### Details

## Миграция

В версии v5.2 и выше планировщик автоматически определяет формат данных. 

Но до версии v5.2 метод имел два параметра:

- **data** - (*object*)    строка или объект, представляющий данные;
- **type** - (*string*)    необязательный, (<i>'json', 'xml', 'ical'</i>) тип данных. Значение по умолчанию - <i>'xml'</i>

### Related API
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)
- [parse_date](api/template/parse_date.md)

### Related Guides
- [Примеры форматов данных](guides/data-formats.md)

### Change log
- Второй параметр **type** метода был удалён в версии v5.2.