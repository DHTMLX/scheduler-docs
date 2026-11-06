---
sidebar_label: onLayoutSizeChange
title: "onLayoutSizeChange event"
description: Fires when the visible Scheduler layout changes size
---

# onLayoutSizeChange

### Description

@short: Fires when the visible layout shell changes size

@signature: onLayoutSizeChange: (size: LayoutSize) => void

### Parameters

- `size` - (required) *LayoutSize* - the shell size as `{ width, height }` in integer pixels

### Example

~~~js
scheduler.attachEvent("onLayoutSizeChange", size => {
  scheduler.config.header = size.width < 600 ? compactHeader : wideHeader;
});
~~~

### Details

Fires in visible Toolbar or Sidebar shell mode when `clientWidth` or
`clientHeight` changes. It receives `{ width, height }` before Toolbar header
reconciliation, so a handler can choose a responsive header in the same render.

See [Mobile Responsive Scheduler](guides/touch-support.md).
