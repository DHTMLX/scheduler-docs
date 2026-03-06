---
title: "通用配置说明"
sidebar_label: "通用配置说明"
---

# 通用配置说明

为了自定义调度器的外观，库提供了三个主要对象:

- <a href="api/overview/properties_overview.md">scheduler.config</a> - 用于设置日期、视图、控件等选项。
- <a href="api/overview/templates_overview.md">scheduler.templates</a> - 用于格式化日期、标题、提示信息和样式的模板。
- [scheduler.xy](api/other/xy.md) - 定义调度器各元素尺寸的设置。

此外，dhtmlxScheduler 还包含了[若干扩展](#extensions)，以增强组件功能。

## scheduler.config {#schedulerconfig}

库在 **scheduler.config** 对象中提供了丰富的配置选项。

要应用某个选项，只需按照本说明进行赋值（如果你在页面上使用了[多个调度器](guides/multiple-per-page.md)，请将 *scheduler* 替换为你的 *dhtmlxScheduler 实例* 名称）。

请注意，配置项必须在初始化调度器之前设置。

~~~js
scheduler.config.first_hour = 8;/*!*/
scheduler.config.last_hour = 17;/*!*/
scheduler.config.start_on_monday = true;/*!*/
scheduler.init('scheduler_here',null,"week");
~~~

**scheduler.config** 属性的完整列表见 [Scheduler API: Properties](api/overview/properties_overview.md)。


[Multi-day events](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/06_multi_day_events.html)


## scheduler.templates {#schedulertemplates}

模板允许你自定义调度器中日期和标题的显示方式。

要定义模板，请按照下例进行赋值（如在页面上有[多个调度器](guides/multiple-per-page.md)，请将 *scheduler* 替换为你的 *dhtmlxScheduler 实例* 名称）。请确保在初始化调度器前定义模板。

~~~js
scheduler.templates.event_text = function(start,end,ev){/*!*/
   return 'Subject: ' + ev.text + '';/*!*/
};/*!*/
scheduler.init('scheduler_here',null,"week");
~~~

:::note
建议在 [onTemplatesReady](api/event/ontemplatesready.md) 事件的处理函数中重定义模板，以防止你的模板被默认模板覆盖。
:::

![templates.png](/img/templates.png)

可用模板的完整列表见 [Scheduler API: Templates](api/overview/templates_overview.md)。


[Styling events with templates](https://docs.dhtmlx.com/scheduler/samples/02_customization/06_templates.html)


## scheduler.xy {#schedulerxy}

[scheduler.xy](api/other/xy.md) 对象包含了控制调度器各视图元素的宽度、高度和偏移量的属性。

要设置这些选项，请按照下例赋值（如在页面上有[多个调度器](guides/multiple-per-page.md)，请将 *scheduler* 替换为你的 *dhtmlxScheduler 实例* 名称）。请记得在初始化调度器前应用尺寸设置。

~~~js
scheduler.xy.scale_height = 40; //设置 X 轴的高度 /*!*/
scheduler.init('scheduler_here',new Date(),"month");
~~~

:::note
scheduler.xy 中的所有属性均使用 'number' 数据类型。
:::


[Customizing the scheduler header](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/03_header_format.html)


## 扩展 {#extensions}

可以激活若干扩展，为调度器组件添加特殊功能。例如，启用 **cookie** 扩展后，调度器可将当前状态（如视图模式和日期）保存在 cookie 中。

~~~js
scheduler.plugins({
    cookie: true
});
~~~


[Work with cookies](https://docs.dhtmlx.com/scheduler/samples/03_extensions/08_cookies_plugin.html)


可用调度器扩展的列表请参见文章 [전체 확장 기능 목록](guides/extensions-list.md)。
