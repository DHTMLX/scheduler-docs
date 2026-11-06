---
sidebar_label: onToolbarItemRender
title: "onToolbarItemRender 事件"
description: "在 Toolbar 容器项挂载时触发"
---

# onToolbarItemRender

### 描述

@short: 在 Toolbar 容器项挂载时触发

@signature: onToolbarItemRender: (id: string | number, node: HTMLElement) =\> void

### 参数

- `id` - （必需）*string | number* - 容器项 ID
- `node` - （必需）*HTMLElement* - 空容器元素

### 示例

~~~jsx
scheduler.attachEvent("onToolbarItemRender", (id, node) => {
    if (id !== "search" || node.firstChild) return;
    const input = document.createElement("input");
    input.type = "search";
    input.placeholder = "Search";
    node.appendChild(input);
});
~~~

### 详细说明

需要 [Toolbar](guides/toolbar.md) 插件。每个 `{ id, comp: "container" }` 实例插入 Toolbar 后都会触发该事件。请填充所提供的节点而不要替换它；当标题配置未更改时，该节点会保留。

### 相关指南

- [Toolbar](guides/toolbar.md)