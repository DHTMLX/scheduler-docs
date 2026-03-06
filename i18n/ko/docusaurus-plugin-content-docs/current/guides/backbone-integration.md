---
title: "Backbone 통합"
sidebar_label: "Backbone 통합"
---

# Backbone 통합

버전 4.0부터, 라이브러리는 스케줄러와 Backbone 라이브러리의 원활한 통합을 가능하게 하는 전용 확장 [**mvc**](guides/extensions-list.md#mvc)를 제공합니다.

Backbone을 기반으로 구축된 애플리케이션에서 스케줄러를 도입하되, 데이터 관리는 Backbone을 통해 계속하고자 하는 경우 다음과 같은 접근 방식을 사용할 수 있습니다:

1. dhtmlxScheduler 파일을 애플리케이션에 추가합니다:
~~~js
<script src="../../codebase/dhtmlxscheduler.js" ></script>
<link rel="stylesheet" href="../../codebase/dhtmlxscheduler.css">
~~~
2. 페이지에서 mvc 확장을 활성화합니다:
~~~js
scheduler.plugins({
    mvc: true
});
~~~
3. 일반적으로 스케줄러를 설정하고 초기화합니다:
~~~js
scheduler.full_day = true;

scheduler.init("scheduler_here",new Date(2019,0,6),"month");
~~~
4. 다음으로, Backbone 데이터 컬렉션을 생성하고 스케줄러와 연결합니다:
~~~js
//여기서 어떤 모델이든 사용할 수 있습니다
MyEvent   = Backbone.Model.extend({});
EventList = Backbone.Collection.extend({
    model:MyEvent,
    url:"./data/backbone.json"
});
events = new EventList();
            

scheduler.backbone(events); //컬렉션에 스케줄러를 연결
~~~

모든 설정이 완료되면, 스케줄러는 컬렉션에서 데이터를 불러오고, 모든 업데이트와 동기화를 유지합니다. 마찬가지로, 스케줄러 인터페이스에서 이루어지는 변경 사항도 Backbone 컬렉션에서 해당 이벤트를 트리거합니다.

이 과정은 매우 간단합니다. 핵심은 일반적으로 사용하는 [load](api/method/load.md) 또는 [parse](api/method/parse.md) 메서드 대신 [backbone](api/method/backbone.md) 메서드를 사용하는 것입니다.


[backbone](api/method/backbone.md) 메서드는 스케줄러가 Backbone 모델의 모든 데이터 변경 사항과 상호 동기화를 유지하도록 보장합니다.
이 메서드는 Backbone 컬렉션을 파라미터로 받습니다.


[Backbone integration](https://docs.dhtmlx.com/scheduler/samples/10_integration/07_backbone.html)
