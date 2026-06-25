---
sidebar_label: "toJSON"
title: "toJSON method"
description: "스케줄러의 데이터를 JSON 형식의 문자열로 변환합니다."
---

# toJSON

### Description

@short: 스케줄러의 데이터를 JSON 형식의 문자열로 변환합니다.

@signature: toJSON: () =\> string

### Returns
- `string` - (string) - JSON 형식의 데이터를 포함하는 문자열

### Example

~~~jsx
const str = scheduler.toJSON();
~~~

### Related samples
- [Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)

### Details

:::note
 이 메서드는 [serialize](guides/extensions-list.md#serialize) 플러그인이 활성화되어 있어야 합니다. 
:::

필요한 경우 [사용자 정의 속성](export/serialization.md)을 구성할 수 있습니다.

### Related Guides
- ["데이터 직렬화: XML, JSON, iCal"](export/serialization.md)
