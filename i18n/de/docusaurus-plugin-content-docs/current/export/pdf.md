--- 
title: "Export nach PDF"
sidebar_label: "Export nach PDF"
---

# Export nach PDF

*Der Artikel bezieht sich auf den Export von dhtmlxScheduler 4.1+. Wenn Sie dhtmlxScheduler 4.0 oder frühere Versionen verwenden, finden Sie Details [hier](export/pdf-legacy.md).*

Ab Version 4.1 bietet dhtmlxScheduler einen neuen Ansatz für den Export des Schedulers in das PDF-Format: einen [Online-Export-Service](export/pdf.md#default-export-to-pdf).

:::info
Der Dienst ist kostenlos, aber die Ausgabe-PDF-Datei enthält das Wasserzeichen der Bibliothek unter der GPL-Lizenz. Falls Sie eine Lizenz erwerben, ist das Export-Ergebnis während der gültigen Support-Periode (12 Monate für alle PRO-Lizenzen) ohne Wasserzeichen verfügbar.
:::

## Verwendung von Export-Services

Es gibt mehrere Export-Services. Sie können sie auf Ihrem Computer installieren und Scheduler lokal nach PDF exportieren.

Hinweis: Export-Services sind nicht im Scheduler-Paket enthalten. Lesen Sie den entsprechenden Artikel, um die Nutzungsbedingungen jedes einzelnen zu erfahren.

## Grenzen bei der Anforderungsgröße

Es gibt einen gemeinsamen API-Endpunkt `https://export.dhtmlx.com/scheduler`, der Export-Methoden wie `exportToPDF()` und `exportToPNG()` bereitstellt. Die maximale Anforderungsgröße beträgt 10 MB.

## Standard-Export nach PDF

Um einen Scheduler als PDF-Dokument zu exportieren, führen Sie die folgenden Schritte aus:

- Um den Online-Export-Service zu verwenden, aktivieren Sie das `export_api`-Plugin über die [`plugins()`](api/method/plugins.md) Methode:

~~~js
scheduler.plugins({
    export_api: true
});
~~~

:::note
Wenn Sie eine Scheduler-Version verwenden, die älter als 7.0 ist, müssen Sie die Datei `https://export.dhtmlx.com/scheduler/api.js` in Ihre Seite einbinden, um den Online-Export-Service zu aktivieren, z. B.:

~~~html
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>
~~~
:::

- Rufen Sie die [`exportToPDF()`](#parameters-of-the-export-method) Methode auf, um Scheduler zu exportieren:

~~~html {1}
<input value="Export to PDF" type="button" onclick='scheduler.exportToPDF()'>
~~~


### Zu den Beispielen
- [Export nach PDF/PNG](https://docs.dhtmlx.com/scheduler/samples/04_export/06_online_export.html)

## Parameter der Export-Methode

Die [`exportToPDF()`](api/method/exporttopdf.md) Methode nimmt ein Objekt mit mehreren Eigenschaften als Parameter entgegen. Alle Eigenschaften sind optional:


<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) der Name der Ausgabedatei</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>format</b></td>
  <td>(<i>'A0', 'A1', 'A2', 'A3', 'A4', 'A5'</i>) das Format der Ausgabedatei im PDF-Format</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>orientation</b></td>
  <td>(<i>'portrait', 'landscape'</i>) legt die Orientierung des Ausgabedokuments fest</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>zoom</b></td>
  <td>(<i>number</i>) legt den Zoomkoeffizienten des Ausgabedokuments fest</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) gibt den Header an, der dem Ausgabedokument hinzugefügt wird. Hinweis: Hier können Sie beliebiges HTML verwenden</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) gibt den Footer an, der dem Ausgabedokument hinzugefügt wird. Hinweis: Hier können Sie beliebiges HTML verwenden</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) legt den API-Endpunkt für die Anfrage fest. Kann zusammen mit der lokalen Installation des Export-Services verwendet werden. Der Standardwert ist <strong>https://export.dhtmlx.com/scheduler</strong></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>additional_settings</b></td>
  <td>(<i>object</i>) ein Objekt mit zusätzlichen Einstellungen. Das Objekt kann folgende Attribute enthalten: <ul> <li><b>format</b> - (<i>string</i>) das Format der Ausgabedatei: <i>'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'</i></li> <li><b>landscape</b> - (<i>boolean</i>) Hoch- oder Querformat der Ausgabedatei. Das Attribut funktioniert nur, wenn das "format" Attribut angegeben ist.</li> <li><b>width</b> - (<i>string|number|"content"</i>) die Breite der Ausgabeseite. Das Attribut wird verwendet, wenn mehrere Seiten exportiert werden. </li> <li><b>height</b> - (<i>string|number|"content"</i>) die Höhe der Ausgabedatei. Das Attribut wird verwendet, wenn mehrere Seiten exportiert werden.</li> </ul></td>
  </tr>
  </tbody>
</table>

### Aufruf der Export-Methode mit optionalen Eigenschaften
~~~js
scheduler.exportToPDF({
    name: "myscheduler.pdf",
    format: "A4",
    orientation: "portrait",
    zoom: 1,
    header: "<h1>My company</h1>",
    footer: "<h4>Bottom line</h4>",
    server: "https://myapp.com/myexport/scheduler"
});
~~~


## Name der Ausgabedatei

Um einen benutzerdefinierten Namen für die Ausgabedatei festzulegen, verwenden Sie die `name`-Eigenschaft im Parameter der [`exportToPDF()`](export/pdf.md#parameters-of-the-export-method) Methode:

~~~js {2}
scheduler.exportToPDF({
    name: "my_beautiful_scheduler.pdf"
});
~~~


## Header/Footer der Ausgabedatei

Um der Ausgabedatei PDF einen Header/Footer hinzuzufügen, verwenden Sie die Eigenschaften `header`/`footer` im Parameter der [`exportToPDF()`](export/pdf.md#parameters-of-the-export-method) Methode:

:::note
Beachten Sie, dass Sie beim Festlegen der Parameter beliebiges HTML verwenden können. Wenn Sie Bilder angeben, denken Sie daran, globale Pfade als Werte des src-Attributs festzulegen.
:::

~~~js {3-4}
scheduler.exportToPDF({
    name: "myscheduler.pdf",
    header: "<h1>My company</h1>",
    footer: "<h4>Bottom line</h4>"
});
~~~


## Benutzerdefinierter Stil für die Ausgabedatei

Um dem Scheduler einen benutzerdefinierten Stil zu verleihen, liefern Sie das Stylesheet mit Ihren benutzerdefinierten CSS-Klassen:

- über einen Link:

~~~js {3}
scheduler.exportToPDF({
    name: "calendar.pdf",
    header: '<link rel="stylesheet" href="http://mysite.com/custom.css">'
});
~~~

- oder über das 'style'-Tag:

~~~js {3}
scheduler.exportToPDF({
    name: "calendar.pdf",
    header: '<style>... benutzerdefinierte CSS-Klassen hier ...</style>'
});
~~~

Beachten Sie, dass die oben genannte Lösung für den globalen HTTP-Verweis funktioniert. Wenn Sie CSS-Klassen in einer Intranet-/ lokalen Umgebung verwenden, können Sie alle Stile wie folgt einbetten:

~~~js
scheduler.exportToPDF({
    header: "<style>.tier1{background: red; color:white;}</style>"
});
~~~

## Export von HTML-Elementen

Beim Export des Schedulers ins PDF-Format ist der Export von HTML-Elementen aufgrund möglicher Sicherheitsbedenken eingeschränkt.

Es gibt HTML-Elemente, die beim Export nicht vollständig erlaubt sind, wie z. B. `<canvas>`, `<svg>`, `<script>` und Bilder mit dem *src*-Attribut, das ein Base64-Bild enthält. Es gibt jedoch sichere Möglichkeiten, Bilder im SVG- oder Base64-Format zu exportieren:

- Sie können ein `<img>`-Element mit dem *src*-Attribut verwenden, das eine URL des Bildes im SVG-Format enthält (geeignet für PNG- und JPG-Formate, funktioniert nicht für das Base64-Format), z. B.:

~~~html
<img src="https://www.svgrepo.com/download/530597/hat.svg">
~~~

- Sie können Style-Elemente verwenden, wie *background* oder *background-image* und das `url`-Attribut mit dem Link zum Bild oder einem Bild im Base64-Format als Wert angeben (geeignet für PNG/JPG/SVG-Formate)

~~~css
.red {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH1ggDCwMADQ4NnwAAAFVJREFUGJWNkMEJADEIBEcbSDkXUnfSgnBVeZ8LSAjiwjyEQXSFEIcHGP9oAi+H0Bymgx9MhxbFdZE2a0s9kTZdw01ZhhYkABSwgmf1Z6r1SNyfFf4BZ+ZUExcNUQUAAAAASUVORK5CYII=") 100%/contain no-repeat;
    display: inline-block;
    width: 32px;
    height: 32px;
}
~~~


Wenn Sie ein Export-Modul haben und HTML-Elemente exportieren müssen, die von unserem Online-Export-Server nicht unterstützt werden, können Sie eine Support-Anfrage einreichen, um Anweisungen zu erhalten, welche Änderungen Sie an Ihrem Modul vornehmen müssen, um die Einschränkungen zu entfernen. Beachten Sie jedoch, dass Ihr Server gegenüber XSS-Angriffen anfällig wird.