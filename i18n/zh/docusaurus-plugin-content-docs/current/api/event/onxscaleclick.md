---
sidebar_label: "onXScaleClick"
title: "onXScaleClick event"
description: "当用户单击x轴上的单元格时触发（仅适用于Timeline视图）"
---

# onXScaleClick

### Description

@short: 当用户单击x轴上的单元格时触发（仅适用于Timeline视图）

@signature: onXScaleClick: (index: number, value: object, e: Event) =\> void

### Parameters

- `index` - (required) *number* - 被点击列的零基索引
- `value` - (required) *object* - 一个Date对象，表示被点击单元格的起始时间戳
- `e` - (required) *Event* - 原生事件对象

### Example

~~~jsx
scheduler.attachEvent("onXScaleClick", function (index, value,e){
    //在这里编写自定义逻辑
});
~~~
