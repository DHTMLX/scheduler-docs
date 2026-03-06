---
sidebar_label: "onYScaleDblClick"
title: "onYScaleDblClick event"
description: "当用户在 y 轴的单元格上双击时触发（仅适用于 Timeline 视图）"
---

# onYScaleDblClick

### Description

@short: 当用户在 y 轴的单元格上双击时触发（仅适用于 Timeline 视图）

@signature: onYScaleDblClick: (index: number, section: object, e: Event) =\> void

### Parameters

- `index` - (required) *number* - 被点击行的零基索引
- `section` - (required) *object* - 与被点击单元格关联的数据对象
- `e` - (required) *Event* - 原生事件对象

### Example

~~~jsx
scheduler.attachEvent("onYScaleDblClick", function (index, section, e){
    // 此处可添加自定义逻辑
});
~~~
