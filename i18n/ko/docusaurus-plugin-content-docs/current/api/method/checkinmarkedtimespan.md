---
sidebar_label: "checkInMarkedTimespan"
title: "checkInMarkedTimespan method"
description: "특정 타입의 타임스팬 내에 이벤트가 포함되는지 여부를 결정합니다"
---

# checkInMarkedTimespan

### Description

@short: 특정 타입의 타임스팬 내에 이벤트가 포함되는지 여부를 결정합니다

@signature: checkInMarkedTimespan: (event: any, timespan: string) =\> boolean

### Parameters

- `event` - (required) *object* - 이벤트 객체    
- `timespan` - (required) *string* - 타임스팬의 타입

### Returns
- `isIn` - (boolean) - <i>true</i> 이벤트가 지정된 타임스팬 타입 내에 발생하는 경우

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
 이 메서드는 [limit](guides/extensions-list.md#limit) 플러그인이 활성화되어 있어야 합니다. 
:::
