renderEvent
=============
@short: generates HTML content for a custom event's box

@params: 
- container		HTMLElement		the event container
- event		object	the event object

@returns:
- display	boolean 	<ul><li><b>true</b> - the scheduler displays a custom form</li><li><b>false</b> -  the scheduler displays the default form</li></ul>

@example: 
	
scheduler.renderEvent = function(container, ev) {
	var container_width = container.style.width;
	var html = "<div class='dhx_event_move my_event_move' style='width:" +
    + container_width + "'></div>";
	...
	container.innerHTML = html;
	return true; 
}

@template:	api_method
@related:
	custom_events_display.md
@relatedsample:
	02_customization/27_custom_event_box.html
@descr: 
Note, the method works only for views with the vertical scale, such as Day view, Week view etc.

