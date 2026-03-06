---
sidebar_label: "getLabel"
title: "getLabel method"
description: "получает label (метку) элемента управления select в lightbox"
---

# getLabel

### Description

@short: Получает label (метку) элемента управления select в lightbox

@signature: getLabel: (property: string, key: string|number) =\> string

### Parameters

- `property` - (required) *string* - имя свойства данных, связанного с элементом управления
- `key` - (required) *string | number* - id опции. Это значение сопоставляется со свойством данных события <br> для идентификации опции select, связанной с событием

### Returns
- ` label` - (string) - метка, соответствующая опции элемента управления select в lightbox

### Example

~~~jsx
scheduler.config.lightbox.sections=[
    {name:"custom", type:"select", map_to:"unit_id", options:[
        {key:1, label:"James Smith"}, 
        {key:2, label:"John Williams"}]},
        // другие опции
];

var holder2 = scheduler.getLabel("unit_id", 2);// ->"John Williams"
~~~

### Related samples
- [Multiselect control in the lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/21_multiselect_options.html)

### Details

:::note

Этот метод работает исключительно с элементами управления select в lightbox для получения метки определённой опции.
 
:::

<br>

Например, этот метод можно использовать для кастомизации отображения текста события:

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
