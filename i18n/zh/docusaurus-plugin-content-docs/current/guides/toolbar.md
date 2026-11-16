---
title: Toolbar
sidebar_label: Toolbar
---

# Toolbar

Toolbar 插件使用 Scheduler UI kit 在日历上方渲染 `scheduler.config.header`。请在 `init()` 前启用：

~~~js
scheduler.plugins({ toolbar: true, minical: true });
scheduler.config.header = ["prev", "date", "next", "today", { id: "views", comp: "segmented" }];
scheduler.init("scheduler_here");
~~~

没有 `header` 时，Toolbar 使用 `add_event, spacer, prev, date, next, spacer, today, views`，且不更改配置。若启用 Sidebar 插件，`toggle_sidebar` 是第一个默认项。将 `header` 设为 `false` 可隐藏外部 Toolbar。

普通标题字符串保留旧式含义（`prev`、`next`、`today`、`date`、视图名称、`minicalendar`、`button`、`spacer`）。新的内置项为 `views`、`add_event` 和 `toggle_sidebar`；`"|"` 渲染分隔符。新项对象使用 `{ id, comp, label, ... }`，包括空的 `{ id, comp: "container" }` 宿主。字符串依次解析为旧式名称、现有视图、Toolbar 内置项和视图选项卡。因此名为 `views` 的自定义视图仍是视图选项卡。

## Toolbar 配置

Toolbar 使用 `scheduler.config.header`，没有单独的 `scheduler.config.toolbar` 对象。

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| `toolbar` | *boolean* | 在 `init()` 前启用 Toolbar 的 `scheduler.plugins()` 选项。 |
| `header` | *Array \| object \| false* | Toolbar 项列表或嵌套 `rows`/`cols` 布局。设为 `false` 可隐藏外部 Toolbar。 |
| `header.height` | *number* | Toolbar 的正像素固定高度。未设置时，项换行会使 Toolbar 增高。 |
| `rows` / `cols` | *Array* | 用于多行或分组 Toolbar 的嵌套布局组。 |
| `align` | *"left" \| "right"* | `rows` 或 `cols` 组中项的对齐方式。 |

### Toolbar 项属性

| 属性 | 类型 | 描述 |
| --- | --- | --- |
| `id` | *string \| number* | 项标识符，也为 `views`、`add_event`、`toggle_sidebar` 等 ID 选择内置行为。 |
| `comp` | *string* | UI kit 控件：`button`、`toggle`、`menu`、`combo`、`segmented`、`text`、`stepper`、`datepicker`、`separator`、`spacer` 或 `container`。 |
| `label` / `icon` / `tooltip` | *string* | 可见标签、图标 CSS 类和可访问的悬停标签。 |
| `options` / `items` | *Array* | `combo`/`segmented` 的选项或 `menu` 的菜单项。 |
| `value` / `placeholder` | *any \| string* | 值控件的选定值或占位符。 |
| `css` / `width` / `height` / `align` | *string \| number* | 外观、尺寸和项对齐覆盖值。 |
| `disabled` / `hidden` | *boolean* | 禁用或隐藏项。 |

仍支持旧式 `{ html, click, css }` 项。`click` 在 `onToolbarItemClick` 前运行，`this` 指向项节点；其返回值不会取消操作。不要将旧式 `view`、`html` 或 `click` 与 `id` 组合：Toolbar 会渲染旧式项，并警告新的属性被忽略。

## 自定义内容和运行时更改

应用拥有内容时请使用容器：

~~~js
scheduler.config.header = ["prev", { id: "search", comp: "container" }];
scheduler.attachEvent("onToolbarItemRender", (id, node) => {
  if (id === "search") node.appendChild(document.createElement("input"));
});
~~~

[`scheduler.ext.toolbar`](api/other/toolbar.md) 提供 `setItems`、`updateItem`、`getItem`、`getValue`、`setValue`、`show`、`hide`、`refresh`、`getItemNode` 和 `getDefaultItems`。对于重复 ID，将按深度优先视觉顺序计算的从零开始的 occurrence 作为最后参数传入。`1` 和 `"1"` 共享一个 ID。运行时补丁在等价或非结构性标题更改后保留；结构性声明更改会清除它们。`setItems()` 是运行时结构，在下次声明式标题更改时清除。

[`onToolbarItemClick`](api/event/ontoolbaritemclick.md) 和 [`onToolbarItemChange`](api/event/ontoolbaritemchange.md) 可取消。旧式 `click` 先运行；Toolbar 事件返回 `false` 可阻止 Scheduler 操作。

## 布局、键盘和生命周期

`getLayoutSize()` 返回外壳整数 `clientWidth`/`clientHeight`，外壳分离或隐藏时返回 `null`。`onLayoutSizeChange(size)` 在标题协调前发出，因此可在同一次渲染中选择响应式标题。将 `header.height` 设为正像素值或使用 `--dhx-scheduler-toolbar-height`；除非标题提供正高度，否则 `xy.nav_height = 0` 会隐藏 Toolbar。

每个 Toolbar 运行区是一个 Tab 停靠点。其控件处理方向键、Home 和 End；Ctrl+Left、Ctrl+Right、Alt+1 到 Alt+9 以及水平滑动使用同一 Toolbar 操作/事件路径。输入框和自定义容器保留编辑按键。使用 `.dhx_scheduler_toolbar`、`data-item-id` 和 `data-item-occurrence` 设置外部区域样式；它有意不公开可见的 `dhx_cal_*` 控件。

Toolbar 模式将 `init()` 宿主变为 `.dhx_scheduler_shell`；`_obj`、`$container` 和 `$root` 指向内部日历。若提供完整旧式标记且初始标题不存在或为 `false`，Scheduler 改用永久标记回退：不创建外壳，变更 API 不执行操作。导出和销毁会按 Scheduler 实例隔离 Toolbar 资源。

对于包装器，请在 Scheduler 插件 prop 中启用相同插件，例如 React 的 `plugins={{ toolbar: true }}`、Vue 的 `:plugins="{ toolbar: true }"` 或 Angular 的 `[plugins]="{ toolbar: true }"`。

另请参阅 [header](api/config/header.md)、[初始化](guides/initialization.md)、[键盘导航](guides/keyboard-navigation.md)和[迷你日历](guides/minicalendar.md)。