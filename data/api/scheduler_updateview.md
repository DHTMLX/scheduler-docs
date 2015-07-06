updateView
=============
@short: displays the specified view and date (doesn't invoke any events)

@params: 
- date	Date	the date to set
- view	string	the view name

@example: 
	
//displays the current view and date. Doesn't change anything, just refreshes 
scheduler.updateView();
// displays the 4th July,2012 in the currently active view
scheduler.updateView(new Date(2012,7,4));
// displays the 3rd May,2012 in the Week view
scheduler.updateView(new Date(2012,5,3), "week");



@template:	api_method
@relatedapi:
	 api/scheduler_setcurrentview.md
     api/scheduler_onbeforeviewchange_event.md
     api/scheduler_onviewchange_event.md
@relatedsample:
	09_api/09_filtering_events.html
@descr: 
- The names for default views are 'day', 'week', 'month'. To specify any other view - use its **name** parameter.
- The method is similar to api/scheduler_setcurrentview.md. The only difference between methods is that unlike **updateView**, api/scheduler_setcurrentview.md generates  the api/scheduler_onbeforeviewchange_event.md, api/scheduler_onviewchange_event.md events.

