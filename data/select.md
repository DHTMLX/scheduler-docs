Select 
====================================

<img src="select_editor.png"/>

~~~js
var alert_opts = [
	{ key: 1, label: 'None' },
	{ key: 2, label: 'On start date' },
	{ key: 3, label: '1 day before' }
];
            
scheduler.locale.labels.section_select = 'Alert';

scheduler.config.lightbox.sections = [
	{ name:"text", height:50, map_to:"text", type:"textarea", focus:true },
	{ name:"select", height:40, map_to:"type", type:"select", options:alert_opts},
	{ name:"time", height:72, type:"time", map_to:"auto"}
];
~~~            
{{sample
	01_initialization_loading/08_options.html
}}

Initialization
-----------------------
To add the Select control to the lightbox, follow these steps:

<ol>
    <li><b>Add the section to the lightbox configuration:</b>
~~~js
scheduler.config.lightbox.sections = 
	{ name:"description", ... },
	{ name:"alert", height:40,map_to:"type",type:"select", options:alert_opts},
	{ name:"time", ...}
];
~~~
	</li>
    <li><b>Set the label for the section:</b>
~~~js
scheduler.locale.labels.section_select = "Alert";
~~~
	</li>
</ol>

        

{{sample
	01_initialization_loading/08_options.html
}}

Properties
---------------------------------------------
The following properties are mostly important and commonly set for the 'select' control (see the full list <a href="api/scheduler_lightbox_config.md">here</a>):

<table class="webixdoc_links">
	<tbody>
    	<tr>
			<td class="webixdoc_links0"><b>name</b></td>
			<td>(<i>string</i>) section's name </td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>height</b></td>
			<td>(<i>number</i>) section's height</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>map_to</b></td>
			<td>(<i>string</i>) the name of a data property that will be mapped to the section</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>type</b></td>
			<td>(<i>textarea,time,select,template,multiselect,radio,checkbox</i>) the type of the section's control</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"  style="vertical-align: top;"><b>options</b></td>
			<td>(<i>array of objects</i>) defines select options of the control (<b>for 'select', 'multiselect, 'radio' controls</b>).<br> Each object in the array specifies a single option and takes these properties:
            	<ul>
					<li><b>key</b> -   (<i>string</i>) the option's id. This attribute is compared with the event's data property to assign options to events</li>
					<li><b>label</b> -   (<i>string</i>) the option's label</li>
			</ul>
             </td>
		</tr>
    </tbody>
</table>


Populating the control with data
-------------------------------------------

Generally, to set values for the Select control you should use the [options](api/scheduler_lightbox_config.md) parameter:

~~~js
scheduler.config.lightbox.sections = 
	{  	name:"alert", type:"select", 
        ...
    	options:[
			{ key: 1, label: 'None'},
			{ key: 2, label: 'On start date'},
			{ key: 3, label: '1 day before'}
	]},
    ...
];
~~~

Items in the  [options](api/scheduler_lightbox_config.md) parameter must have 2 mandatory properties:

- **key** - the option's id
- **label** - the option's label

Populating the control with data from the server
------------------------------------------------------
To populate the control from the server, set the [options](api/scheduler_lightbox_config.md) option
to the value returned by the api/scheduler_serverlist.md method:

~~~js
scheduler.config.lightbox.sections = [
	{name:"description", ...},
	{name:"type",map_to:"type",type:"select",options:scheduler.serverList("type")},
	{name:"time", ...}
];

scheduler.load("./data/types.php");
~~~

where the **types.php** is a server-side script, retrieving the events loaded to the scheduler, and the 'type' options collection loaded to the Select control:

~~~php
//types.php
<?php
	require_once('../../../../connector-php/codebase/scheduler_connector.php');
	include ('../../common/config.php');

	$list = new OptionsConnector($res, $dbtype);
	$list->render_table("types","typeid","typeid(value),name(label)");
	
	$scheduler = new schedulerConnector($res, $dbtype);
	$scheduler->set_options("type", $list);
	$scheduler->render_table(
        "tevents",
        "event_id",
        "start_date,end_date,event_name,type"
    );
?>
~~~

{{sample
	01_initialization_loading/09_connector_options.html
}}

{{note
Note, you can use the api/scheduler_updatecollection.md method to update the list of retrieving options
}}

####Retrieving JSON data from the server
To retrieve data from the server in JSON format, you need to:

- Client side: specify the 2nd parameter in the api/scheduler_init.md method and set it to 'json' value

~~~js
scheduler.config.lightbox.sections = [
	{name:"description", ...},
	{name:"type",map_to:"type",type:"select",options:scheduler.serverList("type")},
	{name:"time", ...}
];

scheduler.load("./data/types.php", 'json');
~~~
- Server side: use the JSONOptionsConnector connector

~~~js
<?php
	require_once('../../../../connector-php/codebase/scheduler_connector.php');
	include ('../../common/config.php');

	$list = new JSONOptionsConnector($res, $dbtype);
	$list->render_table("types","typeid","typeid(value),name(label)");
?>
~~~

{{sample
	01_initialization_loading/09_connector_options.html
}}