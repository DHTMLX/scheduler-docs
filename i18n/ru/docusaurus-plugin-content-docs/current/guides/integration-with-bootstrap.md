---
title: "Интеграция с Bootstrap"
sidebar_label: "Интеграция с Bootstrap"
---

# Интеграция с Bootstrap

Библиотека Scheduler легко интегрируется с фреймворком Bootstrap. Чтобы включить Scheduler в приложение на основе Bootstrap, выполните следующие шаги:

1. Добавьте скрипт dhtmlxScheduler в ваше приложение:

~~~html
<script src="../../codebase/dhtmlxscheduler.js" 
    type="text/javascript" charset="utf-8"></script>
~~~

2. Настройте HTML-структуру с использованием компонентов Bootstrap, включая контейнер для Scheduler и элементы заголовка, например:

~~~html
<div class="container-fluid">
    <div class="navbar navbar-inverse">
        <div class="navbar-header">
            <a class="navbar-brand" href="#">dhtmlxScheduler</a>
        </div>
    </div>

    <!--Контейнер для Scheduler-->
    <div class="dhx_cal_container panel" id="scheduler_here">    
          <!--Стандартный набор 'div' для Scheduler-->    
    </div>
</div>

~~~

3. Инициализируйте и настройте Scheduler как обычно:

~~~js
scheduler.plugins({
    year_view: true,
});
scheduler.config.first_hour = 8;
scheduler.config.limit_time_select = true;

scheduler.init('scheduler_here',new Date(2017,5,30),"week");
~~~


[Bootstrap layout](https://docs.dhtmlx.com/scheduler/samples/10_integration/08_bootstrap.html)
