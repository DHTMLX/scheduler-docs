---
sidebar_label: "onBeforeLightbox"
title: "onBeforeLightbox event"
description: "在用户打开lightbox（编辑表单）之前触发"
---

# onBeforeLightbox

### Description

@short: 在用户打开lightbox（编辑表单）之前触发

@signature: onBeforeLightbox: (id: string) =\> boolean

### Parameters

- `id` - (required) *string* - 事件的id

### Returns
- ` result` - (boolean) - 决定事件的默认操作是否继续执行（<b>true</b>）或被阻止（<b>false</b>）

### Example

~~~jsx
scheduler.attachEvent("onBeforeLightbox", function (id){
    // 可以在这里添加自定义逻辑
    return true;
});
~~~

### Related samples
- [Linking select controls in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/26_linked_selects_in_lightbox.html)
- [Dynamic changing of lightbox configurations](https://docs.dhtmlx.com/scheduler/samples/02_customization/29_changing_lightbox_configurations.html)

### Details

此事件可以被阻止。返回*false*将阻止默认行为（打开lightbox）。
