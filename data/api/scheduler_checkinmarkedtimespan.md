checkInMarkedTimespan
=============

@short:checks whether an event resides in a timespan of a specific type
	
@require:limit,treetimeline
@views: timeline
@returns:
isIn	boolean		<i>true</i>, if the event is in the timespan of the specified type
@params:
- event		object	the event object	
- timespan	string	the timespan's type 




@example:
scheduler.addMarkedTimespan({
	start_date: new Date(2013,4,1), 
    end_date: new Date(2013,7,1), 
    css: "red_section",
    type:"discount"
});

var eventId = scheduler.addEvent({
    start_date: "16-05-2013 09:00",
    end_date:   "16-05-2013 12:00",
    text:   "Meeting",
    holder: "John", 
    room:   "5"     
})
...
scheduler.checkInMarkedTimespan(scheduler.getEvent(eventId), "discount"); //->true    

@template:	api_method
@descr:

