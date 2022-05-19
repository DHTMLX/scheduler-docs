checkCollision
=============

@short: 
	checks whether the specified event occurs at the time that has already been occupied by another event(s)

@params: 
- event		object	the event object
@returns:
- result	boolean		returns <i>false</i>, if the event time has already been occupied, otherwise - <i>true</i>.

@example: 
var event = {
   text : "New Event",
   start_date : new Date(2013, 02, 20, 10, 00),
   end_date : new Date(2013, 02, 20, 14, 00)
};

var isOccupied = scheduler.checkCollision(event); // returns 'true' or 'false'



@template:	api_method
@relatedapi:
	api/scheduler_onEventCollision_event.md
@related:
	collisions.md
@descr: 
{{note The method requires the [collision](extensions_list.md#collision) plugin to be activated.}}

Note, the method invokes the api/scheduler_oneventcollision_event.md event.

