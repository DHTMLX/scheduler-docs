onEventLoading
=============
@short: fires when an event is being loaded from the data source
	

@params: 
- ev	object	the event object (the object of a data item)

@example: 
scheduler.attachEvent("onEventLoading", function(ev){
	//any custom logic here
    return true;
});

@returns: 
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)


@template:	api_event
@descr: 
- The event is blockable. Return *false*  and the data item won't be loaded into the scheduler.
- The event is called for each data item  in the data source.





