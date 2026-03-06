---
title: "Common Config Instructions"
sidebar_label: "Common Config Instructions"
---

# Common Config Instructions

To achieve the desired look for the scheduler, the library provides 3 objects: 

- [scheduler.config](api/api_overview.md#scheduler-properties) configuration options for dates, scale, controls etc.
- [scheduler.templates](api/api_overview.md#scheduler-templates) - formatting templates for dates and titles used in the scheduler, tooltips and styling.
- [scheduler.xy](api/other/xy.md) - options that set sizes of scheduler's elements

Besides, dhtmlxScheduler [contains a number of extensions](#extensions) that will help you enable additional functionality in the component.

## scheduler.config

The library provides a big number of configuration options which are declared in the **scheduler.config** object. 

To set the desired option, just write it as it's stated in this documentation (or change *scheduler* to the name of a *dhtmlxScheduler instance* if you 
have [multiple schedulers on the page](guides/multiple-per-page.md)).
  
Beware, configuration options should go before the code line with scheduler initialization. 

~~~js
scheduler.config.first_hour = 8;/*!*/
scheduler.config.last_hour = 17;/*!*/
scheduler.config.start_on_monday = true;/*!*/
scheduler.init('scheduler_here',null,"week");
~~~

See the full list of the **scheduler.config** properties in [Scheduler API: Properties](api/api_overview.md#scheduler-properties).


[Multi-day events](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/06_multi_day_events.html)


## scheduler.templates

Templates can be used to change displaying dates and titles in the scheduler. 

To define a template, just write it as it's stated in this documentation (or change *scheduler* to the name of a *dhtmlxScheduler instance* if you have [multiple schedulers on the page](guides/multiple-per-page.md)).
Remember, definitions of templates should go before the code line with scheduler initialization. 
 
~~~js
scheduler.templates.event_text = function(start,end,ev){/*!*/
   return 'Subject: ' + ev.text + '';/*!*/
};/*!*/
scheduler.init('scheduler_here',null,"week");
~~~

:::note
We strongly encourage you to redefine templates within a handler function of the [onTemplatesReady](api/event/ontemplatesready.md) event, as it ensures that your template won't be rewritten with the default one
:::

![templates.png](/img/templates.png)

See the full list of available templates in the [Scheduler API: Templates](api/api_overview.md#scheduler-templates). 


[Styling events with templates](https://docs.dhtmlx.com/scheduler/samples/02_customization/06_templates.html)


## scheduler.xy

The properties of the [scheduler.xyxy](api/other/xy.md) object will allow you to set widths, heights, shifts of scheduler's elements in different views.

To set the desired option, just write it as it's stated in this documentation (or change *scheduler* to the name of a *dhtmlxScheduler instance* if you 
have [multiple schedulers on the page](guides/multiple-per-page.md)). Beware, size options should go before the code line with scheduler initialization. 

~~~js
scheduler.xy.scale_height = 40; //sets the height of the X-Axis  /*!*/
scheduler.init('scheduler_here',new Date(),"month");
~~~

:::note
Note, all the xy' properties have the data type 'number'.
:::


[Customizing the scheduler header](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/03_header_format.html)


## Extensions

There is a number of extensions that can be enabled on the page to provide special possibilities for the Scheduler component. 
For example, you can activate the **cookie** extension that will allow saving the current state (mode and date) of scheduler in cookies.

~~~js
scheduler.plugins({
    cookie: true
});
~~~
 

[Work with cookies](https://docs.dhtmlx.com/scheduler/samples/03_extensions/08_cookies_plugin.html)


See the list of the Scheduler extensions in the article [Full List of Extensions](guides/extensions-list.md).
