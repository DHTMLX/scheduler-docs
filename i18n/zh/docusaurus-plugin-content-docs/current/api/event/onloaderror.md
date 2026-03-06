---
sidebar_label: "onLoadError"
title: "onLoadError event"
description: "当调度器无法解析数据或服务器响应4xx或5xx状态码时触发"
---

# onLoadError

### Description

@short: 当调度器无法解析数据或服务器响应4xx或5xx状态码时触发

@signature: onLoadError: (response: XMLHttpRequest) =\> void

### Parameters

- `response` - (required) *XMLHttpRequest* - 一个Ajax请求对象

### Example

~~~jsx
scheduler.attachEvent("onLoadError", function(response){
    dhtmlx.message("加载数据失败");
});
~~~

### Details

该事件由 [parse](api/method/parse.md) 和 [load](api/method/load.md) 方法调用。

当由 **parse** 方法触发时，处理函数接收一个包含 *responseText* 属性的对象，该属性包含待解析的数据:

~~~js
{
    responseText: parseArgument
}
~~~
