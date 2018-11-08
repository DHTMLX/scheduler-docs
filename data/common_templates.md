Common Templates 
==============

In this article you will find descriptions of templates which are common for all views.
To get full information about a template, follow the corresponding link.

##Events

You can customize the event's text and color with the help of templates. The details are given in the articles:

- custom_events_content.md
- custom_events_color.md#attachingadditionalcssclassestoanevent


##Lightbox


<img src="api/lightbox_templates.png"/>

- api/scheduler_time_picker_template.md - the drop-down time selector in the lightbox

	~~~js
	scheduler.templates.time_picker = 
    scheduler.date.date_to_str(scheduler.config.hour_date);
	~~~

- api/scheduler_lightbox_header_template.md - the lightbox header

	~~~js
	scheduler.templates.lightbox_header = function(start,end,ev){
    	return scheduler.templates.event_header(ev.start_date,ev.end_date,ev) 
    	+ scheduler.templates.event_bar_text(ev.start_date,ev.end_date,ev);
	};
	~~~

	where:

	**start**	- (Date) the date when an event is scheduled to begin<br>
	**end** - (Date) the date when an event is scheduled to be completed<br>
	**event** - (object) the event object

- api/scheduler_event_date_template.md - specifies the time part of the start and end dates of the event. Mostly used by other templates for presenting time periods

	~~~js
	scheduler.templates.event_date = function(date){
    	var formatFunc = scheduler.date.date_to_str(scheduler.config.hour_date);
    	return formatFunc(date);
	}
	~~~

	where:

	**date** -	(Date) the date which needs formatting



Touch support
----------------------------------------------

The library has a 'quick info' extension to provide [the touch support in the scheduler](touch_support.md).<br> The extension supplies 3 templates: 

<img src="api/touch_templates.png"/>

- api/scheduler_quick_info_content_template.md - the content of the pop-up edit form

	~~~js
	scheduler.templates.quick_info_content = function(start, end, ev){ 
		return ev.details || ev.text;
	};
	~~~

- api/scheduler_quick_info_date_template.md - the date of the pop-up edit form

	~~~js
	scheduler.templates.quick_info_date = function(start, end, ev){
    	if (scheduler.isOneDayEvent(ev)){
        	return scheduler.templates.day_date(start, end, ev) + " " +
            	scheduler.templates.event_header(start, end, ev);
    	}else{
        	return scheduler.templates.week_date(start, end, ev);
    	}
	};
	~~~

- api/scheduler_quick_info_title_template.md - the title of the pop-up edit form

	~~~js
	scheduler.templates.quick_info_title = function(start, end, ev){ 
       	return ev.text.substr(0,50); 
	};
	~~~

	Parameters for touch support templates:

	**start** - (Date) the date when an event is scheduled to begin <br>
	**end**	- (Date) the date when an event is scheduled to be completed <br>
	**event** -	(object) the event object 


Tooltips
------------------------------------

You have the possibility to create tooltips over events, regardless of the type of a view. 
This can be used to display additional event information, without the need of 'opening' the event.

To take the possibility, include the tooltip extension file (**ext/dhtmlxScheduler_tooltip.js**) on the page. 

<img src="api/tooltip_templates.png"/>

- api/scheduler_tooltip_date_format_template.md - the format of start and end dates used by the api/scheduler_tooltip_text_template.md template

	~~~js
	scheduler.templates.tooltip_date_format=function (date){
    	var formatFunc = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
    	return formatFunc(date);
	}
	~~~

	where:

	**date** -	(Date) the date which needs formatting

- api/scheduler_tooltip_text_template.md - the text of tooltips

	~~~js
	scheduler.templates.tooltip_text = function(start,end,ev){
    	return "<b>Event:</b> "+ev.text+"<br/><b>Start date:</b> " + 
    	scheduler.templates.tooltip_date_format(start)+ 
    	"<br/><b>End date:</b> "+scheduler.templates.tooltip_date_format(end);
	};
	~~~

	where:

	**start** - (Date) the date when an event is scheduled to begin <br>
	**end**	- (Date) the date when an event is scheduled to be completed <br>
	**event** -	(object) the event object 



API templates
------------------------------------

- api/scheduler_api_date_template.md - the format for dates that are set by means of API methods. Used to parse incoming dates 

	~~~js
	scheduler.templates.api_date = function(date){
    	return scheduler.date.str_to_date(scheduler.config.api_date);
	};
	~~~

- api/scheduler_load_format_template.md - the format of requests in the dynamic loading mode  

	~~~js
	scheduler.templates.load_format = function(date){
    	var dateToStr_func = scheduler.date.date_to_str(scheduler.config.load_date);
    	return  dateToStr_func(date);
	}
	~~~

- api/scheduler_xml_date_template.md - a string from an XML file is converted into a date object in conformity with this template

	~~~js
	var cfg = scheduler.config;
	var str_to_date = scheduler.date.str_to_date(cfg.xml_date, cfg.server_utc);
 
	scheduler.templates.xml_date = function(date){
    	return str_to_date(date);
	};
	~~~

- api/scheduler_xml_format_template.md - a date object is converted into a string, in conformity with this template. Used to send data back to the server

	~~~js
	var cfg = scheduler.config;
	var date_to_str = scheduler.date.str_to_date(cfg.xml_date, cfg.server_utc);
 
	scheduler.templates.xml_format = function(date){
    	return date_to_str(date);
	};
	~~~

	Parameter for the listed API templates:

	**date** -	(Date) the date which needs formatting

- **scheduler.templates.{viewName}_date** - specifies the date in the header of the view<br>
	Depending on the view type, the template function takes as parameters either: <br>

	**date** - (Date) the date which needs formatting (for Day, Month, Year, Units views and Mini Calendar):

	~~~js
	scheduler.templates.day_date = function(date){
    	var formatFunc = scheduler.date.date_to_str(scheduler.config.default_date);
    	return formatFunc(date);
	};
	~~~

	or: 

	**start** - (Date) the start date of the view<br>**end** - (Date) the end date of the view<br>
	(for Week, Agenda, Grid, Map and Timeline views):

	~~~js
	scheduler.templates.week_date = function(start, end){
    	return scheduler.templates.day_date(start)+" &ndash; "+
    	scheduler.templates.day_date(scheduler.date.add(end,-1,"day"));
	};
	~~~

- **scheduler.templates.{viewName}_scale_date** - specifies the date of a day cell of the view 
	(the items of the X-Axis for Timeline view, the day name in the week sub-header of the Mini Calendar)

	Used in Day, Week, Year, Timeline views and Mini Calendar 

	~~~js
	scheduler.templates.day_scale_date = function(date){
    	return scheduler.date.date_to_str(scheduler.config.default_date);
	};
	~~~

	where:

	**date** - (Date) the date which needs formatting

