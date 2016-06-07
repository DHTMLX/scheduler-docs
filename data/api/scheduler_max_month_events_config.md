max_month_events
=============
@short:sets the maximum number of events displayable in a cell 
	

@type: number
@example:
scheduler.config.max_month_events = 5;
..
scheduler.init('scheduler_here', new Date(2013,5,30),"month");


@template:	api_config
@descr:
If the number of assigned events exceeds the option's value, the scheduler will display the 'View more' link. The link will 
redirect the user to the Day view displaying a full list of assigned events.

<img src="api/max_month_events_property.png"/>
@views: month

@related:
	month_view.md#limitingthenumberofeventsinacell
@relatedapi:
	 api/scheduler_month_events_link_template.md
	 api/scheduler_onviewmoreclick_event.md
@relatedsample:
	02_customization/31_view_more.html

@apigroup: Views/Month view
	