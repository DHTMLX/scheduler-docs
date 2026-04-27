---
sidebar_label: "occurrence_timestamp_in_utc"
title: "occurrence_timestamp_in_utc config"
description: "시간대 걱정 없이 반복 이벤트를 처리할 수 있게 해줍니다."
---

# occurrence_timestamp_in_utc

### Description

@short: 시간대 걱정 없이 반복 이벤트를 처리할 수 있게 해줍니다.

@signature: occurrence_timestamp_in_utc: boolean

### Example

~~~jsx
scheduler.config.occurrence_timestamp_in_utc = true;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Default value:** false

### Details

:::note
 이 속성을 사용하려면 [recurring](guides/extensions-list.md#recurring) 확장 기능이 활성화되어 있어야 합니다. 
:::

:::note

주의! 이 옵션은 아직 반복 이벤트가 없는 새 스케줄러에 적합합니다.
이미 반복 이벤트가 있는 스케줄러에 적용하면 문제가 발생할 수 있습니다.
 
:::
- 이 옵션을 활성화하면 이벤트 타임스탬프가 UNIX 시간으로 저장됩니다.
- 이 옵션은 버전 3.5부터 제공되고 있습니다.

### Related Guides
- ["반복 이벤트"](guides/recurring-events.md)
