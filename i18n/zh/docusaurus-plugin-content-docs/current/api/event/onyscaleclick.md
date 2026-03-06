---
sidebar_label: "onYScaleClick"
title: "onYScaleClick event"
description: "当用户在 y 轴的单元格上单击一次时触发（仅适用于 Timeline 视图）"
---

# onYScaleClick

### Description

@short: 当用户在 y 轴的单元格上单击一次时触发（仅适用于 Timeline 视图）

@signature: onYScaleClick: (index: number, section: object, e: Event) =\> void

### Parameters

- `index` - (required) *number* - 被点击行的零基索引
- `section` - (required) *object* - 与被点击单元格对应的数据对象
- `e` - (required) *Event* - 原生事件对象

### Example

~~~jsx
scheduler.attachEvent("onYScaleClick", function (index, section, e){
    //这里写任何自定义逻辑
});
~~~
