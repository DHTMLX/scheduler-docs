---
sidebar_label: "onCellClick"
title: "onCellClick event"
description: "当用户单击单元格时触发（仅适用于Timeline视图）"
---

# onCellClick

### Description

@short: 当用户单击单元格时触发（仅适用于Timeline视图）

@signature: onCellClick: (x_ind: number, y_ind: number, x_val: object, y_val: array, e: Event) =\> void;

### Parameters

- `x_ind` - (required) *number* - 被点击单元格的列索引（从零开始）
- `y_ind` - (required) *number* - 被点击单元格的行索引（从零开始）
- `x_val` - (required) *object* - 表示被点击单元格起始时间的Date对象
- `y_val` - (required) *array* - 包含位于被点击单元格中的数据项对象的数组
- `e` - (required) *Event* - 原生事件对象

### Example

~~~jsx
scheduler.attachEvent("onCellClick", function (x_ind, y_ind, x_val, y_val, e){
    //可以在此添加自定义逻辑
});
~~~

### Details

:::note

此事件仅在Timeline视图中触发
 
:::
