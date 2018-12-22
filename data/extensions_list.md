Full List of Extensions
=================================

dhtmlxScheduler includes a number of extensions which add extra functionality to the standard behavior. 

To use an extension, you should include the extension code file on the page. Extensions code files reside in the **ext** folder of the scheduler's codebase.

Active Links
-------------------------------------------
Presents the numbers of days in the Month and Week views as clickable links that open the related day in the specified view.

~~~html
<script src="../codebase/ext/dhtmlxscheduler_active_links.js"></script>
~~~

####Related resources

Article: <a href="month_view.md#presentingdaysnumbersasclickablelinks">Month view</a><br>
API: api/scheduler_active_link_view_config.md <br>

{{sample 03_extensions/06_links_plugin.html}}


Agenda View
--------------------------------------

The Agenda view code file.

~~~html
<script src="../codebase/ext/dhtmlxscheduler_agenda_view.js"></script>
~~~

####Related resources

Article: agenda_view.md <br>

{{sample 03_extensions/03_agenda_view.html}}


All Timed
---------------------------------------
Shows multi-day events in the regular way (as one-day events are displayed).

~~~html
<script src="../codebase/ext/dhtmlxscheduler_all_timed.js"></script>
~~~

####Related resources

API: api/scheduler_all_timed_config.md <br>

{{sample 03_extensions/26_multi_day_visible.html}}



Collision
---------------------------------------------
Manages the number of events in a time slot.

~~~html
<script src="../codebase/ext/dhtmlxscheduler_collision.js"></script>
~~~


####Related resources

Article: collisions.md <br>

{{sample 03_extensions/15_collision.html}}



Container Autoresize
---------------------------------------------
Enables autoresizing for the scheduler container (size is changed to fit the content).

~~~html
<script src="../codebase/ext/dhtmlxscheduler_container_autoresize.js"></script>
~~~


####Related resources

API: api/scheduler_container_autoresize_config.md <br>

{{sample 03_extensions/28_container_autoresize.html}}


Content Security Policy
----------------------

Allows working with dhtmlxScheduler in case Content Security Policy (CSP) is enabled in the application.

~~~html
<script src="../codebase/ext/dhtmlxscheduler_csp.js"></script>
~~~

####Related resources

Article: content_security_policy.md


Cookie
---------------------------------------------
Saves the scheduler current state (mode and date ) in cookies.

~~~html
<script src="../codebase/ext/dhtmlxscheduler_cookie.js"></script>
~~~


####Related resources

{{sample 03_extensions/08_cookies_plugin.html}}


Daytimeline
---------------------------------------------

{{note This extension is available in PRO version only}}

A code file for the "Days" mode of the Timeline view.

~~~html
<script src="../codebase/ext/dhtmlxscheduler_daytimeline.js"></script>
~~~


####Related resources

Article:  timeline_view.md

{{sample 06_timeline/14_days_as_sections.html}}


Drag-n-Drop between Schedulers
----------------------------

{{note This extension is available in PRO version only}}

Enables drag-and-drop operations between multiple schedulers, which makes it possible to drag events from one scheduler to another and vice versa.

~~~html
<script src="../codebase/ext/dhtmlxscheduler_drag_between.js"></script> 
~~~

####Related resources

Article: [Drag-and-drop between Schedulers](dhtmlx_components_integration.md#draganddropbetweenschedulers)


Editors
---------------------------------------------
A code file for the <a href="lightbox_editors.md#radio">radio</a>, <a href="lightbox_editors.md#combo">combo</a>, 
<a href="lightbox_editors.md#checkbox">checkbox</a> controls of the lightbox.

~~~html
<script src="../codebase/ext/dhtmlxscheduler_editors.js"></script>
~~~


####Related resources

Article: lightbox_editors.md <br>

{{sample 02_customization/14_radio_buttons_section.html}}



Expand
---------------------------------------------
Adds the "expand" icon to the right corner of the scheduler. A click on this icon changes 
the scheduler's size from original to 'full screen' and vice versa.

~~~html
<script src="../codebase/ext/dhtmlxscheduler_expand.js"></script>
~~~


####Related resources

API: api/scheduler_expand.md, api/scheduler_collapse.md <br>
Events: api/scheduler_onbeforeexpand_event.md, api/scheduler_onbeforecollapse_event.md, api/scheduler_onexpand_event.md, api/scheduler_oncollapse_event.md
 
{{sample 03_extensions/05_expand_plugin.html}}


Grid View
---------------------------------------------
{{note This extension is available in PRO version only}}

The Grid view code file.

~~~html
<script src="../codebase/ext/dhtmlxscheduler_grid_view.js"></script>
~~~


####Related resources

Article: grid_view.md<br>

{{sample 03_extensions/27_grid_view.html}}


HTML Templates
---------------------------------------------
Allows defining templates as an HTML code.

~~~html
<script src="../codebase/ext/dhtmlxscheduler_html_templates.js"></script>
~~~

####Related resources

Article: <a href="templates.md#specifyingtemplatesasanhtmlcode">Templates</a><br>

{{sample 03_extensions/09_html_templates_plugin.html}}



Keyboard Navigation
---------------------------------------------

Enables the keyboard navigation.

~~~html
<script src="../../codebase/ext/dhtmlxscheduler_key_nav.js"></script>
~~~

####Related resources

Article: keyboard_navigation.md<br>

{{sample 13_accessibility/01_regular_skin_all_views.html}}<br><br>
{{sample 03_extensions/07_navigation_plugin.html}}


Limit
---------------------------------------------
Provides functionality for blocking and highlighting dates.

~~~html
<script src="../codebase/ext/dhtmlxscheduler_limit.js"></script>
~~~

####Related resources

Article: limits.md<br>

{{sample 03_extensions/16_limitation.html}}


Map View
---------------------------------------------

The Map view code file.

~~~html
<script src="../codebase/ext/dhtmlxscheduler_map_view.js"></script>
~~~

####Related resources

Article: map_view.md<br>

{{sample 03_extensions/19_map_view.html}}


Mini Calendar
---------------------------------------------
A code file for the mini calendar.

~~~html
<script src="../codebase/ext/dhtmlxscheduler_minical.js"></script>
~~~

####Related resources

Article:  minicalendar.md<br>

{{sample 05_calendar/01_select.html}}

Multisection 
----------------

{{note This extension is available in PRO version only}}

Gives the possibility to assign events to several sections in Timeline view or several units in the Units view.

~~~html
<script src="codebase/ext/dhtmlxscheduler_multisection.js"></script> 
~~~

####Related resources

Article: timeline_view.md#assigningeventstoseveralsections, units_view.md#assigningeventstoseveralunits<br>
API: api/scheduler_multisection_config.md

{{sample 12_multisection_events/01_multisection_events.html}}

Multiselect
---------------------------------------------
A code file for the <a href="lightbox_editors.md#multiselect">multiselect</a> control of the lightbox.

~~~html
<script src="../codebase/ext/dhtmlxscheduler_multiselect.js"></script>
~~~

####Related resources

Article:  lightbox_editors.md<br>

{{sample 03_extensions/21_multiselect_options.html}}


Multisource
---------------------------------------------
Provides functionality for loading data from multiple sources.

~~~html
<script src="../codebase/ext/dhtmlxscheduler_multisource.js"></script>
~~~

####Related resources

Article: loading_data.md#loadingdatafrommultiplesources<br>

{{sample 03_extensions/13_multisource.html}}


MVC
---------------------------------------------
Provides functionality for Backbone integration.

~~~html
<script src="../codebase/ext/dhtmlxscheduler_mvc.js"></script>
~~~

####Related resources

Article:   backbone_integration.md<br>

{{sample 10_integration/07_backbone.html}}


Outerdrag
---------------------------------------------
Allows dragging events from external DHTMLX components, i.e. dhtmlxTree.

~~~html
<script src="../codebase/ext/dhtmlxscheduler_outerdrag.js"></script>
~~~


####Related resources

Article:   dhtmlx_components_integration.md<br>

{{sample 10_integration/02_dhtmlxtree_outer_drag.html}}


PDF
---------------------------------------------
Provides export to a PDF document.

~~~html
<script src="../codebase/ext/dhtmlxscheduler_pdf.js"></script>
~~~


####Related resources

Article:   pdf.md<br>

{{sample 04_export/06_online_export.html}}


Quick Info
---------------------------------------------
Provides a popup with an event details.

~~~html
<script src="../codebase/ext/dhtmlxscheduler_quick_info.js"></script>
~~~


####Related resources

Article:   touch_support.md<br>

{{sample 03_extensions/29_quick_info.html}}


Readonly
---------------------------------------------
Provides the read-only mode for the lightbox and specific events.

~~~html
<script src="../codebase/ext/dhtmlxscheduler_readonly.js"></script>
~~~


####Related resources

Article:   readonly.md<br>

{{sample 03_extensions/12_readonly_form.html}}


Recurring
---------------------------------------------
Provides support for recurring events.

~~~html
<script src="../codebase/ext/dhtmlxscheduler_recurring.js"></script>
~~~


####Related resources

Article:   recurring_events.md<br>

{{sample 03_extensions/01_recurring_events.html}} 


Serialize
---------------------------------------------
Provides support for serializing into ICal, XML, JSON formats.

~~~html
<script src="../codebase/ext/dhtmlxscheduler_serialize.js"></script>
~~~


####Related resources

Article:   export.md<br>
 
{{sample 04_export/01_serialize_xml.html}}


Timeline
---------------------------------------------
{{note This extension is available in PRO version only}}

The Timeline view code file.

~~~html
<script src="../codebase/ext/dhtmlxscheduler_timeline.js"></script>
~~~


####Related resources

Article:  timeline_view.md<br>

{{sample 06_timeline/02_lines.html}}


Tooltip
---------------------------------------------
Enables tooltips for events.

~~~html
<script src="../codebase/ext/dhtmlxscheduler_tooltip.js"></script>
~~~


####Related resources

Article:  tooltips.md<br>

{{sample 03_extensions/20_tooltip.html}}


Treetimeline
---------------------------------------------
{{note This extension is available in PRO version only}}

A code file for the "Tree" mode of the Timeline view.

~~~html
<script src="../codebase/ext/dhtmlxscheduler_treetimeline.js"></script>
~~~


####Related resources

Article:  timeline_view.md<br>

{{sample 06_timeline/03_tree.html}}


Units
---------------------------------------------
{{note This extension is available in PRO version only}}

The Units view code file.

~~~html
<script src="../codebase/ext/dhtmlxscheduler_units.js"></script>
~~~


####Related resources

Article: units_view.md<br>

{{sample 03_extensions/02_units_view.html}}


URL
---------------------------------------------
Saves the scheduler's state (date, event's id, view) in URL.<br>For example, <code> 10_url_date_plugin.html#date=2014-08-01,mode=month</code> or <code>10_url_date_plugin.html#event=15</code>

~~~html
<script src="../codebase/ext/dhtmlxscheduler_url.js"></script>
~~~


####Related resources

{{sample 03_extensions/10_url_date_plugin.html}}



Week Agenda
---------------------------------------------

{{note This extension is available in PRO version only}}

The Week Agenda view code file.

~~~html
<script src="../codebase/ext/dhtmlxscheduler_week_agenda.js"></script>
~~~


####Related resources

Article: weekagenda_view.md<br>

{{sample 03_extensions/24_week_agenda.html}}



Year
---------------------------------------------
The Year view code file.

~~~html
<script src="../codebase/ext/dhtmlxscheduler_year.js"></script>
~~~


####Related resources

Article: year_view.md<br>

{{sample 03_extensions/04_year_view.html}}
