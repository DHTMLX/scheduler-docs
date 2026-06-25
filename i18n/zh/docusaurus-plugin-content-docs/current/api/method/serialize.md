---
sidebar_label: "serialize"
title: "serialize method"
description: "序列化当前加载在scheduler中的所有事件"
---

# serialize

### Description

@short: 序列化当前加载在scheduler中的所有事件

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

此方法返回一个数组，包含当前加载到Scheduler中的所有事件。

结果数组中不包含由[반복 이벤트](guides/recurring-events.md)扩展创建的任何临时记录。

返回对象中以`_`或`$`开头的属性会被省略，所有`Date`类型的属性会使用[format_date](api/template/format_date.md)模板转换为字符串。

### Related API
- [format_date](api/template/format_date.md)

### Change log
- 版本 6.0 中添加
