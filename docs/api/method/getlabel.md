---
sidebar_label: getLabel
title: "getLabel method"
description: "gets the label of a select control in the lightbox"
---

# getLabel

### Description

@short: Gets the label of a select control in the lightbox

@signature: getLabel: (property: string, key: string|number) =\> string

### Parameters

- `property` - (required) *string* - the name of a data property that the control is mapped to
- `key` - (required) *string | number* - the option's id. This parameter is compared with the event's data property <br> to assign the select's option to an event

### Returns
- ` label` - (string) - the label of a select control in the lightbox

### Example

~~~jsx
scheduler.config.lightbox.sections=[
    {name:"custom", type:"select", map_to:"unit_id", options:[
        {key:1, label:"James Smith"}, 
        {key:2, label:"John Williams"}]},
        // more options
];

var holder2 = scheduler.getLabel("unit_id", 2);// ->"John Williams"
~~~

### Related samples
- [Multiselect control in the lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/21_multiselect_options.html)

### Details

:::note

The method is applied only to select controls in the lightbox, to get the label of a specific option.
 
:::

<br>

For example, you can use the method to change the template of displaying the event's text:

~~~js
scheduler.templates.event_text = function(start, end, event){
    return event.text + " ("+scheduler.getLabel("unit_id",event.unit_id) +")";
};

scheduler.init('scheduler_here',new Date(2013,5,30),"unit");
scheduler.parse([
 {start_date:"06/30/2013 09:00",end_date:"06/30/2013 12:00",text:"TaskA",unit_id:1},
 {start_date:"06/30/2013 12:00",end_date:"06/30/2013 20:00",text:"TaskB",unit_id:2},
 {start_date:"06/30/2013 08:00",end_date:"06/30/2013 12:00",text:"TaskC",unit_id:2}
],"json");

~~~

![getlabel_method_copy](/img/getlabel_method_copy.png)
