Mini Calendar 
==============
Mini calendar is a special extension that provides an ability to render a small month view in an HTML container on a page.

<img src="mini_calendar.png"/>

{{sample
	05_calendar/02_without_scheduler.html
}}

{{note
To use the mini calendar in an app, include the **ext/dhtmlxscheduler_minical.js** file on the page.
}}


Mini calendar in the header
-----------------------------------
To place the mini calendar into the header of the scheduler (as shown in the image below), follow these steps:

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


Mini calendar in the lightbox
----------------------------------
The mini calendar can be used in the lightbox for "start" and "end" dates selection.

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

Mini calendar in an HTML container outside the scheduler
---------------------------------------------------------------------
The mini calendar can reside at any place on the page.

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

Customizing the mini calendar
---------------------------------------

###Templates
To customize the format of dates presented in the mini calendar, you can use a number of templates listed in the article mini_calendar_templates.md. 

~~~js
scheduler.templates.calendar_month = scheduler.date.date_to_str("%M, %Y");
scheduler.init('scheduler_here',new Date(2010,2,1),"day");
...
var calendar = scheduler.renderCalendar({..});
~~~

<img src="mini_calendar_custom_template.png"/>

###Css classes
To customize the look of days in the mini calendar, you can redefine the following CSS classes: 

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
	scheduler.markCalendar(calendar, new Date(2013,3,1), "my_style");
</script>
~~~


<img src="mini_calendar_custom_marking.png"/>


Related methods
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
		<td>applies a css class to the specified date</td>
	</tr>
	<tr>
		<td class="webixdoc_links0"> api/scheduler_rendercalendar.md</td>
		<td>creates a mini calendar </td>
	</tr>
	<tr>
		<td class="webixdoc_links0">api/scheduler_unmarkcalendar.md</td>
		<td>removes a css class from the specified date</td>
	</tr>
	<tr>
		<td class="webixdoc_links0">api/scheduler_updatecalendar.md</td>
		<td>displays the specified date in the mini calendar</td>
	</tr>
	</tbody>
</table>

