---
sidebar_label: "include_end_by"
title: "include_end_by config"
description: "'End by' 필드에 입력된 날짜를 배타적(exclusive)으로 처리할지 포함적(inclusive)으로 처리할지 설정합니다."
---

# include_end_by
:::warning
이 속성은 레거시 반복 이벤트 확장에서만 작동합니다.
:::
### Description

@short: 'End by' 필드에 입력된 날짜를 배타적(exclusive)으로 처리할지 포함적(inclusive)으로 처리할지 설정합니다.

@signature: include_end_by: boolean

### Example

~~~jsx
scheduler.config.include_end_by = true;
...
scheduler.init('scheduler_here', new Date(2027, 7, 5), "week");
~~~

**Default value:** false

### Details

:::note
 이 속성을 사용하려면 [recurring](guides/extensions-list.md#recurring) 확장을 활성화해야 합니다. 
:::

기본적으로 'End by' 필드의 날짜는 배타적으로 간주됩니다.

예를 들어, 사용자가 'End by' 필드에 '2027.01.15'를 설정한 경우:

- <code>include_end_by = false</code> (기본값) 일 때 - 반복 시리즈는 2027.01.14에 종료됩니다.
- <code>include_end_by = true</code> 일 때 - 반복 시리즈는 2027.01.15에 종료됩니다.

### 데이터베이스는 날짜를 어떻게 저장하나요?

스케줄러에서 선택된 모든 날짜는 시(hour)와 분(minute)까지 포함합니다. 따라서 어떤 날짜 선택기에서든 *2027.11.15*를 선택하면 *2027.11.15 00:00*으로 해석됩니다.

이는 반복 폼에서 'End by'를 선택할 때 시리즈 지속 기간에 영향을 미칩니다.

예를 들어, 사용자가 'End by' 필드에 *2027.11.15*를 입력하면:

- <code>include_end_by = false</code> (기본값) 일 때 - 시리즈 종료 날짜는 *2027.11.15 00:00*으로 저장되어, 마지막 가능한 이벤트는 *2027.11.14 23:59*까지 발생할 수 있으므로 선택한 날짜에는 이벤트가 없습니다.
- <code>include_end_by = true</code> 일 때 - 시리즈 종료 날짜는 *2027.11.16 00:00* (선택한 날짜 다음 날 자정)으로 저장되어, 선택한 날짜가 시리즈에 포함되고 마지막 이벤트는 *2027.11.15 23:59*까지 발생할 수 있습니다.

### Related API
- [repeat_date](api/config/repeat_date.md)

### Related Guides
- ["반복 이벤트"](guides/recurring-events.md)
