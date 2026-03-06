---
sidebar_label: "xy"
title: "xy config"
description: "определяет размеры различных элементов scheduler"
---

# xy

### Description

@short: Определяет размеры различных элементов scheduler

@signature: xy: SchedulerSizes

### Example

~~~jsx
scheduler.xy.scale_height = 25; // задаёт высоту оси X
...
scheduler.init('scheduler_here', new Date(), "month");
~~~

### Details

Объект **xy** включает в себя следующие свойства:

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <thead>
  <tr>
  <th>
  Свойство
  </th>
  <th>
  Описание
  </th>
  <th>
  Значение по умолчанию
  </th>
  <th>
  Применимые виды
  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>[bar_height](#month)</td>
  <td>высота task bar в Month view</td>
  <td>20</td>
  <td>month</td>
  </tr>
  <tr>
  <td>[editor_width](#week)</td>
  <td>ширина текстового поля ввода события</td>
  <td>140</td>
  <td>day, week, units</td>
  </tr>
  <tr>
  <td>[lightbox_additional_height](#lightbox)</td>
  <td>добавляет дополнительную высоту lightbox</td>
  <td>50</td>
  <td>все виды</td>
  </tr>
  <tr>
  <td>[map_date_width](#map)</td>
  <td>ширина колонки с датой в Map view</td>
  <td>188</td>
  <td>map</td>
  </tr>
  <tr>
  <td>[map_description_width](#map)</td>
  <td>ширина колонки с описанием в Map view</td>
  <td>400</td>
  <td>map</td>
  </tr>
  <tr>
  <td>[margin_left](#month)</td>
  <td>отступ слева основной области scheduler</td>
  <td>0</td>
  <td>все виды</td>
  </tr>
  <tr>
  <td>[margin_top](#month)</td>
  <td>отступ сверху основной области scheduler</td>
  <td>0</td>
  <td>все виды</td>
  </tr>
  <tr>
  <td>[menu_width](#week)</td>
  <td>ширина меню выбора</td>
  <td>25</td>
  <td>day, week, units</td>
  </tr>
  <tr>
  <td>[min_event_height](#week)</td>
  <td>минимальная высота блока события</td>
  <td>40</td>
  <td>day, week, units</td>
  </tr>
  <tr>
  <td>[month_scale_height](#month)</td>
  <td>вертикальный сдвиг для событий внутри ячейки в Month view</td>
  <td>20</td>
  <td>month</td>
  </tr>
  <tr>
  <td>[scale_height](#day)</td>
  <td>высота оси X</td>
  <td>20</td>
  <td>все виды</td>
  </tr>
  <tr>
  <td>[scale_width](#day)</td>
  <td>ширина оси Y</td>
  <td>50</td>
  <td>day, week, timeline, units</td>
  </tr>
  <tr>
  <td>[scroll_width](#day)</td>
  <td>ширина области скроллбара</td>
  <td>18</td>
  <td>все виды</td>
  </tr>
  </tbody>
</table>

:::note

Учтите, что все свойства внутри **xy** имеют тип данных 'number'.
 
:::

## Иллюстративные изображения

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
- Свойство **nav_height** было удалено в версии 7.0; размер toolbar теперь регулируется через CSS.
