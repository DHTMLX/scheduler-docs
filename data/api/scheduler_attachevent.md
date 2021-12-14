attachEvent
=============

@short: 
	attaches the handler to an inner event of dhtmlxScheduler

@params: 
- name		SchedulerEventName		the event's name, case-insensitive
- handler	function	the handler function
- settings 	object		optional, an <a href="#propertiesofsettingsobject">object with settings</a> for the event handler 

@example: 
scheduler.attachEvent("onEventSave",function(id,ev){
	if (!ev.text) {
		alert("Text must not be empty");
		return false;
	}
	return true;
})


@returns:
	event      string		id	the id of the attached event handler

@template:	api_method
@relatedapi:
	 api/scheduler_detachevent.md
@relatedsample:
	02_customization/08_validation.html
    03_extensions/01_recurring_events.html
@descr: 
You can attach several handlers to the same event and all of them will be executed.<br> If some of handlers will return *false* - the related operation will be blocked.<br>
Event handlers are processed in the same order that they were attached.

All event listeners attached using [event](api/scheduler_event.md) will be detached automatically when the [destructor](api/scheduler_destructor.md) is called.

Properties of settings object 
-----------------------
The settings object can contain two properties:

1\. **id** - (*string*) the id of the event handler 

For example, you can easily detach a handler from the specified event:

~~~js
scheduler.attachEvent("onClick", function(){
	console.log("event click");
}, {id: "my-click"}); /*!*/
... //after a while:
gantt.detachEvent("my-click");
~~~

2\. **once** - (*boolean*) defines whether the event will be executed only once

Set the property to *true* if you want to capture the first triggering of the event, as in:

~~~js
scheduler.attachEvent("onClick", function(){
	console.log("capture next event click");
	return true;
}, {once: true}); /*!*/
~~~