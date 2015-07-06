xy
=============
@short:specifies sizes of the scheduler's elements
	

@type:object	

@example:
scheduler.xy.scale_height = 25;//sets the height of the X-Axis
...
scheduler.init('scheduler_here',new Date(),"month");

@template:	api_config
@descr:
The **xy** object has the following properties:

<table class="list" cellspacing="0" cellpadding="5" border="0">
	<thead>
	<tr>
		<th>
			Property
		</th>
		<th>
			Description
		</th>
		<th>
			Default value
		</th>
		<th>
			Applicable views
		</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td><a href="#month">bar_height</a></td>
		<td>the height of day cells in the month view</td>
		<td>20</td>
		<td>month</td>
	</tr>
	<tr>
		<td><a href="#week">editor_width</a></td>
		<td>the width of the event's text input</td>
		<td>140</td>
		<td>day, week, units</td>
	</tr>
	<tr>
		<td><a href="#lightbox">lightbox_additional_height</a></td>
		<td>increases the length of the lightbox</td>
		<td>50</td>
		<td>all views</td>
	</tr>
	<tr>
		<td><a href="#map">map_date_width</a></td>
		<td>the width of the date column in the Map view</td>
		<td>188</td>
		<td>map</td>
	</tr>
	<tr>
		<td><a href="#map">map_description_width</a></td>
		<td>the width of the description column in the Map view</td>
		<td>400</td>
		<td>map</td>
	</tr>
	<tr>
		<td><a href="#month">margin_left</a></td>
		<td>the left margin of the main scheduler area</td>
		<td>0</td>
		<td>all views</td>
	</tr>
	<tr>
		<td><a href="#month">margin_top</a></td>
		<td>the bottom margin of the main scheduler area</td>
		<td>0</td>
		<td>all views</td>
	</tr>
	<tr>
		<td><a href="#week">menu_width</a></td>
		<td>the width of the selection menu</td>
		<td>25</td>
		<td>day, week, units</td>
	</tr>
	<tr>
		<td><a href="#week">min_event_height</a></td>
		<td>the minimal height of the event's box</td>
		<td>40</td>
		<td>day, week, units</td>
	</tr>
	<tr>
		<td><a href="#month">month_scale_height</a></td>
		<td>the top offset of an event in a cell in the month view</td>
		<td>20</td>
		<td>month</td>
	</tr>
	<tr>
		<td><a href="#day">nav_height</a></td>
		<td>the height of the navigation bar</td>
		<td>22</td>
		<td>all views</td>
	</tr>
	<tr>
		<td><a href="#day">scale_height</a></td>
		<td>the height of the X-Axis</td>
		<td>20</td>
		<td>all views</td>
	</tr>
	<tr>
		<td><a href="#day">scale_width</a></td>
		<td>the width of the Y-Axis</td>
		<td>50</td>
		<td>day, week, timeline, units</td>
	</tr>
	<tr>
		<td><a href="#day">scroll_width</a></td>
		<td>the width of the scrollbar area</td>
		<td>18</td>
		<td>all views</td>
	</tr>
	</tbody>
</table>


{{note
Note, all the **xy'** properties have the data type 'number'.
}}

##Illustration images

<h3 id="month">Month view</h3> 
<img src="api/month_xy_property.png"/>


<h3 id="week">Week view</h3> 
<img src="api/week_xy_property.png"/>


<h3 id="day">Day view</h3> 
<img src="api/day_xy_property.png"/>


<h3 id="map">Map view</h3> 
<img src="api/map_xy_property.png"/>


<h3 id="lightbox">Lightbox</h3> 
<img src="api/lightbox_xy_property.png"/>