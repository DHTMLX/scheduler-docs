---
title: "Vollständig benutzerdefinierte Lightbox"
sidebar_label: "Vollständig benutzerdefinierte Lightbox"
---

# Vollständig benutzerdefinierte Lightbox

Um eine vollständig benutzerdefinierte Lightbox für den Scheduler zu spezifizieren, definieren Sie die [`showLightbox()`](api/method/showlightbox.md) Methode neu:

~~~js
scheduler.showLightbox = (id) => {
    // id - ID des Ereignisses
    ... Code, um ein beliebiges individuelles Formular anzuzeigen ...
};
~~~

Es gibt 2 Hilfsmethoden, die Sie verwenden können, um die Implementierung zu vereinfachen:

- [`startLightbox()`](api/method/startlightbox.md) - zeigt eine benutzerdefinierte Lightbox im angegebenen HTML-Container zentriert auf dem Bildschirm
- [`endLightbox()`](api/method/endlightbox.md) - schließt die Lightbox

Angenommen, Sie haben irgendwo auf der Seite den HTML-Container `#custom_form`. Dann können Sie eine benutzerdefinierte Lightbox wie folgt implementieren:

~~~js
const customForm = document.getElementById("custom_form");

scheduler.showLightbox = (id) => {
    const event = scheduler.getEvent(id);
    scheduler.startLightbox(id, customForm);
    ...'hier müssen Sie Werte im Formular setzen'...
    // document.getElementById("some_input").value = event.text;
};

// Sollte mit dem 'Speichern'-Button verknüpft sein
const saveForm = () => {
    const event = scheduler.getEvent(scheduler.getState().lightbox_id);
    ...'hier müssen Sie Werte aus dem Formular übernehmen'...
    // event.text = document.getElementById("some_input").value;
    scheduler.endLightbox(true, customForm);
};

// muss an den 'cancel'-Button angehängt werden
const closeForm = () => {
    scheduler.endLightbox(false, customForm);
};
~~~

### Verwandte Beispiele

- [Vollständig benutzerdefinierte Lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)