---
sidebar_label: "date"
title: "date config"
description: "коллекция методов для форматирования и работы с date"
---

# date

### Description

@short: Коллекция методов для форматирования и работы с date

@signature: date: SchedulerDateHelpers

### Example

~~~jsx

~~~

### Details

Объект **date** включает несколько удобных методов:

- **add**(date, number, unit) - изменяет date, добавляя или вычитая указанный промежуток времени
    - **date** - (<i>Date</i>) объект date для изменения
    - **number** - (<i>number</i>) количество единиц времени для добавления; положительные значения добавляют время, отрицательные вычитают
    - **unit** - (<i>'minute', 'hour', 'day', 'week', 'month', 'year'</i>) единица времени

~~~js
//добавляет 1 год к указанной дате: 29 июня 2019 -> 29 июня 2020
var newDate = scheduler.date.add(new Date(2019, 05, 29), 1, 'year');
~~~

- **convert_to_utc**(date) - конвертирует локальную дату в её UTC эквивалент
    - **date** - (<i>Date</i>) объект date для конвертации
  
~~~js
//29 июня 2019 14:00 (локальное время) -> 29 июня 2019 12:00 (UTC)
var time = scheduler.date.convert_to_utc(new Date(2019, 05, 29, 14, 00));
~~~

- **copy**(date) - создаёт копию объекта Date
    - **date** - (<i>Date</i>) объект date для копирования
  
~~~js
var copy = scheduler.date.copy(new Date(2019, 05, 29)); // -> 29 июня 2019
~~~
  
- **date_part**(date) - сбрасывает время в date до 00:00:00
    - **date** - (<i>Date</i>) объект date для изменения
  
~~~js
//29 июня 2019 14:30:10 -> 29 июня 2019 00:00:00
var date = scheduler.date.date_part(new Date(2019, 05, 29, 14, 30, 10));
~~~
  
- **date_to_str**(format, utc) - возвращает функцию, которая преобразует Date в строку в заданном формате
       - **format** - (<i>string</i>) желаемый формат date (см. [Спецификация формата даты](guides/settings-format.md))  
       - **utc** - (<i>boolean</i>) преобразовывать ли локальное время в UTC  
  
~~~js
var formatFunc = scheduler.date.date_to_str("%d/%m/%Y");
var date = formatFunc(new Date(2019, 05, 29)); // -> "29/06/2019"
~~~
  
- **day_start**(date) - сбрасывает время date до 00:00:00; алиас для метода <b>date_part</b>. Используется в Day view для установки отображаемой даты и может быть настроен при необходимости
      - **date** - (<i>Date</i>) объект date для изменения

~~~js
//29 июня 2019 14:30:10 -> 29 июня 2019 00:00:00
var date = scheduler.date.day_start(new Date(2019, 05, 29, 14, 30, 10));
~~~

>**Примечание**, этот метод изменяет переданный ему объект date. Чтобы избежать изменения оригинальной даты, оберните её в *new Date* перед передачей. Например:

~~~js
var date1 = new Date(2019, 05, 29, 14, 30, 10);
var date2 = scheduler.date.day_start(new Date(date1));
~~~

- **getISOWeek**(date) - возвращает номер ISO недели для заданной даты
    - **date** - (<i>Date</i>) объект date для вычисления

~~~js
var week = scheduler.date.getISOWeek(new Date(2019, 05, 29)); // -> 26
~~~

- **getUTCISOWeek**(date) - возвращает номер ISO недели для даты после конвертации в UTC
    - **date** - (<i>Date</i>) объект date для вычисления

~~~js
var week = scheduler.date.getUTCISOWeek(new Date(2019, 05, 29)); // -> 26
~~~

- **month_start**(date) - возвращает новый объект Date, представляющий первый день месяца с обнулённым временем 00:00:00
    - **date** - (<i>Date</i>) объект date для обработки
  
~~~js
//29 июня 2019 14:30 -> 01 июня 2019 00:00
var firstDay = scheduler.date.month_start(new Date(2019, 05, 29, 14, 30));
~~~

- <span id="strtodate">**str_to_date**(format, utc, parseExact)</span> - возвращает функцию, которая преобразует строку с датой заданного формата в объект Date
      - **format** - (<i>string</i>) формат date (см. [Спецификация формата даты](guides/settings-format.md))  
      - **utc** - (<i>boolean</i>) преобразовывать ли локальное время в UTC  
      - **parseExact** - (<i>boolean</i>) определяет, должен ли Scheduler автоматически определять формат даты (*false* по умолчанию) или строго использовать заданный формат (*true*)
~~~js
var formatFunc = scheduler.date.str_to_date("%d/%m/%Y");
var date = formatFunc("29/06/2019"); // -> 29 июня 2019 00:00:00
~~~

- **time_part**(date) - возвращает временную часть Date в виде количества секунд, прошедших с полуночи (00:00:00)
    - **date** - (<i>Date</i>) объект date для вычисления
~~~js
var time = scheduler.date.time_part(new Date(2019, 05, 29, 14, 30, 10));
//time -> 52210
~~~

- **to_fixed**(num) - форматирует числа меньше 10, добавляя ведущий ноль и возвращая строку; числа 10 и больше возвращаются без изменений
    - **num** - (<i>number</i>) число для форматирования

~~~js
var num1 = scheduler.date.to_fixed(2);  // -> "02"
var num2 = scheduler.date.to_fixed(10); // -> 10
~~~
  
- **week_start**(date) - возвращает объект Date первого дня недели для заданной даты с временем 00:00:00
    - **date** - (<i>Date</i>) объект date для обработки

~~~js
//29 июня 2019 14:30 -> 24 июня 2019 00:00
var weekStart = scheduler.date.week_start(new Date(2019, 05, 29, 14, 30));
~~~
  
- **year_start**(date) - возвращает объект Date первого дня года для заданной даты с обнулённым временем 00:00:00
    - **date** - (<i>Date</i>) объект date для обработки
  
~~~js
//29 июня 2019 14:30 -> 01 января 2019 00:00
var yearStart = scheduler.date.year_start(new Date(2019, 05, 29, 14, 30));
~~~
