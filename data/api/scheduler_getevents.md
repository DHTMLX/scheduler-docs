getEvents
=============
@short: 
	returns a collection of events which occur during the specified period 

@params: 
* from	Date	 the start date of the period
* to	Date	 the end date of the period

@returns:
- array	array	an array of event objects

@example: 
	
var evs = scheduler.getEvents(new Date(2013,1,10),new Date(2013,2,10)); 
for (var i=0; i<evs.length; i++){
       alert(evs[i].text);
}
// or
var evs = scheduler.getEvents();// will return all events 



@template:	api_method
@relatedsample:
	03_extensions/01_recurring_events.html
    09_api/07_highlighted_timespans_month_view.html
@descr: 
If you don't specify any parameters,  the method will return all events 





