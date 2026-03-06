---
sidebar_label: "templates"
title: "templates config"
description: "스케줄러 내 날짜, 제목, tooltip 등에 사용되는 templates의 포맷 스타일을 설정합니다."
---

# templates

### Description

@short: 스케줄러 내 날짜, 제목, tooltip 등에 사용되는 templates의 포맷 스타일을 설정합니다.

@signature: templates: SchedulerTemplates

### Example

~~~jsx
// Day 및 Units 뷰의 헤더에 표시되는 날짜 형식을 설정합니다.
scheduler.templates.day_date = function(date){
    return scheduler.date.date_to_str(scheduler.config.default_date);
};
~~~

### Details

**templates** 객체의 속성에 대한 자세한 내용은 메인 API 페이지의 전용 섹션 <br> ['Scheduler API: Templates'](api/overview/templates_overview.md)에서 확인할 수 있습니다.
