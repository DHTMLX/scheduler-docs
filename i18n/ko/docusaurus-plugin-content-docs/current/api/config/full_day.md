---
sidebar_label: "full_day"
title: "full_day config"
description: "이벤트를 하루 종일 지속되도록 설정할 수 있습니다."
---

# full_day

### Description

@short: 이벤트를 하루 종일 지속되도록 설정할 수 있습니다.

@signature: full_day: boolean

### Example

~~~jsx
scheduler.config.full_day = true;
...
scheduler.init('scheduler_here', new Date(2013, 7, 5), "week");
~~~

**Default value:** false

### Related samples
- [Full day events](https://docs.dhtmlx.com/scheduler/samples/02_customization/12_full_day_event.html)

### Details

이 옵션이 활성화되어 있을 때(*true*), 라이트박스에서 시간 선택 필드가 비활성화되며, 이벤트 기간이 자동으로 선택한 날짜의 **00:00**부터 다음 날 **00:00**까지 하루 전체로 설정됩니다.

### Change log
- 버전 2.3에 추가됨
