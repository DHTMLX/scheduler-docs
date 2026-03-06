---
sidebar_label: "onClick"
title: "onClick event"
description: "当用户点击事件的左键鼠标时触发"
---

# onClick

### Description

@short: 当用户点击事件的左键鼠标时触发

@signature: onClick: (id: string, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - 事件的 id
- `e` - (required) *Event* - 一个原生事件对象

### Returns
- ` result` - (boolean) - 决定默认事件动作是否继续执行（<b>true</b>）或被阻止（<b>false</b>）

### Example

~~~jsx
scheduler.attachEvent("onClick", function (id, e){
       // 此处编写自定义逻辑
       return true;
  });
~~~

### Related samples
- [Hiding the select bar of the event box](https://docs.dhtmlx.com/scheduler/samples/02_customization/10_without_toolbar.html)
- [Read-only lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)

### Details

此事件可以被阻止。事件处理函数返回除 true 以外的任何值都会阻止默认行为（默认行为通常是显示选中条）。

### Related Guides
- [Lightbox 조작하기](guides/lightbox-editors-manipulations.md#openingthelightboxonasingleclick)
