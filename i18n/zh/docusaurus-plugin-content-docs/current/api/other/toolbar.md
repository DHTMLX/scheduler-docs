---
sidebar_label: toolbar
title: "toolbar API"
description: "提供对 Toolbar 插件的运行时访问"
---

# toolbar

### 描述

@short: 提供对 Toolbar 插件的运行时访问

@signature: scheduler.ext.toolbar: ToolbarApi

### 示例

~~~jsx
scheduler.plugins({ toolbar: true });
scheduler.init("scheduler_here");

scheduler.ext.toolbar.updateItem("today", { hidden: true });
~~~

### 详细说明

调用 `scheduler.plugins({ toolbar: true })` 和 `scheduler.init()` 后可使用该 API。它操作渲染后的 Toolbar，而不更改 `scheduler.config.header`。

| 方法 | 描述 |
| --- | --- |
| `setItems(items)` | 替换运行时项结构，直到声明式标题更改。 |
| `updateItem(id, patch, occurrence?)` | 将补丁应用于一个项。 |
| `getItem(id, occurrence?)` | 返回项配置副本或 `null`。 |
| `getValue(id, occurrence?)` | 返回带值项的当前值。 |
| `setValue(id, value, occurrence?)` | 设置值而不触发更改事件。 |
| `show(id, occurrence?)` / `hide(id, occurrence?)` | 显示或隐藏项。 |
| `refresh()` | 重新读取当前标题配置并更新 Toolbar 状态。 |
| `getItemNode(id, occurrence?)` | 返回项根元素或 `null`。 |
| `getDefaultItems()` | 返回生成的默认项列表。 |

`occurrence` 是重复 ID 按深度优先视觉顺序计算的从零开始的位置；第一个项可省略。相同 ID 的数字和字符串形式视为同一个 ID。

### 相关指南

- [Toolbar](guides/toolbar.md)
- [header](api/config/header.md)