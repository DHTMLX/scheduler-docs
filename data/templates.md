Templates Used in Views
==============

Follow the link of a view to see templates supported by it. 



###Default views

{{index
- day_view_templates.md
- month_view_templates.md
- week_view_templates.md
}}

###Extension views

{{index
- agenda_view_templates.md
- grid_view_templates.md
- map_view_templates.md
- timeline_view_templates.md
- weekagenda_view_templates.md
- units_view_templates.md
- year_view_templates.md
}}
###Common for all views
- mini_calendar_templates.md
- <a href="common_templates.md#lightbox">Lightbox</a>
- <a href="common_templates.md#tooltips">Tooltips</a>
- <a href="common_templates.md#touch_support">Touch support</a>
- <a href="common_templates.md#api_templates">API templates</a>


Specifying templates as an HTML code
--------------------------------------
The library provides a special extension **ext/dhtmlxscheduler_html_templates.js** that allows defining templates as an HTML code.

Once you include the extension file on the page you may specify templates as in:

~~~js
//with 'ext/dhtmlxscheduler_html_templates.js' you can use
<div class="template:event_text">
	<a href='http://some.com/details.php?for={event.id}'>{event.text}<a>
</div>

//instead of
scheduler.templates.event_text=function(start, end, event){
	return "<a href='http://some.com/details.php?for="+event.id+"'>"
    +event.text+"</a>";
}
~~~


@index:
- mini_calendar_templates.md
- common_templates.md