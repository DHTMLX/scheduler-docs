 Radio 
==============

A set of radio buttons

<img src="radio_editor.png"/>

{{note
Enable the **editors** extension to use the control in the lightbox
}}


~~~js
scheduler.plugins({
    editors: true /*!*/
});

var priorities = [
	{ key: 1, label: 'High' },
	{ key: 2, label: 'Medium' },
	{ key: 3, label: 'Low' }
];
            
scheduler.locale.labels.section_priority = 'Priority';

scheduler.config.lightbox.sections = [
	{ name:"text", height:50, map_to:"text", type:"textarea", focus:true },
	{ name:"priority", height:58, options:priorities, 
    			map_to:"priority", type:"radio", vertical:true},
	{ name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

{{sample
	02_customization/14_radio_buttons_section.html
}}


Initialization
-----------------------
To add the Radio control to the lightbox, follow these steps:

<ol>
	<li><b>Enable the 'editors' extension on the page:</b>
~~~js
scheduler.plugins({
    editors: true
});
~~~
	</li>
    <li><b>Add the section to the lightbox configuration:</b>
~~~js
scheduler.config.lightbox.sections = [
	{ name:"description", ... },
	{ name:"radiobutton", height:58, options:priorities, 
    map_to:"priority", type:"radio", vertical:true},
    { name:"time", ...}
];
~~~
	</li>
    <li><b>Set the label for the section:</b>
~~~js
scheduler.locale.labels.section_priority = 'Priority';
~~~
	</li>
</ol>
     
{{sample
	02_customization/14_radio_buttons_section.html
}}

Properties
---------------------------------------------
The following properties are mostly important and commonly set for the 'radio' control (see the full list <a href="api/scheduler_lightbox_config.md">here</a>):

<table class="webixdoc_links">
	<tbody>
    	<tr>
			<td class="webixdoc_links0"><b>name</b></td>
			<td>(<i>string</i>) the section's name </td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>height</b></td>
			<td>(<i>number</i>) the section's height</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>map_to</b></td>
			<td>(<i>string</i>) the name of a data property that will be mapped to the section</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>type</b></td>
			<td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) the type of the section's control</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"  style="vertical-align: top;"><b>options</b></td>
			<td>(<i>array of objects</i>) defines select options of the control (<b>for 'select', 'multiselect', 'radio', 'combo' controls</b>).<br> Each object in the array specifies a single option and takes these properties:
            	<ul>
					<li><b>key</b> -   (<i>string</i>) the option's id. This attribute is compared with the event's data property to assign options to events</li>
					<li><b>label</b> -   (<i>string</i>) the option's label</li>
			</ul>
             </td>
		</tr>
		<tr>
			<td class="webixdoc_links0"><b>vertical</b></td>
			<td>(<i>boolean</i>) specifies, whether radio buttons should be placed vertically(<i>true</i>) or horizontally  (<b>for the 'multiselect' and 'radio'  controls</b>)</td>
		</tr>
    </tbody>
</table>



Populating the control with data
-------------------------------------------

Generally, to set values for the radio buttons you should use the [options](api/scheduler_lightbox_config.md) parameter:

~~~js
scheduler.config.lightbox.sections = 
	{  	name:"alert", type:"select", 
        ...
    	options:[
			{ key: 1, label: 'High' },
			{ key: 2, label: 'Medium' },
			{ key: 3, label: 'Low' }
	]},
    ...
];
~~~

Items in the  [options](api/scheduler_lightbox_config.md) parameter must have 2 mandatory properties:

- **key** - the option's id
- **label** - the option's label

Getting the radio buttons values from the server
------------------------------------------------------
To set values for radio buttons, using data retrieved from the server, use the api/scheduler_serverlist.md method:

~~~js
scheduler.config.lightbox.sections = [
	{name:"description", ...},
	{name:"priority", map_to:"priority", type:"radio", 
          options:scheduler.serverList("priority")},
	{name:"time", ...}
];

scheduler.load("./data/types.php");
~~~


The data response for the api/scheduler_load.md method should contain a collection with the server list name specified in JSON
[of the following format](data_formats.md#jsonwithcollections):

~~~js
{ 
   "data":[
      {
          "id":"1",
          "start_date":"2019-03-02 15:00:00",
          "end_date":"2019-03-04 16:00:00",
          "text":"Interview",
          "priority":1
      },
      {
          "id":"2",
          "start_date":"2019-03-02 17:00:00",
          "end_date":"2019-03-04 18:00:00",
          "text":"Performance review",
          "type":2
      }
   ], 
   "collections": {/*!*/
      "type":[/*!*/      
         {"value":1,"label":"Low"},/*!*/
         {"value":2,"label":"Medium"},/*!*/
         {"value":3,"label":"High"}/*!*/
      ]/*!*/
   }/*!*/
}

~~~

If you use [PHP Connector](https://github.com/DHTMLX/connector-php) library, the server code may look like the following:

~~~php
//types.php
<?php
	require_once('../../../../connector-php/codebase/scheduler_connector.php');
	include ('../../common/config.php');

	$list = new JSONOptionsConnector($res, $dbtype);
	$list->render_table("types","typeid","typeid(value),name(label)");
	
	$scheduler = new JSONSchedulerConnector($res, $dbtype);
	$scheduler->set_options("type", $list);
	$scheduler->render_table(
        "tevents",
        "event_id",
        "start_date,end_date,event_name,type"
    );
?>
~~~

{{note
Note, you can use the api/scheduler_updatecollection.md method to update the list of retrieved options
}}


Event handling for the Radio Control
------------------------------------

By default, dhtmlxScheduler API doesn't provide any specific event handlers for radio buttons in the Scheduler lightbox.

But you can assign a click handler for the Lightbox Radio controls like this:

1\.  Get radio elements after the lightbox will be opened.

~~~js

scheduler.attachEvent("onLightbox", function(){
    var node = scheduler.formSection("type").node;
    var radios = node.getElementsByTagName("input");
    ...
});
~~~

2\. Attach the <b>onclick</b> event to the found radio buttons of Lightbox.

~~~js

scheduler.attachEvent("onLightbox", function(){
	...
    for(var i = 0; i < radios.length; i++){
      radios[i].onclick = onRadioClick; 
    }
});
~~~

3\. Finally, you should specify a function that will be executed after clicking the radio button.

~~~js
function onRadioClick(event){
	var e = event || window.event,
        node = this;
  
	dhtmlx.message(node.value);
}
~~~

{{editor	https://snippet.dhtmlx.com/5/5b62dd79e	Event handling for the Radio Control}}