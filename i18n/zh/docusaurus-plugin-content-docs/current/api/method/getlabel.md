---
sidebar_label: "getLabel"
title: "getLabel method"
description: "获取 lightbox 中 select 控件的标签"
---

# getLabel

### Description

@short: 获取 lightbox 中 select 控件的标签

@signature: getLabel: (property: string, key: string|number) =\> string

### Parameters

- `property` - (required) *string* - 与控件关联的数据属性名称
- `key` - (required) *string | number* - 选项的 id。此值与事件的数据属性匹配<br>以识别与事件相关联的 select 选项

### Returns
- ` label` - (string) - 对应 lightbox 中 select 控件选项的标签

### Example

~~~jsx
scheduler.config.lightbox.sections=[
    {name:"custom", type:"select", map_to:"unit_id", options:[
        {key:1, label:"James Smith"}, 
        {key:2, label:"John Williams"}]},
        // 更多选项
];

var holder2 = scheduler.getLabel("unit_id", 2);// ->"John Williams"
~~~

### Related samples
- [Multiselect control in the lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/21_multiselect_options.html)

### Details

:::note

该方法专门用于 lightbox 中的 select 控件，用于获取特定选项的标签。
 
:::

<br>

例如，可以使用此方法自定义事件文本的显示方式:

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
