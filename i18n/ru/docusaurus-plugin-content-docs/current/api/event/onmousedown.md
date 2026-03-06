---
sidebar_label: "onMouseDown"
title: "onMouseDown event"
description: "срабатывает, когда пользователь кликает по элементу планировщика, у которого нет предопределенного обработчика 'onclick'"
---

# onMouseDown

### Description

@short: Срабатывает, когда пользователь кликает по элементу планировщика, у которого нет предопределенного обработчика 'onclick'

@signature: onMouseDown: (className: string) =\> void

### Parameters

- `className` - (required) *string* - CSS-класс кликнутого элемента

### Example

~~~jsx
scheduler.attachEvent("onMouseDown", function(className){
    //any custom logic here
});
~~~

### Details

Элементы планировщика с предопределёнными обработчиками 'onclick' перечислены в таблице ниже.

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
  <td>Много-дневные события, отображаемые в представлениях Day, Week, Month, Units, а также любые события в представлении Timeline</td>
  </tr>
  <tr>
  <td>dhx_cal_event_clear</td>
  <td>Однодневные события в представлении Month</td>
  </tr>
  <tr>
  <td>dhx_event_move</td>
  <td>Заголовок блока события, используемый для перетаскивания событий в представлениях Day, Week, Units</td>
  </tr>
  <tr>
  <td>dhx_wa_ev_body</td>
  <td>Событие, отображаемое в представлении WeekAgenda</td>
  </tr>
  <tr>
  <td>dhx_event_resize</td>
  <td>Нижняя часть блока события, используемая для изменения размера событий в представлениях Day, Week, Units</td>
  </tr>
  <tr>
  <td>dhx_scale_holder</td>
  <td>Колонка в представлениях Day, Week, Units</td>
  </tr>
  <tr>
  <td>dhx_scale_holder_now</td>
  <td>Выделенная колонка, обозначающая текущую дату в представлениях Day, Week, Units</td>
  </tr>
  <tr>
  <td>dhx_month_body</td>
  <td>Ячейка без заголовка в представлении Month</td>
  </tr>
  <tr>
  <td>dhx_matrix_cell</td>
  <td>Ячейка в представлении Timeline</td>
  </tr>
  <tr>
  <td>dhx_marked_timespan</td>
  <td>Отмеченные (выделенные) ячейки</td>
  </tr>
  <tr>
  <td>dhx_time_block</td>
  <td>Заблокированные ячейки</td>
  </tr>
  </tbody>
</table>
