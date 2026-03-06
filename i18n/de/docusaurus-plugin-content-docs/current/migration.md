---
title: "Migration von älteren Versionen"
sidebar_label: "Migration von älteren Versionen"
---

# Migration von älteren Versionen

## 7.1 -> 7.2

Das Update auf v7.2 bringt Änderungen an einigen Standardeinstellungen mit sich.

### `all_timed` Plugin ist jetzt standardmäßig aktiviert

Das [all_timed](api/config/all_timed.md) Plugin ist jetzt standardmäßig aktiviert, wodurch Übernacht-Ereignisse angezeigt werden können. Um das vorherige Verhalten wiederherzustellen, kann die Konfiguration wie folgt angepasst werden:

~~~js
scheduler.config.all_timed = false;
~~~

### Datumsfunktionen verändern nicht mehr das Argument

In früheren Versionen haben Datumsfunktionen wie `scheduler.date.day_start`, `scheduler.date.week_start` und `scheduler.date.date_part` das ursprüngliche übergebene Datumsobjekt verändert:

~~~js
const date = new Date(2025, 1, 15, 13, 00);
const dayStart = scheduler.date.day_start(date);

console.log(dayStart);
// 2025-02-15 00:00:00

console.log(date);
// 2025-02-15 00:00:00
~~~

Ab v7.2 bleibt das ursprüngliche Datum unverändert:

~~~js
const date = new Date(2025, 1, 15, 13, 00);
const dayStart = scheduler.date.day_start(date);

console.log(dayStart);
// 2025-02-15 00:00:00

console.log(date);
// 2025-02-15 13:00:00
~~~

## 7.0 -> 7.1

Das Update auf v7.1 enthält mehrere Breaking Changes.

### Neue Engine für wiederkehrende Ereignisse

Eine neue Engine für [Wiederkehrende Ereignisse](guides/recurring-events.md) wird verwendet, wenn das `recurring` Plugin aktiviert ist:

~~~js
scheduler.plugin({
    recurring:true
});
~~~

Da dieses neue Plugin auf einem anderen Satz von Eigenschaften basiert, um wiederkehrende Ereignisse zu definieren, gibt es derzeit keinen einfachen Migrationspfad. Sie können weiterhin die [alte Engine für wiederkehrende Ereignisse](guides/recurring-events-legacy.md) verwenden, indem Sie das Legacy-Plugin aktivieren, bis Sie bereit für die Migration sind:

~~~js
scheduler.plugin({
    recurring_legacy:true
});
~~~

### Undo-Popup

Die Undo-Funktion, die über [undo_deleted](api/config/undo_deleted.md) gesteuert wird, ist jetzt standardmäßig aktiviert. Falls dieses Verhalten nicht gewünscht ist, kann es über die Konfiguration deaktiviert werden:

~~~js
scheduler.config.undo_deleted = false;
~~~

### Änderungen in der Kartenansicht

Einige Eigenschaften wurden als veraltet markiert und sind jetzt Teil des Konfigurationsobjekts [map_settings](api/config/map_settings.md):

- **scheduler.config.map_error_position**
- **scheduler.config.map_initial_position**
- **scheduler.config.map_type**

Die aktualisierte Möglichkeit, diese Eigenschaften zu setzen, sieht folgendermaßen aus:

~~~js
scheduler.config.map_settings = {
    initial_position: {
       lat: 48.724,
       lng: 8.215
    },
    error_position: {
       lat: 15,
       lng: 15
    },
    type: google.maps.MapTypeId.HYBRID
}
...
scheduler.init('scheduler_here',new Date(2024,05,11),"map");
~~~

Zusätzlich sind diese Templates für die Kartenansicht veraltet und werden durch [map_info_content](api/template/map_info_content.md) ersetzt:

- **scheduler.templates.marker_date**
- **scheduler.templates.marker_text**

Die neue Template-Nutzung sieht so aus:

~~~
scheduler.templates.map_info_content = function(event){
    const formatDate = scheduler.templates.tooltip_date_format;
    return `<div><b>Text:</b> ${event.text}
        <div><b>Location:</b> ${event.event_location}</div>
        <div><b>Starts:</b> ${formatDate(event.start_date)}</div>
        <div><b>Ends:</b> ${formatDate(event.end_date)}</div>
    </div>`;
};
~~~

### Eigenschaften einzeln oder im gemeinsamen Objekt verfügbar

Die Eigenschaft [map_view_provider](api/config/map_view_provider.md) kann entweder einzeln oder innerhalb des Konfigurationsobjekts [map_settings](api/config/map_settings.md) angegeben werden, zum Beispiel:

~~~js
scheduler.config.map_settings = {
    view_provider: "googleMap"
}
...
scheduler.init('scheduler_here',new Date(2024,05,11),"map");
~~~

### Eigenschaften, die separat verwendet werden

Die folgenden Karten-Eigenschaften bleiben außerhalb des Objekts [map_settings](api/config/map_settings.md):

- [map_end](api/config/map_end.md)
- [map_start](api/config/map_start.md)

## 6.0 -> 7.0

Das Update auf v7.0 führt mehrere Breaking Changes ein.

### Skins verwenden jetzt CSS-Variablen

CSS-Skins (Themes) wurden vollständig überarbeitet und nutzen jetzt CSS-Variablen. Während die HTML-Struktur und die CSS-Klassennamen größtenteils gleich bleiben, funktioniert benutzerdefiniertes CSS aus älteren Scheduler-Versionen möglicherweise nicht mehr wie erwartet in v7.0.

Zum Beispiel wurde früher folgender Stil verwendet, um die Hintergrundfarbe eines Ereignisses zu ändern:

~~~html
<style>
    /* Ereignis in Tages- oder Wochenansicht */
    .dhx_cal_event.manager_event div{
        background-color: #009966 !important;
        color: black !important;
    }
    /* Mehrtägiges Ereignis in der Monatsansicht */
    .dhx_cal_event_line.manager_event{
        background-color: #009966 !important;
        color: black !important;
    }
    /* Ereignis mit fester Zeit in der Monatsansicht */
    .dhx_cal_event_clear.manager_event{
        color: black !important;
    }
</style>
~~~

Ab v7.0 kann derselbe Effekt so erreicht werden:

~~~html
<style>
    .manager_event {
        --dhx-scheduler-event-background: #009966;
        --dhx-scheduler-event-color: black;
    }
</style>
~~~

Eine Liste der verfügbaren Variablen finden Sie auf der Seite [Skins-Anpassung](guides/custom-skins.md).

:::note
Ein Update Ihrer Styles ist notwendig, um das gewünschte Aussehen nach der Migration beizubehalten.
:::

### Eine einzige CSS-Datei fur alle Themes {#single-css-file}

Alle Themes sind jetzt in einer einzigen **dhtmlxscheduler.css** Datei zusammengefasst.

Um ein bestimmtes Skin auszuwählen, verwenden Sie die Eigenschaft `scheduler.skin`:

~~~js
scheduler.skin = "material";
~~~

Oder die Methode [setSkin](api/method/setskin.md):

~~~js
scheduler.setSkin("material");
~~~

:::note
Beachten Sie, dass `scheduler.setSkin()` ein Neuzeichnen des Schedulers auslöst.
:::

Wenn Sie von einem anderen Skin als **terrace** wechseln, gehen Sie folgendermaßen vor:

1) Ersetzen Sie die alte Skin-CSS-Datei durch die neue kombinierte CSS-Datei:

~~~html
<!-- ALT -->
<link rel="stylesheet" href="./codebase/dhtmlxscheduler_material.css" type="text/css">
<!-- NEU -->
<link rel="stylesheet" href="./codebase/dhtmlxscheduler.css" type="text/css">
~~~

2) Aktivieren Sie das Skin über JavaScript:

~~~js
scheduler.setSkin("material");
scheduler.init("scheduler_here");
~~~

### Veraltete `scheduler.xy` Einstellungen

Die folgenden `scheduler.xy` Eigenschaften werden nicht mehr verwendet:

- scheduler.xy.nav_height
- scheduler.xy.event_header_height

Ihre Höhen werden jetzt durch CSS-Stile wie diese gesteuert:

~~~css
.dhx_cal_navline {
    height: 40px;
}

.dhx_cal_event dhx_title {
    height: 30px;
}
~~~

### Geänderte Standardwerte

Die Standardwerte für die Eigenschaften [details_on_create](api/config/details_on_create.md) und [details_on_dblclick](api/config/details_on_dblclick.md) wurden von `false` auf `true` geändert.

### Material-Skin Schriftart

Das **Material** Skin enthält die Roboto-Schriftart nicht mehr standardmäßig.

Wenn Sie das Material-Skin verwenden, müssen Sie die Schriftart manuell importieren:

~~~js
@import url(
'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap'
);
~~~

### Neue API für Tooltips

Tooltips verfügen jetzt über eine überarbeitete API, die das Anbinden von Tooltips an benutzerdefinierte Elemente vereinfacht. Weitere Details finden Sie im Artikel [Tooltips](guides/tooltips.md).

### Padding in Tages-/Wochenansicht-Spalten hinzugefügt

Die Tages-, Wochen- und Einheitenansichten enthalten jetzt einen kleinen Abstand an den Seiten der Spalten. Dies bietet einen leeren Bereich, in dem Benutzer durch Doppelklick neue Ereignisse erstellen können.

Um dieses Padding zu entfernen, setzen Sie [day_column_padding](api/config/day_column_padding.md) auf null:

~~~js
scheduler.config.day_column_padding = 0;
~~~

### Exportservice integriert

Ab v7.0 sind Import-/Exportfunktionen Teil der Scheduler-Bibliothek.

Falls Sie zuvor **https://export.dhtmlx.com/scheduler/api.js** für den Online-Export eingebunden haben, zum Beispiel:

~~~js
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>
~~~

sollten Sie diese Datei entfernen und die **export_api** Erweiterung mit **scheduler.plugins** aktivieren:

~~~js
scheduler.plugins({
    export_api: true
});
~~~

### Promise-Implementierung aktualisiert

Die **Bluebird**-Bibliothek wurde aus dem Scheduler-Bundle entfernt. Die [Promise](api/method/promise.md) verwendet jetzt die native Promise-Implementierung.

## 5.3 -> 6.0

Das Update auf v6.0 bringt zwei große strukturelle Änderungen am Scheduler-Paket:

1) Alle Erweiterungsdateien sind jetzt im *dhtmlxscheduler.js* gebündelt. Um zusätzliche Erweiterungen zu aktivieren, müssen Sie die API verwenden.

- Falls Sie zuvor Erweiterungsdateien separat eingebunden haben, wie zum Beispiel:

~~~js
<script src="../codebase/dhtmlxscheduler.js"></script>
<script src="../codebase/ext/dhtmlxscheduler_active_links.js"></script>
~~~

oder

~~~js
import "dhtmlx-scheduler";
import "dhtmlx-scheduler/ext/dhtmlxscheduler_active_links";
~~~

sollten Sie die separaten Erweiterungsdateien entfernen und Erweiterungen über **scheduler.plugins** aktivieren:

~~~js
scheduler.plugins({
   active_links: true
});
~~~

Die vollständige Liste der Erweiterungen finden Sie [hier](guides/extensions-list.md).

- Wenn Sie modifizierte oder eigene Erweiterungsdateien verwenden, binden Sie diese weiterhin wie bisher manuell ein.

- **Hinweis**: Die **dhtmlxscheduler_csp.js** Erweiterung wurde vollständig entfernt und muss nicht mehr manuell aktiviert werden.


2) Alle Sprachdateien sind jetzt in *dhtmlxscheduler.js* enthalten. Um eine Sprache zu aktivieren, verwenden Sie den API-Aufruf.

- Entfernen Sie alle separaten Sprachdateien von Ihrer Seite und aktivieren Sie die gewünschte Sprache mit **scheduler.i18n.setLocale**:

~~~js
scheduler.i18n.setLocale("de");
~~~

- Eigene Sprachdateien können weiterhin wie bisher geladen werden.

### DataProcessor-Initialisierung

Der DataProcessor-Konstruktor wurde von der globalen **dataProcessor** Funktion zur **scheduler.DataProcessor** Funktion verschoben.

Wenn Ihre Anwendung DataProcessor verwendet, aktualisieren Sie den Initialisierungscode wie folgt:

~~~js
// alte Methode
var dp = new dataProcessor("/scheduler/backend/events");
dp.init(scheduler);
dp.setTransactionMode("REST", false);
~~~

Ersetzen Sie dies durch:

~~~js
// aktualisierte Methode
var dp = new scheduler.DataProcessor("/scheduler/backend/events");
dp.init(scheduler);
dp.setTransactionMode("REST", false);
~~~

Die empfohlene Vorgehensweise ist die Verwendung von **scheduler.createDataProcessor**:

~~~js
// bevorzugte Methode
var dp = scheduler.createDataProcessor({
    url: "/scheduler/backend/events",
    mode: "REST"
});
~~~

In diesem Fall ist der Aufruf von **DataProcessor.init(scheduler)** nicht notwendig und Sie können **DataProcessor.setTransactionMode** wie gewohnt aufrufen, falls erforderlich.

### Veraltete API

Das **dhtmlx** Objekt wird in dhtmlxscheduler.js nicht mehr definiert, daher sind mehrere Methoden und globale Objekte ab Version 6.0 veraltet.

1) Die folgenden Methoden sind veraltet und wurden ersetzt durch:

<table class="my_table">

<tr><td class="version_info">Veraltete Methoden</td><td class="version_info">Funktionierende Methoden</td></tr>

<tr><td>dhtmlx.alert</td><td>scheduler.alert</td></tr>
<tr><td>dhtmlx.confirm</td><td>scheduler.confirm</td></tr>
<tr><td>dhtmlx.modalbox</td><td>scheduler.modalbox</td></tr>
<tr><td>dhtmlx.uid</td><td>scheduler.uid</td></tr>
<tr><td>dhtmlx.copy</td><td>scheduler.copy</td></tr>
<tr><td>dhtmlx.mixin</td><td>scheduler.mixin</td></tr>
<tr><td>dhtmlx.defined</td><td>scheduler.defined</td></tr>
<tr><td>dhtmlx.bind</td><td>scheduler.bind</td></tr>
<tr><td>dhtmlx.assert</td><td>scheduler.assert</td></tr>
<tr><td>window.dataProcessor</td><td>scheduler.DataProcessor</td></tr>
</table>

Die Argumente und das Verhalten der Methoden bleiben unverändert.

2) Die folgenden globalen Objekte sind veraltet:

- dhtmlxAjax
- dtmlXMLLoaderObject
- dhtmlDragAndDropObject
- dhtmlxEventable
- dhtmlxError

Falls diese weiterhin in Ihrer Anwendung benötigt werden, können Sie sie über das **legacy** Plugin aktivieren:

~~~js
scheduler.plugins({
    legacy: true
});
~~~

## 5.2 -> 5.3

### Touch-Gesten

Der Standard-Handler für die [Swipe-Geste](guides/touch-support.md#touch-gestures-in-the-scheduler) ist jetzt standardmäßig deaktiviert.

Um ihn wieder zu aktivieren, verwenden Sie die Einstellung [scheduler.config.touch_swipe_dates](api/config/touch_swipe_dates.md) wie folgt:

~~~js
scheduler.config.touch_swipe_dates = true;
~~~

### Markup und Styles

Der [box-sizing-Modus](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing) für Ereigniselemente in 
[Monatsansicht](views/month.md) wurde für alle Skins von **content-box** auf **border-box** geändert.

Dies betrifft die Elemente **.dhx_cal_event_clear** und **.dhx_cal_event_line**.

Diese Änderung sollte keine sichtbaren Unterschiede verursachen, aber falls Sie das Rendering der Ereignisse in der Monatsansicht angepasst oder ein eigenes Skin verwenden, müssen Sie Ihre Styles ggf. entsprechend anpassen.

## 5.1 -> 5.2

<h3 id="dnd">Drag-and-Drop-Verhalten</h3>

Ab Version 5.2 können Ereignisse an jedem Teil ihres Körpers gezogen werden, nicht mehr nur am Header wie zuvor. Um das alte Verhalten wiederherzustellen, setzen Sie die 
[drag_event_body](api/config/drag_event_body.md) Eigenschaft auf *false* (standardmäßig aktiviert):

~~~js
scheduler.config.drag_event_body = false;
~~~

### onXLE/onXLS Events sind veraltet

Diese Events funktionieren weiterhin, werden aber zukünftig entfernt. Ersetzen Sie sie wie folgt:

~~~js
scheduler.attachEvent("onXLS",function(){}); → 
scheduler.attachEvent("onLoadStart",function(){});

scheduler.attachEvent("onXLE",function(){}); → 
scheduler.attachEvent("onLoadEnd",function(){});
~~~


### "xml_date" Konfiguration und Template sowie "xml_format" Templates wurden umbenannt

So aktualisieren Sie Ihren Code auf die neuen API-Namen:

- scheduler.config.xml_date →  [scheduler.config.date_format](api/config/date_format.md)
- scheduler.templates.xml_date → [scheduler.templates.parse_date](api/template/parse_date.md)
- scheduler.templates.xml_format → [scheduler.templates.format_date](api/template/format_date.md)


Seit v5.2 sind die Standardwerte für **xml_date** Konfiguration sowie **xml_date** und **xml_format** Templates *undefined*. Ohne explizite Zuweisung funktionieren sie nicht.

Scheduler unterstützt jedoch weiterhin die alten Namen, falls Sie diese angepasst haben. Zum Beispiel:

~~~js
// dies funktioniert weiterhin
scheduler.templates.xml_date = function(datestring){
    return new Date(datestring);
};
~~~

#### Das Standard-Datumsformat wurde geändert

- Vor v5.2 wurde das Standardformat durch **scheduler.config.xml_date** als "%m/%d/%Y %H:%i" festgelegt
- Ab v5.2 wird es durch [scheduler.config.date_format](api/config/date_format.md) mit dem Wert "%Y-%m-%d %H:%i" gesteuert

Um das vorherige Standardformat wiederherzustellen, verwenden Sie:

~~~js
scheduler.config.date_format = "%m/%d/%Y %H:%i";
~~~

#### Verbesserte Datums-Parsing

Ab v5.2 versucht Scheduler, Datumsformate beim Parsen automatisch zu erkennen, was das Verhalten von **scheduler.date.str_to_date**, 
**scheduler.templates.format_date** und **scheduler.templates.parse_date** beeinflussen kann.

Um zum alten Verhalten zurückzukehren, bei dem Datumsangaben exakt wie angegeben geparst werden, aktivieren Sie:

~~~js
scheduler.config.parse_exact_format = true;
~~~

### "vertical"-Einstellung des [Multiselect](guides/multiselect.md#properties) Controls akzeptiert jetzt nur noch Boolean

Früher konnte *vertical* als String gesetzt werden, z. B.:

~~~js
{ name:"userselect", type:"multiselect", ..., vertical:"false" }
~~~

Seit v5.2 werden nur noch Boolean-Werte akzeptiert:

~~~js
{ name:"userselect", type:"multiselect", ..., vertical: false }
~~~

Falls Sie den String "false" verwendet haben, aktualisieren Sie ihn auf den Boolean-Wert false.

## 5.0 -> 5.1

Smart Rendering und horizontale Scroll-Funktionen führten zu einer vollständigen Überarbeitung des Timeline-Markups, was sich auf Timeline, TreeTimeline und deren Modi auswirkt.

Die wichtigste Änderung ist, dass TABLE-, TR- und TD-Elemente durch DIVs mit entsprechenden Klassennamen ersetzt wurden.

Falls Ihre CSS-Selektoren auf Tabellen-Tags für das Timeline-Styling abzielen, müssen Sie diese an das neue Markup anpassen. Die generelle DOM-Struktur bleibt ähnlich, hauptsächlich müssen die CSS-Selektoren angepasst werden.

Hier ein Vergleich der CSS-Selektoren vor und nach dem Update:

Vorher:

- **.dhx_cal_data > table > tbody > tr > td.dhx_matrix_scell** - linke Beschriftungsspalte
- **.dhx_cal_data > table > tbody > tr > td > div.dhx_matrix_line** - Timeline-Zeile mit Datumzellen
- **.dhx_cal_data > table > tbody > tr > td > div.dhx_matrix_line > table > tbody > tr > td.dhx_matrix_cell** - einzelne Datumzelle innerhalb einer Timeline-Zeile

Nachher:

- **.dhx_cal_data .dhx_timeline_table_wrapper .dhx_timeline_label_row .dhx_matrix_scell** - linke Beschriftungsspalte
- **.dhx_cal_data .dhx_timeline_data_wrapper .dhx_matrix_line** - Timeline-Zeile mit Datumzellen
- **.dhx_cal_data .dhx_timeline_data_wrapper .dhx_matrix_line .dhx_matrix_cell** - einzelne Datumzelle innerhalb einer Timeline-Zeile

## 4.4 -> 5.0

### Entfernte Skins

Die **Glossy**- und **Classic**-Skins wurden ab v5.0 als veraltet eingestuft und entfernt.

Falls Sie diese verwenden, müssen Sie auf ein anderes [Skin](guides/skins.md) umsteigen oder die CSS-Dateien aus einer älteren Version weiterverwenden.

### Größere CSS-Überarbeitung

Version 5.0 brachte eine umfassende Überarbeitung des CSS mit sich, die bei stark angepassten CSS-Konfigurationen zu Problemen führen kann. Bestehende Styles funktionieren möglicherweise nicht mehr, da die Spezifität in den neuen dhtmlxScheduler-Styles erhöht wurde.

Es gibt keine universelle Lösung; die Migration erfordert eine Überprüfung und Anpassung Ihres CSS.

### REST-Modus POST-Route korrigiert

Das Update behebt die **POST** (Insert)-Route des dataProcessor im **REST**-Modus, sodass keine temporäre Event-ID mehr an den Server gesendet wird.

Vorher:

~~~js
POST /api/{tempId}

// Beispiel
POST /api/1234567890
~~~

Jetzt:

~~~js
POST /api
~~~

## 4.x -> 4.3

Ab v4.3 sind die Erweiterungen [Week Agenda View](views/weekagenda.md), [Grid View](views/grid.md), [Timeline View](views/timeline.md), [Units View](views/units.md) und [Multisection Events](api/config/multisection.md) nicht mehr in der Standard Edition enthalten, die unter GNU GPL v2 vertrieben wird.

Um sie weiterhin zu nutzen, verwenden Sie entweder Version 4.2 oder früher oder erwerben Sie eine Commercial- oder Enterprise-Lizenz.

Weitere Informationen finden Sie [hier](https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing).

## 3.6 -> 4.0

Die öffentliche API bleibt vollständig abwärtskompatibel.

### Geänderte Standardwerte

- Das Standard-Skin wurde auf "terrace" umgestellt; ext/dhtmlxscheduler_dhx_terrace.js wurde entfernt. Um das klassische Skin zu verwenden, binden Sie dessen CSS-Datei ein (codebase/dhtmlxscheduler_classic.css). Details siehe [Skins](guides/skins.md).

- [multi_day](api/config/multi_day.md) ist jetzt standardmäßig aktiviert. Um es zu deaktivieren, fügen Sie hinzu:

~~~js
scheduler.config.multi_day = false;
~~~

### Eigene Skins

Scheduler erkennt das Skin automatisch anhand des Dateinamens der CSS-Datei. Für eigene Skins, die nicht auf "terrace" basieren, benennen Sie die CSS-Datei in *dhtmlxscheduler_(skin name).css* um.

Sie können die automatische Erkennung deaktivieren, indem Sie setzen:

~~~
scheduler.skin = "{skin name}";
~~~

vor dem Aufruf von *scheduler.init*.

### Veraltete API

Diese Methoden sind veraltet, aber noch verfügbar, und werden in Scheduler 5.x entfernt: getEventText, getEventStartDate, getEventEndDate, setEventText, setEventStartDate, setEventEndDate.

Verwenden Sie stattdessen *scheduler.getEvent()* und greifen Sie direkt auf die Eigenschaften des Event-Objekts zu bzw. passen Sie diese an.


## 3.6 -> 3.7

Vollständig abwärtskompatibel.

## 3.5 -> 3.6

Vollständig abwärtskompatibel.

## 3.0 -> 3.5

Die öffentliche API bleibt vollständig abwärtskompatibel.

- Die Funktion 'Mark now' wurde in die Erweiterung dhtmlxscheduler_limit.js verschoben.

- Scheduler unterstützt jetzt [JSON, das von dhtmlxConnector generiert wurde](guides/server-integration.md#json-mode). Wenn kein besonderer Grund für die Verwendung von XML besteht, wechseln Sie zu JSON für kleinere Dateigrößen und schnelleres Laden.

## 2.3 -> 3.0

Die öffentliche API bleibt vollständig abwärtskompatibel.

- Die Dateistruktur wurde leicht geändert: ext/dhtmlxscheduler_ext.css und dhtmlxscheduler_recurring.css wurden entfernt; alle Styles befinden sich jetzt in dhtmlxscheduler.css.

- Einige Template-Argumente wurden angepasst: scheduler.templates.agenda_text und scheduler.templates.map_text erhalten nun (start_date, end_date, event) als Parameter anstelle von nur 'event'.

## 2.2 -> 2.3

- Vollständig abwärtskompatibel.

- Die schwedischen Sprachdateien wurden gemäß ISO 639-1 umbenannt:

~~~
sources/locale_se.js => sources/locale_sv.js
sources/locale_recurring_se.js => sources/locale_recurring_sv.js
~~~

## 2.1 -> 2.2

- Vollständig abwärtskompatibel.

- Der Befehl 'createUnitsView' akzeptiert nun eine andere Parameterreihenfolge, aber die alte Syntax funktioniert weiterhin.

## 2.0 -> 2.1

- Die Formatierungsregeln wurden korrigiert: %d und %m liefern jetzt immer 2 Ziffern. Für das alte Verhalten verwenden Sie %j bzw. %n.

- Die Pfade zu einigen Dateien im Paket wurden geändert:

~~~
codebase/dhtmlxgrid_recurring.js => codebase/ext/dhtmlxgrid_recurring.js
codebase/dhtmlxgrid_recurring.css => codebase/ext/dhtmlxgrid_recurring.css
codebase/dhtmlxgrid_units.js => codebase/ext/dhtmlxgrid_units.js
~~~

## 1.0 -> 2.0

- API und Datenformat sind vollständig abwärtskompatibel.

- Die Events 'onEventChanged' und 'onEventAdded' werden beim Laden von Daten nicht mehr ausgelöst.

- Die spanische Sprachdatei wurde von locale_sp.js in locale_es.js umbenannt.

- Die Option 'drag_create' steuert jetzt nur noch das Erstellen neuer Events per Drag-and-Drop; das Erstellen per Doppelklick wird jetzt durch 'dblclick_create' gesteuert.
