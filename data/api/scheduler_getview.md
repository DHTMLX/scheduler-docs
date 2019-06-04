getView
=============

@todo:
	check 

@short:
	returns a view object by its name. If no name is specified, returns the current view


@params:
* name		string		optional, the name of the view


@returns:
- view		object		a view object
 


@example:
var timeline = scheduler.getView(); 
timeline.x_size = 8;
scheduler.setCurrentView();


@template:	api_method
@descr:
Returns only views that have their own object representation. Currently, these are [timeline](timeline_view.md#timelineobjectapi) and [units](units_view.md) views, so the method will return *null* for any other view.

