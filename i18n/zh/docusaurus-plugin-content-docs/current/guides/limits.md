--- 
title: "阻塞与标记日期"
sidebar_label: "阻塞与标记日期"
---

# 阻塞与标记日期

该库提供了名为 **Limit** 的扩展，允许你阻塞并标记（高亮显示）某些日期或日期范围。

要开始使用该插件，请在页面上激活它。

:::note
请注意，如果你使用 [](views/timeline.md)，应在启用 'timeline' 之前先启用 'limit' 扩展：
:::

~~~js
scheduler.plugins({
    limit: true, /*!*/
    timeline: true
});
~~~


## 配置选项

该扩展提供以下配置选项：

- [display_marked_timespans](api/config/display_marked_timespans.md) - 定义是否应在调度程序中高亮显示标记（阻塞）时间段
- [check_limits](api/config/check_limits.md) - 启用/禁用对限制的检查
- [mark_now](api/config/mark_now.md) - 启用/禁用显示当前时间的标记
- [now_date](api/config/now_date.md) - 为 [mark_now](api/config/mark_now.md) 选项设置日期
- [limit_end](api/config/limit_end.md) - 设置允许日期范围的结束限制
- [limit_start](api/config/limit_start.md) - 设置允许日期范围的开始限制
- [limit_view](api/config/limit_view.md) - 限制查看事件


[当前时间标记](https://docs.dhtmlx.com/scheduler/samples/02_customization/23_current_time.html)


## 相关事件 

如果调度程序检测到尝试创建/修改一个日期不被允许的事件，将生成 [onLimitViolation](api/event/onlimitviolation.md) 事件。

## 如何阻塞某些日期？

有几种方法可以在调度程序中指定一个限制：


- [addMarkedTimespan](api/method/addmarkedtimespan.md) - 标记日期，但在某些设置下实现阻塞（允许为限制设置自定义样式）
- [markTimespan](api/method/marktimespan.md) - 通过应用默认样式或自定义样式来标记和/或阻塞日期。标记在应用内发生任何内部更新后会立即取消。可用于高亮显示


[Blocking dates](https://docs.dhtmlx.com/scheduler/samples/03_extensions/25_advanced_limitation.html)


## 如何标记某些日期？

有两种方法可用于标记指定日期（们）：


- [addMarkedTimespan](api/method/addmarkedtimespan.md) - 标记日期，但在某些设置下实现阻塞（允许为限制设置自定义样式）
- [markTimespan](api/method/marktimespan.md) - 通过应用默认或自定义样式来标记和/或阻塞日期。标记在应用内发生任何内部更新后会被取消。可用于高亮显示


[Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)


## 移除标记/阻塞

有几种方法可以移除当前标记/阻塞的时间范围：


- [deleteMarkedTimespan](api/method/deletemarkedtimespan.md) - 移除由 [addMarkedTimespan](api/method/addmarkedtimespan.md) 方法设置的标记/阻塞
- [unmarkTimespan](api/method/unmarktimespan.md) - 移除由 [markTimespan](api/method/marktimespan.md) 方法设置的标记/阻塞


[Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)


## 阻塞优先级

当你多次调用“blocking”方法并阻塞不同的范围时，阻塞将按以下优先级（从高到低）执行：


1. 通过 Date() 对象为某些项指定的日期；  
2. 针对某些项的日期（当定义了 **sections** 参数时）；  
3. 通过 Date() 对象指定的日期；  
4. 其他日期。

- 当同一 **type** 的阻塞/标记具有相同优先级时，优先级更高的将覆盖优先级较低的。  
- 具有相同优先级的若干阻塞/标记方法（位于同一时间槽中）将同时应用。

例如：


~~~js
scheduler.addMarkedTimespan({ // 阻止 2027 年 7 月 4 日（星期三）
    days:  new Date(2027, 7, 4),
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


调用这些方法的结果将如下：


1. 首先，调度程序将在 Timeline 视图中的项（id="2"）的每个周日和周三阻塞，并将它们显示为灰色。  
2. 接着，将阻塞 2027 年 7 月 4 日，并将其着色为红色。  
3. 最后，将阻塞每个周日、周一、周三，并将它们着色为蓝色。

![limits_priority.png](/img/limits_priority.png)

若要改变此行为并显示所有标记而不管其优先级如何，你可以使用 [overwrite_marked_timespans](api/config/overwrite_marked_timespans.md) 设置：

~~~js
scheduler.config.overwrite_marked_timespans_config = false;
~~~