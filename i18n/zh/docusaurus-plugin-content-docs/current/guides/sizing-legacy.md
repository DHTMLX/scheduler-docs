--- 
title: "刻度与事件框尺寸（v6.0）" 
sidebar_label: "刻度与事件框尺寸（v6.0）" 
---

# 刻度和事件框尺寸（v6.0）

*本文适用于 dhtmlxScheduler 6.0 或更早版本。如果你使用的是 dhtmlxScheduler 7.0+，请参阅此处的详细信息 [here](guides/sizing.md)。*

在本文中，我们将通过解决 4 个问题的示例来探讨刻度和事件框的尺寸调整：

**Problem 1:** [事件持续时间少于 1 小时在日程中看起来与 1 小时的事件相同。我希望较短的事件能适应刻度。](guides/sizing-legacy.md#how-to-make-short-events-fit-the-scale)
  
**Problem 2:** [持续时间少于 1 小时且在同一小时内不同时间点发生的事件会重叠。我希望这类短事件不重叠。](guides/sizing-legacy.md#preventing-short-events-from-overlapping)
  
**Problem 3:** [我改变了刻度单元的高度，并希望相应地改变带状背景。](guides/sizing-legacy.md#how-to-change-the-background-according-to-the-set-scale)
  
**Problem 4:** [默认的刻度间距是 1 小时。我想改变它，例如设为 30 分钟。](guides/sizing-legacy.md#how-to-change-the-scale-spacing)

## 如何让短事件适应刻度

首先，让我们了解事件框的默认行为：

- 默认刻度单元高度为 44px（或小时高度）
- 事件框的最小高度为 44px
- 持续时间少于 1 小时的事件高度为 44px。因此，15 分钟和 1 小时的事件在日程中看起来相同
- 持续时间超过 1 小时的事件高度按侧边刻度来确定（假设 1 小时等于 44px——一个 90 分钟的事件高度将为 63px）

假设你希望 30 分钟的事件也能适应刻度，那么你有两种解决方案：

- 增大刻度单元的高度
- 自定义事件框的显示

![30-minute_custom_event.png](/img/30-minute_custom_event.png)

### 方案 1. 修改刻度单元的高度

要更改刻度单元的高度，应该使用 [hour_size_px](api/config/hour_size_px.md) 配置选项。
  
例如，要把单位高度增加一倍，可以按如下调用：

~~~js
scheduler.config.hour_size_px = 88;

scheduler.init(...);
~~~

现在刻度单元的高度为 88 px，30 分钟的事件占用 44px，就会正好匹配 30 分钟的高度。

[Changing the Y-Axis step](https://docs.dhtmlx.com/scheduler/samples/02_customization/09_timestep.html)


### 方案 2. 自定义事件框

要自定义事件框的显示，应该使用 [renderEvent](api/method/renderevent.md) 方法，它允许你为事件设置自己的模板。

~~~js
scheduler.renderEvent = function(container, ev) {
    //your customizing code
}
~~~

请在相关章节 - [自定义事件框](guides/custom-events-display.md) 中查看详细信息。

[Custom event box](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)


## 防止短事件相互重叠

为了让短事件单独显示，避免它们重叠，你应该将 [separate_short_events](api/config/separate_short_events.md) 选项设为 true：

~~~js
scheduler.config.separate_short_events = true;
~~~

![overlapping.png](/img/overlapping.png)

## 如何根据设定的刻度改变背景

日程表背景是通过一张图片来设置的。要更改背景图片，应重新定义相关的 CSS 类，即 **.dhx_scale_holder**：

~~~html
<style>
.dhx_scale_holder {
     background-image: url("imgs/myNewImage.png");
}
</style>
~~~

~~~js
scheduler.init(...);
~~~

![changing_background.png](/img/changing_background.png)

## 如何改变刻度间距

要改变默认的刻度间距，需要重写 [hour_scale](api/template/hour_scale.md) 模板。要使刻度间距等于 30 分钟，可以按如下方式重写模板：

~~~js
const format = scheduler.date.date_to_str("%H:%i");
const step = 30;
        
scheduler.templates.hour_scale = function(date){
    let html="";
    for (let i = 0; i < 60/step; i++){
        html += "<div style='height:22px;line-height:22px;'>" + format(date) + "</div>";
        date = scheduler.date.add(date,step,"minute");
    }
    return html;
}
~~~

![scale_spacing.png](/img/scale_spacing.png)

**相关示例：** [自定义 Y 轴](https://docs.dhtmlx.com/scheduler/samples/02_customization/21_custom_hour_scale.html)