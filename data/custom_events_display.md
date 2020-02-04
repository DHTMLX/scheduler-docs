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
- Some CSS classes have special purpose (they must go first in the className of the element):
  - **_dhx_event_move_** - an element with this style can be dragged (usually, it's the event header). 
  - **_dhx_event_resize_** - dragging an element with this style will change the event's duration.

~~~js
var html = "<div class='dhx_event_move my_event_move' "
~~~

##Example

Here is an example of some custom look:

<img src="custom_event_box.png">

{{snippet
Specifying a custom look for the event's box
}}
~~~js
scheduler.templates.event_class = function(start, end, event) {
    return "my_event";
};

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
	return true; //required, true - to display a custom form, false - the default form
};
~~~

and the related CSS is the following:

~~~html
<style type="text/css" >
	html, body {
		margin: 0;
		padding: 0;
	}
	/* the background color for the whole container and its border*/
	.my_event {
		background-color: #add8e6;
        border: 1px solid #778899;
        overflow: hidden;
	}    
	/* disabling the default color for the select menu */
	.dhx_cal_select_menu.my_event div {
		border: 0;
		background-color: transparent;
		color: black;
	}    
	/* styles for the event content */
	.dhx_cal_event.my_event .my_event_body {
		padding-top: 3px;
		padding-left: 5px;
	}	
    /* event's date information */
	.my_event .event_date {			
        font-weight: bold;
		padding-right: 5px;
	}	
    /* event's resizing section */
	.my_event_resize {
		height: 3px;
		position: absolute;
		bottom: -1px;
	}
	/* event's move section */
	.my_event_move {
		position: absolute;
		top: 0;
		height: 10px;
		cursor: pointer;
	}
</style>
~~~


{{sample
	02_customization/27_custom_event_box.html
}}