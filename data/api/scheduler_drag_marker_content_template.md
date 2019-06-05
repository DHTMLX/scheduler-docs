drag_marker_content
=============
@short: specifies the content of the highlighted block  on the time scale
	
    
@params:
- start	Date	the date when an event is scheduled to begin   
- end	Date	the date when an event is scheduled to be completed
- ev	object	the event's object




@example:
scheduler.templates.drag_marker_content = function(start, end, event){
	return "";
};

@template:	api_template
@descr:
For example: 


~~~js
scheduler.templates.drag_marker_content = function(start, end, event){
	return "<b>my text</b>";
};
~~~

<img src="scale_content.png"/>

@relatedapi:
	api/scheduler_drag_marker_class_template.md
    
