---
title: "FAQ"
sidebar_label: "FAQ"
---

# FAQ

## Wie öffnet man Beispiele

Das Komponentenpaket enthält eine Demo-Backend-App, mit der Sie Beispiele lokal ausführen können. Sie benötigt [Node.js](https://nodejs.org/en/) und verwendet einen In-Memory-Speicher für Demos, sodass keine Datenbank eingerichtet werden muss.

### Schritte zum Ausführen der Beispiele

1) Verwendung der Demo-Node.js-Backend-App: 

- Entpacken Sie das Paket in einen Ordner
- Öffnen Sie ein Terminal (oder cmd, PowerShell)
- Führen Sie `npm install` aus
- Führen Sie `npm run start` aus
- Öffnen Sie `http://localhost:9200` in Ihrem Browser
- Sie sehen die Startseite, die unseren Online-Beispielen unter **https://docs.dhtmlx.com/scheduler/samples/** entspricht

2) Verwendung des Apache-Webservers

- Installieren Sie den Apache-Webserver. Falls Sie nicht wissen wie, können Sie [XAMPP](https://www.apachefriends.org/index.html) verwenden.
- Platzieren Sie die Scheduler-Beispiele im Apache-Dokumentenstammverzeichnis (*xampp/htdocs*, wenn Sie XAMPP verwenden).
- Starten Sie den Apache-Webserver und greifen Sie dann über **http://localhost/yourfolder** auf die Beispiele zu.

3) Verwendung eines in Ihre IDE integrierten Entwicklungs-Webservers

Einige IDEs bieten einen integrierten Entwicklungs-Webserver, zum Beispiel: 
[https://www.jetbrains.com/help/webstorm/creating-local-server-configuration.html](https://www.jetbrains.com/help/webstorm/creating-local-server-configuration.html).


Prüfen Sie, ob Ihre IDE so etwas nativ oder durch Plugins unterstützt.

### Warum ist das notwendig?

Einige Beispiele laden Daten per AJAX (xhr) aus JSON-Dateien. Damit dies funktioniert, muss das Beispiel über einen Webserver geöffnet werden.

Wenn Sie ein Beispiel durch Doppelklick öffnen, wird es als Datei geöffnet, und Browser blockieren in diesem Modus AJAX-Aufrufe. Dadurch kann die Komponente keine Datendateien laden, und Sie sehen das *Invalid data*-Popup oben rechts.

Um dies zu überprüfen, sehen Sie sich die URL im Browser an. Beginnt sie mit *file:///*, zum Beispiel:


**file:///D:/www/scheduler-eval/samples/20_multiple/01_basic.html** 

funktioniert das Laden von Datendateien nicht.

Beim Öffnen eines Beispiels über einen Webserver sieht die URL so aus (das *http://* kann fehlen):


**http://localhost/scheduler-eval/samples/20_multiple/01_basic.html**


## Scheduler wird nicht korrekt angezeigt

Wenn der Scheduler nicht korrekt auf der Seite angezeigt wird, prüfen Sie das CSS-Style des Containers - er muss eine gültige Größe in Pixeln oder Prozent haben.


- Wenn die Größe in Prozent angegeben ist, stellen Sie sicher, dass auch der übergeordnete Container eine Höhe hat. 
- Wenn der Scheduler direkt im Body platziert ist, wenden Sie folgendes CSS an, um die Prozenthöhe korrekt zu behandeln:

~~~js
html, body{
    margin:0px;
    padding:0px;
    height:100%; /*obligatorisch*/
    overflow:hidden;
}
~~~


## Scheduler wird im Internet Explorer nicht korrekt angezeigt

Wenn der Scheduler nur im Internet Explorer nicht korrekt angezeigt wird, prüfen Sie, ob Ihre Seite eine vollständige DOCTYPE-Deklaration verwendet.
Der Scheduler funktioniert korrekt im Standardmodus von IE, ist aber nicht für den Quirks-Modus ausgelegt.

Zum Beispiel ist der HTML5-DOCTYPE:

~~~html
<!DOCTYPE html>
~~~


## Scheduler initialisiert nicht, wenn eine benutzerdefinierte Ansicht initial ist

Die Anfangsansicht des Schedulers wird bei der Initialisierung über die Methode [init](api/method/init.md) festgelegt. Allerdings sind die Vorlagen für eine benutzerdefinierte Ansicht zu diesem Zeitpunkt möglicherweise noch nicht vollständig verarbeitet, was zu einem Fehler bei der Initialisierung führen kann.


Um dies zu vermeiden, erstellen Sie benutzerdefinierte Ansichten im Handler für das Ereignis [onTemplatesReady](api/event/ontemplatesready.md), das ausgelöst wird, sobald alle Vorlagen vollständig verarbeitet sind:

~~~js
scheduler.attachEvent("onTemplatesReady",function(){
    //Code zum Erstellen Ihrer benutzerdefinierten Ansicht hier platzieren
});

scheduler.init(container, date, "custom view name");
~~~

## XML-Parsing-Fehler beim Laden von Daten über ein PHP-Skript

Dies passiert oft, wenn das Server-Skript vor dem XML Leerzeichen ausgibt, was zu einem Fehler führt.

Stellen Sie sicher, dass keine der eingebundenen Dateien in Ihrem Connector-Skript Leerzeichen außerhalb der 


<b>&#60;?php</b> und <b>?&#62;</b> Tags enthalten. 


## Wie stelle ich das 12-Stunden-Zeitformat (AM/PM) ein?

Standardmäßig verwendet der Scheduler das 24-Stunden-Format und zeigt Zeiten wie 13:00 an. 


Um auf das 12-Stunden-Format umzuschalten und Zeiten wie 1:00 PM anzuzeigen, setzen Sie die Eigenschaft [hour_date](api/config/hour_date.md):

~~~js
scheduler.config.hour_date = "%g:%i%a"; /*!*/
scheduler.init('scheduler_here', new Date(), "month");
~~~

## Ereignisse, die kürzer als 1 Stunde dauern, erscheinen im Scheduler genauso wie 1-stündige Ereignisse

Die Standardhöhe der Skala (Stundenhöhe) beträgt 44px und die minimale Ereignishöhe beträgt 40px (im Material-Skin). Deshalb sehen 15-Minuten- und 1-Stunden-Ereignisse gleich groß aus.

Um die Größe der Ereignisse an die Skala anzupassen, gibt es mehrere Optionen. Details finden Sie im Artikel [Größe der Skalen- und Ereignisboxen anpassen](guides/sizing.md).


## Kalender-Hintergrundraster und Zeitskala sind nicht ausgerichtet

Dies kann bei anderen Zoomstufen als der Standardstufe auftreten.

Dieses Verhalten ist erwartet und derzeit nicht zu vermeiden.
Das Kalenderlayout wird bei 100% (Standard) Zoom korrekt angezeigt, bei anderen Zoomstufen können sich Elemente durch das Browser-Scaling verschieben.


## Scheduler-Skalierbarkeitsgrenzen und maximale Anzahl an Ereignissen

Die Skalierbarkeit des Schedulers hängt von mehreren Faktoren ab.

Im Timeline-View beeinflusst die Anzahl der Zeilen die Rendergeschwindigkeit stark. Das Anzeigen von Hunderten von Timeline-Sektionen kann je nach Einstellungen zu merklichen Verzögerungen führen.

Für große Datenmengen aktivieren Sie den [dynamischen Lademodus](guides/loading-data.md#dynamic-loading). So lädt der Scheduler nur die für die Anzeige benötigten Ereignisse (mit AJAX-Anfragen, die Datumsbereiche für das Backend enthalten).

Mit dynamischem Laden ist die Hauptgrenze die Anzahl der gleichzeitig angezeigten Ereignisse. In der Regel können einige Tausend Ereignisse ohne Performance-Probleme dargestellt werden, abhängig von der Ansicht.

Zum Beispiel sind Tages- oder Wochenansichten nicht für sehr viele Ereignisse geeignet, da Ereignisse in Spalten mit begrenzter Breite angezeigt werden.

Insgesamt verursacht die Gesamtzahl der Ereignisse selten Probleme. Wenn Sie jedoch viele Timeline-Sektionen haben (z.B. 200 Zeilen), sind ggf. Code-Optimierungen nötig, um die Renderzeiten zu verkürzen.


## Scheduler zeigt nichts an

Zwei häufige Situationen sind:

1. Sie haben das Backend-API manuell oder anhand unserer [Anleitungen](integrations/howtostart-guides.md) eingerichtet, aber der Scheduler zeigt keine Ereignisse an.

oder

2. Es gibt Probleme beim Speichern von Änderungen im Backend.

Lesen Sie den Artikel [Fehlerbehebung bei Backend-Integrationsproblemen](guides/troubleshooting.md) für Hinweise zur Fehlerdiagnose.

## Eine Fehlermeldung erscheint oben rechts {#an-error-alert-appears-in-the-right-top-corner}

![error_alert](/img/error_alert.png)

Diese Meldungen erscheinen, wenn die Komponente auf Probleme stößt.

Sie deuten meist auf echte Probleme mit Daten oder Logik hin. Das Ausblenden dieser Meldungen verbirgt das Problem nur, das dann an anderer Stelle wieder auftreten kann.

Wenn Sie diese Meldungen vor der Freigabe Ihrer App für Benutzer deaktivieren möchten, verwenden Sie die Konfiguration [show_errors](api/config/show_errors.md):

~~~js
scheduler.config.show_errors = false;
~~~
