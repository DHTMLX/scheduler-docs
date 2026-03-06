---
title: "后端集成问题排查指南"
sidebar_label: "后端集成问题排查指南"
---

# 后端集成问题排查指南

## 症状

1. 当您手动实现后端 API 或按照我们的[教程](integrations/howtostart-guides.md)操作时，调度器页面上不显示任何事件。

或

2. 保存更改到后端时遇到困难。

## 原因

不同平台上导致异常行为的原因和解决方案可能多种多样，本篇文章不涉及所有细节。

本文旨在指导您排查常见问题。当问题被定位和理解后，修复通常较为简单。

## 检查页面上的错误信息

1. 打开浏览器开发者工具并重新加载页面。控制台中是否有错误信息？

![错误检查](/img/errors_check.png)

2. 如果有错误，请评估是否可以自行处理。如果无法解决，请继续下一步。

## 检查客户端请求

1. 打开 **Network** 面板，确保已显示 *XHR* 请求。

2. 重新加载页面，找到用于从后端加载数据的请求。确认其目标 URL 是否正确，并检查响应状态。

![请求检查](/img/requests_check.png)

是否有错误？

404 状态表示传递给 `scheduler.init` 方法的 URL 不正确，或您的应用路由设置存在问题。

## 检查服务器返回内容

选中该请求，查看响应预览或原始响应内容。

![响应检查](/img/response_check.png)

响应内容是否符合[预期数据格式](guides/data-formats.md)？

### 如果看到服务器错误信息而非调度器数据

这说明后端代码或数据库连接配置存在问题。

通常，错误响应会包含足够的细节以定位原因。如果遇到通用的 `500 server error`，您可能需要临时禁用服务器上的自定义错误页面，以显示实际错误。此操作因平台而异。如果不确定，建议搜索"disable custom error page in (your server or framework)"。

### 如果数据大致正确

请仔细检查 `id`、`start_date` 和 `end_date` 属性。

- `id` -- id 相同的事件会被合并。如果有五个事件 id 相同，只会显示一个。

- `start_date`、`end_date` -- 确认日期格式与 [date_format](api/config/date_format.md) 中调度器配置的格式一致。

[关于数据属性的更多细节](guides/loading-data.md#dataproperties)。

如果日期格式与调度器预期不符，事件可能因无效日期而无法显示，或显示在错误的日期上。

通常在 `scheduler.init` 前设置 `xml_date`，例如:

~~~js
scheduler.config.xml_date="%Y-%m-%d %H:%i";
~~~

### 如果属性值异常

请检查数据库中存储的数据，问题很可能在这里。如果日期格式不一致，可以更新 [date_format](api/config/date_format.md) 配置，或调整序列化任务日期的代码，再发送到客户端。

## 检查调度器加载的数据

### 日期格式无效

1. 打开浏览器控制台，运行 `scheduler.getEvents()`。

2. 查看控制台输出，应该会显示事件数组。

![数据检查](/img/data_check.png)

检查部分记录的 `start_date` 和 `end_date` 字段。若显示 `invalid date` 或出现如 1970、2038 这样的异常年份，说明 [date_format](api/config/date_format.md) 格式有问题。

:::note
如果您使用了[循环事件扩展](guides/recurring-events.md)，[scheduler.getEvents()](api/method/getevents.md) 只有在指定 `from`/`to` 日期参数时才会返回数据。为检查方便，请临时移除循环事件扩展。
:::

### Units/Timeline 视图缺少属性

若您使用 [Units](views/units.md) 或 [Timeline](views/timeline.md) 视图，若事件未分配到任何单元或时间线部分，则不会显示。

可通过为 [Units view](views/units.md#skippingeventsthatdontbelongtoanyoftheunits) 设置 `skip_incorrect:false` 检查:

~~~js
scheduler.createUnitsView({
    name:"unit",
    ...
    skip_incorrect:false
});
~~~

或为 [Timeline view](api/method/createtimelineview.md) 设置 `show_unassigned: true`：

~~~js
scheduler.createTimelineView({
    name:"timeline",
    ...
    show_unassigned: true
});
~~~

如确实如此，更新配置并刷新后，事件会显示在 Units/Timeline 视图的第一个部分。接着请检查 Units 或 Timeline 视图的 `property` 或 `y_property` 选项，以及事件中的对应属性。

### 过滤器

若未发现明显问题，请检查代码，确认事件是否被[过滤器隐藏](guides/filtering.md)。

## 最后一步

如果上述方法均无效，或页面既无事件也无控制台错误，请考虑[在我们的论坛发帖](https://forum.dhtmlx.com/c/scheduler-all)或联系技术支持。

请确保附上排查过程中收集的所有信息。

此外，我们的团队需要一个最小可复现的 demo:可以是包含简化应用的独立包（调度器页面、所有必要文件、包含测试数据的数据库备份，或用于加载的静态 JSON 文件），也可以是可直接在浏览器检查问题的在线链接。
