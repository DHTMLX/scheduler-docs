---
sidebar_label: getLayoutSize
title: "getLayoutSize method"
description: Returns the visible Scheduler layout size
---

# getLayoutSize

### Description

@short: Returns the visible layout shell size

@signature: getLayoutSize(): LayoutSize | null

### Returns

- `size` - (LayoutSize | null) - the visible shell size as `{ width, height }`, or `null` when no visible layout shell exists

### Example

~~~js
const size = scheduler.getLayoutSize();
if (size && size.width < 600) {
  scheduler.config.header = compactHeader;
}
~~~

### Details

Returns `{ width, height }` measured from the shell's integer `clientWidth` and
`clientHeight`. It is available when Toolbar or Sidebar creates a visible shell,
and returns `null` when no layout plug-in is active or the shell is detached or hidden.

See [Toolbar](guides/toolbar.md) and [Sidebar](guides/sidebar.md).
