---
title: "Application layout"
sidebar_label: "Application layout"
description: "Build a Scheduler layout with a toolbar, sidebar, and event groups"
---

# Application layout

Use the Toolbar and Sidebar plug-ins to build an Event Calendar layout. Event groups are a core Scheduler feature: they provide the calendar list data, filter inactive groups, and apply group colors.

```js
scheduler.plugins({ toolbar: true, sidebar: true });
scheduler.config.event_groups = { list: "event_groups", property: "group" };
scheduler.init("scheduler_here");
scheduler.parse({ data, collections: { event_groups } });
```

With no header or Sidebar configuration, Scheduler renders this header:

```js
["toggle_sidebar", "add_event", "spacer", "prev", "date", "next", "spacer", "today", "views"]
```

The Sidebar contains `minicalendar` and `event_groups`, has a width of 260 pixels, and becomes an overlay below 768 pixels. Its event-group list is labelled **Calendars** in English, while the API continues to call the data model event groups.

Add a lightbox section when users need to choose an event group:

```js
scheduler.locale.labels.section_event_group = "Calendar";
scheduler.config.lightbox.sections = [
  { name: "description", type: "textarea", map_to: "text" },
  { name: "event_group", type: "select", map_to: "group", options: scheduler.serverList("event_groups") },
  { name: "time", type: "time", map_to: "auto" }
];
```

## Change one part

Use a menu for views or change the event-group label without rebuilding the layout:

```js
scheduler.config.header = ["toggle_sidebar", "prev", "date", "next", { id: "views", comp: "menu" }];
scheduler.config.sidebar = {
  items: ["minicalendar", { id: "event_groups", label: "My calendars" }]
};
```

## Add application content

`container` Toolbar items and custom Sidebar items are empty nodes owned by the application.

```js
scheduler.config.header = ["prev", { id: "search", comp: "container" }, "next"];
scheduler.config.sidebar = { items: [{ id: "summary" }, "minicalendar", "event_groups"] };

scheduler.attachEvent("onToolbarItemRender", (id, node) => {
  if (id === "search") node.innerHTML = '<input aria-label="Search events">';
});
scheduler.attachEvent("onSidebarItemRender", (id, node) => {
  if (id === "summary") node.textContent = "Upcoming work";
});
```

Framework wrappers can own this content directly. Map item IDs through React `toolbarComponents` / `sidebarComponents`, Vue `toolbar-components` / `sidebar-components`, or Angular `[toolbarComponents]` / `[sidebarComponents]`. The wrappers mount portals, teleports, or Angular component instances into the same stable nodes and clean them up when an item or Scheduler is destroyed. See the [React](integrations/react/configuration-props.md#toolbar-and-sidebar-components), [Vue](integrations/vue/configuration-props.md#toolbar-and-sidebar-components), and [Angular](integrations/angular/configuration-props.md#toolbar-and-sidebar-components) configuration guides.

## Existing Scheduler markup

If the element passed to `init()` already contains the legacy Scheduler markup, Toolbar and Sidebar use permanent markup fallback. Scheduler keeps that markup; it does not create the layout shell, Toolbar, or Sidebar. Replace the legacy child markup with an empty host before enabling the layout plug-ins.

See [Toolbar](guides/toolbar.md), [Sidebar](guides/sidebar.md), [Event groups](guides/event-groups.md), and [header](api/config/header.md).

- [Toolbar layout sample](https://docs.dhtmlx.com/scheduler/samples/16_layout/01_toolbar.html)
- [Sidebar layout sample](https://docs.dhtmlx.com/scheduler/samples/16_layout/02_sidebar.html)
- [Complete responsive application layout](https://docs.dhtmlx.com/scheduler/samples/16_layout/03_layout.html)
