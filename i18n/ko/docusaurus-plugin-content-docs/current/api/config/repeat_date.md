---
sidebar_label: "repeat_date"
title: "repeat_date config"
description: "'recurring' 라이트박스 내 'End by' 필드에 사용되는 날짜 형식을 지정합니다."
---

# repeat_date

### Description

@short: 'recurring' 라이트박스 내 'End by' 필드에 사용되는 날짜 형식을 지정합니다.

@signature: repeat_date: string

### Example

~~~jsx
scheduler.config.repeat_date = "%m/%d/%Y";
...
scheduler.init('scheduler_here',new Date(2019,05,11),"month");
~~~

**Default value:** "%m.%d.%Y"

### Details

:::note
 이 속성은 [recurring](guides/extensions-list.md#recurring) 확장 기능이 활성화되어 있어야 사용 가능합니다. 
:::

기본적으로 'End by' 필드에 입력된 날짜는 제외 날짜로 처리됩니다.

### Related API
- [include_end_by](api/config/include_end_by.md)

### Related Guides
- ["반복 이벤트"](guides/recurring-events.md)
