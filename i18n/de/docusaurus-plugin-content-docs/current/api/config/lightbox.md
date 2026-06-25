---
sidebar_label: "lightbox"
title: "lightbox config"
description: "Definiert das lightbox Objekt"
---

# lightbox

### Description

@short: Legt das Lightbox-Objekt fest

@signature: lightbox: any

### Example

~~~jsx
scheduler.config.lightbox.sections = [
    { name: "description", height: 50, type: "textarea", map_to: "text", focus: true },
    { name: "location", height: 43, type: "textarea", map_to: "event_location" },
    { name: "time", height: 72, type: "time", map_to: "auto" }
];
...
scheduler.init('scheduler_here', new Date(2027, 2, 1), "week");
~~~

### Related samples
- [Kontrollkästchen im Lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/13_single_checkbox_section.html)
- [Radiobutton im Lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/14_radio_buttons_section.html)

### Details

Das Lightbox-Objekt besitzt 1 Eigenschaft:

- `sections` - (*array*) definiert die Lightbox-Sektionen

~~~js
// Standarddefinition
scheduler.config.lightbox.sections = [
    { name: "description", height: 200, map_to: "text", type: "textarea", focus: true },
    { name: "time", height: 72, type: "time", map_to: "auto" }
];
~~~



Jedes Objekt im Array **sections** kann die folgenden Eigenschaften haben:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) der Name der Sektion (entsprechend diesem Namen zieht der Scheduler das Label der Sektion aus der <i>locale.labels</i>-Sammlung). Zum Beispiel wird für die <b>'time'</b>-Sektion das Label aus <b>`scheduler.locale.labels.section_time`</b> entnommen.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>height</b></td>
  <td>(<i>number</i>) die Höhe der Sektion</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>'auto' or string</i>) der Name einer Dateneigenschaft, die der Sektion zugeordnet wird (siehe Details unten)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) der Typ des Steuerelements der Sektion (Editor)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>time_format</b></td>
  <td>(<i>string</i>) legt die Reihenfolge der Datum-Uhrzeit-Steuerelemente im Abschnitt 'Time Period' fest</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>focus</b></td>
  <td>(<i>boolean</i>) wenn auf <i>true</i> gesetzt, erhält die Sektion beim Öffnen des Lightbox den Fokus</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>default_value</b></td>
  <td>(<i>any</i>) der Standardwert des Steuerelements der Sektion</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>onchange</b></td>
  <td>(<i>function</i>) legt die Funktion als 'onChange'-Ereignishandler für das Steuerelement der Sektion fest (<b>nur für das 'select'-Steuerelement</b>)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>options</b></td>
  <td>(<i>array of objects</i>) definiert die Optionen des Steuerelements (<b>für 'select', 'multiselect', 'radio', 'combo' Steuerelemente</b>).<br>Jedes Objekt im Array spezifiziert eine einzelne Option und besitzt diese Eigenschaften:<ul><li><b>key</b> - (<i>string</i>) die Option-ID. Dieses Attribut wird mit der Event-Daten-Eigenschaft verglichen, um die Optionen den Events zuzuordnen</li><li><b>label</b> - (<i>string</i>) die Bezeichnung der Option</li></ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>vertical</b></td>
  <td>(<i>boolean</i>) legt fest, ob Radiobuttons vertikal (<i>true</i>) oder horizontal (<i>false</i>) angeordnet werden (<b>nur für das 'select'-Steuerelement</b>)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>checked_value</b></td>
  <td>(<i>boolean</i>) der Wert des Kontrollkästchens im ausgewählten Zustand. Optional. Standardmäßig <i>true</i> (<b>für das 'checkbox'-Steuerelement</b>)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>unchecked_value</b></td>
  <td>(<i>boolean</i>) der Wert des Kontrollkästchens im nicht ausgewählten Zustand. Optional. Standardmäßig <i>false</i> (<b>für das 'checkbox'-Steuerelement</b>)</td>
  </tr>
  </tbody>
</table>

## Meaning of `map_to: "auto"`

Die Eigenschaft `map_to` kann den Wert `"auto"` annehmen. Der Wert `"auto"` bezieht sich auf Folgendes:

- Das Steuerelement liefert keinen Wert zurück und ändert direkt die entsprechenden Eigenschaften des zugehörigen Ereignisses gemäß der Methode `set_value()` ([Custom Lightbox Control](guides/custom-lightbox-editor.md)).
- Allgemein wird der Wert `"auto"` für komplexe Steuerelemente verwendet, die mit mehreren Eigenschaften eines Ereignisses arbeiten

### Related Guides
- [Vollständig angepasste Lightbox](guides/custom-details-form.md)