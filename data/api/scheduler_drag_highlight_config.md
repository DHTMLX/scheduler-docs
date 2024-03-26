drag_highlight
=============
@short:highlights the event's initial position and duration on the time scale when you are dragging an event over the scheduler


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

@apigroup: General settings/Scale
    
@changelog:
Highlighting of the event's initial position was added in v7.1

@todo:
	check