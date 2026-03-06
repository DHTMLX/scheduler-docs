---
sidebar_label: "changeEventId"
title: "changeEventId method"
description: "更新事件的 id"
---

# changeEventId

### Description

@short: 更新事件的 id

@signature: changeEventId: (id: string, new_id: string) =\> void

### Parameters

- `id` - (required) *string* - 当前事件的 id
- `new_id` - (required) *string* - 新的事件 id

### Example

~~~jsx
scheduler.changeEventId("ev15", "ev25"); // 将事件的 id 从 "ev15" 更新为 "ev25"
~~~

### Details

调度器中显示的每个事件都有其唯一的 id。

当通过 UI 创建新事件时，Scheduler 库会为其分配一个临时 id。

事件保存到数据库后，会获得数据库生成的永久 id。通常，您的后端会将此数据库 id 返回给客户端，调度器随后会使用该 id 进行后续事件的更新。

如果您使用的是 [dataProcessor 模块并遵循服务器端集成教程](guides/server-integration.md#technique)，此过程会自动处理。
但如果您是手动向后端发送更新，则需要使用此方法手动更新事件 id。
例如:

~~~js
// 创建新事件
jQuery.ajax({
    type:"POST",
    url:"/myApi/event",
    data:{ data : event },
    complete:function(result){
        // 后端响应，插入新事件到数据库后
        scheduler.changeEventId(event.id, result.databaseId);
    }
});
~~~

请注意，此方法会触发 [onEventIdChange](api/event/oneventidchange.md) 事件。

### Related API
- [onEventIdChange](api/event/oneventidchange.md)

### Related Guides
- [Server-Side Integration](guides/server-integration.md#technique)
