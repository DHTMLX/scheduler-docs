---
sidebar_label: "getLabel"
title: "getLabel method"
description: "ruiert das Label eines Select-Controls in der Lightbox ab"
---

# getLabel

### Description

@short: Ruiert das Label eines Select-Controls in der Lightbox ab

@signature: getLabel: (property: string, key: string|number) =\> string

### Parameters

- `property` - (required) *string* - der Name der mit dem Control verknüpften Daten-Eigenschaft
- `key` - (required) *string | number* - die ID der Option. Dieser Wert wird mit der Daten-Eigenschaft des Events abgeglichen, <br> um die mit einem Event verknüpfte Select-Option zu identifizieren

### Returns
- ` label` - (string) - das Label, das einer Option eines Select-Controls in der Lightbox entspricht

### Example

~~~jsx
scheduler.config.lightbox.sections=[
    {name:"custom", type:"select", map_to:"unit_id", options:[
        {key:1, label:"James Smith"}, 
        {key:2, label:"John Williams"}]},
        // weitere Optionen
];

var holder2 = scheduler.getLabel("unit_id", 2);// ->"John Williams"
~~~

### Related samples
- [Multiselect control in the lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/21_multiselect_options.html)

### Details

:::note

Diese Methode funktioniert ausschließlich mit Select-Controls in der Lightbox, um das Label einer bestimmten Option abzurufen.
 
:::

<br>

Zum Beispiel kann diese Methode verwendet werden, um anzupassen, wie der Text eines Events angezeigt wird:

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
