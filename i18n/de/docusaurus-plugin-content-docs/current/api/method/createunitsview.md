---
sidebar_label: "createUnitsView"
title: "createUnitsView method"
description: "richtet die Units-Ansicht im Scheduler ein"
---

# createUnitsView
:::info
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Richtet die Units-Ansicht im Scheduler ein

@signature: createUnitsView: (config: any) =\> void

### Parameters

- `config` - (required) *object* - die Konfigurationsobjekt für die Units-Ansicht

### Example

~~~jsx
scheduler.createUnitsView({
    name:"unit",
    property:"unit_id",
    list:[
        {key:1, label:"Section A"},
        {key:2, label:"Section B"},
        {key:3, label:"Section C"}    
    ]
});

scheduler.init('scheduler_here',new Date(2009,5,30),"unit");

scheduler.parse([
 {start_date:"06/30/2009 09:00",end_date:"06/30/2009 12:00",text:"Task1",unit_id:1},
 {start_date:"06/30/2009 12:00",end_date:"06/30/2009 20:00",text:"Task2",unit_id:3},
 {start_date:"06/30/2009 08:00",end_date:"06/30/2009 12:00",text:"Task3",unit_id:2}
],"json");
~~~

**Applicable views:** [Units view](views/units.md)

### Related samples
- [Units view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/02_units_view.html)
- [Loading Units sections from the server](https://docs.dhtmlx.com/scheduler/samples/03_extensions/17_connector_units.html)

### Details

:::note
 Um diese Methode zu verwenden, muss das [units](guides/extensions-list.md#units) Plugin aktiviert sein. 
:::

Das Konfigurationsobjekt für die Units-Ansicht unterstützt die folgenden Eigenschaften:
<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) der Bezeichner für die Ansicht. Falls bereits eine Units-Ansicht mit diesem Namen existiert, wird sie ersetzt</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>property</b></td>
  <td>(<i>string</i>) gibt die Daten-Eigenschaft an, die verwendet wird, um Events mit bestimmten Units zu verknüpfen</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>list</b></td>
  <td>(<i>Array von Objekten</i>) definiert die in der Ansicht dargestellten Units.<br> Jedes Objekt im Array repräsentiert eine einzelne Unit und enthält:<ul><li><b>key</b> - (<i>string</i>) die eindeutige ID der Unit. Dieser Wert wird mit der Event-Daten-Eigenschaft abgeglichen, um Events den Units zuzuordnen</li><li><b>label</b> - (<i>string</i>) die Anzeige-Bezeichnung der Unit</li></ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>days</b></td>
  <td>(<i>number</i>) Anzahl der Elemente (Tage), die entlang der Y-Achse angezeigt werden</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>skip_incorrect</b></td>
  <td>(<i>boolean</i>) wenn auf <i>true</i> gesetzt, werden Events, die keiner Unit entsprechen, nicht angezeigt. Ist der Wert <i>false</i>, werden solche Events der ersten Unit zugewiesen. Standard ist <i>false</i>. Optional</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>size</b></td>
  <td>(<i>number</i>) Anzahl der Units, die gleichzeitig angezeigt werden. Überschreitet die tatsächliche Anzahl diesen Wert, erscheint eine Scrollbar. Optional</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>step</b></td>
  <td>(<i>number</i>) Anzahl der Units, um die beim Scrollen jeweils gesprungen wird. Optional</td>
  </tr>
  </tbody>
</table>
