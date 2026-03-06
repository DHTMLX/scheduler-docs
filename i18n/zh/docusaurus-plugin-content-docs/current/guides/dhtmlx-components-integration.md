---
title: "拖放操作"
sidebar_label: "拖放操作"
---

# 拖放操作 

本库包含 **outerdrag** 扩展，使您可以通过从外部 DHTMLX 组件或其他调度器拖动元素来创建新事件。

## 从外部组件拖拽 {#draggingfromexternalcomponents}

当从外部来源拖动元素到调度器时，调度器会自动打开 lightbox 以创建新事件。


![external_dnd](/img/external_dnd.png)


[Integration with dhtmlxTree](https://docs.dhtmlx.com/scheduler/samples/10_integration/02_dhtmlxtree_outer_drag.html)


以下是 <a src="http://docs.dhtmlx.com/doku.php?id='dhtmlxtree:toc'">dhtmlxTree 组件</a>与外部拖放的工作方式。

要将调度器与 <a src="http://docs.dhtmlx.com/doku.php?id='dhtmlxtree:toc'">dhtmlxTree</a> 集成，请按照以下步骤操作:

1. 下载 dhtmlxTree 包，并将其内容解压到应用根目录。
2. 在页面中引入所需的 js 和 css 文件:
~~~html
<script src="../codebase/dhtmlxscheduler.js" ...></script>
<link rel="stylesheet" href="../codebase/dhtmlxscheduler.css" ...>
...
~~~
3. 启用 outerdrag 扩展:
~~~js
scheduler.plugins({
    outerdrag: true
});
~~~
4. 初始化 dhtmlxTree 组件（参见 此处）:
~~~js
var tree = new dhtmlXTreeObject("treebox", "100%", "100%", 0);
tree.setImagePath("../common/dhtmlxTree/imgs/csh_yellowbooks/");
tree.loadXML("./data/tree.xml");
~~~
5. 在 dhtmlxTree 组件中启用拖放（说明见 此处）:
~~~js
tree.enableDragAndDrop(true);
~~~
6. 初始化并配置调度器:
~~~js
...
scheduler.init('scheduler_here', new Date(2019, 5, 30), "timeline");
~~~
7. 为 [onExternalDragIn](api/event/onexternaldragin.md) 事件绑定处理函数，以定义如何将拖拽元素的文本赋值给事件:
~~~js
scheduler.attachEvent("onExternalDragIn", function(id, source, event){
    var label = tree.getItemText(tree._dragged[0].id);
    scheduler.getEvent(id).text = label;
    return true;
});
~~~


[Integration with dhtmlxTree](https://docs.dhtmlx.com/scheduler/samples/10_integration/02_dhtmlxtree_outer_drag.html)


完成上述设置后，您只需拖拽所需节点即可轻松通过树的数据创建新事件。

## 调度器间的拖放 {#draganddropbetweenschedulers}

:::note
此功能仅适用于 Commercial（自 2021 年 10 月 6 日起）、Enterprise 和 Ultimate 许可证版本。
:::

当在页面上显示[多个调度器](guides/multiple-per-page.md)时，可以启用它们之间的拖放，实现事件在不同调度器之间的无缝移动。

要启用调度器间的拖放支持，请引入 "**drag_between**" 扩展:

~~~js title="Enabling drag-and-drop support for several schedulers"
<script src="codebase/dhtmlxscheduler.js"></script>
<link rel="stylesheet" href="codebase/dhtmlxscheduler.css" type="text/css">

<script>
scheduler.plugins({
    drag_between: true
});

scheduler.init('scheduler_here',new Date(2019, 5, 30),"week");
scheduler.load("./data/units.xml");

scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2019, 5, 30),"week");
</script>
~~~

您可以在 [Scheduler PRO package](https://dhtmlx.com/docs/products/dhtmlxScheduler/) 中的 **"samples/20_multiple/06_drag_between_layout.html"** 示例中找到相关代码。

### 限制事件拖出/拖入调度器
如需禁止事件从某个调度器中拖出，请将 [drag_out](api/config/drag_out.md) 属性设置为 *false*:

~~~js
scheduler.config.drag_out = false; // 禁止事件从该调度器拖出 /*!*/
scheduler.init('scheduler_here',new Date(2019, 5,30),"week");
scheduler.load("./data/units.xml");

scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2019, 5, 30),"week");
~~~


如需禁止事件被拖入某个调度器，请将 [drag_in](api/config/drag_in.md) 属性设置为 *false*:

~~~js
scheduler.init('scheduler_here',new Date(2019, 5, 30),"week");
scheduler.load("./data/units.xml");

scheduler2.config.drag_in = false; // 禁止事件被拖入该调度器 /*!*/
scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2019, 5, 30),"week");
~~~

**"samples/20_multiple/06_drag_between_layout.html"** 示例可在 [Scheduler PRO package](https://dhtmlx.com/docs/products/dhtmlxScheduler/) 中获取。

### 拖放事件

- [onBeforeEventDragOut](api/event/onbeforeeventdragout.md) - 在事件被拖出调度器前触发
- [onEventDragOut](api/event/oneventdragout.md) - 当事件被拖出调度器时触发
- [onBeforeEventDragIn](api/event/onbeforeeventdragin.md) - 在拖拽事件进入调度器前触发
- [onEventDragIn](api/event/oneventdragin.md) - 当拖拽事件移动到调度器上方时触发
- [onEventDropOut](api/event/oneventdropout.md) - 当拖拽事件被放置到调度器区域外时触发
