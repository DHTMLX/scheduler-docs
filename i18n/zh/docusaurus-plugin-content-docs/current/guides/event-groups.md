---
sidebar_label: 事件组
title: 事件组
description: 通过命名集合为 Scheduler 事件着色、显示或隐藏事件
---

# 事件组

事件组是 Scheduler 核心功能，在 GPL 和 PRO 版本中均可使用。事件在可配置属性中具有一个组键。组可以表示日历、事件类型、项目或团队；无需 Sidebar 或插件。

```js
scheduler.config.event_groups = { list: "event_groups", property: "group", default: "work" };
scheduler.serverList("event_groups", [
  { key: "work", label: "Work", color: "#537cfa", textColor: "#fff" },
  { key: "personal", label: "Personal", color: "#39a675", active: false }
]);
scheduler.init("scheduler_here", new Date(), "week");
scheduler.parse([{ id: 1, start_date: "2026-10-19 09:00", end_date: "2026-10-19 10:00", group: "work" }]);
```

将 `event_groups` 设为 `{}` 会使用 `event_groups` 集合和事件属性 `group`。非数组对象启用该功能；`undefined`、`null`、`false` 或删除配置键会在下次渲染时禁用。`init()` 后的配置更改在下次 `scheduler.render()` 时生效。React、Vue 和 Angular 包装器通过其 `config` prop 或输入应用新增、更改和删除。每个 Scheduler 实例只能有一项活动的 `event_groups` 配置、集合名称和事件属性。

组项具有 `key`、`label` 以及可选的 `color`、`textColor`、`active` 字段。在 JSON 集合中，`value` 可作为别名并映射到 `key`。其他字段仍可供应用代码使用。特别是 `readonly` 当前没有内置效果：此版本不提供添加、编辑或删除组的控件。仅当 `active === false` 时组才会隐藏。隐藏组中的事件仍会加载，但不会出现在视图和迷你日历的事件标记中。隐藏组不会删除 Units 列或 Timeline 行。用户视图过滤器和包装器过滤器会与组可见性同时应用。

键可以是非空字符串、有限数字或布尔值。匹配遵循 lightbox select 控件的字符串值：`1` 和 `"1"` 标识同一组。使用第一个键匹配项；无效项和后续重复项会被忽略。事件值 `undefined`、`null`、`""`、未知键、数组及其他多选值视为未分组：它们保持可见且不使用组颜色。不要将多选属性用作组属性。

两个颜色通道独立解析：事件的 `color` 或 `textColor` 优先，其次是 `event_class` 等事件节点 CSS 规则，然后是对应的组颜色，最后是主题。空或 null 的组颜色会回退到 CSS 或主题。

通过 Scheduler UI 或 `addEventNow()` 创建的新事件会获得配置的 `default` 组（若该组活动），否则使用第一个活动组。若没有活动组，属性保持为空且事件显示。Scheduler 仅填充 `undefined`、`null` 或 `""`；传入 `addEventNow()` 的值和 `onEventCreated` 中的更改会保留。应用代码可以有意分配隐藏组，从而隐藏事件。已加载事件和普通导入保留所提供的值。

使用 `scheduler.ext.eventGroups.setActive(key, active)` 切换组，用 `isActive(key)` 读取状态。`setActive` 先触发可取消的 `onBeforeEventGroupActiveChange(key, active)`，更改成功后触发 `onEventGroupActiveChange(key, active)`。可通过 `scheduler.updateCollection("event_groups", items)` 或 JSON `collections` 替换组；对于两个列表中都存在的键，这些途径同样遵守活动状态更改否决。直接编辑项会在下次显式渲染时显示，但不会自动重绘。

如需用户在 lightbox 中更改事件组，请添加 select 区段及标签：

```js
scheduler.locale.labels.section_event_group = "Calendar";
scheduler.config.lightbox.sections = [
  { name: "description", type: "textarea", map_to: "text" },
  { name: "event_group", type: "select", options: scheduler.serverList("event_groups"), map_to: "group" },
  { name: "time", type: "time", map_to: "auto" }
];
```

事件组不会更改默认 lightbox，也不会添加组编辑控件。

[Sidebar 和事件组列表示例](https://docs.dhtmlx.com/scheduler/samples/16_layout/02_sidebar.html)
