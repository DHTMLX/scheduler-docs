
 Map View 
==============
The Map view presents a list of upcoming events and Google Maps to show or edit the event's location or to set the location for new events.

<img src="map_view.png"/>

{{sample
	03_extensions/19_map_view.html
}}

{{note
By default, the left list of the view displays events beginning from the current date. To change such behavior, use the api/scheduler_map_start_config.md, api/scheduler_map_end_config.md properties.
}}



Initialization
-------------------------------
To add the Map view  to the scheduler, follow these steps:

<ol>
	<li><b>Include the Map view and Google Maps code files on the page:</b>
~~~js
<script src="http://maps.google.com/maps/api/js?sensor=false"></script> 
<script src="../codebase/ext/dhtmlxscheduler_map_view.js"></script>
~~~
    </li>
    <li> <b>Add the view's tab to the scheduler's markup:</b>
~~~html
<div id="scheduler_here" class="dhx_cal_container" ...>
	<div class="dhx_cal_navline">
	   ...
	   <div class="dhx_cal_tab" name="map_tab" style="right:280px;"></div>
    </div>
	...	
</div>
~~~
	</li>
    <li><b>Set the label for the tab:</b>
~~~js
//'map_tab' is the name of our div
scheduler.locale.labels.map_tab = "Map";
~~~
	</li>
    <li><b>Add an additional section to the lightbox to manage the event location:</b>
~~~js
scheduler.config.lightbox.sections=[	
	{name:"description", height:50,map_to:"text", type:"textarea", focus:true},
	{name:"location", height:43, map_to:"event_location", type:"textarea"},
	{name:"time", height:72, type:"time", map_to:"auto"}	
]

~~~
	</li>
    <li><b>Set the label for the section:</b>
~~~js
scheduler.locale.labels.section_location = "Location";
~~~
	</li>    
    <li><b>Initialize the scheduler:</b>
~~~js
//'map' is the default name of the Map view
scheduler.init('scheduler_here',new Date(2013,8,1),"map");
~~~
	</li>
</ol>

{{sample
	03_extensions/24_week_agenda.html
}}


Requirements to data items
-------------------------------------------
To be correctly rendered on the Map view, data items must contain a number of additional properties. The final list of mandatory properties (that data items should have) looks as in:

- **start_date** (*Date* or *string*) - the date when the event is scheduled to begin. The default format - '%m/%d/%Y %H:%i'.
- **end_date** (*Date* or *string*) - the date when the event is scheduled to be completed. The default format - '%m/%d/%Y %H:%i'.
- **text** (*string*) - the event's text.
- **location** - (*string*) the location of an event.
- **lat** - (*number*) the latitude of the event's location.
- **lng** - (*number*) the longitude of the event's location.
  
{{note
Make sure that your .php file conforms to your database data.
}}


GUI details 
-------------------------------------------

- Selected events are highlighted. If the selected event occupies several days, all related records are highlighted. 
- To create a new event -  double click on an empty cell in the list or on the desired location on the map.
- To edit or delete an event - double click on the 'details' icon on the left side of the event's description. 
- To overview event - click on the event's marker on the map.

Localization tips
----------------------------------------------
The Map view has 4 labels defined in the locale:

- **scheduler.locale.labels.{mapName}_tab** - the name of the map's tab
- **scheduler.locale.labels.section_{sectionName}** - the section label in the lightbox
- **scheduler.locale.labels.marker_geo_success** - the text in the marker's tooltip in case of successful geolocation response
- **scheduler.locale.labels.marker_geo_fail** -  the text in the marker's tooltip in case of unsuccessful geolocation response


The 2 first labels are commonly specified, while adding the view tab to the scheduler, but the remaining marker labels should be redefined, only if 
you localize the application to a language, different from English.

Map-related configuration options
---------------------------------------

###scheduler.config object

{{links
- api/scheduler_map_end_config.md - sets the date to display events until
- api/scheduler_map_error_position_config.md - sets the position that will be displayed on the map, in case the event location can't be identified
- api/scheduler_map_infowindow_max_width_config.md - the maximum width of the Google Maps's popup marker in the Map view
- api/scheduler_map_initial_position_config.md - sets the initial position of the map
- api/scheduler_map_initial_zoom_config.md - sets the initial zoom of Google Maps in the Map view
- api/scheduler_map_resolve_event_location_config.md - activates attempts to resolve the event's location, if the database doesn't have the event's coordinates stored
- api/scheduler_map_resolve_user_location_config.md - enables/disables prompts, asking the user to share his location for displaying on the map
- api/scheduler_map_start_config.md - sets the date to start displaying events from
- api/scheduler_map_type_config.md - sets the type of Google Maps
- api/scheduler_map_zoom_after_resolve_config.md - sets the zoom that will be used to show the user's location, if the user agrees to the browser's offer to show it
}}

###scheduler.xy object

<a href="api/scheduler_xy_other.md">scheduler.xy.map_date_width</a> - the width of the date column<br>
<a href="api/scheduler_xy_other.md">scheduler.xy.map_description_width</a> - the width of the description column

Related guides
----------------------------------------

- configuration.md
- map_view_templates.md
- loading_data.md
- skins.md
- localization.md

