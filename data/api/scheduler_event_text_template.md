event_text
=============

@short:specifies the event's text
	

@example:
scheduler.templates.event_text=function(start, end, event){
    return "<a href='http://some.com/details.php?for="+event.id+"'>"
    +event.text+"</a>";
}


@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler

@descr:
Note that for Month and Timeline Views you need to use the api/scheduler_event_bar_text_template.md template to specify the event's text.


@params:
- start	Date	the date when an event is scheduled to begin   
- end	Date	the date when an event is scheduled to be completed
- event	object	the event object

@relatedsample: 
02_customization/06_templates.html

@views:day, week, units

@related:
	day_view_templates.md
