Mini Calendar (Date Picker) 
==============
Mini calendar (date picker) is a special extension that provides an ability to render a small month view in an HTML container on a page.

<img src="mini_calendar.png"/>

{{sample
	05_calendar/02_without_scheduler.html
}}

{{note
To use the mini calendar in an app, include the **ext/dhtmlxscheduler_minical.js** file on the page.
}}


In the header
-----------------------------------
To place the mini calendar (date picker) into the header of the scheduler (as shown in the image below), follow these steps:

<img src="calendar_in_header.png"/>

<ol>
	<li>Include the extension file on the page:
~~~js
<script src='/ext/dhtmlxscheduler_minical.js' type="text/javascript"></script>
~~~
	</li>
    <li>Specify the container for the mini calendar and add it to the scheduler markup:
~~~js
<div class="dhx_cal_navline">
	...
	<div class="dhx_cal_date"></div>
	<div class="dhx_minical_icon" id="dhx_minical_icon" 
    onclick="show_minical()">&nbsp;</div>
</div>
~~~
	</li>
    <li> Provide the logic that will initialize (the api/scheduler_rendercalendar.md method) and destroy (the api/scheduler_destroycalendar.md method) the mini calendar:
~~~js
function show_minical(){
	if (scheduler.isCalendarVisible()){
		scheduler.destroyCalendar();
	} else {
		scheduler.renderCalendar({
			position:"dhx_minical_icon",
			date:scheduler._date,
			navigation:true,
			handler:function(date,calendar){
				scheduler.setCurrentView(date);
				scheduler.destroyCalendar()
			}
		});
    }
}
~~~
	</li>
</ol>

{{sample
	05_calendar/01_select.html
}}

In the header (Third party Date Picker)
-------------------------------------

In this section we'll demonstrate you how to add a third party mini calendar (date picker) into the header of the scheduler.

<img src="custom_minicalendar.png"/>

{{editor	http://snippet.dhtmlx.com/5/0dca14de9	3rd party Mini Calendar in the header}}

In our sample, we will add a mini calendar on the base of [jQuery](https://jquery.com) and [Bootstrap Datepicker](https://bootstrap-datepicker.readthedocs.io/en/latest/). If you use other libraries, you'll need to modify the code but the main approach should stay the same:

1\. *Show the date picker when clicking the calendar header*

Firstly, you need to define the DIV container for the mini calendar (or any other control) in the scheduler header.
If you use the [markup approach for initialization](initialization.md#initializingschedulerviamarkup), you can do this, as in:

~~~js
<div id="scheduler_here" class="dhx_cal_container" style="width:100%; height:100%;">
  <div class="dhx_cal_navline">
    <div class="dhx_cal_prev_button">&nbsp;</div>
    <div class="dhx_cal_next_button">&nbsp;</div>
    <div class="dhx_cal_today_button"></div>
    <div class="dhx_cal_date"></div>
    <!--- HERE -->
    <div class="input-group date" style="display: none;">
      <input type="text" class="form-control">
      <div class="dhx_minical_icon input-group-addon" id="dhx_minical_icon">&nbsp;</div>
    </div>
    <!--- end HERE -->
~~~

If you use the [header config](initialization.md#initializingschedulerviaheaderconfig), you'll need to add [a custom element](api/scheduler_header_config.md) there:

~~~js
scheduler.config.header = [
  "day",
  "week",
  "month",
  {html:'<div class="input-group date" style="display: none;">'+
    '<input type="text" class="form-control">'+
    '<div class="dhx_minical_icon input-group-addon" id="dhx_minical_icon">&nbsp;</div>'+
   	'</div>'},
  "date",
  "prev",
  "today",
  "next"
];
scheduler.init("scheduler_here");
~~~

To display the date picker on clicking the date in the navigation panel of the scheduler, we initialize the click event as soon as the scheduler is ready:

~~~js
scheduler.attachEvent("onSchedulerReady", function(){

	var $node = $('#scheduler_here .input-group.date').datepicker({
    	autoclose: true,
    	todayHighlight: true,
    	todayBtn: "linked",
   	});

   	$("#scheduler_here").delegate(".dhx_cal_date", "click", function () {
   		$node.datepicker("show");
   	});

   	$node.datepicker().on("show", function () {
    	$node.datepicker("update", scheduler.getState().date);

   		// center popup below date label
    	centerDatepicker($(".dhx_cal_date"));
	});
	...
	
});
~~~

`centerDatepicker` is an auxiliary function that we implement to render the dropdown date picker in the necessary place:

~~~js
	...
	function centerDatepicker(referenceElement) {

		if (!$('.datepicker-dropdown').is(':visible')) {
    		return;
   		}
		// center popup below date label
		var offset = $(".dhx_cal_date").offset();
		var width = $(".dhx_cal_date").width();
		var popupWidth = $(".datepicker-dropdown").width();
		$(".datepicker-dropdown").css({
			top: offset.bottom + "px",
			left: (width - popupWidth) / 2 + "px"
		});
	}
~~~

2\. *Switch the scheduler to the selected date when the user clicks the date in the date picker*

Once we display the datepicker on demand, we need to change the scheduler date when selecting a day in the calendar:

~~~js
	$node.datepicker().on("changeDate", function () {
    	scheduler.setCurrentView($node.datepicker("getDate"));
	});
~~~

3\. *Highlight current dates in the datepicker*

To highlight the dates of the date picker that are currently displayed in the scheduler we use a simple css class:

~~~js
.datepicker table .scheduler-date{
    background-color: #fff3e4;
}
~~~

All cells of the date picker, that are currently visible in the scheduler, will receive this class:

~~~js
	function fillDatepicker(scheduler) {
  		// reset highlighted events and active dates
  		...
  		$(".datepicker-dropdown").find("[data-date]").removeClass("scheduler-date");

  		// highlight scheduler date
  		var visibleDates = getVisibleDates(scheduler);
  		visibleDates.forEach(function (date) {
    		$(".datepicker-dropdown").find(
				"[data-date='" + date + "']"
			).addClass("scheduler-date");
  		});
  		...
	}
~~~

In order to get the dates that are currently visible, you can use `scheduler.getState`:

~~~js
	function getVisibleDates(scheduler) {
		var minVisible = scheduler.getState().min_date;
		var maxVisible = scheduler.getState().max_date;

		var current = minVisible;
		var result = [];
		while (current.valueOf() < maxVisible.valueOf()) {
			var currentUTC = Date.UTC(
				current.getFullYear(),current.getMonth(),current.getDate()
			);
    		result.push(currentUTC.valueOf());

    		current = scheduler.date.add(current, 1, "day");
  		}
 		return result;
	}
~~~

4\. *Highlight days with events in the date picker*

Next, we want the date picker to highlight the dates of the events specified in the scheduler.
For that, we use the same approach as in the previous step and add a css class:

~~~js
.datepicker table .has-event::after {
    content: " ";
    width: 6px;
    height: 6px;
    position: absolute;
    background-color: #6b96f7;
    border-radius: 4px;
}
~~~

As you can see from the above example, we highlight the dates of the mini calendar that contain events. 

To show the tooltip with the amount of events for the date that the user hovers over with the cursor, we need to get the events of the months currently displayed in the date picker:

~~~js
	function getVisibleEvents(calendarDate, scheduler) {
      	var min = scheduler.date.month_start(new Date(calendarDate));
      	var max = scheduler.date.add(calendarDate, 1, "month");
      	min = scheduler.date.week_start(min);
      	if(scheduler.date.week_start(new Date(max)) < max){
         	max = scheduler.date.week_start(new Date(max));
         	max = scheduler.date.add(max, 1, "week");
      	}
      	var events = scheduler.getEvents(min, max);
      	var days = {};
      	debugger;
      	events.forEach(function (event) {
         	var eventDate = event.start_date;
         	while(eventDate < event.end_date){
           		var day = Date.UTC(
             		eventDate.getFullYear(),
             		eventDate.getMonth(),
            		eventDate.getDate()
           		);

          		if (!days[day.valueOf()]) {
             		days[day.valueOf()] = 0;
           		}
           		days[day.valueOf()]++;  
           		eventDate = scheduler.date.add(eventDate, 1, "day");
           		eventDate = scheduler.date.day_start(eventDate);
         	}
      	});

      	var result = [];
      	for (var i in days) {
         	result.push({ timestamp: i, count: days[i] });
      	}
      	return result;
   	}
~~~

In the example above, we get information of the events from the scheduler. It means, that we'll only be able to highlight the events that are already loaded into the scheduler. This approach won't work particularly well if you use dynamic loading, since only a small part of all events will be loaded into the scheduler at the time. <br>
The alternative approach would be to request data on the events from the server.

When we have data on the timestamps of the cells that contain events and the amount of events per cell, we can populate the date picker with this information, as in:

~~~js
	function fillDatepicker(scheduler) {
		// reset highlighted events and active dates
		$(".datepicker-dropdown").find("[data-date]").removeClass("has-event");
		$(".datepicker-dropdown").find("[data-date]").removeAttr("title");
		...

		// highlight events
		var eventCells = getVisibleEvents($node.datepicker("getDate"), scheduler);
		eventCells.forEach(function (cellEvents) {
			$(".datepicker-dropdown").find(
				"[data-date='" + cellEvents.timestamp + "']"
			).addClass("has-event");
    		$(".datepicker-dropdown").find(
				"[data-date='" + cellEvents.timestamp + "']"
			).attr("title", cellEvents.count + " events");
  		});
	}
~~~

5\. *Synchronize the displayed label of the date with the active date in the scheduler*

Finally, we need to recenter the date picker if the size of the window changes, and apply the highlighting when the user changes the current date in the date picker:

~~~js
	$(window).on('resize', function () {
    	setTimeout(function(){
        	centerDatepicker($(".dhx_cal_date"));
    	}, 10);
	});
	$node.datepicker().on("changeDate", function () {
      	scheduler.setCurrentView($node.datepicker("getDate"));
   	});
	$node.datepicker().on("changeMonth", function () {
      	refreshDatepicker(scheduler);
	});
	$node.datepicker().on("changeYear", function () {
    	refreshDatepicker(scheduler);
	});
	$node.datepicker().on("changeDecade", function () {
    	refreshDatepicker(scheduler);
	});
	$node.datepicker().on("changeCentury", function () {
    	refreshDatepicker(scheduler);
	});
	function refreshDatepicker(scheduler) {
    	// call from timeout so code fires after the datepicker popup is updated
    	setTimeout(function () {
        	fillDatepicker(scheduler);
    	});
	}
~~~

If you use a separate element to display the active date of the scheduler, you'll need to capture the [onViewChange](api/scheduler_onviewchange_event.md) event of the scheduler and update the date label from there:

~~~js
scheduler.attachEvent("onViewChange", function (newMode , newDate){
    var state = scheduler.getState();
    var minDate = state.min_date;
    var maxDate = state.max_date;
    var dateToStr = scheduler.date.str_to_date("%d-%m-%Y");

    $(dateHeader).html(dateToStr(minDate) + " - " + dateToStr(minDate));
});
~~~

Note, that we don't use this handler in our code sample, since we rely on the built-in date header of the scheduler which is updated automatically. You need to use such code only if you [hide the default date header](scheduler_markup.md#hidingtheschedulersheader), or if you need to display the active date in multiple places.


In the lightbox
----------------------------------
The mini calendar (date picker) can be used in the lightbox for "start" and "end" dates selection.

<img src="in_the_lightbox.png"/>

To place the mini calendar in the lightbox, follow these steps:


<ol>
	<li>Include the extension file on the page:
~~~js
<script src='/ext/dhtmlxscheduler_minical.js' type="text/javascript"></script>
~~~
	</li>
    <li>Set the <i>type</i> of the <b>time</b> section to <b>calendar_time</b> (instead of <b>time</b>):
~~~js
//default lightbox definition
scheduler.config.lightbox.sections=[
  {name:"description", height:200, map_to:"text", type:"textarea", focus:true},
  {name:"time", height:72, type:"time", map_to:"auto"}
];
//change type:"time" -> type:"calendar_time"
scheduler.config.lightbox.sections = [
  {name:"description", height:200, map_to:"text", type:"textarea", focus:true},
  {name:"time", height:72, type:"calendar_time", map_to:"auto" }
];
~~~
	</li>
</ol>

{{sample
	05_calendar/03_in_form.html
}}

Outside the scheduler
---------------------------------------------------------------------
The mini calendar (date picker) can reside at any place on the page.

<img src="outside_the_scheduler.png"/>

To place the  mini calendar in some HTML container outside the scheduler, follow these steps:

<ol>
	<li>Include the extension file on the page:
~~~js
<script src='/ext/dhtmlxscheduler_minical.js' type="text/javascript"></script>
~~~
	</li>
    <li>Specify the container for the mini calendar on the page:
~~~js
<div id="scheduler_here" class="dhx_cal_container" ...>
...
</div>

<div style='float: left; padding:10px;'>
		<div id="cal_here" style='width:250px;'></div>
</div>
~~~
	</li>
    <li> Call the api/scheduler_rendercalendar.md method to render the mini calendar on the page:
~~~js
var calendar = scheduler.renderCalendar({
	container:"cal_here", 
	navigation:true,
	handler:function(date){
		scheduler.setCurrentView(date, scheduler._mode);
	}
});
~~~
	</li>
</ol>

{{sample
	05_calendar/05_plain_structure.html
}}

Templates and styles
---------------------------------------

###Templates
To customize the format of dates presented in the mini calendar (date picker), you can use a number of templates listed in the article mini_calendar_templates.md. 

~~~js
scheduler.templates.calendar_month = scheduler.date.date_to_str("%M, %Y");
scheduler.init('scheduler_here',new Date(2019,2,1),"day");
...
var calendar = scheduler.renderCalendar({..});
~~~

<img src="mini_calendar_custom_template.png"/>


###CSS classes
To customize the look of days in the mini calendar (date picker), you can redefine the following CSS classes: 

<table class="list"  cellspacing="0" cellpadding="5" border="0">
	<thead>
    	<th>CSS class</th>
    	<th>Applied to</th>
    </thead>
	<tbody>
	<tr>
		<td style="width:490px;text-align:left;font-weight: bold;">.dhx_cal_container.dhx_mini_calendar .dhx_month_head</td>
		<td>a day's cell</td>
	</tr>
	<tr>
		<td style="text-align:left;font-weight: bold;">.dhx_cal_container.dhx_mini_calendar .dhx_month_head.dhx_year_event</td>
		<td>a day's cell with the assigned event(s)</td>
	</tr>
	<tr>
		<td style="text-align:left;font-weight: bold;">.dhx_cal_container.dhx_mini_calendar .dhx_now .dhx_month_head</td>
		<td>a day's cell with the current date </td>
	</tr>
	<tr>
		<td style="text-align:left;font-weight: bold;">.dhx_cal_container.dhx_mini_calendar .dhx_calendar_click</td>
		<td>a day's cell with the currently active date</td>
	</tr>
	<tr>
    </tbody>
</table>

~~~js
<style>
.dhx_cal_container.dhx_mini_calendar .dhx_calendar_click{
    color:red;
}
</style>
<script>
	var calendar = scheduler.renderCalendar({...});
</script>
~~~

<img src="mini_calendar_custom_css.png"/>

###Marking days with the markCalendar() method
To assign a custom CSS class to a day, you can use the api/scheduler_markcalendar.md method:

~~~js
<style>
.my_style{
    background: red !important;
}
</style>
<script>
	var calendar = scheduler.renderCalendar({...});
 	...
	scheduler.markCalendar(calendar, new Date(2019,3,1), "my_style");
</script>
~~~


<img src="mini_calendar_custom_marking.png"/>


API
--------------------------------------
<table class="webixdoc_links">
	<tbody>
    <tr>
		<td class="webixdoc_links0">  api/scheduler_destroycalendar.md</td>
		<td>destroys the previously created mini-calendar</td>
	</tr>
	<tr>
		<td class="webixdoc_links0">api/scheduler_iscalendarvisible.md</td>
		<td>checks whether the calendar is currently opened in the scheduler</td>
	</tr>
	<tr>
		<td class="webixdoc_links0">api/scheduler_linkcalendar.md</td>
		<td>'says' to change the active date in the mini calendar each time the active date in the scheduler is changed </td>
	</tr>
	<tr>
		<td class="webixdoc_links0">api/scheduler_markcalendar.md</td>
		<td>applies a CSS class to the specified date</td>
	</tr>
	<tr>
		<td class="webixdoc_links0"> api/scheduler_rendercalendar.md</td>
		<td>creates a mini calendar </td>
	</tr>
	<tr>
		<td class="webixdoc_links0">api/scheduler_unmarkcalendar.md</td>
		<td>removes a CSS class from the specified date</td>
	</tr>
	<tr>
		<td class="webixdoc_links0">api/scheduler_updatecalendar.md</td>
		<td>displays the specified date in the mini calendar</td>
	</tr>
	</tbody>
</table>




