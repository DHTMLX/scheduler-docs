---
title: "调度器标记"
sidebar_label: "调度器标记"
---

# 调度器标记

标准调度器的标记看起来像这样：

~~~html
<div id="scheduler_here" class="dhx_cal_container" style='width:100%; height:100%;'>
    <div class="dhx_cal_navline">
        <div class="dhx_cal_prev_button">&nbsp;</div>
        <div class="dhx_cal_next_button">&nbsp;</div>
        <div class="dhx_cal_today_button"></div>
        <div class="dhx_cal_date"></div>
        <div class="dhx_cal_tab" data-tab="day"></div>
        <div class="dhx_cal_tab" data-tab="week"></div>
        <div class="dhx_cal_tab" data-tab="month"></div>
       </div>
    <div class="dhx_cal_header"></div>
    <div class="dhx_cal_data"></div>       
</div>
~~~

![标记](/img/markup.png)

## Tabs positioning

从 v7.0 开始，**.dhx_cal_navline** 元素是一个弹性容器，选项卡的定位根据 **order** 样式。

### 版本 6.0 及更早版本

#### Default ('terrace') skin

初始时，默认的 ('terrace') 皮肤忽略用于设置选项卡位置的 CSS 属性（例如 `style="right:204px;"`），并使用其特定逻辑定位选项卡：默认视图作为左侧的分段按钮呈现，但额外的视图作为右侧的独立按钮排布。

要手动设置位置（例如在标记中），将 [fix_tab_position](api/config/fix_tab_position.md) 参数设为 *false* 以禁用默认行为，并用 CSS 属性设置坐标：

~~~js
scheduler.config.fix_tab_position = false;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

注意，您可以使用以下 CSS 类来创建一个分段按钮：

- **dhx_cal_tab_last** - 使右边框圆角
- **dhx_cal_tab_first** - 使左边框圆角
- **dhx_cal_tab_standalone** - 使两个边框都圆角


例如，要在默认皮肤中手动设置 'day'-'week'-'month' 的分段按钮，可以按以下标记：

~~~html
<div class="dhx_cal_tab dhx_cal_tab_first" data-tab="day" style="left:14px;"></div>
<div class="dhx_cal_tab" data-tab="week"  style="left: 75px;"></div>
<div class="dhx_cal_tab dhx_cal_tab_last" data-tab="month" style="left:136px"></div>
~~~


## Adding/deleting views' tabs

### Adding a tab

要向头部添加一个新选项卡，在 **"dhx_cal_navline"** 元素中作为子节点添加一个带有 **"dhx_cal_tab"** 类的 div：

~~~html
<div class="dhx_cal_navline">
    ...
    <div class="dhx_cal_tab" data-tab="day"></div>
    <div class="dhx_cal_tab" data-tab="week"></div>
    <div class="dhx_cal_tab" data-tab="timeline"></div>
    <div class="dhx_cal_tab" data-tab="month"></div>
</div>
~~~

将在选项卡点击时打开的视图由 **data-tab** 属性定义，并指定为 **(viewName)**。

:::note
注意，一个选项卡可以应用多种 CSS 类，但 **"dhx_cal_tab"** 类必须放在最前面。
:::

### Deleting a tab

要从头部移除一个选项卡，请从标记中移除相关的 div：

~~~js title="从头部移除 'month' 选项卡"
<div class="dhx_cal_navline">
    ...
    <div class="dhx_cal_tab" data-tab="day"></div>
    <div class="dhx_cal_tab" data-tab="week"></div>
</div>
~~~

:::note
即使选项卡被移除，相关视图仍然可以通过 [setCurrentView](api/method/setcurrentview.md) 和 [updateView](api/method/updateview.md) 方法以编程方式访问。
:::

## Hiding the navigation buttons

要在调度器头部隐藏导航按钮，请像下面一样为相关的 div 设置 *'display:none'* 样式：


~~~js title="隐藏头部的导航按钮"
<style>
    .dhx_cal_prev_button, .dhx_cal_next_button{
        display:none;
    }
</style>

<div id="scheduler_here" class="dhx_cal_container" style='width:100%; height:100%;'>
    <div class="dhx_cal_navline">
        <div class="dhx_cal_prev_button">&nbsp;</div>
        <div class="dhx_cal_next_button">&nbsp;</div>
        <div class="dhx_cal_today_button"></div>
        ...
       </div>
    <div class="dhx_cal_header"></div>
    <div class="dhx_cal_data"></div>       
</div>
~~~

## Hiding the header of scheduler

要隐藏整个调度器的头部，请设置 *'display:none'*： 

~~~html
<style>
    .dhx_cal_navline{
        display:none;
    }
</style>

~~~