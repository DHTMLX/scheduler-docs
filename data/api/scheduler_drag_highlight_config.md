drag_highlight
=============
@short:highlights the event's duration on the time scale when you drags an event over the scheduler

	

@type: boolean	
@default:true
@example:
//removes the highlighting
scheduler.config.drag_highlight = false; /*!*/

scheduler.init('scheduler_here',new Date(2010,0,10),"week");
scheduler.load("./data/events.xml");


@template:	api_config
@descr:
<img src="api/draghighlight_config.png"/>

@relatedapi:
	api/scheduler_highlighteventposition.md
    api/scheduler_drag_marker_class_template.md