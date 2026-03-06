---
title: "Drag-and-Drop from DHTMLX Suite v5.x"
sidebar_label: "Drag-and-Drop from DHTMLX Suite v5.x"
---

# Drag-and-Drop Operations (legacy)

:::warning
This article describes a legacy integration. If you're starting fresh, see the framework integrations or vanilla JS setup.
:::

The library provides the **outerdrag** extension that allows creating new events by dragging elements from external 
DHTMLX components or other schedulers. 

## Dragging from external components

Once the user drags some external element to the scheduler, the scheduler opens the lightbox for creating a new event.


![external_dnd](/img/external_dnd.png)


[Integration with dhtmlxTree](https://docs.dhtmlx.com/scheduler/samples/10_integration/02_dhtmlxtree_outer_drag.html)


Let's consider external drag-and-drop in the context of the <a src="http://docs.dhtmlx.com/doku.php?id='dhtmlxtree:toc'">dhtmlxTree component</a>.


Follow these steps, to integrate the scheduler with <a src="http://docs.dhtmlx.com/doku.php?id='dhtmlxtree:toc'">dhtmlxTree</a>: 

1. <a href="https://dhtmlx.com/docs/download/">Download</a> the dhtmlxTree package and unzip its content to [YOUR APPLICATION ROOT] folder
2. Include the necessary <b>js</b> and <b>css</b> files on the page:
~~~html
<script src="../codebase/dhtmlxscheduler.js" ...></script>
<link rel="stylesheet" href="../codebase/dhtmlxscheduler.css" ...>
...
~~~
3. Activate the [outerdrag](guides/extensions-list.md#outerdrag) extension on the page:
~~~js
scheduler.plugins({
    outerdrag: true
});
~~~
4. Initialize dhtmlxTree component (see instructions <a href="https://docs.dhtmlx.com/tree__initialization_of_dhtmlxtree.html">here</a>) :
~~~js
var tree = new dhtmlXTreeObject("treebox", "100%", "100%", 0);
tree.setImagePath("../common/dhtmlxTree/imgs/csh_yellowbooks/");
tree.loadXML("./data/tree.xml");
~~~
5. Enable drag-and-drop in the dhtmlxTree component (see instructions <a href="https://docs.dhtmlx.com/tree__drag_and_drop_handling.html">here</a>) :
~~~js
tree.enableDragAndDrop(true);
~~~
6. Initialize and configure the scheduler:
~~~js
...
scheduler.init('scheduler_here', new Date(2019, 5, 30), "timeline");
~~~
7. Attach a handler to the [onExternalDragIn](api/event/onexternaldragin.md) event to set how the text of the dragged element will be converted to a property of the event:
~~~js
scheduler.attachEvent("onExternalDragIn", function(id, source, event){
    var label = tree.getItemText(tree._dragged[0].id);
    scheduler.getEvent(id).text = label;
    return true;
});

~~~


[Integration with dhtmlxTree](https://docs.dhtmlx.com/scheduler/samples/10_integration/02_dhtmlxtree_outer_drag.html)


Now, you can easy create new events, containing tree data - just drag and drop the desired node.

