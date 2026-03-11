---
title: "Textarea"
sidebar_label: "Textarea"
---

# Textarea

Ein mehrzeiliges Texteingabefeld.

![textarea_editor](/img/textarea_editor.png)

~~~js
scheduler.locale.labels.section_text = 'Text';

scheduler.config.lightbox.sections = [
    { name:"text", height:50, map_to:"text", type:"textarea", focus:true },
    { name:"time", height:72, type:"time", map_to:"auto"}
];
~~~


[Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)


## Initialisierung

Standardmäßig enthält die Lightbox ein Textarea-Steuerelement. Um ein weiteres hinzuzufügen, gehen Sie wie folgt vor:
1. Binden Sie den neuen Abschnitt in die Lightbox-Konfiguration ein:
~~~js
scheduler.config.lightbox.sections = [
    { name:"text", ... },
       { name:"location", height:50, map_to:"location", type:"textarea"},
    { name:"time", ...}
];
~~~
2. Definieren Sie das Label für den neuen Abschnitt:
~~~js
scheduler.locale.labels.section_location = "Location";
~~~

  


[Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/19_map_view.html)


## Eigenschaften

Hier sind einige der wichtigsten Eigenschaften, die häufig mit dem 'textarea'-Steuerelement verwendet werden (die vollständige Liste finden Sie [lightbox](api/config/lightbox.md)):

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) Der Name des Abschnitts</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>height</b></td>
  <td>(<i>number</i>) Die Höhe des Abschnitts</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>string</i>) Der Name der Daten-Eigenschaft, die mit diesem Abschnitt verknüpft ist</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) Der Steuerelement-Typ des Abschnitts</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>placeholder</b></td>
  <td>(<i>string</i>) Platzhalter-Text, der angezeigt wird, wenn das Textfeld leer ist</td>
  </tr>
  </tbody>
</table>
