---
title: "防止在同一时间段内安排重复事件"
sidebar_label: "防止在同一时间段内安排重复事件"
---

# 防止在同一时间段内安排重复事件

在许多场景中，限制在同一时间段内可安排的事件数量非常重要。例如，如果某个时间段已经安排了一个事件，您可能希望阻止添加第二个事件。

## 激活冲突检测功能

要管理单个时间段内允许的事件数量，可以使用 [**collision**](guides/extensions-list.md#collision) 扩展。

~~~js title="激活 'collision' 扩展"
scheduler.plugins({
    collision: true
});
~~~

*一旦在页面上启用该扩展，无论是创建新事件还是移动已有事件，系统都会阻止用户在同一时间段内安排两个事件。*


## 管理单个时间段内允许的事件数量

默认情况下，每个时间段只允许一个事件。要调整此限制，请使用 [collision_limit](api/config/collision_limit.md) 属性:

~~~js title="限制每个时间段最多只能创建2个事件"
scheduler.config.collision_limit = 2;      //允许每个时间段创建2个事件
~~~

[Controlling the number of events in a time slot](https://docs.dhtmlx.com/scheduler/samples/03_extensions/15_collision.html)


*当 ['collision' 扩展](guides/extensions-list.md#collision) 启用时，每当用户尝试在已有事件的时间段内添加或移动事件时，调度器会触发 [onEventCollision](api/event/oneventcollision.md) 事件。此事件会根据 [collision_limit](api/config/collision_limit.md) 属性设置的限制进行检查。*


请注意，[onEventCollision](api/event/oneventcollision.md) 事件在数据加载期间不会触发。若要在加载数据时也强制执行事件数量限制，需要稍作代码补充:

~~~js title="限制每个时间段最多只能创建/加载2个事件"
scheduler.config.collision_limit = 2; //允许每个时间段创建2个事件
scheduler.attachEvent("onEventLoading", function(ev){ /*!*/
    return scheduler.checkCollision(ev);             /*!*/
});                                                   /*!*/

~~~
[checkCollision](api/method/checkcollision.md) 方法会检查某个事件是否与现有事件重叠，并相应触发 [onEventCollision](api/event/oneventcollision.md) 事件。


## 获取某个时间段内已有事件的数量

要查询某个特定时间段内已安排了多少事件，可以使用 [getEvents](api/method/getevents.md) 方法:

~~~js title="获取某个时间段内的事件数量"
var count = scheduler.getEvents(ev.start_date, ev.end_date).length;
~~~

请注意，[getEvents](api/method/getevents.md) 方法会遍历所有事件并比较它们的日期，因此当事件数量非常多时，该操作可能需要一些时间。

## 防止重复预订/事件的完整检查清单

以下是防止同一时间段内事件冲突的步骤汇总:

1) 在页面中引入 *collision* 扩展:

~~~js
scheduler.plugins({
    collision: true
});
~~~

2) 在从服务器加载数据期间，阻止用户创建新事件。

这可以确保在日历完全加载之前无法添加事件。请结合 [onLoadEnd](api/event/onloadend.md) 和 [onLoadStart](api/event/onloadstart.md) 事件处理器，以及 [readonly](api/config/readonly.md) 属性，如下所示:

~~~js
// 在开始从数据源加载数据前，使调度器只读
scheduler.attachEvent("onLoadStart", function(){
    scheduler.config.readonly = true;
});

// 在数据源加载完成后，使调度器可编辑
scheduler.attachEvent("onLoadEnd", function(){
    scheduler.config.readonly = false;
});
~~~

3) 启用动态加载，以提升在处理大量记录时的性能，避免一次性加载所有数据。

要启用动态加载，请在加载数据前调用 [setLoadMode](api/method/setloadmode.md) 方法:

~~~js title="启用动态加载"
scheduler.setLoadMode("month");
scheduler.load("/some");
~~~

4) 使用 PHP 连接器的校验功能，在服务器端验证冲突事件。更多细节请参见
[data validation](https://docs.dhtmlx.com/connector__php__validation.html#processingincaseofvalidationerror) 相关文章。

如果校验失败，您可以在客户端重新加载数据。

要处理校验失败，请使用 DataProcessor 的 [onValidationError](https://docs.dhtmlx.com/api__dataprocessor_onvalidationerror_event.html) 和 
[onAfterUpdate](https://docs.dhtmlx.com/api__dataprocessor_onafterupdate_event.html) 事件，并通过调度器方法 [clearAll](api/method/clearall.md) 和 [load](api/method/load.md) 重新加载数据:

a. [onValidationError](https://docs.dhtmlx.com/api__dataprocessor_onvalidationerror_event.html)

在发生校验错误后、数据发送前触发:

~~~js
dp.attachEvent("onValidationError", function(id, details){
   //从服务器重新加载最新数据
   scheduler.clearAll();
   scheduler.load("/data");
});
~~~

参数说明:

- id - (string) 出错项的id
- details -    (object) 错误详情

b. [onAfterUpdate](https://docs.dhtmlx.com/api__dataprocessor_onafterupdate_event.html)

在服务器响应处理完成后触发:

~~~js
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
     if(action == "invalid" || action == "error"){
          //从服务器重新加载最新数据
          scheduler.clearAll();
          scheduler.load("/data");
     }
});
~~~

参数说明:

- id - (string)    被更新项的id
- action - (string)    响应状态（操作类型），详见下文
- tid - (string) 新id（仅适用于插入操作）
- response - (mixed) 包含解析结果的xml节点或json对象

可能的响应状态包括:

- updated;
- inserted;
- deleted;
- invalid;
- error.
