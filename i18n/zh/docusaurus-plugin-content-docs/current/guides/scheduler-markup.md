---
title: "调度器标记（Scheduler Markup）"
sidebar_label: "调度器标记（Scheduler Markup）"
---

# 调度器标记（Scheduler Markup）

标准的调度器标记如下所示:

~~~html
<div id="scheduler_here" class="dhx_cal_container">
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

![markup](/img/markup.png)

## 选项卡的布局方式 {#tabs-positioning}

从 7.0 版本开始，**.dhx_cal_navline** 元素采用 flex 布局，选项卡根据 **order** CSS 属性排列。

### 6.0 及更早版本

#### 默认（'terrace'）皮肤

在默认（'terrace'）皮肤下，诸如 等 CSS 属性在定位选项卡时会被忽略。选项卡的位置由调度器自身的规则决定:默认视图作为分段按钮组显示在左侧，额外的视图作为独立按钮显示在右侧。

如果需要手动控制选项卡的位置（例如直接在标记中设置），可以将 [fix_tab_position](api/config/fix_tab_position.md) 参数设置为 *false*，以关闭默认的定位行为，然后通过 CSS 指定选项卡的坐标:

~~~js
scheduler.config.fix_tab_position = false;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

你可以应用以下 CSS 类来实现分段按钮的效果:

- **dhx_cal_tab_last** - 圆角右边框
- **dhx_cal_tab_first** - 圆角左边框
- **dhx_cal_tab_standalone** - 两侧边框均为圆角

例如，若要在默认皮肤下手动设置 'day'-'week'-'month' 的分段按钮，可以使用如下标记:

~~~html
<div class="dhx_cal_tab dhx_cal_tab_first" data-tab="day"></div>
<div class="dhx_cal_tab" data-tab="week"></div>
<div class="dhx_cal_tab dhx_cal_tab_last" data-tab="month"></div>
~~~


## 添加/删除视图选项卡 {#addingdeletingviewstabs}

### 添加选项卡

要在头部添加新的选项卡，只需在 **"dhx_cal_navline"** 元素内部添加一个带有 **"dhx_cal_tab"** 类的 div:

~~~html
<div class="dhx_cal_navline">
    ...
    <div class="dhx_cal_tab" data-tab="day"></div>
    <div class="dhx_cal_tab" data-tab="week"></div>
    <div class="dhx_cal_tab" data-tab="timeline"></div>
    <div class="dhx_cal_tab" data-tab="month"></div>
</div>
~~~

**data-tab** 属性指定点击该选项卡时打开的视图，格式为 **(viewName)**。

:::note
注意，可以为选项卡添加多个 CSS 类，但 **"dhx_cal_tab"** 类必须始终放在第一个。
:::

### 删除选项卡

要从头部移除某个选项卡，只需从标记中删除相应的 div:

~~~js title="从头部移除 'month' 选项卡"
~~~html
<div class="dhx_cal_navline">
  ...
  <div class="dhx_cal_tab" data-tab="day"></div>
  <div class="dhx_cal_tab" data-tab="week"></div>
</div>
~~~

:::note
仅从标记中移除选项卡并不会禁用该视图；仍可通过 [setCurrentView](api/method/setcurrentview.md) 和 [updateView](api/method/updateview.md) 方法以编程方式访问该视图。
:::


## 隐藏导航按钮 {#hidingthenavigationbuttons}

如需隐藏调度器头部的导航按钮，可对相应的 div 应用 *'display:none'*，如下所示：

~~~js title="隐藏头部的导航按钮"
<style>
  .dhx_cal_prev_button, .dhx_cal_next_button{
  display:none;
  }
</style>

<div id="scheduler_here" class="dhx_cal_container">
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


## 隐藏调度器头部 {#hidingtheheaderofscheduler}

如需隐藏整个调度器头部，只需为 navline 设置 *'display:none'*：

~~~html
<style>
  .dhx_cal_navline{
  display:none;
  }
</style>

~~~
