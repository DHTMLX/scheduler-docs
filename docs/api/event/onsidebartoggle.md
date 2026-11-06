---
sidebar_label: onSidebarToggle
title: "onSidebarToggle event"
description: "fires when the visible Sidebar state changes"
---

# onSidebarToggle

### Description

@short: Fires when the visible Sidebar state changes

@signature: onSidebarToggle: (collapsed: boolean, overlay: boolean) => void

### Parameters

- `collapsed` - (required) *boolean* - whether the Sidebar is hidden
- `overlay` - (required) *boolean* - whether the Sidebar is operating as an overlay

### Example

~~~js
scheduler.attachEvent("onSidebarToggle", (collapsed, overlay) => {
    console.log(collapsed ? "Sidebar closed" : overlay ? "Sidebar opened as an overlay" : "Sidebar opened");
});
~~~

### Details

The event fires after `show()`, `hide()`, `toggle()`, and a responsive-mode change when the visible state changes. It requires the Sidebar plug-in.
