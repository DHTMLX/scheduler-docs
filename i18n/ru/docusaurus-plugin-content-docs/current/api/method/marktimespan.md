---
sidebar_label: "markTimespan"
title: "markTimespan method"
description: "подсвечивает или блокирует определённые дату(ы), применяя либо стиль по умолчанию, либо кастомный стиль. Подсветка снимается сразу после любого внутреннего обновления в приложении. Это может быть полезно для выделения определённых дат."
---

# markTimespan

### Description

@short: Подсвечивает или блокирует определённые дату(ы), применяя либо стиль по умолчанию, либо кастомный стиль. Подсветка снимается сразу после любого внутреннего обновления в приложении. Это может быть полезно для выделения определённых дат.

@signature: markTimespan: (config: any) =\> any[]

### Parameters

- `config` - (required) *object* - подробности конфигурации для выделяемого или блокируемого диапазона времени

### Returns
- ` divs` - (array) - возвращается массив HTML-элементов

### Example

~~~jsx
//подсветить определённые даты
scheduler.markTimespan({  
    days:  5,               // подсвечивает каждую пятницу  
    zones: "fullday",       // подсвечивает весь день
    css:   "gray_section"   // применяемый CSS класс
});

//подсветить и заблокировать определённые даты
scheduler.markTimespan({  
    days:  5,
    zones: "fullday",
    css:   "gray_section",
    type:  "dhx_time_block" // фиксированное значение для блокировки диапазона времени
});
~~~

### Related samples
- [Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)

### Details

:::note

 Этот метод доступен начиная с версии 3.5.
 
:::

:::note
 Этот метод требует включения плагина [limit](guides/extensions-list.md#limit). 
:::

## Свойства объекта конфигурации

Объект конфигурации поддерживает следующие свойства:

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
  <td> объект Date, указывающий начало ограничения</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
// запрещает создание событий начиная с 3 мая 2012 до 'end_date' 
start_date:new Date(2012,4,3)
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="end_date">end_date</b></td>
  <td> объект Date, указывающий конец ограничения</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
// запрещает создание событий с 'start_date' до 3 сентября 2012
end_date:new Date(2012,8,3)
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="days">days</b></td>
  <td> дни, к которым применяется ограничение</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
days:[0, 2, 6] // ограничивает воскресенье, вторник и субботу
days:"fullweek" // ограничивает всю неделю
days:new Date(2012,6,1) // блокирует 1 июля 2012
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="zones">zones</b></td>
  <td> временные интервалы в минутах, к которым применяется ограничение</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
zones:[4*60,8*60,12*60,15*60] // два ограниченных интервала: 04:00-08:00, 12:00-15:00
zones:"fullday" // ограничивает весь день
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="css">css</b></td>
  <td> имя CSS класса для применения </td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
css:"gray" // создаёт DIV с применённым CSS классом 'gray'
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="html">html</b></td>
  <td> HTML содержимое для отображения внутри выделенного диапазона </td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
html:"<b>Blocked</b>" // добавляет этот текст внутри DIV для выделенного диапазона  
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="type">type</b></td>
  <td> задаёт тип диапазона времени. Установка в 'dhx_time_block' блокирует диапазон. Любое другое значение лишь подсвечивает диапазон без блокировки </td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
type: "dhx_time_block" // подсвечивает и блокирует диапазон времени  
~~~
  </td>
  </tr> 
  <tr>
  <td rowspan="2"><b id="invert_zones">invert_zones</b></td>
  <td> определяет, следует ли инвертировать временные зоны (установленные в 'zones'), по умолчанию false </td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
// результат: два ограниченных интервала: 00:00-08:00, 17:00-24:00
zones: [8*60, 17*60], invert_zones: true 
// результат: два ограниченных интервала: 00:00-08:00, 17:00-24:00
zones: [0, 8*60, 17*60, 24*60], invert_zones: false
~~~
  </td>
  </tr> 
  <tr>
  <td rowspan="2"><b id="sections">sections</b></td>
  <td> ограничивает блокировку конкретными элементами в определённых представлениях. Блокировка применяется только в этих связанных представлениях</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
// блокирует даты только для элемента с id=5 в представлении Units 
// и для элементов с id 2 и 3 в представлении Timeline 
sections: { unit: 5, timeline: [2,3]}
~~~
  </td>
  </tr> 
  </tbody>
</table>

## Допустимые комбинации свойств config

:::note

Имейте в виду, что *days*, *zones* и *start_date*, *end_date* образуют пары для определения интервала блокировки и не должны смешиваться иначе.
Например, нельзя использовать *zones* вместе с *start_date* или одновременно сочетать *days* с обоими *start_date* и *end_date*.
 
:::

Существует два валидных набора свойств, которые можно использовать:

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
  <td>
  <ul>
  <li>`days`</li>
  <li>`zones`</li>
  <li>`invert_zones`</li>
  <li>`css`</li>
  <li>`html`</li>
  <li>`type`</li>
  <li>`sections`</li>
  </ul>
  </td>
  <td>
~~~js
var config ={
    days:  1, 
    zones: [9*60, 15*60], 
    css: "cssClassName", 
    sections: {
         unit: 5
    }
}

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
var config ={
    start_date: new Date(2012,7,13),
    end_date:   new Date(2012,7,14),
    css: "cssClassName",
    sections: {
         unit: 5
    }
}
~~~
</td>
  </tr>
  </tbody>
</table>


## Сравнение markTimespan() и addMarkedTimespan()

<table >
<tr><td markdown='1'>
addMarkedTimespan 
</td><td markdown='1'>
markTimespan 
</td></tr>
<tr><td markdown='1'>
требует вызова метода [updateView](api/method/updateview.md) для отрисовки DIV для диапазона времени 
</td><td markdown='1'>
автоматически отрисовывает DIV для диапазона времени 
</td></tr>
<tr><td markdown='1'>
диапазон(ы) времени остаются видимыми постоянно 
</td><td markdown='1'>
диапазон(ы) времени скрываются сразу после любого внутреннего обновления в приложении 
</td></tr>
<tr><td markdown='1'>
возвращает ID созданного(ых) диапазона(ов) времени 
</td><td markdown='1'>
возвращает DIV или массив DIV-элементов 
</td></tr>
</table>

### Related Guides
- [Блокировка и выделение дат](guides/limits.md)
