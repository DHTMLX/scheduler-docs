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

`scheduler.xy.nav_height = 0` blendet die Navigationsleiste aus. Andere positive Werte legen ihre Höhe nicht fest. Verwenden Sie mit Toolbar eine positive `header.height` oder `--dhx-scheduler-toolbar-height`, um die Leistenhöhe festzulegen.


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


Die unterstützten Legacy-Werte sind:

- `{ rows: Array, align?: "left" | "right" }` und `{ cols: Array, align?: "left" | "right" }` - verschachtelte Layoutcontainer; jeder Elementlauf wird zu einer Toolbar-Gruppe
- `"prev"`, `"next"` und `"today"` - Datumsnavigation
- `"date"` - aktuelle Datumsbeschriftung
- `"day"`, `"week"`, `"month"` oder jeder registrierte Ansichtsname - Ansichtsregisterkarte
- `"spacer"` - flexibles leeres Element, das folgende Elemente nach rechts schiebt
- `"minicalendar"`, `"button"` oder `{ view: "..." }` - das entsprechende Legacy-Header-Element
- `{ html, click, css, width, height }` oder ein anderes Objekt ohne `id`, `view`, `rows` oder `cols` - benutzerdefinierte Legacy-Schaltfläche. `html` liefert den Inhalt und `click` läuft mit dem Elementknoten als `this`.

## Toolbar-Elementformen

Die folgenden Formen sind nur verfügbar, wenn `toolbar: true` aktiviert ist:

- `"views"` - Ansichtsauswahl, standardmäßig segmentiert. Verwenden Sie `{ id: "views", comp: "menu" }` für ein Menü oder `options` zur Auswahl und Sortierung.
- `"add_event"` - Aktion „Neues Ereignis“.
- `"toggle_sidebar"` - schaltet das Sidebar-Plug-in um.
- `"|"` - visueller Trenner.
- `{ id, comp, label, ... }` - UI-Kit-Element. Eine integrierte `id` passt das entsprechende Element an; andere IDs erstellen benutzerdefinierte Elemente.
- `{ id, comp: "container" }` - leerer Host, der in `onToolbarItemRender` gefüllt wird.

`comp` kann `button`, `toggle`, `menu`, `combo`, `segmented`, `text`, `stepper`, `datepicker`, `separator`, `spacer` oder `container` sein. Benutzerdefinierte Elemente können `label`, `icon`, `tooltip`, `css`, `width`, `height`, `align`, `disabled`, `hidden`, `value`, `placeholder`, `options`, `items` und `config` verwenden. `options` konfiguriert `combo` und `segmented`, `items` das `menu`, `config` komponentenspezifische Einstellungen.

Kombinieren Sie `id` nicht mit Legacy-`view`, `html` oder `click`: Es bleibt ein Legacy-Element und Scheduler warnt. Verwenden Sie `onToolbarItemClick` und `onToolbarItemChange` für benutzerdefinierte Aktionen.

### Beispiele für die Toolbar-Konfiguration

Aktivieren Sie das Plug-in vor der Initialisierung:

~~~js
scheduler.plugins({ toolbar: true, minical: true });
~~~

**1. Standardnavigation mit segmentierter Ansichtsauswahl**

~~~js
scheduler.config.header = [
    "add_event", "spacer", "prev", "date", "next", "today",
    { id: "views", comp: "segmented", options: ["day", "week", "month"] }
];
~~~

**2. Benutzerdefinierte UI-Kit-Steuerelemente und Trenner**

~~~js
scheduler.config.header = [
    "prev", "next", "|",
    { id: "range", comp: "combo", label: "Range", options: ["week", "month"] },
    { id: "search", comp: "text", placeholder: "Search events", width: 220 },
    "spacer",
    { id: "create", comp: "button", label: "Create", css: "my-create-button" }
];

scheduler.attachEvent("onToolbarItemChange", (id, value) => {
    if (id === "range") scheduler.setCurrentView(null, value);
    return true;
});
~~~

**3. Zweizeiliges Layout mit Legacy-Elementen und anwendungseigenem Inhalt**

~~~js
scheduler.config.header = {
    rows: [
        { cols: ["prev", "date", "next", { view: "minicalendar" }] },
        { cols: ["today", { id: "views", comp: "menu" }, "spacer", { id: "filters", comp: "container" }], align: "right" }
    ]
};

scheduler.attachEvent("onToolbarItemRender", (id, node) => {
    if (id !== "filters" || node.firstChild) return;
    const input = document.createElement("input");
    input.placeholder = "Filter";
    node.appendChild(input);
});
~~~
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