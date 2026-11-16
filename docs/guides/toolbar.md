---
title: Toolbar
sidebar_label: Toolbar
---

# Toolbar

The Toolbar plug-in renders `scheduler.config.header` above the calendar with
the Scheduler UI kit. Enable it before `init()`:

~~~js
scheduler.plugins({ toolbar: true, minical: true });
scheduler.config.header = ["prev", "date", "next", "today", { id: "views", comp: "segmented" }];
scheduler.init("scheduler_here");
~~~

With no `header`, Toolbar uses
`add_event, spacer, prev, date, next, spacer, today, views` without changing
your configuration. If the Sidebar plugin is enabled, `toggle_sidebar` is the
first default item. Set `header` to `false` to hide the external toolbar.

Plain header strings retain their legacy meaning (`prev`, `next`, `today`,
`date`, view names, `minicalendar`, `button`, and `spacer`). The new built-ins
are `views`, `add_event`, and `toggle_sidebar`; `"|"` renders a separator.
New item objects use `{ id, comp, label, ... }`, including an empty
`{ id, comp: "container" }` host. A string resolves as a legacy name, an
existing view, a Toolbar built-in, then a view tab. A custom view named
`views` is consequently still a view tab.

## Toolbar configuration

Toolbar uses `scheduler.config.header`. It does not have a separate
`scheduler.config.toolbar` object.

| Parameter | Type | Description |
| --- | --- | --- |
| `toolbar` | *boolean* | The `scheduler.plugins()` option that enables the Toolbar before `init()`. |
| `header` | *Array \| object \| false* | The Toolbar item list or nested `rows`/`cols` layout. Set it to `false` to hide the external Toolbar. |
| `header.height` | *number* | A positive fixed Toolbar height in pixels. Without it, the Toolbar grows when items wrap. |
| `rows` / `cols` | *Array* | Nested layout groups for a multi-row or grouped Toolbar. |
| `align` | *"left" \| "right"* | Alignment for the items in a `rows` or `cols` group. |

### Toolbar item properties

| Property | Type | Description |
| --- | --- | --- |
| `id` | *string \| number* | The item identifier. It also selects built-in behavior for IDs such as `views`, `add_event`, and `toggle_sidebar`. |
| `comp` | *string* | The UI-kit control: `button`, `toggle`, `menu`, `combo`, `segmented`, `text`, `stepper`, `datepicker`, `separator`, `spacer`, or `container`. |
| `label` / `icon` / `tooltip` | *string* | The visible label, icon CSS class, and accessible hover label. |
| `options` / `items` | *Array* | Options for `combo` and `segmented`, or menu entries for `menu`. |
| `value` / `placeholder` | *any \| string* | The selected value or placeholder of a value control. |
| `css` / `width` / `height` / `align` | *string \| number* | Appearance, dimensions, and item alignment overrides. |
| `disabled` / `hidden` | *boolean* | Disables or hides the item. |

Legacy `{ html, click, css }` items remain supported. `click` runs with its
`this` value set to the item node, before `onToolbarItemClick`; its return
value does not cancel the action. Do not combine a legacy `view`, `html`, or
`click` with `id`: Toolbar renders the legacy item and warns that the new-form
properties are ignored.

## Custom content and runtime changes

Use a container when an application owns its content:

~~~js
scheduler.config.header = ["prev", { id: "search", comp: "container" }];
scheduler.attachEvent("onToolbarItemRender", (id, node) => {
  if (id === "search") node.appendChild(document.createElement("input"));
});
~~~

[`scheduler.ext.toolbar`](api/other/toolbar.md) provides `setItems`,
`updateItem`, `getItem`, `getValue`, `setValue`, `show`, `hide`, `refresh`,
`getItemNode`, and `getDefaultItems`. Repeated IDs are supported: pass a zero-based occurrence,
in depth-first visual order, as the final argument. `1` and `"1"` share an ID.
Runtime patches survive equivalent or non-structural header changes; a
structural declarative change clears them. `setItems()` is a runtime structure
and is cleared by the next declarative header change.

[`onToolbarItemClick`](api/event/ontoolbaritemclick.md) and
[`onToolbarItemChange`](api/event/ontoolbaritemchange.md) are cancellable.
Legacy `click` runs first; returning `false` from a toolbar event prevents the
Scheduler action.

## Layout, keyboard, and lifecycle

`getLayoutSize()` returns integer shell `clientWidth`/`clientHeight`, or `null`
for a detached/hidden shell. `onLayoutSizeChange(size)` is emitted before the
header is reconciled, so it can choose a responsive header in the same render.
Set `header.height` to a positive pixel value or use
`--dhx-scheduler-toolbar-height`; `xy.nav_height = 0` hides the toolbar unless
the header supplies a positive height.

Each Toolbar run is one tab stop. Its controls own Arrow, Home, and End keys;
Ctrl+Left, Ctrl+Right, Alt+1 through Alt+9, and horizontal swipes use the same
Toolbar action/event path. Inputs and custom containers keep their editing
keys. Style the external region with `.dhx_scheduler_toolbar`, `data-item-id`, and
`data-item-occurrence`; it deliberately does not expose visible `dhx_cal_*`
controls.

Toolbar mode turns the `init()` host into `.dhx_scheduler_shell`; `_obj`,
`$container`, and `$root` point at its inner calendar. When complete legacy
markup is supplied and the initial header is absent or `false`, Scheduler uses
the permanent markup fallback instead: no shell is created and mutation APIs
are no-ops. Export and destroy keep toolbar resources isolated per Scheduler
instance.

For wrappers, enable the same plugin in the Scheduler plugin prop, for example
`plugins={{ toolbar: true }}` in React, `:plugins="{ toolbar: true }"` in Vue,
or `[plugins]="{ toolbar: true }"` in Angular.

See also [header](api/config/header.md), [initialization](guides/initialization.md),
[keyboard navigation](guides/keyboard-navigation.md), and [Mini Calendar](guides/minicalendar.md).
