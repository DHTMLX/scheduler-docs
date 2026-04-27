---
sidebar_label: "createGridView"
title: "createGridView method"
description: "richtet die Grid-Ansicht im Scheduler ein"
---

# createGridView
:::info
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Richtet die Grid-Ansicht im Scheduler ein

@signature: createGridView: (config: any) =\> void

### Parameters

- `config` - (required) *object* - Das Konfigurationsobjekt für die Grid-Ansicht

### Example

~~~jsx
scheduler.createGridView({
    name:"grid",
    fields:[
        {id:"id",       label:'Book Title',    width:'*',    align:'right',     sort:'str'},
        {id:"date",     label:'Author',     width:100},
        {id:"text",     label:'Votes',         width:200,    align:'left',    sort:'int'}
    ],
    from:new  Date(2000, 00, 01),
    to:new Date(2027, 00, 01)
});
~~~

**Applicable views:** [Grid view](views/grid.md)

### Related samples
- [Grid view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/27_grid_view.html)

### Details

:::note
 Um diese Methode zu verwenden, muss das [grid_view](guides/extensions-list.md#grid-view) Plugin aktiviert sein. 
:::

Das Konfigurationsobjekt der Grid-Ansicht unterstützt folgende Eigenschaften:
<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) Bezeichner für die Ansicht</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>fields</b></td>
  <td>(<i>Array von Objekten</i>) definiert die Spalten des Grids.<br> Jedes Objekt in diesem Array repräsentiert eine Spalte und kann folgende Eigenschaften enthalten:<ul><li><b>id</b> - (<i>string</i>) die ID der Spalte, die mit dem entsprechenden Datenfeldnamen übereinstimmen sollte</li><li><b>label</b> - (<i>string</i>) der Header-Text der Spalte</li><li><b>width</b> - (<i>string</i>) die Breite der Spalte. '*' bewirkt, dass die Spalte den verbleibenden Platz einnimmt. Bei mehreren '*' Spalten wird der verbleibende Platz gleichmäßig aufgeteilt.</li><li><b>align</b> - (<i>right, center oder left</i>) horizontale Textausrichtung</li><li><b>valign</b> - (<i>top, middle oder bottom</i>) vertikale Textausrichtung</li><li><b>template</b> - (<i>function</i>) benutzerdefinierte Template-Funktion für die Zellinhalte</li><li><b>sort</b> - (<i>'int','date','str' oder benutzerdefinierte Funktion</i>) aktiviert die Sortierung der Spalte (durch Klick auf den Header) mit vordefinierten Typen oder einer benutzerdefinierten Sortierfunktion</li><li><b>css</b> - (<i>string</i>) CSS-Klassenname, der auf die Spalte angewendet wird</li></ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>select</b></td>
  <td>(<i>boolean</i>) aktiviert oder deaktiviert die Auswahl im Grid (standardmäßig aktiviert)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>rowHeight</b></td>
  <td>(<i>number</i>) legt die Höhe jeder Zeile im Grid fest</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>paging</b></td>
  <td>(<i>boolean</i>) schaltet Navigationsbuttons ![navigation_buttons](/img/navigation_buttons.png) innerhalb des Grids ein oder aus [(mehr Infos)](views/grid.md)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>unit</b></td>
  <td>(<i>minute, hour, day, week, month, year</i>) definiert die Zeiteinheit für das Scrollen. Standard ist 'month'</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>step</b></td>
  <td>(<i>number</i>) Anzahl der Einheiten, die auf einmal gescrollt werden. Standard ist 1.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>from</b></td>
  <td>(<i>Date</i>) legt das Startdatum für den Datumsbereich des Schedulers fest</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>to</b></td>
  <td>(<i>Date</i>) legt das Enddatum für den Datumsbereich des Schedulers fest</td>
  </tr>
  </tbody>
</table>

### Related Guides
- [Grid-Ansicht](views/grid.md)
