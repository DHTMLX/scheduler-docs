---
title: Sidebar
sidebar_label: Sidebar
---

# Sidebar

The Sidebar plug-in renders a panel beside the Scheduler calendar. Enable it before `init()`.

```js
scheduler.plugins({ toolbar: true, sidebar: true });
scheduler.config.sidebar = {
  position: "left",
  width: 260,
  overlay_width: 768,
  items: ["minicalendar", "event_groups"]
};
scheduler.init("scheduler_here");
```

`minicalendar` and `event_groups` are the default items. The event-group item is shown only when `scheduler.config.event_groups` is enabled. Set `collapsed: true` for an initially collapsed panel, use `position: "right"` to place it on the right, or set `sidebar` to `false` to disable it.

Below `overlay_width`, the panel becomes a closed overlay only when a visible `toggle_sidebar` Toolbar item is available. Include that item in a custom header, or put one in a standalone Toolbar. Without a toggle, and when Toolbar is disabled, the panel stays docked.

## Sidebar configuration

| Parameter | Type | Description |
| --- | --- | --- |
| `position` | *"left" \| "right"* | The side of the Scheduler that contains the panel. The default is `"left"`. |
| `width` | *number* | The docked Sidebar width in pixels. The default is `260`. |
| `collapsed` | *boolean* | Whether the docked Sidebar is initially hidden. The default is `false`. |
| `overlay_width` | *number* | The shell-width breakpoint at which Sidebar can become an overlay. The default is `768`; use `0` to disable overlay mode. |
| `items` | *Array* | The built-in and custom items rendered from top to bottom. |

### Sidebar items

| Item | Description |
| --- | --- |
| `"minicalendar"` | Renders a linked mini calendar. Set `mark_events: true` on its item object to mark dates that contain events. |
| `"event_groups"` | Renders the event-group filter list when `scheduler.config.event_groups` is enabled. Its item object accepts `label` and `select_all`. |
| `{ id, css }` | Creates an empty custom container. `css` adds classes to the container; populate it with `onSidebarItemRender`. |

## Custom items

A custom Sidebar item is an empty container. Fill it in `onSidebarItemRender`.

```js
scheduler.config.sidebar = { items: [{ id: "filters", css: "app-filters" }, "minicalendar"] };
scheduler.attachEvent("onSidebarItemRender", (id, node) => {
  if (id === "filters") node.innerHTML = "<strong>Filters</strong>";
});
```

Use `scheduler.ext.sidebar.show()`, `hide()`, or `toggle()` for runtime state. These calls do not change `scheduler.config.sidebar.collapsed`.

## Existing markup

When the init host contains legacy `.dhx_cal_*` markup, Sidebar uses permanent markup fallback. No shell or Sidebar is rendered. Initialize it in an empty host to use the plug-in layout.

See [sidebar config](api/config/sidebar.md) and [Application layout](guides/application-layout.md).
