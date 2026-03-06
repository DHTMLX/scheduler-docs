---
sidebar_label: addMarkedTimespan
title: "addMarkedTimespan method"
description: "marks dates, but with certain settings makes blocking (allows setting custom styling for the limit)"
---

# addMarkedTimespan

### Description

@short: Marks dates, but with certain settings makes blocking (allows setting custom styling for the limit)

@signature: addMarkedTimespan: (config: any) =\> number

### Parameters

- `config` - (required) *object* - the configuration object of the timespan to mark/block

### Returns
- ` id` - (number) - the id of the added timespan

### Example

~~~jsx
//marks dates
scheduler.addMarkedTimespan({  
    days:  5,               // marks each Friday
    zones: "fullday",       // marks the entire day
    css:   "gray_section"   // the name of applied CSS class
});
scheduler.updateView();

//marks and blocks dates
scheduler.addMarkedTimespan({  
    days:  5,
    zones: "fullday",
    css:   "gray_section",
    type:  "dhx_time_block" //the hardcoded value
});
scheduler.updateView();
~~~

### Related samples
- [Highlighting timespans](https://docs.dhtmlx.com/scheduler/samples/09_api/03_highlighted_timespans.html)
- [Highlighting sections in Timeline and Units views](https://docs.dhtmlx.com/scheduler/samples/09_api/04_highlighted_sections_units.html)

### Details

The method is available from version 3.5.

:::note
 The method requires the [limit](guides/extensions-list.md#limit) plugin to be activated. 
:::

:::note

Note, marking (blocking) won't be applied just after you've called the method. You should call [updateView](api/method/updateview.md) to apply the marking.
 
:::

<br>

## Configuration object properties

The configuration object can contain the following properties:

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
//denies creating events from 3rd May,2012 till 'end_date' 
start_date:new Date(2012,4,3)
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
//denies creating events from 'start_date' 
// till 3rd September,2012
end_date:new Date(2012,8,3)
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
days:new Date(2012,6,1) //blocks 1st July,2012
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
//2 limit blocks:04:00-08:00,12:00-15:00
zones:[4*60,8*60,12*60,15*60] 
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
  <td rowspan="2"><b id="html">html</b></td>
  <td>an HTML content that will be added to the marked range </td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
//draws a DIV with this text over the marked range  
html:"<b>Blocked</b>"
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="type">type</b></td>
  <td>defines the time span's type. The 'dhx_time_block' type 'says' to apply blocking to the timespan. With any other type (you can specify any value) set, events will be just marked </td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
type: "dhx_time_block" //events will be marked and blocked  
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
//blocks dates just for the item with the id=5 in the Unit view 
//and items with the id=2, id=3 in the Timeline view 
sections: { unit: 5, timeline: [2,3]}
~~~
  </td>
  </tr> 
  </tbody>
</table>

## Acceptable combinations of config properties

:::note

Note, *days*, *zones* and *start_date*, *end_date* properties are used in pairs to set the blocking interval and can't be mixed and used in some other variation.
For example, you can't specify *zones*, *start_date* or *days*, *start_date*, *end_date* at the same time.
 
:::

Therefore, there are 2 acceptable combinations with specific set of properties:

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <thead>
  <tr>
  <th>
  Set of properties 
  </th>
  <th>
  Example
  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td><ul>
  <li>`days`</li>
  <li>`zones`</li>
  <li>`invert_zones`</li>
  <li>`css`</li>
  <li>`html`</li>
  <li>`type`</li>
  <li>`sections`</li>
  </ul></td>
  <td>
~~~js
var config ={
    days:  1, 
    zones: [9*60, 15*60], 
    css: "cssClassName", 
    sections: {
         unit: 5
    }
}

~~~
</td>
  </tr>
  <tr>
  <td> 
  <ul>
  <li>`start_date`</li>
  <li>`end_date` </li>
  <li>`css`</li>
  <li>`html`</li>
  <li>`type`</li>
  <li>`sections`</li>
  </ul>
  </td>
  <td>
~~~js
var config ={
    start_date: new Date(2013,7,13),
    end_date:   new Date(2013,7,14),
    css: "cssClassName",
    sections: {
         unit: 5
    }
}
~~~
</td>
</tr>
  </tbody>
</table>


## markTimespan() and addMarkedTimespan() comparison

<table >
<tr><td>
addMarkedTimespan 
</td><td>
markTimespan 
</td></tr>
<tr><td>
requires calling the [updateView](api/method/updateview.md) method to draw a DIV for the time span 
</td><td>
draws a DIV for the time span automatically 
</td></tr>
<tr><td>
the time span(s) exists all time along 
</td><td>
 the time span(s) will be hided just after any internal update occurs in the app 
</td></tr>
<tr><td>
returns the ID of the configured time span(s) 
</td><td>
returns a DIV or an array of DIVs 
</td></tr>
</table>

### Related API
- [deleteMarkedTimespan](api/method/deletemarkedtimespan.md)
- [markTimespan](api/method/marktimespan.md)
- [checkInMarkedTimespan](api/method/checkinmarkedtimespan.md)

### Related Guides
- [Blocking and Marking Dates](guides/limits.md)
