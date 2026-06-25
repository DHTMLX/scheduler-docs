---
sidebar_label: init
title: "init 메서드"
description: "dhtmlxScheduler 객체의 생성자"
---

# 초기화

### Description

@short: dhtmlxScheduler 객체의 생성자

@signature: init: (container: string|HTMLElement, date?: Date, view?: string) =\> void

### Parameters

- `container` - (required) *string | HTMLElement* - dhtmlxScheduler 객체가 초기화될 HTML 컨테이너(또는 그 ID)
- `date` - (optional) *Date* - 스케줄러의 초기 날짜(기본값은 현재 날짜)
- `view` - (optional) *string* - 초기 뷰의 이름(기본값은 "week")

### Example

~~~jsx
scheduler.init("scheduler_here", new Date(2027, 0, 6), "month");
~~~

### Related samples
- [Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)
- [Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)