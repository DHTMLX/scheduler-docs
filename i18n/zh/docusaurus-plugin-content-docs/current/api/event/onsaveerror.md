---
sidebar_label: "onSaveError"
title: "onSaveError event"
description: "当数据更新过程中发生错误时触发"
---

# onSaveError

### Description

@short: 当数据更新过程中发生错误时触发

@signature: onSaveError: (ids: array, response: XMLHttpRequest) =\> void

### Parameters

- `ids` - (required) *array* - 包含更新失败事件ID的数组
- `response` - (required) *XMLHttpRequest* - Ajax请求对象

### Example

~~~jsx
scheduler.attachEvent("onSaveError", function(ids, resp){
    dhtmlx.message("Failed to  update data");
})
~~~

### Details

:::note

此事件仅在使用dataProcessor库进行客户端与服务器通信时触发。
 
:::
