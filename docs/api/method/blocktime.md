---
sidebar_label: blockTime
title: "blockTime method"
description: "blocks the specified date and applies the default 'dimmed' style to it."
---

# blockTime
:::warning 
The method is deprecated. 
:::
### Description

@short: Blocks the specified date and applies the default 'dimmed' style to it.

@signature: blockTime: (date: Date|number, time_points: any[], items?: any) =\> void

### Parameters

- `date` - (required) *Date | number* - a date to block ( if a number is provided, the parameter will be treated as a week <br> day: '0' index refers to Sunday,'6' - to Saturday )
- `time_points` - (required) *array* - an array <b>[start_minute,end_minute,..,start_minute_N,end_minute_N]</b>, <br> where each pair sets a certain limit range. The array can have any number of such pairs
- `items` - (optional) *object* - defines specific items of  view(s) to block

### Example

~~~jsx
//blocks events from 0 till 8 hours for each Wednesday 
//BUT only for the items with id=1, id=4 in the Units view
scheduler.blockTime(3, [0,8*60], { unit: [1,4] });
~~~

### Related samples
- [Blocking dates](https://docs.dhtmlx.com/scheduler/samples/03_extensions/25_advanced_limitation.html)

### Details

:::note
 The method requires the [limit](guides/extensions-list.md#limit) plugin to be activated. 
:::

The method can be called in different ways as in:


~~~js
//blocks the entire day 3rd May,2027
scheduler.blockTime(new Date(2027,5,3), "fullday");

//blocks events from 0 till 10 hours for 3rd June,2027
scheduler.blockTime(new Date(2027,6,3), [0,10*60]);

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
  <td rowspan="2"><b id="start_date">start_date</b></td>
  <td> a Date object that sets the limitation start date</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
//denies creating events from 3rd May,2027 till 'end_date' 
start_date:new Date(2027,4,3)
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="end_date">end_date</b></td>
  <td> a Date object that sets the limitation end date</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
//denies creating events from 'start_date' till 3rd September,2027
end_date:new Date(2027,8,3)
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="days">days</b></td>
  <td> days that should be limited</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
days:[0, 2, 6] //limits Sunday,Tuesday and Saturday
days:"fullweek" //limits the entire week
days:new Date(2027,6,1) //blocks 1st July,2027
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="zones">zones</b></td>
  <td>the period in minutes that should be limited</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
zones:[4*60,8*60,12*60,15*60] //2 limit blocks:04:00-08:00,12:00-15:00
zones:"fullday" //limits the entire day
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="css">css</b></td>
  <td>the name of a css class </td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
css:"gray" //draws a DIV and applies the 'gray' css class to it
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="invert_zones">invert_zones</b></td>
  <td>specifies, whether time zones (set by the 'zones' property) must be inverted (default - false) </td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
//results in 2 limitation blocks: 00:00-08:00, 17:00-24:00
zones: [8*60, 17*60], invert_zones: true 
//results in 2 limitation blocks: 00:00-08:00, 17:00-24:00
zones: [0, 8*60, 17*60, 24*60], invert_zones: false
~~~
  </td>
  </tr> 
  <tr>
  <td rowspan="2"><b id="sections">sections</b></td>
  <td>allows blocking date(s) just for specific items of specific views.<br> BTW, the specified date(s) will be blocked just in the related view(s)</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
//blocks dates  just for the item with the id=5 in the Units view 
//and items with the id=2, id=3 in the Timeline view 
sections: { unit: 5, timeline: [2,3]}
~~~
  </td>
  </tr> 
  </tbody>
</table>

### Related API
- [addMarkedTimespan](api/method/addmarkedtimespan.md)
- [deleteMarkedTimespan](api/method/deletemarkedtimespan.md)
- [unblockTime](api/method/unblocktime.md)

### Change log
- deprecated since v5.1
