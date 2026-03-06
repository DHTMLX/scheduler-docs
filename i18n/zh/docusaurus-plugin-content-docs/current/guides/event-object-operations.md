---
title: "事件对象操作"
sidebar_label: "事件对象操作"
---

# 事件对象操作

## 获取事件对象

要获取事件对象，请使用 [getEvent](api/method/getevent.md) 方法:

~~~js
scheduler.parse([
   {id:1, start_date:"2019-05-13 6:00", end_date:"2019-05-13 8:00", text:"Event 1"},
   {id:2, start_date:"2019-06-09 6:00", end_date:"2019-06-09 8:00", text:"Event 2"}
]);
... 
var eventObj = scheduler.getEvent(1);
//->{id:1, start_date:"2019-05-13 6:00", end_date:"2019-05-13 8:00", text:"Event 1"}
~~~

## 获取指定时间段内的事件

要获取在某一时间段内发生的事件列表，请使用 [getEvents](api/method/getevents.md) 方法:

~~~js
var evs = scheduler.getEvents(new Date(2019,1,10),new Date(2019,2,10)); 
//其中 evs 是事件对象的数组
~~~

## 获取调度器中的所有事件

要获取当前加载到调度器中的所有事件，可以如下调用 [getEvents](api/method/getevents.md) 方法，不传递任何参数:

~~~js
var evs = scheduler.getEvents();
// 返回所有事件，形式为对象数组
~~~

## 从当前日期获取下一个事件

~~~js
var evs = scheduler.getEvents(new Date(), new Date(9999,1,1));    
//evs - 所有即将到来的事件列表
evs.sort(function(a,b){ return (a.start_date > b.start_date ? 1 : -1); });
//evs[0] - 最近的即将到来的事件
~~~

## 获取事件的 id

要根据事件的某个属性值查找该事件的 id，可以使用如下方法:

~~~js title="Getting the event's id by the event's text"
scheduler.parse([
   {id:1, start_date:"2019-05-13 6:00", end_date:"2019-05-13 8:00", text:"Event 1"},
   {id:2, start_date:"2019-06-09 6:00", end_date:"2019-06-09 8:00", text:"Event 2"}
]);
...

var evs = scheduler.getEvents(); //获取调度器中的所有事件
for(var i="0;i<evs.length;" i++){  //遍历所有事件以查找目标事件
    if (evs[i].text == "Event 2") 
        var eventId = evs[i].id;// -> 2
};
~~~

如果已知事件的大致时间，建议在获取事件时限定时间范围，以提升性能:

~~~js
var evs = scheduler.getEvents(new Date(2019,05,01),new Date(2019,05,10)); 
for(var i="0;i<evs.length;" i++){  
    if (evs[i].text == "Event 2") 
        var eventId = evs[i].id;// -> 2
};
~~~

## 更改事件的 id

要更新事件的 id，可以使用 [changeEventId](api/method/changeeventid.md) 方法，示例如下:

~~~js
scheduler.changeEventId("ev15", "ev25"); //将事件 id 从 "ev15" 更改为 "ev25"
~~~

## 将 lightbox 选项的标签作为事件文本

默认情况下，Scheduler 事件的文本是从 lightbox 中映射的 text 字段设置的。

![default_event_text](/img/default_event_text.png)

你也可以覆盖此默认行为，使用下拉选项中所选项的 label 作为事件文本。

![option_event_text](/img/option_event_text.png)

事件文本由以下模板之一决定:[event_text](api/template/event_text.md) 或 [event_bar_text](api/template/event_bar_text.md)，具体取决于视图类型。要自定义事件文本的生成方式，你应重定义相应的模板。

~~~js
scheduler.config.lightbox.sections = [
    { name:"type", height:21, inputWidth:400, map_to:"type", type:"select", 
        options:scheduler.serverList("options", [
            {key:1, label:"Simple"},
            {key:2, label:"Complex"},
            {key:3, label:"Unknown"}
        ]
    )},
    {name:"time", height:72, type:"time", map_to:"auto"}
];

scheduler.templates.event_text = scheduler.templates.event_bar_text = function(start, end, event){
    var options = scheduler.serverList("options");

    for(var i = 0; i < options.length; i++){
        if(options[i].key == event.type){
            return options[i].label;
        }
    }
    
    return "";
};
~~~

关于上述代码，有几点需要注意:

- [serverList](api/method/serverlist.md) 方法为下拉框提供选项，并在模板中获取。它也可用于通过 connector 与其他数据一起加载选项，并支持动态更新选项。

- 模板通过线性查找方式查找被选中的项。如果事件或选项数量较大，由于模板可能会被频繁调用，这种方式可能影响性能。为提升效率，建议使用哈希表进行更快的查找，而不是每次遍历数组。

- 客户端需要有完整的选项列表才能正确显示。如果没有，必须手动加载选项，例如在使用自动补全搜索并动态获取选项时。
