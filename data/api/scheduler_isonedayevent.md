isOneDayEvent
=============

@short:checks whether the specified event one-day or multi-day
	

@params: 
- event	object	the event object


@returns:
- isOneDay	boolean		returns <i>true</i>, if the specified event is one-day. Otherwise, <i>false</i>

@example:
var eventId = scheduler.addEvent({
	start_date: "16-06-2013 09:00",
	end_date:	"16-06-2013 12:00",
	text:	"Meeting"
});
scheduler.isOneDayEvent(scheduler.getEvent(eventId));//->true

@template:	api_method