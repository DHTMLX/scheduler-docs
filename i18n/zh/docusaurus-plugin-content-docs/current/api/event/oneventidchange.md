---
sidebar_label: "onEventIdChange"
title: "onEventIdChange event"
description: "当事件的 id 更新时触发"
---

# onEventIdChange

### Description

@short: 当事件的 id 更新时触发

@signature: onEventIdChange: (old_id: string, new_id: string) =\> void;

### Parameters

- `old_id` - (required) *string* - 原始事件的 id    
- `new_id` - (required) *string* - 更新后的事件的 id

### Example

~~~jsx
scheduler.attachEvent("onEventIdChange", function(old_id,new_id){
    //在这里编写任何自定义逻辑
});
~~~

### Details

此事件通常在插入操作确认后发生，将客户端的 ID 切换为数据库中的 ID。
