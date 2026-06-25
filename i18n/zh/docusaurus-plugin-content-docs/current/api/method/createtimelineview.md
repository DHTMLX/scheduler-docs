---
sidebar_label: createTimelineView
title: "createTimelineView 方法"
description: "在调度程序中创建 Timeline 视图"
---

# createTimelineView
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 在调度程序中创建 Timeline 视图。

@signature: createTimelineView: (config: any) =\> void

### Parameters

- `config` - (required) *object* - Timeline 视图的配置对象

### Example

~~~jsx
// 从上午 8 点到下午 8 点，步长为 30 分钟
scheduler.createTimelineView({
    name: "timeline",
    x_unit: "minute",
    x_date: "%H:%i",
    x_step: 30,
    x_size: 24,
    x_start: 16,
    x_length: 48,
    fit_events_offset: 15,
    y_unit: [
        { key: 1, label: "分区 A" },
        { key: 2, label: "分区 B" },
        { key: 3, label: "分区 C" },
        { key: 4, label: "分区 D" }
    ],
    y_property: "section_id",
    render: "bar"
});
~~~  

**Applicable views:** [Timeline view](views/timeline.md)

### Related samples
- [单元格模式](https://docs.dhtmlx.com/scheduler/samples/06_timeline/01_slots.html)
- [条形模式](https://docs.dhtmlx.com/scheduler/samples/06_timeline/02_lines.html)
- [树形模式](https://docs.dhtmlx.com/scheduler/samples/06_timeline/03_tree.html)
- [Days as Timeline rows](https://docs.dhtmlx.com/scheduler/samples/06_timeline/14_days_as_sections.html)

### Details

:::note
 此方法需要激活 [timeline](guides/extensions-list.md#timeline) 插件。 
:::

Timeline 视图的配置对象可以包含以下属性：

- `name` - (*string*) 视图的 ID。若你指定的名称与已存在的 Timeline 视图同名，则会被覆盖
- `render` - (*'cell', 'bar', 'tree', 'days'*) 视图模式。默认值为 'cell'
- `y_property` - (*string*) 将用于将事件分配到特定分区的数据属性名
- `y_unit` - (*array of objects*) 定义视图的分区。数组中的每个对象表示一个单独的分区，并具有以下属性：
    - `children` - (*array*) 嵌套项对象数组（仅在 'Tree' 模式下）
    - `key` - (*string*) 分区的 ID。此属性将与事件数据属性进行比对以将事件分配到分区
    - `label` - (*string*) 分区的标签
    - `open` - (*boolean*) 指定分区是否在初始时展开（仅在 'Tree' 模式下）
- `days` - (*number*) Y 轴上的项（天数）。仅适用于 'Days' 模式
- `x_unit` - (*minute, hour, day, week, month, year*) X 轴的度量单位。默认值为 'minute'
- `x_date` - (*string*) [X 轴](guides/settings-format.md) 的日期格式。如果未指定，将使用 [`hour_date`](api/config/hour_date.md) 格式
- `x_step` - (*number*) X 轴在 `x_unit` 内的步长。默认值为 1
- `x_start` - (*number*) X 轴在 `x_unit` 内的偏移量。默认值为 0
- `x_size` - (*number*) X 轴的长度，以 `x_step` 的总数表示。默认值为 24
- `x_length` - (*number*) 当用户在调度程序头部点击“下一步”按钮时一次滚动的 `x_step` 数量。可选。默认值为 1。
这是一个有点复杂的参数，为避免出错，请记住以下要点：
    - 仅当 `x_unit='minute'` 或 `x_unit='hour'` 时才能使用该参数。在其它情况下，不需要明确指定该参数。
    - 如果 `x_unit='minute'` 或 `x_unit='hour'` 且未指定 `x_length`，X 轴将显示由剩余尺度参数（`x_start`, `x_step`, `x_size`）决定的时间区间（而非整天）。这使你可以将一天分成均等时间区间并通过“下一步”按钮滚动它们。
    - 如果 `x_unit='minute'` 或 `x_unit='hour'`，且你决定设置该参数，请将其设为整天的长度（即 `x_length` 应等于填充整天所需的 `x_steps` 数量），以确保“下一步”按钮的正确工作。
- `first_hour` - (*number*) 设置单元格时间区间的起始小时。仅在 `x_unit="day"` 时适用
- `last_hour` - (*number*) 设置单元格时间区间的结束小时。仅在 `x_unit="day"` 时适用
- `show_unassigned` - (*boolean*) 若为 *false*，属于任一区段的事件不会显示；若为 *true*，此类事件将放置到第一个分区。默认值为 *false*。可选
- `section_autoheight` - (*boolean*) 启用单元格的自动高度调整。默认值为 *true*
- `dy` - (*number*) 单元格的最小高度（若 `section_autoheight` 为 *false*，单元格高度等于 `dy`；否则高度将增高以填充所有空闲空间）。默认值为 50
- `dx` - (*number*) 左侧分区名称列的宽度。默认值为 200
- `event_dy` - (*number/string*) 事件的高度。可以取值为 `full`，占满整个单元格。默认值等于 `scheduler.xy.bar_height-5`
- `event_min_dy` - (*number*) 最小事件高度。默认值等于 `scheduler.xy.bar_height-5`
- `resize_events` - (*boolean*) 指定是否应降低单个事件的高度，使总高度等于一个事件的高度（但不低于 `event_min_dy`）。默认值为 *true*
- `fit_events` - (*boolean*) 指定是否应增加分区高度以容纳该分区中的所有事件，或保持固定（`dy` 参数）。自版本 3.0 起可用。默认值为 *true*
- `fit_events_offset` - (*number*) 在最后一个事件下方添加额外的空隙（像素）。当 `fit_events` 设置为 *true* 时应用
- `round_position` - (*boolean*) 将事件在单元格宽度上“拉伸”到整个宽度，不论事件持续时间长短。默认值为 *false*。仅适用于 'Bar' 和 'Tree' 模式
- `folder_events_available` - (*boolean*) 当你希望对整个文件夹（任意层级）也能给事件指定时，应将其设为 *true*。仅适用于 'Tree' 模式。默认值为 *false*
- `folder_dy` - (*number*) 文件夹在像素中的高度（文件夹是具有子分区的分区）。仅适用于 'Tree' 模式
- `second_scale` - (*object*) 在默认 X 轴之上添加第二条 X 轴，用于在原始刻度上对时间区间进行分组。可选。从版本 3.0 起可用。刻度对象具有以下属性：
    - `x_unit` - (*minute, hour, day, week, month, year*) 轴的度量单位。默认值为 'minute'
    - `x_date` - (*string*) 轴的日期格式。如果未指定，将使用 [`hour_date`](api/config/hour_date.md) 格式
- `scrollable` - (*boolean*) 使 Timeline 视图支持水平滚动，默认为 false。若为 *false* 或未定义，日期列将收缩以适应视口宽度。
若为 *true*，日期列不会收缩到低于 `column_width` 的值，当需要时会出现水平滚动条。
- `column_width` - (*number*) 定义时间线日期列的最小宽度，默认 100
- `scroll_position` - (*Date*) 渲染后将 Timeline 滚动到指定位置，参数与 `timeline.scrollTo()` 相同，即渲染后你希望 Timeline 滚动到的日期
- `autoscroll` - (*object*) 允许配置自动滚动的灵敏度和速度。autoscroll 对象具有以下属性：
    - `range_x` - (*number*) 数据区域边缘的水平自动滚动距离
    - `range_y` - (*number*) 数据区域边缘的垂直自动滚动距离
    - `speed_x` - (*number*) 水平自动滚动速度
    - `speed_y` - (*number*) 垂直自动滚动速度
- `cell_template` - (*boolean*) 启用为时间线指定的模板渲染
- `smart_rendering` - (*boolean*) 启用时间线中的智能渲染功能（在滚动时仅渲染屏幕上可见的行、列和事件，其他元素在滚动时间线时被渲染）。请注意，在可滚动时间线中默认启用此设置。
- `columns` - (*array*) 左侧面板的列列表。若未指定，将使用 [`timeline_scale_label`](api/template/timelinename_scale_label.md) 模板作为面板内容。

## 动态属性变更

所有定义的 timeline 对象都存储在 `scheduler.matrix` 对象中。
你可以通过名称访问任意 timeline 视图的配置并修改任意属性。修改将在你使用 `setCurrentView()` 更新调度程序时立即应用：

~~~js
scheduler.getView('timeline').x_size = 12;
scheduler.setCurrentView(); // 重新绘制调度程序
~~~

其中 "timeline" 是在 [`createTimelineView()`](api/method/createtimelineview.md) 方法中指定的 Timeline 视图名称：

~~~js
scheduler.createTimelineView({
    name: "timeline",
    ...
});
~~~