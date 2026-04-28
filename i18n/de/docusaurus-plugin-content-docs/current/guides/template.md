---
title: "Template"
sidebar_label: "Template"
---

# Template 

Ein Container mit etwas HTML-Inhalt darin.

![template_editor](/img/template_editor.png)


~~~js
scheduler.locale.labels.section_template = 'Details';// sets the name of the section

scheduler.config.lightbox.sections = [
    { name:"text", height:50, map_to:"text", type:"textarea", focus:true},
    { name:"template", height: 40, type:"template", map_to:"my_template"},
    { name:"time", height:72, type:"time", map_to:"auto"}
];
scheduler.attachEvent("onEventCreated", function(id, e) {
    const ev = scheduler.getEvent(id);
    ev.my_template = "<b>Holder:</b>"+ ev.holder+"

<b>Room:</b>"+ ev.room;
});
~~~

## Initialisierung

Um die Template-Steuerung zur Lightbox hinzuzufügen, folgen Sie diesen Schritten:
1. <b>Fügen Sie den Abschnitt zur Lightbox-Konfiguration hinzu:</b>
~~~js
scheduler.config.lightbox.sections = [
    { name:"text", ... },
       { name:"template", height: 40, type:"template", map_to:"my_template"},
    { name:"time", ...}
];
~~~
2. <b>Setzen Sie die Bezeichnung für den Abschnitt:</b>
~~~js
scheduler.locale.labels.section_template = 'Details';
~~~
3. <b>Stellen Sie den Inhalt der Steuerung mit Hilfe eines Ereignisses ein, z. B. des [onBeforeLightbox](api/event/onbeforelightbox.md) Ereignisses:</b>
~~~js
scheduler.attachEvent("onBeforeLightbox", function(id) {
    const ev = scheduler.getEvent(id);
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
  <td>(<i>string</i>) Name des Abschnitts</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>height</b></td>
  <td>(<i>number</i>) Höhe des Abschnitts</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>string</i>) der Name einer Dateneigenschaft, die dem Abschnitt zugeordnet wird</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) der Typ der Steuerung des Abschnitts</td>
  </tr>
  </tbody>
</table>