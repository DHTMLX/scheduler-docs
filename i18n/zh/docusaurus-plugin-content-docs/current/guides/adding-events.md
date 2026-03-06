---
title: "添加/删除事件"
sidebar_label: "添加/删除事件"
---

# 添加/删除事件

## 添加事件 {#addingevents}

向调度器添加事件有三种方式:

1. [addEvent](api/method/addevent.md) - 创建一个新事件，并触发 [onEventAdded](api/event/oneventadded.md) 或 [onEventChanged](api/event/oneventchanged.md) 事件；
2. [addEventNow](api/method/addeventnow.md) - 创建一个新事件并打开 lightbox 进行确认。此方法不会触发任何事件；
3. [setEvent](api/method/setevent.md) - 直接将新事件添加到调度器的数据池中，不会触发事件。

推荐的方式是使用 [addEvent](api/method/addevent.md) 方法:

~~~js
var eventId = scheduler.addEvent({
    start_date: "16-06-2019 09:00",
    end_date:   "16-06-2019 12:00",
    text:   "Meeting",
    holder: "John",  // 用户自定义数据
    room:   "5"      // 用户自定义数据
});
~~~


[Validating lightbox fields](https://docs.dhtmlx.com/scheduler/samples/02_customization/08_validation.html)


[Default values for lightbox controls](https://docs.dhtmlx.com/scheduler/samples/02_customization/28_lightbox_default_value.html)


## 更新事件 {#updatingevents}

在 Scheduler 中更新事件有两种场景:

1. 如果只需重新渲染事件而不需要将更改发送到服务器，请使用 [updateEvent](api/method/updateevent.md) 
2. 如果需要应用更改并将其保存到服务器，建议使用 [addEvent](guides/adding-events.md#addingevents) 方法

~~~js
var eventId = scheduler.addEvent({
    start_date: "16-06-2019 09:00",
    end_date:   "16-06-2019 12:00",
    text:   "Meeting"
});
 
var event = scheduler.getEvent(eventId);
event.text = "Conference"; // 更新事件数据

scheduler.updateEvent(event.id); // 仅重新渲染，不发送到服务器
//或
scheduler.addEvent(event.id); // 重新渲染并将更新发送到服务器
~~~

## 删除事件 {#deletingevents}

要从调度器中移除事件，请使用 [deleteEvent](api/method/deleteevent.md) 方法:

~~~js
scheduler.parse([
   {id:1, start_date:"06/30/2009 09:00", end_date:"06/30/2009 12:00", text:"Task1"},
   {id:2, start_date:"06/30/2009 12:00", end_date:"06/30/2009 20:00", text:"Task2"}
],"json");
...
scheduler.deleteEvent(2);
~~~

当 dataProcessor 初始化后，在调度器中添加或删除的事件将会自动反映到数据源中。更多详情请参考 [Server-Side Integration](guides/server-integration.md) 指南。


[Fully custom lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)
