---
title: "调整刻度和事件框的尺寸（v6.0）"
sidebar_label: "调整刻度和事件框的尺寸（v6.0）"
---

# 调整刻度和事件框的尺寸（v6.0）

*本文适用于 dhtmlxScheduler 6.0 及更早版本。如需 7.0 及以上版本的详细信息，请参阅[此处](guides/sizing.md)。*

本文主要介绍通过以下四种常见场景来调整刻度单位和事件框的尺寸:

**问题1:** [在调度器中，短于1小时的事件显示和1小时事件一样大小。目标是让短事件能够正确适配刻度。](guides/sizing-legacy.md#how-to-make-short-events-fit-the-scale)

**问题2:** [同一小时内发生在不同时间的短事件会重叠。目标是避免此类重叠。](guides/sizing-legacy.md#preventing-short-events-from-overlapping)

**问题3:** [更改刻度单位高度后，条纹背景需要相应调整。](guides/sizing-legacy.md#how-to-change-the-background-according-to-the-set-scale)

**问题4:** [默认刻度间隔为1小时，但有时需要更改为30分钟等其他时间间隔。](guides/sizing-legacy.md#how-to-change-the-scale-spacing)

## 如何让短事件适配刻度 {#how-to-make-short-events-fit-the-scale}

首先来看事件框的默认行为:

+ 每个刻度单位（小时）的默认高度为44px。
+ 事件框的最小高度为44px。
+ 小于1小时的事件显示高度为44px，因此15分钟的事件看起来与1小时事件一样。
+ 超过1小时的事件高度按比例缩放（例如，90分钟的事件高度为63px，假设1小时为44px）。

如果需要让30分钟的事件能够正确适配刻度，可以通过以下两种方式实现:

- 增加刻度单位的高度。
- 自定义事件框的显示方式。

![30-minute_custom_event.png](/img/30-minute_custom_event.png)

### 方案1:更改刻度单位高度

可以通过配置项 `scheduler.config.hour_size_px` 调整刻度单位的高度。

例如，将单位高度加倍，可以这样设置:

~~~js
scheduler.config.hour_size_px = 88;

scheduler.init(...);
~~~

这样设置后，刻度单位高度变为88px，30分钟的事件高度就是44px，能够与刻度相匹配。


[Changing the Y-Axis step](https://docs.dhtmlx.com/scheduler/samples/02_customization/09_timestep.html)


### 方案2:自定义事件框

如需自定义事件框的显示方式，可以使用 `scheduler.renderEvent` 方法，允许你为事件提供自定义模板。

~~~js
scheduler.renderEvent = function(container, ev) {
    // your customization code here
}
~~~

更多细节请参阅 [커스텀 이벤트 박스](guides/custom-events-display.md) 章节。


[Custom event box](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)


## 避免短事件重叠 {#preventing-short-events-from-overlapping}

为了让短事件分开展示且不重叠，可以启用 `scheduler.config.separate_short_events` 选项:

~~~js
scheduler.config.separate_short_events = true;
~~~

![overlapping.png](/img/overlapping.png)

## 如何根据设置的刻度调整背景 {#how-to-change-the-background-according-to-the-set-scale}

调度器的背景由图片控制。要更新背景，可以覆盖 CSS 类 **.dhx_scale_holder**，例如:

~~~html
<style>
.dhx_scale_holder {
     background-image: url("imgs/myNewImage.png");
}
</style>
~~~

然后初始化调度器:

~~~js
scheduler.init(...);
~~~

![changing_background.png](/img/changing_background.png)

## 如何更改刻度间隔 {#how-to-change-the-scale-spacing}

如需调整默认的刻度间隔，可以重写 `scheduler.templates.hour_scale` 模板。例如，将间隔改为30分钟，可以这样修改模板:

~~~js
var format = scheduler.date.date_to_str("%H:%i");
var step = 30;
        
scheduler.templates.hour_scale = function(date){
    var html="";
    for (var i="0;" i<60/step; i++){
        html+="<div>"+format(date)+"</div>";
        date = scheduler.date.add(date,step,"minute");
    }
    return html;
}

~~~

![scale_spacing.png](/img/scale_spacing.png)

**相关示例:**


[Custom Y-Axis](https://docs.dhtmlx.com/scheduler/samples/02_customization/21_custom_hour_scale.html)
