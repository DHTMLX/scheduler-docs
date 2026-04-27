---
sidebar_label: serialize
title: "serialize method"
description: "Сериализует все события, загруженные в Scheduler"
---

# serialize

### Description

@short: Сериализует все события, загруженные в Scheduler

@signature: serialize: () =\> void

### Example

~~~jsx
console.log(scheduler.serialize());


//(5) [{…}, {…}, {…}, {…}, {…}]
 //> 0: {id: 1, start_date: '2027-05-17 09:00', end_date: '2027-05-17 12:00', 
 //    text: 'Event'}
 //> 1: {id: 2, start_date: '2027-05-18 10:00', end_date: '2027-05-18 16:00', 
 //    text: 'Event'}
 //> 2: {id: 3, start_date: '2027-05-20 10:00', end_date: '2027-05-20 14:00', 
 //    text: 'Event'}
 //> 3: {id: 4, start_date: '2027-05-21 16:00', end_date: '2027-05-21 17:00', 
 //    text: 'Event'}
 //> 4: {id: 5, start_date: '2027-05-22 09:00', end_date: '2027-05-22 17:00', 
 //    text: 'Event'}
~~~

### Details

Метод возвращает массив, содержащий все события, загруженные в Scheduler.

Результирующий массив не будет включать временные записи, созданные расширением [Recurring Events](guides/recurring-events.md).

Свойства, начинающиеся с `_` или `$`, не будут включены в итоговые объекты; все свойства типа `Date` будут преобразованы в `string` с использованием шаблона [format_date](api/template/format_date.md).

### Related API
- [format_date](api/template/format_date.md)

### Change log
- добавлено в v6.0