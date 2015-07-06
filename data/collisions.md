
Controlling the Number of Events in a Time Slot
==============

In many use cases you may need to limit the count of events per time slot. For example, you may need  to deny creation of the 2nd event if some other event has already been defined at that time.

Activating the monitoring for collisions
---------------------------------------------------

To control the number of events in a time slot, use the ['collision' extension](extensions_list.md#collision).

{{snippet
Activating the 'collision' extension
}}
~~~js
<script src="../codebase/ext/dhtmlxscheduler_collision.js"></script>
~~~

*Once you include the extension file on the page, the extension will be activated.
From this moment on, the scheduler won't allow users to place 2 events in the same time slot (create or move).*


Managing the allowable number of events in a time slot
----------------------------------------------------
By default, the allowable number of events in a time slot is 1. To regulate this number, use the api/scheduler_collision_limit_config.md property:

{{snippet
Denying creating more than 2 events per time slot
}}
~~~js
scheduler.config.collision_limit = 2;      //allows creating 2 events per time slot
~~~
{{sample
	03_extensions/15_collision.html
}}


*With the ['collision' extension](extensions_list.md#collision) enabled, each time the user tries to create a new event or modify some existing one inside an already occupied time slot, the scheduler invokes
the api/scheduler_oneventcollision_event.md event which checks the value set with the 
api/scheduler_collision_limit_config.md property.*

<br>

But remember, the api/scheduler_oneventcollision_event.md event isn't triggered while loading data. So, to control a 
number of items in a time slot while data is being loaded to the scheduler, you need to extend the previous code a bit:

{{snippet
Denying creating/loading more than 2 events per time slot
}}
~~~js
scheduler.config.collision_limit = 2; //allows creating 2 events per time slot
scheduler.attachEvent("onEventLoading", function(ev){ /*!*/
	return scheduler.checkCollision(ev);             /*!*/
});                                                   /*!*/

~~~
The api/scheduler_checkcollision.md method checks whether an event occurs at the time that has already been occupied by another event(s) and invokes the api/scheduler_oneventcollision_event.md event. 


Getting the number of events resided in a time slot
------------------------------------------------------------
To get the number of events resided in a time slot, use the api/scheduler_getevents.md method: 

{{snippet 
Getting the number of events in a time slot
}}
~~~js
var count = scheduler.getEvents(ev.start_date, ev.end_date).length;
~~~


Note,  the api/scheduler_getevents.md method iterates over all events and compares their dates, so it may take a bit of time if you are using thousands of events. 

