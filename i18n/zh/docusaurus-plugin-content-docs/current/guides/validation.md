---
title: "校验（Validation）"
sidebar_label: "校验（Validation）"
---

# 校验（Validation）

校验有助于确保用户输入的数据是准确的，并防止保存不正确的值。例如，它可以阻止没有描述的事件被创建。

通常，数据校验是通过使用 [dhtmlxScheduler API](api/overview/events_overview.md) 中的事件来完成的，这些事件可以捕获用户输入并允许你检查其有效性:

## 客户端校验

以下是常用于数据校验的一些关键事件:

- [onEventSave](api/event/oneventsave.md) - 当用户点击 lightbox 中的 'Save' 按钮时触发
- [onBeforeEventCreated](api/event/onbeforeeventcreated.md) - 在新事件被添加到 Scheduler 之前触发
- [onBeforeEventChanged](api/event/onbeforeeventchanged.md) - 在事件被更新之前触发

一种简单的校验方式是使用 [onEventSave](api/event/oneventsave.md) 事件。该事件在表单中的 'Save' 按钮被点击时发生。返回 *true* 允许保存更改，而返回 *false* 会取消保存并保持 lightbox 打开。

例如，为了防止保存没有描述或描述文字过短的事件，可以使用如下代码:

~~~js
scheduler.attachEvent("onEventSave", function(id,ev){
    if (!ev.text) {
        dhtmlx.alert("Text must not be empty");
        return false;
    }
    if (ev.text.length < 20) {
        dhtmlx.alert("Text too small");
        return false;
    }
    return true;
});
~~~


[Validating lightbox fields](https://docs.dhtmlx.com/scheduler/samples/02_customization/08_validation.html)


## 服务端校验

上述方法的一个局限是:如果通过内联编辑或在 Scheduler 内拖动进行更改，则不会触发该事件。

为了处理所有更改--无论是编辑、创建还是删除--可以使用 [dataProcessor](guides/server-integration.md) 对象，特别是它的 [onBeforeUpdate](https://docs.dhtmlx.com/api__dataprocessor_onbeforeupdate_event.html) 事件。该事件会在数据发送到服务器之前触发，覆盖 Scheduler 中的任何修改，而不仅仅是 lightbox 中的操作。

~~~js
scheduler.init("scheduler_here");
scheduler.load("data.php");
 
var dp = new gantt.dataProcessor("data.php");
dp.init(scheduler);

dp.attachEvent("onBeforeUpdate", function (id, status, data) {
    if (!data.text) {
        dhtmlx.message("The event's text can't be empty!");
        return false;
    }
    return true;
});
~~~
 
其中: 

- **id** - (*string*) 事件的 id。
- **status** - (*'updated', 'inserted', deleted'*) 事件的操作状态。
- **data** - (*object*) 要发送的数据。

请注意，如果校验未通过，更改不会被发送到服务器，而是保留在客户端，如有需要可进一步处理。
