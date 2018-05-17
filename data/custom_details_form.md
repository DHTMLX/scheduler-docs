Fully Custom Lightbox
==============

To specify for the scheduler a fully custom lightbox you need to redefine the api/scheduler_showlightbox.md method:

~~~js
scheduler.showLightbox = function(id){
	// id - id of event
    ... code to show any custom form ...
}
~~~

There are 2 helper methods you can use to simplify implementation:

{{links
- api/scheduler_startlightbox.md - shows a custom lightbox in the specified HTML container centered on the screen.
- api/scheduler_endlightbox.md - closes the lightbox
}}

<br>

Let's assume that you have the **#custom_form** HTML container somewhere on the page. Then, to implement a custom lightbox you can use this: 

~~~js
var custom_form = document.getElementById("custom_form");

scheduler.showLightbox = function(id){
	var ev = scheduler.getEvent(id);
	scheduler.startLightbox(id, custom_form );
	...'here you need to set values in the form'...
    //document.getElementById("some_input").value = ev.text;
}
//needs to be attached to the 'save' button
function save_form() {
	var ev = scheduler.getEvent(scheduler.getState().lightbox_id);
	...'here you need to retrieve values from the form'...
    //ev.text = document.getElementById("some_input").value;
	scheduler.endLightbox(true, custom_form);
}
//needs to be attached to the 'cancel' button
function close_form(argument) {
	scheduler.endLightbox(false, custom_form);
}
~~~

{{sample
	02_customization/16_custom_form.html
}}
