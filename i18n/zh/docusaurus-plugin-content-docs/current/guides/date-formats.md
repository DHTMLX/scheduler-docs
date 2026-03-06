---
title: "日期操作"
sidebar_label: "日期操作"
---

# 日期操作

该库包含 [date](api/other/date.md) 对象，提供了多种日期格式化方法。

本文介绍了一些最重要且常用的方法。完整的方法列表可参见 [date object page](api/other/date.md)。

## 将 Date 对象转换为字符串

要将 Date 对象转换为字符串，可使用 [date_to_str](api/other/date.md) 方法:


*该方法返回一个函数，根据指定的格式模式将 Date 对象格式化为字符串:*
~~~js
var formatFunc = scheduler.date.date_to_str("%d/%m/%Y");
var date = formatFunc(new Date(2013, 05, 29)); // -> "29/06/2013"
~~~


[Displaying several weeks in Week view](https://docs.dhtmlx.com/scheduler/samples/11_scales/03_two_work_weeks.html)


## 将字符串转换为 Date 对象

要将字符串转换为 Date 对象，可使用 [str_to_date](api/other/date.md) 方法:


*该方法提供一个函数，按指定的格式解析字符串并返回 Date 对象:*

你可以像这样创建一个日期解析函数:

~~~js
var formatFunc = scheduler.date.str_to_date("%d/%m/%Y");
var date = formatFunc("29/06/2019"); // -> 2019年6月29日 00:00:00
~~~

## 转换为 UTC

要将本地日期和时间转换为 UTC，可使用 [convert_to_utc](api/other/date.md) 方法:

~~~js
//2019年6月29日 14:00（本地时间）-> 2019年6月29日 12:00（UTC）
var time = scheduler.date.convert_to_utc(new Date(2019, 05, 29, 14, 00));
~~~

## 为日期添加（或减少）时间间隔

要为指定日期添加或减少时间间隔，可使用 [add](api/other/date.md) 方法:

~~~js
//为指定日期添加1年：2019年6月29日 -> 2020年6月29日
var newDate = scheduler.date.add(new Date(2019, 05, 29), 1, 'year');
~~~


[Changing the Y-Axis step](https://docs.dhtmlx.com/scheduler/samples/02_customization/09_timestep.html)


:::note
如需完整的日期格式化方法列表，请参见 [here](api/other/date.md)。
:::
