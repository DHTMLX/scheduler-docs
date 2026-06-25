---
sidebar_label: load
title: "load метод"
description: "загружает данные в планировщик из внешнего источника данных"
---

# load

### Description

@short: Загружает данные в планировщик из внешнего источника данных

@signature: load: (url: string, callback?: SchedulerCallback) =\> void

### Parameters

- `url` - (required) *string* - URL на стороне сервера (может быть статическим файлом или серверным скриптом, который выводит данные в одном из поддерживаемых форматов)
- `callback` - (optional) *function* - функция обратного вызова

### Example

~~~jsx
scheduler.load("data"); // формат данных определяется автоматически
// или
scheduler.load("data", () => {
    alert("Data has been successfully loaded");
});
~~~

### Related samples
- [Базовая инициализация](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)
- [Загрузка данных из базы данных](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/05_loading_database.html)

### Details

Обратите внимание, что в случае динамической загрузки функция обратного вызова, переданная в качестве второго параметра, будет вызываться только при начальной загрузке данных.
В то время как последующие порции данных будут загружаться позже, функция обратного вызова больше не будет вызываться.

Если вам нужно вызывать функцию обратного вызова каждый раз, когда данные загружаются в Scheduler, вы можете использовать событие [`onLoadEnd`](api/event/onloadend.md).

## Migration

В версиях 5.2 и позже планировщик автоматически определяет формат данных.

Но до версии 5.2 метод включал три параметра:

- `url` - (*string*) URL на стороне сервера (может быть статическим файлом или серверным скриптом, который выводит данные в виде XML)
- `type` - (*string*) (*'json', 'xml', 'ical'*) тип данных. Значение по умолчанию *'xml'*
- `callback` - (*function*) - функция обратного вызова

### Related API
- [onLoadEnd](api/event/onloadend.md)
- [onLoadStart](api/event/onloadstart.md)
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)

### Related Guides
- [Examples of Data Formats](guides/data-formats.md)
- [Loading Data](guides/loading-data.md)

### Change log
- Второй параметр `type` метода был удалён в версии v5.2.