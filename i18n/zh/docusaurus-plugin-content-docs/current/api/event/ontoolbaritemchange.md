---
sidebar_label: onToolbarItemChange
title: "onToolbarItemChange 事件"
description: "在 Toolbar 值项更改时触发"
---

# onToolbarItemChange

### 描述

@short: 在 Toolbar 值项更改时触发

@signature: onToolbarItemChange: (id: string | number, value: any, item: object) =\> boolean

### 参数

- `id` - （必需）*string | number* - 项 ID
- `value` - （必需）*any* - 新选择的值
- `item` - （必需）*object* - 项配置的副本；其 `occurrence` 属性标识重复 ID

### 返回值

- `result` - (boolean) - 返回 `false` 可恢复上一个值并取消操作

### 示例

~~~jsx
scheduler.attachEvent("onToolbarItemChange", (id, value) => {
    if (id === "views" && value === "month" && !canOpenMonth()) return false;
    return true;
});
~~~

### 详细说明

需要 [Toolbar](guides/toolbar.md) 插件。该事件用于 `combo`、`segmented` 和分段式 `views` 项等值控件。若返回 `false`，共享 Toolbar 会恢复上一次接受的值。

### 相关指南

- [Toolbar](guides/toolbar.md)