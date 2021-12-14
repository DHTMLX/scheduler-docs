event
============= 

@short: attaches an event handler to an HTML element

@params:
- node			HTMLElement|string		the HTML node or its id
- event			string					the name of an HTML event (without the 'on' prefix)
- handler		function				the event handler
* master		object					an object that the <i>this</i> keyword refers to

@returns:
- id	string		the event handler id (can be used by the <b>eventRemove()</b> method) 

@example:
// adds a handler for the 'onclick' event
scheduler.event("divId", "click", function(e){
	//e - a native event object
	do_something();
});

@template:	api_method
@descr:

All event listeners attached using **event** will be detached automatically when the [destructor](api/scheduler_destructor.md) is called.

@relatedapi:
api/scheduler_eventremove.md

@changelog:
added in version 4.4
