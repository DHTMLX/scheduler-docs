Grid View 
==============

{{pronote
This view is available in the Scheduler PRO version only.
}}

The Grid view presents a list of upcoming events and, unlike the Agenda view, allows configuring any number of columns.

<img src="grid_view.png"/>

{{sample
	03_extensions/27_grid_view.html
}}

Initialization
---------------------
To add the Grid view to the scheduler, follow these steps:

<ol>
	<li><b>Activate the "grid view" extension on the page:</b>
~~~js
scheduler.plugins({
    grid_view: true
});
~~~
    </li>
    <li> <b>Add the view's tab to the scheduler's markup:</b>
~~~html
<div id="scheduler_here" class="dhx_cal_container" ...>
	<div class="dhx_cal_navline">
	   ...
	   <div class="dhx_cal_tab" name="grid_tab" style="right:300px;"></div>
    </div>
	...	
</div>
~~~
	</li>
    <li><b>Set the label for the tab:</b>
~~~js
//'grid_tab' is the name of our div
scheduler.locale.labels.grid_tab = "Grid";
~~~
	</li>
    <li> <b>Call the api/scheduler_creategridview.md method:</b> 
~~~js
scheduler.createGridView({
    name:"grid",
    fields:[    // defines columns of the grid
        {id:"id",   label:'Id',   sort:'int',  width:80,  align:'right'},
        {id:"date", label:'Date', sort:'date', width:'*'},
        {id:"text", label:'Text', sort:'str',  width:200, align:'left'}
    ],
    from:new Date(2019, 3, 10),//left border of the allowable date range
    to:new Date(2019, 5, 23)    //right border of the allowable date range
});
~~~
	</li>
</ol>

{{sample
	03_extensions/27_grid_view.html
}}



Limiting date range
--------------------------
The extension allows limiting active dates, so that the users won't be able to get the dates beyond the range. 

If, for example, you want to to limit active dates and set the allowable range from **1st January, 2010** to **1st January, 2011** , define the following configuration:


~~~js
scheduler.createGridView({
 	name:"grid",
    ..
    from:new Date(2019, 0, 1),
    to:new Date(2020, 0, 1)
});

~~~

Activating navigation
-----------------------------------------
To activate navigation with buttons <img src="navigation_buttons.png"/> in the grid, enable the [paging](api/scheduler_creategridview.md) property:


~~~js
scheduler.createGridView({
    name:"grid",
	...
	paging:true
});
~~~
{{sample
03_extensions/27_grid_view.html
}}

<br>

Once the navigation is enabled, when the user clicks on  <img src="navigation_buttons.png"/>  buttons - 
the grid will be scrolled 1 month forward/backward. 


To change the default time interval scrolled at a time, use the **unit** and **step** properties:

- **unit** - (<i>minute, hour, day, week, month, year</i>) the scrolling time unit. By default, 'month'
- **step** - (<i>number</i>) the number of **unit**s scrolled at a time. By default, 1. 


~~~js
//scrolling 2 weeks at a time
scheduler.createGridView({
    name:"grid",
	...
	paging:true,
    unit:"week",
    step:2
});
~~~

Sorting
---------------------------
When you click on the header, the grid starts to display a special control indicating, which column the table is currently sorted by and the direction of this sorting (ascending or descending).<br>
Each next click on the same header will reverse the sorting direction.

Columns can have different type of content (numbers, strings, dates) and each type of content requires its specific way of sorting.

For this purpose, the view provides 3 sorting types to ensure correct sorting of columns:

1. **int**;
2. **date**;
3. **str**.


To enable sorting and assign the appropriate sorting type to a column, use the [sort](api/scheduler_creategridview.md) property.


~~~js
scheduler.createGridView({
	name:"grid",
    fields:[
		{id:"date",  label:'Date', sort:'date'},
        {id:"text",  label:'Text', sort:'str'}
	]
});

~~~


Custom sorting functions
-----------------------------------------------

If you want to apply a custom sorting behavior, define the related logic in a function and set this function as the value of parameter [sort](api/scheduler_creategridview.md).

This function will be called for each pair of adjacent values and return 1,-1 or 0:



- **1** - an object with the first value in pair must go before the second one;
- **-1** - the second object goes before the first one;
- **0** - the objects are equal.

The function can be defined in a general way:


~~~js
scheduler.createGridView({
	name:"grid",
    fields:[
    	{id:"id",   label:'Id',	  sort: sortById},
        {id:"text", label:'Text', sort:'str'}
    ]
});

function sortById(a,b){
	a = a.id;
	b = b.id;
	return a>b?1:(a<b?-1:0);
}
~~~


Data Templates
----------------------------
By default, columns display data of a property that specified as **id**  of a column.
  
To customize data content, you can use templates. In such a case, the column will be populated with data returned by the template function.
  
  
Data templates are set in the related column by the property [template](api/scheduler_creategridview.md). 


~~~js
scheduler.createGridView({
	name:"grid",
    fields:[
      {id:"date",label:'Date',template:function(start,end,ev){return "1# "+ev.text}},
       ...
	]
});

~~~


The template function takes 3 parameters:

- **start** - the start date of an event
- **end** - the end date of an event
- **ev** - the event object



Related guides
----------------------------------------

- configuration.md
- grid_view_templates.md
- loading_data.md
- event_object_operations.md
- limits.md
- skins.md

@edition: pro
