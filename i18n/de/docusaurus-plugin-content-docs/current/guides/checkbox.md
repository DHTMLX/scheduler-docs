---
title: "Checkbox"
sidebar_label: "Checkbox"
---

# Checkbox 

Eine einfache Checkbox mit zwei Zuständen.

![checkbox_editor](/img/checkbox_editor.png)

~~~js        
scheduler.locale.labels.section_checkme = "Ich werde teilnehmen";     
            
scheduler.config.lightbox.sections = [
    { name:"text", height:50, map_to:"text", type:"textarea", focus:true },
    { name:"checkme", map_to:"participation", type:"checkbox", 
    checked_value: "registrable", unchecked_value: "unchecked", height:40 },
    { name:"time", height:72, type:"time", map_to:"auto"}
];
~~~            

[Checkbox in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/13_single_checkbox_section.html)


## Initialisierung

Um das Checkbox-Element im Lightbox-Dialog einzubinden, sind folgende Schritte notwendig:

1. Aktivieren Sie die **editors**-Erweiterung auf der Seite:
~~~js
scheduler.plugins({
    editors: true
});
~~~
2. Fügen Sie die Checkbox-Sektion zur Lightbox-Konfiguration hinzu:
~~~js
scheduler.config.lightbox.sections = [
    { name:"description", ... },
    { name:"checkme", map_to:"single_checkbox", type:"checkbox", 
    checked_value: "registrable", height:40},
    { name:"time", ...}
];
~~~
3. Definieren Sie das Label für die Checkbox-Sektion:
~~~js
scheduler.locale.labels.section_checkme = "Ich werde teilnehmen"; 
~~~
  

[Checkbox in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/13_single_checkbox_section.html)


## Eigenschaften

Hier sind die wichtigsten Eigenschaften, die üblicherweise mit dem 'checkbox'-Steuerelement verwendet werden (eine vollständige Liste finden Sie [hier](api/config/lightbox.md)):

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) Der Bezeichner für die Sektion</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>height</b></td>
  <td>(<i>number</i>) Die Höhe der Sektion</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>string</i>) Die Daten-Eigenschaft, die mit dieser Sektion verknüpft ist</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) Der Steuerelement-Typ der Sektion</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>checked_value</b></td>
  <td>(<i>boolean</i>) Der Wert, der gesetzt wird, wenn die Checkbox aktiviert ist. Optional, Standardwert ist <i>true</i></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>unchecked_value</b></td>
  <td>(<i>boolean</i>) Der Wert, der gesetzt wird, wenn die Checkbox deaktiviert ist. Optional, Standardwert ist <i>false</i></td>
  </tr>
  </tbody>
</table>
