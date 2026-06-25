---
sidebar_label: onMouseDown
title: "onMouseDown событие"
description: "Срабатывает, когда пользователь кликает по элементу планировщика, у которого нет предопределённого обработчика 'onlick'"
---

# onMouseDown

### Description

@short: Срабатывает, когда пользователь кликает по элементу планировщика, у которого нет предопределённого обработчика 'onlick'

@signature: onMouseDown: (className: string) =\> void

### Parameters

- `className` - (required) *string* - название CSS-класса, определённого для кликнутого элемента

### Example

~~~jsx
scheduler.attachEvent("onMouseDown", function(className){
    //any custom logic here
});
~~~

### Details

Scheduler's elements that have the predefined 'onclick' handlers are listed in the table below.

<br>

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <caption class="caption">
  <strong>Таблица 1 </strong>
  Элементы планировщика с предопределёнными обработчиками 'onclick'
  </caption>
  <thead>
  <tr>
  <th>
  Имя класса
  </th>
  <th>
  Элемент
  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>dhx_cal_event_line</td>
  <td>Многодневные события в представлениях Day, Week, Month, Units и любое событие в Timeline view</td>
  </tr>
  <tr>
  <td>dhx_cal_event_clear</td>
  <td>Однодневные события в Month view</td>
  </tr>
  <tr>
  <td>dhx_event_move</td>
  <td>Заголовок блока события, используемый для перетаскивания события в Day, Week, Units views</td>
  </tr>
  <tr>
  <td>dhx_wa_ev_body</td>
  <td>Событие в WeekAgenda view</td>
  </tr>
  <tr>
  <td>dhx_event_resize</td>
  <td>Нижняя часть блока события, используемая для изменения размера события в Day, Week, Units views </td>
  </tr>
  <tr>
  <td>dhx_scale_holder</td>
  <td>Столбец в Day, Week, Units views</td>
  </tr>
  <tr>
  <td>dhx_scale_holder_now</td>
  <td>Выделенный столбец с текущей датой в Day, Week, Units views</td>
  </tr>
  <tr>
  <td>dhx_month_body</td>
  <td>Ячейка без заголовка в Month view</td>
  </tr>
  <tr>
  <td>dhx_matrix_cell</td>
  <td>Ячейка в Timeline view</td>
  </tr>
  <tr>
  <td>dhx_marked_timespan</td>
  <td>Помеченные (выделенные) ячейки</td>
  </tr>
  <tr>
  <td>dhx_time_block</td>
  <td>Заблокированные ячейки</td>
  </tr>
  </tbody>
</table>