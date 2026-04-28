---
sidebar_label: "serverList"
title: "serverList method"
description: "定义一个命名集合，可加载到 Units、Timeline 视图或 Lightbox 中"
---

# serverList

### Description

@short: 定义一个命名集合，可加载到 Units、Timeline 视图或 Lightbox 中

@signature: serverList: (list_name: string, options?: any[]) =\> any[]

### Parameters

- `list_name` - (required) *string* - 列表名称  
- `options` - (optional) *array* - 可选，一个包含选项的数组

### Returns
- ` list` - (array) - 返回一个选项列表

### Example

~~~jsx
// 通过名称 'my_list' 获取一个选项列表  
const list = scheduler.serverList("my_list");  
...  
// 创建并返回一个包含指定选项的列表  
const list = scheduler.serverList("options", [  
    {key: 1, label: "John"},  
    {key: 2, label: "Adam"},  
    {key: 3, label: "Diane"}  
]);
~~~

### Related samples
- [Populating a select editor from the server](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/09_connector_options.html)
- [Loading Units sections from the server](https://docs.dhtmlx.com/scheduler/samples/03_extensions/17_connector_units.html)
- [Multiselect control in the lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/21_multiselect_options.html)

### Details

- 当只传入第一个参数时，此方法返回与该名称关联的列表（如果存在）。  
- 当传入两个参数时，会创建一个新的同名列表，若该名称的列表已存在，则会覆盖它。  

通过此方法创建的列表，可以使用 [scheduler.updateCollection](api/method/updatecollection.md) 方法进行后续更新。 

对于需要更新如 select 选项或 Timeline、Units 视图中的单位列表等集合的场景，将它们定义为命名的选项列表是一种实用的做法。 

~~~js  
scheduler.serverList("sections", [  
    { key: 1, label: "Section A" },  
    { key: 2, label: "Section B" },  
    { key: 3, label: "Section C" },  
    { key: 4, label: "Section D" }  
]);  

scheduler.config.lightbox.sections = [  
    {   
        name: "description", height: 130, map_to: "text", type: "textarea",   
          focus: true   
    },  
    {   
        name: "sections", type: "select",  
          options: scheduler.serverList("sections"), map_to: "section_id"  /*!*/  
    },  
    {   
        name: "time", height: 72, type: "time", map_to: "auto"   
    }  
];   
...  
// 同样地，使用 "units" 列表  
scheduler.createUnitsView({  
    name: "unit",  
    property: "section_id",  
    list: scheduler.serverList("sections") /*!*/   
});  

scheduler.createTimelineView({  
    name: "timeline",  
    x_unit: "minute",  
    x_date: "%H:%i",  
    x_step: 30,  
    x_size: 24,  
    x_start: 16,  
    x_length: 48,  
    y_unit: scheduler.serverList("sections"), /*!*/  
    y_property: "section_id",  
    render: "bar"  
});  

scheduler.init("scheduler_here", new Date(), "unit");  
~~~  

之后，可以通过 [scheduler.updateCollection](api/method/updatecollection.md) 方法在所有地方更新这些选项: 

~~~js  
scheduler.updateCollection("sections", [  
    { key: 5, label: "Section E" },  
    { key: 6, label: "Section F" },  
    { key: 7, label: "Section G" }  
]);  
~~~

### Related API
- [updateCollection](api/method/updatecollection.md)
