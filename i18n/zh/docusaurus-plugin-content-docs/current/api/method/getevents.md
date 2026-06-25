---
sidebar_label: "getEvents"
title: "getEvents method"
description: "返回指定时间范围内发生的事件集合"
---

# getEvents

### Description

@short: 返回指定时间范围内发生的事件集合

@signature: getEvents: (from?: Date, to?: Date) =\> any[]

### Parameters

- `from` - (optional) *Date* - 期间的起始日期
- `to` - (optional) *Date* - 期间的结束日期

### Returns
- ` array` - (array) - 一个事件对象数组

### Example

~~~jsx
const evs = scheduler.getEvents(new Date(2027,1,10),new Date(2027,2,10)); 
evs.forEach((e) => console.log(e.text));
// 或者
const evs = scheduler.getEvents();// 返回所有事件
~~~

### Related samples
- [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)
- [Highlighted timespans in Month view](https://docs.dhtmlx.com/scheduler/samples/09_api/07_highlighted_timespans_month_view.html)

### Details

当启用[重复事件](guides/recurring-events.md)支持时，**getEvents** 方法的行为会根据是否包含"from-to"参数而有所不同。

#### 使用 getEvents 获取重复事件

- 当指定 **from-to** 参数时，方法返回该范围内的所有单次事件、重复系列的发生实例以及任何被修改的实例:
~~~js
const today = scheduler.date.day_start(new Date());
const nextWeek = scheduler.date.add(today, 1, "week");
const events = scheduler.getEvents(today, nextWeek);
~~~

- 如果省略 **from-to** 参数，方法返回所有单次事件、重复系列作为条目（而非单个发生实例），以及任何被修改或删除的实例。但不包含重复发生的具体日期。

:::note
 在 v7.1.2 之前的版本中，当重复事件处于激活状态时，**getEvents** 方法必须带有"from-to"参数。否则会返回空数组，因为重复扩展可能生成无限的事件序列，返回所有发生实例是不现实的。 
:::

如果未启用重复事件，无论是否提供参数，方法行为相同。若未提供参数，方法将返回所有事件。

### Change log
- 在 v7.1.2 中更新
