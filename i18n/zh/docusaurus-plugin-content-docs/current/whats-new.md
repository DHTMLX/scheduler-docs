---
title: "更新日志"
sidebar_label: "更新日志"
---

# 更新日志

如果您正在从旧版本更新 Scheduler，请查看 [从旧版本迁移](migration.md) 以了解详细信息。


7.2.13
-------------
<span class='release_date'>2026年3月31日。错误修复版本</span>

### 修复

- 修复 [React Scheduler](integrations/react/overview.md) 中的不正确的试用警告
- 修复在 [React Scheduler](integrations/react/overview.md) 中与远程更新相关的回归问题：编辑事件时未将更改应用到现有事件


7.2.12
-------------
<span class='release_date'>2026年3月23日。错误修复版本</span>

### 修复

- 修复在使用非默认主题且启用 [cookie] 插件时，在重新加载页面时 [React Scheduler] 崩溃的问题
- 修复在 [React Scheduler](integrations/react/overview.md) 中，`data` 属性中的 `save` URL 未正确应用的回归问题
- 修复在“此及以下事件”模式中编辑一个非首个出现的 [重复事件] 时未应用所有 [Lightbox] 字段更改的问题
- 修复基于事件条件动态更改 [Quick Info] 按钮时未正确更新弹出框的问题
- 修复在“此事件及以下事件”模式中修改单个 [重复事件] 发生的文本在编辑后被后续发生覆盖的问题
- 修复 [Quick Info] 弹出框的溢出样式，以正确处理较长的事件描述
- 修复在 [React Scheduler](integrations/react/overview.md) 添加事件到现有数据集时，通过 `useState` 函数触发的脚本错误


### 更新

- 新增：可以用自定义对话框替换 [recurring event confirmation modal](guides/recurring-events.md#customconfirmationmodal)。
- 新增：可以在 [React Scheduler](integrations/react/overview.md) 中通过 modals.onRecurrenceConfirm 属性替换 [recurring event confirmation modal](integrations/react/overview.md#customizingtherecurrenceconfirmationmodal)。


7.2.11
-------------
<span class='release_date'>2026年1月12日。错误修复版本</span>

### 修复

- 修复在 [React Scheduler](integrations/react/overview.md) 中，如果 `save` 处理程序未返回新的 ID，新事件会被重复创建的问题
- 修复在 [Timeline view](views/timeline.md) 模板未在 [React Scheduler](integrations/react/overview.md) 中应用的问题
- 修复在 [Timeline view](views/timeline.md) 使用过滤时，事件绑定到分区的不正确问题，在 [React Scheduler](integrations/react/overview.md) 中
- 修复在 [Agenda view](views/agenda.md) 中，当 [header configuration](guides/initialization.md#initializing-scheduler-via-header-config) 未包含 `date` 部分时的脚本错误
- 修复在使用 [Material skin](guides/skins.md#material-skin) 时，[Year] 和 [Agenda] 视图的头部元素显示不正确的问题
- 修复从基于插件的初始视图切换到标准视图时，在 [React Scheduler](integrations/react/overview.md) 中的布局问题
- 修复当一个全天 [重复事件] 的持续时间恰好为 24 小时时，出现虚假事件块的问题
- 修复在同一天通过拖拽创建多个事件时，在 [Month view] 中启用 `year_view` 插件后 [Lightbox] 无法打开的问题


7.2.10
-------------
<span class='release_date'>2025年12月10日。错误修复版本</span>

### 修复

- 修复在从最后一列拖动时，事件向左跳动的问题，这在 [multiday Units view] 中发生
- 修复在特定月份中 [Month view] 某些日期单元格缺失的问题
- 修复在移动设备上使用 [container_autoresize] 插件时的拖拽创建问题
- 修复水平滚动后在 [Units view] 中通过双击创建事件时的失败问题


7.2.9
---------------
<span class='release_date'>2025年9月19日。错误修复版本</span>

### 修复

- 修复在 [Timeline view] 中出现的内存泄漏
- 修复 [container_autoresize] 插件与 [Week Agenda] 视图之间的兼容性问题
- 修复 [onScaleDblClick] 未按预期触发的问题
- 修复在处理 [重复事件] 时 [onEventSave] 与 [DataProcessor] 的行为不一致的问题
- 修复 [React Scheduler] 中因组件的多个实例导致模板重复的问题
- 修复在 [React Scheduler](integrations/react/overview.md) 中对 `events` prop 的变化处理不正确的问题


## 7.2.8

<span class='release_date'>2025年7月30日。错误修复版本</span>

### 新增

- 为 [React Scheduler](integrations/react/overview.md) 添加了示例，覆盖 Commercial、Enterprise、Ultimate 以及 Evaluation 包

### 修复

- 修复在删除其后续出现项后拖动一个 [重复事件] 时行为不正确的问题
- 确保对修改过的 [series instances]，Lightbox 的 “Repeat Event” 控件被禁用
- 修复对 [recurring events] 的遗留标签显示不正确的问题
- 修复 [max_month_events] 设置与 [multi-day events] 之间的冲突，这导致在 [Month view] 中事件消失或重叠
- 确保通过 HTTPS 设置的 Scheduler cookies 现在包含 **Secure** 属性
- 修复 [event_duration] 设置导致解析的事件数据损坏的问题
- 修复 [time_step] 设置导致解析的事件数据损坏的问题


## 7.2.6

<span class='release_date'>2025年6月26日。错误修复版本</span>

### 修复

- 修复事件时间的秒级精度问题
- 修复在短月份期间 [Timeline view] 的拖拽行为不正确的问题
- 修复 [Timeline view] 中事件的舍入不正确的问题
- 防止 [DataProcessor] 向 [custom router] 参数添加 !nativeeditor_status 属性


## 7.2.5

<span class='release_date'>2025年5月20日。修复版本</span>

- [Lightbox 时间控件](guides/time.md) 现在在日期选择器中能正确显示每月的天数。
- 解决了 Salesforce 试用版中出现的脚本错误。
- 修复了 Scheduler v7.2 后 "今天" 单元格未在 [月视图](views/month.md) 中高亮显示的问题。
- 当启用 [round_position](views/timeline.md#stretchingeventsoverthecell) 时，修正了调整事件大小时 `end_date` 的计算。
- 解决了当内容较长时，[Tooltip](guides/tooltips.md) 显示偏离屏幕的问题。

## 7.2.4

<span class='release_date'>2025年5月6日。修复版本</span>

### 修复

- 修复了在 [Timeline 视图](views/timeline.md) 中事件移动或调整大小时，[ignore_timeline](views/timeline.md#timeintervalforviewcells) 设置表现异常的问题。
- 修正了在启用 [ignore_timeline](views/timeline.md#timeintervalforviewcells) 时新建事件的 `end_date` 计算。
- 修复了 [lightbox](guides/lightbox-editors.md) 按钮配置在保存到存储后混乱的问题。
- 解决了 [container_autoresize](/guides/extensions-list/#containerautoresize) 插件在空的 [议程视图](views/agenda.md) 下意外增大容器尺寸的问题。
- 修复了在启用 [mark_now](api/config/mark_now.md) 选项时，[Units 视图](views/units.md) 某些 `size` 设置值导致的脚本错误。
- 修正了当 `smart_rendering` 设置为 `false` 时，[Timeline 视图](views/timeline.md) 的横向滚动行为。

## 7.2.3

<span class='release_date'>2025年4月9日。修复版本</span>

### 修复

- 修复了当任务超出图表可见时间范围时，网格单元格无法获得焦点的问题。
- 解决了 [multiUserBackend](guides/multiuser-live-updates.md) 扩展在编辑所有重复事件时行为异常的问题。
- 修复了 [Timeline 视图](views/timeline.md) 中 `timeline_scalex_class` 重复添加类的问题。
- 修正了 `scrollTo((section: x))` 在 [Timeline 视图](views/timeline.md) 中无法正确滚动到首个分区的问题。
- 修复了 [lightbox](guides/lightbox-editors.md) 中 section `height` 设置无法正确应用的问题。
- 解决了 [Mini Calendar](guides/minicalendar.md) 忽略 `rtl` 配置的问题。
- 修复了在使用多个 [Timeline 视图](views/timeline.md) 且 `smart_rendering:true`、`scrollable:false` 时，智能渲染仅在第一个视图生效的问题。
- 修正了在 [Timeline 视图](views/timeline.md) 中结合 `first_hour`/`last_hour` 与 `round_position` 使用时拖动导致事件日期错误的问题。

## 7.2.2

<span class='release_date'>2025年2月13日。修复版本</span>

- 修复了对 [重复事件](guides/recurring-events.md) 已修改实例的过滤问题。
- 确保 [month_date](api/template/month_date.md) 模板对 [年视图](views/year.md) 生效。
- 修正了在 [Timeline 视图](views/timeline.md) 中使用 [multisection](views/units.md#assigningeventstoseveralunits) 事件并启用 `round_position: true` 时的行为。
- 防止 [重复事件](guides/recurring-events.md) 实例在 [Timeline 视图](views/timeline.md) 可见范围之外时被截断。
- 修复了使用"当前及后续"选项编辑 [重复事件](guides/recurring-events.md) 时的问题。

## 7.2.1

<span class='release_date'>2025年1月16日。修复版本</span>

- 防止 [重复事件实例](guides/recurring-events.md) 在夏令时（DST）切换期间消失。
- 修复了编辑新建 [重复事件](guides/recurring-events.md) 时发生的脚本错误。
- 修正了加载后端数据后 [事件实例](guides/recurring-events.md) 的显示问题。
- 修复了在 [Units 视图](views/units.md) 中调整 `size` 属性超出可用列时的错误。
- 确保 [树形 Timeline 视图](views/timeline.md) 多级文件夹在所有嵌套级别正确显示。
- 修复了在为重复事件打开 lightbox 时，`readonly_form` 配置项导致的错误。
- 修正了在修改跨特定工作日的每周重复事件"当前及后续"实例时的重复模式问题。

## 7.2

<span class='release_date'>2024年12月17日。小版本更新</span>

[查看博客中的版本评述](https://dhtmlx.com/blog/dhtmlx-scheduler-7-2/)

### 重大变更

本次更新对部分地图配置属性进行了变更。详情请参阅 [迁移说明](migration.md)。

### 新功能

- 增加了编辑[当前及后续重复事件](guides/recurring-events.md)的能力。
- 引入了新的[实时更新模块](guides/multiuser-live-updates.md)，支持协作编辑。

### 更新

- 改进了[跨夜事件](api/config/all_timed.md)的显示方式。
- 更新了 [Mini Calendar](guides/minicalendar.md#eventhandling) 的事件处理器。
- 使[日期函数](api/other/date.md)变为非变异式。

### 修复

- 修复了 LWC 环境下容器尺寸监听器的问题。
- 解决了事件结束时间超过 [scheduler_last_hour](api/config/last_hour.md) 设置时的拖放问题。
- 修正了 [cascade_event_display](api/config/cascade_event_display.md) 模式下的事件显示。
- 修复了在启用 `all_timed` 扩展后，将新事件拖动到日列底部时的拖拽调整行为。
- 修复了在关闭智能渲染时，可滚动 [Timeline 视图](views/timeline.md) 的垂直滚动问题。
- 修正了 [Units](views/units.md) 视图中滚动按钮的显示问题。
- 纠正了当 `skip_incorrect` 设置为 `false` 时，[Units](views/units.md) 视图中未分配事件的显示。

## 7.1.3

<span class='release_date'>2024年11月19日。修复版本</span>

- 修复了在 [Timeline](views/timeline.md) 和 [Units](views/units.md) 视图中，[拖放时高亮事件初始位置](api/config/drag_highlight.md) 无法显示的问题。
- 修正了 [Timeline 视图](views/timeline.md) 中受 `last_hour` 设置影响的拖放行为。
- 防止 [重复事件实例](guides/recurring-events.md) 在某些时区夏令时切换时消失。
- 修复了在 [Mini Calendar](guides/minicalendar.md#inthelightbox) lightbox 控件切换 [全天](api/config/full_day.md) 时，结束日期重复递增的问题。
- 恢复了 [ignore_year](guides/custom-scales.md) 和 [ignore_agenda](guides/custom-scales.md) 方法的功能。

## 7.1.2

<span class='release_date'>2024年10月8日。修复版本</span>

- 修复了在启用 [multisection](views/units.md#assigningeventstoseveralunits) 扩展时，通过 [Ctrl+C/Ctrl+V](guides/keyboard-navigation.md) 粘贴导致事件位置不正确的问题。
- 确保 [Collision 扩展](guides/collisions.md) 能正确处理新建 [重复事件](guides/recurring-events.md)。
- 修正了在 [Timeline 视图](views/timeline.md) 中启用智能渲染后调用 [scheduler.updateCollection()](api/method/updatecollection.md) 导致 section 高度不正确的问题。
- 修复了当取消 [onBeforeLightbox](api/event/onbeforelightbox.md) 时，智能渲染隐藏新建 [multisection](views/units.md#assigningeventstoseveralunits) 事件部分内容的问题。
- 修正了 [getEvents](api/method/getevents.md) 方法在处理 [重复事件](guides/recurring-events.md) 时的异常行为。
- 改进了带有自定义每日属性的 [重复事件](guides/recurring-events.md) 的处理。

## 7.1.1

<span class='release_date'>2024年8月27日。修复版本</span>

- 修复了 [DataProcessor](api/method/createdataprocessor.md) 不允许发送 false 值的问题。
- 修正了移动设备上 [Tooltip](guides/tooltips.md) 点击后消失的问题。
- 纠正了页面滚动时 [Tooltip](guides/tooltips.md) 的定位。
- 修复了 [container_autoresize](/guides/extensions-list/#containerautoresize) 插件隐藏多日区的问题。
- 修正了 [Quick Info](guides/touch-support.md#quickinfoextension) 弹窗显示在容器外的问题。
- 防止在 [Timeline 视图](views/timeline.md) 启用智能渲染时，未确认的事件在滚动过程中消失。
- 修复了在 [Timeline 视图](views/timeline.md) 启用智能渲染后调用 [scheduler.updateCollection()](api/method/updatecollection.md) 导致 section 高度不正确的问题。

## 7.1

<span class='release_date'>2024年7月31日。小版本更新</span>

[查看博客中的版本评述](https://dhtmlx.com/blog/dhtmlx-scheduler-7-1/)

### 重大变更

本次更新对部分地图配置属性进行了变更。详情请参阅 [迁移说明](migration.md)。

### 新功能

- 支持以 RRULE 格式存储 [重复事件](guides/recurring-events.md)。
- Map 视图现在 [支持不同的地图提供商](views/map.md)。
- 增加了[撤销事件删除](api/config/undo_deleted.md)的能力。
- 新增 [batchUpdate](api/method/batchupdate.md) 方法，可同时更新多个事件。

### 更新

- Scheduler 现在会在[拖放日程事件时高亮显示其原始位置](api/config/drag_highlight.md)。

### 修复

- 修复了在 [Timeline 视图](views/timeline.md) 动态更改 **x_date** 属性后模板未更新的问题。
- 修正了多日 [Units 视图](views/units.md) 中表头错位的问题。
- 修复了在启用 [drag_between](guides/drag-between.md) 扩展后调用 [destructor](api/method/destructor.md) 出现的脚本错误。
- 修正了 [limit](guides/limits.md) 扩展阻止编辑 [重复系列](guides/recurring-events.md) 的问题。
- 提升了在 [树形 Timeline 视图](views/timeline.md) 下 **show_unassigned** 设为 *true* 时拖放事件的性能。
- 修复了当 `smart_rendering` 为 *false* 时，可滚动 [Timeline 视图](views/timeline.md) 的行为。
- 纠正了在可滚动 [Timeline 视图](views/timeline.md) 切换视图后滚动位置异常的问题。

## 7.0.5

<span class='release_date'>2024年5月30日。修复版本</span>

### 修复

- 修复了在使用 **event_dy:"full"** 时，[Timeline](views/timeline.md) 分区高度不正确的问题。
- 恢复了 [年视图](views/year.md) 中缺失的"今天"标记。
- 修正了 [日视图](views/day.md) 和 [周视图](views/week.md) 中的事件定位问题。

## 7.0.4

<span class='release_date'>2024年5月22日。修复版本</span>

### 修复

- 为 [textarea](guides/textarea.md) 控件添加了 `placeholder` 选项
- 修正了 [键盘导航](guides/keyboard-navigation.md) 中的单元格选择问题
- 修复了 [Quick Info](guides/touch-support.md#quickinfoextension) 弹窗在 [议程视图](views/agenda.md) 中的显示问题
- 调整了 [议程视图](views/agenda.md) 模板的类型定义
- 解决了当 [start_on_monday](api/config/start_on_monday.md) 被禁用且视图中有多列被 [隐藏](guides/custom-scales.md) 时，[月视图](views/month.md) 多日事件的显示问题

## 7.0.3

<span class='release_date'>2024年3月15日。修复版本</span>


### 修复

- 解决了 [textColor](guides/custom-events-color.md) 属性在 [Month view](views/month.md) 中未生效的问题
- 修复了 [Agenda view](views/agenda.md) 中 [color](guides/custom-events-color.md) 属性无法正常工作的情况
- 更正了在 [Day Timeline view](views/timeline.md) 中使用 [Keyboard Navigation](guides/keyboard-navigation.md) 时出现的错误

## 7.0.2

<span class='release_date'>2024年2月20日。Bugfix 版本</span>

### 修复

- 解决了与 [DHTMLX Suite](https://docs.dhtmlx.com/suite/) 的兼容性回归问题
- 修复了影响 [Timeline view](views/timeline.md) 中 [mark_now](api/config/mark_now.md) 标记的回归问题
- 修复了 [theme initialization](guides/skins.md) 导致部分情况下 Scheduler 布局异常的问题
- 修复了 [Grid view](views/grid.md) 中事件选中后排序导致选中样式丢失的问题
- 更正了 [Timeline's smart rendering mode](views/timeline.md#horizontalscroll) 下拖拽时事件重复的问题
- 修正了 [Greek locale](guides/localization.md) 的相关内容
- 修复了内存泄漏，确保调用 [destructor](api/method/destructor.md) 后 Scheduler 实例能被完全释放

## 7.0.1

<span class='release_date'>2024年2月5日。Bugfix 版本</span>

### 修复

- 修复了在当天显示调度器时 [Units](views/units.md) 视图中的布局问题
- 调整了 [scrollable timeline](views/timeline.md#horizontalscroll) 中 [Quick Info](guides/touch-support.md#quickinfoextension) 弹窗的位置
- 更正了启用 [RTL](guides/rtl-mode.md) 模式时，[Keyboard Navigation](guides/keyboard-navigation.md) 选中时间槽的位置问题
- 修复了在 [Day](views/day.md)/[Week](views/week.md) 视图中拖动调整大小后，无法在 [Month](views/month.md) 视图中创建多日事件的问题

### 更新

- 现在 [Day](views/day.md)/[Week](views/week.md) 视图中的 [multi-day section 高度](api/config/multi_day_height_limit.md) 默认限制为 200px

## <b>7.0</b>

<span class='release_date'>2024年1月31日。主要更新</span>

[在博客上查看本次发布](https://dhtmlx.com/blog/dhtmlx-scheduler-7-0/)

### 重大变更

本次发布对 Scheduler 包结构和功能行为进行了变更。建议查阅 [Migration notes](migration.md) 以确保平滑迁移。

### 新功能

- 支持通过 CSS 变量进行 [Skins customization](guides/custom-skins.md)
- 新增 [Dark skin](guides/skins.md#dark-skin)
- 新增 [Agenda view](views/agenda.md)

### 更新

- 更新了 [Terrace skin](guides/skins.md#terrace-skin)
- 增加了通过 npm [安装专业版 Scheduler](guides/installation.md) 的选项
- 改进了在 [Map View](views/map.md) 中标记的自定义选项
- 优化了 Day/Week/Units 视图下 [短事件](guides/sizing.md) 的默认显示效果
- 移除了 [Day](views/day.md)/[Week](views/week.md)/[Units](views/units.md) 视图中的背景网格图片
- 从核心库中移除了 [Bluebird Promise](api/method/promise.md) 库
- 针对高分辨率和小屏设备进行了多项缩放与响应式改进
- [Day](views/day.md)/[Week](views/week.md)/[Units](views/units.md) 视图下的列现在可 [预留空白区域](api/config/day_column_padding.md)
- 更新了类型定义
- Export API 现在作为 [scheduler.plugins](/guides/extensions-list/#export-service) 的一部分，无需额外引入 JS 文件。详情参见 [Migration](migration.md) 指南

### 修复

- 修复了 [French locale](guides/localization.md) 下 [recurring form](guides/recurring-events.md) 显示问题
- 更正了 [Timeline view](views/timeline.md) 下使用 first_hour/last_hour 设置时拖放事件后持续时间不正确的问题
- 解决了在 [Timeline view](views/timeline.md) 左侧面板使用鼠标滚轮时出现的意外滚动
- 修复了高分辨率屏幕开启 Smart Rendering 后 [Timeline view](views/timeline.md) 垂直滚动时的视觉延迟
- 恢复了在启用 `all_timed` 扩展时 [Units view](views/units.md) 的拖拽功能
- 在 GPL 版本中恢复了 Multiselect 插件

## 6.0.5

<span class='release_date'>2023年7月31日。Bugfix 版本</span>

### 修复

- 修复了 [lightbox](guides/lightbox-editors.md) 在 SalesForce LWC 中无法使用的问题
- 修复了 [container_autoresize](/guides/extensions-list/#containerautoresize) 与 [ignore_week](guides/custom-scales.md) 配合使用且周从隐藏日开始时出现的问题

### 增强

- 更新了类型定义，增加了 [scheduler.form_blocks](guides/custom-lightbox-editor.md)

## 6.0.4

<span class='release_date'>2023年5月31日。Bugfix 版本</span>

### 修复

- 修复了 [dataProcessor](guides/server-integration.md) 编辑 [Recurring series](guides/recurring-events.md) 实例时的异常行为
 - 解决了 [Recurring series](guides/recurring-events.md) 丢失自定义属性的问题
 - 修复了启用 [container_autoresize](/guides/extensions-list/#containerautoresize) 时调用 [scheduler.destructor()](api/method/destructor.md) 后的脚本错误
 - 修复了 [Timeline view](views/timeline.md) 拖拽事件时自动滚动被阻止的回归问题
 - 现在附加的 [onContextMenu](api/event/oncontextmenu.md) 事件处理器会自动阻止默认的右键菜单

## 6.0.3

<span class='release_date'>2022年11月4日。Bugfix 版本</span>

### 修复

- 修复了 [Year view](views/year.md) 回归问题，导致 [onEmptyClick](api/event/onemptyclick.md) 事件处理器接收到错误的日期参数
- 修复了 lightbox 的 ['height' property of the 'time' section](guides/time.md) 行为
- 修复了在 [second_scale](views/timeline.md#secondxaxis) 下 timeline 视图时间刻度高度不正确的问题
- 更正了 [onEventCancel](api/event/oneventcancel.md) 事件参数中新事件标记值，确保为布尔类型
- 修复了在 [Tree Timeline](views/timeline.md) 视图中启用 [smart_rendering](api/method/createtimelineview.md) 且分组初始为 [closed](views/timeline.md#dataforyaxissectionsinthetreemode) 状态时滚动导致的脚本错误

## 6.0.2

<span class='release_date'>2022年7月25日。Bugfix 版本</span>

### 修复

- 修复了创建 [Custom Skins](guides/custom-skins.md) 脚本的回归问题
- 修复了在启用内容安全策略（CSP）页面上的脚本错误
- 更正了用 [router object](guides/server-integration.md#customrouting) 初始化 DataProcessor 时的行为
- 修复了 [Year view](views/year.md) 单元格 DOM 属性名拼写错误

## 6.0.1

<span class='release_date'>2022年6月23日。Bugfix 版本</span>

### 修复

- 提升了对 Salesforce LWC 的兼容性
- 修复了 tooltip 显示被裁剪的问题
- 更正了 [Tree Timeline](views/timeline.md) 视图中 [columns](views/timeline.md#specifying-columns-of-the-left-hand-panel) 的显示
- 禁用 [show_quick_info](api/config/show_quick_info.md) 后，[Quick Info](guides/touch-support.md#quickinfoextension) 弹窗将不会因鼠标点击弹出，但仍可通过 [showQuickInfo](api/method/showquickinfo.md) 方法打开
- 修复了 [repeat_date](api/config/repeat_date.md) 设置在某些情况下的错误行为

## <b>6.0</b>

<span class='release_date'>2022年5月19日。主要更新</span>

[在博客上查看本次发布](https://dhtmlx.com/blog/dhtmlx-scheduler-6-0/)

### 重大变更

本版本对 Scheduler 包结构和功能进行了调整。建议查阅 [Migration notes](migration.md#53---60) 以顺利升级。

### 新功能

- 增加了 [Scheduler 和 DataProcessor 实例的析构函数](guides/multiple-per-page.md#destructorofscheduleranddataprocessorinstances)
- 支持设置 [Timeline section 的高度](views/timeline.md#changingheightsofsections)
- 支持在 Timeline 左侧面板中指定 [多列](views/timeline.md#specifying-columns-of-the-left-hand-panel)
- 在 [Timeline object](views/timeline.md#getting-coordinates-of-a-specific-position) 中引入了新的 **resolvePosition**、**dateFromPos**、**getEventTop** 方法

### API

- 新增 [week_agenda_date](api/template/week_agenda_date.md) 模板
- 增加了 [ajax](api/other/ajax.md)、[env](api/other/env.md)、[i18n](api/other/i18n.md) 对象
- 新增 [Promise](api/method/promise.md) 方法
- 新增 [destructor()](api/method/destructor.md) 方法和 [onDestroy](api/event/ondestroy.md) 事件
- 引入调试辅助方法:[assert()](api/method/assert.md)、[show_errors](api/config/show_errors.md) 属性、[onError](api/event/onerror.md) 事件
- 新增方法:[bind()](api/method/bind.md)、[copy()](api/method/copy.md)、[defined()](api/method/defined.md)、[mixin()](api/method/mixin.md)
- 将 dataProcessor 构造函数从全局作用域移至 scheduler 对象（window.dataProcessor -> [scheduler.DataProcessor](api/method/dataprocessor.md)）
- 新增 [createDataProcessor()](api/method/createdataprocessor.md) 方法
- 用于 [popup messages](guides/popups-and-modals.md) 的公共辅助方法已从 **dhtmlx** 移至 **scheduler** 对象
- 新增 [serialize()](api/method/serialize.md) 方法
- 引入 [overwrite_marked_timespans](api/config/overwrite_marked_timespans.md) 属性

### 更新

- 所有扩展现在需通过 [plugins()](api/method/plugins.md) 方法激活
- 移除了本地化文件；Scheduler 本地化引入了新的 [API](api/other/i18n.md)
- `Scheduler.getSchedulerInstance` 现在支持在创建新实例时传递配置对象
- 移除了 CSP 扩展；[csp mode 现已默认启用](api/config/csp.md)
- [attachEvent()](api/method/attachevent.md) 方法现在新增第三个参数 `settings` 对象
- 增加了 [DataProcessor 的路由选项](guides/server-integration.md#customrouting)
- 支持以 ES6 模块方式 [导入 dhtmlxScheduler](guides/initialization.md#import-files-into-es67-and-typescript-apps)

## 5.3.14

<span class='release_date'>2022年3月29日。Bugfix 版本</span>

### 修复

- 更正了通过 [scheduler.addEvent()](api/method/addevent.md) 方法添加的周期性事件的拖拽行为
- 解决了在周期性事件激活时 [scheduler.formSection()](api/method/formsection.md) 出现的脚本错误
- 修复了基于 [first_hour](api/config/first_hour.md) 配置本应隐藏的事件被显示的问题
- 移除了每次空白点击时都会触发 [onEventUnselected](api/event/oneventunselected.md) 事件（无事件被选中时）
- 更新了 [onEventUnselected](api/event/oneventunselected.md) 事件，使其在选中事件被删除时触发

## 5.3.13

<span class='release_date'>2021年11月9日。Bugfix 版本</span>

### 修复

- 修复了在使用 [scheduler.hideLightbox](api/method/hidelightbox.md) 关闭 [Lightbox](guides/configuring-the-lightbox.md) 后，已编辑的[重复系列](guides/recurring-events.md)消失的问题。
- 修正了 [auto_end_date](api/config/auto_end_date.md) 配置的动态禁用问题。
- 改进了在系列事件的 `start_date` 包含毫秒时，对[已修改实例](guides/recurring-events.md#editingdeletingacertainoccurrenceintheseries)的处理。
- 修复了在某些情况下，使用 [Keyboard Navigation](guides/keyboard-navigation.md) 模块调整事件大小时导致滚动位置偏移的问题。
- 优化了启用 [Keyboard Navigation](guides/keyboard-navigation.md) 时的焦点行为，确保模态框焦点遵循 [Lightbox](guides/configuring-the-lightbox.md) 和 `dhtmlx.modalbox` 的 tabindex。
- 调整了"Today"按钮的行为，使其聚焦于 [Week View](views/week.md) 中"Today"列的第一个单元格，而不是第一列的第一个单元格。
- 解决了在 [Timeline view](views/timeline.md#horizontalscroll) 启用 [Smart Rendering](api/method/createtimelineview.md) 时，[scheduler.showEvent](api/method/showevent.md) 的相关问题。

## 5.3.12

<span class='release_date'>2021年8月24日。Bug 修复版本</span>

### 修复

- 修复了 [Tree Timeline](views/timeline.md#dataforyaxissectionsinthetreemode) 视图中，由于 sections 列表中键重复导致的死循环问题。
- 修正了在使用 `After N occurrences` 限制时，每月[重复事件](guides/recurring-events.md)的行为。
- 修复了 `lastDay` 模式下 [recurring_overflow_instances](api/config/recurring_overflow_instances.md) 配置，确保事件实例保留分钟和秒数。
- 解决了当 [onBeforeEventDragOut](api/event/onbeforeeventdragout.md) 返回 `false` 时，拖拽事件无法移出调度器的问题。
- 更新了 [Tree Timeline](views/timeline.md#dataforyaxissectionsinthetreemode) section [labels](api/template/timelinename_scale_label.md) 的默认 CSS，避免长标签出现不必要的换行。

## 5.3.11

<span class='release_date'>2021年2月9日。Bug 修复版本</span>

### 修复

- 修复了启用 [Cookie extension](/guides/extensions-list/#cookie) 时更改日期引发的脚本错误。
- 修正了 dataProcessor 的 [transaction mode](https://docs.dhtmlx.com/api__dataprocessor_settransactionmode.html) 设置为 "JSON" 时 Content-Type 头的值。
- 改进了 [Terrace](guides/skins.md#terrace-skin) 皮肤下 [移动设备](guides/touch-support.md) 上 Lightbox 的 CSS。
- 修复了某些[重复事件](guides/recurring-events.md)在目标月份没有对应日期且设置为"每月"重复时，会跳转到下一个月的问题。
- 解决了通过 [scheduler.updateCollection()](api/method/updatecollection.md) 关闭 Lightbox 后模态遮罩仍然可见的问题。

### 更新

- 新增 [onBeforeEventPasted](api/event/onbeforeeventpasted.md) API 事件，以便在粘贴事件时进行验证或调整位置。
- 引入新的 [recurring_overflow_instances](api/config/recurring_overflow_instances.md) 配置选项。

## 5.3.10

<span class='release_date'>2020年11月11日。Bug 修复版本</span>

### 修复

- 修正了 [column_width](views/timeline.md#horizontalscroll) 在某些单位被 [隐藏](guides/custom-scales.md) 时的行为。
- 修复了 iPad 上 Safari 浏览器的触控支持问题。
- 解决了在 [Grid view](views/grid.md) 下 [onDblClick](api/event/ondblclick.md) 和 [onClick](api/event/onclick.md) 事件返回 *false* 时的处理问题。
- 修复了 [Timeline view](views/timeline.md) 拖放事件时，点击事件条底部边界附近会将事件移动到下一个 section 的问题。

## 5.3.9

<span class='release_date'>2020年6月4日。Bug 修复版本</span>

### 修复

- 修复了向下滚动并拖拽最后一行后，[可滚动时间线](views/timeline.md#horizontalscroll) 的显示问题。
- 解决了在两个[可滚动时间线](views/timeline.md#horizontalscroll)之间切换时的显示异常。
- 修复了在触摸设备上滚动 [timeline](views/timeline.md) 时引发的脚本错误。
- 修正了 `dataProcessor` 在使用[自定义头部](guides/server-integration.md#customrequestheadersandparameters)时，发送 POST/PUT/DELETE 请求的 Content-Type 头。
- 新增 [timeline_row_class](api/template/timelinename_row_class.md) 模板，可为时间线行应用 CSS 类。

## 5.3.8

<span class='release_date'>2020年5月14日。Bug 修复版本</span>

### 修复

- 修复了 [Lightbox](guides/lightbox-editors.md) 模态遮罩高度不正确的问题。
- 解决了在 Bootstrap 模态框内初始化调度器时的尺寸问题。

### 更新

- 调度器现在会自动监控容器尺寸变化并相应调整自身尺寸。
- 新增 [Mini Calendar](guides/minicalendar.md) 控件，可用于 [header config](api/config/header.md)。

## 5.3.7

<span class='release_date'>2020年4月30日。Bug 修复版本</span>

- 修复了在 Timeline 视图 [타임라인뷰](views/timeline.md#horizontalscroll）启用水平滚动条时，[Container Autoresize](/guides/extensions-list/#containerautoresize) 扩展的相关问题。
- 修正了 [Timeline view](views/timeline.md) 中 [show_unassigned](api/method/createtimelineview.md) 配置项的问题。

## 5.3.6

<span class='release_date'>2020年2月27日。Bug 修复版本</span>

- 修复了在启用 `scrollable:true` 或 `smart_rendering:true` 时 [Day Timeline view](views/timeline.md#viewmodes) 的事件显示问题。
- 解决了在 [Day Timeline view](views/timeline.md#viewmodes) 中，结合 `scrollable:true` 和 [dataProcessor](guides/server-integration.md) 拖拽新事件后出现的脚本错误。
- 修复了 [header config](guides/initialization.md#initializing-scheduler-via-header-config) 中缺失 `date` 元素导致的脚本错误。
- 改善了在 [Material skin](guides/skins.md#material-skin) 下，[header config](guides/initialization.md#initializing-scheduler-via-header-config) 未包含 `week` 或 `month` 标签时 `day` 标签的样式。

## 5.3.5

<span class='release_date'>2020年1月31日。Bug 修复版本</span>

### 修复

- 修复了在使用 [header config](guides/initialization.md#initializing-scheduler-via-header-config) 时，[Terrace skin](guides/skins.md#terrace-skin) 导航栏右侧"下一步"按钮的样式。
- 解决了 [URL extension](/guides/extensions-list/#url) 在某些情况下无法通过 URL 高亮事件的问题。
- 修复了通过 `@import` 加载调度器样式时 [Material skin](guides/skins.md#material-skin) 的相关问题。

### 更新

- 当调度器初始化时未提供 [header config](guides/initialization.md#initializing-scheduler-via-header-config) 或 [default markup](guides/initialization.md#initializing-scheduler-via-markup) 时，自动添加默认调度器头部，防止脚本错误。

## 5.3.4

<span class='release_date'>2019年12月10日。Bug 修复版本</span>

### 修复

- 修复了鼠标悬停在 section 列时，[可滚动时间线](views/timeline.md#horizontalscroll) 的垂直滚动问题。
- 修正了 [dataProcessor](guides/server-integration.md) 序列化嵌套对象时的问题。
- 修复了使用 [custom lightbox](guides/custom-details-form.md) 创建新事件时出现的脚本错误。

## 5.3.3

<span class='release_date'>2019年10月30日。Bug 修复版本</span>

### 更新

- 增强了常见配置错误的错误提示信息。
- 清理了部分公共示例中的 HTML 标记。

## 5.3.2

<span class='release_date'>2019年10月9日。Bug 修复版本</span>

### 修复

- 修复了在定义自定义 [calendar_date template](api/template/calendar_date.md) 时，[Mini Calendar](guides/minicalendar.md) 点击 [handler](api/method/rendercalendar.md) 行为不正确的问题。
- 修正了在 [Day/Week views](/views/) 进行 [resize](api/config/drag_resize.md) 时事件结束日期的四舍五入问题。

## 5.3.1

<span class='release_date'>2019年10月2日。Bug 修复版本</span>

### 更新

- 默认禁用 [responsive_lightbox](api/config/responsive_lightbox.md)。

## 5.3

<span class='release_date'>2019年10月2日。小版本更新</span>

[查看博客中的版本回顾](https://dhtmlx.com/blog/dhtmlxscheduler-5-3-minor-update-rtl-support-improved-responsiveness/)

### 重大变更

本次更新调整了部分组件的行为。虽然现有代码不应受影响，建议查阅 [迁移说明](migration.md#53---60) 以平滑升级。

### 新功能

1. 新增 [RTL 支持](guides/rtl-mode.md)。
2. 提升了移动端响应能力（[[Mobile Responsive Scheduler](guides/touch-support.md)]）。
3. 集成 DHTMLX Suite 6 Layout [dhtmlxLayout와의 통합](guides/dhxlayout-integration.md#dhtmlxsuitev6）。

### 更新

1. 在日期/时间 Lightbox 控件中新增 [year range](guides/time.md#properties) 设置。
2. 默认禁用通过水平滑动切换调度器日期 [Mobile Responsive Scheduler](guides/touch-support.md#touch-gestures-in-the-scheduler）。
3. 支持通过配置而非标记设置调度器头部（[dhtmlxScheduler를 순수 JS/HTML에서 사용하기](guides/initialization.md#initializing-scheduler-via-header-config）。
4. 引入 [render](api/method/render.md) 方法，作为 setCurrentView() 和 updateView() 的更清晰别名。
5. 新增 [hideLightbox](api/method/hidelightbox.md) 方法到公共 API。

### 修复

- 修复了 [Material skin](guides/skins.md#material-skin) 下 [multiselect](guides/multiselect.md#properties) 控件的垂直配置无效的问题。

## 5.2.5

<span class='release_date'>2019年9月23日。Bug 修复版本</span>

### 修复

- 修复了在 [v5.2.4](#524) 中引入的 [툴팁 (Tooltips)](guides/tooltips.md) 扩展回归问题。

## 5.2.4

<span class='release_date'>2019年9月19日。Bug 修复版本</span>

### 修复

- 解决了 [readonly form](guides/readonly.md#readonlymodefortheentirelightbox) 无法在 Scheduler [初始化](api/method/init.md) 后更改 [lightbox 配置](guides/lightbox-editors.md) 的问题。
- 解决了与 Angular 8 的兼容性问题。

## 5.2.3

<span class='release_date'>2019年8月20日。Bug 修复版本</span>

### 修复

- 修正了 [scrollable Timeline](views/timeline.md#horizontalscroll) 拖拽事件时事件条动画的问题。
- 修复了 [Day View](views/day.md) / [주간 보기](views/week.md) 中将事件移至一天末尾时跳转到 [multiday section](api/config/multi_day.md) 的问题。
- 恢复了 [scrollable Timeline](views/timeline.md#horizontalscroll) 中 `scroll_position` 设置的正常功能。
- 修正了 [multi-section events](views/timeline.md#assignmentofeventstoseveralsections) 拖拽后事件块定位错误的问题。
- 修复了在使用 [ignore_timeline](guides/custom-scales.md) 时，[Timeline view](views/timeline.md#viewmodes) `cell` 模式下 tooltip 引发的脚本错误。

## 5.2.2

<span class='release_date'>2019年8月7日。Bug 修复版本</span>

### 修复

- 增加了更清晰的常见配置错误提示。
- 修复了在 [readonly form](guides/readonly.md#readonlymodefortheentirelightbox) 中双击任意标签引发的脚本错误。
- 修复了在 `smart_rendering:true` 与 `section_autoheight:false` 配合使用时，[Timeline view](views/timeline.md) 的显示问题。
- 修正了在通过 [scheduler.ignore_year](guides/custom-scales.md) 方法隐藏有事件的天数后，[Year view](guides/custom-scales.md) 中出现的脚本错误。

## 5.2.1

<span class='release_date'>2019年6月11日。Bug 修复版本</span>

### 修复

- 解决了 IE11 中的数据类型检测问题，详见 [load](api/method/load.md)。
- 修复了没有[水平滚动条](views/timeline.md#horizontalscroll)的时间线视图下 [timeline.scrollTo](views/timeline.md#timelineobjectapi) 方法的问题。
- 恢复了 [Timeline 视图](views/timeline.md) 下 [showEvent](api/method/showevent.md) 方法的功能。
- 修正了在 `smart_rendering:false` 时 [可滚动时间线](views/timeline.md#horizontalscroll) 的垂直滚动行为。
- 修复了在 [multisection](views/units.md#assigningeventstoseveralunits) 扩展启用且 [step](views/units.md#scrollingunits) 选项设置时，[多天单位视图](views/units.md#displayingunitsformultipledays) 下事件定位的问题。
- 调整了 [日时间线](views/timeline.md#daysmodedetails) 中的事件尺寸问题。

## 5.2

<span class='release_date'>2019年6月6日. 小幅更新</span>

[博客中版本回顾](https://dhtmlx.com/blog/dhtmlxscheduler-5-2-custom-content-timeline-view-enhanced-drag-n-drop/)

### 重大变更

部分 API 方法的行为已更新。通常这些变更不会导致现有代码出错，但建议查阅 [迁移说明](migration.md#51---52) 以确保平滑升级。

### 新增功能

1. 增加了[时间线单元格自定义 HTML 内容](views/timeline.md#customcontentincells) 的支持（PRO 版本）。
2. 支持[通过事件主体拖放](api/config/drag_event_body.md)事件。

### 更新内容

- [load](api/method/load.md) 和 [parse](api/method/parse.md) 的数据格式参数现在为可选，调度器会自动检测格式。
- [日期转字符串函数](guides/date-formats.md) 可自动检测日期字符串格式，即使与提供的格式不同。
- [dhtmlxConnector 库](https://github.com/DHTMLX/connector-php) 不再包含在 dhtmlxScheduler 包中。
- 示例包不再需要 PHP/Apache 服务器即可运行。
- 为 [时间线对象](views/timeline.md#timelineobjectapi) 引入了新方法。
- [Multiselect](guides/multiselect.md) 控件现在支持以 JSON 格式加载选项。
- 新增事件 [onLoadStart](api/event/onloadstart.md)、[onBeforeParse](api/event/onbeforeparse.md)、[onParse](api/event/onparse.md)、[onLoadEnd](api/event/onloadend.md)，替代已废弃的 **onXLS** 和 **onXLE** 事件。

### 修复

- 修复了在新建事件时，[clearAll](api/method/clearall.md) 在 `scheduler.endLightbox(false)` 之前调用导致的异常行为。
- 解决了 iPad 上 [时间线水平滚动](views/timeline.md#horizontalscroll) 的闪烁问题。
- 修复了 [可滚动时间线](views/timeline.md#horizontalscroll) 的多种显示问题。
- Units 视图 [](api/template/unitsname_scale_text.md) 现在参数中包含 section 日期。
- 修复了在未加载 section 时于 [Units 视图](views/units.md) 创建事件的脚本错误。
- [Multiselect](guides/multiselect.md) 控件的 `vertical` 属性现在只接受布尔值；如 `vertical:"false"` 这样的字符串值将被解释为布尔值 `true`。

## 5.1.6

<span class='release_date'>2019年1月11日. Bugfix 版本</span>

### 修复

- 修正了在月视图中 `start_on_monday = false` 时周六、周日事件位置不正确的问题。
- 修复了带当前时间标记的可滚动时间线中的脚本错误。
- 修正了可滚动时间线在水平滚动后传递给 `onYScaleClick` 处理器的参数值不正确的问题。
- 解决了在重新加载 section 后可滚动时间线需刷新才能显示内容的问题。
- 修复了部分树形时间线文件夹单元在水平滚动后未显示的问题。
- 修正了在 `all_timed` 扩展下事件调整大小行为，确保只有最后一段事件可调整大小。
- 修复了 `all_timed="short"` 模式下事件调整大小过程中事件消失的问题。

## 5.1.1

<span class='release_date'>2018年12月14日. Bugfix 版本</span>

### 修复

- 修复了时间线中键盘导航焦点未高亮的问题。
- 修正了指定 `second_scale` 时 `timeline_scale_header` 的初始高度。
- 修复了仅有一个事件时 `event_min_dy` 未影响 section 高度的问题。
- 解决了多次点击同一事件导致快捷信息弹窗自动关闭的问题。
- 修复了在 `Year view` 删除事件后出现的脚本错误。
- 修正了无事件加载时可滚动时间线初始显示不正确的问题。
- 为不可滚动时间线启用了智能渲染。
- 修复了在时间线中启用 key_nav 扩展时日期变更导致滚动位置重置的问题。
- 修正了某些情况下 `onBeforeViewChange` 事件的 `old_date` 参数值。
- 修复了带有忽略时间单元的可滚动时间线显示问题。
- 改进了在日/周视图中创建新事件时的滚动行为。
- 修复了 `Timeline view` 下 `onAfterSchedulerResize` 事件未触发的问题。
- 提升了 `Week view` 事件渲染性能。

## 5.1

<span class='release_date'>2018年11月29日. 小幅更新</span>

[博客中版本回顾](https://dhtmlx.com/blog/dhtmlxscheduler-5-1-horizontal-scroll-and-new-server-side-integrations/)

### 重大变更

Timeline 视图的 HTML 结构有重大更新，迁移时可能需要调整部分代码。详情请参见 [迁移](migration.md#50---51) 文章。

### 主要变更

1. 引入了 [Timeline 视图中的水平滚动](views/timeline.md#horizontalscroll)（PRO 版本）。
2. 改进了 Timeline 视图的智能渲染和性能（PRO 版本）。
3. 增加了与多种服务器端平台的集成。[查看相关教程](/integrations/howtostart-guides/)。

### 次要变更

- 更新了 [Timeline 对象 API](views/timeline.md#timelineobjectapi)。
- 增加了 [Timeline 视图自动滚动](views/timeline.md#autoscrollconfiguration) 支持。
- 支持为时间线视图的分区列头添加标签。

## <b>5.0</b>

<span class='release_date'>2018年5月17日. 重大更新</span>

[博客中版本回顾](https://dhtmlx.com/blog/dhtmlxscheduler-5-0-material-design/)

### 重大变更

1. 移除了 Classic 和 Glossy 皮肤。详见 [迁移说明](migration.md#44---50)。
2. 对 Scheduler 进行了全局 CSS 重构。了解对应用的影响 [点此](migration.md#44---50)。

### 主要变更

1. 增加了新的 [Material 皮肤](guides/skins.md#material-skin)。
2. 引入了 [REST API 的服务器端集成](guides/server-integration.md)。
3. 提升了皮肤自定义的灵活性。[皮肤定制](guides/custom-skins.md)。

### 次要变更

- 更新了对 Microsoft 设备的触控支持。
- 为循环事件表单新增了 [希伯来语本地化](guides/localization.md)。
- 新增了 [onLoadError](api/event/onloaderror.md) 用于网络和服务器错误。

### Bug 修复与改进

- 修复了与 ES6/TS 导入的兼容性问题。
- 改善了键盘导航支持。
- 其它多项小型 Bug 修复。

## 4.4.9

<span class='release_date'>2017年6月6日. Bugfix 版本</span>

### 修复

- 修复了禁用 WAI-ARIA 属性时的回归问题。
- 增强了 WAI-ARIA 支持，提高了 JAWS 兼容性。
- 改进了键盘导航的多个 Bug 和体验。
- 修正了示例中的无效服务器配置片段。
- 解决了 Cookie 扩展中 Cookie 与 ajax 加载超时的冲突。
- 修复了 Year 视图中的事件创建 Bug。
- 修正了放大页面时拖放操作的鼠标位置问题。
- 修复了 all-timed 扩展下触控设备的拖放。
- 调整了动态加载，修复了 *server_utc* 配置导致的时间范围错误。
- 本地化中的多项小修复。

## 4.4

<span class='release_date'>2017年2月2日. 小幅更新</span>

[博客中版本回顾](https://dhtmlx.com/blog/scheduler-4-4-released-accessibility-support-minor-improvements/)

### 主要变更

1. 增加了 [键盘导航](guides/keyboard-navigation.md)。
2. 引入了 [WAI-ARIA 支持](guides/accessibility.md#wai-aria-attributes)。
3. 增加了 [高对比度主题](guides/accessibility.md#high-contrast-themes)。
4. 提供了对 内容安全策略 的初步支持。

### 次要变更

- 支持在月视图启用 markTimespan。
- 支持从特定日期移除循环标记。
- Year 视图支持跳过指定日期。
- Multiselect 控件支持 *delimiter* 选项。
- 提升了与最新 dhtmlxSuite 的外部拖放兼容性。
- 合并了来自公共仓库的 CSP 改进。
- 对 [Timeline](views/timeline.md) 进行了小幅性能优化。
- 规范化了 z-index 并更新了最新 [dhtmlxCombo](guides/combo.md) 的样式。

### Bug 修复与改进

- 保证 addEventNow 返回新事件的 ID。
- 修复了周视图中的拖放及忽略列问题。
- 增加了对未定义触控事件的检查。
- 解决了 iPad 上的点击和键盘焦点问题。
- scheduler.clearAll 后清空 dataprocessor 状态。
- 修复了 SVG 元素事件处理中的 JS 错误。
- 修复了 Tooltip 扩展的多个问题。
- 修复了 container_autosize 扩展的多项问题。
- 其它多项修复。

## 4.3.35

<span class='release_date'>2016年5月26日. Bugfix 版本</span>

### 修复

- 集成了最新的 DHTMLX Suite 库版本
- 增加了对调度器中 SVG 元素的支持
- 修正了时间线中带有四舍五入日期的拖放和创建事件日期
- 在标记时间段上双击现在会遵循 *scheduler.config.dblclick_create* 设置
- 修复了 *scheduler.ignore_timeline* 启用时时间线中 `onXScaleClick` 参数不正确的问题
- 改进了浏览器缩放下的布局对齐问题
- 修复了被忽略的列和 Year 视图的显示
- 解决了多点触控屏幕上的错误
- 改善了移动设备上的键盘焦点行为
- 处理了多项夏令时（DST）相关问题
- 在日时间线中正确显示安排在每月 31 日的事件
- `addEventNow` 现在返回新建事件的 ID
- 修复了调度器容器从 DOM 移除时对 `window.onresize` 的处理

## 4.3.25

<span class='release_date'>2016年3月3日. Bugfix 版本</span>

### 修复

- 增强了触控支持，可在"日"、"周"和"资源"视图的多天区域触发单击和双击操作
- 修复了触控拖动操作开始时事件消失的回归问题
- 修正了在时间轴（Timeline）中设置忽略列时的 onYScaleClick 回调
- 修复了时间轴中取消拖放操作后事件对象的状态
- 将 *timeline_scale_class* 模板应用于树形时间轴（Tree Timeline）中的文件夹项
- 防止在 dataProcessor 正在请求时清空调度器导致的 JavaScript 错误
- 修复了在 dataProcessor 禁用 autoUpdate 时添加/修改周期性事件系列后状态不正确的问题
- 改进了在"日"和"周"视图启用首尾小时数时的事件可见性
- 修正了在多天资源视图（Multiday Units View）通过双击创建事件时默认分区选择的问题
- 解决了 Chrome 浏览器偶尔无法触发单击和双击事件的 bug
- 修复了 Safari 浏览器的夏令时问题
- 其他各种小修复

## 4.3

<span class='release_date'>2015年2月4日. 小版本更新</span>

1. 为时间轴视图（Timeline view，PRO 版）新增"天"模式 ([details](views/timeline.md#daysmodedetails))
2. 支持在资源视图（Units view，PRO 版）中跨多天显示单元 ([details](views/units.md#displayingunitsformultipledays))
3. 为 @expand 扩展引入新事件 ([details](/guides/extensions-list/#expand))
4. 为 Limit 扩展增加新选项 ([details](api/config/now_date.md), [details](/guides/extensions-list/#limit))
5. 为 Tooltip 扩展增加新选项 ([details](api/config/touch_tooltip.md), [details](/guides/extensions-list/#tooltip))
6. 通过 @url 扩展实现事件间的链接 ([details](/guides/extensions-list/#url))
7. 修复了与夏令时相关的问题
8. 解决了在时间轴视图中触摸设备创建新事件的问题
9. 新增周议程（Week Agenda）、表格视图（Grid View）、时间轴视图、资源视图、多分区事件（PRO 版） ([details](views/weekagenda.md), [details](views/grid.md), [details](views/timeline.md), [details](views/units.md), [details](api/config/multisection.md))

## 4.2

<span class='release_date'>2014年11月12日. 小版本更新</span>

1. 支持自定义周期性事件表单布局 ([details](guides/recurring-events.md#customcontrolforthelightboxsrecurringblock))
2. DataProcessor 新增 REST 模式及 JSON 响应支持 ([details](guides/server-integration.md#rest-json-mode))
3. 改进多分区事件（PRO 版）的拖放操作 ([details](api/config/multisection_shift_all.md))
4. 新增 API 事件以处理 Ajax 和服务器错误 ([details](api/event/onloaderror.md))
5. 提升时间轴视图性能
6. 增加延迟渲染选项 ([details](api/config/delay_render.md))
7. 改进导出到 iCal 和 Excel 的功能 ([details](export/excel.md))
8. 修复与 DHTMLX Suite 4.0 的兼容性问题
9. 其他各种小修复

## 4.1

<span class='release_date'>2014年6月13日. 小版本更新</span>

1. 新增"Flat"皮肤 ([details](guides/skins.md#flatskin))
2. 支持在时间轴和资源视图（PRO 版）中将事件分配到多个分区 ([details](views/timeline.md#assignmentofeventstoseveralsections), [details](views/units.md#assigningeventstoseveralunits))
3. 支持在月视图中通过拖放调整多天事件的大小 ([details](views/month.md#resizingeventsbydragndropver41))
4. 支持在不同调度器之间拖放操作 ([details](guides/drag-between.md))
5. 新增 PNG 格式数据导出 ([details](export/png.md))
6. 新增导出到 PDF 的新方法 ([details](export/pdf.md))
7. 拖动时在时间刻度上高亮事件时长 ([details](api/config/drag_highlight.md))
8. 支持在表格视图（PRO 版）中更改滚动时间区间 ([details](views/grid.md#activatingnavigation))
9. 增加防止事件拖出可见时间轴视图的选项 ([details](api/config/limit_drag_out.md))
10. 修复 Windows 触控设备上的 bug
11. 更新示例以支持不同时区的正确操作

## <b>4.0</b>

<span class='release_date'>2013年7月2日. 重大更新</span>

1. 新增灵活的时间刻度，可移除特定的天或小时 ([details](guides/custom-scales.md))
2. 月视图支持"更多事件"链接 ([details](views/month.md#limitingthenumberofeventsinacell))
3. 集成 jQuery ([details](integrations/other/jquery-integration.md))
4. 增加 Backbone 集成 ([details](integrations/legacy/backbone-integration.md))
5. 默认皮肤更改为"terrace"，多天事件默认可见
6. 周期性事件增加了备用起始日期逻辑 ([details](api/config/repeat_precise.md))
7. 支持从 .Net Web 服务加载 JSON 数据
8. 文档大幅改进

## 3.7

<span class='release_date'>2013年2月20日. 小版本更新</span>

1. 支持平板和触控显示器的触摸操作 ([details](guides/touch-support.md))
2. 增加罗马尼亚语本地化

## 3.6

<span class='release_date'>2012年12月3日. 小版本更新</span>

1. 推出 Windows 8 版本
2. 扩展 lightbox 表单的日期格式配置
3. 时间轴视图新增子日导航
4. 时间轴视图支持自定义排序
5. 新增多页 PDF 导出 ([details](export/pdf-multi.md))

## 3.5

<span class='release_date'>2012年8月24日. 小版本更新</span>

1. 支持在同一页面显示多个调度器 ([details](guides/multiple-per-page.md))
2. 支持直接从 Connectors 加载 JSON ([details](guides/server-integration.md#json-mode))
3. 改进自定义事件渲染 ([details](guides/custom-events-display.md))
4. 时间轴视图增强了拖动、调整大小和事件高度控制
5. 推出新皮肤 'dhx_terrace' ([details](guides/skins.md#contrast-white-skin))
6. 增加日期阻止新选项 ([details](guides/limits.md#how-to-block-certain-dates))
7. 支持标记时间区间 ([details](guides/limits.md#how-to-mark-certain-dates))
8. 新增时间区间高亮功能 ([details](api/method/marktimespan.md))
9. 新增 API 方法:updateView, showEvent, getRenderedEvent, getActionData ([details](api/method/updateview.md), [details](api/method/showevent.md), [details](api/method/getrenderedevent.md), [details](api/method/getactiondata.md))
10. 集成 JSMessage
11. 新增表格视图（PRO 版） ([details](views/grid.md))
12. 引入新配置选项
13. 简化对 lightbox 分区对象的访问 ([details](api/method/formsection.md))
14. 支持 'CTRL+C'、'CTRL+X'、'CTRL+V' 键盘命令 ([details](guides/keyboard-navigation.md))

## <b>3.0</b>

<span class='release_date'>2011年7月27日. 重大更新</span>

1. 新增周议程视图（PRO 版） ([details](views/weekagenda.md))
2. 推出适合上网本的 lightbox 表单 ([details](guides/lightbox-editors-manipulations.md#typesoflightbox))
3. 增加级联事件显示 ([details](api/config/cascade_event_display.md))
4. 简化事件颜色分配 ([details](guides/custom-events-color.md))
5. 支持拖动详情表单
6. 详情表单支持自定义按钮 ([details](guides/changing-lightbox-buttons.md))
7. 日/周视图新增当前时间指示线
8. 时间轴视图支持多行标题
9. 工作时间区间可配置 ([details](guides/custom-scales.md#technique))
10. 提供访问 lightbox 值的 API ([details](guides/lightbox-editors-manipulations.md))

## 2.3

<span class='release_date'>2010年8月30日. 小版本更新</span>

### 主要更新

1. 新增地图视图 ([details](views/map.md))
2. 时间轴视图新增单元格模式（PRO 版） ([details](views/timeline.md#viewmodes))
3. 时间轴视图新增树形模式（PRO 版） ([details](views/timeline.md#viewmodes))
4. 所有视图均支持工具提示 ([details](guides/tooltips.md))
5. 时间轴模式支持双击或拖放创建新事件
6. 时间轴模式支持拖放移动事件
7. 支持通过外部拖放创建新事件 ([details](integrations/legacy/dhtmlx-dnd.md))

### 次要更新

- 新增周数格式选项 ([details](guides/settings-format.md))
- 新增 full_day 配置项 ([details](guides/lightbox-editors-manipulations.md#automatic-end-date-in-the-time-control))
- 新增 event_duration 和 auto_end_date 配置项 ([details](guides/lightbox-editors-manipulations.md#automatic-end-date-in-the-time-control))
- 详情表单支持多选分区 ([details](guides/lightbox-editors.md#sections-controls))
- 详情表单新增复选框、下拉框和单选框分区 ([details](guides/lightbox-editors.md#sections-controls))
- 支持防止周期性事件冲突
- 时间轴相关处理器增加额外参数
- mini-calendar 扩展 API 扩展 ([details](guides/minicalendar.md))
- 简化自定义表单实现 ([details](guides/custom-details-form.md))

### Bug 修复和改进

- 修复特定 iCal 数据源处理错误
- 修正重叠事件的渲染问题

## 2.2

<span class='release_date'>2010年4月14日. 小版本更新</span>

### 主要更新

1. 新增导出到 XML、iCal、JSON ([details](export/serialization.md))
2. 新增导出到 PDF ([details](export/pdf.md))
3. 支持加载 JSON 数据 ([details](guides/data-formats.md))
4. 新增"冲突检测"扩展 ([details](guides/collisions.md))
5. 新增"日期刻度限制"扩展 ([details](guides/limits.md))
6. 新增 mini-calendar 扩展 ([details](guides/minicalendar.md))
7. 新增时间轴视图 ([details](views/timeline.md))
8. 支持自动从服务器获取选项列表 ([details](guides/select.md#populating-the-control-with-data))

### 次要更新

- 支持配置快捷键及部分元素尺寸
- 资源视图（PRO 版）支持阶梯式滚动 ([details](views/units.md#scrollingunits))
- 新增阿拉伯语、匈牙利语、印尼语、波兰语、斯洛文尼亚语本地化 ([details](guides/localization.md#included-locales))
- 新增 18 个新示例

### Bug 修复和改进

- 修复了多种与时间偏移相关的 bug
- 解决了议程视图中周期性事件的问题
- 修复了年视图中周期性事件的问题

## 2.1

<span class='release_date'>2009年12月2日. 小版本更新</span>

### 主要更新

1. 新增议程视图 ([details](views/agenda.md))
2. 新增年视图 ([details](views/year.md))
3. 增加若干小扩展
4. 推出调度器皮肤生成器
5. 示例数量翻倍

### 更新完整列表

+ agenda 视图  
+ year 视图  
+ 小型扩展  
+ 新增 onEventSave 事件  
+ 新增 onSchedulerResize 事件  
+ 现已支持芬兰语和荷兰语本地化  
+ 新增中文本地化  
+ 调度器新增葡萄牙语翻译  
+ 现已提供 time_picker 模板  
+ 新增 event_date 模板  
+ 修复了多周事件的布局问题（#808）  
+ 修正了 IE6 中编辑器渲染的问题  
+ 修正了复杂动态模式下 event-bar 的尺寸问题  
+ 解决了在不可见事件上执行 js 命令时的错误  
+ 修复了 time_step 定义为字符串时的处理问题（#788）  
+ 移除了 IE 中不必要的滚动条（#776）  
+ 修正了周刻度标签结束日期的问题（#621）  
+ 修复了添加项时的拖拽问题（#782）  
+ 改进了 unit 视图中多日事件的显示位置（#784）  
+ 防止将结束日期设置为早于开始日期（#781）  
+ 修复了处理未知 CSS 时的问题  
+ 修正了 Chrome 和 Safari 下的轮廓显示  
+ 修复了可滚动页面中 lightbox 的定位问题  
+ 处理了夏令时/冬令时转换的问题  
+ 修复了删除或添加事件时 multi_day 区域的渲染问题  
+ 解决了编辑模式下调整大小后重复视图的问题  
+ 修复了禁用 "onClick" 事件时事件编辑器无法关闭的问题（#617）  
+ 修正了字符串转日期时 12AM 的处理  


## <b>2.0</b> 

<span class='release_date'>2009年7月20日. 重大更新</span>

### 主要变更

1. 新增对[重复事件](guides/recurring-events.md)的支持 
2. 引入创建[Units 视图](views/units.md)的能力（PRO 版本） 
3. 多日事件现在在 Day 和 Week 模式下可见（scheduler.config.multi_day = true;） 
4. Month 视图可自动调整大小以防止数据溢出 
5. 增加了自定义视图的支持 


## <b>1.0</b> 

<span class='release_date'>2009年5月20日. 初始版本</span>

- 包含 Day/Week/Month 视图  
- 支持拖放操作  
- 支持基于 Ajax 的 web API

