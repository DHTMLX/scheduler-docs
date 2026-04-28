---
title: "日期操作"
sidebar_label: "日期操作"
---

# 日期操作

本库包含 [date](api/other/date.md) 对象，提供一组日期格式化方法。

在本文中，我们将重点介绍一些特别重要且常用的方法。完整的方法列表可以在 [date 对象页面](api/other/date.md) 找到。

## 将 Date 对象转换为字符串

要将 Date 对象转换为字符串，请使用 [date_to_str](api/other/date.md) 方法：

 
*该方法返回一个将 Date 对象转换为指定格式字符串的函数：*
~~~js
const formatFunc = scheduler.date.date_to_str("%d/%m/%Y");
const date = formatFunc(new Date(2027, 05, 29)); // -> "29/06/2027"
~~~

[在周视图中显示多周](https://docs.dhtmlx.com/scheduler/samples/11_scales/03_two_work_weeks.html)

## 将字符串转换为 Date 对象

要将字符串转换为 Date 对象，请使用 [str_to_date](api/other/date.md) 方法： 

 
*该方法返回一个将指定格式的字符串转换为 Date 对象的函数：*

你可以按以下方式生成日期转换函数：

~~~js
const formatFunc = scheduler.date.str_to_date("%d/%m/%Y");
const date = formatFunc("29/06/2027"); // -> 29 June, 2027 00:00:00
~~~


## 转换为 UTC

要将本地时间转换为 UTC，请使用 [convert_to_utc](api/other/date.md) 方法：

~~~js
//29 June, 2027 14:00 (local time) -> 29 June, 2027 12:00 (utc)
const time = scheduler.date.convert_to_utc(new Date(2027, 05, 29, 14, 00));
~~~


## 向日期添加（或减少）时间间隔

要向指定日期添加（或减少）时间间隔，请使用 [add](api/other/date.md) 方法：

~~~js
//为指定日期添加1年：2027年6月29日 -> 2028年6月29日
const newDate = scheduler.date.add(new Date(2027, 05, 29), 1, 'year');
~~~


[更改 Y 轴步长](https://docs.dhtmlx.com/scheduler/samples/02_customization/09_timestep.html)


:::note
完整的日期格式化方法列表，请参见 [此处](api/other/date.md)。
:::