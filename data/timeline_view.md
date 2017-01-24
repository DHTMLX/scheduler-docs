Timeline View 
==============
The Timeline view allows you to visualize events horizontally with separate timelines arranged from left to right.

<img src="timeline_view.png"/>

Initialization
-----------------------------------
To add the Timeline view  to the scheduler, follow these steps:

<ol>
	<li><b>Include the Timeline code file on the page:</b>
    	<ul>
        	<li> <i>ext/dhtmlxscheduler_timeline.js</i> - for the 'Bar' and 'Cell' modes </li>
            <li> <i>ext/dhtmlxscheduler_timeline.js, ext/dhtmlxscheduler_treetimeline.js</i> - for the 'Tree' mode</li>
            <li> <i>ext/dhtmlxscheduler_timeline.js, ext/dhtmlxscheduler_daytimeline.js</i> - for the 'Days' mode</li>
        </ul>
    </li>
    <li> <b>Add the view's tab to the scheduler's markup:</b>
~~~html
<div id="scheduler_here" class="dhx_cal_container" ...>
	<div class="dhx_cal_navline">
	   ...
	   <div class="dhx_cal_tab" name="timeline_tab" style="right:280px;"></div>
    </div>
	...	
</div>
~~~
	</li>
    <li><b>Set the label for the tab:</b>
~~~js
//'timeline_tab' is the name of our div
scheduler.locale.labels.timeline_tab ="Timeline"; 
~~~
	</li>
    <li> <b>Call the api/scheduler_createtimelineview.md method:</b>
~~~js
scheduler.createTimelineView({
     name:"timeline",
     x_unit:"minute",//measuring unit of the X-Axis.
     x_date:"%H:%i", //date format of the X-Axis
     x_step:30,      //X-Axis step in 'x_unit's
     x_size:24,      //X-Axis length specified as the total number of 'x_step's
     x_start:16,     //X-Axis offset in 'x_unit's
     x_length:48,    //number of 'x_step's that will be scrolled at a time
     y_unit:         //sections of the view (titles of Y-Axis)
        [{key:1, label:"Section A"},
         {key:2, label:"Section B"},
         {key:3, label:"Section C"},
         {key:4, label:"Section D"}],
     y_property:"section_id", //mapped data property
     render:"bar"             //view mode
});
~~~
	</li>
</ol>

{{sample
	06_timeline/02_lines.html
}}


{{note 
In the 'Days' mode, time scale must cover 1 day exactly. If your configuration specifies a shorter or longer period - timeline will be rendered incorrectly.
}}

###Scale configuration example

In spite of a big number of parameters used in the api/scheduler_createtimelineview.md method, it's quite simple. 

Let's consider an example - the time scale from 09:00 to 15:00 with 30 minutes step that is scrolled by days.

<img src="timeline_scale_01.png"/>

<br>

~~~js
{
	x_unit:"minute",// the scale parameters will be calculated in minutes
	x_step:30,  //sets the '30 minute' step, e.g. 09:00 - 09:30
	x_size:12,  // the number of '30 minute's in the interval 09:00 - 15:00
    		    // 15 - 9 = 6 hours = 360 minutes = 360/30 = 12
	x_start:18, //scale starts from 09:00,i.e. 9 hours from the default start- 00:00.
    			// 9 hours = 540 minutes = 540/30 = 18 'x_step's 
	x_length:48,//scrolls a day:1 day= 24 hours= 1440 minutes= 1440/30= 48 'x_step's
	...
}
~~~



Dynamic changing of properties
-------------------------------------
All defined timeline objects are stored in the scheduler.matrix object.
You can access the configuration  of any timeline view by its name and change any property. Changes will be applied as soon as you update the scheduler:

~~~js
scheduler.matrix['timeline'].x_size = 12;
scheduler.setCurrentView();//redraws scheduler
~~~

<br>
where 'timeline' is the name of the timeline view as specified in the api/scheduler_createtimelineview.md method:

~~~js
scheduler.createTimelineView({
name:'timeline',
...
})
~~~


Loading data to the view
----------------------------------
Unlike basic views (such as Day, Month, Year etc.), multiple-resource views (that are Units and Timeline) require data items to have one more mandatory field:

* [y_property](api/scheduler_createtimelineview.md) - (string) the name of a data property that will be used to assign events to certain sections.

<img src="timeline_loading.png"/>

~~~js
scheduler.createTimelineView({
     name:"timeline",
    ...
     y_unit:     
        [{key:1, label:"Room 1"},
         {key:2, label:"Room 2"},
         {key:3, label:"Room 3"}],
     y_property:"room_id", 
});

scheduler.init('scheduler_here');
scheduler.parse([
	{text:"Conference",	start_date:"17/09/2012 12:00", end_date:"18/09/2012 21:00", 
    room_id:"1"},
 	{text:"Meeting", 	start_date:"17/09/2012 09:00", end_date:"17/09/2012 21:00", 
    room_id:"2"},
 	{text:"Conference", start_date:"17/09/2012 15:00", end_date:"18/09/2012 15:00", 
    room_id:"3"}
],"json");                                 
~~~
{{sample
	06_timeline/02_lines.html
}}


Assigning events to several sections
--------------------------------------------------------------

Starting from version 4.1, you have a possibility to assign events to several sections.

<img src="multiple_sections.png"/>

<br>

To enable the possibility: 

1. Include the **ext/dhtmlxscheduler_multisection.js** file on the page
2. Set the api/scheduler_multisection_config.md property to *true*
3. (Optional) Include "ext/dhtmlxscheduler_multiselect.js" file on the page to use multiselect.md control in the scheduler (a comfortable way to switch between sections)

~~~html
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="codebase/ext/dhtmlxscheduler_multisection.js"></script> /*!*/
<link rel="stylesheet" href="codebase/dhtmlxscheduler.css" type="text/css">

<script src="codebase/ext/dhtmlxscheduler_timeline.js"></script>
<script src="codebase/ext/dhtmlxscheduler_multiselect.js"></script>

<script>
	scheduler.config.multisection = true; /*!*/
	scheduler.init('scheduler_here');
</script>
~~~


After this you can specify several sections ([by default, delimited with a comma](api/scheduler_section_delimiter_config.md)) 
in the related data property of the event and the event will be rendered in all specified sections:

~~~js
scheduler.createTimelineView({
	name: "timeline",
	y_unit: [
		{key: 1, label: "James Smith"},
		{key: 2, label: "John Williams"},
		{key: 3, label: "David Miller"},
		{key: 4, label: "Linda Brown"}],
	y_property: "section_id", /*!*/
	...
});
scheduler.init('scheduler_here', new Date(2012, 5, 30), "timeline");

scheduler.parse([
	{ id:1, text:"Task A", section_id:'1', 		...},/*!*/
	{ id:2, text:"Task B", section_id:'1,3', 	...},/*!*/
	{ id:3, text:"Task C", section_id:'4', 		...},/*!*/
	{ id:4, text:"Task D", section_id:'2,3,4', 	...}/*!*/
],"json");
~~~

{{sample
12_multisection_events/01_multisection_events.html
}}


View Modes
---------------------------
The view has 4 modes:

- **Bar**<br> <img src="timeline_bar_mode.png"/><br> {{sample 06_timeline/02_lines.html}} <br> <br>
- **Cell**(default)<br> <img src="timeline_cell_mode.png"/><br> {{sample 06_timeline/01_slots.html}}  <br> <br>
- **Tree**<br> <img src="timeline_tree_mode.png"/><br> {{sample 06_timeline/03_tree.html}} <br> <br>
- **Days**<br> <img src="timeline_days_mode.png"/><br> {{sample 06_timeline/14_days_as_sections.html}}

The needed mode is set by the parameter [render](api/scheduler_createtimelineview.md):
~~~js
scheduler.createTimelineView({
	name: "timeline",
	...
	render: "bar"
});
~~~

'Days' mode details
----------------------------------------
While working with the Days mode, please remember the following things: 

<ol>
	<li>Time scale must cover 1 day exactly. If your configuration specifies a shorter or longer period - timeline will be rendered incorrectly:
~~~js
scheduler.createTimelineView({
	name:	"timeline", 
    render:"days", 
	days:7,   
    //time scale is configured to cover 1 day /*!*/
	x_unit:	"minute", /*!*/
	x_date:	"%H:%i",/*!*/
	x_step:	30,/*!*/
	x_size: 24,/*!*/
	x_start: 16/*!*/
});
~~~
	</li>
    <li>The mode doesn't supports <a href="limits.md">Blocking and Marking functionality</a></li>
    <li>
    The format of the Y-Axis labels is specified by the <a href="api__scheduler_%7Btimelinename%7D_scale_label_template.html">scale_label</a> template:
~~~js
scheduler.templates.timeline_scale_label = function(key, label, section){
    // specifies the same labels as in the Day view
	return scheduler.templates.day_date(label); 
};
~~~
	</li>
    <li>To change the start day of the displayable interval, use the **scheduler.date.{timeline_name}_start** function:
~~~js
scheduler.date.timeline_start = function (date) {
	date = scheduler.date.week_start(date);
	date = scheduler.date.add(date, config.x_step*config.x_start, config.x_unit); 
	return date;
};
~~~
    </li>
</ol>



Setting the time interval for the view cells
------------------------------------------------------
By default, cells of the view have a one-day interval and locate events inside, according to this time. To change the default interval (for example, to leave only working hours and remove rarely used ones), use one of 2 ways:

<ol>
	<li>the <a href="api/scheduler_createtimelineview.md">first_hour</a> and <a href="api/scheduler_createtimelineview.md">last_hour</a> parameters:

~~~js
//the cell interval will be a day-time from 10.00 till 18.00
scheduler.createTimelineView({
	name:"timeline",
    ...
	first_hour:10,
	last_hour:18

});
~~~

{{sample
	11_scales/06_timeline_hours.html
}}
	</li>
    <li>the <b>ignore_timeline</b> property. It is a function that takes the cell date as a parameter, and 'removes' the hours for which the 'true' value is returned:

~~~js
//the cell interval will be a day-time from 10.00 till 18.00
scheduler.ignore_timeline = function(date){
	//non-working hours
	if (date.getHours() < 10 || date.getHours() > 18) return true;
};
~~~

{{sample
	11_scales/04_timeline_ignore.html
}}
	</li>
</ol>

<br>

<img src="timeline_scale_interval.png"/>

Data for the Y-Axis sections in the 'Bar' and 'Cell' modes
-------------------------------------------

To set values for the Y-Axis in the 'Bar' and 'Cell' modes, use the [y_unit](api/scheduler_createtimelineview.md) parameter:

~~~js
scheduler.createTimelineView({
	name:"timeline",
    ...
	y_unit:[
		{key:1, label:"James Smith"},
		{key:2, label:"John Williams"},
		{key:3, label:"David Miller"},
		{key:4, label:"Linda Brown"}
	]
});
~~~

To be correctly processed, [y_unit](api/scheduler_createtimelineview.md) items must have 2 mandatory properties:

- **key** - the item's id
- **label** - the item's label

Data for the Y-Axis sections in the 'Tree' mode
-------------------------------------------

The 'Tree' mode allows grouping items by creating multi-level folders. In addition to more convenient representation, it allows you to specify an event not only for individual event holder, but also for the whole folder (any level).

<br>

To set values for the 'Tree' timeline, use the same [y_unit](api/scheduler_createtimelineview.md) parameter that is used in the 'Bar' and 'Cell' modes, but with a wider set of properties:

~~~js
scheduler.createTimelineView({
    name:   "timeline",
    render:"tree",
    ...
    y_unit:[
    	{key:"production", label:"Production Department", children:[
			{key:"p1", label:"Managers", children:[
				{key:"pm1", label:"John Williams"},
				{key:"pm2", label:"David Miller"}
			]},
			{key:"p2", label:"Linda Brown"},
			{key:"p3", label:"George Lucas"}
		]},
		{key:"sales", label:"Sales and Marketing", children:[
			{key:"s1", label:"Kate Moss"},
			{key:"s2", label:"Dian Fossey"}
		]}
    ]
});
~~~

The [y_unit](api/scheduler_createtimelineview.md) items have:

- 2 mandatory properties:
  - **key** - the item's id
  - **label** - the item's label
- 2 optional properties:
  - **open** - specifies, whether the section will be opened initially
  - **children** - an array of nested items' objects

Data for the Y-Axis sections in the 'Days' mode
-------------------------------------------
To set values for the Y-Axis in the 'Days' mode, use the [days](api/scheduler_createtimelineview.md) parameter:

~~~js
scheduler.createTimelineView({
	name:"timeline",
    ...
	days:7 //the number of items (i.e. days) in the Y-Axis
});
~~~



Data for the Y-Axis sections from the server
-------------------------------------------
To load Y-Axis sections from the server, use:

- On the client side -  the api/scheduler_serverlist.md method:

~~~js
scheduler.createTimelineView({
    name:"timeline",
    ...
    y_unit:scheduler.serverList("sections"),
});
~~~
*where api/scheduler_serverlist.md  returns a list of options with the name 'sections'*.

- On the server side 

The data response for the api/scheduler_load.md method should contain a collection with the server list name specified in JSON
[of the following format](data_formats.md#jsonwithcollections).

You can also use the [OptionsConnector](http://docs.dhtmlx.com/doku.php?id=dhtmlxconnector:optionsconnector) connector:

~~~php
<?php
    include('connector-php/codebase/scheduler_connector.php');//includes the file

	$res=mysql_connect("localhost","root","");//connects to the server with our DB
	mysql_select_db("sampleDB");//connects to the DB.'sampleDB' is the DB's name

	$list = new OptionsConnector($res, $dbtype);
	$list->render_table("types","type_id","type_id(value),name(label)");
	
	$scheduler = new schedulerConnector($res, $dbtype);
	//we set the same name that was used on the client side - 'sections'
	$scheduler->set_options("sections", $list); 
	$scheduler->render_table("events","id","start_date,end_date,text,type_id");
?>
~~~

<img src="server_list_db.png"/>

The data response should have the [JSON format](data_formats.md#jsonwithcollections) that includes
the "collections" hash of necessary collections to be referenced through the api/scheduler_serverlist.md method.

<br>

Note, you can create a collection manually, instead of using dhtmlxConnector. In this case, to update the collection, use the api/scheduler_updatecollection.md method:

~~~js
scheduler.updateCollection("sections", new_sections_array);
~~~

{{sample
	03_extensions/17_connector_units.html
}}


##Adding/deleting items dynamically

To add/delete items on the fly, use the following methods:

- api/scheduler_addsection.md 
- api/scheduler_deletesection.md

~~~js
scheduler.createTimelineView({
    name:   "timeline",
    render:"tree",
    ...
    y_unit:[
    	{key:"production", label:"Production Department", children:[
			{key:"p1", label:"Managers", children:[
				{key:"pm1", label:"John Williams"},
				{key:"pm2", label:"David Miller"}
			]},
			{key:"p2", label:"Linda Brown"},
			{key:"p3", label:"George Lucas"}
		]},
		{key:"sales", label:"Sales and Marketing", children:[
			{key:"s1", label:"Kate Moss"},
			{key:"s2", label:"Dian Fossey"}
		]}
    ]
});
scheduler.addSection( {key:"pm3", label:"James Smith"}, "p1");
scheduler.addSection( {key:"s3", label:"Alex White"}, "sales");
scheduler.deleteSection("p3");
~~~
{{note
To use the api/scheduler_addsection.md and api/scheduler_deletesection.md methods, the 'Tree' timeline must be currently opened in the scheduler.
}}

Second X-Axis
----------------------------------
The second X-Axis is placed on top of the default one and serves to group time intervals of the original scale.

<img src="timeline_second_axis.png"/>

You can add the second scale by using the [second_scale](api/scheduler_createtimelineview.md) parameter: 

~~~js
 scheduler.createTimelineView({
	name:	"timeline",
	...
	second_scale:{
		x_unit: "day", // the measuring unit of the axis (by default, 'minute')
		x_date: "%F %d" //the date format of the axis ("July 01")
	}
});
~~~


{{sample
	06_timeline/07_second_scale.html
}}



Stretching events upon the entire cell width
----------------------------------------------
To make an event occupy the entire cell width, no matter how long this event lasts, use the [round_position](api/scheduler_createtimelineview.md) parameter:

~~~js
scheduler.createTimelineView({
    name:   "timeline",
    render:"bar",
    ...
    round_position:true
});
~~~

**round_position:false**(default behavior)

<img src="stretching_events_01.png"/>



**round_position:true**

<img src="stretching_events_02.png"/>

Sorting events
-------------------------------------------
By default, the Timeline view sorts events by the start date. If you want to apply a custom sorting rule, define the related logic in a function and set this function as the value
of the [sort](api/scheduler_createtimelineview.md) parameter:


This function will be called for each pair of adjacent values and return 1,-1 or 0:



- **1** - an object with the first value in pair must go before the second one;
- **-1** - the second object goes before the first one;
- **0** - the objects are equal.

{{snippet
Sorting by the text length
}}
~~~js
scheduler.createTimelineView({
    name:   "timeline",
    render:"bar",
    ...
    sort:function(a, b){
		if (a.text.length > b.text.length) {
			// display a before b
			return -1;
		} else if(a.text.length < b.text.length) {
        	return 1;
        } else{
			return +a.start_date > +b.start_date ? 1 : -1;
		}
	}
});
~~~







Related guides
----------------------------------------

- configuration.md
- timeline_view_templates.md
- loading_data.md
- limits.md
- skins.md
- localization.md


@edition: pro
