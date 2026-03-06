---
sidebar_label: "recurring_overflow_instances"
title: "recurring_overflow_instances config"
description: "다음 달로 넘어가는 반복 이벤트 처리 방식을 제어합니다"
---

# recurring_overflow_instances
:::warning
이 속성은 레거시 반복 이벤트 확장에서만 작동합니다.
:::
### Description

@short: 다음 달로 넘어가는 반복 이벤트 처리 방식을 제어합니다

@signature: recurring_overflow_instances: string

### Example

~~~jsx
scheduler.config.recurring_overflow_instances = "lastDay";
~~~

**Default value:** undefined

### Details

:::note
 이 속성을 사용하려면 [recurring](guides/extensions-list.md#recurring) 확장이 활성화되어 있어야 합니다. 
:::

매월 30일에 예약된 이벤트가 2월에 어떻게 동작하는지 각 설정별로 살펴보겠습니다:

- **"skip"** - 존재하지 않는 날짜의 이벤트는 건너뜁니다. *따라서 2월에는 이벤트가 발생하지 않습니다.* 
- **"lastDay"** - 존재하지 않는 날짜의 이벤트가 해당 월의 마지막 날로 이동합니다. *이 경우 2월 28일에 이벤트가 발생합니다.*
- **"none"** - 존재하지 않는 날짜의 이벤트가 다음 달 1일로 이동합니다. *여기서는 이벤트가 3월 1일에 발생합니다.*

옵션이 지정되지 않으면 기본 동작은 "skip"입니다.

### Change log
- v5.3.11에 추가됨
