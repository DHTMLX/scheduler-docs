Custom Event's Content
=========================

To customize the event's content and specify the data to display, you should use templates. 
Various views use various templates and to find out which templates some view uses, see the article  - templates.md.

In this article we will consider, how to alter templates for most popular views - day_view.md and week_view.md.

These views use 2 templates to customize the events' text:

- api/scheduler_event_header_template.md - specifies the event's header
- api/scheduler_event_text_template.md - specifies the event's text

{{note
We strongly encourage you to redefine templates within a handler function of the api/scheduler_ontemplatesready_event.md event, 
as it ensures that your template won't be rewritten with the default one.
}}

Customizing the event's header
-----------------------------
The event's header is specified by the api/scheduler_event_header_template.md template.

~~~js
//default definition
scheduler.templates.event_header = function(start,end,ev){
	return scheduler.templates.event_date(start)+" - "+
    scheduler.templates.event_date(end);
};
~~~

*Let's assume that your data objects have a special boolean property **important** that indicates, whether the related event is important. 
You want to hightlight the headers of important events by adding the icon - a red check - 
and coloring the event's duration into orange color.*

<br>

<img src="custom_event_header.png"/>

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
scheduler.init('scheduler_here', new Date(2013, 6, 5), "week");
~~~



Customizing the event's text
-----------------------------
The event text is specified by the api/scheduler_event_text_template.md template.

~~~js
//default definition
scheduler.templates.event_text = function(start,end,ev){
    return ev.text;
};
~~~

*Let's assume that your data objects have an additional property **location** that indicates the place that the event takes place in. You want to display the location together with the text in the event box.*

<br>

<img src="custom_event_text.png"/>

Then, here is the code you should use:

~~~js
scheduler.attachEvent("onTemplatesReady", function(){
	scheduler.templates.event_text=function(start,end,event){
		return "<b>" + event.text + "</b><br><i>" + event.location + "</i>";
	}
}); 
...
scheduler.init('scheduler_here', new Date(2013, 6, 5), "week");
~~~

