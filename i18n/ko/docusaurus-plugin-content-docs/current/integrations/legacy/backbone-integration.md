---
title: "Backbone 통합(레거시)"
sidebar_label: "Backbone 통합(레거시)"
---

# Backbone 통합(레거시)

:::warning
이 문서는 레거시 통합에 대해 설명합니다. 새로 시작하는 경우 프레임워크 통합이나 바닐라 JS 설정을 참조하세요.
:::


버전 4.0부터 라이브러리는 Backbone 라이브러리와 스케줄러를 통합할 수 있도록 특별한 확장 [**mvc**](guides/extensions-list.md#legacy)을 제공합니다.

Backbone 기반 애플리케이션이 있고 거기에 스케줄러를 추가하려면(데이터 관리는 여전히 Backbone으로), 아래의 기법을 사용하십시오:

1. 앱에 dhtmlxScheduler 파일을 포함합니다:
~~~js
<script src="../../codebase/dhtmlxscheduler.js" ></script>
<link rel="stylesheet" href="../../codebase/dhtmlxscheduler.css">
~~~
2. 페이지에서 <b>mvc</b> 확장을 활성화합니다:
~~~js
scheduler.plugins({
    mvc: true
});
~~~
3. 일반적인 방식으로 스케줄러를 초기화하고 구성합니다:
~~~js
scheduler.full_day = true;

scheduler.init("scheduler_here",new Date(2019,0,6),"month");
~~~
4. 이제 Backbone에서 데이터 컬렉션을 만들고 스케줄러를 그것에 연결할 수 있습니다:
~~~js
//you can use any model here
MyEvent   = Backbone.Model.extend({});
EventList = Backbone.Collection.extend({
    model:MyEvent,
    url:"./data/backbone.json"
});
events = new EventList();
            

scheduler.backbone(events); //link scheduler to collection
~~~

그 후 스케줄러는 컬렉션에서 데이터를 로드하고 그 안의 모든 업데이트를 반영합니다. 또한 스케줄러의 UI를 통해 발생한 변경은 Backbone의 컬렉션에서 관련 이벤트를 트리거합니다. 


보시다시피 꽤 간단합니다. 필요한 것은 일반적인 [load](api/method/load.md)나 [parse](api/method/parse.md) 대신 [backbone](api/method/backbone.md) 메서드를 사용하는 것뿐입니다.

[Backbone](api/method/backbone.md) 메서드는 스케줄러가 Backbone 모델의 모든 데이터 변경 사항을 반영하고 그 반대도 마찬가지가 되도록 만듭니다.
매개변수로 이 메서드는 Backbone 컬렉션을 받습니다.


[Backbone 통합](https://docs.dhtmlx.com/scheduler/samples/10_integration/07_backbone.html)