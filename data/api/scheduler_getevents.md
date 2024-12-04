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
	
const evs = scheduler.getEvents(new Date(2024,1,10),new Date(2024,2,10)); 
evs.forEach((e) => console.log(e.text));
// or
const evs = scheduler.getEvents();// will return all events 

@template:	api_method
@relatedsample:
	03_extensions/01_recurring_events.html
    09_api/07_highlighted_timespans_month_view.html
@descr: 
 
If support for [recurring events](recurring_events.md) is activated, the behavior of the **getEvents** method depends on whether "from-to" parameters are specified. 

#### Using getEvents with Recurring Events

- If **from-to** parameters are provided, the method will return all single events, occurrences of recurring series, and their modified instances within the specified range:
~~~js
const today = scheduler.date.day_start(new Date());
const nextWeek = scheduler.date.add(today, 1, "week");
const events = scheduler.getEvents(today, nextWeek);
~~~

- If **from-to** parameters are not provided, the method will return all single events, recurring series (as entries, not individual occurrences), and their modified/deleted instances. However, the individual dates of occurrences for the recurring events will not be included.

{{note In versions earlier than v7.1.2, the **getEvents** method required "from-to" parameters when recurring events were enabled. Without these parameters, the method would return an empty array, as the recurring extension allowed endless sequences of events, making it impractical for the method to return an endless array. }}

If recurring events are disabled, the method will work correctly as with parameters as without them. But in case you don't specify any parameters,  the method will return all events.

@changelog: updated in v7.1.2





