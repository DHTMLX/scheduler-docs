---
title: "Full List of Extensions"
sidebar_label: "Full List of Extensions"
---

# Full List of Extensions

dhtmlxScheduler includes a number of extensions which add extra functionality to the standard behavior. 

To use an extension, you should activate it with the help of the [plugins](api/method/plugins.md) method.

:::info
In v6.0, the extensions code files were removed from the **ext** folder of the scheduler's codebase and included into the *dhtmlxscheduler.js* file. 

If you use dhtmlxScheduler 5.3 and earlier versions, check the [migration article](migration.md#53---60).
:::

## Active Links

Presents the numbers of days in the Month and Week views as clickable links that open the related day in the specified view.

~~~js
scheduler.plugins({
    active_links: true
});
~~~

#### Related resources

Article: [Month View](views/month.md)


API: [active_link_view](api/config/active_link_view.md)


[Month days as links](https://docs.dhtmlx.com/scheduler/samples/03_extensions/06_links_plugin.html)


## Agenda View

The Agenda view code file.

~~~js
scheduler.plugins({
    agenda_view: true
});
~~~

#### Related resources

Article: [Agenda View](views/agenda.md)


[Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)


## All Timed

Shows multi-day events in the regular way (as one-day events are displayed).

~~~js
scheduler.plugins({
    all_timed: true
});
~~~

#### Related resources

API: [all_timed](api/config/all_timed.md) 


[Displaying multi-day events in the regular way](https://docs.dhtmlx.com/scheduler/samples/03_extensions/26_multi_day_visible.html)

## Collision

Manages the number of events in a time slot.

~~~js
scheduler.plugins({
    collision: true
});
~~~


#### Related resources

Article: [Preventing Double Events in a Time Slot](guides/collisions.md) 


[Controlling the number of events in a time slot](https://docs.dhtmlx.com/scheduler/samples/03_extensions/15_collision.html)

## Container Autoresize

Enables autoresizing for the scheduler container (size is changed to fit the content).

~~~js
scheduler.plugins({
    container_autoresize: true
});
~~~

#### Related resources

Article: [dhtmlxScheduler in Plain JS/HTML](guides/initialization.md#scheduler-autoresizing)

API: [container_autoresize](api/config/container_autoresize.md) 


[Autoresizing the scheduler container](https://docs.dhtmlx.com/scheduler/samples/03_extensions/28_container_autoresize.html)


## Cookie

Saves the scheduler current state (mode and date ) in cookies.

~~~js
scheduler.plugins({
    cookie: true
});
~~~

#### Related resources

[Work with cookies](https://docs.dhtmlx.com/scheduler/samples/03_extensions/08_cookies_plugin.html)


## Daytimeline

:::note
This extension is available in PRO version only
:::

A code file for the "Days" mode of the Timeline view.

~~~js
scheduler.plugins({
    daytimeline: true
});
~~~


#### Related resources

Article: [Timeline View](views/timeline.md)

[Days as Timeline rows](https://docs.dhtmlx.com/scheduler/samples/06_timeline/14_days_as_sections.html)


## Drag-n-Drop between Schedulers

:::info
This extension is available in the Scheduler PRO version (Commercial (since October 6, 2021), Enterprise and Ultimate licenses) only.
:::

Enables drag-and-drop operations between multiple schedulers, which makes it possible to drag events from one scheduler to another and vice versa.

~~~js
scheduler.plugins({
    drag_between: true
});
~~~

#### Related resources

Article: [Drag-and-drop between Schedulers](guides/drag-between.md)


## Editors

A code file for the [radio](guides/radio.md), [combo](guides/combo.md), [checkbox](guides/checkbox.md) controls of the lightbox.

~~~js
scheduler.plugins({
    editors: true
});
~~~


#### Related resources

Article: [](guides/lightbox-editors.md)


[Radio button in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/14_radio_buttons_section.html)


## Expand

Adds the "expand" icon to the right corner of the scheduler. A click on this icon changes 
the scheduler's size from original to 'full screen' and vice versa.

~~~js
scheduler.plugins({
    expand: true
});
~~~


#### Related resources

API: [expand](api/method/expand.md), [collapse](api/method/collapse.md) 


Events: [onBeforeExpand](api/event/onbeforeexpand.md), [onBeforeCollapse](api/event/onbeforecollapse.md), [onExpand](api/event/onexpand.md), [onCollapse](api/event/oncollapse.md)
 

[Full-screen view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/05_expand_plugin.html)


## Export service

Provides the possibility to enable the online export service.

~~~js
scheduler.plugins({
    export_api: true
});
~~~

#### Related resources

Article: [Export to PDF](export/pdf.md) , [Export to PNG](export/png.md)


[Export to PDF/PNG](https://docs.dhtmlx.com/scheduler/samples/04_export/06_online_export.html)


## Grid View

:::info
This extension is available in PRO version only
:::

The Grid view code file.

~~~js
scheduler.plugins({
    grid_view: true
});
~~~


#### Related resources

Article: [Grid View](views/grid.md)


[Grid view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/27_grid_view.html)


## HTML Templates

Allows defining templates as an HTML code.

~~~js
scheduler.plugins({
    html_templates: true
});
~~~

#### Related resources

Article: [Templates](guides/templates.md#specifying-templates-with-code)

[Specifying templates with HTML](https://docs.dhtmlx.com/scheduler/samples/03_extensions/09_html_templates_plugin.html)


## Keyboard Navigation

Enables the keyboard navigation.

~~~js
scheduler.plugins({
    key_nav: true
});
~~~

#### Related resources

Article: [Keyboard Navigation](guides/keyboard-navigation.md)

[Keyboard Navigation and WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)

[Keyboard navigation in the scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/07_navigation_plugin.html)

## Legacy

Enables deprecated API.

~~~js
scheduler.plugins({
    legacy: true
});
~~~

#### Related resources

Article: [Migration From Older Versions](migration.md)

## Limit

Provides functionality for blocking and highlighting dates.

~~~js
scheduler.plugins({
    limit: true
});
~~~

#### Related resources

Article: [Blocking and Marking Dates](guides/limits.md)

[Limiting dates for creating events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/16_limitation.html)


## Map View

The Map view code file.

~~~js
scheduler.plugins({
    map_view: true
});
~~~

#### Related resources

Article: [Map View](views/map.md)

[Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/19_map_view.html)


## Mini Calendar (Date Picker)

A plugin for the mini calendar.

~~~js
scheduler.plugins({
    minical: true
});
~~~

#### Related resources

Article: [Mini Calendar (Date Picker)](guides/minicalendar.md), [Time and Date](guides/time.md#mini-calendar-in-the-lightbox)

[Mini calendar in the scheduler header](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)


## Multisection 

:::info
This extension is available in PRO version only
:::

Gives the possibility to assign events to several sections in Timeline view or several units in the Units view.

~~~js
scheduler.plugins({
    multisection: true
});
~~~

#### Related resources

Article: [Timeline View](views/timeline.md), [Units View](views/units.md)


API: [multisection](api/config/multisection.md)


[Multisection events in Timeline and Units view](https://docs.dhtmlx.com/scheduler/samples/12_multisection_events/01_multisection_events.html)


## Multiselect

A plugin for the [multiselect](guides/multiselect.md) control of the lightbox.

~~~js
scheduler.plugins({
    multiselect: true
});
~~~

#### Related resources

Article: lightbox_editors.md


[Multiselect control in the lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/21_multiselect_options.html)


## Multisource

Provides functionality for loading data from multiple sources.

~~~js
scheduler.plugins({
    multisource: true
});
~~~

#### Related resources

Article: [Loading Data](guides/loading-data.md#loading-data-from-multiple-sources)

[Loading data from multiple sources](https://docs.dhtmlx.com/scheduler/samples/03_extensions/13_multisource.html)

## Outerdrag

Allows dragging events from external DHTMLX components, i.e. dhtmlxTree.

~~~js
scheduler.plugins({
    outerdrag: true
});
~~~


#### Related resources

Article: [Drag-and-Drop Operations](guides/drag-between.md)


[Integration with dhtmlxTree](https://docs.dhtmlx.com/scheduler/samples/10_integration/02_dhtmlxtree_outer_drag.html)


## PDF

Provides export to a PDF document.

- [Export to PDF (version 4.0)](export/pdf-legacy.md)

- [Export to PDF (version 4.1+)](export/pdf.md)


## Quick Info

Provides a popup with an event details.

~~~js
scheduler.plugins({
    quick_info: true
});
~~~


#### Related resources

Article: [Mobile Responsive Scheduler](guides/touch-support.md)

[Touch-oriented scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/29_quick_info.html)


## Readonly

Provides the read-only mode for the lightbox and specific events.

~~~js
scheduler.plugins({
    readonly: true
});
~~~


#### Related resources

Article: [Read-only Mode](guides/readonly.md)

[Read-only lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)


## Recurring

Provides support for recurring events.

~~~js
scheduler.plugins({
    recurring: true
});
~~~


#### Related resources

Article: [Recurring Events](guides/recurring-events.md)

[Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)
 

## Recurring Legacy

Legacy engine for recurring events.

~~~js
scheduler.plugins({
    recurring_legacy: true
});
~~~

#### Related resources

Article: [Recurring Events (up to v7.1)](guides/recurring-events-legacy.md)

## Serialize

Provides support for serializing into ICal, XML, JSON formats.

~~~js
scheduler.plugins({
    serialize: true
});
~~~


#### Related resources

Article: [Data Serialization to XML, JSON, iCal](export/serialization.md)

[Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)


## Timeline

:::info
This extension is available in PRO version only
:::

The Timeline view plugin.

~~~js
scheduler.plugins({
    timeline: true
});
~~~


#### Related resources

Article: [Timeline View](views/timeline.md)


[Bar mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/02_lines.html)


## Tooltip

Enables tooltips for events.

~~~js
scheduler.plugins({
    tooltip: true
});
~~~


#### Related resources

Article: [Tooltips](guides/tooltips.md)


[Tooltips](https://docs.dhtmlx.com/scheduler/samples/03_extensions/20_tooltip.html)


## Treetimeline

:::info
This extension is available in PRO version only
:::

An extension for the "Tree" mode of the Timeline view.

~~~js
scheduler.plugins({
    treetimeline: true
});
~~~


#### Related resources

Article: [Timeline View](views/timeline.md)


[Tree mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/03_tree.html)


## Units

:::info
This extension is available in PRO version only
:::

The Units view extension.

~~~js
scheduler.plugins({
    units: true
});
~~~


#### Related resources

Article: [Units View](views/units.md)

[Units view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/02_units_view.html)


## URL

Saves the scheduler's state (date, event's id, view) in URL.

For example, 
```
<code> 10_url_date_plugin.html#date=2014-08-01,mode=month</code> or <code>10_url_date_plugin.html#event="15</code">
```
~~~js
scheduler.plugins({
    url: true
});
~~~


#### Related resources

[Saving the scheduler state in URL](https://docs.dhtmlx.com/scheduler/samples/03_extensions/10_url_date_plugin.html)


## Week Agenda

:::info
This extension is available in PRO version only
:::

The Week Agenda view code file.

~~~js
scheduler.plugins({
    week_agenda: true
});
~~~


#### Related resources

Article: [Week Agenda View](views/weekagenda.md)

[WeekAgenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/24_week_agenda.html)


## Year

The Year view code file.

~~~js
scheduler.plugins({
    year_view: true
});
~~~

#### Related resources

Article: [Year View](views/year.md)


[Year view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/04_year_view.html)
