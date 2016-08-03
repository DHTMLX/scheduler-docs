attachEvent
=============

@short: 
	attaches the handler to an inner event of dhtmlxScheduler

@params: 
- name		SchedulerEventName		the event's name, case-insensitive
- handler	function	the handler function 

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


