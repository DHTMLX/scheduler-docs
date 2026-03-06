---
title: "从旧版本迁移"
sidebar_label: "从旧版本迁移"
---

# 从旧版本迁移 

## 7.1 -> 7.2

升级到 v7.2 带来了一些默认设置的变更。

### `all_timed` 插件现在默认启用

[all_timed](api/config/all_timed.md) 插件现在默认激活，允许显示跨夜事件。若需恢复到之前的行为，可以按如下方式调整配置:

~~~js
scheduler.config.all_timed = false;
~~~

### 日期函数不再修改其参数

在早期版本中，诸如 `scheduler.date.day_start`、`scheduler.date.week_start` 和 `scheduler.date.date_part` 等日期函数会更改传入的原始日期对象:

~~~js
const date = new Date(2025, 1, 15, 13, 00);
const dayStart = scheduler.date.day_start(date);

console.log(dayStart);
// 2025-02-15 00:00:00

console.log(date);
// 2025-02-15 00:00:00
~~~

从 v7.2 开始，原始日期对象保持不变:

~~~js
const date = new Date(2025, 1, 15, 13, 00);
const dayStart = scheduler.date.day_start(date);

console.log(dayStart);
// 2025-02-15 00:00:00

console.log(date);
// 2025-02-15 13:00:00
~~~

## 7.0 -> 7.1

v7.1 更新包含若干重大变更。

### 新的周期性事件引擎

启用 `recurring` 插件时，会使用新的[周期性事件](guides/recurring-events.md)引擎:

~~~js
scheduler.plugin({
    recurring:true
});
~~~

由于新插件依赖于不同的属性集来定义周期性事件，目前没有直接的迁移路径。你可以继续通过启用旧版插件，使用[旧的周期性事件引擎](guides/recurring-events-legacy.md)，直到准备好迁移:

~~~js
scheduler.plugin({
    recurring_legacy:true
});
~~~

### 撤销弹窗

由 [undo_deleted](api/config/undo_deleted.md) 控制的撤销功能现在默认启用。如不需要此行为，可通过配置关闭:

~~~js
scheduler.config.undo_deleted = false;
~~~

### 地图视图的变更

部分属性已弃用，现在属于 [map_settings](api/config/map_settings.md) 配置对象的一部分:

- **scheduler.config.map_error_position**
- **scheduler.config.map_initial_position**
- **scheduler.config.map_type**

设置这些属性的新方式如下:

~~~js
scheduler.config.map_settings = {
    initial_position: {
       lat: 48.724,
       lng: 8.215
    },
    error_position: {
       lat: 15,
       lng: 15
    },
    type: google.maps.MapTypeId.HYBRID
}
...
scheduler.init('scheduler_here',new Date(2024,05,11),"map");
~~~

此外，以下地图视图模板已弃用，被 [map_info_content](api/template/map_info_content.md) 替代:

- **scheduler.templates.marker_date**
- **scheduler.templates.marker_text**

新的模板用法如下:

~~~
scheduler.templates.map_info_content = function(event){
    const formatDate = scheduler.templates.tooltip_date_format;
    return `<div><b>Text:</b> ${event.text}
        <div><b>Location:</b> ${event.event_location}</div>
        <div><b>Starts:</b> ${formatDate(event.start_date)}</div>
        <div><b>Ends:</b> ${formatDate(event.end_date)}</div>
    </div>`;
};
~~~

### 属性可单独或在统一对象中配置

[map_view_provider](api/config/map_view_provider.md) 属性可以单独指定，也可以放入 [map_settings](api/config/map_settings.md) 配置对象中，如下:

~~~js
scheduler.config.map_settings = {
    view_provider: "googleMap"
}
...
scheduler.init('scheduler_here',new Date(2024,05,11),"map");
~~~

### 单独使用的属性

以下地图属性仍然在 [map_settings](api/config/map_settings.md) 对象之外:

- [map_end](api/config/map_end.md)
- [map_start](api/config/map_start.md)

## 6.0 -> 7.0

升级到 v7.0 引入了多项重大变更。

### 皮肤现在使用 CSS 变量

CSS 皮肤（主题）已经完全重构为使用 CSS 变量。虽然 HTML 结构和 CSS 类名大多保持不变，但为旧版本 Scheduler 编写的自定义 CSS 可能无法在 v7.0 中正常工作。

例如，之前更改事件背景色的方式如下:

~~~html
<style>
    /* 日/周视图中的事件 */
    .dhx_cal_event.manager_event div{
        background-color: #009966 !important;
        color: black !important;
    }
    /* 月视图中的多日事件 */
    .dhx_cal_event_line.manager_event{
        background-color: #009966 !important;
        color: black !important;
    }
    /* 月视图中有固定时间的事件 */
    .dhx_cal_event_clear.manager_event{
        color: black !important;
    }
</style>
~~~

从 v7.0 开始，可以这样实现同样的效果:

~~~html
<style>
    .manager_event {
        --dhx-scheduler-event-background: #009966;
        --dhx-scheduler-event-color: black;
    }
</style>
~~~

可在 [스킨 커스터마이제이션](guides/custom-skins.md) 页面查阅可用变量列表。

:::note
迁移后需更新样式，以保持期望的外观效果。
:::

### 单一 CSS 文件包含所有主题

所有主题现已合并为一个 **dhtmlxscheduler.css** 文件。

选择特定皮肤时，可使用 `scheduler.skin` 属性:

~~~js
scheduler.skin = "material";
~~~

或使用 [setSkin](api/method/setskin.md) 方法:

~~~js
scheduler.setSkin("material");
~~~

:::note
请注意，`scheduler.setSkin()` 会触发 Scheduler 的重绘。
:::

如果你从 **terrace** 以外的皮肤切换，请按以下步骤操作:

1) 用新的合并 CSS 文件替换旧的皮肤 CSS 文件:

~~~html
<!-- 旧用法 -->
<link rel="stylesheet" href="./codebase/dhtmlxscheduler_material.css" type="text/css">
<!-- 新用法 -->
<link rel="stylesheet" href="./codebase/dhtmlxscheduler.css" type="text/css">
~~~

2) 通过 JavaScript 启用皮肤:

~~~js
scheduler.setSkin("material");
scheduler.init("scheduler_here");
~~~

### 已弃用的 `scheduler.xy` 设置

以下 `scheduler.xy` 属性已不再使用:

- scheduler.xy.nav_height
- scheduler.xy.event_header_height

它们的高度现在通过如下 CSS 样式控制:

~~~css
.dhx_cal_navline {
    height: 40px;
}

.dhx_cal_event dhx_title {
    height: 30px;
}
~~~

### 默认值变更

[details_on_create](api/config/details_on_create.md) 和 [details_on_dblclick](api/config/details_on_dblclick.md) 属性的默认值已由 `false` 改为 `true`。

### Material 皮肤字体

**Material** 皮肤默认不再包含 Roboto 字体。

如使用 Material 皮肤，需手动引入字体:

~~~js
@import url(
'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap'
);
~~~

### Tooltips 新 API

Tooltips 现有全新 API，简化了为自定义元素添加提示的流程。详见 [툴팁 (Tooltips)](guides/tooltips.md) 文章。

### 日/周视图列增加内边距

日、周和单位视图的列两侧现有少量内边距。这样用户可在空白区域通过双击创建新事件。

如需去除该内边距，将 [day_column_padding](api/config/day_column_padding.md) 设置为零:

~~~js
scheduler.config.day_column_padding = 0;
~~~

### 集成导出服务

自 v7.0 起，导入/导出功能已集成至 Scheduler 库中。

如果之前为在线导出功能引入了 **https://export.dhtmlx.com/scheduler/api.js**，例如:

~~~js
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>
~~~

应移除该文件，并通过 **scheduler.plugins** 启用 **export_api** 扩展:

~~~js
scheduler.plugins({
    export_api: true
});
~~~

### Promise 实现已更新

**Bluebird** 库已从 Scheduler 包中移除。[Promise](api/method/promise.md) 现在使用原生 Promise 实现。

## 5.3 -> 6.0

v6.0 更新带来 Scheduler 包的两项主要结构变更:

1) 所有扩展文件现已集成至 *dhtmlxscheduler.js*。如需启用扩展，必须使用 API。

- 如果以前单独引入扩展文件，如:

~~~js
<script src="../codebase/dhtmlxscheduler.js"></script>
<script src="../codebase/ext/dhtmlxscheduler_active_links.js"></script>
~~~

或

~~~js
import "dhtmlx-scheduler";
import "dhtmlx-scheduler/ext/dhtmlxscheduler_active_links";
~~~

应移除单独的扩展文件，并通过 **scheduler.plugins** 启用扩展:

~~~js
scheduler.plugins({
   active_links: true
});
~~~

完整扩展列表见[此处](/guides/extensions-list/)。

- 如果你使用了修改过的或自定义扩展文件，仍可像以前一样手动引入。

- **注意**，**dhtmlxscheduler_csp.js** 扩展已被完全移除，无需手动启用。


2) 所有本地化文件现已集成至 *dhtmlxscheduler.js*。如需激活某个本地化语言，请使用 API 调用。

- 请从页面中移除所有单独的本地化文件，并通过 **scheduler.i18n.setLocale** 启用所需语言:

~~~js
scheduler.i18n.setLocale("de");
~~~

- 仍可像以前一样加载自定义本地化文件。

### DataProcessor 初始化

DataProcessor 构造函数已从全局 **dataProcessor** 函数迁移至 **scheduler.DataProcessor** 函数。

如果你的应用使用 DataProcessor，请将初始化代码更新如下:

~~~js
// 旧方式
var dp = new dataProcessor("/scheduler/backend/events");
dp.init(scheduler);
dp.setTransactionMode("REST", false);
~~~

替换为:

~~~js
// 新方式
var dp = new scheduler.DataProcessor("/scheduler/backend/events");
dp.init(scheduler);
dp.setTransactionMode("REST", false);
~~~

推荐的做法是使用 **scheduler.createDataProcessor**:

~~~js
// 推荐方式
var dp = scheduler.createDataProcessor({
    url: "/scheduler/backend/events",
    mode: "REST"
});
~~~

这种方式下，无需调用 **DataProcessor.init(scheduler)**，如有需要可照常调用 **DataProcessor.setTransactionMode**。

### 已弃用的 API

**dhtmlx** 对象在 dhtmlxscheduler.js 中不再定义，因此自 6.0 版本起，部分方法和全局对象已被弃用。

1) 以下方法已弃用，并被替换为:

<table class="my_table">

<tr><td class="version_info">已废弃方法</td><td class="version_info">可用方法</td></tr>

<tr><td>dhtmlx.alert</td><td>scheduler.alert</td></tr>
<tr><td>dhtmlx.confirm</td><td>scheduler.confirm</td></tr>
<tr><td>dhtmlx.modalbox</td><td>scheduler.modalbox</td></tr>
<tr><td>dhtmlx.uid</td><td>scheduler.uid</td></tr>
<tr><td>dhtmlx.copy</td><td>scheduler.copy</td></tr>
<tr><td>dhtmlx.mixin</td><td>scheduler.mixin</td></tr>
<tr><td>dhtmlx.defined</td><td>scheduler.defined</td></tr>
<tr><td>dhtmlx.bind</td><td>scheduler.bind</td></tr>
<tr><td>dhtmlx.assert</td><td>scheduler.assert</td></tr>
<tr><td>window.dataProcessor</td><td>scheduler.DataProcessor</td></tr>
</table>

方法的参数和行为保持不变。

2) 以下全局对象已弃用:

- dhtmlxAjax
- dtmlXMLLoaderObject
- dhtmlDragAndDropObject
- dhtmlxEventable
- dhtmlxError

如应用中仍需使用这些对象，可通过 **legacy** 插件启用:

~~~js
scheduler.plugins({
    legacy: true
});
~~~

## 5.2 -> 5.3

### 触控手势

[滑动手势](guides/touch-support.md#touch-gestures-in-the-scheduler) 的默认处理器现在默认禁用。

如需重新启用，请通过 [scheduler.config.touch_swipe_dates](api/config/touch_swipe_dates.md) 设置:

~~~js
scheduler.config.touch_swipe_dates = true;
~~~

### 标记和样式

在 [Month View](views/month.md) 中，事件元素的 [box-sizing 模式](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing) 已在所有皮肤中由 **content-box** 改为 **border-box**。

这影响了 **.dhx_cal_event_clear** 和 **.dhx_cal_event_line** 元素。

此更改通常不会引起可见差异，但如果你自定义了月视图事件渲染或使用了自定义皮肤，可能需要相应调整你的样式。

## 5.1 -> 5.2

<h3 id="dnd">拖拽行为</h3>

从 5.2 版本开始，事件可以通过其主体的任意部分进行拖拽，而不再仅限于标题。如果你希望恢复旧行为，可以将 [drag_event_body](api/config/drag_event_body.md) 属性设置为 *false*（默认启用）:

~~~js
scheduler.config.drag_event_body = false;
~~~

### onXLE/onXLS 事件已弃用

这些事件目前仍可用，但未来会被移除。请按如下方式替换:

~~~js
scheduler.attachEvent("onXLS",function(){}); → 
scheduler.attachEvent("onLoadStart",function(){});

scheduler.attachEvent("onXLE",function(){}); → 
scheduler.attachEvent("onLoadEnd",function(){});
~~~

### "xml_date" 配置和模板，以及 "xml_format" 模板已重命名

以下是如何将你的代码更新为新的 API 名称:

- scheduler.config.xml_date →  [scheduler.config.date_format](api/config/date_format.md)
- scheduler.templates.xml_date → [scheduler.templates.parse_date](api/template/parse_date.md)
- scheduler.templates.xml_format → [scheduler.templates.format_date](api/template/format_date.md)

自 v5.2 起，**xml_date** 配置和 **xml_date**、**xml_format** 模板的默认值为 *undefined*。如果没有显式赋值，它们将无法工作。

不过，如果你自定义了这些旧名称，Scheduler 仍然支持，因此它们依然可用。例如:

~~~js
// 这仍然可用
scheduler.templates.xml_date = function(datestring){
    return new Date(datestring);
};
~~~

#### 默认日期格式已更改

- v5.2 之前，默认值由 **scheduler.config.xml_date** 设置为 "%m/%d/%Y %H:%i"
- 从 v5.2 起，由 [scheduler.config.date_format](api/config/date_format.md) 控制，默认值为 "%Y-%m-%d %H:%i"

如需恢复先前的默认格式，请使用:

~~~js
scheduler.config.date_format = "%m/%d/%Y %H:%i";
~~~

#### 日期解析改进

自 v5.2 起，Scheduler 在解析日期时会尝试自动检测日期格式，这可能会影响 **scheduler.date.str_to_date**、**scheduler.templates.format_date** 和 **scheduler.templates.parse_date** 的行为。

如需恢复原有的精确解析行为，可启用:

~~~js
scheduler.config.parse_exact_format = true;
~~~

### [Multiselect](guides/multiselect.md#properties) 控件的 "vertical" 设置现仅接受布尔值

之前，*vertical* 可以设置为字符串，例如:

~~~js
{ name:"userselect", type:"multiselect", ..., vertical:"false" }
~~~

自 v5.2 起，仅支持布尔值:

~~~js
{ name:"userselect", type:"multiselect", ..., vertical: false }
~~~

如果你使用了字符串 "false"，请将其更新为布尔值 false。

## 5.0 -> 5.1

智能渲染和横向滚动功能导致 Timeline 标记结构彻底重构，影响 Timeline、TreeTimeline 及其模式。

主要变化是将 TABLE、TR 和 TD 元素替换为带有相应类名的 DIV 元素。

如果你的 CSS 选择器针对表格标签进行时间轴样式设置，则需要将其更新为新标记结构。整体 DOM 结构保持类似，主要需要调整 CSS 选择器。

以下是更新前后的 CSS 选择器对比:

更新前:

- **.dhx_cal_data > table > tbody > tr > td.dhx_matrix_scell** - 左侧标签列
- **.dhx_cal_data > table > tbody > tr > td > div.dhx_matrix_line** - 包含日期单元格的时间轴行
- **.dhx_cal_data > table > tbody > tr > td > div.dhx_matrix_line > table > tbody > tr > td.dhx_matrix_cell** - 时间轴行内的单个日期单元格

更新后:

- **.dhx_cal_data .dhx_timeline_table_wrapper .dhx_timeline_label_row .dhx_matrix_scell** - 左侧标签列
- **.dhx_cal_data .dhx_timeline_data_wrapper .dhx_matrix_line** - 包含日期单元格的时间轴行
- **.dhx_cal_data .dhx_timeline_data_wrapper .dhx_matrix_line .dhx_matrix_cell** - 时间轴行内的单个日期单元格

## 4.4 -> 5.0

### 移除皮肤

**Glossy** 和 **Classic** 皮肤自 v5.0 起已弃用并移除。

如果你依赖这些皮肤，需要切换到其他 [皮肤](guides/skins.md)，或继续使用旧版本的 CSS 文件。

### 重大 CSS 重构

5.0 版本引入了重大 CSS 修订，这可能会对高度自定义的 CSS 设置造成影响。由于 dhtmlxScheduler 样式的选择器优先级提升，现有样式可能失效。

没有通用的修复方法，迁移时需检查并调整你的 CSS。

### REST 模式 POST 路由修正

此次更新修正了 **REST** 模式下 dataProcessor 的 **POST**（插入）路由，现在不会再向服务器发送临时事件 id。

之前:

~~~js
POST /api/{tempId}

// 示例
POST /api/1234567890
~~~

现在:

~~~js
POST /api
~~~

## 4.x -> 4.3

自 v4.3 起，[周议程视图](views/weekagenda.md)、[表格视图](views/grid.md)、[时间轴视图](views/timeline.md)、[单位视图](views/units.md) 以及 [多区间事件](api/config/multisection.md) 扩展不再包含在 GNU GPL v2 下发布的标准版中。

如需继续使用这些扩展，请保留 4.2 或更早版本，或获取商业或企业授权。

详情请参见 [这里](https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing)。

## 3.6 -> 4.0

公共 API 完全向后兼容。

### 默认值更改

- 默认皮肤切换为 "terrace"；ext/dhtmlxscheduler_dhx_terrace.js 被移除。如需恢复经典皮肤，请引入其 CSS 文件（codebase/dhtmlxscheduler_classic.css）。详见 [스킨(Skins)](guides/skins.md)。

- [multi_day](api/config/multi_day.md) 现在默认启用。如需禁用，请添加:

~~~js
scheduler.config.multi_day = false;
~~~

### 自定义皮肤

Scheduler 会根据 CSS 文件名自动检测皮肤。对于非 "terrace" 的自定义皮肤，请将 CSS 文件重命名为 *dhtmlxscheduler_(skin name).css*。

可以通过设置:

~~~
scheduler.skin = "{skin name}";
~~~

在调用 *scheduler.init* 之前禁用自动检测。

### 弃用 API

以下方法已弃用但仍可用，并将在 Scheduler 5.x 移除:getEventText、getEventStartDate、getEventEndDate、setEventText、setEventStartDate、setEventEndDate。

推荐改用 *scheduler.getEvent()* 并直接访问或修改事件对象的属性。

## 3.6 -> 3.7

完全向后兼容。

## 3.5 -> 3.6

完全向后兼容。

## 3.0 -> 3.5

公共 API 仍然完全向后兼容。

- "Mark now" 功能已移至 dhtmlxscheduler_limit.js 扩展。

- Scheduler 现在支持 [由 dhtmlxConnector 生成的 JSON](guides/server-integration.md)。如无特殊需求，建议使用 JSON，可获得更小的文件体积和更快的加载速度。

## 2.3 -> 3.0

公共 API 仍然完全向后兼容。

- 文件结构略有调整:ext/dhtmlxscheduler_ext.css 和 dhtmlxscheduler_recurring.css 被移除，所有样式现集中在 dhtmlxscheduler.css。

- 部分模板参数已更新以保持一致:scheduler.templates.agenda_text 和 scheduler.templates.map_text 现在接收 (start_date, end_date, event) 参数，而不再仅是 'event'。

## 2.2 -> 2.3

- 完全向后兼容。

- 瑞典语本地化文件重命名以符合 ISO 639-1 标准:

~~~
sources/locale_se.js => sources/locale_sv.js
sources/locale_recurring_se.js => sources/locale_recurring_sv.js
~~~

## 2.1 -> 2.2

- 完全向后兼容。

- 'createUnitsView' 命令现在接受不同的参数集，但旧语法仍然可用。

## 2.0 -> 2.1

- 修正了格式化规则:%d 和 %m 现在始终返回 2 位数字。如需旧行为，请分别使用 %j 和 %n。

- 部分包内文件路径发生更改:

~~~
codebase/dhtmlxgrid_recurring.js => codebase/ext/dhtmlxgrid_recurring.js
codebase/dhtmlxgrid_recurring.css => codebase/ext/dhtmlxgrid_recurring.css
codebase/dhtmlxgrid_units.js => codebase/ext/dhtmlxgrid_units.js
~~~

## 1.0 -> 2.0

- API 和数据格式完全向后兼容。

- 'onEventChanged' 和 'onEventAdded' 事件在数据加载期间不再触发。

- 西班牙语本地化文件已从 locale_sp.js 重命名为 locale_es.js。

- 'drag_create' 选项现在仅控制通过拖拽创建新事件；通过双击创建事件现在由 'dblclick_create' 控制。


