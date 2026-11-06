---
title: Sidebar
sidebar_label: Sidebar
---

# Sidebar

Sidebar 插件在 Scheduler 日历旁渲染一个面板。请在 `init()` 前启用。

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

`minicalendar` 和 `event_groups` 是默认项。仅当启用 `scheduler.config.event_groups` 时才显示事件组项。设置 `collapsed: true` 可让面板初始折叠，设置 `position: "right"` 可将其置于右侧，或将 `sidebar` 设为 `false` 禁用。

低于 `overlay_width` 时，只有存在可见的 `toggle_sidebar` Toolbar 项，面板才会成为关闭的覆盖层。请在自定义标题中包含该项，或将其放入独立 Toolbar。没有切换项或禁用 Toolbar 时，面板保持停靠。

## Sidebar 配置

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| `position` | *"left" \| "right"* | 面板位于 Scheduler 的哪一侧。默认值为 `"left"`。 |
| `width` | *number* | 停靠 Sidebar 的像素宽度。默认值为 `260`。 |
| `collapsed` | *boolean* | 停靠 Sidebar 初始是否隐藏。默认值为 `false`。 |
| `overlay_width` | *number* | Sidebar 可成为覆盖层的外壳宽度断点。默认值为 `768`；使用 `0` 禁用覆盖模式。 |
| `items` | *Array* | 从上到下渲染的内置和自定义项。 |

### Sidebar 项

| 项 | 描述 |
| --- | --- |
| `"minicalendar"` | 渲染关联的迷你日历。在项对象上设置 `mark_events: true` 可标记包含事件的日期。 |
| `"event_groups"` | 启用 `scheduler.config.event_groups` 时渲染事件组过滤列表。项对象接受 `label` 和 `select_all`。 |
| `{ id, css }` | 创建空的自定义容器。`css` 向容器添加类；通过 `onSidebarItemRender` 填充内容。 |

## 自定义项

自定义 Sidebar 项是空容器。请在 `onSidebarItemRender` 中填充。

```js
scheduler.config.sidebar = { items: [{ id: "filters", css: "app-filters" }, "minicalendar"] };
scheduler.attachEvent("onSidebarItemRender", (id, node) => {
  if (id === "filters") node.innerHTML = "<strong>Filters</strong>";
});
```

使用 `scheduler.ext.sidebar.show()`、`hide()` 或 `toggle()` 更改运行时状态。这些调用不会更改 `scheduler.config.sidebar.collapsed`。

## 现有标记

当初始化宿主包含旧式 `.dhx_cal_*` 标记时，Sidebar 使用永久标记回退，不会渲染外壳或 Sidebar。若要使用插件布局，请在空宿主中初始化。

请参阅 [sidebar 配置](api/config/sidebar.md)和[应用布局](guides/application-layout.md)。
