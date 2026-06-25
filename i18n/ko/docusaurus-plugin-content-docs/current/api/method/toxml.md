---
sidebar_label: "toXML"
title: "toXML method"
description: "스케줄러의 데이터를 XML 포맷으로 변환합니다"
---

# toXML

### Description

@short: 스케줄러의 데이터를 XML 포맷으로 변환합니다

@signature: toXML: () =\> string

### Returns
- ` string` - (string) - 데이터를 XML 형식으로 담은 문자열을 반환합니다

### Example

~~~jsx
const str = scheduler.toXML();
~~~

### Related samples
- [Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)

### Details

:::note
 이 메서드는 [serialize](guides/extensions-list.md#serialize) 플러그인이 활성화되어 있어야 작동합니다. 
:::

- 필요에 따라 사용자 정의 속성은 [설정할 수 있습니다](export/serialization.md).
- 이 메서드는 반복 이벤트에도 사용할 수 있습니다.
