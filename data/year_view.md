
 Year view 
==============
The Year view presents a single or more years of the calendar.

<img src="year_view.png"/>

{{sample
	03_extensions/04_year_view.html
}}

Initialization
-------------------------------
To add the Year view  to the scheduler, follow these steps:

<ol>
	<li><b>Include the Year code file on the page:</b>
~~~js
<script src="../codebase/ext/dhtmlxscheduler_year_view.js" ></script>
~~~
    </li>
    <li> <b>Add the view's tab to the scheduler's markup:</b>
~~~html
<div id="scheduler_here" class="dhx_cal_container" ...>
	<div class="dhx_cal_navline">
	   ...
	   <div class="dhx_cal_tab" name="year_tab" style="right:280px;"></div>
    </div>
	...	
</div>
~~~
	</li>
    <li><b>Set the label for the tab:</b>
~~~js
//'year_tab' is the name of our div
scheduler.locale.labels.year_tab ="Year"; 
~~~
	</li>
</ol>

{{sample
	03_extensions/04_year_view.html
}}



GUI details 
---------------------------------------------------------

- Dates which have some events assigned are highlighted. 
- Hovering over a date will show the tooltip with a list of all assigned events. You can click on the 'details' icon inside the tooltip to open the lightbox (if only the readonly mode is not activated).



Setting the number of months in the view
------------------------------------------------

To define the number of months in a row and a column, use the api/scheduler_year_x_config.md and api/scheduler_year_y_config.md properties:

~~~js
//the Year view will display only 6 months
scheduler.config.year_x = 2; //2 months in a row
scheduler.config.year_y = 3; //3 months in a column

~~~


Related guides
----------------------------------------

- configuration.md
- year_view_templates.md
- loading_data.md
- event_object_operations.md
- limits.md
- skins.md
