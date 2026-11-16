---
title: "Custom Event's Color"
sidebar_label: "Custom Event's Color"
---

# Custom Event's Color

There are three ways you can specify a custom color for an event:

1. [To set color values in properties of the event object](guides/custom-events-color.md#specifying-colors-in-properties-of-the-event-object);
2. [To attach additional CSS class(es) to the event](guides/custom-events-color.md#attaching-additional-css-classes-to-an-event).
2. [To generate styles from data](guides/custom-events-color.md#loading-colors-with-data).

![custom_event_color](/img/custom_event_color.png)

## Specifying colors in properties of the event object

To specify a custom color for an event, it's enough to add 2 extra properties to the data object (or just one of them):

- **textColor** - specifies the event's font color;
- **color** - specifies the event's background color.

![custom_color_model](/img/custom_color_model.png)

Setting the event's color in the data object:
~~~js
scheduler.parse([
   {id:1, start_date:"2027-05-21",end_date:"2027-05-25",text:"Task1", color:"red"},
   {id:2, start_date:"2027-06-02",end_date:"2027-06-05",text:"Task2", color:"blue"}
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


## Attaching additional CSS classes to an event
The second way to color an event is to apply additional CSS class(es) to it. 

### Technique

To apply a CSS class to an event, use the [event_class](api/template/event_class.md) template.


The default implementation of the template is:

~~~js
scheduler.templates.event_class = function(start, end, ev){
     return "";
}
~~~
*The function returns a string that will be added to the event class. So, you can return different classes depending on the event's state.*


[Coloring events](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)


### Example
Let's assume, you want to have the events assigned to managers and employees in different colors: for managers - in green color, for employees - in orange. In this case, you do 2 things:

1. Add an additional data property to the model and name it, for example 'type'. The property will store the type of the user : 'manager' or 'employee'. 

 ![extended_data_model](/img/extended_data_model.png)
2. Specify the related CSS classes for these types, e.g. named as 'manager_event' and 'employee_event'. For such names, CSS definition will look as in:

[Redefining the default CSS classes](Redefining the default CSS classes)

~~~html

    .manager_event {
        --dhx-scheduler-event-background: #009966;
        --dhx-scheduler-event-color: black;
    }

    .employee_event {
        --dhx-scheduler-event-background: #FF9933;
        --dhx-scheduler-event-color: black;
    }

~~~

For older versions of Scheduler (v6.0 and earlier), CSS variables are not available and events can be colored with following styles:

~~~html

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

~~~
3. And finally, override the [event_class](api/template/event_class.md) template 

 


[Applying additional CSS classes to events:](Applying additional CSS classes to events:)
~~~js
scheduler.templates.event_class = function (start, end, event) {
    if (event.type == 'manager') return "manager_event";
    return "employee_event"; 
};
~~~


[Coloring events](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)


[Styling events with templates](https://docs.dhtmlx.com/scheduler/samples/02_customization/06_templates.html)


## Loading colors with data

If colors come from the backend, use event groups instead of generating a stylesheet. A group collection can describe people, stages, resources, or any other event category.

~~~js
[
    {"key":1, "label":"John", "color":"#03A9F4", "textColor":"#FFF"},
    {"key":2, "label":"Mike", "color":"#f57730", "textColor":"#FFF"}
]
~~~

Configure the collection and the event property once. Collections received in JSON can be passed in `parse()`, and later updates use `updateCollection()`.

~~~js
scheduler.config.event_groups = { list: "people", property: "owner_id" };
scheduler.init("scheduler_here");
scheduler.parse({
    data: [{ id: 1, text: "Task", start_date: "2027-05-21 09:00", end_date: "2027-05-21 10:00", owner_id: 1 }],
    collections: { people: [{ key: 1, label: "John", color: "#03A9F4", textColor: "#FFF" }] }
});

// Replaces colors and labels from a later server response.
scheduler.updateCollection("people", [
    { key: 1, label: "John", color: "#1565c0", textColor: "#fff" }
]);
~~~

Scheduler resolves background and text color independently. An event's `color` or `textColor` wins, followed by a CSS rule that sets the related event variable, then the event-group color, and finally the active theme. Keep `event_class` CSS rules when the styling depends on more than a collection value.
