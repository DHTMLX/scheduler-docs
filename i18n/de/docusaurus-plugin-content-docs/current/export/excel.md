---
title: "Export nach Excel und iCal"
sidebar_label: "Export nach Excel und iCal"
---

# Export nach Excel und iCal

Ab Version 4.2 ermöglicht dhtmlxScheduler das Exportieren aller Scheduler-Daten in die Formate Excel und iCal.

## Beschränkungen der Anfragegröße

Es gibt einen gemeinsamen API-Endpunkt **https://export.dhtmlx.com/scheduler**, der für verschiedene Exportmethoden (*exportToPDF*, *exportToPNG*, usw.) verwendet wird. Die **maximale Anfragegröße beträgt 10 MB**.


## Export nach Excel

Um Scheduler-Daten in eine Excel-Datei zu exportieren, gehen Sie wie folgt vor:

1. Fügen Sie das Skript "https://export.dhtmlx.com/scheduler/api.js" auf Ihrer Seite hinzu, um den Online-Exportdienst zu aktivieren:
~~~html
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>  /*!*/
<link rel="stylesheet" href="codebase/dhtmlxscheduler.css" type="text/css">
~~~
2. Verwenden Sie die exportToExcel-Methode, um die Scheduler-Daten zu exportieren: 
~~~html
<input value="Export to Excel" type="button" onclick="scheduler.exportToExcel()">/*!*/

<script>
    scheduler.init("scheduler_here",new Date(2019,5,30),"month");
    scheduler.load("data/events");
</script>
~~~


#### Parameter der Exportmethode

Die **exportToExcel()**-Methode akzeptiert ein optionales Objekt mit mehreren Eigenschaften:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) Der Name der Ausgabedatei mit der Erweiterung '.xlsx'</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>columns</b></td>
  <td>(<i>array</i>) Konfiguriert die Spalten im Ausgabeblatt <ul> <li>'id' - (string/number) Die Event-Property-ID, die der Spalte zugeordnet wird</li> <li>'header' - (string) Der Spaltenkopftext</li> <li>'width' - (number) Die Spaltenbreite in Pixeln</li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) Gibt den API-Endpunkt für die Exportanfrage an. Dies kann auf einen lokal installierten Exportdienst verweisen. Standard ist <strong>https://export.dhtmlx.com/scheduler</strong></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>start</b></td>
  <td>(<i>string|object</i>) Legt das Startdatum für den zu exportierenden Datenbereich fest</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>end</b></td>
  <td>(<i>string|object</i>) Legt das Enddatum für den zu exportierenden Datenbereich fest</td>
  </tr>
  </tbody>
</table>


~~~js title="Calling the export method with optional properties"
scheduler.exportToExcel({
    name:"My document.xls", 
    columns:[
        { id:"text",  header:"Title", width:150 },
        { id:"start_date",  header:"Start date", width:250 }
    ],
    server:"https://myapp.com/myexport/scheduler",
    start: new Date(1999, 01, 01),
    end:  new Date(2022, 01, 01)
});
~~~

#### Datumsformat festlegen

Um zu steuern, wie Datumsangaben in der exportierten Excel-Datei angezeigt werden, setzen Sie das **xml_format**-Template wie folgt:

~~~js
scheduler.templates.xml_format = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
~~~

**Related sample** [Setting date format](https://snippet.dhtmlx.com/5/6d3de8fa2)

Weitere Details zur Datumsformatierung finden Sie in der Spezifikation [hier](guides/settings-format.md).

## Export nach iCal

Um Scheduler-Daten als iCal-String zu exportieren, gehen Sie wie folgt vor:

- Fügen Sie das Skript <b>"https://export.dhtmlx.com/scheduler/api.js"</b> ein, um den Online-Exportdienst zu aktivieren:

~~~html
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>  /*!*/
<link rel="stylesheet" href="codebase/dhtmlxscheduler.css" type="text/css">
~~~

- Verwenden Sie die <b>exportToICal</b>-Methode, um die Scheduler-Daten zu exportieren:

~~~html
<input value="Export to iCal" type="button" onclick="scheduler.exportToICal()">/*!*/

<script>
    scheduler.init("scheduler_here",new Date(2019,5,30),"month");
    scheduler.load("data/events");
</script>
~~~


#### Parameter der Exportmethode

Die **exportToICal()**-Methode akzeptiert ein optionales Objekt mit folgender Eigenschaft:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) Gibt den API-Endpunkt für die Exportanfrage an. Dies kann auf einen lokal gehosteten Exportdienst gesetzt werden. Standard ist <strong>https://export.dhtmlx.com/scheduler</strong></td>
  </tr>
  </tbody>
</table>


~~~js title="Calling the export method with optional properties"
scheduler.exportToICal({
    server:"https://myapp.com/myexport/scheduler"
});
~~~
