 Units view 
==============
The Units view is a view, where X-Axis is based on some property of events (not only on time). 

<img src="units_view.png"/>

Initialization
---------------------
To add the Units view to the scheduler, follow these steps:

<ol>
	<li><b>Include the Units code file on the page:</b>
~~~js
<script src="codebase/ext/dhtmlxscheduler_units.js"></script>
~~~
    </li>
    <li> <b>Add the view's tab to the scheduler's markup:</b>
~~~html
<div id="scheduler_here" class="dhx_cal_container" ...>
	<div class="dhx_cal_navline">
	   ...
	   <div class="dhx_cal_tab" name="unit_tab" style="right:280px;"></div>
    </div>
	...	
</div>
~~~
	</li>
    <li><b>Set the label for the tab:</b>
~~~js
//'unit_tab' is the name of our div
scheduler.locale.labels.unit_tab = "Unit"
~~~
	</li>
    <li> <b>Call the api/scheduler_createunitsview.md method:</b>
~~~js
scheduler.createUnitsView({
    name:"unit",
    property:"unit_id", //the mapped data property
    list:[              //defines the units of the view
        {key:1, label:"Section A"},
        {key:2, label:"Section B"},
        {key:3, label:"Section C"}  
    ]
});
~~~
	</li>
</ol>

{{sample
	03_extensions/02_units_view.html
}}


Loading data to the view
----------------------------------
Unlike basic views (such as Day, Month, Year etc.), multiple-resource views(that are Units and Timeline) require data items to have one more mandatory field:

* [property](api/scheduler_createunitsview.md) - (string) the name of a data property that will be used to assign events to certain units

~~~js
scheduler.createUnitsView({
    name:"unit",
    property:"unit_id", 
    list:[             
        {key:1, label:"Section A"},
        {key:2, label:"Section B"},
        {key:3, label:"Section C"}  
    ]
});

scheduler.init('scheduler_here');
scheduler.parse([
	{id:1, text:"Task1", start_date:"17/09/2012 12:00", end_date:"18/09/2012 21:00", 
    unit_id:"1"},
 	{id:2, text:"Task2", start_date:"17/09/2012 09:00", end_date:"17/09/2012 21:00", 
    unit_id:"3"},
 	{id:3, text:"Task3", start_date:"17/09/2012 15:00", end_date:"18/09/2012 15:00", 
    unit_id:"2"}
],"json");                                 
~~~
By comparing **unit_id** and **list.key** values, the scheduler assigns events to certain units.

{{sample
	03_extensions/02_units_view.html
}}

Displaying units for multiple days 
-------------------------------------
To display units for multiple days, use  the [days](api/scheduler_createunitsview.md) parameter:

~~~js
scheduler.createUnitsView({
	name:"week_unit",
	property:"section_id",
	list:sections,
	days:3 /*!*/
});
~~~

<img src="multiday_units.png"/>

{{sample 03_extensions/31_units_view_multiple_days.html}}

<br>

A scale with days is appeared as the 2nd horizontal scale.<br> To set the format of the 2nd horizontal scale, use the scheduler.templates[name+"_second_scale_date"] template:

~~~js
scheduler.templates.units_second_scale_date = function(date) {
	return scheduler.templates.week_scale_date(date);
};
~~~

Note, 

<ol>
	<li>The 1st scale is specified as usual, with the <a href="api__scheduler_%7Bunitsname%7D_scale_text_template.html">scale_text_template</a> template. 
    The height of the scale can be set with the <a href="api/scheduler_xy_other.md">scale_height</a> config.
	<li>You can hide unnecessary time units in the 2nd horizontal scale of a view using a common approach - custom_scales.md</li>
    <li> <a href="api/scheduler_createunitsview.md">size</a> and <a href="api/scheduler_createunitsview.md">step</a> parameters won't work with multiday units</li>
    <li>Exporting to PDF can be implemented  only with the <a href="pdf.md">new service</a> and not possible with <a href="pdf_v4.md">old export tools</a></li>
    <li>To change the start day of the displayable interval, use the <b>scheduler.date.{units_name}_start</b> function:
~~~js
scheduler.date.units_start = function (date) {
    return scheduler.date.week_start(date);
};
~~~
</li>
</ol> 




Assigning events to several units
--------------------------------------------------------------

Starting from version 4.1, you have a possibility to assign events to several units.

<img src="multiple_sections.png"/>

<br>

To enable the possibility: 

1. Include the "ext/dhtmlxscheduler_multisection.js" file on the page
2. Set the api/scheduler_multisection_config.md property to *true*
3. (Optional) Include "ext/dhtmlxscheduler_multiselect.js" file on the page to use multiselect.md control in the scheduler (a comfortable way to switch between sections)

~~~js
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="codebase/ext/dhtmlxscheduler_multisection.js"></script> /*!*/
<link rel="stylesheet" href="codebase/dhtmlxscheduler.css" type="text/css">

<script src="codebase/ext/dhtmlxscheduler_units.js"></script>
<script src="codebase/ext/dhtmlxscheduler_multiselect.js"></script>

<script>
	scheduler.config.multisection = true; /*!*/
	scheduler.init('scheduler_here');
</script>
~~~



After this,  you can specify several sections ([ by default, delimited with a comma](api/scheduler_section_delemiter_config.md)) in the related data property of the event and the event will be rendered in all specified units:

~~~js
scheduler.createUnitsView({
	name: "unit",
	list: [
		{key: 1, label: "James Smith"},
		{key: 2, label: "John Williams"},
		{key: 3, label: "David Miller"},
		{key: 4, label: "Linda Brown"}],
	property: "section_id", /*!*/
	...
});
scheduler.init('scheduler_here', new Date(2012, 5, 30), "unit");

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


Data for the X-Axis sections
-------------------------------------------

To set values for the X-Axis, use the [list](api/scheduler_createunitsview.md) parameter:

~~~js
scheduler.createUnitsView({
	name:"unit",
    ...
	list:[
        {key:1, label:"Section A"},
        {key:2, label:"Section B"},
        {key:3, label:"Section C"} 
	]
});
~~~

To be correctly processed, [list](api/scheduler_createunitsview.md) items must have 2 mandatory properties:

- **key** - the item's id
- **label** - the item's label

Data for the X-Axis sections from the server
-------------------------------------------
To load X-Axis data (sections) from the server, use:

- On the client side -  the api/scheduler_serverlist.md method:

~~~js
scheduler.createUnitsView({
    name:"unit",
    property:"type_id",
    list:scheduler.serverList("units"),
    size:20,                                     
    step:1
});
~~~
*where api/scheduler_serverlist.md  returns a list of options with the name 'units'*.

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
	//we set the same name as used on the client side - 'units'
	$scheduler->set_options("units", $list); 
	$scheduler->render_table("events","id","start_date,end_date,text,type_id");
?>
~~~

<img src="server_list_db.png"/>

<br>
Note, you can create a collection manually, instead of using dhtmlxConnector. In this case, to update the collection, use the api/scheduler_updatecollection.md method:

~~~js
scheduler.updateCollection("units", new_sections_array);
~~~

{{sample
	03_extensions/17_connector_units.html
}}

Scrolling Units
------------------------
If you have many units, you can enable horizontal scrolling by using the [size](api/scheduler_createunitsview.md), [step](api/scheduler_createunitsview.md) properties:

~~~js
scheduler.createUnitsView({
	name:"unit",
	...
	size:10,//the number of units that should be shown in the view 
	step:5  //the number of units that will be scrolled at once
});

~~~


Skipping events that don't belong to any of the units
---------------------------------------------------------
By default, if some event belongs to none of the defined units, it's presented in the first unit. Starting from the version 3.0, you have the possibility to skip such events and not display them at all. 
  
To do this, use property [skip_incorrect]( api/scheduler_createunitsview.md):

~~~js 
scheduler.createUnitsView({
	name:"unit",
	...
    skip_incorrect:true
});

~~~


Related guides
----------------------------------------

- configuration.md
- units_view_templates.md
- loading_data.md
- event_object_operations.md
- limits.md
- skins.md


@edition: pro
