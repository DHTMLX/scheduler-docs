---
title: "Mehrere Benutzer"
sidebar_label: "Mehrere Benutzer"
---

# Mehrere Benutzer

Obwohl der Scheduler keine integrierte Unterstützung für separate Kalender bietet, können Sie dies simulieren, indem Sie mehrere Datenquellen in dieselbe Scheduler-Instanz laden.

~~~js
// zwei Datenquellen laden
scheduler.load("events_shared.php?user="1"");
scheduler.load("events_shared.php?user="2"");
scheduler.config.readonly = true;
~~~

Auf der Serverseite könnten Sie es folgendermaßen handhaben:

~~~php
$scheduler->render_sql("select * from events_shared where event_type="1" AND 
userId = ".$user_id,"event_id","start_date,end_date,text,event_type,userId");
~~~

Mit dieser Methode können Daten aus mehreren Quellen gleichzeitig angezeigt werden. Die **userId** im Beispiel ist nur ein Platzhalter - in der Praxis können Sie beliebige Regeln anwenden, die Ihren Anforderungen entsprechen.

Dieser Ansatz lässt sich auf komplexere Szenarien erweitern, zum Beispiel wenn Benutzer alle Termine sehen, aber nur ihre eigenen bearbeiten dürfen:

~~~js
//Speichern für den ersten Datenfeed aktivieren
var dp =  scheduler.createDataProcessor("events.php?user");
dp.init(scheduler);
        
//Bearbeitungsoperationen nur für eigene Termine erlauben
function allow_own(id){
    var ev = this.getEvent(id);
    return ev.userId == 1;
}
scheduler.attachEvent("onClick",allow_own);
scheduler.attachEvent("onDblClick",allow_own);

//Standard-Eigenschaften für ein neues Ereignis
scheduler.attachEvent("onEventCreated",function(id){
    const ev = this.getEvent(id);
    // userId wird vom DataProcessor an das Backend gesendet,
    // stellen Sie sicher, dass Sie dies überprüfen
    ev.userId = CURRENT_USER_ID; 
});
~~~
