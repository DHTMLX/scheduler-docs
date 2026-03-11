---
title: "Template"
sidebar_label: "Template"
---

# Template 

Ein Container, der HTML-Inhalt aufnimmt.

![template_editor](/img/template_editor.png)


~~~js
scheduler.locale.labels.section_template = 'Details';// setzt den Namen des Abschnitts

scheduler.config.lightbox.sections = [
    { name:"text", height:50, map_to:"text", type:"textarea", focus:true},
    { name:"template", height: 40, type:"template", map_to:"my_template"},
    { name:"time", height:72, type:"time", map_to:"auto"}
];
scheduler.attachEvent("onEventCreated", function(id, e) {
    var ev = scheduler.getEvent(id);
    ev.my_template = "<b>Holder:</b>"+ ev.holder+"

<b>Room:</b>"+ ev.room;
});
~~~


## Initialisierung

Um das Template-Control im Lightbox-Dialog zu verwenden, sind folgende Schritte notwendig:
1. Den Abschnitt in der Lightbox-Konfiguration hinzufügen:
~~~js
scheduler.config.lightbox.sections = [
    { name:"text", ... },
       { name:"template", height: 40, type:"template", map_to:"my_template"},
    { name:"time", ...}
];
~~~
2. Das Label für den Abschnitt festlegen:
~~~js
scheduler.locale.labels.section_template = 'Details';
~~~
3. Den Inhalt für das Control bereitstellen, zum Beispiel über das Event [onBeforeLightbox](api/event/onbeforelightbox.md):
~~~js
scheduler.attachEvent("onBeforeLightbox", function(id) {
    var ev = scheduler.getEvent(id);
    ev.my_template = "<b>Holder:</b>"+ ev.holder+"

<b>Room:</b>"+ ev.room;
    return true;
});
~~~

  


## Eigenschaften

Hier sind einige wichtige Eigenschaften, die häufig für das 'template'-Control gesetzt werden (die vollständige Liste ist [lightbox](api/config/lightbox.md) verfügbar):

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) der Name des Abschnitts</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>height</b></td>
  <td>(<i>number</i>) die Höhe des Abschnitts</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>string</i>) der Name der Daten-Eigenschaft, die diesem Abschnitt zugeordnet ist</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) der Typ des Controls, das im Abschnitt verwendet wird</td>
  </tr>
  </tbody>
</table>
