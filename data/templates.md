Formatting Labels, Dates, Styles
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


Specifying Templates 
--------------------------------------

You can set templates in 2 ways: either from the code or from the HTML markup. 

###Specifying templates with code

By default, templates can be defined as JS functions which take the event object or date arguments and must return an HTML string that will be inserted in the layout:

~~~js
scheduler.templates.event_text=function(start, end, event){
    return "<a href='http://some.com/details.php?for="+event.id+"'>"
    +event.text+"</a>";
}
~~~

###Specifying templates via markup

Alternatively, templates can be defined in the declarative way from HTML. This approach requires adding the [html_templates](extensions_list.md#htmltemplates) extension to the page.
Once you've activate the extension on the page, you may specify templates as in:

~~~html
<div class="template:event_text">
    <a href='http://some.com/details.php?for={event.id}'>{event.text}<a>
</div>
~~~

The complete list of templates can be found [in the API](api/refs/scheduler_templates.md).



@index:
- mini_calendar_templates.md
- common_templates.md