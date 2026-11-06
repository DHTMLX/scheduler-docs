---
title: "应用布局"
sidebar_label: "应用布局"
description: "使用 Toolbar、Sidebar 和事件组构建 Scheduler 布局"
---

# 应用布局

使用 Toolbar 和 Sidebar 插件构建事件日历布局。事件组是 Scheduler 核心功能：提供日历列表数据、过滤非活动组并应用组颜色。

```js
scheduler.plugins({ toolbar: true, sidebar: true });
scheduler.config.event_groups = { list: "event_groups", property: "group" };
scheduler.init("scheduler_here");
scheduler.parse({ data, collections: { event_groups } });
```

没有标题或 Sidebar 配置时，Scheduler 渲染以下标题：

```js
["toggle_sidebar", "add_event", "spacer", "prev", "date", "next", "spacer", "today", "views"]
```

Sidebar 包含 `minicalendar` 和 `event_groups`，宽 260 像素，低于 768 像素时成为覆盖层。事件组列表在英文中标为 **Calendars**，而 API 仍将数据模型称为事件组。

如需用户选择事件组，请添加 lightbox 区段：

```js
scheduler.locale.labels.section_event_group = "Calendar";
scheduler.config.lightbox.sections = [
  { name: "description", type: "textarea", map_to: "text" },
  { name: "event_group", type: "select", map_to: "group", options: scheduler.serverList("event_groups") },
  { name: "time", type: "time", map_to: "auto" }
];
```

## 更改一个部分

可使用视图菜单或更改事件组标签，而无需重新构建布局：

```js
scheduler.config.header = ["toggle_sidebar", "prev", "date", "next", { id: "views", comp: "menu" }];
scheduler.config.sidebar = {
  items: ["minicalendar", { id: "event_groups", label: "My calendars" }]
};
```

## 添加应用内容

Toolbar `container` 项和自定义 Sidebar 项是由应用拥有的空节点。

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

框架包装器可直接拥有这些内容。通过 React `toolbarComponents` / `sidebarComponents`、Vue `toolbar-components` / `sidebar-components` 或 Angular `[toolbarComponents]` / `[sidebarComponents]` 映射项 ID。包装器将 portal、teleport 或 Angular 组件实例挂载到同一稳定节点，并在项或 Scheduler 销毁时清理。请参阅 [React](integrations/react/configuration-props.md#toolbar-and-sidebar-components)、[Vue](integrations/vue/configuration-props.md#toolbar-and-sidebar-components)和 [Angular](integrations/angular/configuration-props.md#toolbar-and-sidebar-components) 配置指南。

## 现有 Scheduler 标记

若传给 `init()` 的元素已包含旧式 Scheduler 标记，Toolbar 和 Sidebar 使用永久标记回退。Scheduler 保留标记，不创建布局外壳、Toolbar 或 Sidebar。启用布局插件前，请将旧式子标记替换为空宿主。

请参阅 [Toolbar](guides/toolbar.md)、[Sidebar](guides/sidebar.md)、[事件组](guides/event-groups.md)和 [header](api/config/header.md)。

- [Toolbar 布局示例](https://docs.dhtmlx.com/scheduler/samples/16_layout/01_toolbar.html)
- [Sidebar 布局示例](https://docs.dhtmlx.com/scheduler/samples/16_layout/02_sidebar.html)
- [完整响应式应用布局](https://docs.dhtmlx.com/scheduler/samples/16_layout/03_layout.html)
