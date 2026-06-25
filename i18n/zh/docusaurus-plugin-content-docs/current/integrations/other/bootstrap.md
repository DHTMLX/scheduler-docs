---
title: "与 Bootstrap 的集成"
sidebar_label: "与 Bootstrap 的集成"
---

# 与 Bootstrap 的集成

您可以将 Scheduler 库与 Bootstrap 框架集成。要在 Bootstrap 应用程序中添加 Scheduler，请按照以下步骤进行：

1. 将 dhtmlxScheduler 文件包含到应用中：

~~~html
<script src="../../codebase/dhtmlxscheduler.js" 
    type="text/javascript" charset="utf-8"></script>
~~~

2. 为 Bootstrap 元素指定 HTML 标记，并添加一个 Scheduler 容器和头部元素，如下所示：

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

3. 以常规方式初始化并配置 Scheduler：

~~~js
scheduler.plugins({
    year_view: true,
});
scheduler.config.first_hour = 8;
scheduler.config.limit_time_select = true;

scheduler.init('scheduler_here',new Date(2027,5,30),"week");
~~~


[Bootstrap 布局](https://docs.dhtmlx.com/scheduler/samples/10_integration/08_bootstrap.html)