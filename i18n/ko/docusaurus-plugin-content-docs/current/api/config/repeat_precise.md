---
sidebar_label: "repeat_precise"
title: "repeat_precise config"
description: "'weekly' 반복 설정 시 과거 날짜를 이벤트에 포함하지 않도록 합니다."
---

# repeat_precise

### Description

@short: 'weekly' 반복 설정 시 과거 날짜를 이벤트에 포함하지 않도록 합니다.

@signature: repeat_precise: boolean

### Example

~~~jsx
scheduler.config.repeat_precise = true;
~~~

**Default value:** false

### Details

:::note
 이 속성은 [recurring](guides/extensions-list.md#recurring) 확장이 활성화되어 있어야 합니다. 
:::

기본적으로 'weekly' 반복이 설정되면, 이벤트가 지정된 요일 이전, 사이, 이후에 생성되었더라도 
스케줄러는 현재 주를 반복에 포함시킵니다.<br>

예를 들어, 목요일에 이벤트가 생성되고 매주 월요일과 수요일에 반복하도록 설정된 경우, 
이미 지난 요일임에도 현재 주의 월요일과 수요일이 포함됩니다.

**repeat_precise** 옵션이 *true*로 설정되면, 반복 이벤트의 시작 날짜는 실제 첫 발생일이 되며, 
위 예시에서는 다음 주 월요일이 시작일이 됩니다.

### Related Guides
- ["반복 이벤트"](guides/recurring-events.md)
