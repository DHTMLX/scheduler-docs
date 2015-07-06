onBeforeTodayDisplayed
=============

@short: fires when the user clicks on the 'Today' button in the scheduler
	

@returns: 
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)


@example:
scheduler.attachEvent("onBeforeTodayDisplayed", function (){
    //any custom logic here
	return true;
});

@template:	api_event
@descr:

