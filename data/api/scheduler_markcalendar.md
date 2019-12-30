markCalendar
=============
@short: 
	applies a css class to the specified date

@params: 
- calendar	object	the calendar object
- date		Date	the date to mark
- css		string	the name of a css class

@require: minical
@example: 
<style>
my_style{
	color:red !important;//use the 'important' keyword to make sure that 
}                        // the css property will be applied to the specified date
</style>
<script>
	// you can get the calendar object in one of two ways:

	// either via creating a mini calendar
	var calendar = scheduler.renderCalendar({...});

	// or via using the selector of the container with the mini calendar
	var calendar = document.querySelector(".dhx_mini_calendar");
    
	...
    scheduler.markCalendar(calendar, new Date(2010,3,1), "my_style");
</script>

@related:
	minicalendar.md
@relatedapi:
	api/scheduler_unmarkcalendar.md
@template:	api_method
@descr: 
{{note
Note, the method is applied to mini-calendar only, not to the scheduler!
}}




