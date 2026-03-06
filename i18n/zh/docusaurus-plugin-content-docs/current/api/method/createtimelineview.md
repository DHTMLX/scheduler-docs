---
sidebar_label: "createTimelineView"
title: "createTimelineView method"
description: "在 scheduler 中设置 Timeline 视图"
---

# createTimelineView
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 在 scheduler 中设置 Timeline 视图

@signature: createTimelineView: (config: any) =\> void

### Parameters

- `config` - (required) *object* - Timeline 视图的配置对象

### Example

~~~jsx
// 时间刻度从上午8点到晚上8点，间隔为30分钟
scheduler.createTimelineView({
    name: "timeline",
    x_unit:    "minute",
    x_date:    "%H:%i",
    x_step:    30,
    x_size:    24,
    x_start: 16,
    x_length: 48,
    fit_events_offset: 15,
    y_unit:[    
         {key:1, label:"Section A"},
        {key:2, label:"Section B"},
        {key:3, label:"Section C"},
        {key:4, label:"Section D"}    
    ],
    y_property: "section_id",
    render:    "bar"
});
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Related samples
- [Cell mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/01_slots.html)
- [Bar mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/02_lines.html)
- [Tree mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/03_tree.html)
- [Days as Timeline rows](https://docs.dhtmlx.com/scheduler/samples/06_timeline/14_days_as_sections.html)

### Details

:::note
 该方法需要启用 [timeline](/guides/extensions-list/#timeline) 插件。 
:::


Timeline 视图的配置对象支持以下属性:

- <b>name</b>- (<i>string</i>) 视图的标识符。定义与已有 Timeline 视图相同的 name 会覆盖该视图
- <b>render</b> - (<i>'cell', 'bar', 'tree', 'days'</i>) 定义视图模式。默认为 'cell'
- <b>y_property</b> - (<i>string</i>) 用于将事件关联到特定区块的数据属性
- <b>y_unit</b> - (<i>对象数组</i>) 定义视图中的区块。<br> 每个对象代表一个区块，包含以下属性:
    - <b>children</b> - (<i>数组</i>) 仅用于 'Tree' 模式的嵌套子项
    - <b>key</b> - (<i>string</i>) 区块的 ID，用于匹配事件属性以分配事件
    - <b>label</b> - (<i>string</i>) 区块显示标签
    - <b>open</b> - (<i>boolean</i>) 区块是否初始展开（仅对 'Tree' 模式）
- <b>days</b> - (<i>number</i>) Y 轴上的项目数量（天数），仅对 'Days' 模式有效
- <b>x_unit</b> - (<i>minute, hour, day, week, month, year</i>) X 轴的时间单位。默认为 'minute'
- <b>x_date</b> - (<i>string</i>) X 轴日期格式（参见 [날짜 형식 지정](guides/settings-format.md)）。若未设置，使用 [hour_date](api/config/hour_date.md) 格式
- <b>x_step</b> - (<i>number</i>) X 轴步长，单位为 <b>'x_unit'</b>。默认为 1
- <b>x_start</b> - (<i>number</i>) X 轴起始偏移，单位为 <b>'x_unit'</b>。默认为 0
- <b>x_size</b> - (<i>number</i>) X 轴总长度，表示 <b>'x_step'</b> 的数量。默认为 24
- <b>x_length</b> - (<i>number</i>) 点击调度器头部"下一页"按钮时滚动的 <b>'x_step'</b> 数量。可选，默认为 1。  
此参数较为复杂，请注意:
    - 仅当 <b>x_unit='minute'</b> 或 <b>x_unit='hour'</b> 时有效，其他单位可省略。
    - 若未设置 <b>x_length</b>，时间线根据其他刻度参数（<b>x_start</b>, <b>x_step</b>, <b>x_size</b>）显示部分日间区间，允许滚动浏览日段。
    - 若设置了 <b>x_length</b>，应覆盖整天（填满一天的 <b>x_step</b> 数量），确保"下一页"按钮正常工作。
- <b>first_hour</b> - (<i>number</i>) 单元格内时间区间的起始小时，仅当 <b>x_unit="day"</b> 有效
- <b>last_hour</b> - (<i>number</i>) 单元格内时间区间的结束小时，仅当 <b>x_unit="day"</b> 有效
- <b>show_unassigned</b> (<i>boolean</i>) 若为 false，则未分配到任何区块的事件不显示；若为 true，则这些事件显示在第一个区块。默认为 false，可选
- <b>section_autoheight</b> - (<i>boolean</i>) 是否启用单元格高度自动调整。默认为 true
- <b>dy</b> - (<i>number</i>) 最小单元格高度（若 <b>section_autoheight</b> 为 false，单元格高度固定为此值；否则高度自动扩展以填充空间）。默认为 50
- <b>dx</b> - (<i>number</i>) 显示区块名称的列宽。默认为 200
- <b>event_dy</b> - (<i>number/string</i>) 事件高度；可设为 'full' 以填满整个单元格。默认为 <b>scheduler.xy.bar_height-5</b>
- <b>event_min_dy</b> - (<i>number</i>) 事件最小高度。默认为 <b>scheduler.xy.bar_height-5</b>
- <b>resize_events</b> - (<i>boolean</i>) 是否允许单个事件高度缩小以适应单个事件高度（不低于 <b>event_min_dy</b>）。默认为 true
- <b>fit_events</b> - (<i>boolean</i>) 是否扩展区块高度以适应所有事件，或保持固定高度（<b>dy</b>）。3.0 版本起支持。默认为 true
- <b>fit_events_offset</b> - (<i>number</i>) 当 <b>fit_events</b> 为 true 时，最后一个事件下方的额外空白（像素）
- <b>round_position</b> - (<i>boolean</i>) 是否将事件拉伸至单元格全宽，无论持续时间。默认为 false。仅适用于 'bar' 和 'tree' 模式
- <b>folder_events_available</b> - (<i>boolean</i>) 是否允许将事件分配给整个文件夹（任意层级），而非仅分配给单独持有者。仅适用于 'tree' 模式。默认为 false
- <b>folder_dy</b> - (<i>number</i>) 文件夹（包含子区块的区块）高度（像素）。仅适用于 'tree' 模式
- <b>second_scale</b> - (<i>object</i>) 在默认 X 轴上方添加第二个 X 轴，用于分组时间区间。可选，3.0 版本起支持。<br> 对象包含:
    - <b>x_unit</b> - (<i>minute, hour, day, week, month, year</i>) 时间单位。默认为 'minute'
    - <b>x_date</b> - (<i>string</i>) 日期格式（参见 [날짜 형식 지정](guides/settings-format.md)）。若未设置，使用 [hour_date](api/config/hour_date.md) 格式
- <b>scrollable</b> - (<i>boolean</i>) 是否启用 Timeline 视图的水平滚动；默认为 false。若为 false 或未定义，日期列会缩小以适应视口宽度。若为 true，列宽不会小于 <b>column_width</b>，并在需要时显示水平滚动条。
- <b>column_width</b> - (<i>number</i>) 时间线日期列的最小宽度；默认为 100
- <b>scroll_position</b> - (<i>Date</i>) 渲染后滚动到指定日期；接受与 <b>timeline.scrollTo()</b> 相同的参数
- <b>autoscroll</b> - (<i>object</i>) 配置自动滚动的灵敏度和速度，属性包括:
    - <b>range_x</b> - (<i>number</i>) 数据区边缘的水平自动滚动距离
    - <b>range_y</b> - (<i>number</i>) 数据区边缘的垂直自动滚动距离
    - <b>speed_x</b> - (<i>number</i>) 水平自动滚动速度
    - <b>speed_y</b> - (<i>number</i>) 垂直自动滚动速度
- <b>cell_template</b> - (<i>boolean</i>) 是否启用自定义 Timeline 单元格模板渲染
- **smart_rendering** - (*boolean*) 是否启用智能渲染，仅渲染可见的行、列和事件，其他在滚动时加载。可滚动时间线默认启用。
- <b>columns</b>- (<i>数组</i>) 指定左侧面板的列。若未提供，使用 [timeline_scale_label](api/template/timelinename_scale_label.md) 模板。


## 动态修改属性

所有 timeline 视图均存储于 **scheduler.matrix** 中。
你可以通过视图名称访问并修改任意 timeline 视图配置。更新后需重绘 scheduler 以生效:

~~~js
scheduler.getView('timeline').x_size = 12;
scheduler.setCurrentView(); // 重新绘制 scheduler
~~~


这里的 "timeline" 是在 [createTimelineView](api/method/createtimelineview.md) 方法中赋予 timeline 视图的名称:

~~~js
scheduler.createTimelineView({
    name:"timeline",
    ...
});
~~~


