renderCalendar
=============
@short: creates a mini calendar

@params: 
- config	object	the calendar configuration object 

@example: 
var calendar = scheduler.renderCalendar({
    container:"cal_here", 
    navigation:true,
    handler:function(date, calendar){
        scheduler.setCurrentView(date, scheduler._mode);
    }
});



@template:	api_method
@related:
	minicalendar.md
@relatedsample:
	05_calendar/01_select.html
    05_calendar/02_without_scheduler.html
@descr: 
{{note The method requires the [minical](extensions_list.md#minicalendardatepicker) plugin to be activated.}} 

The configuration object can have the following properties:

<table class="webixdoc_links">
	<tbody>
    	<tr>
			<td class="webixdoc_links0"><b>container</b></td>
			<td>(<i>string, object</i>) an HTML container ( or its id) where a calendar will be initialized. Optional</td>
		</tr>
       <tr>
			<td class="webixdoc_links0"><b>position</b></td>
			<td>(<i>object</i>) the position of the calendar. Can be specified as a set of coordinates of the id of an HTML object</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>date</b></td>
			<td>(<i>string</i>) the initial date of the calendar</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"  style="vertical-align: top;"><b>navigation</b></td>
			<td>(<i>boolean</i>) enables/disables month navigation buttons</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>handler</b></td>
			<td>(<i>function</i>) the handler function that will treat clicks on the calendar. Takes the clicked date and the calendar object as parameters</td>
		</tr>
    </tbody>
</table>

~~~js
var calendar = scheduler.renderCalendar({
    container:"for_calendar",
	date:new Date()
});
//
var calendar = scheduler.renderCalendar({
    position:"some_id",
	date:new Date()
});
//
var calendar = scheduler.renderCalendar({
    position: { left: 100, top: 50 },
	date:new Date()
});

~~~

