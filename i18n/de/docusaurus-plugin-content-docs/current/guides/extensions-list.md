---
title: "Vollständige Liste der Erweiterungen"
sidebar_label: "Vollständige Liste der Erweiterungen"
---

# Vollständige Liste der Erweiterungen

dhtmlxScheduler enthält eine Reihe von Erweiterungen, die dem Standardverhalten zusätzliche Funktionen hinzufügen.

Um eine Erweiterung zu verwenden, aktivieren Sie sie mit der Methode [`plugins()`](api/method/plugins.md).

:::info
In v6.0 wurden die Code-Dateien der Erweiterungen aus dem **ext**-Ordner der Scheduler-Codebasis entfernt und in die *dhtmlxscheduler.js*-Datei integriert.

Wenn Sie dhtmlxScheduler 5.3 oder frühere Versionen verwenden, lesen Sie den [Migrationsartikel](migration.md#53---60).
:::

## Active Links

Stellt die Anzahl der Tage in den Monats- und Wochenansichten als anklickbare Links dar, die den entsprechenden Tag in der angegebenen Ansicht öffnen.

~~~js
scheduler.plugins({
    active_links: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Monatsansicht](views/month.md)

API: [active_link_view](api/config/active_link_view.md)

Beispiel: [Monatstage als Links](https://docs.dhtmlx.com/scheduler/samples/03_extensions/06_links_plugin.html)

## Agenda View

Die Agenda-Ansicht Code-Datei.

~~~js
scheduler.plugins({
    agenda_view: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Agenda View](views/agenda.md)

Beispiel: [Agenda-Ansicht](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)

## All Timed

Zeigt mehrtägige Ereignisse auf die übliche Weise an (Da\-sein-Tage werden wie üblich angezeigt).

~~~js
scheduler.plugins({
    all_timed: true
});
~~~

#### Verwandte Ressourcen

API: [all_timed](api/config/all_timed.md) 

Beispiel: [Darstellung mehrtägiger Ereignisse auf übliche Weise](https://docs.dhtmlx.com/scheduler/samples/03_extensions/26_multi_day_visible.html)

## Collision

Verwaltet die Anzahl der Ereignisse in einem Zeitfenster.

~~~js
scheduler.plugins({
    collision: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Verhindern doppelter Ereignisse in einem Zeitfenster](guides/collisions.md) 

Beispiel: [Kontrolle der Anzahl der Ereignisse in einem Zeitfenster](https://docs.dhtmlx.com/scheduler/samples/03_extensions/15_collision.html)

## Container Autoresize

Ermöglicht eine automatische Größenanpassung des Scheduler-Containers (Größe wird an den Inhalt angepasst).

~~~js
scheduler.plugins({
    container_autoresize: true
});
~~~

#### Verwandte Ressourcen

Artikel: [dhtmlxScheduler in Plain JS/HTML](guides/initialization.md#scheduler-autoresizing)

API: [container_autoresize](api/config/container_autoresize.md) 

Beispiel: [Automatische Größenanpassung des Scheduler-Containers](https://docs.dhtmlx.com/scheduler/samples/03_extensions/28_container_autoresize.html)

## Cookie

Speichert den aktuellen Zustand des Schedulers (Modus und Datum) in Cookies.

~~~js
scheduler.plugins({
    cookie: true
});
~~~

#### Verwandte Ressourcen

Beispiel: [Arbeiten mit Cookies](https://docs.dhtmlx.com/scheduler/samples/03_extensions/08_cookies_plugin.html)

## Daytimeline

:::note
Diese Erweiterung ist nur in der PRO-Version verfügbar
:::

Eine Code-Datei für den "Days"-Modus der Timeline-Ansicht.

~~~js
scheduler.plugins({
    daytimeline: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Timeline View](views/timeline.md)

Beispiel: [Days as Timeline rows](https://docs.dhtmlx.com/scheduler/samples/06_timeline/14_days_as_sections.html)


## Drag-n-Drop between Schedulers

:::info
Diese Erweiterung ist nur in der Scheduler PRO-Version (Kommerzielle Lizenzen seit dem 6. Oktober 2021), Enterprise- und Ultimate-Lizenzen) verfügbar.
:::

Ermöglicht Drag-and-Drop-Operationen zwischen mehreren Scheduler-Instanzen, wodurch es möglich ist, Ereignisse von einem Scheduler zum anderen zu ziehen und umgekehrt.

~~~js
scheduler.plugins({
    drag_between: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Drag-and-Drop zwischen Schedulers](guides/drag-between.md)

## Editors

Eine Code-Datei für die [radio](guides/radio.md), [combo](guides/combo.md), [checkbox](guides/checkbox.md) Steuerelemente des Lightbox-Dialogs.

~~~js
scheduler.plugins({
    editors: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Lightbox Editors](guides/lightbox-editors.md)

Beispiel: [Radio-Button im Lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/14_radio_buttons_section.html)

## Expand

Fügt dem rechten Eckpunkt des Schedulers das "expand"-Symbol hinzu. Ein Klick auf dieses Symbol ändert die Größe des Schedulers von der Originalgröße auf Vollbild und umgekehrt.

~~~js
scheduler.plugins({
    expand: true
});
~~~

#### Verwandte Ressourcen

API: [`expand()`](api/method/expand.md), [`collapse()`](api/method/collapse.md)

Events: [onBeforeExpand](api/event/onbeforeexpand.md), [onBeforeCollapse](api/event/onbeforecollapse.md), [onExpand](api/event/onexpand.md), [onCollapse](api/event/oncollapse.md)

Beispiel: [Vollbild-Ansicht](https://docs.dhtmlx.com/scheduler/samples/03_extensions/05_expand_plugin.html)

## Export service

Bietet die Möglichkeit, den Online-Exportdienst zu aktivieren.

~~~js
scheduler.plugins({
    export_api: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Export nach PDF](export/pdf.md), [Export nach PNG](export/png.md)

Beispiel: [Export nach PDF/PNG](https://docs.dhtmlx.com/scheduler/samples/04_export/06_online_export.html)

## Grid View

:::info
Diese Erweiterung ist nur in der PRO-Version verfügbar
:::

Die Grid-Ansicht Code-Datei.

~~~js
scheduler.plugins({
    grid_view: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Grid View](views/grid.md)

Beispiel: [Grid view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/27_grid_view.html)

## HTML Templates

Ermöglicht das Definieren von Vorlagen als HTML-Code.

~~~js
scheduler.plugins({
    html_templates: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Templates](guides/templates.md#specifying-templates-with-code)

Beispiel: [Specifying templates with HTML](https://docs.dhtmlx.com/scheduler/samples/03_extensions/09_html_templates_plugin.html)


## Keyboard Navigation

Ermöglicht die Tastaturnavigation.

~~~js
scheduler.plugins({
    key_nav: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Keyboard Navigation](guides/keyboard-navigation.md)

Beispiel: [Keyboard Navigation und WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)

Beispiel: [Tastaturnavigation im Scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/07_navigation_plugin.html)

## Legacy

Aktiviert veraltete API.

~~~js
scheduler.plugins({
    legacy: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Migration From Older Versions](migration.md)

## Limit

Bietet Funktionalität zum Blockieren und Hervorheben von Daten.

~~~js
scheduler.plugins({
    limit: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Blocking and Marking Dates](guides/limits.md)

Beispiel: [Begrenzung von Daten beim Erstellen von Ereignissen](https://docs.dhtmlx.com/scheduler/samples/03_extensions/16_limitation.html)


## Map View

Die Map-Ansicht Code-Datei.

~~~js
scheduler.plugins({
    map_view: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Map View](views/map.md)

Beispiel: [Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/19_map_view.html)


## Mini Calendar (Date Picker)

Ein Plugin für den Mini-Kalender.

~~~js
scheduler.plugins({
    minical: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Mini Calendar (Date Picker)](guides/minicalendar.md), [Time and Date](guides/time.md#mini-calendar-in-the-lightbox)

Beispiel: [Mini-Kalender im Scheduler-Header](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)


## Multisection

:::info
Diese Erweiterung ist nur in der PRO-Version verfügbar
:::

Ermöglicht das Zuweisen von Ereignissen zu mehreren Abschnitten in der Timeline-Ansicht oder zu mehreren Einheiten in der Units-Ansicht.

~~~js
scheduler.plugins({
    multisection: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Timeline View](views/timeline.md), [Units View](views/units.md)

API: [multisection](api/config/multisection.md)

Beispiel: [Multisection-Ereignisse in Timeline- und Units-Ansicht](https://docs.dhtmlx.com/scheduler/samples/12_multisection_events/01_multisection_events.html)


## Multiselect

Ein Plugin für die [Multiselect](guides/multiselect.md)-Steuerung des Lightbox-Dialogs.

~~~js
scheduler.plugins({
    multiselect: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Lightbox Editors](guides/lightbox-editors.md)

Beispiel: [Multiselect-Steuerung im Lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/21_multiselect_options.html)


## Multisource

Bietet Funktionalität zum Laden von Daten aus mehreren Quellen.

~~~js
scheduler.plugins({
    multisource: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Laden von Daten](guides/loading-data.md#loading-data-from-multiple-sources)

Beispiel: [Daten aus mehreren Quellen laden](https://docs.dhtmlx.com/scheduler/samples/03_extensions/13_multisource.html)


## Outerdrag

Ermöglicht Drag-and-Drop von Ereignissen aus externen DHTMLX-Komponenten, z. B. dhtmlxTree.

~~~js
scheduler.plugins({
    outerdrag: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Drag-and-Drop Operations](guides/drag-between.md)

Beispiel: [Integration mit dhtmlxTree](https://docs.dhtmlx.com/scheduler/samples/10_integration/02_dhtmlxtree_outer_drag.html)


## PDF

Bietet Export in ein PDF-Dokument.

- [Export nach PDF (Version 4.0)](export/pdf-legacy.md)

- [Export nach PDF (Version 4.1+)](export/pdf.md)


## Quick Info

Bietet ein Popup mit Event-Details.

~~~js
scheduler.plugins({
    quick_info: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Mobile Responsive Scheduler](guides/touch-support.md)

Beispiel: [Touch-orientierter Scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/29_quick_info.html)


## Readonly

Bietet den Nur-Lese-Modus für das Lightbox-Dialogfenster und bestimmte Ereignisse.

~~~js
scheduler.plugins({
    readonly: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Read-only Mode](guides/readonly.md)

Beispiel: [Nur-Lese Lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)


## Recurring

Bietet Unterstützung für wiederkehrende Ereignisse.

~~~js
scheduler.plugins({
    recurring: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Recurring Events](guides/recurring-events.md)

Beispiel: [Wiederkehrende Ereignisse](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## Recurring Legacy

Legacy-Engine für wiederkehrende Ereignisse.

~~~js
scheduler.plugins({
    recurring_legacy: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Recurring Events (bis v7.1)](guides/recurring-events-legacy.md)


## Serialize

Bietet Unterstützung für das Serialisieren in ICal, XML, JSON-Formate.

~~~js
scheduler.plugins({
    serialize: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Data Serialization to XML, JSON, iCal](export/serialization.md)

Beispiel: [Scheduler-Ereignisse serialisieren](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)


## Timeline

:::info
Diese Erweiterung ist nur in der PRO-Version verfügbar
:::

Das Timeline-Ansicht-Plugin.

~~~js
scheduler.plugins({
    timeline: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Timeline View](views/timeline.md)

Beispiel: [Bar-Modus](https://docs.dhtmlx.com/scheduler/samples/06_timeline/02_lines.html)


## Tooltip

Aktiviert Tooltips für Ereignisse.

~~~js
scheduler.plugins({
    tooltip: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Tooltips](guides/tooltips.md)

Beispiel: [Tooltips](https://docs.dhtmlx.com/scheduler/samples/03_extensions/20_tooltip.html)


## Treetimeline

:::info
Diese Erweiterung ist nur in der PRO-Version verfügbar
:::

Eine Erweiterung für den "Tree"-Modus der Timeline-Ansicht.

~~~js
scheduler.plugins({
    treetimeline: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Timeline View](views/timeline.md)

Beispiel: [Tree mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/03_tree.html)


## Units

:::info
Diese Erweiterung ist nur in der PRO-Version verfügbar
:::

Die Units-Ansicht-Erweiterung.

~~~js
scheduler.plugins({
    units: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Units View](views/units.md)

Beispiel: [Units view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/02_units_view.html)


## URL

Speichert den Zustand des Schedulers (Datum, Ereignis-ID, Ansicht) in der URL.

Zum Beispiel:

```text
10_url_date_plugin.html#date=2027-08-01,mode=month
10_url_date_plugin.html#event=15
```

~~~js
scheduler.plugins({
    url: true
});
~~~

#### Verwandte Ressourcen

Beispiel: [Speichern des Scheduler-Zustands in der URL](https://docs.dhtmlx.com/scheduler/samples/03_extensions/10_url_date_plugin.html)


## Week Agenda

:::info
Diese Erweiterung ist nur in der PRO-Version verfügbar
:::

Die Code-Datei der Week-Agenda-Ansicht.

~~~js
scheduler.plugins({
    week_agenda: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Week Agenda View](views/weekagenda.md)

Beispiel: [WeekAgenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/24_week_agenda.html)


## Year

Die Year-Ansicht Code-Datei.

~~~js
scheduler.plugins({
    year_view: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Year View](views/year.md)

Beispiel: [Year view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/04_year_view.html)