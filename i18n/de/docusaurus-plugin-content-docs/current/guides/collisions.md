---
title: "Verhindern von doppelten Ereignissen in einem Zeitfenster"
sidebar_label: "Verhindern von doppelten Ereignissen in einem Zeitfenster"
---

# Verhindern von doppelten Ereignissen in einem Zeitfenster

In vielen Szenarien ist es wichtig, die Anzahl der Ereignisse zu begrenzen, die im selben Zeitfenster geplant werden können. Beispielsweise möchten Sie möglicherweise verhindern, dass ein zweites Ereignis hinzugefügt wird, wenn bereits eines für diesen Zeitpunkt geplant ist.

## Aktivieren der Überwachung auf Kollisionen

Um die Anzahl der zulässigen Ereignisse in einem einzelnen Zeitfenster zu steuern, kann die [**collision**](guides/extensions-list.md#collision) Erweiterung verwendet werden.

~~~js title="Aktivieren der 'collision'-Erweiterung"
scheduler.plugins({
    collision: true
});
~~~

*Sobald diese Erweiterung auf der Seite aktiviert ist, verhindert sie, dass Benutzer zwei Ereignisse im selben Zeitfenster platzieren - sowohl beim Erstellen neuer Ereignisse als auch beim Verschieben bestehender.*

## Verwalten der zulässigen Anzahl von Ereignissen in einem Zeitfenster

Standardmäßig ist nur ein Ereignis pro Zeitfenster erlaubt. Um dieses Limit anzupassen, verwenden Sie die Eigenschaft [collision_limit](api/config/collision_limit.md):

~~~js title="Verhindern, dass mehr als 2 Ereignisse pro Zeitfenster erstellt werden"
scheduler.config.collision_limit = 2;      // erlaubt das Erstellen von 2 Ereignissen pro Zeitfenster
~~~

[Controlling the number of events in a time slot](https://docs.dhtmlx.com/scheduler/samples/03_extensions/15_collision.html)


*Mit der aktivierten ['collision'-Erweiterung](guides/extensions-list.md#collision) löst der Scheduler jedes Mal das Ereignis [onEventCollision](api/event/oneventcollision.md) aus, wenn ein Benutzer versucht, ein Ereignis in ein bereits belegtes Zeitfenster hinzuzufügen oder zu verschieben. Dieses Ereignis prüft das durch die Eigenschaft [collision_limit](api/config/collision_limit.md) gesetzte Limit.*


Beachten Sie, dass das Ereignis [onEventCollision](api/event/oneventcollision.md) während des Ladens der Daten nicht ausgelöst wird. Um das Ereignislimit auch beim Laden von Daten zu erzwingen, ist eine kleine Ergänzung im Code erforderlich:

~~~js title="Verhindern, dass mehr als 2 Ereignisse pro Zeitfenster erstellt/geladen werden"
scheduler.config.collision_limit = 2; // erlaubt das Erstellen von 2 Ereignissen pro Zeitfenster
scheduler.attachEvent("onEventLoading", function(ev){ /*!*/
    return scheduler.checkCollision(ev);             /*!*/
});                                                   /*!*/

~~~
Die Methode [checkCollision](api/method/checkcollision.md) prüft, ob ein Ereignis mit bestehenden Ereignissen überlappt, und löst gegebenenfalls das Ereignis [onEventCollision](api/event/oneventcollision.md) aus.


## Ermitteln der Anzahl der Ereignisse in einem Zeitfenster

Um herauszufinden, wie viele Ereignisse in einem bestimmten Zeitfenster geplant sind, kann die Methode [getEvents](api/method/getevents.md) verwendet werden:

~~~js title="Ermitteln der Anzahl der Ereignisse in einem Zeitfenster"
var count = scheduler.getEvents(ev.start_date, ev.end_date).length;
~~~

Beachten Sie, dass die Methode [getEvents](api/method/getevents.md) alle Ereignisse durchsucht und deren Daten vergleicht. Bei einer sehr großen Anzahl von Ereignissen kann dieser Vorgang etwas Zeit in Anspruch nehmen.

## Vollständige Checkliste zur Verhinderung von Doppelbuchungen/Ereignissen

Hier ist eine Zusammenfassung der Schritte, die Sie befolgen sollten, um Kollisionen von Ereignissen in einem Zeitfenster zu verhindern:

1) Fügen Sie die *collision*-Erweiterung auf der Seite ein:

~~~js
scheduler.plugins({
    collision: true
});
~~~

2) Verhindern Sie, dass Benutzer neue Ereignisse erstellen, während Daten noch vom Server geladen werden.

Dies stellt sicher, dass keine Ereignisse hinzugefügt werden können, bevor der Kalender vollständig geladen ist. Verwenden Sie dazu die Event-Handler [onLoadEnd](api/event/onloadend.md) und [onLoadStart](api/event/onloadstart.md) zusammen mit der Eigenschaft [readonly](api/config/readonly.md), wie folgt:

~~~js
// Scheduler schreibgeschützt machen
// bevor das Laden der Daten aus der Datenquelle begonnen hat
scheduler.attachEvent("onLoadStart", function(){
    scheduler.config.readonly = true;
});

// Scheduler wieder bearbeitbar machen
// erst nachdem das Laden der Daten abgeschlossen ist
scheduler.attachEvent("onLoadEnd", function(){
    scheduler.config.readonly = false;
});
~~~

3) Aktivieren Sie das dynamische Laden, um die Leistung zu verbessern, wenn viele Datensätze geladen werden müssten.

Um das dynamische Laden zu aktivieren, rufen Sie die Methode [setLoadMode](api/method/setloadmode.md) vor dem Laden der Daten auf:

~~~js title="Aktivieren des dynamischen Ladens"
scheduler.setLoadMode("month");
scheduler.load("/some");
~~~

4) Validieren Sie kollidierende Ereignisse serverseitig mit der PHP Connector Validierung. Weitere Informationen finden Sie im Artikel zur 
[Datenvalidierung](https://docs.dhtmlx.com/connector__php__validation.html#processingincaseofvalidationerror).

Falls die Validierung fehlschlägt, können Sie die Daten auf der Client-Seite neu laden.

Um einen Validierungsfehler zu behandeln, verwenden Sie die DataProcessor Events [onValidationError](https://docs.dhtmlx.com/api__dataprocessor_onvalidationerror_event.html) und 
[onAfterUpdate](https://docs.dhtmlx.com/api__dataprocessor_onafterupdate_event.html) und laden Sie die Daten mit den Scheduler-Methoden [clearAll](api/method/clearall.md) und [load](api/method/load.md) neu:


a. [onValidationError](https://docs.dhtmlx.com/api__dataprocessor_onvalidationerror_event.html)

Wird ausgelöst, nachdem ein Validierungsfehler aufgetreten ist, bevor die Daten gesendet werden:

~~~js
dp.attachEvent("onValidationError", function(id, details){
   //aktuelle Daten vom Server neu laden
   scheduler.clearAll();
   scheduler.load("/data");
});
~~~

Parameter:

- id - (string) ID des Elements mit dem Fehler
- details -    (object) Fehlerdetails

b. [onAfterUpdate](https://docs.dhtmlx.com/api__dataprocessor_onafterupdate_event.html)

Wird ausgelöst, nachdem die Serverantwort verarbeitet wurde:

~~~js
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
     if(action == "invalid" || action == "error"){
          //aktuelle Daten vom Server neu laden
          scheduler.clearAll();
          scheduler.load("/data");
     }
});
~~~

Parameter:

- id - (string)    ID des aktualisierten Elements
- action - (string)    Status der Antwort (Operationstyp), siehe unten für Details
- tid - (string) Neue ID (nur relevant bei Insert-Operationen)
- response - (mixed) XML-Knoten/JSON-Objekt mit der geparsten Antwort

Mögliche Antwort-Status sind:

- updated;
- inserted;
- deleted;
- invalid;
- error.
