---
title: "自定义事件框"
sidebar_label: "自定义事件框"
---

# 自定义事件框

dhtmlxScheduler 提供了为事件定义自定义显示的功能。

:::note
仅适用于 [Day View](views/day.md)、[Week View](views/week.md) 和 [Units View](views/units.md) 三种视图。
:::

## 技术要点

通过 [renderEvent](api/method/renderevent.md) 方法实现事件的自定义显示：

~~~js
scheduler.renderEvent = function(container, ev) {
    // your customizing code
}
~~~

- **_container_** - 事件的容器
- **_ev_** - 事件对象

[Custom event box](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)

## 重要提示

- 返回 _true_ 表示应用自定义逻辑，返回 _false_ 表示应用默认逻辑。
- 某些 CSS 类具有特殊用途（它们必须在元素的 className 中排在最前面）：
  - **_dhx_event_move_** - 使用此样式的元素可以被拖拽（通常是事件头部）。
  - **_dhx_event_resize_** - 拖动具有此样式的元素将改变事件的持续时间。

~~~js
const html = "<div class='dhx_event_move my_event_move' "
~~~

## 示例

下面是一个自定义外观的示例：

![custom_event_box](/img/custom_event_box.png)

[为事件框指定自定义外观](Specifying a custom look for the event's box)
~~~js
scheduler.templates.event_class = function(start, end, event) {
    return "my_event";
};

scheduler.renderEvent = function(container, ev) {
    const container_width = container.style.width; // e.g. "105px"

    // move section
    let html = "<div class='dhx_event_move my_event_move' style='width: " + 
    container_width + "'></div>";

    // a container for the event's content
    html+= "<div class='my_event_body'>";
    html += "<span class='event_date'>";
    //two options here:show only start date for short events or start+end for long ones
    if ((ev.end_date - ev.start_date)/60000>40){//if an event is longer than 40 minutes
        html += scheduler.templates.event_header(ev.start_date, ev.end_date, ev);
        html += "</span>

";
    } else {
        html += scheduler.templates.event_date(ev.start_date) + "</span>";
    }
    // displaying the event's text
    html += "<span>" + scheduler.templates.event_text(ev.start_date,ev.end_date,ev)+
    "</span>" + "</div>";

    // the resize section
    html += "<div class='dhx_event_resize my_event_resize' style='width: " +
    container_width + "'></div>";

    container.innerHTML = html;
    return true; //required, true - to display a custom form, false - the default form
};
~~~

和相关的 CSS 如下所示：

~~~html
<style type="text/css" >
    /* the background color for the whole container and its border*/
    .my_event {
        background: #add8e6;
        color: black;
        border: 1px solid #778899;
        overflow: hidden;
        display: block;
    }

    .dhx_cal_event_clear.my_event {
        height: 22px;
    }

    /* styles for the event content */
    .dhx_cal_event.my_event .my_event_body {
        padding-top: 3px;
        padding-left: 5px;
    }
    /* event's date information */
    .my_event .event_date {
        font-weight: bold;
        padding-right: 5px;
    }
    /* event's resizing section */
    .my_event_resize {
        height: 3px;
        position: absolute;
        bottom: -1px;
    }
    /* event's move section */
    .my_event_move {
        position: absolute;
        top: 0;
        height: 10px;
        cursor: pointer;
    }
</style>
~~~

你也可以使用 CSS 变量来替代固定颜色值，如下所示：

~~~html
<style>
.my_event {
    --dhx-scheduler-event-background: #add8e6;
    --dhx-scheduler-event-color: black;
    --dhx-scheduler-event-border: 1px solid #778899;

    overflow: hidden;
    display: block;
}
</style>
~~~

[自定义事件框](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)