Custom Event's Box 
==============

dhtmlxScheduler provides the possibility to define custom display for events.

{{note
Applicable to the day_view.md and week_view.md only
}}

##Technique

Events customizing is achieved with the help of the api/scheduler_renderevent.md method:

~~~js
scheduler.renderEvent = function(container, ev) {
	// your customizing code
}
~~~

- **_container_** - the event's container
- **_ev_** - the event object

{{sample
	02_customization/27_custom_event_box.html
}}

##Important tips


- Returning _true_ applies the custom logic, returning _false_ applies the default logic.
- Some styles have special purpose (they must go first):
  - **_dhx_event_move_** - an element with this style can be dragged (usually, it's the event header). 
  - **_dhx_event_resize_** - dragging an element with this style will change the event's duration.


##Example

Here is an example of some custom look:

<img src="custom_event_box.png">

{{snippet
Specifying a custom look for the event's box
}}
~~~js
scheduler.renderEvent = function(container, ev) {
	var container_width = container.style.width; // e.g. "105px"

	// move section
	var html = "<div class='dhx_event_move my_event_move' style='width: " + 
    container_width + "'></div>";

	// container for event's content
	html+= "<div class='my_event_body'>";
	html += "<span class='event_date'>";
	//two options here:show only start date for short events or start+end for long
	if ((ev.end_date - ev.start_date)/60000>40){//if event is longer than 40 minutes
		html += scheduler.templates.event_header(ev.start_date, ev.end_date, ev);
		html += "</span><br/>";
	} else {
		html += scheduler.templates.event_date(ev.start_date) + "</span>";
	}
	// displaying event's text
	html += "<span>" + scheduler.templates.event_text(ev.start_date,ev.end_date,ev)+
    "</span>" + "</div>";

	// resize section
	html += "<div class='dhx_event_resize my_event_resize' style='width: " +
    container_width + "'></div>";

	container.innerHTML = html;
	return true; //required, true - display a custom form, false - the default form
};
~~~

{{sample
	02_customization/27_custom_event_box.html
}}