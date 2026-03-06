---
title: "Fehlerbehebung bei Backend-Integrationsproblemen"
sidebar_label: "Fehlerbehebung bei Backend-Integrationsproblemen"
---

# Fehlerbehebung bei Backend-Integrationsproblemen

## Symptome

1. Bei der manuellen Implementierung der Backend-API oder beim Befolgen unserer [Tutorials](integrations/howtostart-guides.md) zeigt der Scheduler keine Events auf der Seite an.

oder

2. Es gibt Schwierigkeiten beim Speichern von Änderungen im Backend.

## Ursachen

Es kann verschiedene Ursachen und Lösungen für fehlerhaftes Verhalten auf unterschiedlichen Plattformen geben, die in diesem Artikel nicht behandelt werden.

Das Ziel dieses Artikels ist es, Sie durch die gängigen Schritte zur Untersuchung dieser Probleme zu führen. Sobald das Problem identifiziert und verstanden ist, ist die Behebung in der Regel unkompliziert.

## Überprüfen Sie Fehlermeldungen auf der Seite

1. Öffnen Sie die Entwicklertools Ihres Browsers und laden Sie die Seite neu. Gibt es Fehlermeldungen in der Konsole?

![Fehlerüberprüfung](/img/errors_check.png)

2. Wenn Fehler angezeigt werden, prüfen Sie, ob Sie diese selbst beheben können. Falls nicht, fahren Sie mit dem nächsten Schritt fort.

## Überprüfen Sie, welche Anfragen der Client stellt

1. Öffnen Sie das **Netzwerk**-Panel und stellen Sie sicher, dass *XHR*-Anfragen sichtbar sind.

2. Laden Sie die Seite neu und suchen Sie die Anfrage, die für das Laden der Daten vom Backend verantwortlich ist. Überprüfen Sie, ob sie auf die korrekte URL zielt und prüfen Sie den Antwortstatus.

![Anfragenüberprüfung](/img/requests_check.png)

Gibt es Fehler?

Ein 404-Status bedeutet entweder, dass die an die `scheduler.init`-Methode übergebene URL falsch ist oder dass es ein Problem mit den Routing-Einstellungen Ihrer Anwendung gibt.

## Überprüfen Sie, was der Server zurückliefert

Wählen Sie die Anfrage aus und sehen Sie sich die Vorschau der Antwort oder den Rohinhalt der Antwort an.

![Antwortüberprüfung](/img/response_check.png)

Entspricht die Antwort dem [erwarteten Datenformat](guides/data-formats.md)?

### Wenn Sie eine Server-Fehlermeldung anstelle von Scheduler-Daten sehen

Dies weist auf ein Problem im Backend-Code oder bei den Datenbankverbindungseinstellungen hin.

In der Regel enthält die Fehlerantwort genügend Details, um die Ursache zu identifizieren. Wenn Sie eine allgemeine `500 server error`-Meldung erhalten, müssen Sie möglicherweise vorübergehend benutzerdefinierte Fehlerseiten auf Ihrem Server deaktivieren, um den tatsächlichen Fehler anzuzeigen. Dieser Vorgang ist plattformabhängig. Wenn Sie unsicher sind, suchen Sie nach "disable custom error page in (your server or framework)".

### Wenn die Daten größtenteils korrekt erscheinen

Überprüfen Sie die Eigenschaften `id`, `start_date` und `end_date` sorgfältig.

- `id` - Events mit derselben id werden zusammengeführt. Wenn fünf Events dieselbe id haben, wird nur eines angezeigt.

- `start_date`, `end_date` - Stellen Sie sicher, dass die Datumsformate mit dem in der [date_format](api/config/date_format.md)-Konfiguration des Schedulers angegebenen Format übereinstimmen.

[Weitere Details zu den Dateneigenschaften](guides/loading-data.md#dataproperties).

Wenn das Datumsformat nicht den Erwartungen des Schedulers entspricht, können Events ungültige Daten haben und nicht angezeigt werden oder auf falsche Daten verschoben werden.

In der Regel wird `xml_date` vor dem Aufruf von `scheduler.init` wie folgt gesetzt:

~~~js
scheduler.config.xml_date="%Y-%m-%d %H:%i";
~~~

### Wenn etwas an den Eigenschaftswerten auffällig ist

Überprüfen Sie die in Ihrer Datenbank gespeicherten Daten; das Problem liegt wahrscheinlich dort. Wenn die Datumsformate nicht übereinstimmen, aktualisieren Sie entweder die [date_format](api/config/date_format.md)-Konfiguration oder passen Sie den Code an, der die Task-Daten vor dem Senden an den Client serialisiert.

## Überprüfen Sie, was im Scheduler geladen wird

### Ungültiges Datumsformat

1. Öffnen Sie die Browser-Konsole und führen Sie `scheduler.getEvents()` aus.

2. Überprüfen Sie die Konsolenausgabe; sie sollte ein Array von Events anzeigen.

![Datenüberprüfung](/img/data_check.png)

Schauen Sie sich die Felder `start_date` und `end_date` einiger Einträge an. Sie könnten `invalid date` oder unerwartete Werte wie das Jahr 1970 oder 2038 sehen, was auf ein Problem mit dem [date_format](api/config/date_format.md)-Format hinweist.

:::note
Wenn Sie die [recurring extension](guides/recurring-events.md) verwenden, gibt [scheduler.getEvents()](api/method/getevents.md) keine Daten zurück, es sei denn, Sie geben die Parameter `from`/`to` an. Entfernen Sie für diese Überprüfung die recurring events extension von der Seite.
:::

### Fehlende Eigenschaften für Units/Timeline

Wenn Sie die [Units](views/units.md)- oder [Timeline](views/timeline.md)-Ansichten verwenden, werden Events möglicherweise nicht angezeigt, wenn sie keinem Abschnitt der Unit oder Timeline zugewiesen sind.

Um dies zu überprüfen, können Sie `skip_incorrect:false` für die [Units-Ansicht](views/units.md#skipping-events-that-dont-belong-to-any-of-the-units) setzen:

~~~js
scheduler.createUnitsView({
    name:"unit",
    ...
    skip_incorrect:false
});
~~~

Oder `show_unassigned: true` für die [Timeline-Ansicht](api/method/createtimelineview.md):

~~~js
scheduler.createTimelineView({
    name:"timeline",
    ...
    show_unassigned: true
});
~~~

Falls dies der Fall ist, werden die Events nach der Aktualisierung der Konfiguration und dem Neuladen im ersten Abschnitt der Units/Timeline-Ansicht angezeigt. Überprüfen Sie dann die Optionen `property` oder `y_property` der Units- bzw. Timeline-Ansichten sowie die entsprechenden Event-Eigenschaften.

### Filter

Wenn keine offensichtlichen Probleme vorliegen, überprüfen Sie Ihren Code darauf, ob Events möglicherweise [durch einen Filter ausgeblendet](guides/filtering.md) werden.

## Letzter Ausweg

Wenn keiner dieser Schritte hilft oder keine Events bzw. Konsolenfehler auftreten, ziehen Sie in Erwägung, [Ihre Frage in unserem Forum zu posten](https://forum.dhtmlx.com/c/scheduler-all) oder unseren technischen Support zu kontaktieren.

Stellen Sie sicher, dass Sie alle während dieser Fehlerbehebungsschritte gesammelten Informationen beifügen.

Zusätzlich benötigt unser Team ein minimales reproduzierbares Beispiel: entweder ein eigenständiges Paket mit einer vereinfachten App (der Scheduler-Seite, allen notwendigen Dateien, einem Datenbank-Dump mit Testdaten oder einer statischen JSON-Datei mit den zu ladenden Daten) oder einen Online-Link, über den das Problem direkt im Browser überprüft werden kann.
