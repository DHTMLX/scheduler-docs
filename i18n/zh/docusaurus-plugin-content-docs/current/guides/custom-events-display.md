---
title: "自定义事件框"
sidebar_label: "自定义事件框"
---

# 自定义事件框

dhtmlxScheduler 允许您自定义事件的显示方式。

:::note
此功能仅适用于 [Day View](views/day.md)、[주간 보기](views/week.md) 和 [Units View](views/units.md)。
:::

## 技术说明

您可以通过 [renderEvent](api/method/renderevent.md) 方法自定义事件:

~~~js
scheduler.renderEvent = function(container, ev) {
    // 你的自定义代码
}
~~~

- **_container_** - 事件的容器元素
- **_ev_** - 事件对象本身


[Custom event box](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)


## 重要提示

- 返回 _true_ 将应用您的自定义渲染，返回 _false_ 则会使用默认渲染方式。
- 某些 CSS 类具有特定作用，并且应当作为元素 className 的首个类名:
  - **_dhx_event_move_** - 使元素可拖动（通常为事件头部）。
  - **_dhx_event_resize_** - 允许通过拖动元素调整事件时长。

~~~js
var html = "<div class='dhx_event_move my_event_move' "
~~~

## 示例

以下是一个自定义事件外观的示例:

![custom_event_box](/img/custom_event_box.png)

~~~js title="为事件框定义自定义外观"
scheduler.templates.event_class = function(start, end, event) {
    return "my_event";
};

scheduler.renderEvent = function(container, ev) {
    var container_width = container.style.width; // 例如 "105px"

    // 移动部分
    var html = "<div class='dhx_event_move my_event_move' style='width: " + 
    container_width + "'></div>";

    // 事件内容的容器
    html += "<div class='my_event_body'>";
    html += "<span class='event_date'>";
    // 这里有两种选择：对于短事件仅显示开始时间，对于长事件显示开始和结束时间
    if ((ev.end_date - ev.start_date)/60000 > 40) { // 如果事件持续超过40分钟
        html += scheduler.templates.event_header(ev.start_date, ev.end_date, ev);
        html += "</span>

";
    } else {
        html += scheduler.templates.event_date(ev.start_date) + "</span>";
    }
    // 显示事件文本
    html += "<span>" + scheduler.templates.event_text(ev.start_date, ev.end_date, ev) +
    "</span></div>";

    // 调整大小部分
    html += "<div class='dhx_event_resize my_event_resize' style='width: " +
    container_width + "'></div>";

    container.innerHTML = html;
    return true; // 必须：true 使用自定义渲染，false 为默认渲染
};
~~~

相关的 CSS 如下所示:

~~~html
<style type="text/css" >
    /* 整个容器的背景和边框 */
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

    /* 事件内容样式 */
    .dhx_cal_event.my_event .my_event_body {
        padding-top: 3px;
        padding-left: 5px;
    }
    /* 事件时间样式 */
    .my_event .event_date {
        font-weight: bold;
        padding-right: 5px;
    }
    /* 调整大小手柄 */
    .my_event_resize {
        height: 3px;
        position: absolute;
        bottom: -1px;
    }
    /* 移动手柄 */
    .my_event_move {
        position: absolute;
        top: 0;
        height: 10px;
        cursor: pointer;
    }
</style>
~~~

另外，您也可以使用 CSS 变量替代固定颜色，例如:

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


[Custom event box](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)
