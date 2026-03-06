---
title: "Vollständige Liste der Erweiterungen"
sidebar_label: "Vollständige Liste der Erweiterungen"
---

# Vollständige Liste der Erweiterungen

dhtmlxScheduler bietet eine Vielzahl von Erweiterungen, die die Standardfunktionalität erweitern.

Um eine Erweiterung zu aktivieren, verwenden Sie die Methode [scheduler.plugins](api/method/plugins.md).

:::info
Ab Version 6.0 wurden die Erweiterungsdateien aus dem **ext**-Ordner entfernt und in die *dhtmlxscheduler.js*-Datei integriert.

Wenn Sie dhtmlxScheduler 5.3 oder älter verwenden, lesen Sie bitte den [Migrationsartikel](migration.md#53---60).
:::

## Active Links {#active-links}

Zeigt die Tagesnummern in der Monats- und Wochenansicht als anklickbare Links an, die den entsprechenden Tag in der gewählten Ansicht öffnen.

~~~js
scheduler.plugins({
    active_links: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Monatsansicht](views/month.md#presenting-days-numbers-as-clickable-links)


API: [active_link_view](api/config/active_link_view.md) 


[Month days as links](https://docs.dhtmlx.com/scheduler/samples/03_extensions/06_links_plugin.html)


## Agenda View {#agenda-view}

Dies ist die Code-Datei für die Agenda-Ansicht.

~~~js
scheduler.plugins({
    agenda_view: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Agenda-Ansicht](views/agenda.md) 


[Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)


## All Timed {#all-timed}

Zeigt mehrtägige Ereignisse im gleichen Stil wie eintägige Ereignisse an.

~~~js
scheduler.plugins({
    all_timed: true
});
~~~

#### Verwandte Ressourcen

API: [all_timed](api/config/all_timed.md) 


[Displaying multi-day events in the regular way](https://docs.dhtmlx.com/scheduler/samples/03_extensions/26_multi_day_visible.html)


## Collision {#collision}

Steuert die Anzahl der Ereignisse, die im selben Zeitfenster auftreten.

~~~js
scheduler.plugins({
    collision: true
});
~~~


#### Verwandte Ressourcen

Artikel: [Verhindern von doppelten Ereignissen in einem Zeitfenster](guides/collisions.md) 


[Controlling the number of events in a time slot](https://docs.dhtmlx.com/scheduler/samples/03_extensions/15_collision.html)


## Container Autoresize {#container-autoresize}

Passt die Größe des Scheduler-Containers automatisch an den Inhalt an.

~~~js
scheduler.plugins({
    container_autoresize: true
});
~~~

#### Verwandte Ressourcen

Artikel: [dhtmlxScheduler in Plain JS/HTML](guides/initialization.md#containerautoresizing)


API: [container_autoresize](api/config/container_autoresize.md) 


[Autoresizing the scheduler container](https://docs.dhtmlx.com/scheduler/samples/03_extensions/28_container_autoresize.html)


## Cookie {#cookie}

Speichert den aktuellen Scheduler-Status (Modus und Datum) mithilfe von Cookies.

~~~js
scheduler.plugins({
    cookie: true
});
~~~

#### Verwandte Ressourcen

[Work with cookies](https://docs.dhtmlx.com/scheduler/samples/03_extensions/08_cookies_plugin.html)


## Daytimeline {#daytimeline}

:::info
Diese Erweiterung ist nur in der PRO-Version verfügbar
:::

Stellt den "Days"-Modus für die Timeline-Ansicht bereit.

~~~js
scheduler.plugins({
    daytimeline: true
});
~~~


#### Verwandte Ressourcen

Artikel: [Timeline-Ansicht](views/timeline.md)


[Days as Timeline rows](https://docs.dhtmlx.com/scheduler/samples/06_timeline/14_days_as_sections.html)


## Drag-n-Drop zwischen Schedulern {#drag-n-drop-between-schedulers}

:::info
Diese Erweiterung ist nur in der Scheduler PRO-Version (Commercial (seit 6. Oktober 2021), Enterprise und Ultimate Lizenzen) verfügbar.
:::

Ermöglicht das Ziehen und Ablegen von Ereignissen zwischen mehreren Schedulern, sodass Ereignisse von einem Scheduler zum anderen verschoben werden können.

~~~js
scheduler.plugins({
    drag_between: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Drag-and-drop zwischen Schedulern](guides/drag-between.md)


## Editors {#editors}

Enthält Code für die [radio](guides/radio.md), [combo](guides/combo.md), 
[checkbox](guides/checkbox.md) Steuerelemente, die in der Lightbox verwendet werden.

~~~js
scheduler.plugins({
    editors: true
});
~~~


#### Verwandte Ressourcen

Artikel: [Lightbox-Steuerelemente](guides/lightbox-editors.md) 


[Radio button in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/14_radio_buttons_section.html)


## Expand {#expand}

Fügt ein "Expandieren"-Symbol in der oberen rechten Ecke des Schedulers hinzu. Ein Klick darauf wechselt zwischen der Originalgröße und dem Vollbildmodus.

~~~js
scheduler.plugins({
    expand: true
});
~~~


#### Verwandte Ressourcen

API: [expand](api/method/expand.md), [collapse](api/method/collapse.md) 


Events: [onBeforeExpand](api/event/onbeforeexpand.md), [onBeforeCollapse](api/event/onbeforecollapse.md), [onExpand](api/event/onexpand.md), [onCollapse](api/event/oncollapse.md)
 

[Full-screen view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/05_expand_plugin.html)


## Export service {#export-service}

Aktiviert den Online-Export-Service.

~~~js
scheduler.plugins({
    export_api: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Export nach PDF](export/pdf.md) , [Export nach PNG](export/png.md)


[Export to PDF/PNG](https://docs.dhtmlx.com/scheduler/samples/04_export/06_online_export.html)


## Grid View {#grid-view}

:::info
Diese Erweiterung ist nur in der PRO-Version verfügbar
:::

Die Code-Datei für die Grid-Ansicht.

~~~js
scheduler.plugins({
    grid_view: true
});
~~~


#### Verwandte Ressourcen

Artikel: [Grid-Ansicht](views/grid.md)


[Grid view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/27_grid_view.html)


## HTML Templates {#html-templates}

Erlaubt das Definieren von Templates mit HTML-Code.

~~~js
scheduler.plugins({
    html_templates: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Templates](guides/templates.md#specifyingtemplatesasanhtmlcode)


[Specifying templates with HTML](https://docs.dhtmlx.com/scheduler/samples/03_extensions/09_html_templates_plugin.html)


## Keyboard Navigation {#keyboard-navigation}

Aktiviert die Navigation mit der Tastatur.

~~~js
scheduler.plugins({
    key_nav: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Tastaturnavigation](guides/keyboard-navigation.md)


[Keyboard Navigation and WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)


[Keyboard navigation in the scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/07_navigation_plugin.html)


## Legacy {#legacy}

Aktiviert die Unterstützung für veraltete APIs.

~~~js
scheduler.plugins({
    legacy: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Migration von älteren Versionen](migration.md)


## Limit {#limit}

Bietet Optionen, um bestimmte Daten zu blockieren und hervorzuheben.

~~~js
scheduler.plugins({
    limit: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Blockieren und Markieren von Daten](guides/limits.md)


[Limiting dates for creating events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/16_limitation.html)


## Map View {#map-view}

Die Code-Datei für die Kartenansicht.

~~~js
scheduler.plugins({
    map_view: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Kartenansicht](views/map.md)


[Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/19_map_view.html)


## Mini Calendar (Date Picker) {#mini-calendar-date-picker}

Ein Plugin, das einen Mini-Kalender hinzufügt.

~~~js
scheduler.plugins({
    minical: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Mini-Kalender (Datumsauswahl)](guides/minicalendar.md), [Zeit und Datum](guides/time.md#minicalendarinthelightbox)


[Mini calendar in the scheduler header](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)


## Multisection {#multisection}

:::info
Diese Erweiterung ist nur in der PRO-Version verfügbar
:::

Ermöglicht das Zuweisen von Ereignissen zu mehreren Sektionen in der Timeline-Ansicht oder zu mehreren Einheiten in der Units-Ansicht.

~~~js
scheduler.plugins({
    multisection: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Timeline-Ansicht](views/timeline.md#assignment-of-events-to-several-sections), [Units-Ansicht](views/units.md#assigning-events-to-several-units)


API: [multisection](api/config/multisection.md)


[Multisection events in Timeline and Units view](https://docs.dhtmlx.com/scheduler/samples/12_multisection_events/01_multisection_events.html)


## Multiselect {#multiselect}

Fügt Unterstützung für das [multiselect](guides/multiselect.md) Steuerelement in der Lightbox hinzu.

~~~js
scheduler.plugins({
    multiselect: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Lightbox-Steuerelemente](guides/lightbox-editors.md)


[Multiselect control in the lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/21_multiselect_options.html)


## Multisource {#multisource}

Ermöglicht das Laden von Daten aus mehreren Quellen.

~~~js
scheduler.plugins({
    multisource: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Daten laden](guides/loading-data.md#loadingdatafrommultiplesources)


[Loading data from multiple sources](https://docs.dhtmlx.com/scheduler/samples/03_extensions/13_multisource.html)


## Outerdrag {#outerdrag}

Erlaubt das Ziehen von Ereignissen aus externen DHTMLX-Komponenten wie dhtmlxTree.

~~~js
scheduler.plugins({
    outerdrag: true
});
~~~


#### Verwandte Ressourcen

Artikel: [Drag-and-Drop-Operationen](guides/drag-between.md)


[Integration with dhtmlxTree](https://docs.dhtmlx.com/scheduler/samples/10_integration/02_dhtmlxtree_outer_drag.html)


## PDF {#pdf}

Unterstützt den Export in PDF-Dokumente.

- [Export nach PDF (Version 4.0)](export/pdf-legacy.md)

- [Export nach PDF (Version 4.1+)]([Export nach PDF](export/pdf.md))


## Quick Info {#quick-info}

Zeigt ein Popup mit den Details eines Ereignisses an.

~~~js
scheduler.plugins({
    quick_info: true
});
~~~


#### Verwandte Ressourcen

Artikel: [Mobile Responsive Scheduler](guides/touch-support.md)


[Touch-oriented scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/29_quick_info.html)


## Readonly {#readonly}

Aktiviert den Nur-Lesen-Modus für die Lightbox und bestimmte Ereignisse.

~~~js
scheduler.plugins({
    readonly: true
});
~~~


#### Verwandte Ressourcen

Artikel: [Schreibgeschützter Modus](guides/readonly.md)


[Read-only lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)


## Recurring {#recurring}

Fügt Unterstützung für wiederkehrende Ereignisse hinzu.

~~~js
scheduler.plugins({
    recurring: true
});
~~~


#### Verwandte Ressourcen

Artikel: [Wiederkehrende Ereignisse](guides/recurring-events.md)


[Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)
 

## Recurring Legacy {#recurring-legacy}

Legacy-Unterstützung für wiederkehrende Ereignisse.

~~~js
scheduler.plugins({
    recurring_legacy: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Wiederkehrende Ereignisse (bis v7.1)](guides/recurring-events-legacy.md)


## Serialize {#serialize}

Unterstützt das Serialisieren von Daten in ICal-, XML- und JSON-Formate.

~~~js
scheduler.plugins({
    serialize: true
});
~~~


#### Verwandte Ressourcen

Artikel: [Daten-Serialisierung nach XML, JSON, iCal](export/serialization.md)


 

[Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)


## Timeline {#timeline}

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

Artikel: [Timeline-Ansicht](views/timeline.md)


[Bar mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/02_lines.html)


## Tooltip {#tooltip}

Aktiviert Tooltips für Ereignisse.

~~~js
scheduler.plugins({
    tooltip: true
});
~~~


#### Verwandte Ressourcen

Artikel: [Tooltips](guides/tooltips.md)


[Tooltips](https://docs.dhtmlx.com/scheduler/samples/03_extensions/20_tooltip.html)


## Treetimeline {#treetimeline}

:::info
Diese Erweiterung ist nur in der PRO-Version verfügbar
:::

Stellt den "Tree"-Modus für die Timeline-Ansicht bereit.

~~~js
scheduler.plugins({
    treetimeline: true
});
~~~


#### Verwandte Ressourcen

Artikel: [Timeline-Ansicht](views/timeline.md)


[Tree mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/03_tree.html)


## Units {#units}

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

Artikel: [Units-Ansicht](views/units.md)


[Units view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/02_units_view.html)


## URL {#url}

Speichert den Zustand des Schedulers (Datum, Ereignis-ID, Ansicht) in der URL.

Beispiele: 

~~~
<code>10_url_date_plugin.html#date=2014-08-01,mode=month</code> oder <code>10_url_date_plugin.html#event="15</code">
~~~

~~~js
scheduler.plugins({
    url: true
});
~~~


#### Verwandte Ressourcen

[Saving the scheduler state in URL](https://docs.dhtmlx.com/scheduler/samples/03_extensions/10_url_date_plugin.html)


## Week Agenda {#week-agenda}

:::info
Diese Erweiterung ist nur in der PRO-Version verfügbar
:::

Die Code-Datei für die Week Agenda-Ansicht.

~~~js
scheduler.plugins({
    week_agenda: true
});
~~~


#### Verwandte Ressourcen

Artikel: [Week-Agenda-Ansicht](views/weekagenda.md)


[WeekAgenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/24_week_agenda.html)


## Year {#year}

Die Code-Datei für die Jahresansicht.

~~~js
scheduler.plugins({
    year_view: true
});
~~~

#### Verwandte Ressourcen

Artikel: [Jahresansicht](views/year.md)


[Year view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/04_year_view.html)
