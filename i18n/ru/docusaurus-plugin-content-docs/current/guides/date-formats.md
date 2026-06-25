---
title: "Операции с датами"
sidebar_label: "Операции с датами"
---

# Операции с датами

Библиотека включает объект [date](api/other/date.md), который предоставляет набор методов форматирования дат.

В этой статье мы рассмотрим особенно важные и часто используемые методы. Полный список методов можно найти на [странице объекта date](api/other/date.md).

## Преобразование объекта Date в строку

Для преобразования объекта Date в строку используется метод [date_to_str](api/other/date.md): 

 
*Метод возвращает функцию, которая преобразует объект Date в строку заданного формата:*
~~~js
const formatFunc = scheduler.date.date_to_str("%d/%m/%Y");
const date = formatFunc(new Date(2027, 05, 29)); // -> "29/06/2027"
~~~

[Отображение нескольких недель в Week view](https://docs.dhtmlx.com/scheduler/samples/11_scales/03_two_work_weeks.html)

## Преобразование строки в объект Date

Для преобразования строки в объект Date используется метод [str_to_date](api/other/date.md): 

 
*Метод возвращает функцию, которая преобразует строку заданного формата в Date объект:*


Вы можете сгенерировать функцию преобразования даты следующим образом:

~~~js
const formatFunc = scheduler.date.str_to_date("%d/%m/%Y");
const date = formatFunc("29/06/2027"); // -> 29 June, 2027 00:00:00
~~~


## Преобразование в UTC

Чтобы преобразовать локальное время в UTC, используйте метод [convert_to_utc](api/other/date.md):

~~~js
//29 June, 2027 14:00 (local time) -> 29 June, 2027 12:00 (utc)
const time = scheduler.date.convert_to_utc(new Date(2027, 05, 29, 14, 00));
~~~

## Добавление (вычитание) временного интервала к (из) даты

Для добавления или вычитания временного интервала из заданной даты можно воспользоваться методом [add](api/other/date.md):

~~~js
//adds 1 year to the specified date: 29 June, 2027 -> 29 June, 2020
const newDate = scheduler.date.add(new Date(2027, 05, 29), 1, 'year');
~~~


[Изменение шага оси Y](https://docs.dhtmlx.com/scheduler/samples/02_customization/09_timestep.html)

:::note 
Полный список методов форматирования даты см. [здесь](api/other/date.md). 
:::