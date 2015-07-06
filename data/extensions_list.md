The full list of extensions
=================================
dhtmlxScheduler includes a number of extensions which add extra functionality to the standard behaviour. 

To use an extension, you should include the extension code file on the page. Extensions code files reside in the **ext** folder of the scheduler's codebase.

Active links
-------------------------------------------
Presents the numbers of days in the Month and Week views as clickable links that open the related day in the specified view

~~~js
<script src="../codebase/ext/dhtmlxscheduler_active_links.js"></script>
~~~
####Related resources
Article: <a href="month_view.md#presentingdaysnumbersasclickablelinks">Month view</a><br>
API: api/scheduler_active_link_view_config.md <br>
<div id="exts">Sample: 
{{sample
	03_extensions/06_links_plugin.html
}}

</div>



Agenda view
--------------------------------------
The Agenda view code file.

~~~js
<script src="../codebase/ext/dhtmlxscheduler_agenda_view.js"></script>
~~~

####Related resources

Article: agenda_view.md <br>
<div id="exts">Sample: 
{{sample
	03_extensions/03_agenda_view.html
}}

</div>





All timed
---------------------------------------
Shows multi-day events in the regular way (as one-day events are displayed).

~~~js
<script src="../codebase/ext/dhtmlxscheduler_all_timed.js"></script>
~~~

####Related resources

API: api/scheduler_all_timed_config.md <br>
<div id="exts">Sample: 
{{sample
	03_extensions/26_multi_day_visible.html
}}

</div>




Collision
---------------------------------------------
Manages number of events in a time slot.

~~~js
<script src="../codebase/ext/dhtmlxscheduler_collision.js"></script>
~~~


####Related resources

Article: collisions.md <br>
<div id="exts">Sample: 
{{sample
	03_extensions/15_collision.html
}}


</div>



Container autoresize
---------------------------------------------
Enables autoresizing for the scheduler container (size is changed to fit the content).

~~~js
<script src="../codebase/ext/dhtmlxscheduler_container_autoresize.js"></script>
~~~


####Related resources

API: api/scheduler_container_autoresize_config.md <br>
<div id="exts">Sample: 
{{sample
	03_extensions/28_container_autoresize.html
}}

</div>

Cookie
---------------------------------------------
Saves the scheduler current state (mode and date ) in cookies.

~~~js
<script src="../codebase/ext/dhtmlxscheduler_cookie.js"></script>
~~~


####Related resources

<div id="exts">Sample: 
{{sample
	03_extensions/08_cookies_plugin.html
}}

</div>

Editors
---------------------------------------------
A code file for the <a href="lightbox_editors.md#radio">radio</a>, <a href="lightbox_editors.md#combo">combo</a>, <a href="lightbox_editors.md#checkbox">checkbox</a> controls of the lightbox.

~~~js
<script src="../codebase/ext/dhtmlxscheduler_editors.js"></script>
~~~


####Related resources

Article: lightbox_editors.md <br>
<div id="exts">Sample: 
{{sample
	02_customization/14_radio_buttons_section.html
}}
</div>



Expand
---------------------------------------------
Adds an expand icon to the right corner of the scheduler, clicking on which changes 
the scheduler's size from original to 'full screen' and vice versa.
~~~js
<script src="../codebase/ext/dhtmlxscheduler_expand.js"></script>
~~~


####Related resources

API: api/scheduler_expand.md, api/scheduler_collapse.md <br>
Events: api/scheduler_onbeforeexpand_event.md, api/scheduler_onbeforecollapse_event.md, api/scheduler_onexpand_event.md, api/scheduler_oncollapse_event.md
<div id="exts">Sample: 
{{sample
	03_extensions/05_expand_plugin.html
}}
</div>


Grid view
---------------------------------------------
The Grid view code file.

~~~js
<script src="../codebase/ext/dhtmlxscheduler_grid_view.js"></script>
~~~


####Related resources

Article: grid_view.md<br>
<div id="exts">Sample: 
{{sample
	03_extensions/27_grid_view.html
}}
</div>

Html templates
---------------------------------------------
Allows defining templates as an HTML code.

~~~js
<script src="../codebase/ext/dhtmlxscheduler_html_templates.js"></script>
~~~


####Related resources

Article: <a href="templates.md#specifyingtemplatesasanhtmlcode">Templates</a><br>
<div id="exts">Sample: 
{{sample
	03_extensions/09_html_templates_plugin.html
}}

</div>

Key navigation
---------------------------------------------
Enables the keyboard navigation.

~~~js
<script src="../codebase/ext/dhtmlxscheduler_key_nav.js"></script>
~~~


####Related resources

Article: keyboard_navigation.md<br>
<div id="exts">Sample: 
{{sample
	03_extensions/07_navigation_plugin.html
}}

</div>

Limit
---------------------------------------------
Provides functionality for blocking and highlighting dates.

~~~js
<script src="../codebase/ext/dhtmlxscheduler_limit.js"></script>
~~~


####Related resources

Article: limits.md<br>
<div id="exts">Sample: 
{{sample
	03_extensions/16_limitation.html
}}
</div>

Map view
---------------------------------------------
The Map view code file.

~~~js
<script src="../codebase/ext/dhtmlxscheduler_map_view.js"></script>
~~~


####Related resources

Article:  map_view.md<br>
<div id="exts">Sample: 
{{sample
	03_extensions/19_map_view.html
}}
</div>

Mini calendar
---------------------------------------------
A code file for the mini calendar.

~~~js
<script src="../codebase/ext/dhtmlxscheduler_minical.js"></script>
~~~


####Related resources

Article:  minicalendar.md<br>
<div id="exts">Sample: 
{{sample
	05_calendar/01_select.html
}}

</div>

Multiselect
---------------------------------------------
A code file for the <a href="lightbox_editors.md#multiselect">multiselect</a> control of the lightbox.

~~~js
<script src="../codebase/ext/dhtmlxscheduler_multiselect.js"></script>
~~~


####Related resources

Article:  lightbox_editors.md<br>
<div id="exts">Sample: 
{{sample
	03_extensions/21_multiselect_options.html
}}
</div>


Multisource
---------------------------------------------
Provides functionality for loading data from multiple sources.

~~~js
<script src="../codebase/ext/dhtmlxscheduler_multisource.js"></script>
~~~


####Related resources

Article:   <a href="loading_data.md#loadingdatafrommultiplesources">Loading data</a><br>
<div id="exts">Sample: 
{{sample
	03_extensions/13_multisource.html
}}
</div>


Mvc
---------------------------------------------
Provides functionality for Backbone integration.

~~~js
<script src="../codebase/ext/dhtmlxscheduler_mvc.js"></script>
~~~


####Related resources

Article:   backbone_integration.md<br>
<div id="exts">Sample: 
{{sample
	10_integration/07_backbone.html
}}

</div>

Outerdrag
---------------------------------------------
Allows dragging events from external DHTMLX components, i.e. dhtmlxTree.

~~~js
<script src="../codebase/ext/dhtmlxscheduler_outerdrag.js"></script>
~~~


####Related resources

Article:   dhtmlx_components_integration.md<br>
<div id="exts">Sample: 
{{sample
	10_integration/02_dhtmlxTree_outer_drag.html
}}
</div>

Pdf
---------------------------------------------
Provides export to a pdf document.

~~~js
<script src="../codebase/ext/dhtmlxscheduler_pdf.js"></script>
~~~


####Related resources

Article:   pdf.md<br>
<div id="exts">Sample: 
{{sample
	04_export/06_online_export.html
}}

</div>

Quick Info
---------------------------------------------
Provides the possibility to replace standard sidebar buttons and simplified edit form with new (bigger and handier) ones.

~~~js
<script src="../codebase/ext/dhtmlxscheduler_quick_info.js"></script>
~~~


####Related resources

Article:   touch_support.md, quick_info.md<br>
<div id="exts">Sample: 
{{sample
	03_extensions/29_quick_info.html
}}
</div>


Readonly
---------------------------------------------
Provides the read-only mode for the lightbox and specific events.

~~~js
<script src="../codebase/ext/dhtmlxscheduler_readonly.js"></script>
~~~


####Related resources

Article:   readonly.md<br>
<div id="exts">Sample: 
{{sample
	03_extensions/12_readonly_form.html
}}

</div>


Recurring
---------------------------------------------
Provides support for recurring events.

~~~js
<script src="../codebase/ext/dhtmlxscheduler_recurring.js"></script>
~~~


####Related resources

Article:   recurring_events.md<br>
<div id="exts">Sample: 
{{sample
	03_extensions/01_recurring_events.html
}}
</div>


Serialize
---------------------------------------------
Provides support for serializing into ICal, XML, JSON formats.

~~~js
<script src="../codebase/ext/dhtmlxscheduler_serialize.js"></script>
~~~


####Related resources

Article:   export.md<br>
<div id="exts">Sample: 
{{sample
	04_export/01_serialize_xml.html
}}
</div>



Timeline
---------------------------------------------
The Timeline view code file.

~~~js
<script src="../codebase/ext/dhtmlxscheduler_timeline.js"></script>
~~~


####Related resources

Article:  timeline_view.md<br>
<div id="exts">Sample: 
{{sample
	06_timeline/02_lines.html
}}
</div>


Tooltip
---------------------------------------------
Enables tooltips for events.

~~~js
<script src="../codebase/ext/dhtmlxscheduler_tooltip.js"></script>
~~~


####Related resources

Article:  tooltips.md<br>
<div id="exts">Sample: 
{{sample
	03_extensions/20_tooltip.html
}}
</div>

Treetimeline
---------------------------------------------
A code file for the Tree mode of the Timeline view.

~~~js
<script src="../codebase/ext/dhtmlxscheduler_treetimeline.js"></script>
~~~


####Related resources

Article:  <a href="timeline_view.md#treemodehierarchicaldatastructure"> Timeline view. Tree mode</a><br>
<div id="exts">Sample: 
{{sample
	06_timeline/03_tree.html
}}

</div>


Units
---------------------------------------------
The Units view code file.

~~~js
<script src="../codebase/ext/dhtmlxscheduler_tooltip.js"></script>
~~~


####Related resources

Article: units_view.md<br>
<div id="exts">Sample: 
{{sample
	03_extensions/02_units_view.html
}}
</div>



Url
---------------------------------------------
Saves the scheduler's state (date, event's id, view) in URL.<br>For example, <code> 10_url_date_plugin.html#date=2014-08-01,mode=month</code> or <code>10_url_date_plugin.html#event=15</code>

~~~js
<script src="../codebase/ext/dhtmlxscheduler_url.js"></script>
~~~


####Related resources

<div id="exts">Sample: 
{{sample
	03_extensions/10_url_date_plugin.html
}}
</div>


Week Agenda
---------------------------------------------
The Week Agenda view code file.

~~~js
<script src="../codebase/ext/dhtmlxscheduler_week_agenda.js"></script>
~~~


####Related resources

Article: weekagenda_view.md<br>
<div id="exts">Sample: 
{{sample
	03_extensions/24_week_agenda.html
}}
</div>


Year
---------------------------------------------
The Year view code file.

~~~js
<script src="../codebase/ext/dhtmlxscheduler_year.js"></script>
~~~


####Related resources

Article: year_view.md<br>
<div id="exts">Sample: 
{{sample
	03_extensions/04_year_view.html
}}
</div>


<style>
.webixdoc_content #exts .webixdoc_sample {
	display:none;
}
</style>
