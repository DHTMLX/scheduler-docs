setCurrentView
=============
@short: 
	displays the specified view and date

@params: 
* date	Date	the date to display
* view		string		the name of a view to display 

@example: 
	
//displays the current view and date. Doesn't change anything, just refreshes 
scheduler.setCurrentView();
// displays the 4th July,2012 in the currently active view
scheduler.setCurrentView(new Date(2012,7,4));
// displays the 3rd May,2012 in the Week view
scheduler.setCurrentView(new Date(2012,5,3), "week");



@template:	api_method
@relatedapi:
	api/scheduler_onbeforeviewchange_event.md
    api/scheduler_onviewchange_event.md
    api/scheduler_updateview.md
@relatedsample:
	05_calendar/01_select.html
    05_calendar/05_plain_structure.html
@descr:
- The names for default views are 'day', 'week', 'month'. To specify any other view - use its  <b>name</b> parameter.
- The method invokes  the api/scheduler_onbeforeviewchange_event.md, api/scheduler_onviewchange_event.md.
- The method is similar to api/scheduler_updateview.md. The only difference between methods is that api/scheduler_updateview.md  **doesn't generate any events**.

