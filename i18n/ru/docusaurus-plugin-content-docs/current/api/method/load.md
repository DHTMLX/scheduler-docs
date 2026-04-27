---
sidebar_label: load
title: "load method"
description: "загружает данные в планировщик из внешнего источника данных"
---

# load

### Description

@short: Загружает данные в планировщик из внешнего источника данных

@signature: load: (url: string, callback?: SchedulerCallback) =\> void

### Parameters

- `url` - (required) *string* - серверный URL (может быть статическим файлом или серверным скриптом, который выводит данные в одном из поддерживаемых форматов)
- `callback` - (optional) *function* - функция обратного вызова

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

Обратите внимание, что в случае динамической загрузки функция обратного вызова, переданная в качестве второго параметра, будет вызываться только во время первоначальной загрузки данных.
Поскольку последующие порции данных будут загружаться позже, функция обратного вызова больше не будет вызываться.

Если вам нужно вызывать функцию обратного вызова каждый раз, когда данные загружаются в Scheduler, вы можете использовать событие [onLoadEnd](api/event/onloadend.md).

## Migration

В v5.2 и выше планировщик автоматически определяет формат данных.

Но до v5.2 метод включал три параметра:

- **url** - (*string*)  серверный URL (может быть статическим файлом или серверным скриптом, который выводит данные как XML)
- **type** - (*string*) <i>('json', 'xml', 'ical')</i> тип данных. Значение по умолчанию - <i>'xml'</i>
- **callback** - (*function*) функция обратного вызова

### Related API
- [onLoadEnd](api/event/onloadend.md)
- [onLoadStart](api/event/onloadstart.md)
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)

### Related Guides
- [Examples of Data Formats](guides/data-formats.md)
- [Loading Data](guides/loading-data.md)

### Change log
- Второй параметр **type** метода был удален в v5.2.