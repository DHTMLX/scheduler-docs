checkEvent
=============

@short:checks whether an event has some handler(s) specified
	

@params:
- name	SchedulerEventName	the event's name

@returns:
isExist	boolean	returns <i>true</i>, if some handler is specified for the event
@example:
scheduler.attachEvent("onEventSave",function(id,data){
	if (data.text.length<20) {
		alert("Text too small");
		return false;
	}
	return true;
})
...        
scheduler.checkEvent("onEventSave"); //returns 'true'

@relatedapi:
	api/scheduler_attachevent.md
@template:	api_method
@descr:

