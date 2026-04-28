---
title: "스케줄러 간 드래그 앤 드롭"
sidebar_label: "스케줄러 간 드래그 앤 드롭"
---

# 스케줄러 간 드래그 앤 드롭

:::info
해당 기능은 Commercial(2021년 10월 6일 이후), Enterprise 및 Ultimate 라이선스에서만 사용할 수 있습니다.
:::


페이지에 [여러 스케줄러를 표시하는 경우](guides/multiple-per-page.md), 스케줄러 간의 드래그 앤 드롭 작업을 활성화할 수 있어 사용자가 한 스케줄러의 이벤트를 다른 스케줄러로 드래그하거나 그 반대 방향으로 이동시킬 수 있습니다.

스케줄러에 드래그 앤 드롭 지원을 활성화하려면 페이지에 **"drag_between"** 확장 기능을 포함시키면 됩니다:

[여러 스케줄러에 대한 드래그 앤 드롭 지원 활성화](Enabling drag-and-drop support for several schedulers)
~~~html
<script src="codebase/dhtmlxscheduler.js"></script>
<link rel="stylesheet" href="codebase/dhtmlxscheduler.css" type="text/css">

<script>
scheduler.plugins({
    drag_between: true
});

scheduler.init('scheduler_here',new Date(2027, 5, 30),"week");
scheduler.load("./data/units.xml");

scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2027, 5, 30),"week");
</script>
~~~

샘플 **"samples/20_multiple/06_drag_between_layout.html"** 는 [Scheduler PRO 패키지](https://dhtmlx.com/docs/products/dhtmlxScheduler/)에 포함되어 있습니다.

### 하나의 스케줄러로부터/로부터의 드래그 차단
스케줄러로부터 드래그 이벤트를 차단하려면 [drag_out](api/config/drag_out.md) 속성을 *false*로 설정합니다:

~~~js
scheduler.config.drag_out = false;//restrict dragging events from this scheduler /*!*/
scheduler.init('scheduler_here',new Date(2027, 5,30),"week");
scheduler.load("./data/units.xml");

scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2027, 5, 30),"week");
~~~


스케줄러로의 드래그 이벤트를 차단하려면 [drag_in](api/config/drag_in.md) 속성을 *false*로 설정합니다:

~~~js
scheduler.init('scheduler_here',new Date(2027, 5, 30),"week");
scheduler.load("./data/units.xml");


scheduler2.config.drag_in = false;//restrict dragging events to this scheduler /*!*/
scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2027, 5, 30),"week");
~~~

샘플 **"samples/20_multiple/06_drag_between_layout.html"** 은 [Scheduler PRO 패키지](https://dhtmlx.com/docs/products/dhtmlxScheduler/)에 포함되어 있습니다.

### 드래그 이벤트

- [onBeforeEventDragOut](api/event/onbeforeeventdragout.md) -  드래그된 이벤트가 스케줄러 밖으로 이동하기 전에 발생합니다
- [onEventDragOut](api/event/oneventdragout.md) -  드래그된 이벤트가 스케줄러 밖으로 이동할 때 발생합니다
- [onBeforeEventDragIn](api/event/onbeforeeventdragin.md) -  드래그된 이벤트가 스케줄러 위로 이동하기 전에 발생합니다
- [onEventDragIn](api/event/oneventdragin.md) -  드래그된 이벤트가 스케줄러 위로 이동할 때 발생합니다
- [onEventDropOut](api/event/oneventdropout.md) -  드래그된 이벤트가 스케줄러 영역 밖으로 드롭될 때 발생합니다