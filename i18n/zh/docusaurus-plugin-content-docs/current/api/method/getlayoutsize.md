---
sidebar_label: getLayoutSize
title: "getLayoutSize 方法"
description: 返回可见 Scheduler 布局的大小
---

# getLayoutSize

### 描述

@short: 返回可见布局外壳的大小

@signature: getLayoutSize(): LayoutSize | null

### 返回值

- `size` - (LayoutSize | null) - `{ width, height }` 形式的可见外壳大小；没有可见布局外壳时为 `null`

### 示例

~~~js
const size = scheduler.getLayoutSize();
if (size && size.width < 600) {
  scheduler.config.header = compactHeader;
}
~~~

### 详细说明

返回根据外壳整数 `clientWidth` 和 `clientHeight` 测得的 `{ width, height }`。当 Toolbar 或 Sidebar 创建可见外壳时可用；若没有活动的布局插件，或外壳已分离或隐藏，则返回 `null`。

请参阅 [Toolbar](guides/toolbar.md) 和 [Sidebar](guides/sidebar.md)。
