---
title: "Day View"
sidebar_label: "Day View"
---

# Day View

Day View는 한 날의 일정을 보여주는 뷰입니다.

![day_view](/img/day_view.png)


## 초기화

Day View는 [기본 스케줄러 마크업](guides/scheduler-markup.md)에 기본적으로 포함되어 있습니다. 따라서 이 뷰를 스케줄러에서 사용하기 위해 별도의 코드를 추가할 필요가 없습니다.

~~~js
//표준 초기화. Day View는 자동으로 포함됩니다.
scheduler.init('scheduler_here', new Date(2019,0,10), "week");
...
scheduler.load("/data/events");
~~~


[Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)


## Day View 탭 제거하기

스케줄러에서 Day View 탭을 제거하고 싶다면, [스케줄러 마크업](guides/scheduler-markup.md)에서 해당 div를 삭제하면 됩니다.

~~~js
//Day 탭을 숨기려면 이 div를 삭제하세요.
<div class="dhx_cal_tab" name="day_tab"></div>
~~~

## 관련 가이드

- ["일반 설정 안내"](guides/configuration.md)
- ["Day View Templates"](views/day-view-templates.md)
- ["데이터 불러오기"](guides/loading-data.md)
- ["이벤트 객체 작업"](guides/event-object-operations.md)
- ["Blocking and Marking Dates"](guides/limits.md)
- ["스킨(Skins)"](guides/skins.md)
