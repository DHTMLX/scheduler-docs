---
sidebar_label: "now_date"
title: "now_date config"
description: "Limit 확장 기능에서 현재 시간 표시기의 날짜를 설정합니다 (- mark_now 설정을 통해 활성화됨)"
---

# now_date

### Description

@short: Limit 확장 기능에서 현재 시간 표시기의 날짜를 설정합니다 (- mark_now 설정을 통해 활성화됨)

@signature: now_date: Date

### Example

~~~jsx
scheduler.config.now_date = new Date(2027, 7, 5);
...
scheduler.init('scheduler_here', new Date(2027, 7, 5), "week");
~~~

### Details

:::note
 이 속성은 [limit](guides/extensions-list.md#limit) 플러그인이 활성화된 경우에만 작동합니다. 
:::

이 옵션은 [Limit 확장 기능](guides/limits.md)과 함께 사용됩니다.

### Related API
- [mark_now](api/config/mark_now.md)

### Related Guides
- ["Blocking and Marking Dates"](guides/limits.md)
