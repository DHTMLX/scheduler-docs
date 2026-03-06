---
sidebar_label: "exportToPNG"
title: "exportToPNG method"
description: "Ermöglicht das Exportieren eines Schedulers als PNG-Bild"
---

# exportToPNG

### Description

@short: Ermöglicht das Exportieren eines Schedulers als PNG-Bild

@signature: exportToPNG: (_export_?: any) =\> void

### Parameters

- `export` - (optional) *object* - ein Objekt mit Exportoptionen (siehe Details unten)

### Example

~~~jsx
scheduler.exportToPNG();
 
//oder
scheduler.exportToPNG({
      name:"my_beautiful_scheduler.png"
});

scheduler.exportToPNG({
    format:"A4",
    orientation:"portrait",
    zoom:1,
    header:"<h1>My company</h1>",
    footer:"<h4>Bottom line</h4>",
    server:"https://myapp.com/myexport/scheduler"
});
~~~

### Details

:::note
 Diese Methode ist Teil der **export** Extension, stellen Sie also sicher, dass diese auf Ihrer Seite eingebunden ist:
~~~html
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>  
~~~
Für weitere Informationen lesen Sie den Artikel [Export nach PNG](export/png.md).
 
:::

Die **exportToPNG()** Methode akzeptiert ein Objekt mit verschiedenen optionalen Eigenschaften:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) der Dateiname für das exportierte PNG</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>format</b></td>
  <td>(<i>'A0', 'A1', 'A2', 'A3', 'A4', 'A5'</i>) die Seitengröße für die PNG-Ausgabe</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>orientation</b></td>
  <td>(<i>'portrait', 'landscape'</i>) die Layout-Ausrichtung des PNG-Bildes</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>zoom</b></td>
  <td>(<i>number</i>) legt den Zoomfaktor für das exportierte PNG fest</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) HTML-Inhalt, der oben im PNG-Bild eingefügt wird</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) HTML-Inhalt, der unten im PNG-Bild eingefügt wird</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) der API-Endpunkt, der für die Export-Anfrage verwendet wird. Dies kann auf einen lokal installierten Export-Service zeigen. Standard ist <strong>https://export.dhtmlx.com/scheduler</strong></td>
  </tr>
  </tbody>
</table>

### Related Guides
- [Export nach PNG](export/png.md)
