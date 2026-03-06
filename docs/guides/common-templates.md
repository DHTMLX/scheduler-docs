---
title: "Common Templates"
sidebar_label: "Common Templates"
---

# Common Templates 

In this article you will find descriptions of templates which are common for all views.
To get full information about a template, follow the corresponding link.

## Events

You can customize the event's text and color with the help of templates. The details are given in the articles:

- [Custom Event's Content](guides/custom-events-content.md)
- [Custom Event's Color](guides/custom-events-color.md#attaching-additional-css-classes-to-an-event)


## Lightbox

![lightbox_templates](/img/lightbox_templates.png)

- [time_picker](api/template/time_picker.md) - the drop-down time selector in the lightbox

  ~~~js
  scheduler.templates.time_picker = 
  scheduler.date.date_to_str(scheduler.config.hour_date);
  ~~~

- [lightbox_header](api/template/lightbox_header.md) - the lightbox header

  ~~~js
  scheduler.templates.lightbox_header = function(start,end,ev){
    return scheduler.templates.event_header(ev.start_date,ev.end_date,ev) 
          + scheduler.templates.event_bar_text(ev.start_date,ev.end_date,ev);
  };
  ~~~

  where:

    **start**    - (Date) the date when an event is scheduled to begin


    **end** - (Date) the date when an event is scheduled to be completed


    **event** - (object) the event object

- [event_date](api/template/event_date.md) - specifies the time part of the start and end dates of the event. Mostly used by other templates for presenting time periods

  ~~~js
  scheduler.templates.event_date = function(date){
    const formatFunc = scheduler.date.date_to_str(scheduler.config.hour_date);
    return formatFunc(date);
  }
  ~~~

  where:

    **date** -    (Date) the date which needs formatting


## Touch support

The library has a 'quick info' extension to provide [the touch support in the scheduler](guides/touch-support.md).

 The extension supplies 3 templates: 

![touch_templates](/img/touch_templates.png)

- [quick_info_content](api/template/quick_info_content.md) - the content of the pop-up edit form

  ~~~js
  scheduler.templates.quick_info_content = function(start, end, ev){ 
    return ev.details || ev.text;
  };
  ~~~

- [quick_info_date](api/template/quick_info_date.md) - the date of the pop-up edit form

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

- [quick_info_title](api/template/quick_info_title.md) - the title of the pop-up edit form

  ~~~js
  scheduler.templates.quick_info_title = function(start, end, ev){ 
    return ev.text.substr(0,50); 
  };
  ~~~

  Parameters for touch support templates:

    **start** - (Date) the date when an event is scheduled to begin 


    **end**    - (Date) the date when an event is scheduled to be completed 


    **event** -    (object) the event object 


## Tooltips

You have the possibility to create tooltips over events, regardless of the type of a view. 
This can be used to display additional event information, without the need of 'opening' the event.

To take the possibility, include the Tooltip extension on the page.

~~~js
scheduler.plugins({
  tooltip: true
});
~~~

![tooltip_templates](/img/tooltip_templates.png)

- [tooltip_date_format](api/template/tooltip_date_format.md) - the format of start and end dates used by the [tooltip_text](api/template/tooltip_text.md) template

  ~~~js
  scheduler.templates.tooltip_date_format="function" (date){
    const formatFunc = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
    return formatFunc(date);
  }
  ~~~

  where:

    **date** -    (Date) the date which needs formatting

- [tooltip_text](api/template/tooltip_text.md) - the text of tooltips

  ~~~js
  scheduler.templates.tooltip_text = function(start,end,ev){
    return "<b>Event:</b> "+ev.text+"
            <b>Start date:</b> " + scheduler.templates.tooltip_date_format(start)+ "
            <b>End date:</b> "+scheduler.templates.tooltip_date_format(end)"
  };
  ~~~

  where:

    **start** - (Date) the date when an event is scheduled to begin 


    **end**    - (Date) the date when an event is scheduled to be completed 


    **event** -    (object) the event object 


## API templates

- [api_date](api/template/api_date.md) - the format for dates that are set by means of API methods. Used to parse incoming dates 

  ~~~js
  scheduler.templates.api_date = function(date){
    return scheduler.date.str_to_date(scheduler.config.api_date);
  };
  ~~~

- [load_format](api/template/load_format.md) - the format of requests in the dynamic loading mode  

  ~~~js
  scheduler.templates.load_format = function(date){
    const dateToStr_func = scheduler.date.date_to_str(scheduler.config.load_date);
    return dateToStr_func(date);
  }
  ~~~

- [parse_date](api/template/parse_date.md) - a string from an XML file is converted into a date object in conformity with this template

  ~~~js
  const cfg = scheduler.config;
  const strToDate = scheduler.date.str_to_date(cfg.date_format, cfg.server_utc);
 
  scheduler.templates.parse_date = function(date){
    return strToDate (date);
  };
  ~~~

- [format_date](api/template/format_date.md) - a date object is converted into a string, in conformity with this template. Used to send data back to the server

  ~~~js
  const dateToStr = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
  scheduler.templates.format_date = function(date){
    return dateToStr (date);
  };
  ~~~

  Parameter for the listed API templates:

    **date** -    (Date) the date which needs formatting

- **scheduler.templates.(viewName)_date** - specifies the date in the header of the view


  Depending on the view type, the template function takes as parameters either: 


    **date** - (Date) the date which needs formatting (for Day, Month, Year, Units views and Mini Calendar):

  ~~~js
  scheduler.templates.day_date = function(date){
    const formatFunc = scheduler.date.date_to_str(scheduler.config.default_date);
    return formatFunc(date);
  };
  ~~~

  or: 

    **start** - (Date) the start date of the view

    **end** - (Date) the end date of the view


  (for Week, Agenda, Grid, Map and Timeline views):

  ~~~js
  scheduler.templates.week_date = function(start, end){
    return scheduler.templates.day_date(start)+" &ndash; "+
            scheduler.templates.day_date(scheduler.date.add(end,-1,"day"));
  };
  ~~~

- **scheduler.templates.(viewName)_scale_date** - specifies the date of a day cell of the view 
  (the items of the X-Axis for Timeline view, the day name in the week sub-header of the Mini Calendar)

  Used in Day, Week, Year, Timeline views and Mini Calendar 

  ~~~js
  scheduler.templates.day_scale_date = function(date){
    return scheduler.date.date_to_str(scheduler.config.default_date);
  };
  ~~~

  where:

    **date** - (Date) the date which needs formatting
