---
sidebar_label: "onEmptyClick"
title: "onEmptyClick event"
description: "Wird ausgelöst, wenn der Benutzer auf einen leeren Bereich innerhalb des Schedulers klickt (nicht auf Events)."
---

# onEmptyClick

### Description

@short: Wird ausgelöst, wenn der Benutzer auf einen leeren Bereich innerhalb des Schedulers klickt (nicht auf Events).

@signature: onEmptyClick: (date: object, e: Event) =\> void;

### Parameters

- `date` - (required) *object* - Das Datum, das dem Bereich entspricht, auf den der Benutzer geklickt hat
- `e` - (required) *Event* - Das native Event-Objekt

### Example

~~~jsx
scheduler.attachEvent("onEmptyClick", function (date, e){
       //beliebige eigene Logik hier
});
~~~

### Related samples
- [Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)
