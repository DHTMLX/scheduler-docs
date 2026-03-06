---
sidebar_label: "ajax"
title: "ajax config"
description: "scheduler ajax 模块"
---

# ajax

### Description

@short: Scheduler ajax 模块

@signature: ajax: any

### Example

~~~jsx
// 假设响应如下
{status: "ok", data: "value", data2: "value2"}


var xhr = scheduler.ajax;

// HTTP GET
xhr.get("server.php").then(function(response) {
    var res = JSON.parse(response.responseText); 
    if (res && res.status == "ok") {
        // 响应正常
    }
});

// HTTP POST
xhr.post({
    url:"server.php", 
    data: {
           paramName: "paramValue"
    }
}).then(function(response){
    var res = JSON.parse(response.responseText); 
    if (res && res.status == "ok") {
        // 响应正常
    }
});
~~~

### Details

### API 参考

所有方法都接受以下两种格式之一的参数:

1) 一个 RequestConfig 对象，包含请求设置，格式如下:

~~~js
{
    url: string,
      method: "PUT|GET|POST|DELETE",
      data: string | object,
      async: true|false,
      callback: function,
      headers: object
}
~~~

各属性含义如下:

- url - 服务器 URL
- method - 可选，HTTP 请求方法，默认为 "GET"
- data - 可选，随请求发送的数据；POST 和 PUT 支持字符串或对象
- async - 可选，请求是否异步，默认 true
- callback - 可选，请求响应后调用的函数
- headers - 可选，包含请求头的对象，格式为 "key":"value" 键值对

或者:

2) 三个独立参数（**query()** 方法除外，query 只接受 *RequestConfig* 对象）:

- url - 服务器 URL
- data - 可选，随请求发送的数据
- callback - 可选，响应后调用的函数

下面是 ajax 模块 API 中可用方法的列表:

#### 回调选项

所有方法都支持回调函数和 [promises](#promises) 两种响应处理方式。

ajax promise 解析后返回一个完成的 XmlHttpRequest 对象:

~~~js
scheduler.ajax.post({ 
    url:"some.php",
    data: {
           paramName: "paramValue"
    }
}).then(function(response){
    alert(response.responseText);
});
~~~

为了兼容旧版本，回调函数接收的响应格式略有不同:

~~~js
scheduler.ajax.post({ 
    url:"some.php",
    data: {
           paramName: "paramValue"
    },
    callback: function(result){
           var response = result.xmlDoc;
       
           alert(response.responseText);
    }
});
~~~


#### query

通用的请求发送方法。通过参数中指定 method 来处理任何请求类型。

~~~js
scheduler.ajax.query({ 
    url:"some.php",
    method:"POST",
    data: {
       paramName: "paramValue"
    }
}).then(function(response){
    alert(response.responseText);
});

~~~

#### get

发送 GET 请求。

~~~js
scheduler.ajax.get("some.php", function(){
    // 你的代码
});
// 或者
scheduler.ajax.get({
    url: "https://…",
    callback: function() {…},
    headers: { "Content-Type": "application/json" }
});
~~~

#### put

发送 PUT 请求。

~~~js
scheduler.ajax.put("server.php", "keep_alive=1&version=std", function(){
    // 你的代码
});
// 或者
scheduler.ajax.put({
    url: "https://…",
    callback: function() {…},
    headers: { "Content-Type": "application/json" },
    data: {}
});
~~~

#### del

发送 DELETE 请求。

~~~js
scheduler.ajax.del("server.php", function(){
    // 你的代码
});
// 或者
scheduler.ajax.del({
    url: "https://…",
    callback: function() {…},
    headers: { "Content-Type": "application/json" }
});
~~~

#### post

发送 POST 请求。

~~~js
scheduler.ajax.post("server.php", "keep_alive=1&version=std", function(){
    // 你的代码
});
// 或者
scheduler.ajax.post({
    url: "https://…",
    callback: function() {…},
    headers: { "Content-Type": "application/json" },
    data: {}
});
~~~

### 使用 POST/PUT 方法发送数据

使用 **post** 或 **put** 时，可以传入对象而非字符串作为 data。ajax 模块会自动序列化该对象。 
简单对象会被序列化为表单数据（例如 &param=value），而嵌套结构会使用 JSON.stringify() 序列化。

例如，下面的对象:

~~~js
{
    id: 1,
    text: "My Task",
    users: [1,2,3]
}
~~~

会被转换成字符串 `id=1&text=My%20Task&users=%5B1%2C2%2C3%5D`。

### Promises {#promises}

dhtmlxScheduler 支持 promises（包括 IE8+）。它内部使用 [Bluebird](https://github.com/petkaantonov/bluebird) 库来处理 promise。 
创建 promise 的方式如下:

~~~js
var promise = new scheduler.Promise(function(resolve, reject) {...});
~~~

该 promise 实现作用域限定在 Scheduler 内部，因此不是全局的。

AJAX 模块返回 promises，允许你使用 promise 语法替代回调。例如，替代

~~~js
scheduler.ajax.post(url, params, callback);
~~~

可以写成

~~~js
scheduler.ajax.post(url, params).then(function(){…});
~~~

回调和 promise 可以同时使用。

下面是同时发送多个请求，所有完成后重新加载数据的示例:

~~~js 
scheduler.Promise.all([
      scheduler.ajax.post({url: "api/event", data: event1}),
      scheduler.ajax.post({url: "api/event", data: event2}),
      scheduler.ajax.post({url: "api/event", data: event3})
]).then(function(){
       scheduler.clearAll();
       scheduler.load("/api");
});
~~~

### Change log
- added in version 6.0
