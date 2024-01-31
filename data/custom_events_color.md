Custom Event's Color
============================

There are three ways you can specify a custom color for an event:

1. [To set color values in properties of the event object](custom_events_color.md#specifyingcolorsinpropertiesoftheeventobject);
2. [To attach additional CSS class(es) to the event](custom_events_color.md#attachingadditionalcssclassestoanevent).
2. [To generate styles from data](custom_events_color.md#loadingcolorswithdata).

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
   {id:1, start_date:"2019-05-21",end_date:"2019-05-25",text:"Task1", color:"red"},
   {id:2, start_date:"2019-06-02",end_date:"2019-06-05",text:"Task2", color:"blue"}
],"json");
...
scheduler.getEvent(1).color = "yellow";
scheduler.updateEvent(1);
~~~

Note, these are special properties. By default, the scheduler always checks whether an event has them and if it does, applies the related values to the event's container and text. 
Otherwise, the scheduler uses predefined colors for the event.


The properties can have any valid CSS color value, e.g. all of the following notations are valid:

~~~js
ev.color = "#FF0000";
ev.color = "red";
ev.color = "rgb(255,0,0)";
~~~


##Attaching additional CSS classes to an event
The second way to color an event is to apply additional CSS class(es) to it. 

###Technique

To apply a CSS class to an event, use the api/scheduler_event_class_template.md template.<br>
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
	<li>Specify the related CSS classes for these types, e.g. named as 'manager_event' and 'employee_event'. For such names, CSS definition will look as in:<br> <br>
{{snippet
Redefining the default CSS classes
}}

~~~html
<style>
    .manager_event {
        --dhx-scheduler-event-background: #009966;
        --dhx-scheduler-event-color: black;
    }

    .employee_event {
        --dhx-scheduler-event-background: #FF9933;
        --dhx-scheduler-event-color: black;
    }
</style>
~~~

For older versions of Scheduler (v6.0 and earlier), CSS variables are not available and events can be colored with following styles:

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
Applying additional CSS classes to events:
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

##Loading colors with data

If colors are a part of your data which comes from the backend, e.g. when task color is associated with a stage or a resource assigned to a task which can't be hardcoded on the page, it may be a good solution to generate styles from your data manually.

Let's suppose that you have the following collection of users that can be assigned to tasks. Task styles should be defined by the properties of user records:

~~~js
[
    {"key":1, "label":"John", "backgroundColor":"#03A9F4", "textColor":"#FFF"},
    {"key":2, "label":"Mike", "backgroundColor":"#f57730", "textColor":"#FFF"},
    {"key":3, "label":"Anna", "backgroundColor":"#e157de", "textColor":"#FFF"},
    {"key":4, "label":"Bill", "backgroundColor":"#78909C", "textColor":"#FFF"},
    {"key":7, "label":"Floe", "backgroundColor":"#8D6E63", "textColor":"#FFF"}
]
~~~

In this use case, users and their colors are created and managed by different parts of the app and scheduler generally doesn't know user ids and their colors in advance.

This is what you can do in this case:

- Define a named serverList for this collection

~~~js
scheduler.serverList("people");
~~~

- Load options to the page, either by using one of supported [data formats](data_formats.md#jsonwithcollections) or manually via a custom xhr

- Once options are loaded, you can generate CSS styles from the data:

~~~js
scheduler.attachEvent("onLoadEnd", function(){
    // use an arbitrary id for the style element
    var styleId = "dynamicSchedulerStyles";
 
    // in case you'll be reloading options with colors - reuse previously
    // created style element
 
    var element = document.getElementById(styleId);
    if(!element){
        element = document.createElement("style");
        element.id = styleId;
        document.querySelector("head").appendChild(element);
    }
    var html = [];
    var resources = scheduler.serverList("people");
 
    // generate css styles for each option and write css into the style element,
 
    resources.forEach(function(r){
        html.push(`.event_resource_${r.key} {
            --dhx-scheduler-event-background:${r.backgroundColor};
            --dhx-scheduler-event-color:${r.textColor};
        }`);
    });
    element.innerHTML = html.join("");
});
~~~

- After that you'll be able to assign related classes you generated from the class template:

~~~js
scheduler.templates.event_class = function (start, end, event) {
    var css = [];
 
    if(task.owner_id){
        css.push("event_resource_" + event.owner_id);
    }
 
    return css.join(" ");
};
~~~