onBeforeViewChange
=============

@short: fires before the user changes the current view to some other one
	

@params: 
- old_mode		string	the currently active view
- old_date		object	the currently active date
- mode		string	the new view
- date		object	the new date

@returns: 
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)


@example:
scheduler.attachEvent("onBeforeViewChange", function(old_mode,old_date,mode,date){
	//any custom logic here
    return true;
});



@template:	api_event
@descr: 
- The event is blockable. Return *false* and the scheduler will leave the current view opened.
- The event also fires when the scheduler is initially being rendered on the page. In this case, the **old_mode** and **old_date** parameters are underfined.
@relatedsample:
	03_extensions/23_map_view_timeframes.html



