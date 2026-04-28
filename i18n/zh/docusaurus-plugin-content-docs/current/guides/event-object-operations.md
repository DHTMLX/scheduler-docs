---
title: "事件对象操作"
sidebar_label: "事件对象操作"
---

# 事件对象操作

## 获取事件对象

要获取事件对象，请使用 [getEvent](api/method/getevent.md) 方法：

~~~js
scheduler.parse([
   {id:1, start_date:"2027-05-13 6:00", end_date:"2027-05-13 8:00", text:"Event 1"},
   {id:2, start_date:"2027-06-09 6:00", end_date:"2027-06-09 8:00", text:"Event 2"}
]);
... 
const eventObj = scheduler.getEvent(1);
//->{id:1, start_date:"2027-05-13 6:00", end_date:"2027-05-13 8:00", text:"Event 1"}
~~~

## 根据指定时间段获取事件集合

要获取在指定时间段内发生的事件集合，请使用 [getEvents](api/method/getevents.md) 方法：

~~~js
const evs = scheduler.getEvents(new Date(2027,1,10),new Date(2027,2,10)); 
//其中 evs 是事件对象的数组
~~~

## 获取调度器的所有事件

要获取加载到调度器中的所有事件，请按如下方式调用 [getEvents](api/method/getevents.md) 方法，不带参数：

~~~js
const evs = scheduler.getEvents();
// 返回所有事件，形式为对象数组
~~~

## 从当前日期开始获取下一个事件

~~~js
const evs = scheduler.getEvents(new Date(), new Date(9999,1,1));    
//evs - 所有即将到来的事件列表
evs.sort(function(a,b){ return (a.start_date > b.start_date ? 1 : -1); });
//evs[0] - 最近的即将到来事件
~~~

## 获取事件的 id

要根据事件的某个属性值查找该事件的 id，可以使用如下方法:

~~~js title="Getting the event's id by the event's text"
scheduler.parse([
   {id:1, start_date:"2027-05-13 6:00", end_date:"2027-05-13 8:00", text:"Event 1"},
   {id:2, start_date:"2027-06-09 6:00", end_date:"2027-06-09 8:00", text:"Event 2"}
]);
...

const evs = scheduler.getEvents(); //获取调度器中的所有事件
for(let i="0;i<evs.length;" i++){  //遍历所有事件以查找目标事件
    if (evs[i].text == "Event 2") 
        var eventId = evs[i].id;// -> 2
};
~~~

 如果你大致知道所需事件的大致时间，最好对返回的事件集合进行限制，以提高应用速度：

~~~js
const evs = scheduler.getEvents(new Date(2027,05,01),new Date(2027,05,10)); 
for(let i = 0; i < evs.length; i++){  
    if (evs[i].text == "Event 2") 
        const eventId = evs[i].id;// -> 2
};
~~~


## 更改事件的 id

要更改事件当前的 id，可以使用 [changeEventId](api/method/changeeventid.md) 方法，如下所示：

~~~js
scheduler.changeEventId("ev15", "ev25"); //changes the event id "ev15" -> "ev25"
~~~


## 将 lightbox 选项的标签设置为事件文本

默认情况下，调度器事件的文本是通过灯箱（lightbox）中的映射文本字段设置的。

![default_event_text](/img/default_event_text.png)

也可以重新定义默认行为，使在组合框中所选选项的标签作为事件的文本。

![option_event_text](/img/option_event_text.png)

事件的文本由以下模板之一来指定：[event_text](api/template/event_text.md) 或 [event_bar_text](api/template/event_bar_text.md)，具体取决于视图的类型。因此，要改变向事件添加文本的方式，你应重新定义相应的模板。

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
    const options = scheduler.serverList("options");

    for(let i = 0; i < options.length; i++){
        if(options[i].key == event.type){
            return options[i].label;
        }
    }
    
    return "";
};
~~~

关于上述代码，有若干注意事项：

- [serverList](api/method/serverlist.md) 方法用于为组合框提供选项并在模板内检索它们。你可以通过 JSON 集合将选项与事件数据一起加载（见 [Data formats](guides/data-formats.md#json-with-collections)）并稍后使用 [updateCollection](api/method/updatecollection.md) 更新它们。

- 模板内部有对所选项的线性搜索。在某些情况下，当你有大量事件/选项时，可能会对性能产生明显影响，因为这些模板会被频繁调用。为解决此问题，你可以为快速搜索创建一个哈希表，而不是不停地遍历数组。

- 客户端应具备完整的选项列表以进行展示。否则，你需要手动加载选项，例如如果你使用自动完成的搜索功能，它会动态地拉取所需的选项。