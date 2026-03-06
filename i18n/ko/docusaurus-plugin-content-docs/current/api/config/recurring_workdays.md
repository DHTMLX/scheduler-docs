---
sidebar_label: "recurring_workdays"
title: "recurring_workdays config"
description: "'Every workday' 옵션이 라이트박스에서 선택되었을 때 반복 이벤트에 대해 어떤 요일이 근무일로 간주되는지를 정의합니다."
---

# recurring_workdays

### Description

@short: "Every workday" 옵션이 라이트박스에서 선택되었을 때 반복 이벤트에 대해 어떤 요일이 근무일로 간주되는지를 정의합니다.

@signature: recurring_workdays: any[]

### Example

~~~jsx
//화요일부터 금요일까지 근무일 설정
scheduler.config.recurring_workdays = [2, 3, 4, 5];
~~~

**Default value:** [1, 2, 3, 4, 5]

### Details

:::note
 이 설정을 사용하려면 [recurring](guides/extensions-list.md#recurring) 확장 기능이 활성화되어 있어야 합니다. 
:::

![recurringworkdays_config](/img/recurringworkdays_config.png)
