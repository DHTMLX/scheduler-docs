---
sidebar_label: "header"
title: "header config"
description: "richtet das Layout für den Scheduler-header (Navigationspanel) ein"
---

# header

### Description

@short: Erstellung einer layout-ähnlichen Konfiguration für den Scheduler-Header (Navigationsbereich)

@signature: header: any

### Example

~~~jsx
scheduler.config.header = [
    "day",
    "week",
    "month",
    "date",
    "prev",
    "today",
    "next"
];
scheduler.init("scheduler_here");
~~~

**Default value:** null

### Details

Wenn der Scheduler mit dieser Konfiguration initialisiert wird, wird jedes HTML, das vor der Initialisierung im Scheduler-Container platziert wurde, entfernt und stattdessen generierter HTML-Code eingefügt.

Der Wert dieser Konfiguration kann entweder ein einfaches Array von Elementen sein oder eine verschachtelte Struktur, die ein komplexes Layout beschreibt.

Beachten Sie, dass die Höhe der Kopfzeile/Navigationsleiste weiterhin von der Option [`scheduler.xy.nav_height`](api/other/xy.md#illustration-images) gesteuert wird.


~~~js
scheduler.xy.nav_height = 80;
scheduler.config.header = {
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
scheduler.init("scheduler_here");
~~~


~~~html
<div id="scheduler_here" style="height:100vh;width:100vw"></div>
~~~


Die unterstützten Werte sind:

- `{rows: Array, css: string}` - ein Container für einen mehrzeiligen Header
- `{cols: Array, css: string}` - eine einzelne Zeile eines mehrzeiligen Headers
- `"prev"`, `"next"`, `"today"` - Datums-Navigationsschaltflächen
- `"date"` - das Datums-Label
- `"day"`, `"week"`, `"month"`, usw. - Ansichts-Tabs
- `"spacer"` - ein transparentes Element, das den gesamten freien Raum einnimmt und verwendet werden kann, um ein anderes Element auf die rechte Seite der Kopfzeile zu schieben
- `{html: string, click: function, css: string}` - ein Objekt zum Einfügen benutzerdefinierter Buttons oder Icons in die Kopfzeile
- `"minicalendar"` - ein [Mini Calendar](guides/minicalendar.md) Toggle

~~~js
scheduler.config.header = [
    "day",
    "week",
    "month",
    { html: "click me!", click: () => { alert("done!"); } },
    "date",
    "prev",
    "today",
    "next"
];
scheduler.init("scheduler_here");
~~~

#### Mini Calendar Einstellungen:

Der `minicalendar`-Wert zeigt einen Minikalender-Button mit dem folgenden Click-Handler an:

~~~js
function showCalendar() {
    if (scheduler.isCalendarVisible()) {
        scheduler.destroyCalendar();
    } else {
        scheduler.renderCalendar({
            position: this,
            date: scheduler.getState().date,
            navigation: true,
            handler: (date, calendar) => {
                scheduler.setCurrentView(date);
                scheduler.destroyCalendar();
            }
        });
    }
};
~~~

Wenn Sie [`renderCalendar()`](api/method/rendercalendar.md) mit anderen Parametern aufrufen möchten, müssen Sie einen eigenen `onclick`-Handler für den Minikalender-Button bereitstellen:

~~~js
scheduler.config.header = [
    "day",
    "week",
    "month",
    { view: "minicalendar", click: function() {
        if (scheduler.isCalendarVisible()) {
            scheduler.destroyCalendar();
        } else {
            scheduler.renderCalendar({
                position: this,
                date: scheduler.getState().date,
                navigation: true,
                handler: (date, calendar) => {
                    scheduler.setCurrentView(date);
                    scheduler.destroyCalendar();
                }
            });
        }

    } },
    "date",
    "prev",
    "today",
    "next"
];
~~~

### Related Guides
- [Mobiler responsiver Scheduler](guides/touch-support.md)
- [dhtmlxScheduler in Plain JS/HTML](guides/initialization.md)
- [Mini Calendar (Date-Auswahl)](guides/minicalendar.md)