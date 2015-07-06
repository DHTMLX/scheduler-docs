drag_marker_class
=============
@short: specifies the CSS class that will be applied to the highlighted event's duration on the time scale
	
    
@params:
- start	Date	the date when an event is scheduled to begin   
- end	Date	the date when an event is scheduled to be completed
- ev	object	the event's object




@example:
scheduler.templates.drag_marker_class = function(start, end, event){
	return "";
};

@template:	api_template
@descr:
For example: 

~~~html
.myclass{
	background: green;
}
~~~


~~~js
scheduler.templates.drag_marker_class = function(start, end, event){
	return "myclass";
};
~~~

<img src="highlight_scale.png"/>

@relatedapi:
	api/scheduler_drag_marker_content_template.md