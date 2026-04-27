---
title: "Integration mit Bootstrap"
sidebar_label: "Integration mit Bootstrap"
---

# Integration mit Bootstrap

Sie können die Scheduler-Bibliothek in das Bootstrap-Framework integrieren. Um Scheduler in einer Bootstrap-Anwendung hinzuzufügen, befolgen Sie die unten angegebenen Schritte:

1. Fügen Sie die dhtmlxScheduler-Datei zur Anwendung hinzu:

~~~html
<script src="../../codebase/dhtmlxscheduler.js" 
    type="text/javascript" charset="utf-8"></script>
~~~

2. Geben Sie den HTML-Markup für die Bootstrap-Elemente an und fügen Sie einen Scheduler-Container sowie Header-Elemente hinzu, wie unten:

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

3. Initialisieren und konfigurieren Sie Scheduler wie gewohnt:

~~~js
scheduler.plugins({
    year_view: true,
});
scheduler.config.first_hour = 8;
scheduler.config.limit_time_select = true;

scheduler.init('scheduler_here',new Date(2027,5,30),"week");
~~~

[Bootstrap-Layout](https://docs.dhtmlx.com/scheduler/samples/10_integration/08_bootstrap.html)