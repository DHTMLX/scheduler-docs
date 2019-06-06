Event Object Operations
==============================

Getting the event object
-----------------------------
To get the event object, use the api/scheduler_getevent.md method:

~~~js
scheduler.parse([
   {id:1, start_date:"2019-05-13 6:00", end_date:"2019-05-13 8:00", text:"Event 1"},
   {id:2, start_date:"2019-06-09 6:00", end_date:"2019-06-09 8:00", text:"Event 2"}
]);
... 
var eventObj = scheduler.getEvent(1);
//->{id:1, start_date:"2019-05-13 6:00", end_date:"2019-05-13 8:00", text:"Event 1"}
~~~

Getting events from the specified time period
------------------------------------------------
To get a collection of events that occur during the specified period, use api/scheduler_getevents.md method:

~~~js
var evs = scheduler.getEvents(new Date(2019,1,10),new Date(2019,2,10)); 
//where evs is an array of events' objects
~~~

Getting all events of the scheduler
-------------------------------------
To get all events loaded to the scheduler, call the api/scheduler_getevents.md method without parameters as in:

~~~js
var evs = scheduler.getEvents();
// returns all events as an array of objects
~~~

Getting the next event starting from the current date
--------------------------

~~~js
var evs = scheduler.getEvents(new Date(), new Date(9999,1,1);	
//evs - list of all oncoming events
evs.sort(function(a,b){ return (a.start_date > b.start_date ? 1 : -1); });
//evs[0] - nearest upcoming event
~~~

Getting the event's id
-----------------------------
To get the event's id by the value of one of the event's properties, use the following technique:

{{snippet
	Getting the event's id by the event's text
}}
~~~js
scheduler.parse([
   {id:1, start_date:"2019-05-13 6:00", end_date:"2019-05-13 8:00", text:"Event 1"},
   {id:2, start_date:"2019-06-09 6:00", end_date:"2019-06-09 8:00", text:"Event 2"}
]);
...

var evs = scheduler.getEvents(); //gets all events of the scheduler
for(var i=0;i<evs.length; i++){  //goes through all events to find the one needed
	if (evs[i].text == "Event 2") 
    	var eventId = evs[i].id;// -> 2
};
~~~

 If you know an approximate time when the needed event occurs, you'd better to limit the returned collection of events, in order to increase the app's speed:

~~~js
var evs = scheduler.getEvents(new Date(2019,05,01),new Date(2019,05,10)); 
for(var i=0;i<evs.length; i++){  
	if (evs[i].text == "Event 2") 
    	var eventId = evs[i].id;// -> 2
};
~~~


Changing the event's id
------------------------------------
To change the current id of an event, you may use the api/scheduler_changeeventid.md method as in:

~~~js
scheduler.changeEventId("ev15", "ev25"); //changes the event id "ev15" -> "ev25"
~~~