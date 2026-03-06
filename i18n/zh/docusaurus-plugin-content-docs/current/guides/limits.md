---
title: "阻止和标记日期"
sidebar_label: "阻止和标记日期"
---

# 阻止和标记日期

该库包含 **Limit** 扩展，允许您阻止和高亮特定日期或日期范围。

要开始使用该插件，只需在页面上启用它即可。

:::note
注意，如果您使用 [타임라인 뷰](views/timeline.md)，'limit' 扩展应在 'timeline' 之前启用:
:::

~~~js
scheduler.plugins({
    limit: true, /*!*/
    timeline: true
});
~~~

## 配置选项 {#configurationoptions}

以下是此扩展可用的配置选项:


- [display_marked_timespans](api/config/display_marked_timespans.md) - 控制调度器中是否高亮显示已标记（阻止）的时间段
- [check_limits](api/config/check_limits.md) - 打开或关闭限制检查
- [mark_now](api/config/mark_now.md) - 切换显示当前时间的标记
- [now_date](api/config/now_date.md) - 设置 [mark_now](api/config/mark_now.md) 选项使用的日期
- [limit_end](api/config/limit_end.md) - 定义允许日期范围的结束限制
- [limit_start](api/config/limit_start.md) - 定义允许日期范围的开始限制
- [limit_view](api/config/limit_view.md) - 限制事件的查看


[Current time marking](https://docs.dhtmlx.com/scheduler/samples/02_customization/23_current_time.html)


## 相关事件 {#relatedevents}

如果有人尝试在不允许的日期创建或更改事件，会触发 [onLimitViolation](api/event/onlimitviolation.md) 事件。

## 如何阻止某些日期？ {#how-to-block-certain-dates}

<span id="howtoblockcertaindates"></span>

在调度器中设置限制有几种方法:


- [addMarkedTimespan](api/method/addmarkedtimespan.md) - 标记日期并可通过自定义样式选项阻止它们
- [markTimespan](api/method/marktimespan.md) - 使用默认或自定义样式标记或阻止日期；在任何内部更新后移除标记，适合高亮显示


[Blocking dates](https://docs.dhtmlx.com/scheduler/samples/03_extensions/25_advanced_limitation.html)


## 如何标记某些日期？ {#how-to-mark-certain-dates}

<span id="howtomarkcertaindates"></span>

您可以使用以下两种方法高亮特定日期:

- [addMarkedTimespan](api/method/addmarkedtimespan.md) - 标记日期并可通过自定义样式选项阻止它们
- [markTimespan](api/method/marktimespan.md) - 使用默认或自定义样式标记或阻止日期；在任何内部更新后移除标记，适合高亮显示


[Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)


## 移除标记/阻止 {#removingmarkingblocking}

要清除当前已标记或阻止的时间段，可以使用以下方法:


- [deleteMarkedTimespan](api/method/deletemarkedtimespan.md) - 移除通过 [addMarkedTimespan](api/method/addmarkedtimespan.md) 设置的标记或阻止
- [unmarkTimespan](api/method/unmarktimespan.md) - 移除通过 [markTimespan](api/method/marktimespan.md) 设置的标记或阻止


[Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)


## 阻止优先级 {#blockingpriority}

当使用多种阻止方法覆盖不同范围时，阻止优先级如下（从高到低）:

1. 针对特定条目使用 Date() 对象指定的日期；
2. 特定条目的日期（设置了 **sections** 参数时）；
3. 使用 Date() 对象指定的日期；
4. 其他日期。

- 如果阻止或标记使用相同的 **type**，优先级高的会覆盖优先级低的。
- 如果阻止或标记方法优先级相同（时间上重叠），则会同时应用。

例如:

~~~js
scheduler.addMarkedTimespan({ // 阻止 2012 年 7 月 4 日（星期三）
    days:  new Date(2019, 7, 4),
    zones: "fullday", 
    type:  "dhx_time_block",
    css:   "red_section" // 应用的 CSS 类
});
scheduler.addMarkedTimespan({ // 阻止每个周日、周一和周三
    days:  [0, 1, 3], 
    zones: "fullday",
    type:  "dhx_time_block", 
    css:   "blue_section" // 应用的 CSS 类
});
// 仅为 id="2" 的条目阻止每个周日和周三
scheduler.addMarkedTimespan({  
    days:  [0,3], 
    zones: "fullday",
    type:  "dhx_time_block", 
    css:   "gray_section",  // 应用的 CSS 类
    sections: { timeline: 2} 
});
~~~

经过以上调用，调度器行为如下:

1. 首先，会阻止 **Timeline 视图中 id="2" 条目的每个周日和周三**，并将其着色为灰色。
2. 接着，会阻止 **2012 年 7 月 4 日** 并将其着色为红色。
3. 最后，会阻止 **每个周日、周一和周三**，并将其着色为蓝色。

![limits_priority.png](/img/limits_priority.png)

如果您希望无论优先级如何都显示所有标记，可以这样设置 [overwrite_marked_timespans](api/config/overwrite_marked_timespans.md) 选项:

~~~js
scheduler.config.overwrite_marked_timespans_config = false;
~~~
