---
title: "jQuery 통합"
sidebar_label: "jQuery 통합"
---

# jQuery 통합

버전 4.0부터 dhtmlxScheduler는 jQuery와 통합될 수 있습니다.

표준 스케줄러를 jQuery를 사용하여 아래와 같이 초기화할 수 있습니다:

~~~js
$(function(){
    $(".myscheduler").dhx_scheduler({
        date:new Date(2027,4,25),
        mode:"month"
    });
        
    scheduler.load("data/events");
});
~~~

다음과 같습니다:

- **".myscheduler"** - 컨테이너의 jQuery 호환 CSS 선택자이며, 이 컨테이너에 스케줄러가 생성됩니다( PRO 버전의 경우 한 번에 여러 컨테이너에 스케줄러를 초기화할 수 있습니다 )
- **dhx_scheduler()** 메서드는 dhtmlxScheduler의 인스턴스를 초기화합니다. 매개변수로 구성 객체를 받습니다:
  - **date** - (*Date*) 스케줄러의 초기 날짜(기본값은 현재 날짜)
  - **mode** - (*string*) 초기 뷰의 이름(기본값은 "week")
  - 다른 구성 매개변수은 ( 보통은 scheduler.config.xxxxx를 통해 설정 ) 이와 같은 방식으로 설정할 수 있습니다
:::note
jQuery 호출을 통해 초기화된 스케줄러는 표준 스케줄러가 사용하는 동일한 구성과 API를 사용할 수 있습니다
:::


[JQuery integration](https://docs.dhtmlx.com/scheduler/samples/10_integration/06_jquery.html)