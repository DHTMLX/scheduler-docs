---
title: "Export nach PDF (Version 4.0)"
sidebar_label: "Export nach PDF (Version 4.0)"
---

# Export nach PDF (Version 4.0)

*Dieser Artikel behandelt das Exportieren mit dhtmlxScheduler 4.0 und früheren Versionen. Für Versionen ab 4.1 finden Sie weitere Informationen [hier](export/pdf.md).*

Ab Version 4.1 hat dhtmlxScheduler eine neue Methode zum Exportieren des Schedulers als PDF eingeführt - einen [Online-Exportdienst](export/pdf.md#default-export-to-pdf).

## Installation 

Hier finden Sie die verfügbaren Pakete für verschiedene Plattformen:

- PHP-Version: [https://github.com/DHTMLX/scheduler-to-pdf-php](https://github.com/DHTMLX/scheduler-to-pdf-php)  
- Java-Version: [https://github.com/DHTMLX/scheduler-to-pdf-java](https://github.com/DHTMLX/scheduler-to-pdf-java)  
- .NET-Version: [https://github.com/DHTMLX/scheduler-to-pdf-net](https://github.com/DHTMLX/scheduler-to-pdf-net)


[Export to PDF [Legacy]](https://docs.dhtmlx.com/scheduler/samples/04_export/05_standalone_export.html)


## Notwendige Einbindungen 

Um den PDF-Export auf der Scheduler-Seite zu aktivieren, müssen Sie die entsprechende Erweiterung aktivieren:

~~~js
scheduler.plugins({
    pdf: true
});
~~~

## Export auslösen 

Um Schedulerdaten als PDF zu exportieren, fügen Sie einen Button hinzu, der die **toPDF()**-Methode aufruft. Diese Methode benötigt die URL zum zuvor installierten Skript:

~~~html
<input type="button" name="save" value="save" 
onclick="scheduler.toPDF('path/to/folder/generate.php')">
~~~

## Dienst konfigurieren 

Für die Konfiguration der Exportoptionen sind Anpassungen auf Client- und Serverseite erforderlich.

### Clientseite 

Die **toPDF()**-Methode startet den Exportprozess:

~~~js
scheduler.toPDF(path, color, header, footer);
~~~

**Parameter:**

- _**path**_ - (_url_) URL, die auf die PHP-Datei verweist, die für die PDF-Erstellung zuständig ist. Weitere Details [unten](export/pdf.md#using-export-services).
- _**color**_ - (_'color', 'gray', 'bw', 'custom', 'fullcolor'_) bestimmt das Farbschema:
    * '_color_' - Vollfarbe (Standard).
    * '_gray_' - Graustufen.
    * '_bw_' - Nur Schwarzweiß.
    * '_custom_' - ermöglicht eine benutzerdefinierte Farbzuordnung (erfordert Anpassung in PHP, siehe [unten](export/pdf.md#using-export-services)).
    * '_fullcolor_' - verwendet die tatsächlichen Hintergrund- und Textfarben aus dem Scheduler.
- _**header**_ - (_boolean_, optional) gibt an, ob ein Seitenkopf hinzugefügt werden soll. Standard ist _false_. Weitere Informationen [unten](export/pdf.md#headerfooter-of-the-output-file).
- _**footer**_ - (_boolean_, optional) gibt an, ob eine Fußzeile hinzugefügt werden soll. Standard ist _false_. Siehe [unten](export/pdf.md#headerfooter-of-the-output-file).

Zum Beispiel ruft folgende Zeile in Ihrer HTML-Seite **toPDF()** mit einem Graustufen-Farbschema auf:

~~~js
scheduler.toPDF('path/to/folder/generate.php','gray');
~~~

## Serverseite

Die oben referenzierte _generate.php_-Datei verarbeitet die Exportoptionen.

Ein minimales Beispiel sieht so aus:

~~~php
$scPDF = new schedulerPDF();
$scPDF->printScheduler($xml);
~~~

Vor dem Aufruf von **printScheduler()** können verschiedene benutzerdefinierte Einstellungen vorgenommen werden:

**Elementgrößen:**

~~~php
// Höhe des Tagescontainer-Headers in der Monatsansicht
$scPDF->monthDayHeaderHeight = 6;
// Höhe des Monats-Headers
$scPDF->monthHeaderHeight = 8;
// Höhe des Monatsnamens-Containers in der Jahresansicht
$scPDF->yearMonthHeaderHeight = 8;
// Zeilenhöhe in der Agenda-Ansicht
$scPDF->agendaRowHeight = 6;
// Höhe des Headers in Tages- und Wochenansichten
$scPDF->dayTopHeight = 6;
// Breite der linken Skala in Tages- und Wochenansichten
$scPDF->dayLeftWidth = 16;
~~~

**Schriftgröße:**

~~~php
// Einstellungen für Schriftgrößen
$scPDF->monthHeaderFontSize = 9;
$scPDF->monthDayHeaderFontSize = 8;
$scPDF->monthEventFontSize = 7;
$scPDF->yearHeaderFontSize = 8;
$scPDF->yearFontSize = 8;
$scPDF->agendaFontSize = 8;
$scPDF->dayHeaderFontSize = 7;
$scPDF->dayScaleFontSize = 8;
$scPDF->dayEventHeaderFontSize = 7;
$scPDF->dayEventBodyFontSize = 7;
$scPDF->todayFontSize = 11;
~~~

**Benutzerdefinierte Farben** (verwenden Sie 'custom' als Farbzuordnung auf der Clientseite):

~~~php
$scPDF->lineColor = '586A7E';
$scPDF->bgColor = 'C2D5FC';
$scPDF->dayHeaderColor = 'EBEFF4';
$scPDF->dayBodyColor = 'FFFFFF';
$scPDF->dayHeaderColorInactive = 'E2E3E6';
$scPDF->dayBodyColorInactive = 'ECECEC';
$scPDF->headerTextColor = '2F3A48';
$scPDF->textColor = '2F3A48';
$scPDF->eventTextColor = '887A2E';
$scPDF->eventBorderColor = 'B7A543';
$scPDF->eventColor = 'FFE763';
$scPDF->todayTextColor = '000000';
$scPDF->scaleColorOne = 'FCFEFC';
$scPDF->scaleColorTwo = 'DCE6F4';
$scPDF->yearDayColor = 'EBEFF4';
$scPDF->yearDayColorInactive = 'd6d6d6';
~~~

**Kopf- und Fußzeilen:**

~~~php
// Höhe des Headers
$scPDF->headerImgHeight = 40;
// Höhe der Fußzeile
$scPDF->footerImgHeight = 40;
// Pfad zum Header-Bild
$scPDF->headerImg = './header.png';
// Pfad zum Footer-Bild
$scPDF->footerImg = './footer.png';
~~~

## Kopf- und Fußzeile 

Benutzerdefinierte Kopf- und Fußzeilen können auf jeder Seite hinzugefügt werden, indem Sie diese Schritte befolgen:

- Erstellen Sie die Bilder "_header.png_" und "_footer.png_".
- Platzieren Sie diese Bilder im gleichen Verzeichnis wie _generate.php_.
- Aktualisieren Sie auf der Clientseite den Aufruf von **toPDF()** wie folgt:

~~~js
scheduler.toPDF(url, "color", true, true);
~~~

Dadurch werden "_header.png_" und "_footer.png_" als Kopf- bzw. Fußzeile auf jeder Seite des erzeugten PDFs eingefügt.

## Fehlerberichterstattung 

Falls die PDF-Erstellung fehlschlägt, wird eine Datei namens "error_report_xxxx.xml" erstellt. Bitte fügen Sie diese Datei bei der Fehlerberichterstattung bei.

Wenn die Ausgabe nicht fehlschlägt, aber Probleme zeigt, können Sie das Debugging in _generate.php_ aktivieren, indem Sie:

~~~php
$debug = false;
~~~

zu

~~~php
$debug = true;
~~~

ändern.

Dadurch wird eine Datei "debug_xxxxx.xml" erzeugt, die Sie bei der Fehlerberichterstattung mitsenden sollten.
