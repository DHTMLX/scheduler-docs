---
sidebar_label: "serialize"
title: "serialize method"
description: "сериализует все события, которые в данный момент загружены в scheduler"
---

# serialize

### Description

@short: Сериализует все события, которые в данный момент загружены в scheduler

@signature: serialize: () =\> void

### Example

~~~jsx
console.log(scheduler.serialize());


//(5) [{…}, {…}, {…}, {…}, {…}]
//> 0: {id: 1, start_date: '2022-05-17 09:00', end_date: '2022-05-17 12:00', 
//    text: 'Event'}
//> 1: {id: 2, start_date: '2022-05-18 10:00', end_date: '2022-05-18 16:00', 
//    text: 'Event'}
//> 2: {id: 3, start_date: '2022-05-20 10:00', end_date: '2022-05-20 14:00', 
//    text: 'Event'}
//> 3: {id: 4, start_date: '2022-05-21 16:00', end_date: '2022-05-21 17:00', 
//    text: 'Event'}
//> 4: {id: 5, start_date: '2022-05-22 09:00', end_date: '2022-05-22 17:00', 
//    text: 'Event'}
~~~

### Details

Этот метод возвращает массив всех событий, которые в данный момент загружены в Scheduler.

В результирующий массив не включаются временные записи, созданные расширением [Повторяющиеся события](guides/recurring-events.md).

Свойства, начинающиеся с `_` или `$`, исключаются из возвращаемых объектов, а все свойства типа `Date` конвертируются в строки с использованием шаблона [format_date](api/template/format_date.md).

### Related API
- [format_date](api/template/format_date.md)

### Change log
- добавлено в версии v6.0
