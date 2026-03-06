---
sidebar_label: "xy"
title: "xy config"
description: "定义各种调度器元素的尺寸"
---

# xy

### Description

@short: 定义各种调度器元素的尺寸

@signature: xy: SchedulerSizes

### Example

~~~jsx
scheduler.xy.scale_height = 25; // 设置X轴的高度
...
scheduler.init('scheduler_here', new Date(), "month");
~~~

### Details

**xy** 对象包含以下属性:

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <thead>
  <tr>
  <th>
  属性
  </th>
  <th>
  描述
  </th>
  <th>
  默认值
  </th>
  <th>
  适用视图
  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>[bar_height](#month)</td>
  <td>月视图中任务条的高度</td>
  <td>20</td>
  <td>month</td>
  </tr>
  <tr>
  <td>[editor_width](#week)</td>
  <td>事件文本输入框的宽度</td>
  <td>140</td>
  <td>day, week, units</td>
  </tr>
  <tr>
  <td>[lightbox_additional_height](#lightbox)</td>
  <td>为lightbox增加额外高度</td>
  <td>50</td>
  <td>all views</td>
  </tr>
  <tr>
  <td>[map_date_width](#map)</td>
  <td>地图视图中日期列的宽度</td>
  <td>188</td>
  <td>map</td>
  </tr>
  <tr>
  <td>[map_description_width](#map)</td>
  <td>地图视图中描述列的宽度</td>
  <td>400</td>
  <td>map</td>
  </tr>
  <tr>
  <td>[margin_left](#month)</td>
  <td>主调度器区域的左边距</td>
  <td>0</td>
  <td>all views</td>
  </tr>
  <tr>
  <td>[margin_top](#month)</td>
  <td>主调度器区域的上边距</td>
  <td>0</td>
  <td>all views</td>
  </tr>
  <tr>
  <td>[menu_width](#week)</td>
  <td>选择菜单的宽度</td>
  <td>25</td>
  <td>day, week, units</td>
  </tr>
  <tr>
  <td>[min_event_height](#week)</td>
  <td>事件框的最小高度</td>
  <td>40</td>
  <td>day, week, units</td>
  </tr>
  <tr>
  <td>[month_scale_height](#month)</td>
  <td>月视图中单元格内事件的垂直偏移</td>
  <td>20</td>
  <td>month</td>
  </tr>
  <tr>
  <td>[scale_height](#day)</td>
  <td>X轴的高度</td>
  <td>20</td>
  <td>all views</td>
  </tr>
  <tr>
  <td>[scale_width](#day)</td>
  <td>Y轴的宽度</td>
  <td>50</td>
  <td>day, week, timeline, units</td>
  </tr>
  <tr>
  <td>[scroll_width](#day)</td>
  <td>滚动条区域的宽度</td>
  <td>18</td>
  <td>all views</td>
  </tr>
  </tbody>
</table>

:::note

请注意，**xy** 下的所有属性的数据类型均为 'number'。
 
:::

## 示意图

### 月视图 {#month}

![month_xy_property](/img/month_xy_property.png)

### 周视图 {#week}

![week_xy_property](/img/week_xy_property.png)

### 日视图 {#day}

![day_xy_property](/img/day_xy_property.png)

### 地图视图 {#map}

![map_xy_property](/img/map_xy_property.png)

### Lightbox {#lightbox}

![lightbox_xy_property](/img/lightbox_xy_property.png)

### Change log
- **nav_height** 属性在v7.0版本中被移除；工具栏尺寸现在通过CSS控制。
