---
sidebar_label: "date"
title: "date config"
description: "коллекция методов для форматирования и работы с date"
---

# date

### Description

@short: Набор методов форматирования дат

@signature: date: SchedulerDateHelpers


### Details

Объект `date` предоставляет следующие методы:

- `add()` - добавляет/вычитает заданный временной интервал к дате
    - `date` - (<i>Date</i>) объект даты, к которому нужно добавить время
    - `number` - (<i>number</i>) количество единиц для добавления. Если число положительное, время будет добавлено к дате; если отрицательное — вычтено
    - `unit` - (<i>'minute', 'hour', 'day', 'week', 'month', 'year'</i>) единица времени

~~~js
// добавляет 1 год к указанной дате: 29 июня 2027 -> 29 июня 2028
const newDate = scheduler.date.add(new Date(2027, 5, 29), 1, 'year');
~~~

- `convert_to_utc()` - конвертирует локальное время в UTC
    - `date` - (<i>Date</i>) объект даты, который нужно сконвертировать
  
~~~js
//29 июня 2027 14:00 (локальное время) -> 29 июня 2027 12:00 (UTC)
const time = scheduler.date.convert_to_utc(new Date(2027, 5, 29, 14, 0));
~~~

- `copy()` - создает копию объекта Date
    - `date` - (<i>Date</i>) объект даты, который нужно скопировать
  
~~~js
const copy = scheduler.date.copy(new Date(2027, 5, 29)); // -> 29 июня 2027
~~~
  
- `date_part()` - сбрасывает временную часть указанной даты на 00:00:00
    - `date` - (<i>Date</i>) объект даты, который нужно форматировать
  
~~~js
//29 июня 2027 14:30:10 -> 29 июня 2027 00:00:00
const date = scheduler.date.date_part(new Date(2027, 5, 29, 14, 30, 10));
~~~
  
- `date_to_str()` - возвращает функцию, которая преобразует объект Date в строку заданного формата
Параметры: `format` - (<i>string</i>) формат даты (см. [Date Format Specification](guides/settings-format.md))
`utc` - (<i>boolean</i>) указывает, нужно ли локальное время конвертировать в UTC
  
~~~js
const formatFunc = scheduler.date.date_to_str("%d/%m/%Y");
const date = formatFunc(new Date(2027, 5, 29)); // -> "29/06/2027"
~~~
  
- `day_start()` - сбрасывает временную часть указанной даты на 00:00:00. Является псевдонимом метода `date_part()`. Используется дневным представлением для установки отображаемой даты и может быть переопределен, чтобы обеспечить поведение по умолчанию
Параметры: `date` - (<i>Date</i>) объект даты, который нужно форматировать
  
~~~js
// 29 июня 2027 14:30:10 -> 29 июня 2027 00:00:00
const date = scheduler.date.day_start(new Date(2027, 5, 29, 14, 30, 10));
~~~

> Примечание: передаваемая в метод дата фактически будет изменена. Чтобы предотвратить изменение исходной даты, оберните входную дату в `new Date()` . Например:

~~~js
const originalDate = new Date(2027, 5, 29, 14, 30, 10);
const dayStartDate = scheduler.date.day_start(new Date(originalDate));
~~~

- `getISOWeek()` - возвращает номер недели даты
    - `date` - (<i>Date</i>) объект даты, который нужно форматировать

~~~js
const week = scheduler.date.getISOWeek(new Date(2027, 5, 29)); // -> 26
~~~

- `getUTCISOWeek()` - возвращает номер недели даты, но предварительно преобразуя локальное время в UTC
    - `date` - (<i>Date</i>) объект даты, который нужно форматировать

~~~js
const week = scheduler.date.getUTCISOWeek(new Date(2027, 5, 29)); // -> 26
~~~

- `month_start()` - возвращает Date-объект первого дня месяца для заданной даты и обнуляет временную часть
    - `date` - (<i>Date</i>) объект даты, который нужно форматировать
  
~~~js
// 29 июня 2027 14:30 -> 01 июня 2027 00:00
const firstDay = scheduler.date.month_start(new Date(2027, 5, 29, 14, 30));
~~~

<span id="strtodate"></span>
- `str_to_date()` - возвращает функцию, которая преобразует строку заданного формата в объект Date
Параметры: `format` - (<i>string</i>) формат даты (см. [Date Format Specification](guides/settings-format.md))
`utc` - (<i>boolean</i>) указывает, нужно ли локальное время конвертировать в UTC
`parseExact` - (<i>boolean</i>) определяет, распознает ли Scheduler формат даты автоматически (false, по умолчанию) или использует формат, переданный пользователем (true)

~~~js
const formatFunc = scheduler.date.str_to_date("%d/%m/%Y");
const date = formatFunc("29/06/2027"); // -> 29 июня 2027 00:00:00
~~~

- `time_part()` - возвращает время объекта Date в виде количества секунд, отсчитанных с полуночи (00:00:00)
    - `date` - (<i>Date</i>) объект даты, который нужно отформатировать
~~~js
const time = scheduler.date.time_part(new Date(2027, 5, 29, 14, 30, 10));
 // time -> 52210
~~~

- `to_fixed()` - добавляет ведущий ноль к числам менее 10 и возвращает результат как строку. Не влияет на числа от 10
    - `num` - (<i>number</i>) число для форматирования

~~~js
const num1 = scheduler.date.to_fixed(2); // -> "02"
const num2 = scheduler.date.to_fixed(10); // -> 10
~~~
  
- `week_start()` - возвращает Date-объект первого дня недели для заданной даты и обнуляет временную часть
    - `date` - (<i>Date</i>) объект даты, который нужно форматировать

~~~js
// 29 июня 2027 14:30 -> 28 июня 2027 00:00
const weekStart = scheduler.date.week_start(new Date(2027, 5, 29, 14, 30));
~~~

- `year_start()` - возвращает Date-объект первого дня года для заданной даты и обнуляет временную часть
    - `date` - (<i>Date</i>) объект даты, который нужно форматировать
  
~~~js
// 29 июня 2027 14:30 -> 01 июня 2027 00:00
const yearStart = scheduler.date.year_start(new Date(2027, 5, 29, 14, 30));
~~~