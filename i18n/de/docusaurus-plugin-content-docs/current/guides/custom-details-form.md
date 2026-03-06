---
title: "Vollständig individuelles Lightbox"
sidebar_label: "Vollständig individuelles Lightbox"
---

# Vollständig individuelles Lightbox

Um ein vollständig individuelles Lightbox für den Scheduler zu erstellen, müssen Sie die Methode [showLightbox](api/method/showlightbox.md) überschreiben:

~~~js
scheduler.showLightbox = function(id){
    // id - ID des Ereignisses
    ... Code, um ein beliebiges individuelles Formular anzuzeigen ...
}
~~~

Es gibt zwei Hilfsmethoden, die dies erleichtern können:

- [startLightbox](api/method/startlightbox.md) - zeigt ein individuelles Lightbox in einem angegebenen HTML-Container an, zentriert auf dem Bildschirm.
- [endLightbox](api/method/endlightbox.md) - schließt das Lightbox


Angenommen, Sie haben irgendwo auf der Seite einen HTML-Container mit der ID **#custom_form**. Um ein individuelles Lightbox zu implementieren, könnten Sie Folgendes tun:

~~~js
var custom_form = document.getElementById("custom_form");

scheduler.showLightbox = function(id){
    var ev = scheduler.getEvent(id);
    scheduler.startLightbox(id, custom_form );
    ...'hier müssen Sie Werte im Formular setzen'...
    //document.getElementById("some_input").value = ev.text;
}
// Sollte mit dem 'Speichern'-Button verknüpft sein
function save_form() {
    var ev = scheduler.getEvent(scheduler.getState().lightbox_id);
    ...'hier müssen Sie Werte aus dem Formular übernehmen'...
    //ev.text = document.getElementById("some_input").value;
    scheduler.endLightbox(true, custom_form);
}
// Sollte mit dem 'Abbrechen'-Button verknüpft sein
function close_form(argument) {
    scheduler.endLightbox(false, custom_form);
}
~~~


[Fully custom lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)
