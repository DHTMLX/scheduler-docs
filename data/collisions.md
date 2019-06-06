Preventing Double Events in a Time Slot
==============

In many use cases you may need to limit the count of events per time slot. For example, you may need  to deny creation of the 2nd event if some other event has already been defined at that time.

Activating the monitoring for collisions
---------------------------------------------------

To control the number of events in a time slot, use the ['collision' extension](extensions_list.md#collision).

{{snippet
Activating the 'collision' extension
}}
~~~html
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

Full checklist for preventing double bookings/events
---------------------------------------

Below you'll find a list of steps you need to complete in order to avoid collisions of events in a time slot: 

1) Include the *collision* extension on the page:

~~~html
<script src="../codebase/ext/dhtmlxscheduler_collision.js"></script>
~~~

2) Block creation of new events while data is being loaded from the server. 

So, the user won't be able to create an event while data hasn't been loaded and the calendar is empty.
For this purpose you should use the api/scheduler_onloadend_event.md and api/scheduler_onloadstart_event.md event handlers and the api/scheduler_readonly_config.md property, as follows:

~~~js
// make the scheduler readonly 
// before loading data from the data source has been started
scheduler.attachEvent("onLoadStart", function(){
    scheduler.config.readonly = true;
});

// make the scheduler editable 
// only after loading data from the data source is completed
scheduler.attachEvent("onLoadEnd", function(){
    scheduler.config.readonly = false;
});
~~~

3) Enable dynamic loading to speed up data loading in case you have lots of records and they all load at once.

To enable the dynamic loading, you need to call the api/scheduler_setloadmode.md method and load your script after that:

{{snippet
Enabling the dynamic loading
}}
~~~js
scheduler.setLoadMode("month");
scheduler.load("/some");
~~~

4) Check conflicting events on the server side via PHP connector validation. The details are given in the article devoted to 
[data validation](http://docs.dhtmlx.com/connector__php__validation.html#processingincaseofvalidationerror).

You can also reload data on the client side if checking fails. 

To process the fail of checking, use DataProcessor Events [onValidationError](http://docs.dhtmlx.com/api__dataprocessor_onvalidationerror_event.html) and 
[onAfterUpdate](http://docs.dhtmlx.com/api__dataprocessor_onafterupdate_event.html) and to reload data, make use of the Scheduler methods api/scheduler_clearall.md and api/scheduler_load.md:


a. [onValidationError](http://docs.dhtmlx.com/api__dataprocessor_onvalidationerror_event.html)

occurs after validation error has fired before data sending

~~~js
dp.attachEvent("onValidationError", function(id, details){
   //reload actual data from the server
   scheduler.clearAll();
   scheduler.load("/data");
});
~~~

Parameters:

- id - (string) id of the item for which error occurs
- details -	(object) error details

b. [onAfterUpdate](http://docs.dhtmlx.com/api__dataprocessor_onafterupdate_event.html)

fires after server side response has been received and processed

~~~js
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
     if(action == "invalid" || action == "error"){
          //reload actual data from the server
          scheduler.clearAll();
          scheduler.load("/data");
     }
});
~~~

Parameters:

- id - (string)	id of the updated item
- action - (string)	response status (operation type), see the details below
- tid - (string) new id (applicable only for insert operations)
- response - (mixed) xml node/json object, contains parsed xml/json response

Possible response statuses are the following: 

- updated; 
- inserted;
- deleted;
- invalid;
- error.

