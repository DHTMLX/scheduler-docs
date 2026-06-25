---
title: "与 dhtmlxLayout 的集成"
sidebar_label: "与 dhtmlxLayout 的集成"
---

# 与 dhtmlxLayout 的集成

:::warning
所描述的功能已被弃用，且不再维护。
:::

在页面上放置 [多个调度器](guides/multiple-per-page.md) 的一个好方法是使用 dhtmlxLayout。它不仅提供了美观的框架，还确保与页面上其他元素的正确交互，并根据页面大小的变化进行相应调整。

:::note
请注意，dhtmlxLayout 不是 dhtmlxScheduler 库的一部分。根据 dhtmlxSuite 库的版本，Layout 有两种版本可供选择。
:::

## dhtmlxSuite v5+

在这个版本中 dhtmlxLayout 可以作为独立产品使用，也可以作为 dhtmlxSuite 库的一部分使用。要在您的应用中使用 dhtmlxLayout v5.X，您应 [购买许可证](https://dhtmlx.com/docs/products/dhtmlxSuite/)。

**将 dhtmlxScheduler 实例附加到布局单元格中**，请使用 [attachScheduler()] 方法。

**注**，将调度器附加到单元格会自动初始化它。因此，请在将调度器放入布局之前进行配置。

~~~js
function init() {
    var dhxLayout = new dhtmlXLayoutObject(document.body, "2U");

    sched1 = Scheduler.getSchedulerInstance();
    sched1.config.multi_day = true;
    dhxLayout.cells("a").attachScheduler(new Date(2027,05,30),"week",null,sched1);
    sched1.load("/data/units")
        
    sched2 = Scheduler.getSchedulerInstance();
    dhxLayout.cells("b").attachScheduler(new Date(2027,05,30),"month",null,sched2);
    sched2.load("/data/units")
}
~~~

[Integration with dhtmlxLayout (dhx_terrace skin, Suite v5.1)](https://docs.dhtmlx.com/scheduler/samples/10_integration/05_dhtmlxlayout_terrace.html)

## dhtmlxSuite v6+

从 dhtmlxSuite 6.0 开始，dhtmlxLayout 不能再单独从整个 Suite 库中获取。
如果您打算使用这种方式，您应购买 [Suite 6.X 库](https://dhtmlx.com/docs/products/dhtmlxSuite/#licensing) 的许可证。

dhtmlxScheduler 版本 [5.3](whats-new.md#53) 及更高版本实现了在 dhtmlxSuite v6+ 中使用的通用 View 接口，并且可以 [直接附加到任何单元格](https://docs.dhtmlx.com/suite/layout/api/cell/layout_cell_attach_method/)：

~~~js
// create and configure the scheduler instance
scheduler.config.header = [
   "day",
   "week",
   "month",
   "date",
   "prev",
   "today",
   "next"
];
scheduler.config.multi_day = true;

// after the scheduler is attached, onSchedulerReady will be fired
scheduler.attachEvent("onSchedulerReady", function () {
    requestAnimationFrame(function(){
        // here you can set the initial view and date and load the data
        scheduler.setCurrentView(new Date(2027,5,3), "week");
        scheduler.load("../common/events.json");
    });
    
});

const layout = new dhx.Layout("layout", {
    rows: [{
        id: "scheduler-cell",
        header: "Appointment Scheduler",
        html:"<div></div>"
    }]
});
layout.cell("scheduler-cell").attach(scheduler);
~~~


### 注意事项

- 注意，`dhtmlxSuite Layout` 是异步的，调度器不会在 `.attach` 调用之后立即初始化。
- 你需要监听 onSchedulerReady 事件以进行任何后初始化设置。
- 目前在与 dhtmlxSuite v6+ 一起使用时，无法为调度器指定标记（markup），这意味着你需要使用 [header](api/config/header.md) 配置来指定导航面板的控件。