---
title: "Integration mit Bootstrap"
sidebar_label: "Integration mit Bootstrap"
---

# Integration mit Bootstrap

Die Scheduler-Bibliothek lässt sich problemlos in das Bootstrap-Framework integrieren. Um den Scheduler in eine auf Bootstrap basierende Anwendung einzubinden, gehen Sie wie folgt vor:

1. Fügen Sie das dhtmlxScheduler-Skript zu Ihrer Anwendung hinzu:

~~~html
<script src="../../codebase/dhtmlxscheduler.js" 
    type="text/javascript" charset="utf-8"></script>
~~~

2. Richten Sie die HTML-Struktur mit Bootstrap-Komponenten ein, einschließlich des Scheduler-Containers und der Kopfzeilenelemente, wie im folgenden Beispiel:

~~~html
<div class="container-fluid">
    <div class="navbar navbar-inverse">
        <div class="navbar-header">
            <a class="navbar-brand" href="#">dhtmlxScheduler</a>
        </div>
    </div>

    <!--Ein Container für den Scheduler-->
    <div class="dhx_cal_container panel" id="scheduler_here">    
          <!--Der Standard-Satz von Scheduler-'divs'-->    
    </div>
</div>

~~~

3. Initialisieren und konfigurieren Sie den Scheduler wie gewohnt:

~~~js
scheduler.plugins({
    year_view: true,
});
scheduler.config.first_hour = 8;
scheduler.config.limit_time_select = true;

scheduler.init('scheduler_here',new Date(2017,5,30),"week");
~~~


[Bootstrap layout](https://docs.dhtmlx.com/scheduler/samples/10_integration/08_bootstrap.html)
