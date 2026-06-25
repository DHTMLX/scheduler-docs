---
title: "来自 DHTMLX Suite v5.x 的拖放"
sidebar_label: "来自 DHTMLX Suite v5.x 的拖放"
---

# 拖放操作（旧版）

:::warning
本文描述的是一个遗留的集成。如果您是从零开始，请参阅框架集成或 Vanilla JS 设置。
:::

库提供了 **outerdrag** 扩展，允许通过拖动外部 DHTMLX 组件或其他日程组件中的元素来创建新的事件。

## 从外部组件拖放

当用户将某个外部元素拖到日程安排器上时，日程安排器将打开一个 lightbox 用于创建新事件。

![external_dnd](/img/external_dnd.png)

[与 dhtmlxTree 的集成](https://docs.dhtmlx.com/scheduler/samples/10_integration/02_dhtmlxtree_outer_drag.html)

让我们在 <a src="http://docs.dhtmlx.com/doku.php?id='dhtmlxtree:toc'">dhtmlxTree 组件</a> 的场景中考虑外部拖放。

按照以下步骤，将日程安排器与 <a src="http://docs.dhtmlx.com/doku.php?id='dhtmlxtree:toc'">dhtmlxTree</a> 集成： 

1. 下载 <a href="https://dhtmlx.com/docs/download/">dhtmlxTree</a> 包并将其内容解压到 [YOUR APPLICATION ROOT] 文件夹
2. 在页面中包含必要的 <b>js</b> 和 <b>css</b> 文件：
~~~html
<script src="../codebase/dhtmlxscheduler.js" ...></script>
<link rel="stylesheet" href="../codebase/dhtmlxscheduler.css" ...>
...
~~~
3. 在页面上激活 [outerdrag](guides/extensions-list.md#outerdrag) 扩展：
~~~js
scheduler.plugins({
    outerdrag: true
});
~~~
4. 初始化 dhtmlxTree 组件（参见 <a href="https://docs.dhtmlx.com/tree__initialization_of_dhtmlxtree.html">此处</a> 的说明）：
~~~js
var tree = new dhtmlXTreeObject("treebox", "100%", "100%", 0);
tree.setImagePath("../common/dhtmlxTree/imgs/csh_yellowbooks/");
tree.loadXML("./data/tree.xml");
~~~
5. 在 dhtmlxTree 组件中启用拖放功能（参见 <a href="https://docs.dhtmlx.com/tree__drag_and_drop_handling.html">此处</a>）：
~~~js
tree.enableDragAndDrop(true);
~~~
6. 初始化并配置日程安排器：
~~~js
...
scheduler.init('scheduler_here', new Date(2019, 5, 30), "timeline");
~~~
7. 将处理程序附加到 [onExternalDragIn](api/event/onexternaldragin.md) 事件，以设定拖动元素的文本如何转换为事件的属性：
~~~js
scheduler.attachEvent("onExternalDragIn", function(id, source, event){
    var label = tree.getItemText(tree._dragged[0].id);
    scheduler.getEvent(id).text = label;
    return true;
});
~~~

[与 dhtmlxTree 的集成](https://docs.dhtmlx.com/scheduler/samples/10_integration/02_dhtmlxtree_outer_drag.html)

现在，您可以轻松创建包含树数据的新事件——只需拖动并放下所需的节点。