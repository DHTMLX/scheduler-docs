---
sidebar_label: xy
title: "xy config"
description: "specifies sizes of the scheduler's elements"
---

# xy

### Description

@short: Specifies sizes of the scheduler's elements

@signature: xy: SchedulerSizes

### Example

~~~jsx
scheduler.xy.scale_height = 25;//sets the height of the X-Axis
...
scheduler.init('scheduler_here',new Date(),"month");
~~~

### Details

The **xy** object has the following properties:

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <thead>
  <tr>
  <th>
  Property
  </th>
  <th>
  Description
  </th>
  <th>
  Default value
  </th>
  <th>
  Applicable views
  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>[bar_height](#month)</td>
  <td>the height of the task bars in the Month view</td>
  <td>20</td>
  <td>month</td>
  </tr>
  <tr>
  <td>[editor_width](#week)</td>
  <td>the width of the event's text input</td>
  <td>140</td>
  <td>day, week, units</td>
  </tr>
  <tr>
  <td>[lightbox_additional_height](#lightbox)</td>
  <td>increases the length of the lightbox</td>
  <td>50</td>
  <td>all views</td>
  </tr>
  <tr>
  <td>[map_date_width](#map)</td>
  <td>the width of the date column in the Map view</td>
  <td>188</td>
  <td>map</td>
  </tr>
  <tr>
  <td>[map_description_width](#map)</td>
  <td>the width of the description column in the Map view</td>
  <td>400</td>
  <td>map</td>
  </tr>
  <tr>
  <td>[margin_left](#month)</td>
  <td>the left margin of the main scheduler area</td>
  <td>0</td>
  <td>all views</td>
  </tr>
  <tr>
  <td>[margin_top](#month)</td>
  <td>the bottom margin of the main scheduler area</td>
  <td>0</td>
  <td>all views</td>
  </tr>
  <tr>
  <td>[menu_width](#week)</td>
  <td>the width of the selection menu</td>
  <td>25</td>
  <td>day, week, units</td>
  </tr>
  <tr>
  <td>[min_event_height](#week)</td>
  <td>the minimal height of the event's box</td>
  <td>40</td>
  <td>day, week, units</td>
  </tr>
  <tr>
  <td>[month_scale_height](#month)</td>
  <td>the top offset of an event in a cell in the month view</td>
  <td>20</td>
  <td>month</td>
  </tr>
  <tr>
  <td>[scale_height](#day)</td>
  <td>the height of the X-Axis</td>
  <td>20</td>
  <td>all views</td>
  </tr>
  <tr>
  <td>[scale_width](#day)</td>
  <td>the width of the Y-Axis</td>
  <td>50</td>
  <td>day, week, timeline, units</td>
  </tr>
  <tr>
  <td>[scroll_width](#day)</td>
  <td>the width of the scrollbar area</td>
  <td>18</td>
  <td>all views</td>
  </tr>
  </tbody>
</table>


:::note

Note, all the **xy'** properties have the data type 'number'.
 
:::

## Illustration images

### Month view {#month} 
![month_xy_property](/img/month_xy_property.png)


### Week view {#week} 
![week_xy_property](/img/week_xy_property.png)


### Day view {#day} 
![day_xy_property](/img/day_xy_property.png)


### Map view {#map} 
![map_xy_property](/img/map_xy_property.png)


### Lightbox {#lightbox} 
![lightbox_xy_property](/img/lightbox_xy_property.png)

### Change log
- **nav_height** property was removed in v7.0, the toolbar can be sized by css.
