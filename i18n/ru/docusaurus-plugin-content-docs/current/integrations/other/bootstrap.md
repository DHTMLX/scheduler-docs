---
title: "Интеграция с Bootstrap"
sidebar_label: "Интеграция с Bootstrap"
---

# Интеграция с Bootstrap

Вы можете интегрировать библиотеку Scheduler с фреймворком Bootstrap. Чтобы добавить Scheduler в приложение на Bootstrap, выполните следующие шаги:

1. Подключите файл dhtmlxScheduler к приложению:

~~~html
<script src="../../codebase/dhtmlxscheduler.js" 
    type="text/javascript" charset="utf-8"></script>
~~~

2. Укажите HTML-разметку для элементов Bootstrap и добавьте контейнер Scheduler и элементы заголовков, как показано ниже:

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

3. Инициализируйте и настройте Scheduler обычным способом:

~~~js
scheduler.plugins({
    year_view: true,
});
scheduler.config.first_hour = 8;
scheduler.config.limit_time_select = true;

scheduler.init('scheduler_here',new Date(2027,5,30),"week");
~~~


[Макет Bootstrap](https://docs.dhtmlx.com/scheduler/samples/10_integration/08_bootstrap.html)