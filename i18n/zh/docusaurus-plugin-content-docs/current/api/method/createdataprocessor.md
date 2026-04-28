---
sidebar_label: "createDataProcessor"
title: "createDataProcessor method"
description: "生成一个新的 dataProcessor 实例并将其链接到 scheduler"
---

# createDataProcessor

### Description

@short: 生成一个新的 dataProcessor 实例并将其链接到 scheduler

@signature: createDataProcessor: (config: any) =\> any

### Parameters

- `config` - (required) *string | object* - 用于配置 dataProcessor 的配置对象

### Returns
- ` dataProcessor` - (object) - 生成的 dataProcessor 实例

### Example

~~~jsx
const dp = scheduler.createDataProcessor({
    url: "/api",
    mode: "REST"
});
~~~

### Details

此方法接受以下类型的参数之一:

1\. 一个包含 `{url:string, mode:string}` 的对象，指定预定义的数据发送方式

~~~js
const dp = scheduler.createDataProcessor({
   url: "/api",
   mode: "REST"
});
~~~

其中:

- url - 服务器端点
- mode - 发送数据的方法: "JSON" | "REST-JSON" | "JSON" | "POST" | "GET"

2\. 或者，可以提供一个自定义的 router 对象:

~~~js
const dp = scheduler.createDataProcessor(router);
~~~

这里，router 可以是一个函数:

~~~js
// entity - "event"
// action - "create"|"update"|"delete"
// data - 包含事件详情的对象
// id – 被处理对象（事件）的 id
const dp = scheduler.createDataProcessor(function(entity, action, data, id) { 
    switch(action) {
        case "create":
               return scheduler.ajax.post(
                server + "/" + entity,
                data
               );
        break;
        case "update":
               return scheduler.ajax.put(
                server + "/" + entity + "/" + id,
                data
            );
        break;
        case "delete":
               return scheduler.ajax.del(
                server + "/" + entity + "/" + id
               );
        break;
       }
});
~~~

或者是一个结构如下的对象:

~~~js
const dp = scheduler.createDataProcessor({ 
   event: {
      create: function(data) {},
      update: function(data, id) {},
      delete: function(id) {}
   }
});
~~~

router 对象中的每个函数应返回 Promise 或数据响应对象。这样 dataProcessor 能够更新数据库中的 id 并连接 **onAfterUpdate** 事件。

~~~js
router = function(entity, action, data, id) {
    return new scheduler.Promise(function(resolve, reject) {
        // … 一些逻辑
        return resolve({tid: databaseId});
     });
}
~~~

这种灵活性使 DataProcessor 能够处理 localStorage 或其他不依赖特定 URL 的存储类型的数据保存，或者当不同服务器（URL）管理创建和删除操作时也能正常工作。

### Related Guides
- [Server-Side Integration](guides/server-integration.md)
