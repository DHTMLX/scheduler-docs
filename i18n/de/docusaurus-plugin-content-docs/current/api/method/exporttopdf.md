---
sidebar_label: "exportToPDF"
title: "exportToPDF method"
description: "exportiert einen Scheduler im PDF-Format"
---

# exportToPDF

### Description

@short: Exportiert einen Scheduler im PDF-Format

@signature: exportToPDF: (_export_?: any) =\> void

### Parameters

- `export` - (optional) *object* - ein Objekt mit Exporteinstellungen (siehe Details)

### Example

~~~jsx
scheduler.exportToPDF();
 
//oder
scheduler.exportToPDF({
  name: "myscheduler.pdf"
});

scheduler.exportToPDF({
    name:"myscheduler.pdf",
    format:"A4",
    orientation:"portrait",
    zoom:1,
    header:"<h1>Mein Unternehmen</h1>",
    footer:"<h4>Fußzeile</h4>",
    server:"https://myapp.com/myexport/scheduler"
});
~~~

### Details

:::note
 Diese Methode ist Teil der **export** Erweiterung, stellen Sie also sicher, dass sie auf Ihrer Seite eingebunden ist:
~~~html
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>  
~~~
Für weitere Informationen siehe den Artikel [Export nach PDF](export/pdf.md).
 
:::

Die **exportToPDF()** Methode akzeptiert ein Objekt mit verschiedenen optionalen Eigenschaften zur Anpassung des Exports:


<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) legt den Namen der exportierten PDF-Datei fest</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>format</b></td>
  <td>(<i>'A0', 'A1', 'A2', 'A3', 'A4', 'A5'</i>) definiert das Größenformat der exportierten PDF</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>orientation</b></td>
  <td>(<i>'portrait', 'landscape'</i>) legt die Seitenausrichtung der PDF fest</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>zoom</b></td>
  <td>(<i>number</i>) steuert den Zoom-Level des exportierten PDF-Inhalts</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) HTML-Inhalt, der als Kopfzeile in die PDF eingefügt wird</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) HTML-Inhalt, der als Fußzeile in die PDF eingefügt wird</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) die URL des API-Endpunkts, der die Exportanfrage verarbeitet. Dies kann auf einen lokalen Exportdienst verweisen. Standard ist <strong>https://export.dhtmlx.com/scheduler</strong></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>additional_settings</b></td>
  <td>(<i>object</i>) ein Objekt mit zusätzlichen Konfigurationsoptionen, darunter:
  <ul><li><b>format</b> - (<i>string</i>) legt das Ausgabeformat der Datei fest, z.B. <i>'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'</i></li><li><b>landscape</b> - (<i>boolean</i>) steuert, ob die Ausgabe im Hoch- oder Querformat erfolgt; wirksam nur wenn "format" gesetzt ist.</li><li><b>width</b> - (<i>string|number|"content"</i>) legt die Breite der Ausgabeseite fest, nützlich für mehrseitige Exporte.</li><li><b>height</b> - (<i>string|number|"content"</i>) legt die Höhe der Ausgabeseite fest, ebenfalls für mehrseitige Exporte verwendet.</li></ul></td>
  </tr>
  </tbody>
</table>

### Related Guides
- [Export nach PDF](export/pdf.md)
