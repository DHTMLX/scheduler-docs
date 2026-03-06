---
title: "Операции с датами"
sidebar_label: "Операции с датами"
---

# Операции с датами

Библиотека содержит объект [date](api/other/date.md), который предоставляет различные методы форматирования дат.

В этой статье рассмотрены некоторые из самых важных и часто используемых методов. Полный список методов можно найти на [странице объекта date](api/other/date.md).

## Преобразование объекта Date в строку

Для преобразования объекта Date в строку используется метод [date_to_str](api/other/date.md): 

 
*Этот метод возвращает функцию, которая форматирует объект Date в строку согласно заданному шаблону:*
~~~js
var formatFunc = scheduler.date.date_to_str("%d/%m/%Y");
var date = formatFunc(new Date(2013, 05, 29)); // -> "29/06/2013"
~~~


[Displaying several weeks in Week view](https://docs.dhtmlx.com/scheduler/samples/11_scales/03_two_work_weeks.html)


## Преобразование строки в объект Date

Для преобразования строки в объект Date используется метод [str_to_date](api/other/date.md): 


*Этот метод предоставляет функцию, которая разбирает строку, отформатированную определённым образом, и возвращает объект Date:*

Вы можете создать функцию для разбора даты следующим образом:

~~~js
var formatFunc = scheduler.date.str_to_date("%d/%m/%Y");
var date = formatFunc("29/06/2019"); // -> 29 June, 2019 00:00:00
~~~

## Преобразование во время UTC

Для преобразования локальной даты и времени в UTC используйте метод [convert_to_utc](api/other/date.md):

~~~js
//29 June, 2019 14:00 (local time) -> 29 June, 2019 12:00 (utc)
var time = scheduler.date.convert_to_utc(new Date(2019, 05, 29, 14, 00));
~~~

## Добавление (вычитание) временного интервала к (из) даты

Для добавления или вычитания временного интервала из заданной даты можно воспользоваться методом [add](api/other/date.md):

~~~js
//добавляет 1 год к указанной дате: 29 June, 2019 -> 29 June, 2020
var newDate = scheduler.date.add(new Date(2019, 05, 29), 1, 'year');
~~~


[Changing the Y-Axis step](https://docs.dhtmlx.com/scheduler/samples/02_customization/09_timestep.html)


:::note
Полный список методов форматирования дат смотрите [здесь](api/other/date.md).
:::
