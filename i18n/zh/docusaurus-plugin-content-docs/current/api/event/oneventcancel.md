---
sidebar_label: "onEventCancel"
title: "onEventCancel event"
description: "当用户在lightbox（编辑表单）中按下'取消'按钮时触发"
---

# onEventCancel

### Description

@short: 当用户在lightbox（编辑表单）中按下"取消"按钮时触发

@signature: onEventCancel: (id: string, flag: boolean) =\> void;

### Parameters

- `id` - (required) *string* - 事件的id
- `flag` - (required) *boolean* - 如果用户正在取消新事件，则为'true'，<br>如果编辑的事件已存在，则为'false'

### Example

~~~jsx
scheduler.attachEvent("onEventCancel", function(id, flag){
    //这里写任何自定义逻辑
});
~~~
