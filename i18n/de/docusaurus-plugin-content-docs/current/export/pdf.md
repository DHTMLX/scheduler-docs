---
title: "Export nach PDF"
sidebar_label: "Export nach PDF"
---

# Export nach PDF

*Dieser Artikel behandelt den Export mit dhtmlxScheduler Version 4.1 und neuer. Für Versionen 4.0 oder älter lesen Sie bitte [diese Anleitung](export/pdf-legacy.md).*

Seit Version 4.1 bietet dhtmlxScheduler eine neue Möglichkeit, den Scheduler als PDF-Datei zu exportieren, indem ein [Online-Exportdienst](export/pdf.md#default-export-to-pdf) verwendet wird.

:::note
Der Dienst ist kostenlos nutzbar, aber unter der GPL-Lizenz generierte PDFs enthalten ein Wasserzeichen der Bibliothek. Beim Kauf einer Lizenz wird das Wasserzeichen während des aktiven Supportzeitraums entfernt (12 Monate für alle PRO-Lizenzen).
:::

## Verwendung von Exportdiensten {#using-export-services}

Es stehen mehrere Exportdienste zur Verfügung, die lokal auf Ihrem Rechner installiert werden können, um den Scheduler nach PDF zu exportieren.

Beachten Sie, dass Exportdienste unabhängig vom Scheduler-Paket sind. Weitere Informationen zu den Nutzungsbedingungen finden Sie im [zugehörigen Artikel](https://dhtmlx.com/docs/products/dhtmlxScheduler/export.shtml).

## Grenzen der Anfragegröße {#limitsonrequestsize}

Der API-Endpunkt <b>*https://export.dhtmlx.com/scheduler*</b> verarbeitet Exportanfragen (*exportToPDF*, *exportToPNG*, usw.). Die maximal zulässige Anfragegröße beträgt **10 MB**.
 
## Standard-Export nach PDF {#default-export-to-pdf}

Um den Scheduler als PDF zu exportieren, gehen Sie wie folgt vor:

- Aktivieren Sie das <b>export_api</b>-Plugin mit der Methode [plugins](api/method/plugins.md):

~~~js
scheduler.plugins({
      export_api: true
});
~~~

:::note
Für Scheduler-Versionen vor 7.0 binden Sie das Skript **https://export.dhtmlx.com/scheduler/api.js** auf Ihrer Seite ein, um den Online-Exportdienst zu aktivieren, zum Beispiel:

~~~js
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>
~~~
:::

- Verwenden Sie die <a href="#parametersoftheexportmethod">exportToPDF</a>-Methode, um den Export auszuführen:

~~~html
<input value="Export to PDF" type="button" onclick='scheduler.exportToPDF()'>/*!*/
~~~


[Export to PDF/PNG](https://docs.dhtmlx.com/scheduler/samples/04_export/06_online_export.html)


## Parameter der Exportmethode {#parametersoftheexportmethod}

Die [exportToPDF()](api/method/exporttopdf.md)-Methode akzeptiert ein optionales Objekt als Parameter mit verschiedenen Eigenschaften:


<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) Dateiname für das exportierte PDF</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>format</b></td>
  <td>(<i>'A0', 'A1', 'A2', 'A3', 'A4', 'A5'</i>) Papierformat für die PDF-Ausgabe</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>orientation</b></td>
  <td>(<i>'portrait', 'landscape'</i>) Ausrichtung der PDF-Seiten</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>zoom</b></td>
  <td>(<i>number</i>) Zoomstufe für die PDF-Ausgabe</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) HTML-Inhalt, der als Kopfzeile im PDF enthalten sein soll</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) HTML-Inhalt, der als Fußzeile im PDF enthalten sein soll</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) API-Endpunkt-URL für Exportanfragen. Nützlich bei Verwendung eines lokalen Exportdienstes. Standardmäßig <strong>https://export.dhtmlx.com/scheduler</strong></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>additional_settings</b></td>
  <td>(<i>object</i>) Zusätzliche Exportoptionen, darunter: <ul> <li><b>format</b> - (<i>string</i>) Ausgabeformat: <i>'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'</i></li> <li><b>landscape</b> - (<i>boolean</i>) Seitenausrichtung, nur relevant wenn "format" angegeben ist</li> <li><b>width</b> - (<i>string|number|"content"</i>) Breite der Ausgabeseite, relevant für Mehrseitenexporte</li> <li><b>height</b> - (<i>string|number|"content"</i>) Höhe der Ausgabeseite, relevant für Mehrseitenexporte</li> </ul></td>
  </tr>
  </tbody>
</table>


~~~js title="Beispielaufruf von exportToPDF mit Optionen"
scheduler.exportToPDF({
    name:"myscheduler.pdf",
    format:"A4",
    orientation:"portrait",
    zoom:1,
    header:"<h1>My company</h1>",
    footer:"<h4>Bottom line</h4>",
    server:"https://myapp.com/myexport/scheduler"
});
~~~


## Name der Ausgabedatei {#nameoftheoutputfile}

Um einen eigenen Dateinamen für das exportierte PDF festzulegen, setzen Sie die **name**-Eigenschaft in den [exportToPDF](export/pdf.md#parametersoftheexportmethod)-Optionen:

~~~js
scheduler.exportToPDF({
    name:"my_beautiful_scheduler.pdf"/*!*/
});
~~~


## Kopf-/Fußzeile der Ausgabedatei {#headerfooter-of-the-output-file}

Kopf- und Fußzeilen können dem exportierten PDF hinzugefügt werden, indem die Eigenschaften **header** und **footer** in den [exportToPDF](export/pdf.md#parametersoftheexportmethod)-Optionen verwendet werden:

:::note
In diesen Eigenschaften kann beliebiges HTML verwendet werden. Wenn Sie Bilder einfügen, achten Sie darauf, für das "src"-Attribut absolute URLs zu verwenden.
:::

~~~js
scheduler.exportToPDF({
    name:"myscheduler.pdf",
    header:"<h1>My company</h1>",/*!*/
    footer:"<h4>Bottom line</h4>"/*!*/
});
~~~


## Eigener Stil für die Ausgabedatei {#customstylefortheoutputfile}

Eigene Styles können angewendet werden, indem Sie ein Stylesheet mit Ihren CSS-Klassen einbinden:

- Durch Verlinkung auf ein externes Stylesheet:

~~~js
scheduler.exportToPDF({
    name:"calendar.pdf",
    header:'<link rel="stylesheet" href="http://mysite.com/custom.css">' /*!*/
});
~~~

- Oder durch Einbetten von Styles innerhalb eines `<style>`-Tags:

~~~js
scheduler.exportToPDF({
    name:"calendar.pdf",
    header:'<style>... custom css classes here ...</style>' /*!*/
});
~~~

Beachten Sie, dass dieser Ansatz mit global zugänglichen HTTP-URLs funktioniert. Für lokale oder Intranet-Umgebungen können Sie alle Styles direkt einbetten, zum Beispiel:

~~~js
scheduler.exportToPDF({
    header:"<style>.tier1{background: red; color:white;}</style>"
});
~~~

## Export von HTML-Elementen {#exportinghtmlelements}

Beim Export des Schedulers nach PDF gibt es einige Einschränkungen bei HTML-Elementen aus Sicherheitsgründen.

Bestimmte Elemente wie `<canvas>`, `<svg>`, `<script>` und Bilder mit Base64-codierten *src*-Attributen werden nicht vollständig unterstützt. Es gibt jedoch sichere Alternativen für den Export von Bildern im SVG- und Base64-Format:

- Verwenden Sie ein `<img>`-Tag mit einem *src*-Attribut, das auf eine SVG-Bild-URL verweist (funktioniert mit PNG- und JPG-Exporten, aber nicht mit Base64), zum Beispiel:

~~~html
<img src="https://www.svgrepo.com/download/530597/hat.svg">
~~~

- Verwenden Sie CSS-Styles wie *background* oder *background-image* mit einer `url()`, die auf eine Bild-URL oder einen Base64-String verweist (funktioniert mit PNG, JPG und SVG):

~~~css
.red {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH1ggDCwMADQ4NnwAAAFVJREFUGJWNkMEJADEIBEcbSDkXUnfSgnBVeZ8LSAjiwjyEQXSFEIcHGP9oAi+H0Bymgx9MhxbFdZE2a0s9kTZdw01ZhhYkABSwgmf1Z6r1SNyfFf4BZ+ZUExcNUQUAAAAASUVORK5CYII=") 100%/contain no-repeat;
    display: inline-block;
    width: 32px;
    height: 32px;
}
~~~

Wenn Sie ein eigenes Exportmodul haben und nicht unterstützte HTML-Elemente exportieren müssen, können Sie den Support kontaktieren, um Hinweise zur Anpassung Ihres Moduls zu erhalten, um die Einschränkungen zu umgehen. Beachten Sie, dass dies Ihren Server XSS-Sicherheitsrisiken aussetzen kann.
