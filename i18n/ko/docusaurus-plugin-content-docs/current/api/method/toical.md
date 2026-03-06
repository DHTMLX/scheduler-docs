---
sidebar_label: "toICal"
title: "toICal method"
description: "스케줄러 데이터를 ICal 포맷으로 변환합니다."
---

# toICal

### Description

@short: 스케줄러 데이터를 ICal 포맷으로 변환합니다.

@signature: toICal: (header?: string) =\> string

### Parameters

- `header` - (optional) *string* - 컨텐츠의 헤더 필드 값을 설정합니다.

### Returns
- ` string` - (string) - ICal 포맷으로 된 데이터를 포함하는 문자열을 반환합니다.

### Example

~~~jsx
var str = scheduler.toICal();
//또는
var str = scheduler.toICal("My calendar");
~~~

### Related samples
- [Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)

### Details

:::note
 이 메서드를 사용하려면 [serialize](guides/extensions-list.md#serialize) 플러그인이 활성화되어 있어야 합니다. 
:::

:::note

커스텀 속성은 지원되지 않습니다.
 
:::

### Related Guides
- ["데이터 직렬화: XML, JSON, iCal"](export/serialization.md)
