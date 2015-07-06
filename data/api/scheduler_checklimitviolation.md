checkLimitViolation
=============
@short: 
	checks whether the specified event takes place at the blocked time period  

@params: 
- event		object	 the event object

@returns:
isBlocked	boolean		returns <i>true</i>, if the event occurs at the blocked time, otherwise - <i>false</i>.
@example: 
	
var event = {
   text : "New Event",
   start_date : new Date(2013, 02, 20, 10, 00),
   end_date : new Date(2013, 02, 20, 14, 00)
};

var isBlocked = scheduler.checkLimitViolation(event); //returns 'true' or 'false'

@relatedapi:
	api/scheduler_onLimitViolation_event.md
@require:limit
@template:	api_method
@descr: 
Note, the method invokes the api/scheduler_onlimitviolation_event.md event.

