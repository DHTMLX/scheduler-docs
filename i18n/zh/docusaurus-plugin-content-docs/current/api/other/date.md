---
sidebar_label: "date"
title: "date config"
description: "一组用于格式化和操作日期的方法集合"
---

# date

### Description

@short: 一组用于格式化和操作日期的方法集合

@signature: date: SchedulerDateHelpers

### Details

**date** 对象包含多个实用方法:

- **add**(date, number, unit) - 通过添加或减少指定的时间单位来调整日期
    - **date** - (<i>Date</i>) 要修改的日期对象
    - **number** - (<i>number</i>) 要添加的时间单位数量；正数表示增加时间，负数表示减少时间
    - **unit** - (<i>'minute', 'hour', 'day', 'week', 'month', 'year'</i>) 时间单位

~~~js
// 给指定日期加1年：2027年6月29日 -> 2028年6月29日
const newDate = scheduler.date.add(new Date(2027, 05, 29), 1, 'year');
~~~

- **convert_to_utc**(date) - 将本地时间转换为对应的UTC时间
    - **date** - (<i>Date</i>) 要转换的日期对象
  
~~~js
// 2027年6月29日14:00（本地时间） -> 2027年6月29日12:00（UTC）
const time = scheduler.date.convert_to_utc(new Date(2027, 05, 29, 14, 00));
~~~

- **copy**(date) - 创建一个日期对象的副本
    - **date** - (<i>Date</i>) 要复制的日期对象
  
~~~js
const copy = scheduler.date.copy(new Date(2027, 05, 29)); // -> 2027年6月29日
~~~
  
- **date_part**(date) - 将日期的时间部分重置为00:00:00
    - **date** - (<i>Date</i>) 要修改的日期对象
  
~~~js
// 2027年6月29日14:30:10 -> 2027年6月29日00:00:00
const date = scheduler.date.date_part(new Date(2027, 05, 29, 14, 30, 10));
~~~
  
- **date_to_str**(format, utc) - 返回一个函数，该函数将Date对象转换为指定格式的字符串
       - **format** - (<i>string</i>) 期望的日期格式（参见 [날짜 형식 지정](guides/settings-format.md)）  
       - **utc** - (<i>boolean</i>) 是否将本地时间转换为UTC时间  
  
~~~js
const formatFunc = scheduler.date.date_to_str("%d/%m/%Y");
const date = formatFunc(new Date(2027, 05, 29)); // -> "29/06/2027"
~~~
  
- **day_start**(date) - 将日期的时间部分重置为00:00:00；这是 <b>date_part</b> 方法的别名。该方法用于Day视图中设置显示日期，可根据需要自定义
      - **date** - (<i>Date</i>) 要修改的日期对象

~~~js
// 2027年6月29日14:30:10 -> 2027年6月29日00:00:00
const date = scheduler.date.day_start(new Date(2027, 05, 29, 14, 30, 10));
~~~

>**注意**，此方法会修改传入的日期对象。若要避免修改原始日期，请在传入前用 *new Date* 包裹。例如:

~~~js
const date1 = new Date(2027, 05, 29, 14, 30, 10);
const date2 = scheduler.date.day_start(new Date(date1));
~~~

- **getISOWeek**(date) - 返回给定日期的ISO周数
    - **date** - (<i>Date</i>) 要计算的日期对象

~~~js
const week = scheduler.date.getISOWeek(new Date(2027, 05, 29)); // -> 26
~~~

- **getUTCISOWeek**(date) - 在将日期转换为UTC后，返回该日期的ISO周数
    - **date** - (<i>Date</i>) 要计算的日期对象

~~~js
const week = scheduler.date.getUTCISOWeek(new Date(2027, 05, 29)); // -> 26
~~~

- **month_start**(date) - 返回一个新的Date对象，表示该日期所在月份的第一天，时间部分重置为00:00:00
    - **date** - (<i>Date</i>) 要处理的日期对象
  
~~~js
// 2027年6月29日14:30 -> 2027年6月1日00:00
const firstDay = scheduler.date.month_start(new Date(2027, 05, 29, 14, 30));
~~~

- <span id="strtodate">**str_to_date**(format, utc, parseExact)</span> - 返回一个函数，该函数将指定格式的日期字符串转换为Date对象
      - **format** - (<i>string</i>) 日期格式（参见 [날짜 형식 지정](guides/settings-format.md)）  
      - **utc** - (<i>boolean</i>) 是否将本地时间转换为UTC时间  
      - **parseExact** - (<i>boolean</i>) 指定Scheduler是否自动检测日期格式（默认*false*）或严格使用提供的格式（*true*）
~~~js
const formatFunc = scheduler.date.str_to_date("%d/%m/%Y");
const date = formatFunc("29/06/2027"); // -> 2027年6月29日00:00:00
~~~

- **time_part**(date) - 返回Date对象的时间部分，表示为自午夜（00:00:00）起的秒数
    - **date** - (<i>Date</i>) 要计算的日期对象
~~~js
const time = scheduler.date.time_part(new Date(2027, 05, 29, 14, 30, 10));
//time -> 52210
~~~

- **to_fixed**(num) - 对小于10的数字添加前导零，返回字符串；10及以上数字保持不变
    - **num** - (<i>number</i>) 要格式化的数字

~~~js
const num1 = scheduler.date.to_fixed(2);  // -> "02"
const num2 = scheduler.date.to_fixed(10); // -> 10
~~~
  
- **week_start**(date) - 返回一个Date对象，表示给定日期所在周的第一天，时间部分重置为00:00:00
    - **date** - (<i>Date</i>) 要处理的日期对象

~~~js
// 2027年6月29日14:30 -> 2027年6月24日00:00
const weekStart = scheduler.date.week_start(new Date(2027, 05, 29, 14, 30));
~~~
  
- **year_start**(date) - 返回一个Date对象，表示给定日期所在年份的第一天，时间部分重置为00:00:00
    - **date** - (<i>Date</i>) 要处理的日期对象
  
~~~js
// 2027年6月29日14:30 -> 2027年1月1日00:00
const yearStart = scheduler.date.year_start(new Date(2027, 05, 29, 14, 30));
~~~
