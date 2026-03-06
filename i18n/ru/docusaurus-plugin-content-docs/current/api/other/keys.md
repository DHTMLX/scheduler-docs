---
sidebar_label: "keys"
title: "keys config"
description: "настраивает горячие клавиши для scheduler"
---

# keys

### Description

@short: Настраивает горячие клавиши для scheduler

@signature: keys: SchedulerHotkeys

### Example

~~~jsx
scheduler.keys.edit_save = 32;
...
scheduler.init('scheduler_here',new Date(),"month");
~~~

### Details

Объект **keys** включает в себя следующие свойства:

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
  Поддерживаемые виды
  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>edit_save</td>
  <td>устанавливает key code для клавиши клавиатуры, которая подтверждает действие редактирования (служит альтернативой нажатию кнопки 'Save' в lightbox)</td>
  <td>13 (клавиша 'Enter')</td>
  <td>все виды</td>
  </tr>
  <tr>
  <td>edit_cancel</td>
  <td>устанавливает key code для клавиши клавиатуры, которая отменяет действие редактирования (служит альтернативой нажатию кнопки 'Cancel' в lightbox)</td>
  <td>27 (клавиша 'Escape')</td>
  <td>все виды</td>
  </tr>
  </tbody>
</table>

:::note

Обратите внимание, все свойства объекта **keys** используют тип данных 'number'.
 
:::
