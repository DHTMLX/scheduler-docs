---
title: "주간 보기"
sidebar_label: "주간 보기"
---

# 주간 보기

주간 보기는 한 번에 한 주 또는 여러 주를 표시합니다.

![week_view](/img/week_view.png)


## 초기화

주간 보기는 [기본 스케줄러 마크업](guides/scheduler-markup.md)에 기본적으로 포함되어 있습니다. 따라서, 이 보기를 스케줄러에 추가하기 위해 별도의 코드를 작성할 필요가 없습니다.

~~~js
// 표준 초기화. 주간 보기는 자동으로 추가됩니다
scheduler.init('scheduler_here',new Date(2019,0,10),"week");
...
scheduler.load("/data/events");
~~~


[Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)


## 주간 보기 탭 제거하기

스케줄러에서 주간 보기 탭을 제거하려면, [스케줄러 마크업](guides/scheduler-markup.md)에서 해당 div를 삭제하면 됩니다:

~~~js
// 이 div를 제거하면 Week 탭이 사라집니다
<div class="dhx_cal_tab" name="week_tab"></div>
~~~


## 보기의 X축에서 요일 숨기기

특정 요일을 스케일에서 제외하고 싶다면, 예를 들어 평일만 남기고 주말을 건너뛰려면 **ignore_week()** 메서드를 사용하세요. 


이 메서드는 날짜를 받아서 숨기고 싶은 요일에 대해 *true*를 반환해야 합니다.

~~~js
// 0은 일요일, 6은 토요일입니다
scheduler.ignore_week = function(date){
    if (date.getDay() == 6 || date.getDay() == 0) // 토요일과 일요일을 숨깁니다
        return true;
};
~~~


[Hiding days in the scale of Week view](https://docs.dhtmlx.com/scheduler/samples/11_scales/02_week_ignore.html)


## 관련 가이드

- ["일반 설정 안내"](guides/configuration.md)
- ["주간 뷰 템플릿"](views/week-view-templates.md)
- ["데이터 불러오기"](guides/loading-data.md)
- ["이벤트 객체 작업"](guides/event-object-operations.md)
- ["Blocking and Marking Dates"](guides/limits.md)
- ["스킨(Skins)"](guides/skins.md)
