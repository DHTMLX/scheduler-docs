
Filtering events
==============

For any specified view you can set a filtering function that will define, which events should be displayed in the scheduler and which shouldn't. 


~~~js
scheduler.filter_week = function(id, event){
	if(event.name == 'New event')
    	return false; // event will be filtered (not rendered)
    	//or
    	return true; // event will be rendered
}
~~~

where, 'week' is the name of a view (in the *'scheduler.filter_week'*).

The **filter_{viewName}** method takes 2 parameters:

- **id** - the event's id
- **event** - the event object

Remember, you can set different filtering functions for different views:

~~~js
scheduler.filter_day = scheduler.filter_week = function(id, event){
	//some_code
}
...
scheduler.filter_timeline = function(id, event){
	//some_other code
}

~~~

{{sample
	09_api/09_filtering_events.html
}}