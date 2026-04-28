---
sidebar_label: date
title: "date config"
description: "a set of date formatting methods"
---

# 日期

### Description

@short: 一组日期格式化方法

@signature: date: SchedulerDateHelpers


### Details

`date` 对象提供以下方法：

- `add()` - 向日期添加/从日期中减去指定的时间区间
    - `date` - (<i>Date</i>) 需要添加时间/减去时间的日期对象
    - `number` - (<i>number</i>) 要添加的单位数量。若此数字为正，时间将被添加到日期；若为负，则从日期中减去时间
    - `unit` - (<i>'minute', 'hour', 'day', 'week', 'month', 'year'</i>) 时间单位

~~~js
// 给指定日期加上 1 年: 2027-06-29 -> 2028-06-29
const newDate = scheduler.date.add(new Date(2027, 5, 29), 1, 'year');
~~~

- `convert_to_utc()` - 将本地时间转换为 UTC
    - `date` - (<i>Date</i>) 需要转换的日期对象
  
~~~js
// 2027-06-29 14:00（本地时间） -> 2027-06-29 12:00（UTC）
const time = scheduler.date.convert_to_utc(new Date(2027, 5, 29, 14, 0));
~~~

- `copy()` - 复制一个 Date 对象
    - `date` - (<i>Date</i>) 要复制的日期对象
  
~~~js
const copy = scheduler.date.copy(new Date(2027, 5, 29)); // -> 2027-06-29
~~~
  
- `date_part()` - 将提供日期的时间部分重置为 00:00:00
    - `date` - (<i>Date</i>) 要格式化的日期对象
  
~~~js
// 2027-06-29 14:30:10 -> 2027-06-29 00:00:00
const date = scheduler.date.date_part(new Date(2027, 5, 29, 14, 30, 10));
~~~
  
- `date_to_str()` - 返回一个函数，将 Date 对象转换为指定格式的字符串
参数: `format` - (<i>string</i>) 日期格式（见 [Date Format Specification](guides/settings-format.md)）  
`utc` - (<i>boolean</i>) 指定是否将本地时间转换为 UTC
  
~~~js
const formatFunc = scheduler.date.date_to_str("%d/%m/%Y");
const date = formatFunc(new Date(2027, 5, 29)); // -> "29/06/2027"
~~~
  
- `day_start()` - 将提供日期的时间部分重置为 00:00:00。是 `date_part()` 方法的别名。Day 视图用于设置显示日期，并且可以被重新定义以提供默认行为
参数: `date` - (<i>Date</i>) 要格式化的日期对象

~~~js
// 2027-06-29 14:30:10 -> 2027-06-29 00:00:00
const date = scheduler.date.day_start(new Date(2027, 5, 29, 14, 30, 10));
~~~

> **注**，传入给方法的日期实际会被修改。若要防止原始日期被修改，可以用 `new Date()` 包装输入日期。例如：

~~~js
const originalDate = new Date(2027, 5, 29, 14, 30, 10);
const dayStartDate = scheduler.date.day_start(new Date(originalDate));
~~~

- `getISOWeek()` - 返回日期的周数
    - `date` - (<i>Date</i>) 要格式化的日期对象

~~~js
const week = scheduler.date.getISOWeek(new Date(2027, 5, 29)); // -> 26
~~~

- `getUTCISOWeek()` - 返回日期的周数，但先将本地时间转换为 UTC
    - `date` - (<i>Date</i>) 要格式化的日期对象

~~~js
const week = scheduler.date.getUTCISOWeek(new Date(2027, 5, 29)); // -> 26
~~~

- `month_start()` - 返回指定日期所在月份的第一天的 Date 对象，并将时间部分清零
    - `date` - (<i>Date</i>) 要格式化的日期对象
  
~~~js
// 2027-06-29 14:30 -> 2027-06-01 00:00
const firstDay = scheduler.date.month_start(new Date(2027, 5, 29, 14, 30));
~~~

<span id="strtodate"></span>
- `str_to_date()` - 返回一个函数，将指定格式的字符串转换为 Date 对象
参数: `format` - (<i>string</i>) 日期格式（见 [Date Format Specification](guides/settings-format.md)）  
`utc` - (<i>boolean</i>) 指定是否将本地时间转换为 UTC  
`parseExact` - (<i>boolean</i>) 定义 Scheduler 是否自动识别日期格式（*false*，默认）还是使用用户传入的格式（*true*）

~~~js
const formatFunc = scheduler.date.str_to_date("%d/%m/%Y");
const date = formatFunc("29/06/2027"); // -> 2027-06-29 00:00:00
~~~

- `time_part()` - 以自午夜 (00:00:00) 起的秒数返回 Date 对象的时间部分
    - `date` - (<i>Date</i>) 要格式化的日期对象
~~~js
const time = scheduler.date.time_part(new Date(2027, 5, 29, 14, 30, 10));
// time -> 52210
~~~

- `to_fixed()` - 给小于 10 的数字添加前导零，并将结果作为字符串返回。对大于等于 10 的数字不做处理
    - `num` - (<i>number</i>) 要格式化的数字

~~~js
const num1 = scheduler.date.to_fixed(2); // -> "02"
const num2 = scheduler.date.to_fixed(10); // -> 10
~~~
  
- `week_start()` - 返回指定日期所在周的第一天的 Date 对象，并将时间部分清零
    - `date` - (<i>Date</i>) 要格式化的日期对象

~~~js
// 2027-06-29 14:30 -> 2027-06-28 00:00
const weekStart = scheduler.date.week_start(new Date(2027, 5, 29, 14, 30));
~~~
  
- `year_start()` - 返回指定日期所在年份的第一天的 Date 对象，并将时间部分清零
    - `date` - (<i>Date</i>) 要格式化的日期对象
  
~~~js
// 2027-06-29 14:30 -> 2027-01-01 00:00
const yearStart = scheduler.date.year_start(new Date(2027, 5, 29, 14, 30));
~~~