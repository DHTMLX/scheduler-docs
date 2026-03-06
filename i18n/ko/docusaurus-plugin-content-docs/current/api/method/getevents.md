---
sidebar_label: "getEvents"
title: "getEvents method"
description: "지정된 기간 내에 발생하는 이벤트 컬렉션을 반환합니다."
---

# getEvents

### Description

@short: 지정된 기간 내에 발생하는 이벤트 컬렉션을 반환합니다.

@signature: getEvents: (from?: Date, to?: Date) =\> any[]

### Parameters

- `from` - (optional) *Date* - 기간의 시작 날짜
- `to` - (optional) *Date* - 기간의 종료 날짜

### Returns
- ` array` - (array) - 이벤트 객체들의 배열

### Example

~~~jsx
const evs = scheduler.getEvents(new Date(2024,1,10),new Date(2024,2,10)); 
evs.forEach((e) => console.log(e.text));
// 또는
const evs = scheduler.getEvents();// 모든 이벤트를 반환합니다.
~~~

### Related samples
- [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)
- [Highlighted timespans in Month view](https://docs.dhtmlx.com/scheduler/samples/09_api/07_highlighted_timespans_month_view.html)

### Details

[반복 이벤트](guides/recurring-events.md) 지원이 활성화된 경우, **getEvents** 메서드의 동작은 "from-to" 파라미터 포함 여부에 따라 달라집니다.

#### 반복 이벤트와 함께 getEvents 사용하기

- **from-to** 파라미터가 지정되면, 해당 범위 내의 단일 이벤트, 반복 시리즈의 발생 이벤트, 그리고 수정된 인스턴스들을 모두 반환합니다:
~~~js
const today = scheduler.date.day_start(new Date());
const nextWeek = scheduler.date.add(today, 1, "week");
const events = scheduler.getEvents(today, nextWeek);
~~~

- **from-to** 파라미터가 생략되면, 단일 이벤트, 반복 시리즈(개별 발생 이벤트가 아닌 항목으로), 수정되거나 삭제된 인스턴스들을 모두 반환하지만, 반복 발생 이벤트의 구체적인 날짜는 포함하지 않습니다.

:::note
 v7.1.2 이전 버전에서는 반복 이벤트가 활성화된 경우 "from-to" 파라미터가 필수였습니다. 파라미터가 없으면 반복 확장이 무한한 이벤트 시퀀스를 생성할 수 있어 모든 발생 이벤트를 반환하는 것이 비현실적이기 때문에 빈 배열을 반환했습니다. 
:::

반복 이벤트가 비활성화된 경우, 파라미터 제공 여부에 관계없이 메서드는 동일하게 동작하며, 파라미터가 없으면 모든 이벤트를 반환합니다.

### Change log
- v7.1.2에서 업데이트됨
