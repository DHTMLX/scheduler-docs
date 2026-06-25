---
sidebar_label: getLabel
title: "getLabel method"
description: "возвращает метку элемента управления select в лайтбоксе"
---

# getLabel

### Description

@short: Получает метку элемента select в лайтбоксе

@signature: getLabel: (property: string, key: string|number) =\> string

### Parameters

- `property` - (required) *string* - имя свойства данных, к которому привязан контрол
- `key` - (required) *string | number* - идентификатор опции. Этот параметр сопоставляется со свойством данных события <br> для привязки опции селекта к событию

### Returns
- ` label` - (string) - метка элемента управления select в лайтбоксе

### Example

~~~jsx
scheduler.config.lightbox.sections=[
    {name:"custom", type:"select", map_to:"unit_id", options:[
        {key:1, label:"James Smith"}, 
        {key:2, label:"John Williams"}]},
        // другие опции
];

const holder2 = scheduler.getLabel("unit_id", 2);// ->"John Williams"
~~~

### Related samples
- [Multiselect control in the lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/21_multiselect_options.html)

### Details

:::note

Метод применяется только к элементам select в лайтбоксе, чтобы получить метку конкретной опции.
 
:::

<br>

Например, вы можете использовать метод, чтобы изменить шаблон отображения текста события:

~~~js
scheduler.templates.event_text = function(start, end, event){
    return event.text + " ("+scheduler.getLabel("unit_id",event.unit_id) +")";
};

scheduler.init('scheduler_here',new Date(2027,5,30),"unit");
scheduler.parse([
 {start_date:"06/30/2027 09:00",end_date:"06/30/2027 12:00",text:"TaskA",unit_id:1},
 {start_date:"06/30/2027 12:00",end_date:"06/30/2027 20:00",text:"TaskB",unit_id:2},
 {start_date:"06/30/2027 08:00",end_date:"06/30/2027 12:00",text:"TaskC",unit_id:2}
],"json");

~~~

![getlabel_method_copy](/img/getlabel_method_copy.png)