---
title: "Validierung"
sidebar_label: "Validierung"
---

# Validierung

Validierung stellt sicher, dass die von Benutzern eingegebenen Daten korrekt sind, und verhindert das Speichern fehlerhafter Werte. So kann beispielsweise verhindert werden, dass Ereignisse ohne Beschreibung erstellt werden.

In der Regel erfolgt die Datenvalidierung mithilfe von Events aus der [dhtmlxScheduler API](api/overview/events_overview.md), die Benutzereingaben erfassen und deren Gültigkeit überprüfen lassen:

## Clientseitige Validierung

Hier sind einige wichtige Events, die häufig zur Validierung von Daten verwendet werden:

- [onEventSave](api/event/oneventsave.md) - wird ausgelöst, wenn der Benutzer im Lightbox-Formular auf die Schaltfläche „Speichern" klickt
- [onBeforeEventCreated](api/event/onbeforeeventcreated.md) - wird ausgelöst, bevor ein neues Ereignis im Scheduler hinzugefügt wird
- [onBeforeEventChanged](api/event/onbeforeeventchanged.md) - wird ausgelöst, bevor ein Ereignis aktualisiert wird

Eine einfache Möglichkeit zur Validierung ist die Verwendung des Events [onEventSave](api/event/oneventsave.md). Dieses Event tritt auf, wenn die Schaltfläche „Speichern" im Formular geklickt wird. Die Rückgabe von *true* erlaubt das Speichern der Änderungen, während *false* das Speichern verhindert und das Lightbox-Fenster geöffnet lässt.

Um beispielsweise zu verhindern, dass ein Ereignis ohne Beschreibung oder mit zu kurzem Text gespeichert wird, kann folgender Code verwendet werden:

~~~js
scheduler.attachEvent("onEventSave", function(id,ev){
    if (!ev.text) {
        dhtmlx.alert("Text must not be empty");
        return false;
    }
    if (ev.text.length < 20) {
        dhtmlx.alert("Text too small");
        return false;
    }
    return true;
});
~~~


[Validating lightbox fields](https://docs.dhtmlx.com/scheduler/samples/02_customization/08_validation.html)


## Serverseitige Validierung

Eine Einschränkung der oben genannten Methode ist, dass das Event nicht ausgelöst wird, wenn Änderungen durch Inline-Bearbeitung oder per Drag & Drop im Scheduler vorgenommen werden.

Um alle Änderungen zu erfassen - egal ob Bearbeiten, Erstellen oder Löschen - verwenden Sie das [dataProcessor](guides/server-integration.md)-Objekt, insbesondere dessen [onBeforeUpdate](https://docs.dhtmlx.com/api__dataprocessor_onbeforeupdate_event.html)-Event. Dieses Event wird ausgelöst, bevor Daten an den Server gesendet werden, und deckt jede Änderung im Scheduler ab, nicht nur die im Lightbox-Formular.

~~~js
scheduler.init("scheduler_here");
scheduler.load("data.php");
 
var dp = new gantt.dataProcessor("data.php");
dp.init(scheduler);

dp.attachEvent("onBeforeUpdate", function (id, status, data) {
    if (!data.text) {
        dhtmlx.message("The event's text can't be empty!");
        return false;
    }
    return true;
});
~~~
 
wobei: 

- **id** - (*string*) die ID des Ereignisses.
- **status** - (*'updated', 'inserted', 'deleted'*) der Status der Ereignisoperation.
- **data** - (*object*) die zu sendenden Daten.

Beachten Sie, dass bei fehlgeschlagener Validierung die Änderungen nicht an den Server gesendet werden, sondern auf der Client-Seite verbleiben, sodass sie bei Bedarf weiterverarbeitet werden können.
