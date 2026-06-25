---
title: "防止在同一时间段内安排重复事件"
sidebar_label: "防止在同一时间段内安排重复事件"
---

# 防止在同一时间段内安排重复事件

在许多用例中，您可能需要限制一个时间段内的事件数量。例如，当某个时间已经定义了其他事件时，您可能需要拒绝创建第 2 个事件。

## 启用碰撞监测

要控制一个时间段内的事件数量，请使用 [**collision**](guides/extensions-list.md#collision) 扩展。

~~~js title="激活 'collision' 扩展"
scheduler.plugins({
    collision: true
});
~~~

*一旦在页面上启用该扩展，该扩展就会被激活。从此时起，调度程序将不再允许在同一个时间段内放置 2 个事件（创建或移动）。*

## 管理一个时间段内允许的事件数量

默认情况下，一个时间段内允许的事件数量为 1。要调整此数量，请使用 [collision_limit](api/config/collision_limit.md) 属性：

[在一个时间段内控制事件数量](https://docs.dhtmlx.com/scheduler/samples/03_extensions/15_collision.html)

*在启用 ['collision' extension](guides/extensions-list.md#collision) 的情况下，每当用户尝试在已被占用的时间段内创建新事件或修改某个现有事件时，调度程序都会触发 [onEventCollision](api/event/oneventcollision.md) 事件，该事件会检查使用 [collision_limit](api/config/collision_limit.md) 属性所设的值。*

但请记住，[onEventCollision](api/event/oneventcollision.md) 事件在加载数据时不会被触发。所以，要在向调度程序加载数据时控制一个时间段内的项目数量，您需要对前面的代码稍作扩展：

[Denying creating/loading more than 2 events per time slot](Denying creating/loading more than 2 events per time slot)
~~~js
scheduler.config.collision_limit = 2; //allows creating 2 events per time slot
scheduler.attachEvent("onEventLoading", function(ev){ /*!*/
    return scheduler.checkCollision(ev);             /*!*/
});                                                   /*!*/
~~~

[checkCollision](api/method/checkcollision.md) 方法会检查某个事件是否发生在已被另一个事件占用的时间点，并触发 [onEventCollision](api/event/oneventcollision.md) 事件。

## 获取一个时间段内存在的事件数量

要获取一个时间段内存在的事件数量，请使用 [getEvents](api/method/getevents.md) 方法：

[获取一个时间段内的事件数量](Getting the number of events in a time slot)
~~~js
const count = scheduler.getEvents(ev.start_date, ev.end_date).length;
~~~

请注意，[getEvents](api/method/getevents.md) 方法会遍历所有事件并比较它们的日期，因此如果您使用成千上万的事件，可能需要一些时间。

## 防止重复预订/事件的完整清单

下面是避免一个时间段内事件冲突需要完成的步骤清单：

1) 将 *collision* 扩展包含在页面中：

~~~js
scheduler.plugins({
    collision: true
});
~~~

2) 在从服务器加载数据时阻止新事件的创建。

因此，在数据尚未加载且日历为空时，用户将无法创建事件。为此应使用 [onLoadEnd](api/event/onloadend.md) 与 [onLoadStart](api/event/onloadstart.md) 事件处理程序，以及 [readonly](api/config/readonly.md) 属性，如下所示：

~~~js
// 将调度程序设为只读
// 在数据源加载数据尚未开始时
scheduler.attachEvent("onLoadStart", function(){
    scheduler.config.readonly = true;
});

// 在数据源加载完成后再设为可编辑
scheduler.attachEvent("onLoadEnd", function(){
    scheduler.config.readonly = false;
});
~~~

3) 启用动态加载，以在记录很多且一次性加载全部数据时加速数据加载。

要启用动态加载，您需要调用 [setLoadMode](api/method/setloadmode.md) 方法，并在此之后加载您的脚本：

[启用动态加载](Enabling the dynamic loading)
~~~js
scheduler.setLoadMode("month");
scheduler.load("/some");
~~~

4) 在服务器端的 API 中验证冲突事件。如果检测到冲突，请在响应中返回错误状态并在客户端处理。

如果检查失败，您也可以在客户端重新加载数据。

要处理检查失败，请使用 DataProcessor 事件 [onValidationError](https://docs.dhtmlx.com/api__dataprocessor_onvalidationerror_event.html) 与 [onAfterUpdate](https://docs.dhtmlx.com/api__dataprocessor_onafterupdate_event.html)，并使用 Scheduler 的方法 [clearAll](api/method/clearall.md) 与 [load](api/method/load.md) 重新加载数据：

a. [onValidationError](https://docs.dhtmlx.com/api__dataprocessor_onvalidationerror_event.html)

在验证错误触发后、数据发送之前发生

~~~js
dp.attachEvent("onValidationError", function(id, details){
   //从服务器重新加载实际数据
   scheduler.clearAll();
   scheduler.load("/data");
});
~~~

参数：

- id - (string) 发生错误的项的 ID
- details -    (object) 错误详情

b. [onAfterUpdate](https://docs.dhtmlx.com/api__dataprocessor_onafterupdate_event.html)

在服务器端响应已接收并处理之后触发

~~~js
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
     if(action == "invalid" || action == "error"){
          //从服务器重新加载实际数据
          scheduler.clearAll();
          scheduler.load("/data");
     }
});
~~~

参数：

- id - (string) 更新项的 ID
- action - (string) 响应状态（操作类型），见下方详情
- tid - (string) 新的 ID（仅在插入操作时适用）
- response - (mixed) xml 节点/json 对象，包含解析后的 xml/json 响应

可能的响应状态如下：

- updated; 
- inserted;
- deleted;
- invalid;
- error.