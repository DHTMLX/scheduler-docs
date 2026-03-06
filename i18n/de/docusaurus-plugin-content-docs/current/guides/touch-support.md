---
title: "Mobile Responsive Scheduler"
sidebar_label: "Mobile Responsive Scheduler"
---

# Mobile Responsive Scheduler

dhtmlxScheduler unterstützt Touch-Geräte wie:

- iOS-Geräte (iPad, iPhone, iPod);
- Windows 10 Tablets und Touchscreen-Monitore;
- Android-Geräte.

_Der Scheduler läuft auch auf Smartphones, aber aufgrund des begrenzten Bildschirms kann eine manuelle Anpassung erforderlich sein._

**Hilfreiche Tipps!**

+ Die Touch-Unterstützung ist standardmäßig aktiviert und funktioniert in allen Scheduler-Modi.
+ Für Apps, die auf Touch-Geräte abzielen, wird die Verwendung des ['material' Skin](guides/skins.md#material-skin) dringend empfohlen, da er größere, leicht zu bedienende Schaltflächen bietet.
+ Wenn Sie mit mobilen Nutzern rechnen, ist das Hinzufügen von [Quick Info](guides/extensions-list.md#quick-info) in der Regel eine gute Wahl.
+ Das Hinzufügen des folgenden Meta-Tags zu Ihrer Seite sorgt dafür, dass alle Scheduler-Elemente größer und leichter bedienbar werden:

~~~js
<meta name="viewport" content="width="device-width," initial-scale="1"">
~~~

## Responsives Layout {#responsivelayout}

Wenn Sie den [Scheduler über die Header-Konfiguration initialisieren](guides/initialization.md#initializing-scheduler-via-header-config), können Sie ein Header-Layout wählen, das zur Bildschirmgröße des Clients passt.
Dabei werden auch Stile angewendet, die die Größe von Elementen und Schriftarten für kleinere Bildschirme anpassen.

### Header

Zum Beispiel können Sie den Header in mehrere Zeilen aufteilen:

![header_responsive](/img/header_responsive.png)

Der obige Screenshot zeigt den Scheduler auf einem kleinen Bildschirm.

Diese Konfiguration kann dynamisch gewechselt werden, sodass Sie verschiedene Header-Konfigurationen für große und kleine Bildschirme definieren können:

~~~js
// Konfigurationen definieren
const compactHeader = {
    rows: [
        { 
            cols: [
                "prev",
                "date",
                "next",
            ]
        },
        { 
            cols: [
                "day",
                "week",
                "month",
                "spacer",
                "today"
            ]
        }
    ]
};
            
const fullHeader = [
    "day",
    "week",
    "month",
    "date",
    "prev",
    "today",
    "next"
];

// Umschalter hinzufügen, um die passende Konfiguration je nach aktueller Bildschirmgröße zu wählen

function resetConfig(){
    let header;
    if (window.innerWidth < 1000) {
        header = compactHeader;
    } else {
        header = fullHeader;
    
    }
    scheduler.config.header = header;
    return true;
}

// Konfiguration initial und bei jedem Neuzeichnen oder Ändern der Größe des Schedulers anwenden:

resetConfig();
scheduler.attachEvent("onBeforeViewChange", resetConfig);
scheduler.attachEvent("onSchedulerResize", resetConfig);

scheduler.config.responsive_lightbox = true; // responsive Lightbox

scheduler.init("scheduler_here");
~~~


[Responsive scheduler](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/13_touch_ui.html)


### Lightbox

Die Scheduler-API enthält die Option [responsive_lightbox](api/config/responsive_lightbox.md), um die Lightbox an verschiedene Bildschirmgrößen anzupassen.

~~~~js
scheduler.config.responsive_lightbox = true; //standardmäßig deaktiviert
//auf true setzen, um die Lightbox responsiv zu machen
~~~~

So passt sich die Lightbox auf kleineren Bildschirmen an:

![lightbox_responsive](/img/lightbox_responsive.png)


[Responsive scheduler](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/13_touch_ui.html)


Sie können das Aussehen der Lightbox im responsiven Modus anpassen. Sie erhält eine zusätzliche CSS-Klasse <b>dhx_cal_light_responsive</b>, die Sie in Ihren Styles gezielt ansprechen können.

Standardmäßig enthält diese Klasse Media Queries, die nur auf kleineren Bildschirmen (weniger als 1024px) angewendet werden, sodass Sie das Erscheinungsbild der Lightbox auf diesen Geräten anpassen können.

## Touch-Konfigurationsoptionen {#touchconfigurationoptions}

Nachfolgend finden Sie die Konfigurationsoptionen für mobile und responsive Unterstützung:


- [header](api/config/header.md) - steuert das Header-Layout
- [touch](api/config/touch.md) - schaltet die Touch-Unterstützung im Scheduler ein/aus
- [touch_drag](api/config/touch_drag.md) - legt die Zeit in Millisekunden fest, um einen langen Touch von einem Scrollen zu unterscheiden
- [touch_tip](api/config/touch_tip.md) - schaltet Hinweisnachrichten in der oberen rechten Ecke ein/aus
- [touch_swipe_dates](api/config/touch_swipe_dates.md) - schaltet Wischgesten zum Wechseln von Daten ein/aus
- [responsive_lightbox](api/config/responsive_lightbox.md) - aktiviert responsive Styles für die Lightbox (standardmäßig aus)


## Touch-Gesten im Scheduler {#touch-gestures-in-the-scheduler}

- **Doppeltippen** - entspricht einem Doppelklick und öffnet die Event-Bearbeitung oder -Erstellung;
- **Langes Tippen und Ziehen** - wird zum Verschieben oder Erstellen von Events verwendet;
- **Wischen** - wechselt zur nächsten oder vorherigen Zeitspanne ([standardmäßig deaktiviert](api/config/touch_swipe_dates.md)).

## 'Quick info' Erweiterung {#quick-info-extension}

Um die Touch-Funktionalität zu verbessern, enthält die Bibliothek die ["Quick Info" Erweiterung](guides/extensions-list.md#quick-info).

Diese Erweiterung ersetzt die Standard-Sidebar-Schaltflächen und das kleine Bearbeitungsformular (die auf Touch-Geräten schwer zu bedienen sein können) durch größere, benutzerfreundlichere Bedienelemente.

Um den Scheduler mit großen Schaltflächen zu aktivieren, fügen Sie die ["Quick Info"](guides/extensions-list.md#quick-info) Erweiterung zu Ihrer Seite hinzu:

~~~js
<script>
    scheduler.plugins({
        quick_info: true
    });
    scheduler.init('scheduler_here',new Date(2019,5,30),"day");
      ...
<script>
~~~


[Touch-oriented scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/29_quick_info.html)


Nach der Aktivierung ersetzt der Scheduler die Standard-Schaltflächen durch größere:

![quick_info_extension.png](/img/quick_info_extension.png)

:::note
Beachten Sie, dass das Auswahlmenü der Quick-Info-Seitenleiste und das Auswahlmenü im Standard-Scheduler die gleiche Konfiguration verwenden, die in [icons_select](api/config/icons_select.md) beschrieben ist.
:::

Die Erweiterung bietet:

- **3 Templates**

- [quick_info_content](api/template/quick_info_content.md) - definiert den Inhalt des Pop-up-Bearbeitungsformulars
- [quick_info_date](api/template/quick_info_date.md) - definiert das Datum im Pop-up-Bearbeitungsformular
- [quick_info_title](api/template/quick_info_title.md) - definiert den Titel des Pop-up-Bearbeitungsformulars

- **1 Konfigurationsoption**


- [quick_info_detached](api/config/quick_info_detached.md) - steuert, ob das Event-Formular seitlich oder in der Nähe des ausgewählten Events angezeigt wird


- **2 Methoden**


- [hideQuickInfo](api/method/hidequickinfo.md) - blendet das Pop-up-Eventformular aus, falls es geöffnet ist
- [showQuickInfo](api/method/showquickinfo.md) - zeigt das Pop-up-Eventformular für ein bestimmtes Event an


- **2 Events**


- [onQuickInfo](api/event/onquickinfo.md) - wird ausgelöst, wenn das Pop-up-Bearbeitungsformular erscheint
- [onAfterQuickInfo](api/event/onafterquickinfo.md) - wird ausgelöst, nachdem das Pop-up-Eventformular geschlossen wurde
