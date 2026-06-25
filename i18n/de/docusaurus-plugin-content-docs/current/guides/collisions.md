---
title: "Verhindern von doppelten Ereignissen in einem Zeitfenster"
sidebar_label: "Verhindern von doppelten Ereignissen in einem Zeitfenster"
---

# Verhindern von doppelten Ereignissen in einem Zeitfenster

In vielen Anwendungsfällen müssen Sie möglicherweise die Anzahl der Termine pro Zeitfenster begrenzen. Beispielsweise müssen Sie eventuell die Erstellung des 2. Termins verweigern, falls zu diesem Zeitpunkt bereits ein anderer Termin definiert wurde.

## Aktivierung der Kollisionsüberwachung

Um die Anzahl der Termine in einem Zeitfenster zu steuern, verwenden Sie die [**collision**](guides/extensions-list.md#collision)-Erweiterung.

Aktivierung der 'collision'-Erweiterung:
~~~js
scheduler.plugins({
    collision: true
});
~~~

*Einmal aktiviert, wird die Erweiterung auf der Seite aktiv sein.
Von diesem Moment an wird der Scheduler nicht zulassen, dass Benutzer 2 Termine im selben Zeitfenster platzieren (erstellen oder verschieben).*

## Verwaltung der zulässigen Anzahl von Terminen in einem Zeitfenster

Standardmäßig beträgt die zulässige Anzahl von Terminen in einem Zeitfenster 1. Um diese Zahl zu regeln, verwenden Sie die Eigenschaft [collision_limit](api/config/collision_limit.md):

[Denying creating more than 2 events per time slot](Denying creating more than 2 events per time slot)
~~~js
scheduler.config.collision_limit = 2;      //allows creating 2 events per time slot
~~~

[Kontrolle der Anzahl der Termine in einem Zeitfenster](https://docs.dhtmlx.com/scheduler/samples/03_extensions/15_collision.html)

*Mit der ['collision'-Erweiterung](guides/extensions-list.md#collision) aktiviert, ruft der Scheduler jedes Mal das [onEventCollision](api/event/oneventcollision.md) Event auf, wenn der Benutzer versucht, einen neuen Termin zu erstellen oder einen vorhandenen innerhalb eines bereits belegten Zeitfensters zu ändern. Das Event prüft den Wert der Eigenschaft [collision_limit](api/config/collision_limit.md).*

Aber denken Sie daran, dass das [onEventCollision](api/event/oneventcollision.md) Event beim Laden von Daten nicht ausgelöst wird. Um also die Anzahl der Items in einem Zeitfenster während des Ladens von Daten in den Scheduler zu kontrollieren, müssen Sie den vorherigen Code etwas erweitern:

~~~js title="Verhindern, dass mehr als 2 Ereignisse pro Zeitfenster erstellt/geladen werden"
scheduler.config.collision_limit = 2; // erlaubt das Erstellen von 2 Ereignissen pro Zeitfenster
scheduler.attachEvent("onEventLoading", function(ev){ /*!*/
    return scheduler.checkCollision(ev);             /*!*/
});                                                   /*!*/

~~~
Die [checkCollision](api/method/checkcollision.md) Methode prüft, ob ein Termin zu einer Zeit erfolgt, die bereits von einem anderen Termin(en) belegt ist, und löst das [onEventCollision](api/event/oneventcollision.md) Event aus. 


## Die Anzahl der in einem Zeitfenster vorhandenen Termine ermitteln

Um die Anzahl der Termine in einem Zeitfenster zu ermitteln, verwenden Sie die [getEvents](api/method/getevents.md)-Methode: 

~~~js title="Ermitteln der Anzahl der Ereignisse in einem Zeitfenster"
const count = scheduler.getEvents(ev.start_date, ev.end_date).length;
~~~

Beachten Sie, dass die [getEvents](api/method/getevents.md)-Methode alle Termine durchläuft und deren Daten vergleicht, wodurch es etwas dauern kann, wenn Sie Tausende von Terminen verwenden. 

## Vollständige Checkliste zur Verhinderung doppelter Belegungen von Terminen

Nachfolgend finden Sie eine Liste der Schritte, die Sie ausführen sollten, um Kollisionen von Terminen in einem Zeitfenster zu vermeiden: 

1) Die *collision*-Erweiterung auf der Seite einbinden:

~~~js
scheduler.plugins({
    collision: true
});
~~~

2) Das Erstellen neuer Termine blockieren, während Daten vom Server geladen werden. 

Auf diese Weise kann der Benutzer keinen Termin erstellen, solange die Daten noch nicht geladen wurden und der Kalender leer ist.
Dazu verwenden Sie die Event-Handler [onLoadEnd](api/event/onloadend.md) und [onLoadStart](api/event/onloadstart.md) sowie die Eigenschaft [readonly](api/config/readonly.md), wie folgt:

~~~js
// den Scheduler schreibgeschützt machen 
// bevor das Laden von Daten aus der Datenquelle begonnen wurde
scheduler.attachEvent("onLoadStart", function(){
    scheduler.config.readonly = true;
});

// den Scheduler bearbeitbar machen 
// erst nachdem das Laden der Daten aus der Datenquelle abgeschlossen ist
scheduler.attachEvent("onLoadEnd", function(){
    scheduler.config.readonly = false;
});
~~~

3) Dynamisches Laden aktivieren, um das Laden von Daten zu beschleunigen, falls Sie viele Datensätze haben und sie alle auf einmal geladen werden.

Um das dynamische Laden zu aktivieren, rufen Sie die Methode [setLoadMode](api/method/setloadmode.md) auf und laden danach Ihr Skript:

[Enabling the dynamic loading](Enabling the dynamic loading)
~~~js
scheduler.setLoadMode("month");
scheduler.load("/some");
~~~

4) Konfliktierende Termine serverseitig in Ihrer API validieren. Wenn ein Konflikt erkannt wird, geben Sie einen Fehlerstatus in der Antwort zurück und behandeln Sie ihn auf dem Client.

Sie können auch Daten auf der Client-Seite neu laden, falls die Prüfung fehlschlägt. 

Um das Fehlschlagen der Prüfung zu verarbeiten, verwenden Sie die DataProcessor-Ereignisse [onValidationError](https://docs.dhtmlx.com/api__dataprocessor_onvalidationerror_event.html) und 
[onAfterUpdate](https://docs.dhtmlx.com/api__dataprocessor_onafterupdate_event.html) und um Daten neu zu laden, verwenden Sie die Scheduler-Methoden [clearAll](api/method/clearall.md) und [load](api/method/load.md):

a. [onValidationError](https://docs.dhtmlx.com/api__dataprocessor_onvalidationerror_event.html)

tritt auf, nachdem Validierungsfehler ausgelöst wurde, bevor Daten gesendet werden

~~~js
dp.attachEvent("onValidationError", function(id, details){
   //neuladen der aktuellen Daten vom Server
   scheduler.clearAll();
   scheduler.load("/data");
});
~~~

Parameter:

- id - (string) id des Elements, für das der Fehler auftritt
- details -    (object) Fehlerdetails

b. [onAfterUpdate](https://docs.dhtmlx.com/api__dataprocessor_onafterupdate_event.html)

wird ausgelöst, nachdem die serverseitige Antwort empfangen und verarbeitet wurde

~~~js
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
     if(action == "invalid" || action == "error"){
          //neuladen der aktuellen Daten vom Server
          scheduler.clearAll();
          scheduler.load("/data");
     }
});
~~~

Parameter:

- id - (string)    id des aktualisierten Elements
- action - (string)    Antwortstatus (Operations-Typ), siehe unten
- tid - (string) neue id (gilt nur für Einfügeoperationen)
- response - (mixed) xml-Knoten/json-Objekt, enthält geparste XML/JSON-Antwort

Mögliche Antwortstatus sind die folgenden: 

- updated; 
- inserted;
- deleted;
- invalid;
- error.