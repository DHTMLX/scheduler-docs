---
sidebar_label: "checkInMarkedTimespan"
title: "checkInMarkedTimespan method"
description: "判断一个事件是否落在指定类型的时间段内"
---

# checkInMarkedTimespan

### Description

@short: 判断一个事件是否落在指定类型的时间段内

@signature: checkInMarkedTimespan: (event: any, timespan: string) =\> boolean

### Parameters

- `event` - (required) *object* - 事件对象    
- `timespan` - (required) *string* - 时间段的类型

### Returns
- `isIn` - (boolean) - <i>true</i> 如果事件发生在指定的时间段类型内

### Example

~~~jsx
scheduler.addMarkedTimespan({
    start_date: new Date(2027,4,1), 
    end_date: new Date(2027,7,1), 
    css: "red_section",
    type:"discount"
});

const eventId = scheduler.addEvent({
    start_date: "16-05-2027 09:00",
    end_date:   "16-05-2027 12:00",
    text:   "Meeting",
    holder: "John", 
    room:   "5"     
})
...
scheduler.checkInMarkedTimespan(scheduler.getEvent(eventId), "discount"); //->true
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 此方法需要启用 [limit](guides/extensions-list.md#limit) 插件。 
:::
