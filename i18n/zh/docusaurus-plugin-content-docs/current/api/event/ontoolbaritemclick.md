---
sidebar_label: onToolbarItemClick
title: "onToolbarItemClick 事件"
description: "在 Toolbar 项激活时触发"
---

# onToolbarItemClick

### 描述

@short: 在 Toolbar 项激活时触发

@signature: onToolbarItemClick: (id: string | number, item: object, event: Event | null) =\> boolean

### 参数

- `id` - （必需）*string | number* - 项 ID
- `item` - （必需）*object* - 项配置的副本；其 `occurrence` 属性标识重复 ID
- `event` - （必需）*Event | null* - 原生点击事件；通过键盘/触控激活时为 `null`

### 返回值

- `result` - (boolean) - 返回 `false` 可取消内置操作或视图切换

### 示例

~~~jsx
scheduler.attachEvent("onToolbarItemClick", (id, item, event) => {
    if (id === "add_event" && scheduler.config.readonly) return false;
    return true;
});
~~~

### 详细说明

需要 [Toolbar](guides/toolbar.md) 插件。该事件在旧式项的 `click` 回调之后、Toolbar 内置操作或视图操作之前触发。返回 `false` 不会撤销旧式回调，但会阻止随后的 Scheduler 操作。视图选项卡和 `views` 菜单会将所选视图名称作为 `id` 报告。

### 相关指南

- [Toolbar](guides/toolbar.md)