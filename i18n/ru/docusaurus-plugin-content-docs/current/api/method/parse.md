---
sidebar_label: "parse"
title: "parse method"
description: "обрабатывает загрузку данных из клиентского ресурса"
---

# parse

### Description

@short: Обрабатывает загрузку данных из клиентского ресурса

@signature: parse: (data: any) =\> void

### Parameters

- `data` - (required) *object* - строка или объект, содержащий данные

### Example

~~~jsx
scheduler.parse([
     { start_date:"2020-05-13 6:00", end_date:"2020-05-13 8:00", text:"Event 1"},
     { start_date:"2020-06-09 6:00", end_date:"2020-06-09 8:00", text:"Event 2"}
]);
~~~

### Related samples
- [Coloring events](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)
- [Displaying events as a cascade](https://docs.dhtmlx.com/scheduler/samples/02_customization/24_cascade_event_display.html)

### Details

## Миграция

Начиная с версии 5.2, scheduler автоматически определяет формат данных. 

В более ранних версиях (до 5.2) метод принимал два параметра:

- **data** - (*object*)    строка или объект, содержащий данные;
- **type** - (*string*)    необязательный, (<i>'json', 'xml', 'ical'</i>) указывает тип данных. По умолчанию было <i>'xml'</i>

### Related API
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)
- [parse_date](api/template/parse_date.md)

### Related Guides
- [Примеры форматов данных](guides/data-formats.md)

### Change log
- Второй параметр **type** был удалён в версии 5.2.
