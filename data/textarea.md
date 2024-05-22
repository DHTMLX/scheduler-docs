Textarea
======================================
A multiline text field.

<img src="textarea_editor.png"/>

~~~js
scheduler.locale.labels.section_text = 'Text';

scheduler.config.lightbox.sections = [
	{ name:"text", height:50, map_to:"text", type:"textarea", focus:true },
	{ name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

{{sample
	01_initialization_loading/01_basic_init.html
}}

Initialization
-----------------------
One Textarea control is added to the lightbox by default. To add another one, follow these steps:
<ol>
    <li><b>Add the section to the lightbox configuration:</b>
~~~js
scheduler.config.lightbox.sections = [
	{ name:"text", ... },
   	{ name:"location", height:50, map_to:"location", type:"textarea"},
	{ name:"time", ...}
];
~~~
	</li>
    <li><b>Set the label for the section:</b>
~~~js
scheduler.locale.labels.section_location = "Location";
~~~
	</li>
</ol>

        

{{sample
	03_extensions/19_map_view.html
}}

Properties
---------------------------------------------
The following properties are mostly important and commonly set for the 'textarea' control (see the full list <a href="api/scheduler_lightbox_config.md">here</a>):

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
			<td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) the type of the section's control</td>
		</tr>
		<tr>
			<td class="webixdoc_links0"><b>placeholder</b></td>
			<td>(<i>string</i>) the placeholder value for an empty textarea</td>
		</tr>
    </tbody>
</table>