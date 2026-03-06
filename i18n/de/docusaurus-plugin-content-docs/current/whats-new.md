---
title: "Was ist neu"
sidebar_label: "Was ist neu"
---

# Was ist neu

Wenn Sie den Scheduler von einer früheren Version aktualisieren, werfen Sie einen Blick auf [Migration von älteren Versionen](migration.md) für weitere Details.

## 7.2.5

<span class='release_date'>20. Mai 2025. Bugfix-Release</span>

- Die [Lightbox-Zeitsteuerung](guides/time.md) zeigt jetzt die korrekte Anzahl an Tagen für jeden Monat in den Tagesauswahlen an.
- Ein Skriptfehler, der in der Testversion auf Salesforce auftrat, wurde behoben.
- Ein Rückschritt aus Scheduler v7.2, bei dem die "Heute"-Zelle in der [Monatsansicht](views/month.md) nicht hervorgehoben wurde, wurde behoben.
- Die Berechnung von `end_date` beim Ändern der Größe von Ereignissen wurde korrigiert, wenn [round_position](views/timeline.md#stretchingeventsoverthecell) aktiviert ist.
- Ein Problem wurde behoben, bei dem das [Tooltip](guides/tooltips.md) bei langen Inhalten außerhalb des Bildschirms verschoben wurde.

## 7.2.4

<span class='release_date'>6. Mai 2025. Bugfix-Release</span>

### Fehlerbehebungen

- Die Einstellung [ignore_timeline](views/timeline.md#time-interval-for-view-cells) verhielt sich beim Verschieben oder Ändern der Größe von Ereignissen in der [Timeline-Ansicht](views/timeline.md) nicht korrekt und wurde behoben.
- Die Berechnung von `end_date` beim Erstellen neuer Ereignisse mit aktiviertem [ignore_timeline](views/timeline.md#time-interval-for-view-cells) wurde korrigiert.
- Ein Problem wurde behoben, bei dem die Button-Konfigurationen der [lightbox](guides/lightbox-editors.md) nach dem Speichern in den Speicher vertauscht wurden.
- Ein Problem wurde gelöst, bei dem das [container_autoresize](guides/extensions-list.md#container-autoresize) Plugin die Containergröße in einer leeren [Agenda-Ansicht](views/agenda.md) unerwartet vergrößerte.
- Ein Skriptfehler in der [Units-Ansicht](views/units.md) im Zusammenhang mit bestimmten `size`-Einstellungen bei aktiviertem [mark_now](api/config/mark_now.md) wurde behoben.
- Das horizontale Scrollverhalten in der [Timeline-Ansicht](views/timeline.md) wurde korrigiert, wenn `smart_rendering` auf `false` gesetzt ist.

## 7.2.3

<span class='release_date'>9. April 2025. Bugfix-Release</span>

### Fehlerbehebungen

- Das Problem, dass Rasterzellen nicht fokussiert wurden, wenn Aufgaben außerhalb des sichtbaren Zeitbereichs des Diagramms lagen, wurde behoben.
- Ein Problem in der [multiUserBackend](guides/multiuser-live-updates.md) Erweiterung, das zu falschem Verhalten beim Bearbeiten aller Ereignisse einer wiederkehrenden Serie führte, wurde gelöst.
- Das doppelte Hinzufügen der Klasse `timeline_scalex_class` in der [Timeline-Ansicht](views/timeline.md) wurde behoben.
- Das Verhalten von `scrollTo((section: x))` wurde korrigiert, sodass nun korrekt zur ersten Sektion in der [Timeline-Ansicht](views/timeline.md) gescrollt wird.
- Die Einstellung `height` für Sektionen in der [lightbox](guides/lightbox-editors.md) wird jetzt korrekt angewendet.
- Ein Problem wurde behoben, bei dem der [Mini-Kalender](guides/minicalendar.md) die `rtl`-Konfiguration ignorierte.
- Smart Rendering funktionierte nur in der ersten [Timeline-Ansicht](views/timeline.md), wenn mehrere Timelines mit `smart_rendering:true` und `scrollable:false` verwendet wurden - dies wurde behoben.
- Die Verwendung von `first_hour`/`last_hour` mit `round_position`, die zu falschen Ereignisdaten beim Ziehen in der [Timeline-Ansicht](views/timeline.md) führte, wurde korrigiert.

## 7.2.2

<span class='release_date'>13. Februar 2025. Bugfix-Release</span>

- Filterprobleme für bearbeitete Vorkommen von [wiederkehrenden Ereignissen](guides/recurring-events.md) wurden behoben.
- Die [month_date](api/template/month_date.md) Vorlage wirkt sich nun korrekt auf die [Jahresansicht](views/year.md) aus.
- Das Verhalten bei der Verwendung von [multisection](views/units.md#assigning-events-to-several-units) Ereignissen in der [Timeline-Ansicht](views/timeline.md) mit `round_position: true` wurde korrigiert.
- Es wurde verhindert, dass [wiederkehrende Ereignisse](guides/recurring-events.md) abgeschnitten werden, wenn sie außerhalb des sichtbaren Bereichs der [Timeline-Ansicht](views/timeline.md) liegen.
- Probleme beim Bearbeiten von [wiederkehrenden Ereignissen](guides/recurring-events.md) mit der Option "aktuelle und folgende" wurden behoben.

## 7.2.1

<span class='release_date'>16. Januar 2025. Bugfix-Release</span>

- [Wiederkehrende Vorkommen](guides/recurring-events.md) verschwinden während der Umstellung auf Sommerzeit (DST) nicht mehr.
- Ein Skriptfehler, der beim Bearbeiten neu erstellter [wiederkehrender Ereignisse](guides/recurring-events.md) auftrat, wurde behoben.
- Die Anzeige von [Vorkommen](guides/recurring-events.md) nach dem Laden von Backend-Daten wurde korrigiert.
- Fehler beim Anpassen der `size`-Eigenschaft in der [Units-Ansicht](views/units.md) über die verfügbaren Spalten hinaus wurden behoben.
- Mehrstufige Ordner in der [Tree Timeline-Ansicht](views/timeline.md) werden jetzt auf allen Ebenen korrekt angezeigt.
- Fehler, die durch die Konfigurationsoption `readonly_form` beim Öffnen der Lightbox für wiederkehrende Ereignisse verursacht wurden, wurden behoben.
- Wiederkehrende Muster beim Bearbeiten von "aktuelle und folgende" Vorkommen von wöchentlichen wiederkehrenden Ereignissen, die sich über bestimmte Wochentage erstrecken, wurden korrigiert.

## 7.2

<span class='release_date'>17. Dezember 2024. Minor Update</span>

[Rezension des Releases im Blog](https://dhtmlx.com/blog/dhtmlx-scheduler-7-2/)

### Breaking Changes

Dieses Update enthält Änderungen an einigen Karten-Konfigurationseigenschaften. Siehe die [Migrationshinweise](migration.md) für Details.

### Neue Funktionen

- Möglichkeit zum Bearbeiten von [aktuellen und folgenden wiederkehrenden Ereignissen](guides/recurring-events.md) hinzugefügt.
- Neues [Live-Update-Modul](guides/multiuser-live-updates.md) für die kollaborative Bearbeitung eingeführt.

### Aktualisierungen

- Verbesserte Anzeige von [Übernacht-Ereignissen](api/config/all_timed.md).
- Aktualisierte [Event-Handler für den Mini-Kalender](guides/minicalendar.md#event-handling).
- [Datumsfunktionen](api/other/date.md) sind jetzt nicht-mutierend.

### Fehlerbehebungen

- Probleme mit Container-Resize-Listenern in der LWC-Umgebung behoben.
- Drag-and-Drop-Probleme, wenn Ereignisse nach der Einstellung [scheduler_last_hour](api/config/last_hour.md) enden, wurden behoben.
- Korrekte Ereignisanzeige im [cascade_event_display](api/config/cascade_event_display.md) Modus.
- Drag-Resize-Verhalten beim Vergrößern neuer Ereignisse bis zum unteren Rand der Tages-Spalte mit aktivierter `all_timed` Erweiterung wurde behoben.
- Vertikale Scrollprobleme in der scrollbaren [Timeline-Ansicht](views/timeline.md) bei deaktiviertem Smart Rendering wurden behoben.
- Anzeigeprobleme der Scroll-Buttons in der [Units](views/units.md) Ansicht wurden behoben.
- Anzeige von nicht zugewiesenen Ereignissen in der [Units](views/units.md) Ansicht wurde korrigiert, wenn die Einstellung `skip_incorrect` auf `false` steht.

## 7.1.3

<span class='release_date'>19. November 2024. Bugfix-Release</span>

- Das Problem, dass die ursprünglichen Positionen von Ereignissen nicht [während Drag-and-Drop hervorgehoben](api/config/drag_highlight.md) wurden, wurde in der [Timeline](views/timeline.md) und [Units](views/units.md) Ansicht behoben.
- Das Drag-and-Drop-Verhalten, das durch die Einstellung `last_hour` in der [Timeline-Ansicht](views/timeline.md) beeinflusst wurde, wurde korrigiert.
- [Wiederkehrende Vorkommen](guides/recurring-events.md) verschwinden in bestimmten Zeitzonen während der DST-Umstellung nicht mehr.
- Wiederholte Enddatumserhöhungen beim Umschalten von [Full day](api/config/full_day.md) in der [Mini-Kalender](guides/minicalendar.md#in-the-lightbox) Lightbox-Steuerung wurden behoben.
- Die Funktionalität der Methoden [ignore_year](guides/custom-scales.md) und [ignore_agenda](guides/custom-scales.md) wurde wiederhergestellt.

## 7.1.2

<span class='release_date'>8. Oktober 2024. Bugfix-Release</span>

- Fehlerhafte Ereignispositionen beim Einfügen mit [Strg+C/Strg+V](guides/keyboard-navigation.md) bei aktivierter [multisection](views/units.md#assigning-events-to-several-units) Erweiterung wurden behoben.
- Die [Collision-Erweiterung](guides/collisions.md) funktioniert jetzt korrekt mit neuen [wiederkehrenden Ereignissen](guides/recurring-events.md).
- Korrekte Abschnittshöhen nach dem Aufruf von [scheduler.updateCollection()](api/method/updatecollection.md) mit aktiviertem Smart Rendering in der [Timeline-Ansicht](views/timeline.md).
- Smart Rendering blendet keine Teile neuer [multisection](views/units.md#assigning-events-to-several-units) Ereignisse mehr aus, wenn [onBeforeLightbox](api/event/onbeforelightbox.md) abgebrochen wird.
- Fehlverhalten der Methode [getEvents](api/method/getevents.md) mit [wiederkehrenden Ereignissen](guides/recurring-events.md) wurde behoben.
- Die Behandlung von [wiederkehrenden Ereignissen](guides/recurring-events.md) mit benutzerdefinierten täglichen Eigenschaften wurde verbessert.

## 7.1.1

<span class='release_date'>27. August 2024. Bugfix-Release</span>

- Ein Problem wurde behoben, bei dem der [DataProcessor](api/method/createdataprocessor.md) das Senden von false-Werten nicht erlaubte.
- Das Verschwinden des [Tooltip](guides/tooltips.md) auf Mobilgeräten nach einem Klick wurde behoben.
- Die Positionierung des [Tooltip](guides/tooltips.md) während des Scrollens der Seite wurde korrigiert.
- Das [container_autoresize](guides/extensions-list.md#container-autoresize) Plugin blendet den Multiday-Bereich nicht mehr aus.
- Das [Quick Info](guides/touch-support.md#quick-info-extension) Popup erscheint nicht mehr außerhalb des Containers.
- Nicht bestätigte Ereignisse verschwinden beim Scrollen mit aktiviertem Smart Rendering in der [Timeline-Ansicht](views/timeline.md) nicht mehr.
- Falsche Abschnittshöhen in der [Timeline-Ansicht](views/timeline.md) nach dem Aufruf von [scheduler.updateCollection()](api/method/updatecollection.md) mit aktiviertem Smart Rendering wurden behoben.

## 7.1

<span class='release_date'>31. Juli 2024. Minor Update</span>

[Rezension des Releases im Blog](https://dhtmlx.com/blog/dhtmlx-scheduler-7-1/)

### Breaking Changes

Dieses Update führt Änderungen an einigen Karten-Konfigurationseigenschaften ein. Siehe die [Migrationshinweise](migration.md) für Details.

### Neue Funktionen

- Unterstützung für das Speichern von [wiederkehrenden Ereignissen](guides/recurring-events.md) im RRULE-Format.
- Die Kartenansicht [unterstützt jetzt verschiedene Kartenanbieter](views/map.md).
- Möglichkeit zum [Rückgängigmachen der Löschung eines Ereignisses](api/config/undo_deleted.md) hinzugefügt.
- Die Methode [batchUpdate](api/method/batchupdate.md) wurde eingeführt, um mehrere Ereignisse gleichzeitig zu aktualisieren.

### Aktualisierungen

- Der Scheduler [hervorhebt jetzt die ursprüngliche Position eines Kalendereintrags während Drag-and-Drop](api/config/drag_highlight.md).

### Fehlerbehebungen

- Ein Problem wurde behoben, bei dem das dynamische Ändern der Eigenschaft **x_date** in der [Timeline-Ansicht](views/timeline.md) die Vorlage nicht aktualisierte.
- Korrekte Ausrichtung der Kopfzeile in der Multiday-[Units-Ansicht](views/units.md).
- Ein Skriptfehler nach dem Aufruf des [destructor](api/method/destructor.md) bei aktiver [drag_between](guides/drag-between.md) Erweiterung wurde behoben.
- Die [limit](guides/limits.md) Erweiterung verhindert nicht mehr das Bearbeiten von [wiederkehrenden Serien](guides/recurring-events.md).
- Verbesserte Performance beim Drag-and-Drop von Ereignissen in der [Tree Timeline-Ansicht](views/timeline.md), wenn **show_unassigned** auf *true* gesetzt ist.
- Das Verhalten der scrollbaren [Timeline-Ansicht](views/timeline.md) bei `smart_rendering` = *false* wurde behoben.
- Scrollpositionsprobleme nach dem Wechseln der Ansicht in einer scrollbaren [Timeline-Ansicht](views/timeline.md) wurden korrigiert.

## 7.0.5

<span class='release_date'>30. Mai 2024. Bugfix-Release</span>

### Fehlerbehebungen

- Falsche Höhen von [Timeline](views/timeline.md) Sektionen bei Verwendung von **event_dy:"full"** wurden behoben.
- Der fehlende "Heute"-Marker in der [Jahresansicht](views/year.md) wurde wiederhergestellt.
- Die Positionierung von Ereignissen in der [Tages-](views/day.md) und [Wochenansicht](views/week.md) wurde korrigiert.

## 7.0.4

<span class='release_date'>22. Mai 2024. Bugfix-Release</span>

### Fehlerbehebungen

- Die Option `placeholder` für das [textarea](guides/textarea.md) Steuerelement wurde hinzugefügt.
- Korrekte Zellauswahl in der [Tastaturnavigation](guides/keyboard-navigation.md).
- Die Anzeige des [Quick Info](guides/touch-support.md#quick-info-extension) Popups in der [Agenda-Ansicht](views/agenda.md) wurde behoben.
- Die Typdefinitionen für die [Agenda-Ansicht](views/agenda.md) Vorlagen wurden angepasst.
- Anzeigeprobleme für mehrtägige Ereignisse in der [Monatsansicht](views/month.md), wenn [start_on_monday](api/config/start_on_monday.md) deaktiviert ist und mehrere Spalten in der Ansicht [ausgeblendet](guides/custom-scales.md) sind, wurden behoben.

## 7.0.3

<span class='release_date'>15. März 2024. Bugfix-Release</span>

### Fehlerbehebungen

- Problem behoben, bei dem die [textColor](guides/custom-events-color.md) Eigenschaft in der [Monatsansicht](views/month.md) nicht angewendet wurde
- Die [color](guides/custom-events-color.md) Eigenschaft funktioniert jetzt korrekt in der [Agenda-Ansicht](views/agenda.md)
- Fehler bei der [Tastaturnavigation](guides/keyboard-navigation.md) in der [Tages-Timeline-Ansicht](views/timeline.md) behoben

## 7.0.2

<span class='release_date'>20. Februar 2024. Bugfix-Release</span>

### Fehlerbehebungen

- Kompatibilitätsprobleme mit [DHTMLX Suite](https://docs.dhtmlx.com/suite/) behoben
- Regression beim [mark_now](api/config/mark_now.md) Marker in der [Timeline-Ansicht](views/timeline.md) behoben
- Problem bei der [Theme-Initialisierung](guides/skins.md) behoben, das in einigen Fällen zu einem fehlerhaften Scheduler-Layout führte
- Verlust des Auswahlstylings für selektierte Ereignisse in der [Grid-Ansicht](views/grid.md) nach dem Sortieren behoben
- Doppelte Ereignisse beim Drag & Drop im [Timeline Smart Rendering-Modus](views/timeline.md#horizontal-scroll) korrigiert
- Korrekturen für die [griechische Lokalisierung](guides/localization.md) vorgenommen
- Speicherlecks behoben, sodass Scheduler-Instanzen nach Aufruf des [destructor](api/method/destructor.md) vollständig freigegeben werden

## 7.0.1

<span class='release_date'>5. Februar 2024. Bugfix-Release</span>

### Fehlerbehebungen

- Layoutprobleme in der [Units](views/units.md) Ansicht beim Anzeigen des Schedulers am aktuellen Datum behoben
- Position des [Quick Info](guides/touch-support.md#quick-info-extension) Popups in der [scrollbaren Timeline](views/timeline.md#horizontal-scroll) angepasst
- Positionierung des ausgewählten Zeitfensters durch [Tastaturnavigation](guides/keyboard-navigation.md) bei aktiviertem [RTL](guides/rtl-mode.md) Modus korrigiert
- Fehler behoben, der das Erstellen von mehrtägigen Ereignissen in der [Monatsansicht](views/month.md) nach Drag-Resize-Aktionen in der [Tages](views/day.md)/[Wochen](views/week.md) Ansicht verhinderte

### Aktualisierungen

- Die [Höhe des Mehrtagesbereichs](api/config/multi_day_height_limit.md) in der [Tages](views/day.md)/[Wochen](views/week.md) Ansicht ist jetzt standardmäßig auf 200px begrenzt

## <b>7.0</b>

<span class='release_date'>31. Januar 2024. Major Update</span>

[Übersicht zum Release im Blog](https://dhtmlx.com/blog/dhtmlx-scheduler-7-0/)

### Breaking Changes

Dieses Release bringt Änderungen an der Struktur des Scheduler-Pakets und im Funktionsverhalten. Es wird empfohlen, die [Migrationshinweise](migration.md) zu lesen, um einen reibungslosen Übergang sicherzustellen.

### Neue Funktionen

- [Skins-Anpassung](guides/custom-skins.md) mit CSS-Variablen
- Einführung eines neuen [Dark Skin](guides/skins.md#dark-skin)
- Neue [Agenda-Ansicht](views/agenda.md) hinzugefügt

### Aktualisierungen

- [Terrace Skin](guides/skins.md#terrace-skin) aktualisiert
- Option zur [Installation der Professional Scheduler-Versionen via npm](guides/installation.md) hinzugefügt
- Verbesserte Anpassungsmöglichkeiten für Marker in der [Kartenansicht](views/map.md)
- Verbesserte Standarddarstellung für [kurze Ereignisse](guides/sizing.md) in Tages-/Wochen-/Units-Ansichten
- Hintergrundgitterbilder aus [Tages](views/day.md)/[Wochen](views/week.md)/[Units](views/units.md) Ansichten entfernt
- Die [Bluebird Promise](api/method/promise.md) Bibliothek wurde aus dem Core entfernt
- Verschiedene Verbesserungen für Skalierung auf hochauflösenden und reaktionsfähigen Bildschirmen
- Spalten in [Tages](views/day.md)/[Wochen](views/week.md)/[Units](views/units.md) Ansichten können jetzt [freien Platz reservieren](api/config/day_column_padding.md)
- Typdefinitionen aktualisiert
- Die Export-API ist jetzt Teil von [scheduler.plugins](guides/extensions-list.md#export-service) und benötigt keine zusätzliche JS-Datei mehr. Details siehe [Migration](migration.md) Guide

### Fehlerbehebungen

- Anzeigeprobleme mit dem [Wiederholungsformular](guides/recurring-events.md) bei Verwendung der [französischen Lokalisierung](guides/localization.md) behoben
- Ereignisdauer nach Drag & Drop in der [Timeline-Ansicht](views/timeline.md) bei Verwendung der first_hour/last_hour Einstellungen korrigiert
- Unerwartetes Scrollen beim Verwenden des Mausrads über dem linken Panel in der [Timeline-Ansicht](views/timeline.md) behoben
- Visuelle Verzögerung beim vertikalen Scrollen in der [Timeline-Ansicht](views/timeline.md) auf hochauflösenden Bildschirmen mit aktiviertem Smart Rendering behoben
- Drag & Drop Funktionalität in der [Units-Ansicht](views/units.md) wiederhergestellt, wenn die `all_timed` Erweiterung aktiv ist
- Multiselect-Plugin in GPL-Builds wiederhergestellt

## 6.0.5

<span class='release_date'>31. Juli 2023. Bugfix-Release</span>

### Fehlerbehebungen

- Problem behoben, bei dem das [Lightbox](guides/lightbox-editors.md) in SalesForce LWC nicht funktionierte
- Problem mit [container_autoresize](guides/extensions-list.md#container-autoresize) bei Verwendung von [ignore_week](guides/custom-scales.md) und Wochenbeginn an einem ausgeblendeten Tag behoben

### Verbesserungen

- Typdefinitionen aktualisiert, um [scheduler.form_blocks](guides/custom-lightbox-editor.md) einzuschließen

## 6.0.4

<span class='release_date'>31. Mai 2023. Bugfix-Release</span>

### Fehlerbehebungen

- Fehlerhaftes Verhalten des [dataProcessor](guides/server-integration.md) beim Bearbeiten einer Instanz einer [Wiederholungsserie](guides/recurring-events.md) behoben
 - Problem behoben, das dazu führte, dass [Wiederholungsserien](guides/recurring-events.md) benutzerdefinierte Eigenschaften verloren
 - Skriptfehler nach Aufruf von [scheduler.destructor()](api/method/destructor.md) bei aktiviertem [container_autoresize](guides/extensions-list.md#container-autoresize) behoben
 - Regression in der [Timeline-Ansicht](views/timeline.md) behoben, die Autoscroll beim Drag & Drop von Ereignissen blockierte
 - Der zugeordnete [onContextMenu](api/event/oncontextmenu.md) Event-Handler verhindert jetzt automatisch das Standard-Kontextmenü

## 6.0.3

<span class='release_date'>4. November 2022. Bugfix-Release</span>

### Fehlerbehebungen

- Regression in der [Jahresansicht](views/year.md) behoben, die zu falschen Datumsargumenten für den [onEmptyClick](api/event/onemptyclick.md) Event-Handler führte
- Verhalten der ['height'-Eigenschaft des 'time'-Abschnitts im Lightbox](guides/time.md) korrigiert
- Falsche Höhe der Zeitskala in der Timeline-Ansicht bei Verwendung der [second_scale](views/timeline.md#secondxaxis) behoben
- Wert des neuen Ereignis-Flags in den [onEventCancel](api/event/oneventcancel.md) Event-Argumenten korrigiert, sodass er boolean ist
- Skriptfehler beim Scrollen in der [Tree Timeline](views/timeline.md) Ansicht behoben, wenn [smart_rendering](api/method/createtimelineview.md) aktiviert war und die Sektionen initial im [geschlossenen](views/timeline.md#dataforyaxissectionsinthetreemode) Zustand geladen wurden

## 6.0.2

<span class='release_date'>25. Juli 2022. Bugfix-Release</span>

### Fehlerbehebungen

- Regression in Skripten für das Erstellen von [Custom Skins](guides/custom-skins.md) behoben
- Skriptfehler auf Seiten mit aktivierter Content Security Policy behoben
- Verhalten des DataProcessors korrigiert, wenn er mit dem [router object](guides/server-integration.md#custom-routing) initialisiert wurde
- Tippfehler im DOM-Attributnamen für Zellen in der [Jahresansicht](views/year.md) korrigiert

## 6.0.1

<span class='release_date'>23. Juni 2022. Bugfix-Release</span>

### Fehlerbehebungen

- Kompatibilität mit Salesforce LWC verbessert
- Platzierungsprobleme von Tooltips behoben, die in einigen Fällen zu abgeschnittenen Anzeigen führten
- Anzeige von [Spalten](views/timeline.md#specifying-columns-of-the-left-hand-panel in der [Tree Timeline](views/timeline.md) Ansicht korrigiert
- Das Deaktivieren von [show_quick_info](api/config/show_quick_info.md) verhindert nun das Erscheinen des [Quick Info](guides/touch-support.md#quick-info-extension) Popups bei Mausklick, erlaubt aber weiterhin das Öffnen über die [showQuickInfo](api/method/showquickinfo.md) Methode
- Falsches Verhalten der [repeat_date](api/config/repeat_date.md) Einstellung in bestimmten Fällen behoben

## <b>6.0</b>

<span class='release_date'>19. Mai 2022. Major Update</span>

[Übersicht zum Release im Blog](https://dhtmlx.com/blog/dhtmlx-scheduler-6-0/)

### Breaking Changes

Diese Version bringt Änderungen an der Struktur und Funktionalität des Scheduler-Pakets. Es wird empfohlen, die [Migrationshinweise](migration.md#53---60) für ein reibungsloses Update zu lesen.

### Neue Funktionen

- [Destruktoren für Scheduler- und DataProcessor-Instanzen](guides/multiple-per-page.md#destructor-of-scheduler-and-dataprocessor-instances) hinzugefügt
- Möglichkeit, die [Höhe von Timeline-Sektionen](views/timeline.md#changingheightsofsections) festzulegen
- Unterstützung für die Angabe von [mehreren Spalten](views/timeline.md#specifying-columns-of-the-left-hand-panel im linken Panel der Timeline
- Neue Methoden **resolvePosition**, **dateFromPos**, **getEventTop** im [Timeline-Objekt](views/timeline.md#getting-coordinates-of-a-specific-position eingeführt

### API

- Neues [week_agenda_date](api/template/week_agenda_date.md) Template hinzugefügt
- [ajax](api/other/ajax.md), [env](api/other/env.md) und [i18n](api/other/i18n.md) Objekte eingeführt
- Neue [Promise](api/method/promise.md) Methode hinzugefügt
- [destructor()](api/method/destructor.md) Methode und [onDestroy](api/event/ondestroy.md) Event hinzugefügt
- Debug-Helfer eingeführt: [assert()](api/method/assert.md) Methode, [show_errors](api/config/show_errors.md) Eigenschaft, [onError](api/event/onerror.md) Event
- Neue Methoden: [bind()](api/method/bind.md), [copy()](api/method/copy.md), [defined()](api/method/defined.md), [mixin()](api/method/mixin.md)
- dataProcessor-Konstruktorfunktion aus dem globalen Scope in das scheduler-Objekt verschoben (window.dataProcessor -> [scheduler.DataProcessor](api/method/dataprocessor.md))
- Neue [createDataProcessor()](api/method/createdataprocessor.md) Methode hinzugefügt
- Öffentliche Helfer für [Popup-Nachrichten](guides/popups-and-modals.md) wurden von **dhtmlx** zu **scheduler** verschoben
- Neue [serialize()](api/method/serialize.md) Methode hinzugefügt
- Neue [overwrite_marked_timespans](api/config/overwrite_marked_timespans.md) Eigenschaft eingeführt

### Aktualisierungen

- Alle Erweiterungen müssen jetzt über die [plugins()](api/method/plugins.md) Methode aktiviert werden
- Lokalisierungsdateien entfernt; neue [API](api/other/i18n.md) für die Scheduler-Lokalisierung eingeführt
- `Scheduler.getSchedulerInstance` kann jetzt ein Konfigurationsobjekt beim Erstellen einer neuen Scheduler-Instanz akzeptieren
- CSP-Erweiterung entfernt; [csp mode ist jetzt standardmäßig aktiviert](api/config/csp.md)
- `settings` Objekt als dritter Parameter für die [attachEvent()](api/method/attachevent.md) Methode hinzugefügt
- [Routing-Optionen für DataProcessor](guides/server-integration.md#custom-routing) hinzugefügt
- [Import von dhtmlxScheduler als ES6-Modul](guides/initialization.md#import-files-into-es67-and-typescript-apps) ermöglicht

## 5.3.14

<span class='release_date'>29. März 2022. Bugfix-Release</span>

### Fehlerbehebungen

- Drag & Drop Verhalten für Wiederholungsereignisse, die über die [scheduler.addEvent()](api/method/addevent.md) Methode hinzugefügt wurden, korrigiert
- Skriptfehler von [scheduler.formSection()](api/method/formsection.md) bei aktiven Wiederholungsereignissen behoben
- Problem behoben, bei dem der Scheduler Ereignisse anzeigte, die aufgrund der [first_hour](api/config/first_hour.md) Konfiguration ausgeblendet sein sollten
- Unerwartetes Auslösen des [onEventUnselected](api/event/oneventunselected.md) Events bei jedem Leerklick, wenn keine Ereignisse ausgewählt waren, entfernt
- [onEventUnselected](api/event/oneventunselected.md) Event wird jetzt ausgelöst, wenn das ausgewählte Ereignis gelöscht wird

## 5.3.13

<span class='release_date'>9. November 2021. Bugfix-Release</span>

### Fehlerbehebungen

- Behoben: Bearbeitete [Serientermine](guides/recurring-events.md) verschwanden nach dem Schließen der [Lightbox](guides/configuring-the-lightbox.md) mit [scheduler.hideLightbox](api/method/hidelightbox.md).
- Dynamisches Deaktivieren der [auto_end_date](api/config/auto_end_date.md)-Konfiguration korrigiert.
- Verbesserte Behandlung von [geänderten Instanzen](guides/recurring-events.md#editingdeleting-a-certain-occurrence-in-the-series) in Serienterminen, wenn das `start_date` des Serientermins Millisekunden enthält.
- Behoben: Verschiebung der Scrollposition durch das [Keyboard Navigation](guides/keyboard-navigation.md)-Modul beim Ändern der Eventgröße in bestimmten Fällen.
- Verbesserte Fokussierung, wenn die [Keyboard Navigation](guides/keyboard-navigation.md) aktiviert ist, sodass der modale Fokus das tabindex für die [Lightbox](guides/configuring-the-lightbox.md) und `dhtmlx.modalbox` beachtet.
- Anpassung des "Heute"-Buttons: Der Fokus liegt nun auf der ersten Zelle der Heute-Spalte statt auf der ersten Zelle der ersten Spalte in der [Wochenansicht](views/week.md).
- Probleme mit [scheduler.showEvent](api/method/showevent.md) in der [Timeline-Ansicht](views/timeline.md#horizontal-scroll) bei aktiviertem [Smart Rendering](api/method/createtimelineview.md) behoben.

## 5.3.12

<span class='release_date'>24. August 2021. Bugfix-Release</span>

### Fehlerbehebungen

- Behoben: Endlosschleife in der [Tree Timeline](views/timeline.md#dataforyaxissectionsinthetreemode)-Ansicht durch doppelte Schlüssel in der Abschnittsliste.
- Korrigiertes Verhalten monatlicher [Serientermine](guides/recurring-events.md) bei Verwendung des Limits `After N occurrences`.
- Die [recurring_overflow_instances](api/config/recurring_overflow_instances.md)-Konfiguration im `lastDay`-Modus behält nun Minuten und Sekunden der Termininstanzen bei.
- Problem behoben, das das Verschieben von Terminen aus dem Scheduler verhinderte, wenn `false` von [onBeforeEventDragOut](api/event/onbeforeeventdragout.md) zurückgegeben wurde.
- Standard-CSS für [Tree Timeline](views/timeline.md#dataforyaxissectionsinthetreemode)-Abschnitts-[Labels](api/template/timelinename_scale_label.md) aktualisiert, um unerwünschte Zeilenumbrüche bei langen Labels zu vermeiden.

## 5.3.11

<span class='release_date'>9. Februar 2021. Bugfix-Release</span>

### Fehlerbehebungen

- Behoben: Skriptfehler beim Wechseln von Daten mit aktivierter [Cookie-Erweiterung](guides/extensions-list.md#cookie).
- Korrigierter Wert des Content-Type-Headers, wenn der dataProcessor [transaction mode](https://docs.dhtmlx.com/api__dataprocessor_settransactionmode.html) auf "JSON" gesetzt ist.
- Verbesserte CSS für die Lightbox auf [mobilen Geräten](guides/touch-support.md) bei Verwendung des [Terrace](guides/skins.md#terrace-skin)-Skins.
- Behoben: Probleme mit [Serienterminen](guides/recurring-events.md), die dazu führten, dass einige Termine in den nächsten Monat verschoben wurden, wenn das Zielmonat das entsprechende Datum nicht hatte und eine "monatliche" Wiederholung eingestellt war.
- Problem behoben, bei dem das modale Overlay nach dem Schließen der Lightbox über [scheduler.updateCollection()](api/method/updatecollection.md) sichtbar blieb.

### Updates

- Neues API-Event [onBeforeEventPasted](api/event/onbeforeeventpasted.md) hinzugefügt, um die Validierung oder Anpassung eingefügter Terminpositionen zu ermöglichen.
- Neue Konfigurationsoption [recurring_overflow_instances](api/config/recurring_overflow_instances.md) eingeführt.

## 5.3.10

<span class='release_date'>11. November 2020. Bugfix-Release</span>

### Fehlerbehebungen

- Korrigiertes Verhalten von [column_width](views/timeline.md#horizontal-scroll), wenn einige Einheiten [ausgeblendet](guides/custom-scales.md) sind.
- Touch-Unterstützungsprobleme auf dem iPad mit Safari behoben.
- Falsche Behandlung von [onDblClick](api/event/ondblclick.md) und [onClick](api/event/onclick.md) Events bei Rückgabe von *false* in der [Grid-Ansicht](views/grid.md) behoben.
- Drag & Drop-Verhalten in der [Timeline-Ansicht](views/timeline.md) korrigiert, das dazu führte, dass Termine beim Klicken nahe der unteren Kante einer Terminleiste in den nächsten Abschnitt verschoben wurden.

## 5.3.9

<span class='release_date'>4. Juni 2020. Bugfix-Release</span>

### Fehlerbehebungen

- Anzeigeprobleme mit einer [scrollbaren Timeline](views/timeline.md#horizontal-scroll) nach dem Herunterscrollen und Ziehen der letzten Zeile behoben.
- Anzeigeprobleme beim Wechsel zwischen zwei [scrollbaren Timelines](views/timeline.md#horizontal-scroll) behoben.
- Skriptfehler beim Scrollen einer [Timeline](views/timeline.md) auf Touch-Geräten behoben.
- Content-Type-Header für POST/PUT/DELETE-Anfragen, die von `dataProcessor` gesendet werden, bei Verwendung von [benutzerdefinierten Headern](guides/server-integration.md#custom-request-headers-and-parameters) korrigiert.
- Das Template [timeline_row_class](api/template/timelinename_row_class.md) zum Anwenden von CSS-Klassen auf Timeline-Zeilen hinzugefügt.

## 5.3.8

<span class='release_date'>14. Mai 2020. Bugfix-Release</span>

### Fehlerbehebungen

- Falsche Höhe des modalen Overlays in der [Lightbox](guides/lightbox-editors.md) behoben.
- Größenprobleme beim Initialisieren des Schedulers in Bootstrap-Modals behoben.

### Updates

- Scheduler überwacht nun automatisch Änderungen der Containergröße und passt seine Dimensionen entsprechend an.
- Die [Mini Calendar](guides/minicalendar.md)-Steuerung für die [header config](api/config/header.md) wurde hinzugefügt.

## 5.3.7

<span class='release_date'>30. April 2020. Bugfix-Release</span>

- Probleme mit der [Container Autoresize](guides/extensions-list.md#container-autoresize)-Erweiterung behoben, wenn in der Timeline-Ansicht ein horizontaler Scrollbalken aktiviert ist ([Timeline-Ansicht](views/timeline.md#horizontal-scroll)).
- Die Konfigurationsoption [show_unassigned](api/method/createtimelineview.md) in der [Timeline-Ansicht](views/timeline.md) korrigiert.

## 5.3.6

<span class='release_date'>27. Februar 2020. Bugfix-Release</span>

- Anzeigeprobleme von Terminen in der [Day Timeline-Ansicht](views/timeline.md#viewmodes) bei aktiviertem `scrollable:true` oder `smart_rendering:true` behoben.
- Skriptfehler in der [Day Timeline-Ansicht](views/timeline.md#viewmodes) nach dem Ziehen eines neuen Termins bei Verwendung von `scrollable:true` zusammen mit [dataProcessor](guides/server-integration.md) behoben.
- Skriptfehler durch fehlende `date`-Elemente in der [header config](guides/initialization.md#initializing-scheduler-via-header-config) behoben.
- Verbesserte Darstellung des `day`-Tabs im [Material Skin](guides/skins.md#material-skin), wenn in der [header config](guides/initialization.md#initializing-scheduler-via-header-config) `week` oder `month` Tabs fehlen.

## 5.3.5

<span class='release_date'>31. Januar 2020. Bugfix-Release</span>

### Fehlerbehebungen

- Styling des 'Weiter'-Buttons auf der rechten Seite des Navigationspanels im [Terrace Skin](guides/skins.md#terrace-skin) bei Verwendung der [header config](guides/initialization.md#initializing-scheduler-via-header-config) behoben.
- Probleme mit der [URL-Erweiterung](guides/extensions-list.md#url) behoben, die in einigen Fällen das Hervorheben von Terminen per URL verhinderten.
- Probleme mit dem [Material Skin](guides/skins.md#material-skin) beim Laden von Scheduler-Styles via `@import` behoben.

### Updates

- Automatische Standard-Scheduler-Header hinzugefügt, falls bei der Scheduler-Initialisierung weder [header config](guides/initialization.md#initializing-scheduler-via-header-config) noch [default markup](guides/initialization.md#initializing-scheduler-via-markup) bereitgestellt werden, um Skriptfehler zu vermeiden.

## 5.3.4

<span class='release_date'>10. Dezember 2019. Bugfix-Release</span>

### Fehlerbehebungen

- Vertikale Scrollprobleme in der [scrollbaren Timeline](views/timeline.md#horizontal-scroll) behoben, wenn sich die Maus über der Abschnittsspalte befindet.
- Serialisierung verschachtelter Objekte durch den [dataProcessor](guides/server-integration.md) korrigiert.
- Skriptfehler beim Erstellen neuer Termine mit einer [benutzerdefinierten Lightbox](guides/custom-details-form.md) behoben.

## 5.3.3

<span class='release_date'>30. Oktober 2019. Bugfix-Release</span>

### Updates

- Fehlermeldungen für gängige Fehlkonfigurationen informativer gestaltet.
- HTML-Markup in mehreren öffentlichen Beispielen bereinigt.

## 5.3.2

<span class='release_date'>9. Oktober 2019. Bugfix-Release</span>

### Fehlerbehebungen

- Falsches Verhalten des Klick-[Handlers](api/method/rendercalendar.md) im [Mini Calendar](guides/minicalendar.md) behoben, wenn ein benutzerdefiniertes [calendar_date template](api/template/calendar_date.md) definiert ist.
- Korrektes Runden der Enddaten von Terminen beim [Resize](api/config/drag_resize.md) in der [Tages-/Wochenansicht](/views/).

## 5.3.1

<span class='release_date'>2. Oktober 2019. Bugfix-Release</span>

### Updates

- [responsive_lightbox](api/config/responsive_lightbox.md) standardmäßig deaktiviert.

## 5.3

<span class='release_date'>2. Oktober 2019. Minor-Update</span>

[Review des Releases im Blog](https://dhtmlx.com/blog/dhtmlxscheduler-5-3-minor-update-rtl-support-improved-responsiveness/)

### Breaking Changes

Dieses Update passt das Verhalten einiger Komponenten an. Es werden keine Brüche im bestehenden Code erwartet, dennoch wird empfohlen, die [Migration notes](migration.md#53---60) für einen reibungslosen Übergang zu prüfen.

### Neue Funktionen

1. [RTL-Unterstützung](guides/rtl-mode.md) hinzugefügt.
2. Verbesserte mobile Responsivität ([[Mobile Responsive Scheduler](guides/touch-support.md)]).
3. Integration mit DHTMLX Suite 6 Layout ([Integration mit dhtmlxLayout](integrations/other/dhxlayout-integration.md#dhtmlxsuite-v6).

### Updates

1. Die [year range](guides/time.md#properties)-Einstellung für das Date/Time-Lightbox-Control hinzugefügt.
2. Horizontaler Swipe zum Ändern von Scheduler-Daten standardmäßig deaktiviert ([Mobile Responsive Scheduler](guides/touch-support.md#touch-gestures-in-the-scheduler)).
3. Scheduler-Header kann nun aus der Konfiguration statt aus dem Markup gesetzt werden ([dhtmlxScheduler in Plain JS/HTML](guides/initialization.md#initializing-scheduler-via-header-config)).
4. Die Methode [render](api/method/render.md) als klareren Alias für setCurrentView() und updateView() eingeführt.
5. Die Methode [hideLightbox](api/method/hidelightbox.md) zur öffentlichen API hinzugefügt.

### Fehlerbehebungen

- Die [vertikale](guides/multiselect.md#properties) Konfiguration des Multiselect-Controls funktionierte im [Material Skin](guides/skins.md#material-skin) nicht und wurde behoben.

## 5.2.5

<span class='release_date'>23. September 2019. Bugfix-Release</span>

### Fehlerbehebungen

- Regression in der [Tooltips](guides/tooltips.md)-Erweiterung aus [v5.2.4](#524) behoben.

## 5.2.4

<span class='release_date'>19. September 2019. Bugfix-Release</span>

### Fehlerbehebungen

- Problem mit dem [readonly-Formular](guides/readonly.md#read-only-mode-for-the-entire-lightbox) behoben, das das Ändern der [Lightbox-Konfiguration](guides/lightbox-editors.md) nach der [Initialisierung](api/method/init.md) des Schedulers verhinderte.
- Kompatibilitätsprobleme mit Angular 8 behoben.

## 5.2.3

<span class='release_date'>20. August 2019. Bugfix-Release</span>

### Fehlerbehebungen

- Animation von Terminleisten in der [scrollbaren Timeline](views/timeline.md#horizontal-scroll) beim Drag & Drop korrigiert.
- Problem in [Tagesansicht](views/day.md) / [Week-Ansicht](views/week.md) behoben, bei dem ein Termin beim Verschieben an das Tagesende in den [Multiday-Bereich](api/config/multi_day.md) sprang.
- Die korrekte Funktionalität der Einstellung `scroll_position` in der [scrollbaren Timeline](views/timeline.md#horizontal-scroll) wiederhergestellt.
- Positionsfehler bei Segmenten von [Multi-Section-Terminen](views/timeline.md#assignment-of-events-to-several-sections) nach einem Mausklick behoben.
- Skriptfehler durch das Tooltip im `cell`-Modus der [Timeline-Ansicht](views/timeline.md#viewmodes) bei Verwendung von [ignore_timeline](guides/custom-scales.md) behoben.

## 5.2.2

<span class='release_date'>7. August 2019. Bugfix-Release</span>

### Fehlerbehebungen

- Klarere Fehlermeldungen für gängige Fehlkonfigurationen hinzugefügt.
- Skriptfehler beim Doppelklick auf ein beliebiges Label im [readonly-Formular](guides/readonly.md#read-only-mode-for-the-entire-lightbox) behoben.
- Anzeigeprobleme in der [Timeline-Ansicht](views/timeline.md) bei Verwendung von `smart_rendering:true` zusammen mit `section_autoheight:false` behoben.
- Skriptfehler in der [Jahresansicht](views/year.md) behoben, wenn Tage mit Terminen mit der Methode [scheduler.ignore_year](guides/custom-scales.md) ausgeblendet wurden.

## 5.2.1

<span class='release_date'>11. Juni 2019. Bugfix-Release</span>

### Fehlerbehebungen

- Behebung von Problemen bei der Datentyp-Erkennung in IE11 wie in [load](api/method/load.md) beschrieben.
- Die Methode [timeline.scrollTo](views/timeline.md#timeline-object-api) funktioniert jetzt auch für Zeitachsen ohne [horizontale Scrollleiste](views/timeline.md#horizontal-scroll).
- Die Funktionalität der Methode [showEvent](api/method/showevent.md) in der [Timeline-Ansicht](views/timeline.md) wurde wiederhergestellt.
- Das vertikale Scrollverhalten in der [scrollbaren Timeline](views/timeline.md#horizontal-scroll) wurde korrigiert, wenn `smart_rendering:false` gesetzt ist.
- Die Positionierung von Ereignissen in der [mehrtägigen Units-Ansicht](views/units.md#displaying-units-for-multiple-days) mit der [multisection](views/units.md#assigning-events-to-several-units) Erweiterung wurde bei gesetzter [step](views/units.md#scrollingunits)-Option behoben.
- Anpassung der Ereignisgrößen in der [Tages-Timeline](views/timeline.md#daysmodedetails).

## 5.2

<span class='release_date'>6. Juni 2019. Kleines Update</span>

[Rezension des Releases im Blog](https://dhtmlx.com/blog/dhtmlxscheduler-5-2-custom-content-timeline-view-enhanced-drag-n-drop/)

### Breaking Changes

Mehrere API-Methoden haben ein aktualisiertes Verhalten. Diese Änderungen führen in der Regel nicht zu Problemen mit bestehendem Code, dennoch wird empfohlen, die [Migrationshinweise](migration.md#51---52) für einen reibungslosen Übergang zu lesen.

### Neue Funktionen

1. Unterstützung für [benutzerdefinierten HTML-Inhalt in Timeline-Zellen](views/timeline.md#custom-content-in-cells) (PRO-Version) hinzugefügt.
2. [Drag-n-drop von Ereignissen über den Body](api/config/drag_event_body.md) ermöglicht.

### Aktualisierungen

- Der Parameter für das Datenformat in [load](api/method/load.md) und [parse](api/method/parse.md) ist nun optional; der Scheduler erkennt das Format automatisch.
- [Date-to-string Funktionen](guides/date-formats.md) können Datumsformate automatisch erkennen, auch wenn sie vom angegebenen Format abweichen.
- Die [dhtmlxConnector Bibliothek](https://github.com/DHTMLX/connector-php) ist nicht mehr im dhtmlxScheduler-Paket enthalten.
- Beispielpakete benötigen keinen PHP/Apache-Server mehr zum Ausführen.
- Neue Methoden für das [Timeline-Objekt](views/timeline.md#timeline-object-api) wurden eingeführt.
- Das [Multiselect](guides/multiselect.md)-Steuerelement unterstützt jetzt das Laden von Optionen im JSON-Format.
- Neue Events [onLoadStart](api/event/onloadstart.md), [onBeforeParse](api/event/onbeforeparse.md), [onParse](api/event/onparse.md), [onLoadEnd](api/event/onloadend.md) hinzugefügt, die die veralteten **onXLS** und **onXLE**-Events ersetzen.

### Fehlerbehebungen

- Falsches Verhalten behoben, wenn [clearAll](api/method/clearall.md) vor `scheduler.endLightbox(false)` bei der Erstellung eines neuen Ereignisses aufgerufen wurde.
- Flackern beim [horizontalen Scrollen der Timeline](views/timeline.md#horizontal-scroll) auf dem iPad behoben.
- Verschiedene Anzeigeprobleme mit der [scrollbaren Timeline](views/timeline.md#horizontal-scroll) behoben.
- Die Units-Ansicht [](api/template/unitsname_scale_text.md) enthält jetzt ein Abschnittsdatum in den Argumenten.
- Skriptfehler in der [Units-Ansicht](views/units.md) beim Erstellen eines Ereignisses ohne geladene Abschnitte behoben.
- Das [Multiselect](guides/multiselect.md)-Steuerelement akzeptiert jetzt nur noch boolesche Werte für die `vertical`-Eigenschaft; Zeichenfolgen wie `vertical:"false"` werden nun als boolesches `true` interpretiert.

## 5.1.6

<span class='release_date'>11. Januar 2019. Fehlerbehebungs-Release</span>

### Fehlerbehebungen

- Korrekte Ereignispositionen für Ereignisse am Sa-So mit `start_on_monday = false` in der Monatsansicht.
- Skriptfehler in scrollbaren Timelines mit aktuellem Zeitmarker behoben.
- Falsche Argumentwerte für den Handler `onYScaleClick` in scrollbaren Timelines nach horizontalem Scrollen korrigiert.
- Problem behoben, bei dem scrollbare Timelines nach dem Neuladen von Abschnitten leer gerendert wurden, bis sie aktualisiert wurden.
- Darstellungsprobleme behoben, bei denen einige Ordnerzellen in der Tree-Timeline nach horizontalem Scrollen nicht angezeigt wurden.
- Korrektes Verhalten beim Ändern der Ereignisgröße mit der `all_timed`-Erweiterung, sodass nur das letzte Ereignisstück in der Größe veränderbar ist.
- Behebung des Verschwindens von Ereignissen während der Größenänderung im Modus `all_timed="short"`.

## 5.1.1

<span class='release_date'>14. Dezember 2018. Fehlerbehebungs-Release</span>

### Fehlerbehebungen

- Die Tastaturfokussierung wird in der Timeline nun korrekt hervorgehoben.
- Die anfängliche Höhe von `timeline_scale_header` wird bei Angabe von `second_scale` korrekt gesetzt.
- Das Problem, dass `event_min_dy` die Abschnittshöhe nicht beeinflusst, wenn sich nur ein Ereignis in einem Abschnitt befindet, wurde behoben.
- Selbstschließendes Quick-Info-Popup beim mehrmaligen Klicken auf dasselbe Ereignis behoben.
- Skriptfehler nach dem Löschen von Ereignissen in der `Jahresansicht` behoben.
- Falsche anfängliche Anzeige gescrollter Timelines, wenn keine Ereignisse geladen sind, behoben.
- Smart Rendering für nicht-scrollbare Timelines aktiviert.
- Das Zurücksetzen der Scrollposition bei Datumsänderungen in der Timeline mit aktivierter key_nav-Erweiterung wurde behoben.
- Der Wert des Arguments `old_date` im Event `onBeforeViewChange` wird in manchen Fällen nun korrekt übergeben.
- Anzeigeprobleme in scrollbaren Timelines mit ignorierten Zeitfeldern behoben.
- Verbesserte Handhabung beim Scrollen während der Erstellung neuer Ereignisse in Tages-/Wochenansichten.
- Das Event `onAfterSchedulerResize` wird nun in der `Timeline-Ansicht` ausgelöst.
- Verbesserte Performance beim Rendern von Ereignissen in der `Wochenansicht`.

## 5.1

<span class='release_date'>29. November 2018. Kleines Update</span>

[Rezension des Releases im Blog](https://dhtmlx.com/blog/dhtmlxscheduler-5-1-horizontal-scroll-and-new-server-side-integrations/)

### Breaking Changes

Die HTML-Struktur der Timeline-Ansicht wurde stark überarbeitet; für die Migration sind ggf. Codeanpassungen erforderlich. Details finden Sie im Artikel zur [Migration](migration.md#50---51).

### Hauptänderungen

1. Einführung des [horizontalen Scrollens in der Timeline-Ansicht](views/timeline.md#horizontal-scroll) (PRO-Version).
2. Verbesserte Smart Rendering- und Performance-Optimierungen für die Timeline-Ansicht (PRO-Version).
3. Integration mit verschiedenen serverseitigen Plattformen. [Siehe zugehörige Tutorials](integrations/howtostart-guides.md).

### Kleine Änderungen

- [API des Timeline-Objekts](views/timeline.md#timeline-object-api) aktualisiert.
- Unterstützung für [Autoscroll in der Timeline-Ansicht](views/timeline.md#autoscrollconfiguration) hinzugefügt.
- Möglichkeit, eine Beschriftung für die Kopfzeile der Spalte mit Abschnitten in der Timeline-Ansicht hinzuzufügen.

## <b>5.0</b>

<span class='release_date'>17. Mai 2018. Major Update</span>

[Rezension des Releases im Blog](https://dhtmlx.com/blog/dhtmlxscheduler-5-0-material-design/)

### Breaking Changes

1. Die Classic- und Glossy-Skins wurden entfernt. Siehe [Migrationsdetails](migration.md#44---50).
2. Globales CSS-Refactoring im Scheduler durchgeführt. Informationen zu den Auswirkungen auf Ihre Anwendungen finden Sie [hier](migration.md#44---50).

### Hauptänderungen

1. Neuer [Material Skin](guides/skins.md#material-skin) hinzugefügt.
2. [Serverseitige Integration mit REST API](guides/server-integration.md) eingeführt.
3. Erweiterte Flexibilität durch [Skin-Anpassung](guides/custom-skins.md).

### Kleine Änderungen

- Touch-Unterstützung für Microsoft-Geräte aktualisiert.
- [Hebräische Lokalisierung](guides/localization.md) für das Formular für wiederkehrende Ereignisse hinzugefügt.
- [onLoadError](api/event/onloaderror.md) für Netzwerk- und Serverfehler eingeführt.

### Fehlerbehebungen und Verbesserungen

- Kompatibilitätsprobleme mit ES6/TS-Imports behoben.
- Verbesserte Unterstützung für Tastaturnavigation.
- Verschiedene kleinere Fehlerbehebungen.

## 4.4.9

<span class='release_date'>6. Juni 2017. Fehlerbehebungs-Release</span>

### Fehlerbehebungen

- Regression im WAI-ARIA-Support behoben, wenn WAI-ARIA-Attribute deaktiviert sind.
- Verbesserter WAI-ARIA-Support zur Steigerung der JAWS-Kompatibilität.
- Mehrere Fehler und Verbesserungen bei der Tastaturnavigation behoben.
- Fehlerhafte Server-Konfigurationsbeispiele in den Beispielen korrigiert.
- Konflikte zwischen Cookie- und Ajax-Ladezeitüberschreitungen in der Cookie-Erweiterung gelöst.
- Fehler bei der Ereigniserstellung in der Jahresansicht behoben.
- Fehlerhafte Mausposition beim Drag & Drop auf gezoomten Seiten korrigiert.
- Drag & Drop auf Touch-Geräten in der all-timed-Erweiterung behoben.
- Dynamisches Laden angepasst, um falsche Zeitbereiche durch die *server_utc*-Konfiguration zu beheben.
- Verschiedene kleinere Fehler in Lokalisierungen behoben.

## 4.4

<span class='release_date'>2. Februar 2017. Kleines Update</span>

[Rezension des Releases im Blog](https://dhtmlx.com/blog/scheduler-4-4-released-accessibility-support-minor-improvements/)

### Hauptänderungen

1. [Tastaturnavigation](guides/keyboard-navigation.md) hinzugefügt.
2. [WAI-ARIA-Unterstützung](guides/accessibility.md#wai-aria-attributes) eingeführt.
3. [High-Contrast-Themes](guides/accessibility.md#high-contrast-themes) hinzugefügt.
4. Erste Unterstützung für Content Security Policy bereitgestellt.

### Kleine Änderungen

- Möglichkeit zum Aktivieren von markTimespan für die Monatsansicht.
- Möglichkeit, wiederkehrende Marker an bestimmten Daten zu entfernen.
- Option zum Überspringen von Tagen in der Jahresansicht hinzugefügt.
- Die *delimiter*-Option für das Multiselect-Steuerelement eingeführt.
- Kompatibilität von externem Drag-n-Drop mit der neuesten dhtmlxSuite aktualisiert.
- CSP-Verbesserungen aus dem öffentlichen Repository übernommen.
- Kleine Performance-Verbesserungen für die [Timeline](views/timeline.md).
- Z-Index-Werte normalisiert und Styles für die neueste [dhtmlxCombo](guides/combo.md) aktualisiert.

### Fehlerbehebungen und Verbesserungen

- addEventNow gibt nun die ID des neuen Ereignisses zurück.
- Drag-n-Drop-Probleme und ignorierte Spalten in der Wochenansicht behoben.
- Überprüfungen für undefinierte Touch-Events hinzugefügt.
- Klick- und Tastaturfokusprobleme auf dem iPad behoben.
- Dataprocessor-Status nach scheduler.clearAll gelöscht.
- JS-Fehler in Event-Handlern von SVG-Elementen behoben.
- Verschiedene Fehler in der Tooltip-Erweiterung behoben.
- Mehrere Probleme mit der container_autosize-Erweiterung behoben.
- Viele weitere Fehler behoben.

## 4.3.35

<span class='release_date'>26. Mai 2016. Fehlerbehebungs-Release</span>

### Fehlerbehebungen

- Neueste Version der DHTMLX Suite Bibliothek integriert
- Unterstützung für SVG-Elemente im Scheduler hinzugefügt
- Korrigierte Drag- und Erstellung von Ereignisdaten in Timelines mit gerundeten Daten
- Doppelklick auf markierte Zeitspannen respektiert nun die Einstellung *scheduler.config.dblclick_create*
- Falsche Argumente für `onXScaleClick` in Timelines behoben, wenn *scheduler.ignore_timeline* aktiv ist
- Verbesserte Layoutausrichtung bei aktiviertem Browser-Zoom
- Ignorierte Spalten und Anzeige der Jahresansicht behoben
- Fehler auf Multi-Touch-Bildschirmen behoben
- Verbesserte Tastaturfokussierung auf mobilen Geräten
- Verschiedene Probleme mit Sommerzeit (DST) behoben
- Ereignisse am 31. Tag eines Monats werden jetzt korrekt in der Tages-Timeline angezeigt
- `addEventNow` gibt nun die ID des neu erstellten Ereignisses zurück
- Behebung der Scheduler-Behandlung von `window.onresize`, wenn der Scheduler-Container aus dem DOM entfernt wurde

## 4.3.25

<span class='release_date'>3. März 2016. Fehlerbehebungs-Release</span>

### Fehlerbehebungen

- Verbesserte Touch-Unterstützung, um Tap und Doppeltap auf mehrtägigen Bereichen in den Ansichten Day, Week und Units auszulösen
- Behoben: Regression, bei der Events zu Beginn von Touch-Drag-Aktionen verschwanden
- Korrigierter onYScaleClick Callback, wenn ignorierte Spalten in der Timeline gesetzt sind
- Behobener Event-Objekt-Status nach dem Abbrechen von Drag & Drop in der Timeline
- Das *timeline_scale_class* Template wird nun auf Ordner-Elemente im Tree Timeline angewendet
- Verhindert JavaScript-Fehler beim Leeren des Schedulers während einer laufenden dataProcessor-Anfrage
- Falsche Zustände beim Hinzufügen/Ändern von wiederkehrenden Serien mit deaktiviertem autoUpdate im dataProcessor behoben
- Verbesserte Sichtbarkeit von Events, wenn erste oder letzte Stunden in Day- und Week-Ansichten aktiviert sind
- Korrigierte Standardauswahl der Sektion beim Erstellen von Events per Doppelklick in der Multiday Units View
- Behebung eines Chrome-Bugs, der gelegentlich das Auslösen von Klick- und Doppelklick-Ereignissen verhinderte
- Behebung von Problemen mit der Sommerzeit in Safari
- Diverse kleinere Fehlerbehebungen

## 4.3

<span class='release_date'>4. Februar 2015. Minor Update</span>

1. Neuer "Days"-Modus für die Timeline-Ansicht (PRO-Version) ([details](views/timeline.md#daysmodedetails))
2. Anzeige von Einheiten über mehrere Tage in der Units-Ansicht ermöglicht (PRO-Version) ([details](views/units.md#displaying-units-for-multiple-days))
3. Neue Events für die 'expand'-Erweiterung eingeführt ([details](guides/extensions-list.md#expand))
4. Neue Option für die Limit-Erweiterung hinzugefügt ([details](api/config/now_date.md), [details](guides/extensions-list.md#limit))
5. Neue Option für die Tooltip-Erweiterung hinzugefügt ([details](api/config/touch_tooltip.md), [details](guides/extensions-list.md#tooltip))
6. Verknüpfung von Events mit der URL-Erweiterung ermöglicht ([details](guides/extensions-list.md#url))
7. Behebung von Problemen mit der Sommerzeit
8. Problem beim Erstellen neuer Events auf Touch-Geräten in der Timeline-Ansicht behoben
9. Hinzugefügt: Week Agenda, Grid View, Timeline View, Units View und Multisection Events (PRO-Version) ([details](views/weekagenda.md), [details](views/grid.md), [details](views/timeline.md), [details](views/units.md), [details](api/config/multisection.md))

## 4.2

<span class='release_date'>12. November 2014. Minor Update</span>

1. Möglichkeit zur Anpassung des Layouts des wiederkehrenden Event-Formulars hinzugefügt ([details](guides/recurring-events.md#custom-control-for-the-lightboxs-recurring-block))
2. DataProcessor mit REST-Modus und JSON-Antworten aktualisiert ([details](guides/server-integration.md#rest-json-mode))
3. Drag & Drop für Multisection-Events verbessert (PRO-Version) ([details](api/config/multisection_shift_all.md))
4. API-Events zum Handling von Ajax- und Serverfehlern hinzugefügt ([details](api/event/onloaderror.md))
5. Performance der Timeline-Ansicht verbessert
6. Option zum Verzögern des Renderings hinzugefügt ([details](api/config/delay_render.md))
7. Datenexport nach iCal und Excel verbessert ([details](export/excel.md))
8. Kompatibilitätsprobleme mit DHTMLX Suite 4.0 behoben
9. Diverse kleinere Fehlerbehebungen

## 4.1

<span class='release_date'>13. Juni 2014. Minor Update</span>

1. Neues "Flat"-Skin eingeführt ([details](guides/skins.md#flat-skin))
2. Zuweisung von Events zu mehreren Sektionen in Timeline und Units Views ermöglicht (PRO-Version) ([details](views/timeline.md#assignment-of-events-to-several-sections), [details](views/units.md#assigning-events-to-several-units))
3. Größenänderung mehrtägiger Events im Month View per Drag & Drop ermöglicht ([details](views/month.md#resizing-events-by-drag-n-drop-ver-41))
4. Drag & Drop zwischen verschiedenen Schedulern ermöglicht ([details](guides/drag-between.md))
5. Datenexport im PNG-Format hinzugefügt ([details](export/png.md))
6. Neue Methode für den Export nach PDF eingeführt ([details](export/pdf.md))
7. Hervorhebung der Event-Dauer auf der Zeitskala während des Draggen hinzugefügt ([details](api/config/drag_highlight.md))
8. Änderung des gescrollten Zeitintervalls in der Grid View ermöglicht (PRO-Version) ([details](views/grid.md#activatingnavigation))
9. Option hinzugefügt, das Ziehen von Events außerhalb der sichtbaren Timeline-Ansicht zu verhindern ([details](api/config/limit_drag_out.md))
10. Fehler auf Windows-Touch-Geräten behoben
11. Beispiele für korrekte Funktionalität in verschiedenen Zeitzonen aktualisiert

## <b>4.0</b>

<span class='release_date'>2. Juli 2013. Major Update</span>

1. Flexible Zeitskalen hinzugefügt, die das Entfernen bestimmter Tage oder Stunden erlauben ([details](guides/custom-scales.md))
2. "Mehr Events"-Links in der Monatsansicht hinzugefügt ([details](views/month.md#limiting-the-number-of-events-in-a-cell))
3. jQuery-Integration ([details](integrations/other/jquery-integration.md))
4. Backbone-Integration hinzugefügt ([details](integrations/legacy/backbone-integration.md))
5. Standard-Skin auf "terrace" geändert; mehrtägige Events jetzt standardmäßig sichtbar
6. Alternative Logik für Startdatum bei wiederkehrenden Events ([details](api/config/repeat_precise.md))
7. Scheduler kann JSON-Daten von .Net Webservices laden
8. Dokumentation deutlich verbessert

## 3.7

<span class='release_date'>20. Februar 2013. Minor Update</span>

1. Touch-Unterstützung für Tablets und Touch-Monitore hinzugefügt ([details](guides/touch-support.md))
2. Rumänische Lokalisierung hinzugefügt

## 3.6

<span class='release_date'>3. Dezember 2012. Minor Update</span>

1. Windows 8 Edition eingeführt
2. Erweiterte Datumsformat-Konfiguration für Lightbox-Formulare
3. Sub-Tages-Navigation in der Timeline-Ansicht hinzugefügt
4. Benutzerdefiniertes Sortieren in der Timeline-Ansicht ermöglicht
5. Multipage-Export nach PDF hinzugefügt ([details](export/pdf-multi.md))

## 3.5

<span class='release_date'>24. August 2012. Minor Update</span>

1. Anzeige mehrerer Scheduler auf einer Seite ermöglicht ([details](guides/multiple-per-page.md))
2. Unterstützung für das Laden von JSON direkt aus Connectors hinzugefügt ([details](guides/server-integration.md#json-mode))
3. Benutzerdefiniertes Event-Rendering verbessert ([details](guides/custom-events-display.md))
4. Timeline-Ansicht mit Drag, Resize und Kontrolle der Event-Höhe erweitert
5. Neues 'dhx_terrace'-Skin eingeführt ([details](guides/skins.md#contrast-white-skin))
6. Neue Optionen zum Blockieren von Daten hinzugefügt ([details](guides/limits.md#how-to-block-certain-dates))
7. Markierung von Zeitintervallen ermöglicht ([details](guides/limits.md#how-to-mark-certain-dates))
8. Hervorhebung von Zeitintervallen hinzugefügt ([details](api/method/marktimespan.md))
9. Neue API-Methoden: updateView, showEvent, getRenderedEvent, getActionData ([details](api/method/updateview.md), [details](api/method/showevent.md), [details](api/method/getrenderedevent.md), [details](api/method/getactiondata.md))
10. JSMessage integriert
11. Grid View hinzugefügt (PRO-Version) ([details](views/grid.md))
12. Neue Konfigurationsoptionen eingeführt
13. Einfacherer Zugriff auf Lightbox-Section-Objekte ([details](api/method/formsection.md))
14. Unterstützung für 'CTRL+C', 'CTRL+X', 'CTRL+V' Tastaturbefehle hinzugefügt ([details](guides/keyboard-navigation.md))

## <b>3.0</b>

<span class='release_date'>27. Juli 2011. Major Update</span>

1. WeekAgenda-Ansicht hinzugefügt (PRO-Version) ([details](views/weekagenda.md))
2. Netbook-freundliches Lightbox-Formular eingeführt ([details](guides/lightbox-editors-manipulations.md#types-of-lightbox))
3. Kaskadierende Event-Anzeige hinzugefügt ([details](api/config/cascade_event_display.md))
4. Vereinfachte Farbzuweisung für Events ([details](guides/custom-events-color.md))
5. Drag & Drop des Detailformulars ermöglicht
6. Benutzerdefinierte Buttons für das Detailformular hinzugefügt ([details](guides/changing-lightbox-buttons.md))
7. Aktuellen Zeitmarker in Tages- und Wochenansicht hinzugefügt
8. Mehrzeilige Kopfzeile für Timeline-Ansicht hinzugefügt
9. Arbeitszeitbegrenzungen konfigurierbar gemacht ([details](guides/custom-scales.md#technique))
10. API für Zugriff auf Lightbox-Werte bereitgestellt ([details](guides/lightbox-editors-manipulations.md))

## 2.3

<span class='release_date'>30. August 2010. Minor Update</span>

### Hauptänderungen

1. Map-Ansicht hinzugefügt ([details](views/map.md))
2. Cell-Modus für Timeline-Ansicht eingeführt (PRO-Version) ([details](views/timeline.md#viewmodes))
3. Tree-Modus für Timeline-Ansicht eingeführt (PRO-Version) ([details](views/timeline.md#viewmodes))
4. Tooltips für alle Ansichten hinzugefügt ([details](guides/tooltips.md))
5. Neue Events per Doppelklick oder Drag & Drop im Timeline-Modus erstellen ermöglicht
6. Verschieben von Events per Drag & Drop im Timeline-Modus ermöglicht
7. Unterstützung für das Erstellen neuer Events per externem Drag & Drop hinzugefügt ([details](guides/drag-between.md))

### Weitere Änderungen

- Wochenzahlen-Formatoption hinzugefügt ([details](guides/settings-format.md))
- full_day Konfigurationsoption hinzugefügt ([details](guides/lightbox-editors-manipulations.md#automatic-end-date-in-the-time-control))
- event_duration und auto_end_date Konfigurationsoptionen hinzugefügt ([details](guides/lightbox-editors-manipulations.md#automatic-end-date-in-the-time-control))
- Multiselect-Section für das Detailformular hinzugefügt ([details](guides/lightbox-editors.md#sections-controls))
- Checkbox-, Combo- und Radio-Sections für das Detailformular hinzugefügt ([details](guides/lightbox-editors.md#sections-controls))
- Verhindern von Kollisionen bei wiederkehrenden Events ermöglicht
- Zusätzliche Parameter für timeline-bezogene Handler hinzugefügt
- API der Mini-Kalender-Erweiterung erweitert ([details](guides/minicalendar.md))
- Implementierung von benutzerdefinierten Formularen vereinfacht ([details](guides/custom-details-form.md))

### Fehlerbehebungen und Verbesserungen

- Fehlerhafte Verarbeitung bestimmter iCal-Datenquellen behoben
- Fehler beim Rendern überlappender Events korrigiert

## 2.2

<span class='release_date'>14. April 2010. Minor Update</span>

### Hauptänderungen

1. Export nach XML, iCal, JSON hinzugefügt ([details](export/serialization.md))
2. Export nach PDF hinzugefügt ([details](export/pdf.md))
3. Laden von Daten aus JSON ermöglicht ([details](guides/data-formats.md))
4. 'Collision detection'-Erweiterung hinzugefügt ([details](guides/collisions.md))
5. 'Date-scale limitation'-Erweiterung hinzugefügt ([details](guides/limits.md))
6. Mini-Kalender-Erweiterung hinzugefügt ([details](guides/minicalendar.md))
7. Timeline-Ansicht hinzugefügt ([details](views/timeline.md))
8. Automatisches Laden von Optionslisten vom Server ermöglicht ([details](guides/select.md#populating-the-control-with-data))

### Weitere Änderungen

- Hotkeys und einige Elementgrößen konfigurierbar gemacht
- Schrittweises Scrollen in der Units View ermöglicht (PRO-Version) ([details](views/units.md#scrollingunits))
- Arabische, Ungarische, Indonesische, Polnische und Slowenische Lokalisierungen hinzugefügt ([details](guides/localization.md#included-locales))
- 18 neue Beispiele hinzugefügt

### Fehlerbehebungen und Verbesserungen

- Verschiedene Fehler im Zusammenhang mit Zeitverschiebungen behoben
- Probleme mit wiederkehrenden Events in der Agenda-Ansicht gelöst
- Probleme mit wiederkehrenden Events in der Year-Ansicht behoben

## 2.1

<span class='release_date'>2. Dezember 2009. Minor Update</span>

### Hauptänderungen

1. Agenda-Ansicht hinzugefügt ([details](views/agenda.md))
2. Year-Ansicht hinzugefügt ([details](views/year.md))
3. Mehrere kleine Erweiterungen hinzugefügt
4. Skin Builder für den Scheduler eingeführt
5. Anzahl der verfügbaren Beispiele verdoppelt

### Vollständige Liste der Updates

+ agenda view  
+ year view  
+ kleine Erweiterungen  
+ onEventSave-Event wurde hinzugefügt  
+ onSchedulerResize-Event wurde eingeführt  
+ Finnische und niederländische Lokalisierungen sind jetzt verfügbar  
+ Chinesische Lokalisierung wurde hinzugefügt  
+ Portugiesische Übersetzung für den Scheduler wurde integriert  
+ time_picker-Template ist jetzt verfügbar  
+ event_date-Template wurde eingeführt  
+ Layout-Probleme mit mehrwöchigen Ereignissen behoben (#808)  
+ Editor-Darstellungsprobleme in IE6 behoben  
+ Größe der event-bar bei komplexen dynamischen Mustern korrigiert  
+ Fehler bei JS-Befehlen für nicht sichtbare Ereignisse behoben  
+ Fehlerhafte Verarbeitung von time_step als String behoben (#788)  
+ Unnötiges Scrollen in IE entfernt (#776)  
+ Enddatum der Wochen-Skalenbeschriftung korrigiert (#621)  
+ Drag-and-Drop-Probleme bei neu hinzugefügten Elementen behoben (#782)  
+ Platzierung von mehrtägigen Ereignissen in der unit view verbessert (#784)  
+ Verhindert, dass das Enddatum vor dem Startdatum gesetzt werden kann (#781)  
+ Probleme bei der Verarbeitung unbekannter CSS behoben  
+ Korrekte Umrandung in Chrome und Safari  
+ Positionierung der Lightbox auf scrollbaren Seiten korrigiert  
+ Probleme beim Übergang zwischen Sommer- und Winterzeit adressiert  
+ Rendering der multi_day zone beim Löschen oder Hinzufügen von Ereignissen behoben  
+ Probleme mit wiederkehrender Ansicht nach Größenänderung im Bearbeitungsmodus gelöst  
+ Editor für Ereignisse schließt nicht, wenn das "onClick"-Event deaktiviert ist (#617)  
+ Verarbeitung von 12AM beim Parsen von Strings in Datum korrigiert  


## <b>2.0</b> 

<span class='release_date'>20. Juli 2009. Großes Update</span>

### Wichtige Änderungen

1. Unterstützung für [Recurring events](guides/recurring-events.md) wurde hinzugefügt 
2. Möglichkeit zur Erstellung von [Units view](views/units.md) eingeführt (PRO-Version) 
3. Mehrtägige Ereignisse sind jetzt in Tag- und Wochenansicht sichtbar (scheduler.config.multi_day = true;) 
4. Monatsansicht kann sich automatisch anpassen, um Datenüberlauf zu verhindern 
5. Unterstützung für die Erstellung benutzerdefinierter Ansichten hinzugefügt 


## <b>1.0</b> 

<span class='release_date'>20. Mai 2009. Erstveröffentlichung</span>

- Tag-/Wochen-/Monatsansichten enthalten  
- Drag-and-Drop-Funktionalität unterstützt  
- Ajax-fähige Web-API-Unterstützung verfügbar
