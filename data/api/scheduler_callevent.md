callEvent
=============
@short:calls an inner event
	

@params:
- name		string		the event's name, case-insensitive
- params	array		an array of the event-related data

@returns:
  - result	boolean     <i>false</i>, if some of the event handlers returns <i>false</i>. Otherwise, <i>true</i>


@example:
scheduler.attachEvent("CustomEvent", function(param1, param2){
	return true;
});

var res = scheduler.callEvent("CustomEvent", [param1, param2]);


@template:	api_method
@descr:
Normally, events are called automatically and you don't need to use this method.



@relatedapi:
	api/scheduler_attachevent.md