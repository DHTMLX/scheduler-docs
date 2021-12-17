linkCalendar
=============
@short: 'says' to change the active date in the mini calendar each time, the active date in the scheduler is changed 

@params: 
- calendar		object	 the mini calendar object
- shift			function	a function that defines the difference between active dates in the mini-calendar <br> and the scheduler. The function takes the scheduler's date as a parameter and <br> returns the date that should be displayed in the mini calendar


@example: 
var calendar = scheduler.renderCalendar({
	container:"cal_here", 
	navigation:true,
	handler:function(date){
		scheduler.setCurrentView(date, scheduler._mode);
	}
});

//mini calendar will always show one month later than the scheduler
scheduler.linkCalendar(calendar, function(date){
	return scheduler.date.add(date, 1, "month");  
});


@template:	api_method
@related:
	minicalendar.md
@relatedsample:
	05_calendar/05_plain_structure.html
@descr: 
{{note The method requires the [minical](extensions_list.md#minicalendardatepicker) plugin to be activated.}} 

