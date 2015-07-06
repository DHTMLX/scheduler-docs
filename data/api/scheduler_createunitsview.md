createUnitsView
=============

@short:creates the Units view in the scheduler
	

@params:
- config	object	the configuration object of the Units view


@example: 
scheduler.createUnitsView({
	name:"unit",
	property:"unit_id",
	list:[
		{key:1, label:"Section A"},
		{key:2, label:"Section B"},
		{key:3, label:"Section C"}	
	]
});

scheduler.init('scheduler_here',new Date(2009,5,30),"unit");

scheduler.parse([
 {start_date:"06/30/2009 09:00",end_date:"06/30/2009 12:00",text:"Task1",unit_id:1},
 {start_date:"06/30/2009 12:00",end_date:"06/30/2009 20:00",text:"Task2",unit_id:3},
 {start_date:"06/30/2009 08:00",end_date:"06/30/2009 12:00",text:"Task3",unit_id:2}
],"json");

@template:	api_method

@relatedsample:
	03_extensions/02_units_view.html
    03_extensions/17_connector_units.html

@require:units_view
@views:units

@descr:
The configuration object of the Units view can have the following properties:
<table class="webixdoc_links">
	<tbody>
    	<tr>
			<td class="webixdoc_links0"><b>name</b></td>
			<td>(<i>string</i>) the view's id. If you specify the name of some already existing Units view - it will be overwritten</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>property</b></td>
			<td>(<i>string</i>) the name of a data property that will be used to assign events to certain units</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"  style="vertical-align: top;"><b>list</b></td>
			<td>(<i>array of objects</i>) defines units of the view.<br> Each object in the array specifies a single unit and takes these properties:
            	<ul>
					<li><b>key</b> -   (<i>string</i>) the unit's id. This attribute is compared with the event data property to assign the event to a unit</li>
					<li><b>label</b> -   (<i>string</i>) the unit's label</li>
			</ul>
             </td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>days</b></td>
			<td>(<i>number</i>) a number of items(days) in the Y-Axis</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>skip_incorrect</b></td>
			<td>(<i>boolean</i>) if <i>true</i>, events which belong to none of the units won't be displayed. If <i>false</i> - such events will be assigned to the first unit. By default - <i>false</i>. Optional</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>size</b></td>
			<td>(<i>number</i>) the number of units that should be shown in the view (if the real count exceeds this value, scroll bar will be shown). Optional</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>step</b></td>
			<td>(<i>number</i>) the number of units that will be scrolled at once. Optional</td>
		</tr>
    </tbody>
</table>

@edition:pro

