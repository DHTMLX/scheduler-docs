---
sidebar_label: "onXScaleDblClick"
title: "onXScaleDblClick event"
description: "当用户在 x 轴上的单元格双击时触发（仅适用于 Timeline 视图）"
---

# onXScaleDblClick

### Description

@short: 当用户在 x 轴上的单元格双击时触发（仅适用于 Timeline 视图）

@signature: onXScaleDblClick: (index: number, value: object, e: Event) =\> void

### Parameters

- `index` - (required) *number* - 被点击列的零基索引
- `value` - (required) *object* - 一个表示被点击单元格起始时间戳的 Date 对象
- `e` - (required) *Event* - 一个原生事件对象

### Example

~~~jsx
scheduler.attachEvent("onXScaleDblClick", function (index, value, e){
    // 在这里添加自定义逻辑
});
~~~
