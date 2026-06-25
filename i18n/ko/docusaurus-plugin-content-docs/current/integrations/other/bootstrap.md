---
title: "부트스트랩과의 통합"
sidebar_label: "부트스트랩과의 통합"
---

# 부트스트랩과의 통합

Scheduler 라이브러리를 Bootstrap 프레임워크와 통합할 수 있습니다. Bootstrap 애플리케이션에 Scheduler를 추가하려면 아래 단계를 따르십시오:

1. 앱에 dhtmlxScheduler 파일을 포함합니다:

~~~html
<script src="../../codebase/dhtmlxscheduler.js" 
    type="text/javascript" charset="utf-8"></script>
~~~

2. Bootstrap 요소에 대한 HTML 마크업을 지정하고 Scheduler 컨테이너와 헤더 요소를 추가합니다. 아래와 같이:

~~~html
<div class="container-fluid">
    <div class="navbar navbar-inverse">
        <div class="navbar-header">
            <a class="navbar-brand" href="#">dhtmlxScheduler</a>
        </div>
    </div>

    <!--A container for Scheduler-->
    <div class="dhx_cal_container panel" id="scheduler_here">    
          <!--The standard set of  Scheduler 'divs'-->    
    </div>
</div>

~~~

3. 일반적인 방법으로 Scheduler를 초기화하고 구성합니다:

~~~js
scheduler.plugins({
    year_view: true,
});
scheduler.config.first_hour = 8;
scheduler.config.limit_time_select = true;

scheduler.init('scheduler_here',new Date(2027,5,30),"week");
~~~

[부트스트랩 레이아웃](https://docs.dhtmlx.com/scheduler/samples/10_integration/08_bootstrap.html)