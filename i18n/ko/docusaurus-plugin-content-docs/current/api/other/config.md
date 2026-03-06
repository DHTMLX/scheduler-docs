---
sidebar_label: "config"
title: "config config"
description: "날짜, 스케일, 컨트롤에 대한 설정 옵션을 정의합니다"
---

# config

### Description

@short: 날짜, 스케일, 컨트롤에 대한 설정 옵션을 정의합니다

@signature: config: SchedulerConfigOptions

### Example

~~~jsx
// Y축 항목의 포맷을 설정합니다
scheduler.config.hour_date = "%H:%i:%s";
...
scheduler.init('scheduler_here', new Date(2013, 7, 5), "month");
~~~

### Details

**config** 객체의 속성들은 메인 API 페이지의 전용 섹션 [Scheduler API: Properties](api/overview/properties_overview.md)에서 자세히 다루고 있습니다.
