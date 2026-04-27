---
sidebar_label: "init"
title: "init method"
description: "dhtmlxScheduler 인스턴스를 생성하는 생성자입니다."
---

# init

### Description

@short: DhtmlxScheduler 인스턴스를 생성하는 생성자입니다.

@signature: init: (container: string | HTMLElement, date?: Date, view?: string) =\> void

### Parameters

- `container` - (required) *string | HTMLElement* -              dhtmlxScheduler가 설정될 HTML 컨테이너(또는 그 ID)입니다.
- `date` - (optional) *Date* - 스케줄러의 시작 날짜입니다(기본값은 현재 날짜).
- `view` - (optional) *string* - 초기 뷰 모드입니다(기본값은 "week").

### Example

~~~jsx
scheduler.init("scheduler_here", new Date(2027,0,6), "month");
~~~

### Related samples
- [Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)
- [Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)
