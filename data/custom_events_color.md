Custom Event's Color
============================

There are 2 ways you can specify a custom color for an event:

1. [To set color values in properties of the event object](custom_events_color.md#specifyingcolorsinpropertiesoftheeventobject);
2. [To attach additional css class(es) to the event](custom_events_color.md#attachingadditionalcssclassestoanevent).

<img src="custom_event_color.png"/>

##Specifying colors in properties of the event object

To specify a custom color for an event, it's enough to add 2 extra properties to the data object (or just one of them):

- **textColor** - specifies the event's font color;
- **color** - specifies the event's background color.

<img src="custom_color_model.png"/>

{{snippet
Setting the event's color in the data object
}}
~~~
scheduler.parse([
   {id:1, start_date:"2013-05-21",end_date:"2013-05-25",text:"Task1", color:"red"},
   {id:2, start_date:"2013-06-02",end_date:"2013-06-05",text:"Task2", color:"blue"}
],"json");
...
scheduler.getEvent(1).color = "yellow";
scheduler.updateEvent(1);
~~~

Note, these are special properties. By default, the scheduler always checks whether an event has them and if it does, applies the related values to the event's container and text. 
Otherwise, the scheduler uses predefined colors for the event.


The properties can have any valid css color value, e.g. all of the following notations are valid:

~~~js
ev.color = "#FF0000";
ev.color = "red";
ev.color = "rgb(255,0,0)";
~~~


##Attaching additional css classes to an event
The second way to color an event is to apply additional css class(es) to it. 

###Technique

To apply a css class to an event, use the api/scheduler_event_class_template.md template.<br>
The default implementation of the template is:

~~~js
scheduler.templates.event_class = function(start, end, ev){
     return "";
}
~~~
*The function returns a string that will be added to the event class. So, you can return different classes depending on the event's state.*

{{sample
	02_customization/01_events_coloring.html
}}

###Example
Let's assume, you want to have the events assigned to managers and employees in different colors: for managers - in green color, for employees - in orange. In this case, you do 2 things:

<ol>
	<li>Add an additional data property to the model and name it, for example 'type'. The property will store the type of the user : 'manager' or 'employee'. <br> <img src="extended_data_model.png"/></li>
	<li>Specify the related css classes for these types, e.g. named as 'manager_event' and 'employee_event'. For such names, css definition will look as in:<br> <br>
{{snippet
Redefining the default css classes
}}
~~~html
<style>
	/*event in day or week view*/
    .dhx_cal_event.manager_event div{
    	background-color: #009966 !important;
        color: black !important;
    }
	.dhx_cal_event.employee_event div{
		background-color: #FF9933 !important;
		color: black !important;
	}
 
    /*multi-day event in month view*/
    .dhx_cal_event_line.manager_event{
    	background-color: #009966 !important;
		color: black !important;
	}
	.dhx_cal_event_line.employee_event{
    	background-color: #FF9933 !important;
		color: black !important;
	}
 
	/*event with fixed time, in month view*/
	.dhx_cal_event_clear.manager_event{
    	color: black !important;
	}
	.dhx_cal_event_clear.employee_event{
    	color: black !important;
	}
</style>
~~~
    </li>
    <li>And finally, override the api/scheduler_event_class_template.md template <br> <br>
{{snippet
Applying additional css classes to events:
}}
~~~js
scheduler.templates.event_class = function (start, end, event) {
	if (event.type == 'manager') return "manager_event";
    return "employee_event"; 
};
~~~
</li>
</ol>

{{sample
	02_customization/01_events_coloring.html
}}

{{sample
	02_customization/06_templates.html
}}
