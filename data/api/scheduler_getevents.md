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
 
If support for [recurring events](recurring_events.md) is activated, the "from-to" parameters are required for the **getEvents** method. 

~~~js
var today = scheduler.date.day_start(new Date());
var nextWeek = scheduler.date.add(today, 1, "week");
var events = scheduler.getEvents(today, nextWeek);
~~~

Otherwise, the getEvents() method will return an empty array because the recurring extension allows setting endless sequences of events while the method can't return an endless array.

If recurring events are disabled, the method will work correctly as with parameters as without them. But in case you don't specify any parameters,  the method will return all events.





