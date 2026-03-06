---
title: "Custom Event's Content"
sidebar_label: "Custom Event's Content"
---

# Custom Event's Content

To customize the event's content and specify the data to display, you should use templates. 
Various views use various templates and to find out which templates some view uses, see the article - [Formatting Labels, Dates, Styles](guides/templates.md).

In this article we will consider, how to alter templates for most popular views - [Day View](views/day.md) and [Week View](views/week.md).

These views use 2 templates to customize the events' text:

- [event_header](api/template/event_header.md) - specifies the event's header
- [event_text](api/template/event_text.md) - specifies the event's text

There's also the [event_bar_text](api/template/event_bar_text.md) template that specifies the event's text of multi-day events. 
It is used by the [Month View](views/month.md) and [Timeline View](views/timeline.md).

:::note
We strongly encourage you to redefine templates within a handler function of the [onTemplatesReady](api/event/ontemplatesready.md) event, 
as it ensures that your template won't be rewritten with the default one.
:::

## Customizing the event's header

The event's header is specified by the [event_header](api/template/event_header.md) template.

~~~js
//default definition
scheduler.templates.event_header = function(start,end,ev){
    return scheduler.templates.event_date(start)+" - "+
    scheduler.templates.event_date(end);
};
~~~

*Let's assume that your data objects have a special boolean property **important** that indicates, whether the related event is important. 
You want to highlight the headers of important events by adding the icon - a red check - 
and coloring the event's duration into orange color.*


![custom_event_header](/img/custom_event_header.png)

Then, here is the code you should use:

~~~js
scheduler.attachEvent("onTemplatesReady", function(){
    scheduler.templates.event_header = function(start,end,ev){
        if (event.important == true){
            return ("<img src='red_check.png'/> <b style='color:#F08080'>"+
                scheduler.templates.event_date(start)+" - "+
        } else {
            return(scheduler.templates.event_date(start)+" - "+
            scheduler.templates.event_date(end))
        }
    };
}); 
...
scheduler.init('scheduler_here', new Date(2019, 6, 5), "week");
~~~


## Customizing the event's text

The event text is specified by the [event_text](api/template/event_text.md) template.

~~~js
//default definition
scheduler.templates.event_text = function(start,end,ev){
    return ev.text;
};
~~~

*Let's assume that your data objects have an additional property **location** that indicates the place that the event takes place in. You want to display the location together with the text in the event box.*


![custom_event_text](/img/custom_event_text.png)

Then, here is the code you should use:

~~~js
scheduler.attachEvent("onTemplatesReady", function(){
    scheduler.templates.event_text="function(start,end,event){"
        return "<b>" + event.text + "</b>

<i>" + event.location + "</i>";
    }
}); 
...
scheduler.init('scheduler_here', new Date(2019, 6, 5), "week");
~~~
