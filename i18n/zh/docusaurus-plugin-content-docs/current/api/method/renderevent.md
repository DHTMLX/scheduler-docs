---
sidebar_label: "renderEvent"
title: "renderEvent method"
description: "创建自定义事件框的HTML内容"
---

# renderEvent

### Description

@short: 创建自定义事件框的HTML内容

@signature: renderEvent: (container: HTMLElement, event: any) =\> boolean

### Parameters

- `container` - (required) *HTMLElement* - 事件的容器元素
- `event` - (required) *object* - 事件数据对象

### Returns
- ` display` - (boolean) - <ul><li><b>true</b> - scheduler使用自定义表单</li><li><b>false</b> - scheduler回退到默认表单</li></ul>

### Example

~~~jsx
scheduler.renderEvent = function(container, ev) {
    const container_width = container.style.width;
    let html = "<div class='dhx_event_move my_event_move' style='width:" +
    + container_width + "'></div>";
    ...
    container.innerHTML = html;
    return true; 
}
~~~

### Related samples
- [Custom event box](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)

### Details

请注意，此方法仅适用于具有垂直刻度的视图，如Day视图或Week视图。

### Related Guides
- [커스텀 이벤트 박스](guides/custom-events-display.md)
