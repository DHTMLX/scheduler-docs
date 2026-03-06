---
title: "jQuery 통합"
sidebar_label: "jQuery 통합"
---

# jQuery 통합

버전 4.0부터 dhtmlxScheduler는 jQuery와의 통합을 지원합니다.

아래는 jQuery를 사용하여 표준 스케줄러를 초기화하는 방법입니다:

~~~js
$(function(){
    $(".myscheduler").dhx_scheduler({
        date:new Date(2019,4,25),
        mode:"month"
    });
        
    scheduler.load("data/events");
});
~~~

이 예시에서:

- **".myscheduler"** - 스케줄러가 생성될 컨테이너에 대한 jQuery 호환 CSS 선택자입니다. (PRO 버전에서는 여러 컨테이너에 동시에 스케줄러를 초기화하는 것도 가능합니다.)
- **dhx_scheduler()** 메서드는 dhtmlxScheduler의 인스턴스를 생성합니다. 이 메서드는 설정 객체를 매개변수로 받습니다:
  - **date** - (*Date*) 스케줄러의 초기 날짜를 지정합니다 (기본값은 현재 날짜)
  - **mode** - (*string*) 초기 뷰를 지정합니다 (기본값은 "week")
  - 기타 설정 옵션들(scheduler.config.xxxxx로 보통 설정하는 값들)도 이 방식으로 전달할 수 있습니다
:::note
jQuery 메서드를 통해 초기화된 스케줄러도 표준 스케줄러와 동일한 설정 및 API를 지원합니다.
:::


[JQuery integration](https://docs.dhtmlx.com/scheduler/samples/10_integration/06_jquery.html)
