---
title: "与 Bootstrap 集成"
sidebar_label: "与 Bootstrap 集成"
---

# 与 Bootstrap 集成

Scheduler 库可以轻松集成到 Bootstrap 框架中。要在基于 Bootstrap 的应用中引入 Scheduler，请按照以下步骤操作:

1. 在您的应用中添加 dhtmlxScheduler 脚本:

~~~html
<script src="../../codebase/dhtmlxscheduler.js" 
    type="text/javascript" charset="utf-8"></script>
~~~

2. 使用 Bootstrap 组件设置 HTML 结构，包括 Scheduler 容器和头部元素，如下所示:

~~~html
<div class="container-fluid">
    <div class="navbar navbar-inverse">
        <div class="navbar-header">
            <a class="navbar-brand" href="#">dhtmlxScheduler</a>
        </div>
    </div>

    <!--Scheduler 的容器-->
    <div class="dhx_cal_container panel" id="scheduler_here">    
          <!--Scheduler 标准的 'divs' 集合-->    
    </div>
</div>

~~~

3. 按常规方式初始化并配置 Scheduler:

~~~js
scheduler.plugins({
    year_view: true,
});
scheduler.config.first_hour = 8;
scheduler.config.limit_time_select = true;

scheduler.init('scheduler_here',new Date(2017,5,30),"week");
~~~


[Bootstrap layout](https://docs.dhtmlx.com/scheduler/samples/10_integration/08_bootstrap.html)
