createTimelineView
=============

@short: 
	creates the Timeline view in the scheduler


@params:
- config		object		the configuration object of the Timeline view


@example: 
// the time scale from 8 AM to 8 PM with a 30-minute step
scheduler.createTimelineView({
     name:		"timeline",
     x_unit:	"minute",
     x_date:	"%H:%i",
     x_step:	30,
     x_size:	24,
     x_start:	16,
     x_length:	48,
     y_unit:[	
     	{key:1, label:"Section A"},
        {key:2, label:"Section B"},
        {key:3, label:"Section C"},
        {key:4, label:"Section D"}	
     ],
     y_property: "section_id",
     render:	"bar"
});



@template:	api_method
@require:timeline
@views:timeline
@relatedsample:
	06_timeline/01_slots.html
	06_timeline/02_lines.html
    06_timeline/03_tree.html
    
@descr: 
The configuration object of the Timeline view can have the following properties:

<table class="webixdoc_links">
	<tbody>
    	<tr>
			<td class="webixdoc_links0"><b>name</b></td>
			<td>(<i>string</i>) the view's id. If you specify the name of some already existing Timeline view, it will be overwritten</td>
		</tr>
       <tr>
			<td class="webixdoc_links0"><b>render</b></td>
			<td>(<i>'cell', 'bar', 'tree'</i>) the view's mode. By default, 'cell'</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>y_property</b></td>
			<td>(<i>string</i>) the name of a data property that will be used to assign events to certain sections</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"  style="vertical-align: top;"><b>y_unit</b></td>
			<td>(<i>array of objects</i>) defines sections of the view.<br> Each object in the array specifies a single section and takes these properties:
            	<ul>
                    <li><b>open</b> - (<i>array</i>) an array of nested items' objects (for 'Tree' mode only)</li>
					<li><b>key</b> - (<i>string</i>) the section's id. This attribute is compared with the event's data property to assign the event to a section</li>
					<li><b>label</b> - (<i>string</i>) the section's label</li>
                    <li><b>open</b> - (<i>boolean</i>) specifies whether the section will be opened initially (for 'Tree' mode only)</li>
				</ul>
             </td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>days</b></td>
			<td>(<i>number</i>) a number of items(days) in the Y-Axis. Applicable to the 'Days' mode only</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>x_unit</b></td>
			<td>(<i>minute, hour, day, week, month, year</i>) the measuring unit of the X-Axis. By default, 'minute'</td>
		</tr>
        <tr>
        	<td class="webixdoc_links0"><b>x_date</b></td>
			<td>(<i>string</i>) the date format of the X-Axis (settings_format.md). If not specified,  the api/scheduler_hour_date_config.md format is used</td>
        </tr>
        <tr>
			<td class="webixdoc_links0"><b>x_step</b></td>
			<td>(<i>number</i>) the X-Axis step in <b>'x_unit'</b>s. By default, 1</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>x_start</b></td>
			<td>(<i>number</i>) the X-Axis offset in <b>'x_unit'</b>s. By default, 0</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>x_size</b></td>
			<td>(<i>number</i>) the X-Axis length specified as the total number of <b>'x_step'</b>s. By default, 24</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"  style="vertical-align: top;"><b>x_length</b></td>
			<td>(<i>number</i>) the number of <b>'x_step'</b>s that will be scrolled at a time, when the user clicks on the 'next' button in the scheduler's header. Optional. By default, 1. 
            It's a bit knotty parameter, and to not make a mistake, remember the following:
            	<ul>
					<li>You can use the parameter only if <b>x_unit='minute'</b> or <b>x_unit='hour'</b>. In other cases, the parameter doesn't need specifying at all.</li>
					<li>If <b>x_unit='minute'</b> or <b>x_unit='hour'</b> and you don't specify <b>x_length</b>, the X-Axis will display the time interval (not the whole day, as usual) 
                    specified by the remaining scale parameters (<b>x_start</b>, <b>x_step</b>, <b>x_size</b>). This allows you to divide a day into equal time intervals and scroll them with the 'next' button.</li>
					<li>If <b>x_unit='minute'</b> or <b>x_unit='hour'</b> and you decide to set the parameter, set it to all day (i.e. <b>x_length</b> should be equal to the number of <b>x_steps</b> needed to fill the whole day) 
                    to provide correct work of the 'next' button.</li>
                </ul>
             </td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>first_hour</b></td>
			<td>(<i>number</i>) sets the start hour of the cell's time interval. The attribute is applicable only if <b>x_unit="day"</b></td>
		</tr>        
        <tr>
			<td class="webixdoc_links0"><b>last_hour</b></td>
			<td>(<i>number</i>) sets the end hour of the cell's time interval. The attribute is applicable only if <b>x_unit="day"</b></td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>show_unassigned</b></td>
			<td>(<i>boolean</i>) if <i>false</i>, events which belong to none of the sections won't be displayed. If <i>true</i> - such events will be placed to the first section. By default - <i>false</i>. Optional</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>section_autoheight</b></td>
			<td>(<i>boolean</i>) enables automatic height adjustment for cells. By default, <i>true</i> </td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>dy</b></td>
			<td>(<i>number</i>) the minimum height of cells (if the <b>section_autoheight</b> property has value <i>false</i>, the height of cells will be equal to <b>dy</b>, otherwise the height of cells will be increased to fill all free space). By default, 50</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>dx</b></td>
			<td>(<i>number</i>) the width of the column with the sections' names. By default, 200 </td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>event_dy</b></td>
			<td>(<i>number/string</i>)the height of events. Can have the <b>'full'</b> value and occupy the entire cell. By default, equal to <b>scheduler.xy.bar_height-5</b> </td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>event_min_dy</b></td>
			<td>(<i>number</i>)  the minimum event height. By default, equal to <b>scheduler.xy.bar_height-5</b> </td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>resize_events</b></td>
			<td>(<i>boolean</i>) specifies whether the height of individual events should be decreased, to make the total height equal to the height of one single event (but not less than the value of the <b>event_min_dy</b> property). By default, <i>true</i> </td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>fit_events</b></td>
			<td>(<i>boolean</i>) specifies whether the section's height should be increased, to fit all events in this section, or should be fixed (the <b>dy</b> parameter). Available from version 3.0. By default, <i>true</i> </td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>round_position</b></td>
			<td>(<i>boolean</i>)'stretches' the events all over the entire cell width, no matter how long the event lasts. By default, <i>false</i>. For 'Bar' and 'Tree' modes only </td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>folder_events_available</b></td>
			<td>(<i>boolean</i>) should be set as <i>true</i>, if you want to have the possibility to specify events not only for an individual holder, but also for the whole folder (any level). Applicable to the 'Tree' mode only. By default, <i>false</i> </td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>folder_dy</b></td>
			<td>(<i>number</i>) the height of folders in pixels (folders are sections that have child sections). Applicable to the 'Tree' mode only </td>
		</tr>
        <tr>
			<td class="webixdoc_links0" style="vertical-align: top;"><b>second_scale</b></td>
			<td>(<i>object</i>) adds the second X-Axis on the top of the default one and serves to group time intervals on the original scale. Optional. Available from version 3.0. <br> The scale object has the following properties: 
            	<ul>
                	<li><b>x_unit</b> - (<i>minute, hour, day, week, month, year</i>) the measuring unit of the axis. By default, 'minute'</li>
					<li><b>x_date</b> - (<i>string</i>) the date format of the axis (settings_format.md). If not specified,  the api/scheduler_hour_date_config.md format is used</li>
				</ul>
            </td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>scrollable</b></td>
			<td>(<i>boolean</i>) enables horizontal scroll in the Timeline view, false by default. If <i>false</i> or undefined, date columns will shrink to fit the time scale into the viewport width.
            If <i>true</i>, date columns will not shrink less than the <b>column_width</b> value, a horizontal scroll bar will appear when necessary.</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>column_width</b></td>
			<td>(<i>boolean</i>) defines the minimal width of timeline date columns, 100 by default</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>scroll_position</b></td>
			<td>(<i>Date</i>) renders timeline scrolled to a specific position, takes the same arguments as <b>timeline.scrollTo()</b>, i.e. the date you want timeline to be scrolled to after rendering</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>autoscroll</b></td>
			<td>(<i>object</i>) allows configuring sensibility and speed of autoscroll. The autoscroll object has the properties below:
            	<ul>
                	<li><b>range_x</b> - (<i>number</i>) horizontal autoscroll distance from the edge of the data area</li>
                	<li><b>range_y</b> - (<i>number</i>) vertical autoscroll distance from the edge of the data area</li>
                    <li><b>speed_x</b> - (<i>number</i>) horizontal autoscroll speed</li>
                    <li><b>speed_y</b> - (<i>number</i>) vertical autoscroll speed</li>
                </ul>
            </td>
		</tr>          
    </tbody>
</table>


Dynamic change of properties
-------------------------------------

All defined timeline objects are stored in the **scheduler.matrix** object.
You can access the configuration of any timeline view by its name and change any property. Changes will be applied as soon as you update the scheduler:

~~~js
scheduler.matrix["timeline"].x_size = 12;
scheduler.setCurrentView(); // redraws scheduler
~~~


where "timeline" is the name of the timeline view as specified in the api/scheduler_createtimelineview.md method:

~~~js
scheduler.createTimelineView({
	name:"timeline",
	...
});
~~~

@edition:pro

@todo:
check new timeline properties