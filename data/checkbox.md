 Checkbox 
==============

A two-state check box.

<img src="checkbox_editor.png"/>

~~~js        
scheduler.locale.labels.section_checkme = "I'm going to participate"; 	
			
scheduler.config.lightbox.sections = [
	{ name:"text", height:50, map_to:"text", type:"textarea", focus:true },
	{ name:"checkme", map_to:"participation", type:"checkbox", 
    checked_value: "registrable", unchecked_value: "unchecked", height:40 },
	{ name:"time", height:72, type:"time", map_to:"auto"}
];
~~~            
{{sample
	02_customization/13_single_checkbox_section.html
}}

Initialization
-----------------------
To add the Checkbox control to the lightbox, follow these steps:

<ol>
	<li><b>Include the 'ext/dhtmlxscheduler_editors.js' extension file on the page:</b>
~~~js
<script src="../codebase/ext/dhtmlxscheduler_editors.js"></script>

~~~
	</li>
    <li><b>Add the section to the lightbox configuration:</b>
~~~js
scheduler.config.lightbox.sections = [
	{ name:"description", ... },
	{ name:"checkme", map_to:"single_checkbox", type:"checkbox", 
    checked_value: "registrable", height:40},
    { name:"time", ...}
];
~~~
	</li>
    <li><b>Set the label for the section:</b>
~~~js
scheduler.locale.labels.section_checkme = "I'm going to participate"; 
~~~
	</li>
</ol>
     
{{sample
	02_customization/13_single_checkbox_section.html
}}

Properties
---------------------------------------------
The following properties are mostly important and commonly set for the 'checkbox' control (see the full list <a href="api/scheduler_lightbox_config.md">here</a>):

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
			<td class="webixdoc_links0"><b>checked_value</b></td>
			<td>(<i>boolean</i>) the value of the checkbox in the checked state. Optional. By default, <i>true</i></td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>unchecked_value</b></td>
			<td>(<i>boolean</i>) the value of the checkbox in the unchecked state. Optional. By default, <i>false</i></td>
		</tr>
    </tbody>
</table>

