render
=============

@short: repaints the scheduler
	

@params:
* date	Date	the date to display
* view		string		the name of a view to display 

@return: void



@example:

// render to apply the config
scheduler.config.hour_size_px = 88;
scheduler.render();


// switch to another date
scheduler.render(new Date(2020,7,4));

// switch to another view
scheduler.render(null, "week");


@template:	api_method

@relatedapi:
	api/scheduler_setcurrentview.md
	api/scheduler_onbeforeviewchange_event.md
    api/scheduler_onviewchange_event.md
    api/scheduler_updateview.md

@descr:

This method is an alias of [scheduler.setCurrentView](api/scheduler_setcurrentview.md) and works identically to it.

- The names for default views are 'day', 'week', 'month'. To specify any other view - use its  <b>name</b> parameter.
- The method invokes  the api/scheduler_onbeforeviewchange_event.md, api/scheduler_onviewchange_event.md.
- The method is similar to api/scheduler_updateview.md. The only difference between methods is that api/scheduler_updateview.md  **doesn't generate any events**.

