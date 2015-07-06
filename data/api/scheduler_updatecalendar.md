updateCalendar
=============
@short: 	displays the specified date in the mini calendar

@params: 
- calendar		object	 the mini calendar object
- new_date	Date	a new date to display in the mini calendar


@example: 
var calendar = scheduler.renderCalendar({
	container:"cal_here", 
	navigation:true,
	handler:function(date){
		scheduler.setCurrentView(date, scheduler._mode);
	}
});
...
scheduler.updateCalendar(calendar, new Date(2013,01,01));


@related:
	minicalendar.md

@template:	api_method
@require: minical
@descr: 



