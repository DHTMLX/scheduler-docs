Full List of Extensions
=================================

dhtmlxScheduler includes a number of extensions which add extra functionality to the standard behavior. 

To use an extension, you should activate it with the help of the [scheduler.plugins](api/scheduler_plugins.md) method.

{{note In v6.0, the extensions code files were removed from the **ext** folder of the scheduler's codebase and included into the *dhtmlxscheduler.js* file. <br>If you use dhtmlxScheduler 5.3 and earlier versions, check the [migration article](migration_from_older_version.md#5360).}}

Active Links
-------------------------------------------
Presents the numbers of days in the Month and Week views as clickable links that open the related day in the specified view.

~~~js
scheduler.plugins({
    active_links: true
});
~~~

####Related resources

Article: <a href="month_view.md#presentingdaysnumbersasclickablelinks">Month view</a><br>
API: api/scheduler_active_link_view_config.md <br>

{{sample 03_extensions/06_links_plugin.html}}


Agenda View
--------------------------------------

The Agenda view code file.

~~~js
scheduler.plugins({
    agenda_view: true
});
~~~

####Related resources

Article: agenda_view.md <br>

{{sample 03_extensions/03_agenda_view.html}}


All Timed
---------------------------------------
Shows multi-day events in the regular way (as one-day events are displayed).

~~~js
scheduler.plugins({
    all_timed: true
});
~~~

####Related resources

API: api/scheduler_all_timed_config.md <br>

{{sample 03_extensions/26_multi_day_visible.html}}



Collision
---------------------------------------------
Manages the number of events in a time slot.

~~~js
scheduler.plugins({
    collision: true
});
~~~


####Related resources

Article: collisions.md <br>

{{sample 03_extensions/15_collision.html}}



Container Autoresize
---------------------------------------------
Enables autoresizing for the scheduler container (size is changed to fit the content).

~~~js
scheduler.plugins({
    container_autoresize: true
});
~~~

####Related resources

Article: initialization.md#containerautoresizing <br>

API: api/scheduler_container_autoresize_config.md <br>

{{sample 03_extensions/28_container_autoresize.html}}


Cookie
---------------------------------------------
Saves the scheduler current state (mode and date ) in cookies.

~~~js
scheduler.plugins({
    cookie: true
});
~~~

####Related resources

{{sample 03_extensions/08_cookies_plugin.html}}


Daytimeline
---------------------------------------------

{{note This extension is available in PRO version only}}

A code file for the "Days" mode of the Timeline view.

~~~js
scheduler.plugins({
    daytimeline: true
});
~~~


####Related resources

Article:  timeline_view.md

{{sample 06_timeline/14_days_as_sections.html}}


Drag-n-Drop between Schedulers
----------------------------

{{note This extension is available in the Scheduler PRO version (Commercial (since October 6, 2021), Enterprise and Ultimate licenses) only.}}

Enables drag-and-drop operations between multiple schedulers, which makes it possible to drag events from one scheduler to another and vice versa.

~~~js
scheduler.plugins({
    drag_between: true
});
~~~

####Related resources

Article: [Drag-and-drop between Schedulers](dhtmlx_components_integration.md#draganddropbetweenschedulers)


Editors
---------------------------------------------
A code file for the <a href="lightbox_editors.md#radio">radio</a>, <a href="lightbox_editors.md#combo">combo</a>, 
<a href="lightbox_editors.md#checkbox">checkbox</a> controls of the lightbox.

~~~js
scheduler.plugins({
    editors: true
});
~~~


####Related resources

Article: lightbox_editors.md <br>

{{sample 02_customization/14_radio_buttons_section.html}}



Expand
---------------------------------------------
Adds the "expand" icon to the right corner of the scheduler. A click on this icon changes 
the scheduler's size from original to 'full screen' and vice versa.

~~~js
scheduler.plugins({
    expand: true
});
~~~


####Related resources

API: api/scheduler_expand.md, api/scheduler_collapse.md <br>
Events: api/scheduler_onbeforeexpand_event.md, api/scheduler_onbeforecollapse_event.md, api/scheduler_onexpand_event.md, api/scheduler_oncollapse_event.md
 
{{sample 03_extensions/05_expand_plugin.html}}

Export service
-----------

Provides the possibility to enable the online export service.

~~~js
scheduler.plugins({
    export_api: true
});
~~~

####Related resources

Article: pdf.md , png.md

{{sample 04_export/06_online_export.html}}

Grid View
---------------------------------------------
{{note This extension is available in PRO version only}}

The Grid view code file.

~~~js
scheduler.plugins({
    grid_view: true
});
~~~


####Related resources

Article: grid_view.md<br>

{{sample 03_extensions/27_grid_view.html}}


HTML Templates
---------------------------------------------
Allows defining templates as an HTML code.

~~~js
scheduler.plugins({
    html_templates: true
});
~~~

####Related resources

Article: <a href="templates.md#specifyingtemplatesasanhtmlcode">Templates</a><br>

{{sample 03_extensions/09_html_templates_plugin.html}}



Keyboard Navigation
---------------------------------------------

Enables the keyboard navigation.

~~~js
scheduler.plugins({
    key_nav: true
});
~~~

####Related resources

Article: keyboard_navigation.md<br>

{{sample 13_accessibility/01_regular_skin_all_views.html}}<br><br>
{{sample 03_extensions/07_navigation_plugin.html}}


Legacy
---------------------------------------------
Enables deprecated API.

~~~js
scheduler.plugins({
    legacy: true
});
~~~

####Related resources

Article: migration_from_older_version.md<br>



Limit
---------------------------------------------
Provides functionality for blocking and highlighting dates.

~~~js
scheduler.plugins({
    limit: true
});
~~~

####Related resources

Article: limits.md<br>

{{sample 03_extensions/16_limitation.html}}


Map View
---------------------------------------------

The Map view code file.

~~~js
scheduler.plugins({
    map_view: true
});
~~~

####Related resources

Article: map_view.md<br>

{{sample 03_extensions/19_map_view.html}}


Mini Calendar (Date Picker)
---------------------------------------------
A plugin for the mini calendar.

~~~js
scheduler.plugins({
    minical: true
});
~~~

####Related resources

Article:  minicalendar.md, time.md#minicalendarinthelightbox<br>

{{sample 05_calendar/01_select.html}}

Multisection 
----------------

{{note This extension is available in PRO version only}}

Gives the possibility to assign events to several sections in Timeline view or several units in the Units view.

~~~js
scheduler.plugins({
    multisection: true
});
~~~

####Related resources

Article: timeline_view.md#assigningeventstoseveralsections, units_view.md#assigningeventstoseveralunits<br>
API: api/scheduler_multisection_config.md

{{sample 12_multisection_events/01_multisection_events.html}}

Multiselect
---------------------------------------------
A plugin for the <a href="lightbox_editors.md#multiselect">multiselect</a> control of the lightbox.

~~~js
scheduler.plugins({
    multiselect: true
});
~~~

####Related resources

Article:  lightbox_editors.md<br>

{{sample 03_extensions/21_multiselect_options.html}}


Multisource
---------------------------------------------
Provides functionality for loading data from multiple sources.

~~~js
scheduler.plugins({
    multisource: true
});
~~~

####Related resources

Article: loading_data.md#loadingdatafrommultiplesources<br>

{{sample 03_extensions/13_multisource.html}}


MVC
---------------------------------------------
Provides functionality for Backbone integration.

~~~js
scheduler.plugins({
    mvc: true
});
~~~

####Related resources

Article:   backbone_integration.md<br>

{{sample 10_integration/07_backbone.html}}


Outerdrag
---------------------------------------------
Allows dragging events from external DHTMLX components, i.e. dhtmlxTree.

~~~js
scheduler.plugins({
    outerdrag: true
});
~~~


####Related resources

Article:   dhtmlx_components_integration.md<br>

{{sample 10_integration/02_dhtmlxtree_outer_drag.html}}


PDF
---------------------------------------------
Provides export to a PDF document.

- [Export to PDF (version 4.0)](pdf_v4.md)

- [Export to PDF (version 4.1+)](pdf.md)


Quick Info
---------------------------------------------
Provides a popup with an event details.

~~~js
scheduler.plugins({
    quick_info: true
});
~~~


####Related resources

Article:   touch_support.md<br>

{{sample 03_extensions/29_quick_info.html}}


Readonly
---------------------------------------------
Provides the read-only mode for the lightbox and specific events.

~~~js
scheduler.plugins({
    readonly: true
});
~~~


####Related resources

Article:   readonly.md<br>

{{sample 03_extensions/12_readonly_form.html}}


Recurring
---------------------------------------------
Provides support for recurring events.

~~~js
scheduler.plugins({
    recurring: true
});
~~~


####Related resources

Article:   recurring_events.md<br>

{{sample 03_extensions/01_recurring_events.html}} 

Recurring Legacy
---------------------------------------------
Legacy engine for recurring events.

~~~js
scheduler.plugins({
    recurring_legacy: true
});
~~~

####Related resources

Article:   recurring_events_legacy.md<br>

Serialize
---------------------------------------------
Provides support for serializing into ICal, XML, JSON formats.

~~~js
scheduler.plugins({
    serialize: true
});
~~~


####Related resources

Article:   export.md<br>
 
{{sample 04_export/01_serialize_data.html}}


Timeline
---------------------------------------------
{{note This extension is available in PRO version only}}

The Timeline view plugin.

~~~js
scheduler.plugins({
    timeline: true
});
~~~


####Related resources

Article:  timeline_view.md<br>

{{sample 06_timeline/02_lines.html}}


Tooltip
---------------------------------------------
Enables tooltips for events.

~~~js
scheduler.plugins({
    tooltip: true
});
~~~


####Related resources

Article:  tooltips.md<br>

{{sample 03_extensions/20_tooltip.html}}


Treetimeline
---------------------------------------------
{{note This extension is available in PRO version only}}

An extension for the "Tree" mode of the Timeline view.

~~~js
scheduler.plugins({
    treetimeline: true
});
~~~


####Related resources

Article:  timeline_view.md<br>

{{sample 06_timeline/03_tree.html}}


Units
---------------------------------------------
{{note This extension is available in PRO version only}}

The Units view extension.

~~~js
scheduler.plugins({
    units: true
});
~~~


####Related resources

Article: units_view.md<br>

{{sample 03_extensions/02_units_view.html}}


URL
---------------------------------------------
Saves the scheduler's state (date, event's id, view) in URL.<br>For example, <code> 10_url_date_plugin.html#date=2014-08-01,mode=month</code> or <code>10_url_date_plugin.html#event=15</code>

~~~js
scheduler.plugins({
    url: true
});
~~~


####Related resources

{{sample 03_extensions/10_url_date_plugin.html}}



Week Agenda
---------------------------------------------

{{note This extension is available in PRO version only}}

The Week Agenda view code file.

~~~js
scheduler.plugins({
    week_agenda: true
});
~~~


####Related resources

Article: weekagenda_view.md<br>

{{sample 03_extensions/24_week_agenda.html}}



Year
---------------------------------------------
The Year view code file.

~~~js
scheduler.plugins({
    year_view: true
});
~~~

####Related resources

Article: year_view.md<br>

{{sample 03_extensions/04_year_view.html}}
