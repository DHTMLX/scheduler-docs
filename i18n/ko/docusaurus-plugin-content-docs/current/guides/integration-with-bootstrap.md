---
title: "Bootstrap과의 통합"
sidebar_label: "Bootstrap과의 통합"
---

# Bootstrap과의 통합

Scheduler 라이브러리는 Bootstrap 프레임워크와 쉽게 통합할 수 있습니다. Bootstrap 기반 앱에 Scheduler를 포함하려면 다음 단계를 따르세요:

1. dhtmlxScheduler 스크립트를 애플리케이션에 추가합니다:

~~~html
<script src="../../codebase/dhtmlxscheduler.js" 
    type="text/javascript" charset="utf-8"></script>
~~~

2. Bootstrap 컴포넌트와 함께 Scheduler 컨테이너 및 헤더 요소를 포함한 HTML 구조를 설정합니다. 예시는 다음과 같습니다:

~~~html
<div class="container-fluid">
    <div class="navbar navbar-inverse">
        <div class="navbar-header">
            <a class="navbar-brand" href="#">dhtmlxScheduler</a>
        </div>
    </div>

    <!-- Scheduler를 위한 컨테이너 -->
    <div class="dhx_cal_container panel" id="scheduler_here">    
          <!-- Scheduler에서 사용하는 표준 'div' 집합 -->    
    </div>
</div>

~~~

3. 일반적으로 Scheduler를 초기화하고 구성합니다:

~~~js
scheduler.plugins({
    year_view: true,
});
scheduler.config.first_hour = 8;
scheduler.config.limit_time_select = true;

scheduler.init('scheduler_here',new Date(2017,5,30),"week");
~~~


[Bootstrap layout](https://docs.dhtmlx.com/scheduler/samples/10_integration/08_bootstrap.html)
