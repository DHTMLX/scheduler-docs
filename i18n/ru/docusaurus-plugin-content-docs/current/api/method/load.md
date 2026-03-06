---
sidebar_label: "load"
title: "load method"
description: "загружает данные в scheduler из внешнего источника"
---

# load

### Description

@short: Загружает данные в scheduler из внешнего источника

@signature: load: (url: string, callback?: SchedulerCallback) =\> void

### Parameters

- `url` - (required) *string* - URL на сервере (это может быть статический файл или серверный скрипт, который выводит данные в одном из поддерживаемых форматов)
- `callback` - (optional) *function* - функция, которая вызывается после завершения загрузки

### Example

~~~jsx
scheduler.load("data"); // формат данных определяется автоматически
// или
scheduler.load("data",function(){
    alert("Данные успешно загружены");
});
~~~

### Related samples
- [Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)
- [Loading data from a database](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/05_loading_database.html)

### Details

Обратите внимание, что при динамической загрузке данных функция callback, переданная вторым аргументом, вызывается только при первоначальной загрузке данных.
Последующие загрузки данных происходят позже, но callback вызываться повторно не будет.

Если необходимо, чтобы callback выполнялся каждый раз при загрузке данных в Scheduler, рассмотрите возможность использования события [onLoadEnd](api/event/onloadend.md).

## Миграция

Начиная с версии 5.2, scheduler автоматически определяет формат данных. 

В версиях до 5.2 метод принимал три параметра:

- **url** - (*string*)  URL на сервере (может быть статическим файлом или серверным скриптом, который выводит XML данные)
- **type** - (*string*) <i>('json', 'xml', 'ical')</i> указывающий тип данных. По умолчанию <i>'xml'</i>
- **callback** - (*function*) функция для вызова после загрузки

### Related API
- [onLoadEnd](api/event/onloadend.md)
- [onLoadStart](api/event/onloadstart.md)
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)

### Related Guides
- [Примеры форматов данных](guides/data-formats.md)
- [Загрузка данных](guides/loading-data.md)

### Change log
- Второй параметр **type** был удалён, начиная с версии 5.2.
