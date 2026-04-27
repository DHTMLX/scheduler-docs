---
title: "Operations with Dates"
sidebar_label: "Operations with Dates"
---

# Operations with Dates

The library includes the [date](api/other/date.md) object that provides a set of date formatting methods.

In this article we will consider the particularly important and commonly used methods. A full list of methods you can find at the [date object page](api/other/date.md).


## Converting a Date object to a string

To convert a Date object to a string, use the [date_to_str](api/other/date.md) method: 

 
*The method returns a function that converts a Date object to a string of the specified format:*
~~~js
const formatFunc = scheduler.date.date_to_str("%d/%m/%Y");
const date = formatFunc(new Date(2027, 05, 29)); // -> "29/06/2027"
~~~


[Displaying several weeks in Week view](https://docs.dhtmlx.com/scheduler/samples/11_scales/03_two_work_weeks.html)

## Converting a string to a Date object

To convert a string to a Date object, use the [str_to_date](api/other/date.md) method: 

 
*The method returns a function that converts a string of the specified format to a Date object:*


You can generate a date convert function as follows:

~~~js
const formatFunc = scheduler.date.str_to_date("%d/%m/%Y");
const date = formatFunc("29/06/2027"); // -> 29 June, 2027 00:00:00
~~~


## Converting to UTC

To convert local time to UTC, use the [convert_to_utc](api/other/date.md) method:

~~~js
//29 June, 2027 14:00 (local time) -> 29 June, 2027 12:00 (utc)
const time = scheduler.date.convert_to_utc(new Date(2027, 05, 29, 14, 00));
~~~

## Adding(subtracting) a time interval to(from) a date

To add(subtract) a time interval to(from) the specified date, use the [add](api/other/date.md) method:

~~~js
//adds 1 year to the specified date: 29 June, 2027 -> 29 June, 2020
const newDate = scheduler.date.add(new Date(2027, 05, 29), 1, 'year');
~~~


[Changing the Y-Axis step](https://docs.dhtmlx.com/scheduler/samples/02_customization/09_timestep.html)


:::note
A full list of date formatting methods see [here](api/other/date.md).
:::
