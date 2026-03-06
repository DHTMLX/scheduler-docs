---
title: "Export nach PNG"
sidebar_label: "Export nach PNG"
---

# Export nach PNG

Ab Version 4.1 bietet dhtmlxScheduler einen [Online-Exportdienst](export/png.md#defaultexporttopng) an, mit dem Sie den Scheduler als PNG-Bild exportieren können.

:::note
Der Dienst ist kostenlos, aber das exportierte PNG enthält ein Wasserzeichen der Bibliothek unter der GPL-Lizenz. Wenn Sie eine Lizenz erwerben, werden Exporte während des aktiven Supportzeitraums (12 Monate für alle PRO-Lizenzen) ohne Wasserzeichen erstellt.
:::

## Verwendung von Exportdiensten {#usingexportservices}

Es stehen verschiedene Exportdienste zur Verfügung. Sie können diese lokal auf Ihrem Rechner installieren, um den Scheduler ohne Nutzung des Online-Dienstes als PNG zu exportieren.

Beachten Sie, dass Exportdienste nicht im Scheduler-Paket enthalten sind. Details zu den Nutzungsbedingungen der einzelnen Dienste finden Sie im [zugehörigen Artikel](https://dhtmlx.com/docs/products/dhtmlxScheduler/export.shtml).

## Grenzen der Anfragegröße {#limitsonrequestsize}

Alle Exportmethoden (*exportToPDF*, *exportToPNG*, usw.) verwenden den gemeinsamen API-Endpunkt **https://export.dhtmlx.com/scheduler**. Die maximal zulässige Anfragegröße beträgt **10 MB**.


## Standard-Export nach PNG {#defaultexporttopng}

Um den Scheduler als PNG-Bild zu exportieren, gehen Sie wie folgt vor:

- Aktivieren Sie das <b>export_api</b>-Plugin mit der Methode [plugins](api/method/plugins.md):

~~~js
scheduler.plugins({
      export_api: true
});
~~~

:::note
Für Scheduler-Versionen älter als 7.0 müssen Sie zusätzlich das Skript **https://export.dhtmlx.com/scheduler/api.js** auf Ihrer Seite einbinden, um den Online-Exportdienst zu aktivieren, zum Beispiel:

~~~js
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>
~~~
:::

- Verwenden Sie die <a href="#parametersoftheexportmethod">exportToPNG</a>-Methode, um den Export auszulösen:

~~~html
<input value="Export to PNG" type="button" onclick='scheduler.exportToPNG()'>/*!*/
~~~


[Export to PDF/PNG](https://docs.dhtmlx.com/scheduler/samples/04_export/06_online_export.html)


## Parameter der Exportmethode {#parametersoftheexportmethod}

Die Methode [exportToPNG()](api/method/exporttopng.md) akzeptiert ein Objekt mit mehreren optionalen Eigenschaften:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) Gibt den Namen der Ausgabedatei an</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>format</b></td>
  <td>(<i>'A0', 'A1', 'A2', 'A3', 'A4', 'A5'</i>) Legt das Format des PNG-Ausgabebildes fest</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>orientation</b></td>
  <td>(<i>'portrait', 'landscape'</i>) Legt die Ausrichtung des PNG-Ausgabebildes fest</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>zoom</b></td>
  <td>(<i>number</i>) Steuert den Zoomfaktor des PNG-Ausgabebildes</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) Fügt dem PNG-Ausgabebild einen Header hinzu; hier kann beliebiges HTML verwendet werden</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) Fügt dem PNG-Ausgabebild einen Footer hinzu; hier kann beliebiges HTML verwendet werden</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) Gibt den API-Endpunkt für die Exportanfrage an. Nützlich, wenn Sie einen lokalen Exportdienst betreiben. Standard ist <strong>https://export.dhtmlx.com/scheduler</strong></td>
  </tr>
  </tbody>
</table>


~~~js title="Beispiel für den Aufruf der Exportmethode mit optionalen Eigenschaften"
scheduler.exportToPNG({
    format:"A4",
    orientation:"portrait",
    zoom:1,
    header:"<h1>My company</h1>",
    footer:"<h4>Bottom line</h4>",
    server:"https://myapp.com/myexport/scheduler"
});
~~~


## Name der Ausgabedatei {#nameoftheoutputfile}

Sie können einen eigenen Dateinamen für das exportierte PNG mit der **name**-Eigenschaft in der 
[exportToPNG](export/png.md#parametersoftheexportmethod)-Methode festlegen:

~~~js
scheduler.exportToPNG({
    name:"my_beautiful_scheduler.png"/*!*/
});
~~~


## Header/Footer der Ausgabedatei {#headerfooteroftheoutputfile}

Um einen Header oder Footer im PNG auszugeben, verwenden Sie die Eigenschaften **header** und **footer** in der 
[exportToPNG](export/png.md#parametersoftheexportmethod)-Methode:

:::note
Sie können hier beliebiges HTML einfügen. Beim Einbinden von Bildern achten Sie darauf, globale URLs im "src"-Attribut zu verwenden.
:::

~~~js
scheduler.exportToPNG({
    name:"myscheduler.png",
    header:"<h1>My company</h1>",
    footer:"<h4>Bottom line</h4>"
});
~~~


## Eigene Styles für die Ausgabedatei {#customstylefortheoutputfile}

Um eigene Styles für den exportierten Scheduler zu verwenden, fügen Sie Ihr CSS auf eine der folgenden Arten hinzu:

- Binden Sie ein Stylesheet per Link ein:

~~~js
scheduler.exportToPNG({
    name:"calendar.png",
    header:'<link rel="stylesheet" href="http://mysite.com/custom.css">' /*!*/
});
~~~

- Oder betten Sie Styles direkt mit einem 'style'-Tag ein:

~~~js
scheduler.exportToPNG({
    name:"calendar.png",
    header:'<style>... custom css classes here ...</style>' /*!*/
});
~~~

Wenn Ihr CSS lokal oder im Intranet gehostet ist, können Sie alle Styles inline einbinden, z. B.:

~~~js
scheduler.exportToPNG({
    header:"<style>.tier1{   background: red;   color:white;}</style>"
});
~~~


## Export von HTML-Elementen {#exportinghtmlelements}

Beim Export des Schedulers nach PNG ist zu beachten, dass der Export bestimmter HTML-Elemente aus Sicherheitsgründen eingeschränkt ist.

Elemente wie `<canvas>`, `<svg>`, `<script>` und Bilder mit Base64-*src*-Attributen werden nicht vollständig unterstützt. Es gibt jedoch sichere Möglichkeiten, Bilder im SVG- und Base64-Format einzubinden:

- Verwenden Sie ein `<img>`-Tag mit einem *src*-Attribut, das auf eine SVG-Bild-URL verweist (funktioniert für PNG- und JPG-Exporte, aber nicht für Base64), zum Beispiel:

~~~html
<img src="https://www.svgrepo.com/download/530597/hat.svg">
~~~

- Verwenden Sie CSS-Styles wie *background* oder *background-image* mit einer `url`, die auf eine Bild-URL oder ein Base64-codiertes Bild verweist (funktioniert mit PNG/JPG/SVG-Exporten):

~~~css
.red {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH1ggDCwMADQ4NnwAAAFVJREFUGJWNkMEJADEIBEcbSDkXUnfSgnBVeZ8LSAjiwjyEQXSFEIcHGP9oAi+H0Bymgx9MhxbFdZE2a0s9kTZdw01ZhhYkABSwgmf1Z6r1SNyfFf4BZ+ZUExcNUQUAAAAASUVORK5CYII=") 100%/contain no-repeat;
    display: inline-block;
    width: 32px;
    height: 32px;
}
~~~

Wenn Sie ein eigenes Exportmodul haben und HTML-Elemente exportieren müssen, die vom Online-Exportserver nicht unterstützt werden, können Sie den Support kontaktieren, um Hinweise zu erhalten, wie Sie Ihr Modul anpassen können, um diese Einschränkungen zu entfernen. Beachten Sie jedoch, dass dies Ihren Server für XSS-Sicherheitslücken anfällig machen kann.
