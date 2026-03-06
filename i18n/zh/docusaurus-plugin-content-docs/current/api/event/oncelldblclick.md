---
sidebar_label: "onCellDblClick"
title: "onCellDblClick event"
description: "当用户双击单元格时触发（仅限时间线视图）"
---

# onCellDblClick

### Description

@short: 当用户双击单元格时触发（仅限时间线视图）

@signature: onCellDblClick: (x_ind: number, y_ind: number, x_val: object, y_val: array, e: Event) =\> void;

### Parameters

- `x_ind` - (required) *number* - 被点击列的零基索引
- `y_ind` - (required) *number* - 被点击行的零基索引
- `x_val` - (required) *object* - 表示被点击单元格起始时间戳的 Date 对象
- `y_val` - (required) *array* - 包含位于被点击单元格中的数据项对象的数组
- `e` - (required) *Event* - 原生事件对象

### Example

~~~jsx
scheduler.attachEvent("onCellDblClick", function (x_ind, y_ind, x_val, y_val, e){
    // 可在此处编写自定义逻辑
});
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note

该事件仅在时间线视图中触发
 
:::
