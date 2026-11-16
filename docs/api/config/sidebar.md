---
sidebar_label: sidebar
title: "sidebar config"
description: "configures the Scheduler Sidebar plug-in"
---

# sidebar

### Description

@short: Configures the Scheduler Sidebar plug-in

@signature: sidebar: SidebarConfig | false

### Example

~~~js
scheduler.plugins({ toolbar: true, sidebar: true });
scheduler.config.sidebar = {
    items: ["minicalendar", "event_groups"],
    position: "left",
    width: 260,
    collapsed: false,
    overlay_width: 768
};
~~~

### Details

Enable `sidebar: true` before `init()`. If this config is absent, the Sidebar uses `minicalendar` and, when event groups are configured, `event_groups`. The defaults are `position: "left"`, `width: 260`, `collapsed: false`, and `overlay_width: 768`.

`items` contains built-in IDs, or `{ id, css }` custom items. A custom item is an empty node supplied through `onSidebarItemRender`. The built-in event-group item accepts `label` and `select_all` overrides.

Below `overlay_width`, the Sidebar becomes a closed overlay only when a visible `toggle_sidebar` item is rendered in a Toolbar. Without that control, the panel remains docked. `collapsed` is the initial docked state; runtime calls on `scheduler.ext.sidebar` do not write it back to this config. Set `sidebar` to `false` to hide the region.

### Related API

- [sidebar](api/other/sidebar.md)
- [header](api/config/header.md)

### Related Guides

- [Sidebar](guides/sidebar.md)
- [Application layout](guides/application-layout.md)
