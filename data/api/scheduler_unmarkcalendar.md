unmarkCalendar
=============
@short: removes a css class from the specified date

@params: 
- calendar		object	 the mini calendar object
- date		Date	the date to unmark
- css		string	the name of a css class to remove

@example: 
// you can get the calendar object in one of two ways:

// either via creating a mini calendar
var calendar = scheduler.renderCalendar({
	container:"cal_here", 
	navigation:true,
	handler:function(date){
		scheduler.setCurrentView(date, scheduler._mode);
	}
});

// or via using the selector of the container with the mini calendar
var calendar = document.querySelector(".dhx_mini_calendar");

scheduler.markCalendar(calendar, new Date(2010,3,1), "my_style");
...
scheduler.unmarkCalendar(calendar, new Date(2010,3,1), "my_style");


@related:
	minicalendar.md
@template:	api_method
@descr:
{{note The method requires the [minical](extensions_list.md#minicalendardatepicker) plugin to be activated.}} 

{{note
Note, the method is applied to mini-calendar only, not to the scheduler!
}}

@relatedapi:
	 api/scheduler_markcalendar.md


