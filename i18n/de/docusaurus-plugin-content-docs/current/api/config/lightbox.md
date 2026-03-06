---
sidebar_label: "lightbox"
title: "lightbox config"
description: "Definiert das lightbox Objekt"
---

# lightbox

### Description

@short: Definiert das lightbox Objekt

@signature: lightbox: any

### Example

~~~jsx
scheduler.config.lightbox.sections=[    
    { name:"description", height:50, type:"textarea", map_to:"text", focus:true},
    { name:"location",    height:43, type:"textarea", map_to:"event_location"},
    { name:"time",           height:72, type:"time",     map_to:"auto"}    
];
...            
scheduler.init('scheduler_here',new Date(2013,2,1),"week");
~~~

### Related samples
- [Checkbox in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/13_single_checkbox_section.html)
- [Radio button in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/14_radio_buttons_section.html)

### Details

Das lightbox Objekt beinhaltet eine Haupteigenschaft:

- **sections** - (*array*) definiert die im lightbox angezeigten Sektionen 

~~~js
//Standarddefinition 
scheduler.config.lightbox.sections=[
    {name:"description", height:200, map_to:"text", type:"textarea" , focus:true},
    {name:"time", height:72, type:"time", map_to:"auto"}
]
~~~

Jedes Element im **sections** Array kann folgende Eigenschaften haben:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) der Name der Sektion, den der scheduler nutzt, um das Label der Sektion aus der <i>locale.labels</i> Sammlung zu holen. Zum Beispiel wird das Label für die Sektion <b>'time'</b> als <b>scheduler.locale.labels.section_time</b> gefunden.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>height</b></td>
  <td>(<i>number</i>) die Höhe der Sektion</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>'auto' oder string</i>) der Name der Daten-Eigenschaft, die mit der Sektion verknüpft ist (Details unten)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) der Typ des Controls, das in der Sektion verwendet wird</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>time_format</b></td>
  <td>(<i>string</i>) definiert die Reihenfolge der Datums- und Zeitsteuerungen in der Sektion 'Time Period'</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>focus</b></td>
  <td>(<i>boolean</i>) wenn auf <i>true</i> gesetzt, erhält diese Sektion den Fokus, wenn die lightbox geöffnet wird</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>default_value</b></td>
  <td>(<i>any</i>) der Standardwert für das Control in der Sektion</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>onchange</b></td>
  <td>(<i>function</i>) der 'onChange' Event-Handler für das Control (<b>nur für 'select' Controls</b>)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>options</b></td>
  <td>(<i>Array von Objekten</i>) definiert die Auswahloptionen für Controls wie <b>'select', 'multiselect', 'radio', 'combo'</b>.<br> Jedes Objekt in diesem Array repräsentiert eine Option und hat folgende Eigenschaften:
  <ul><li><b>key</b> - (<i>string</i>) ID der Option, verwendet zum Abgleich mit Event-Daten-Eigenschaften</li><li><b>label</b> - (<i>string</i>) Anzeige-Label der Option</li></ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>vertical</b></td>
  <td>(<i>boolean</i>) bestimmt, ob Radio-Buttons vertikal (<i>true</i>) oder horizontal (<i>false</i>) angeordnet sind (<b>nur für 'select' Controls</b>)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>checked_value</b></td>
  <td>(<i>boolean</i>) Wert, der zugewiesen wird, wenn eine Checkbox aktiviert ist. Optional, Standard ist <i>true</i> (<b>nur für 'checkbox' Controls</b>)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>unchecked_value</b></td>
  <td>(<i>boolean</i>) Wert, der zugewiesen wird, wenn eine Checkbox deaktiviert ist. Optional, Standard ist <i>false</i> (<b>nur für 'checkbox' Controls</b>)</td>
  </tr>
  </tbody>
</table>

## Was bedeutet 'map_to:"auto"'?

Wenn die Eigenschaft 'map_to' auf 'auto' gesetzt ist:

- Das Control selbst gibt keinen Wert zurück, sondern aktualisiert direkt die Eigenschaften des Events über die Methode 'set_value()' (siehe [Benutzerdefiniertes Lightbox-Control](guides/custom-lightbox-editor.md)).
- Dies wird typischerweise für komplexe Controls verwendet, die mehrere Event-Eigenschaften gleichzeitig verwalten.

### Related Guides
- [Vollständig individuelles Lightbox](guides/custom-details-form.md)
