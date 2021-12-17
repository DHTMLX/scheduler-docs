blockTime
=============

@short: 
	blocks the specified date and applies the default 'dimmed' style to it.

@params: 
- date				Date,number   	a date to block ( if a number is provided, the parameter will be treated as a week <br> day: '0' index refers to Sunday,'6' - to Saturday )
- time_points		array			an array <b>[start_minute,end_minute,..,start_minute_N,end_minute_N]</b>, <br> where each pair sets a certain limit range. The array can have any number of such pairs
* items				object			defines specific items of  view(s) to block

@example: 
//blocks events from 0 till 8 hours for each Wednesday 
//BUT only for the items with id=1, id=4 in the Units view
scheduler.blockTime(3, [0,8*60], { unit: [1,4] });


@deprecated:
instead of it, you can use api/scheduler_addmarkedtimespan.md
~~~
var spanID = scheduler.addMarkedTimespan({  
    days:  [0,1], 
    zones: "fullday"              
});
~~~


@template:	api_method

@relatedapi:
    api/scheduler_addmarkedtimespan.md
	api/scheduler_deletemarkedtimespan.md
    api/scheduler_unblocktime.md
@relatedsample:
	03_extensions/25_advanced_limitation.html
@descr:

{{note The method requires the [limit](extensions_list.md#limit) plugin to be activated.}}

The method can be called in different ways as in:


~~~js
//blocks the entire day 3rd May,2009
scheduler.blockTime(new Date(2009,5,3), "fullday");

//blocks events from 0 till 10 hours for 3rd June,2009
scheduler.blockTime(new Date(2009,6,3), [0,10*60]);

//blocks events from 0 till 8 hours and from 18 till 24 hours for each Saturday
scheduler.blockTime(6, [0,8*60,18*60,24*60]);

//blocks all events for each Sunday
scheduler.blockTime(0, "fullday");

//blocks events from 0 till 8 hours for each Wednesday
//BUT only for the items with id=1, id=4 in the Units view
scheduler.blockTime(3, [0,8*60], { unit: [1,4] });

//makes the same as in examples above, but takes parameters as a config object
scheduler.blockTime({
	days: 3,
	zones: [0,8*60],
	sections: {
		unit: [1,4]
	}
});

~~~

<table class="list" cellspacing="0" cellpadding="5" border="0">
	<thead>
	<tr>
		<th>
			Property 
		</th>
		<th>
			Description
		</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td rowspan=2><b id="start_date">start_date</b></td>
        <td> a Date object that sets the limitation start date</td>
    </tr>
    <tr>
		<td colspan=2 style="text-align:left !important; ">
~~~js
//denies creating events from 3rd May,2012 till 'end_date' 
start_date:new Date(2012,4,3)
~~~
		</td>
	</tr>
	<tr>
		<td rowspan=2><b id="end_date">end_date</b></td>
        <td> a Date object that sets the limitation end date</td>
    </tr>
    <tr>
		<td colspan=2 style="text-align:left !important;" >
~~~js
//denies creating events from 'start_date' till 3rd September,2012
end_date:new Date(2012,8,3)
~~~
		</td>
	</tr>
	<tr>
		<td rowspan=2><b id="days">days</b></td>
        <td> days that should be limited</td>
    </tr>
    <tr>
		<td colspan=2 style="text-align:left !important;" >
~~~js
days:[0, 2, 6] //limits Sunday,Tuesday and Saturday
days:"fullweek" //limits the entire week
days:new Date(2012,6,1) //blocks 1st July,2012
~~~
		</td>
	</tr>
 	<tr>
		<td rowspan=2><b id="zones">zones</b></td>
        <td>the period in minutes that should be limited</td>
    </tr>
    <tr>
		<td colspan=2 style="text-align:left !important;" >
~~~js
zones:[4*60,8*60,12*60,15*60] //2 limit blocks:04:00-08:00,12:00-15:00
zones:"fullday" //limits the entire day
~~~
		</td>
	</tr>
 	<tr>
		<td rowspan=2><b id="css">css</b></td>
        <td>the name of a css class </td>
    </tr>
    <tr>
		<td colspan=2 style="text-align:left !important;" >
~~~js
css:"gray" //draws a DIV and applies the 'gray' css class to it
~~~
		</td>
	</tr>
 	<tr>
		<td rowspan=2><b id="invert_zones">invert_zones</b></td>
        <td>specifies, whether time zones (set by the 'zones' property) must be inverted (default - false) </td>
    </tr>
    <tr>
		<td colspan=2 style="text-align:left !important;" >
~~~js
//results in 2 limitation blocks: 00:00-08:00, 17:00-24:00
zones: [8*60, 17*60], invert_zones: true 
//results in 2 limitation blocks: 00:00-08:00, 17:00-24:00
zones: [0, 8*60, 17*60, 24*60], invert_zones: false
~~~
		</td>
	</tr> 
 	<tr>
		<td rowspan=2><b id="sections">sections</b></td>
        <td>allows blocking date(s) just for specific items of specific views.<br> BTW, the specified date(s) will be blocked just in the related view(s)</td>
    </tr>
    <tr>
		<td colspan=2 style="text-align:left !important;" >
~~~js
//blocks dates  just for the item with the id=5 in the Units view 
//and items with the id=2, id=3 in the Timeline view 
sections: { unit: 5, timeline: [2,3]}
~~~
		</td>
	</tr> 
    </tbody>
</table>

@changelog: deprecated since v5.1