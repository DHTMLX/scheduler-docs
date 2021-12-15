Full List of Extensions
=================================

dhtmlxScheduler includes a number of extensions which add extra functionality to the standard behavior. 

To use an extension, you should it with the help of the [scheduler.plugins](api/scheduler_plugins.md) method.

{{note In v6.0, the extensions code files has been removed from the **ext** folder of the scheduler's codebase and included into the *dhtmlxscheduler.js* file. <br>If you use dhtmlxScheduler 5.3 and earlier versions, check the [migration article](migration_from_older_version.md#5360).}}

Active Links
-------------------------------------------
Presents the numbers of days in the Month and Week views as clickable links that open the related day in the specified view.

~~~js
<script src="../codebase/ext/dhtmlxscheduler_active_links.js"></script>

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
<script src="../codebase/ext/dhtmlxscheduler_agenda_view.js"></script>

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
<script src="../codebase/ext/dhtmlxscheduler_all_timed.js"></script>

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
<script src="../codebase/ext/dhtmlxscheduler_collision.js"></script>

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
<script src="../codebase/ext/dhtmlxscheduler_container_autoresize.js"></script>

scheduler.plugins({
    container_autoresize: true
});
~~~


####Related resources

API: api/scheduler_container_autoresize_config.md <br>

{{sample 03_extensions/28_container_autoresize.html}}


Content Security Policy
----------------------

Allows working with dhtmlxScheduler in case Content Security Policy (CSP) is enabled in the application.

~~~js
<script src="../codebase/ext/dhtmlxscheduler_csp.js"></script>

scheduler.plugins({
    csp: true
});
~~~

####Related resources

Article: content_security_policy.md


Cookie
---------------------------------------------
Saves the scheduler current state (mode and date ) in cookies.

~~~js
<script src="../codebase/ext/dhtmlxscheduler_cookie.js"></script>

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
<script src="../codebase/ext/dhtmlxscheduler_daytimeline.js"></script>

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
<script src="../codebase/ext/dhtmlxscheduler_drag_between.js"></script>

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
<script src="../codebase/ext/dhtmlxscheduler_editors.js"></script>

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
<script src="../codebase/ext/dhtmlxscheduler_expand.js"></script>

scheduler.plugins({
    expand: true
});
~~~


####Related resources

API: api/scheduler_expand.md, api/scheduler_collapse.md <br>
Events: api/scheduler_onbeforeexpand_event.md, api/scheduler_onbeforecollapse_event.md, api/scheduler_onexpand_event.md, api/scheduler_oncollapse_event.md
 
{{sample 03_extensions/05_expand_plugin.html}}


Grid View
---------------------------------------------
{{note This extension is available in PRO version only}}

The Grid view code file.

~~~js
<script src="../codebase/ext/dhtmlxscheduler_grid_view.js"></script>

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
<script src="../codebase/ext/dhtmlxscheduler_html_templates.js"></script>

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
<script src="../../codebase/ext/dhtmlxscheduler_key_nav.js"></script>

scheduler.plugins({
    key_nav: true
});
~~~

####Related resources

Article: keyboard_navigation.md<br>

{{sample 13_accessibility/01_regular_skin_all_views.html}}<br><br>
{{sample 03_extensions/07_navigation_plugin.html}}


Limit
---------------------------------------------
Provides functionality for blocking and highlighting dates.

~~~js
<script src="../codebase/ext/dhtmlxscheduler_limit.js"></script>

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
<script src="../codebase/ext/dhtmlxscheduler_map_view.js"></script>

scheduler.plugins({
    map_view: true
});
~~~

####Related resources

Article: map_view.md<br>

{{sample 03_extensions/19_map_view.html}}


Mini Calendar (Date Picker)
---------------------------------------------
A code file for the mini calendar.

~~~js
<script src="../codebase/ext/dhtmlxscheduler_minical.js"></script>

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
<script src="codebase/ext/dhtmlxscheduler_multisection.js"></script>

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
A code file for the <a href="lightbox_editors.md#multiselect">multiselect</a> control of the lightbox.

~~~js
<script src="../codebase/ext/dhtmlxscheduler_multiselect.js"></script>

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
<script src="../codebase/ext/dhtmlxscheduler_multisource.js"></script>

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
<script src="../codebase/ext/dhtmlxscheduler_mvc.js"></script>

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
<script src="../codebase/ext/dhtmlxscheduler_outerdrag.js"></script>

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

~~~js
<script src="../codebase/ext/dhtmlxscheduler_pdf.js"></script>

scheduler.plugins({
    pdf: true
});
~~~


####Related resources

Article:   pdf.md<br>

{{sample 04_export/06_online_export.html}}


Quick Info
---------------------------------------------
Provides a popup with an event details.

~~~js
<script src="../codebase/ext/dhtmlxscheduler_quick_info.js"></script>

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
<script src="../codebase/ext/dhtmlxscheduler_readonly.js"></script>

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
<script src="../codebase/ext/dhtmlxscheduler_recurring.js"></script>

scheduler.plugins({
    recurring: true
});
~~~


####Related resources

Article:   recurring_events.md<br>

{{sample 03_extensions/01_recurring_events.html}} 


Serialize
---------------------------------------------
Provides support for serializing into ICal, XML, JSON formats.

~~~js
<script src="../codebase/ext/dhtmlxscheduler_serialize.js"></script>

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

The Timeline view code file.

~~~js
<script src="../codebase/ext/dhtmlxscheduler_timeline.js"></script>

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

A code file for the "Tree" mode of the Timeline view.

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

The Units view code file.

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
