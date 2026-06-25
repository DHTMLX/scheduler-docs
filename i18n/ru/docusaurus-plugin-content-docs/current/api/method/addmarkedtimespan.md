---
sidebar_label: addMarkedTimespan
title: "addMarkedTimespan метод"
description: "помечает даты, но при некоторых настройках может происходить блокировка (позволяет задавать собственный стиль для ограничения)"
---

# addMarkedTimespan

### Description

@short: Помечает даты, но при определённых настройках может выполняться блокировка (позволяет задавать индивидуальный стиль для ограничения)

@signature: addMarkedTimespan: (config: any) => number

### Parameters

- `config` - (required) *object* - объект конфигурации временного интервала, который нужно пометить/заблокировать

### Returns
- `id` - (number) - идентификатор добавленного временного интервала

### Example

~~~jsx
//отмечает даты
scheduler.addMarkedTimespan({  
    days:  5,               // отмечает каждую пятницу
    zones: "fullday",       // отмечает весь день
    css:   "gray_section"   // применяется CSS класс
});
scheduler.updateView();

//отмечает и блокирует даты
scheduler.addMarkedTimespan({  
    days:  5,
    zones: "fullday",
    css:   "gray_section",
    type:  "dhx_time_block" //фиксированное значение
});
scheduler.updateView();
~~~

### Related samples
- [Выделение временных диапазонов](https://docs.dhtmlx.com/scheduler/samples/09_api/03_highlighted_timespans.html)
- [Выделение секций в Timeline и Units views](https://docs.dhtmlx.com/scheduler/samples/09_api/04_highlighted_sections_units.html)

### Details

Этот метод доступен с версии 3.5.

:::note
 Метод требует включения плагина [limit](guides/extensions-list.md#limit). 
:::

:::note

Учтите, что отметка (блокировка) не применяется сразу после вызова метода. Необходимо вызвать [updateView](api/method/updateview.md) для применения изменений.
 
:::

## Свойства объекта конфигурации

Объект конфигурации может содержать следующие свойства:

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <thead>
  <tr>
  <th>
  Свойство 
  </th>
  <th>
  Описание
  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td rowspan="2"><b id="start_date">start_date</b></td>
  <td> объект Date, определяющий начало ограничения</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
// запрещает создание событий с 2027-05-03 по 'end_date'
start_date: new Date(2027, 4, 3)
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="end_date">end_date</b></td>
  <td> объект Date, определяющий конец ограничения</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
// запрещает создание событий с 'start_date'
// по 2027-09-03
end_date: new Date(2027, 8, 3)
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="days">days</b></td>
  <td> дни, которые будут ограничены</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
days: [0, 2, 6] // ограничивает воскресенье, вторник и субботу
days: "fullweek" // ограничивает всю неделю
days: new Date(2027, 6, 1) // блокирует 2027-07-01
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="zones">zones</b></td>
  <td>временные интервалы (в минутах), которые будут ограничены</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
// два блока ограничения: 04:00-08:00 и 12:00-15:00
zones: [4 * 60, 8 * 60, 12 * 60, 15 * 60]
zones: "fullday" // ограничивает весь день
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="css">css</b></td>
  <td>имя CSS класса для применения</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
css:"gray" //рисует DIV с применённым классом 'gray'
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="html">html</b></td>
  <td>HTML содержимое для отображения в отмеченном диапазоне</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
//рисует DIV с этим текстом поверх отмеченного диапазона  
html:"<b>Blocked</b>"
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="type">type</b></td>
  <td>определяет тип временного интервала. Значение 'dhx_time_block' применяет блокировку. Любое другое значение просто отмечает интервал без блокировки.</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
type: "dhx_time_block" // интервал будет отмечен и заблокирован  
~~~
  </td>
  </tr> 
  <tr>
  <td rowspan="2"><b id="invert_zones">invert_zones</b></td>
  <td>указывает, нужно ли инвертировать временные зоны (указанные в 'zones'), по умолчанию false</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
//результат: два блока ограничения: 00:00-08:00 и 17:00-24:00
zones: [8*60, 17*60], invert_zones: true 
//результат: два блока ограничения: 00:00-08:00 и 17:00-24:00
zones: [0, 8*60, 17*60, 24*60], invert_zones: false
~~~
  </td>
  </tr> 
  <tr>
  <td rowspan="2"><b id="sections">sections</b></td>
  <td>ограничивает блокировку только для определённых элементов в конкретных представлениях.<br> Даты будут заблокированы только в указанных view.</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
//блокирует даты только для элемента с id=5 в Unit view 
//и для элементов с id 2 и 3 в Timeline view 
sections: { unit: 5, timeline: [2,3]}
~~~
  </td>
  </tr> 
  </tbody>
</table>

## Допустимые комбинации свойств config

:::note

Учтите, что *days* и *zones* должны использоваться вместе, как и *start_date* и *end_date* парой для определения интервала блокировки. Эти пары нельзя смешивать иначе.
Например, нельзя комбинировать *zones* с *start_date* или использовать *days* вместе с *start_date* и *end_date* одновременно.
 
:::

Поэтому существует две валидные комбинации свойств:

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <thead>
  <tr>
  <th>
  Набор свойств 
  </th>
  <th>
  Пример
  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td><ul>
  <li>`days`</li>
  <li>`zones`</li>
  <li>`invert_zones`</li>
  <li>`css`</li>
  <li>`html`</li>
  <li>`type`</li>
  <li>`sections`</li>
  </ul></td>
  <td>
~~~js
const config = {
    days: 1,
    zones: [9 * 60, 15 * 60],
    css: "cssClassName",
    sections: {
        unit: 5
    }
};
~~~
</td>
  </tr>
  <tr>
  <td> 
  <ul>
  <li>`start_date`</li>
  <li>`end_date` </li>
  <li>`css`</li>
  <li>`html`</li>
  <li>`type`</li>
  <li>`sections`</li>
  </ul>
  </td>
  <td>
~~~js
const config = {
    start_date: new Date(2027, 7, 13),
    end_date: new Date(2027, 7, 14),
    css: "cssClassName",
    sections: {
        unit: 5
    }
};
~~~
</td>
</tr>
  </tbody>
</table>

## Сравнение markTimespan() и addMarkedTimespan()

<table >
<tr><td>
addMarkedTimespan 
</td><td>
markTimespan 
</td></tr>
<tr><td>
требуется вызвать [updateView](api/method/updateview.md) для отрисовки DIV для временного интервала 
</td><td>
автоматически рисует DIV для временного интервала 
</td></tr>
<tr><td>
временной интервал(ы) сохраняются навсегда 
</td><td>
временной интервал(ы) скрываются сразу после любого внутреннего обновления в приложении 
</td></tr>
<tr><td>
возвращает ID настроенного временного интервала(ов) 
</td><td>
возвращает DIV элемент или массив DIV элементов 
</td></tr>
</table>

### Related API
- [deleteMarkedTimespan](api/method/deletemarkedtimespan.md)
- [markTimespan](api/method/marktimespan.md)
- [checkInMarkedTimespan](api/method/checkinmarkedtimespan.md)

### Related Guides
- [Блокировка и пометка дат](guides/limits.md)