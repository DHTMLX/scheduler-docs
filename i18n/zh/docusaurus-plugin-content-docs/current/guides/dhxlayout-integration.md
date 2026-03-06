---
title: "与 dhtmlxLayout 集成"
sidebar_label: "与 dhtmlxLayout 集成"
---

# 与 dhtmlxLayout 集成

使用 dhtmlxLayout 是在页面上组织[多个调度器](guides/multiple-per-page.md)的便捷方式。它不仅提供了美观的框架，还能帮助管理与页面其他元素的交互，并能顺畅适应页面尺寸的变化。

:::note
请注意，dhtmlxLayout 并不包含在 dhtmlxScheduler 库中。根据您使用的 dhtmlxSuite 版本，Layout 有两个不同的版本可供选择。
:::

## dhtmlxSuite v5+

在该版本中，dhtmlxLayout 可以作为独立产品或 dhtmlxSuite 库的一部分使用。要在项目中引入 dhtmlxLayout v5.X，您需要[购买许可证](https://dhtmlx.com/docs/products/dhtmlxSuite5/)。

**要将 dhtmlxScheduler 实例添加到 layout 单元格中**，请使用 [attachScheduler()](https://docs.dhtmlx.com/api__dhtmlxcell_attachscheduler.html) 方法。
  
**注意**，将调度器附加到单元格会自动初始化它。因此，请在插入到 layout 之前完成调度器的相关配置。

~~~js
function init() {
    var dhxLayout = new dhtmlXLayoutObject(document.body, "2U");

    sched1 = Scheduler.getSchedulerInstance();
    sched1.config.multi_day = true;
    dhxLayout.cells("a").attachScheduler(new Date(2019,05,30),"week",null,sched1);
    sched1.load("/data/units")
        
    sched2 = Scheduler.getSchedulerInstance();
    dhxLayout.cells("b").attachScheduler(new Date(2019,05,30),"month",null,sched2);
    sched2.load("/data/units")
}
~~~


[Integration with dhtmlxLayout (dhx_terrace skin, Suite v5.1)](https://docs.dhtmlx.com/scheduler/samples/10_integration/05_dhtmlxlayout_terrace.html)


## dhtmlxSuite v6+

从 dhtmlxSuite 6.0 开始，dhtmlxLayout 仅作为完整 Suite 库的一部分提供。若要以此方式使用，需获取 [Suite 6.X 库](https://dhtmlx.com/docs/products/dhtmlxSuite/#licensing)的许可证。

自 [版本 5.3](guides/what-s-new.md#53) 起，dhtmlxScheduler 实现了与 dhtmlxSuite v6+ 兼容的通用 View 接口，并且可以[直接附加到任意单元格](https://docs.dhtmlx.com/suite/layout/api/cell/layout_cell_attach_method/):

~~~js
// 创建并配置 scheduler 实例
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

// scheduler 附加后，将触发 onSchedulerReady 事件
scheduler.attachEvent("onSchedulerReady", function () {
    requestAnimationFrame(function(){
        // 此处可设置初始视图和日期，并加载数据
        scheduler.setCurrentView(new Date(2017,5,3), "week");
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

- 请注意，`dhtmlxSuite Layout` 以异步方式运行，因此在调用 `.attach` 后调度器不会立即可用。
- 需要监听 "onSchedulerReady" 事件，以便执行任何初始化后的操作。
- 目前，**在 dhtmlxSuite v6+ 中使用调度器时无法指定调度器的标记（markup）**。因此，导航面板的控件必须通过 [header](api/config/header.md) 进行配置。
