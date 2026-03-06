---
title: "드래그 앤 드롭(Drag-and-Drop) 작업"
sidebar_label: "드래그 앤 드롭(Drag-and-Drop) 작업"
---

# 드래그 앤 드롭(Drag-and-Drop) 작업 

이 라이브러리에는 **outerdrag** 확장이 포함되어 있어, 외부 DHTMLX 컴포넌트나 다른 스케줄러에서 요소를 드래그하여 새로운 이벤트를 생성할 수 있습니다.

## 외부 컴포넌트에서 드래그하기 {#draggingfromexternalcomponents}

외부 소스에서 요소를 스케줄러로 드래그하면, 스케줄러는 자동으로 라이트박스를 열어 새로운 이벤트를 생성합니다.


![external_dnd](/img/external_dnd.png)


[Integration with dhtmlxTree](https://docs.dhtmlx.com/scheduler/samples/10_integration/02_dhtmlxtree_outer_drag.html)


아래는 <a src="http://docs.dhtmlx.com/doku.php?id='dhtmlxtree:toc'">dhtmlxTree 컴포넌트</a>와 함께 외부 드래그 앤 드롭이 동작하는 방식입니다.

스케줄러를 <a src="http://docs.dhtmlx.com/doku.php?id='dhtmlxtree:toc'">dhtmlxTree</a>와 통합하려면 다음 단계를 따르세요:

1. dhtmlxTree 패키지를 다운로드하여, 압축을 해제한 뒤 애플리케이션 루트 폴더에 넣으세요.
2. 필요한 js 및 css 파일을 페이지에 포함하세요:
~~~html
<script src="../codebase/dhtmlxscheduler.js" ...></script>
<link rel="stylesheet" href="../codebase/dhtmlxscheduler.css" ...>
...
~~~
3. outerdrag 확장을 활성화하세요:
~~~js
scheduler.plugins({
    outerdrag: true
});
~~~
4. dhtmlxTree 컴포넌트를 초기화하세요 (설명은 여기 참고):
~~~js
var tree = new dhtmlXTreeObject("treebox", "100%", "100%", 0);
tree.setImagePath("../common/dhtmlxTree/imgs/csh_yellowbooks/");
tree.loadXML("./data/tree.xml");
~~~
5. dhtmlxTree 컴포넌트에서 드래그 앤 드롭을 활성화하세요 (설명은 여기 참고):
~~~js
tree.enableDragAndDrop(true);
~~~
6. 스케줄러를 초기화 및 설정하세요:
~~~js
...
scheduler.init('scheduler_here', new Date(2019, 5, 30), "timeline");
~~~
7. 드래그된 요소의 텍스트가 이벤트에 어떻게 할당될지 정의하기 위해 [onExternalDragIn](api/event/onexternaldragin.md) 이벤트에 핸들러를 추가하세요:
~~~js
scheduler.attachEvent("onExternalDragIn", function(id, source, event){
    var label = tree.getItemText(tree._dragged[0].id);
    scheduler.getEvent(id).text = label;
    return true;
});
~~~


[Integration with dhtmlxTree](https://docs.dhtmlx.com/scheduler/samples/10_integration/02_dhtmlxtree_outer_drag.html)


이 과정을 마치면, 트리에서 원하는 노드를 드래그 앤 드롭하여 간단하게 새 이벤트를 생성할 수 있습니다.

## 스케줄러 간 드래그 앤 드롭 {#drag-events}

:::note
이 기능은 2021년 10월 6일 이후 Commercial, Enterprise, Ultimate 라이선스에서만 사용할 수 있습니다.
:::

[한 페이지에 여러 스케줄러를 표시](guides/multiple-per-page.md)할 때, 스케줄러 간에 드래그 앤 드롭을 활성화하여 이벤트를 서로 이동할 수 있습니다.

스케줄러 간 드래그 앤 드롭을 지원하려면 "**drag_between**" 확장을 포함하세요:

~~~js title="여러 스케줄러 간 드래그 앤 드롭 지원 활성화"
<script src="codebase/dhtmlxscheduler.js"></script>
<link rel="stylesheet" href="codebase/dhtmlxscheduler.css" type="text/css">

<script>
scheduler.plugins({
    drag_between: true
});

scheduler.init('scheduler_here',new Date(2019, 5, 30),"week");
scheduler.load("./data/units.xml");

scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2019, 5, 30),"week");
</script>
~~~

**"samples/20_multiple/06_drag_between_layout.html"** 샘플은 [Scheduler PRO 패키지](https://dhtmlx.com/docs/products/dhtmlxScheduler/)에 포함되어 있습니다.

### 스케줄러에서 이벤트 드래그 제한하기
스케줄러에서 이벤트를 밖으로 드래그하지 못하게 하려면 [drag_out](api/config/drag_out.md) 속성을 *false*로 설정하세요:

~~~js
scheduler.config.drag_out = false; // 이 스케줄러에서 이벤트를 밖으로 드래그하는 것 비활성화 /*!*/
scheduler.init('scheduler_here',new Date(2019, 5,30),"week");
scheduler.load("./data/units.xml");

scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2019, 5, 30),"week");
~~~


스케줄러로 이벤트를 드래그해오는 것을 막으려면 [drag_in](api/config/drag_in.md) 속성을 *false*로 설정하세요:

~~~js
scheduler.init('scheduler_here',new Date(2019, 5, 30),"week");
scheduler.load("./data/units.xml");

scheduler2.config.drag_in = false; // 이 스케줄러로 이벤트를 드래그해오는 것 비활성화 /*!*/
scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2019, 5, 30),"week");
~~~

**"samples/20_multiple/06_drag_between_layout.html"** 샘플은 [Scheduler PRO 패키지](https://dhtmlx.com/docs/products/dhtmlxScheduler/)에서 확인할 수 있습니다.

### 드래그 관련 이벤트

- [onBeforeEventDragOut](api/event/onbeforeeventdragout.md) - 이벤트가 스케줄러에서 밖으로 드래그되기 전에 발생
- [onEventDragOut](api/event/oneventdragout.md) - 이벤트가 스케줄러에서 밖으로 드래그될 때 발생
- [onBeforeEventDragIn](api/event/onbeforeeventdragin.md) - 드래그된 이벤트가 스케줄러로 들어오기 전에 발생
- [onEventDragIn](api/event/oneventdragin.md) - 드래그된 이벤트가 스케줄러 위로 이동할 때 발생
- [onEventDropOut](api/event/oneventdropout.md) - 드래그된 이벤트가 스케줄러 영역 밖에 드롭될 때 발생
