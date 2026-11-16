---
title: "Mobiler responsiver Scheduler"
sidebar_label: "Mobiler responsiver Scheduler"
description: "Scheduler v8 für Touch-Geräte und responsive Toolbar-/Sidebar-Layouts konfigurieren"
---

# Mobiler responsiver Scheduler

Scheduler unterstützt Touch-Eingaben auf iOS, Android, Windows-Tablets, Touchscreen-Monitoren und Smartphones. Touch-Gesten sind in jeder Ansicht verfügbar. Konfigurieren Sie auf kleinen Bildschirmen sowohl das Anwendungslayout als auch den Kalender.

:::note
Diese Anleitung beschreibt das Toolbar- und Sidebar-Layout von v8.0. Anwendungen mit Legacy-Navigationsleiste können weiterhin den [responsiven Header-Ansatz aus v7.2](guides/touch-support-legacy.md) verwenden.
:::

Für touchorientierte Anwendungen:

- fügen Sie `<meta name="viewport" content="width=device-width, initial-scale=1">` ein;
- verwenden Sie den [Material-Skin](guides/skins.md#material-skin) oder ein Theme mit ausreichend großen Steuerelementen;
- aktivieren Sie das [Quick Info](guides/quick-info.md)-Plug-in für einen kompakten Ereigniseditor;
- aktivieren Sie `responsive_lightbox`, wenn sich die integrierte Lightbox an schmale Bildschirme anpassen soll.

## Responsive Toolbar

Aktivieren Sie das Toolbar-Plug-in und stellen Sie vollständige und kompakte Varianten von `scheduler.config.header` bereit. Wählen Sie mit `onLayoutSizeChange` zwischen ihnen:

~~~js
const compactHeader = {
    rows: [
        { cols: ["prev", "date", "next"] },
        { cols: ["today", { id: "views", comp: "menu" }] }
    ]
};

const fullHeader = [
    "toggle_sidebar", "add_event", "spacer",
    "prev", "date", "next", "spacer", "today", "views"
];

scheduler.plugins({ toolbar: true, sidebar: true });

scheduler.attachEvent("onLayoutSizeChange", ({ width }) => {
    scheduler.config.header = width < 700 ? compactHeader : fullHeader;
});

scheduler.init("scheduler_here", new Date(), "week");
~~~

Das Ereignis meldet die Breite der Layout-Shell, also des an `scheduler.init()` übergebenen Elements. Verwenden Sie sie statt `window.innerWidth`, da Scheduler nur einen Teil der Seite belegen kann. Wählen Sie den Header nicht anhand der Kalenderhöhe; der Wechsel zwischen einer und zwei Toolbar-Zeilen verändert diese Höhe und kann eine Resize-Schleife erzeugen.

Toolbar liest `config.header` nach `onLayoutSizeChange` erneut, sodass die ausgewählte Struktur im selben Rendern verwendet wird. Eine unveränderte Struktur behält vorhandene Steuerelemente und Framework-Komponenten.

`scheduler.xy.nav_height = 0` blendet die Navigationsleiste aus. Positive Werte legen ihre Höhe nicht fest. Verwenden Sie für eine feste Toolbar-Höhe eine positive `config.header.height` oder die CSS-Variable `--dhx-scheduler-toolbar-height`.

## Responsive Sidebar

Die Sidebar verwendet dieselbe Shell-Breite wie die Toolbar:

~~~js
scheduler.config.sidebar = {
    items: ["minicalendar", "event_groups"],
    position: "left",
    width: 260,
    collapsed: false,
    overlay_width: 768
};
~~~

Unterhalb von `overlay_width` wird die Sidebar zu einem geschlossenen Overlay, wenn ein sichtbares `toggle_sidebar`-Element in der integrierten oder einer eigenständigen Toolbar vorhanden ist. Ohne dieses Steuerelement bleibt sie angedockt. Laufzeitaufrufe wie `scheduler.ext.sidebar.show()` und `hide()` ändern den sichtbaren Zustand, ohne `config.sidebar.collapsed` zu überschreiben.

Siehe [Anwendungslayout](guides/application-layout.md), [Toolbar](guides/toolbar.md) und [Sidebar](guides/sidebar.md).

## Automatische Containergröße

Reservieren Sie bei `container_autoresize` in einem scrollenden Elternelement Platz für dessen vertikale Scrollleiste. Andernfalls kann sie die Shell-Breite an einem responsiven Breakpoint wiederholt ändern:

~~~css
.scheduler-scroll-container {
    overflow: auto;
    scrollbar-gutter: stable;
}
~~~

Mit einer Toolbar- oder Sidebar-Shell löst eine von `container_autoresize` geschriebene Höhe kein `onSchedulerResize` aus. Verwenden Sie `onLayoutSizeChange` für Entscheidungen zum Anwendungslayout.

## Responsive Lightbox

Aktivieren Sie responsive Stile für die integrierte Lightbox:

~~~js
scheduler.config.responsive_lightbox = true;
~~~

Auf schmalen Bildschirmen erhält die Lightbox die Klasse `dhx_cal_light_responsive`. Verwenden Sie sie für anwendungsspezifische responsive Stile.

## Touch-Konfigurationsoptionen

- [touch](api/config/touch.md) aktiviert oder deaktiviert Touch-Unterstützung;
- [touch_drag](api/config/touch_drag.md) legt die Verzögerung zwischen langem Drücken und Scrollen fest;
- [touch_swipe_dates](api/config/touch_swipe_dates.md) aktiviert Datumsnavigation per horizontalem Wischen;
- [touch_tip](api/config/touch_tip.md) steuert Touch-Hinweise;
- [touch_tooltip](api/config/touch_tooltip.md) steuert Touch-Tooltips;
- [responsive_lightbox](api/config/responsive_lightbox.md) aktiviert responsive Lightbox-Stile.

## Touch-Gesten im Scheduler {#touch-gestures-in-the-scheduler}

- **Doppeltippen** funktioniert wie ein Doppelklick und öffnet oder erstellt ein Ereignis.
- **Lang tippen und ziehen** verschiebt ein Ereignis oder erstellt eines in einem leeren Zeitfenster.
- **Wischen** wechselt bei aktiviertem `touch_swipe_dates` zum vorherigen oder nächsten Datumsbereich.

Bei aktivierter Toolbar verwendet horizontales Wischen denselben abbrechbaren `onToolbarItemClick`-Aktionspfad wie `prev` und `next`.

## Quick Info-Erweiterung {#quick-info-extension}

Das [Quick Info](guides/quick-info.md)-Plug-in bietet eine touchfreundliche Ereigniszusammenfassung und Aktionsschaltflächen. Aktivieren Sie es vor der Initialisierung:

~~~js
scheduler.plugins({ quick_info: true });
~~~

Quick Info verwendet die Templates `quick_info_content`, `quick_info_date`, `quick_info_title`. Methoden und Ereignisse sind unter anderem `showQuickInfo`, `hideQuickInfo`, `onQuickInfo`, `onAfterQuickInfo`.

[Beispiel für ein responsives Anwendungslayout](https://docs.dhtmlx.com/scheduler/samples/16_layout/03_layout.html)