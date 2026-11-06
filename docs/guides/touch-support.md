---
title: "Mobile Responsive Scheduler"
sidebar_label: "Mobile Responsive Scheduler"
description: "Configure Scheduler v8 for touch devices and responsive Toolbar and Sidebar layouts"
---

# Mobile Responsive Scheduler

Scheduler supports touch input on iOS, Android, Windows tablets, touch-screen monitors, and phones. Touch gestures are available in every view. On small screens, configure the application layout as well as the calendar itself.

:::note
This guide describes the v8.0 Toolbar and Sidebar layout. Applications that keep the legacy navigation bar can continue using the [v7.2 responsive-header approach](guides/touch-support-legacy.md).
:::

For touch-oriented applications:

- include `<meta name="viewport" content="width=device-width, initial-scale=1">`;
- use the [Material skin](guides/skins.md#material-skin) or another theme with sufficiently large controls;
- enable the [Quick Info](guides/quick-info.md) plug-in when users need a compact event editor;
- enable `responsive_lightbox` when the built-in lightbox must adapt to narrow screens.

## Responsive Toolbar

Enable the Toolbar plug-in and provide full and compact versions of `scheduler.config.header`. Use `onLayoutSizeChange` to select between them:

~~~js
const compactHeader = {
    rows: [
        { cols: ["prev", "date", "next"] },
        { cols: ["today", { id: "views", comp: "menu" }] }
    ]
};

const fullHeader = [
    "toggle_sidebar", "add_event", "spacer",
    "prev", "date", "next", "spacer", "today", "views"
];

scheduler.plugins({ toolbar: true, sidebar: true });

scheduler.attachEvent("onLayoutSizeChange", ({ width }) => {
    scheduler.config.header = width < 700 ? compactHeader : fullHeader;
});

scheduler.init("scheduler_here", new Date(), "week");
~~~

The event reports the width of the layout shell: the element passed to `scheduler.init()`. Use this value instead of `window.innerWidth` because Scheduler may occupy only part of the page. Do not choose the header from the calendar height; changing between one and two Toolbar rows changes that height and can create a resize loop.

The Toolbar rereads `config.header` after `onLayoutSizeChange`, so the selected structure is used in the same render. An unchanged structure keeps its existing controls and framework components.

`scheduler.xy.nav_height = 0` hides the navigation bar. Positive `nav_height` values do not size it. Use a positive `config.header.height` or the `--dhx-scheduler-toolbar-height` CSS variable when a fixed Toolbar height is required.

## Responsive Sidebar

The Sidebar uses the same shell width as the Toolbar:

~~~js
scheduler.config.sidebar = {
    items: ["minicalendar", "event_groups"],
    position: "left",
    width: 260,
    collapsed: false,
    overlay_width: 768
};
~~~

Below `overlay_width`, Sidebar becomes a closed overlay when a visible `toggle_sidebar` item exists in the built-in or a standalone Toolbar. Without that control, Sidebar remains docked so it cannot become inaccessible. Runtime calls such as `scheduler.ext.sidebar.show()` and `hide()` change the visible state without rewriting `config.sidebar.collapsed`.

See [Application layout](guides/application-layout.md), [Toolbar](guides/toolbar.md), and [Sidebar](guides/sidebar.md) for the complete configuration.

## Container autoresize

When `container_autoresize` is used inside a scrolling parent, reserve space for the parent's vertical scrollbar. Otherwise the scrollbar can repeatedly change the shell width at a responsive breakpoint:

~~~css
.scheduler-scroll-container {
    overflow: auto;
    scrollbar-gutter: stable;
}
~~~

With a Toolbar or Sidebar shell, a height written by `container_autoresize` does not fire `onSchedulerResize`. Use `onLayoutSizeChange` for application-layout decisions.

## Responsive lightbox

Enable responsive styles for the built-in lightbox:

~~~js
scheduler.config.responsive_lightbox = true;
~~~

On narrow screens the lightbox receives the `dhx_cal_light_responsive` class. Use that hook for application-specific responsive styles.

## Touch configuration options

- [touch](api/config/touch.md) enables or disables touch support;
- [touch_drag](api/config/touch_drag.md) sets the delay that distinguishes a long press from scrolling;
- [touch_swipe_dates](api/config/touch_swipe_dates.md) enables date navigation by horizontal swipe;
- [touch_tip](api/config/touch_tip.md) controls touch prompts;
- [touch_tooltip](api/config/touch_tooltip.md) controls touch tooltips;
- [responsive_lightbox](api/config/responsive_lightbox.md) enables the responsive lightbox styles.

## Touch gestures in the scheduler

- **Double tap** works like a double click and opens or creates an event.
- **Long tap and drag** moves an event or creates one on an empty time slot.
- **Swipe** moves to the previous or next date range when `touch_swipe_dates` is enabled.

When Toolbar is enabled, a horizontal swipe uses the same cancellable `onToolbarItemClick` action path as the `prev` and `next` controls.

## Quick Info extension

The [Quick Info](guides/quick-info.md) plug-in provides a touch-friendly event summary and action buttons. Enable it before initialization:

~~~js
scheduler.plugins({ quick_info: true });
~~~

Quick Info uses the `quick_info_content`, `quick_info_date`, and `quick_info_title` templates. Its runtime methods and events include `showQuickInfo`, `hideQuickInfo`, `onQuickInfo`, and `onAfterQuickInfo`.

[Responsive application-layout sample](https://docs.dhtmlx.com/scheduler/samples/16_layout/03_layout.html)