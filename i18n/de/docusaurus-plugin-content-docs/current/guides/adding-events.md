---
title: "Hinzufügen/Löschen von Ereignissen"
sidebar_label: "Hinzufügen/Löschen von Ereignissen"
---

# Hinzufügen/Löschen von Ereignissen

## Hinzufügen von Ereignissen {#addingevents}

Es gibt drei Möglichkeiten, ein Ereignis zum Scheduler hinzuzufügen:

1. [addEvent](api/method/addevent.md) - erstellt ein neues Ereignis und löst entweder das [onEventAdded](api/event/oneventadded.md) oder das [onEventChanged](api/event/oneventchanged.md) Ereignis aus;
2. [addEventNow](api/method/addeventnow.md) - erstellt ein neues Ereignis und öffnet das Lightbox zur Bestätigung. Diese Methode löst keine Ereignisse aus;
3. [setEvent](api/method/setevent.md) - fügt ein neues Ereignis direkt zum Datenpool des Schedulers hinzu, ohne Ereignisse auszulösen.

Die empfohlene Methode ist die Verwendung von [addEvent](api/method/addevent.md):

~~~js
var eventId = scheduler.addEvent({
    start_date: "16-06-2019 09:00",
    end_date:   "16-06-2019 12:00",
    text:   "Meeting",
    holder: "John",  // Benutzerdaten
    room:   "5"      // Benutzerdaten
});
~~~


[Validating lightbox fields](https://docs.dhtmlx.com/scheduler/samples/02_customization/08_validation.html)


[Default values for lightbox controls](https://docs.dhtmlx.com/scheduler/samples/02_customization/28_lightbox_default_value.html)


## Aktualisieren von Ereignissen {#updatingevents}

Es gibt zwei Szenarien für das Aktualisieren von Ereignissen im Scheduler:

1. Wenn Sie das Ereignis einfach neu rendern möchten, ohne Änderungen an den Server zu senden, verwenden Sie [updateEvent](api/method/updateevent.md).
2. Wenn Sie Änderungen anwenden und auf dem Server speichern möchten, ist es besser, die [addEvent](guides/adding-events.md#addingevents) Methode zu verwenden.

~~~js
var eventId = scheduler.addEvent({
    start_date: "16-06-2019 09:00",
    end_date:   "16-06-2019 12:00",
    text:   "Meeting"
});
 
var event = scheduler.getEvent(eventId);
event.text = "Conference"; // Ereignisdaten aktualisieren

scheduler.updateEvent(event.id); // Neu rendern, ohne an den Server zu senden
//oder
scheduler.addEvent(event.id); // Neu rendern und Update an den Server senden
~~~

## Löschen von Ereignissen {#deletingevents}

Um ein Ereignis aus dem Scheduler zu entfernen, verwenden Sie die Methode [deleteEvent](api/method/deleteevent.md):

~~~js
scheduler.parse([
   {id:1, start_date:"06/30/2009 09:00", end_date:"06/30/2009 12:00", text:"Task1"},
   {id:2, start_date:"06/30/2009 12:00", end_date:"06/30/2009 20:00", text:"Task2"}
],"json");
...
scheduler.deleteEvent(2);
~~~

Wenn dataProcessor initialisiert ist, werden hinzugefügte oder gelöschte Ereignisse im Scheduler automatisch in der Datenquelle aktualisiert. Weitere Informationen finden Sie im Leitfaden [Serverseitige Integration](guides/server-integration.md).


[Fully custom lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)
