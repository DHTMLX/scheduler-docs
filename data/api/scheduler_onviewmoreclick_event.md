onViewMoreClick
========================

@short: fires when the user clicks on the 'View more' link in the Month view  (the Month view only)
	

@params:
- date		object		the date of the cell inside which the user clicks on the 'View more' link 
@example:
scheduler.attachEvent("onViewMoreClick", function(date){
    //any custom logic here
});

@returns: 
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)


@template:	api_event
@descr:
The event is blockable. Return *false*, and the Month view won't be changed to the Day view after clicking on the 'View more' link.


@related: 
	month_view.md#limitingthenumberofeventsinacell
@relatedapi:
	api/scheduler_max_month_events_config.md
    api/scheduler_month_events_link_template.md
    
@relatedsample:
02_customization/31_view_more.html