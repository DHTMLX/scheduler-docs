---
sidebar_label: "blockTime"
title: "blockTime method"
description: "блокирует указанную дату и применяет к ней стиль по умолчанию 'dimmed'."
---

# blockTime
:::warning
Эта функицональность устарела
::: 
### Description

@short: Блокирует указанную дату и применяет к ней стиль по умолчанию 'dimmed'.

@signature: blockTime: (date: Date|number, time_points: any[], items?: any) =\> void

### Parameters

- `date` - (required) *Date | number* - дата для блокировки (если передано число, оно интерпретируется как день недели: <br> '0' - воскресенье, '6' - суббота)
- `time_points` - (required) *array* - массив <b>[start_minute,end_minute,..,start_minute_N,end_minute_N]</b>, <br> где каждая пара задает временной интервал. Массив может содержать любое количество таких пар
- `items` - (optional) *object* - уточняет конкретные элементы представления(ий), для которых нужно применить блокировку

### Example

~~~jsx
//блокирует события с полуночи до 8 утра каждую среду 
//НО только для элементов с id=1, id=4 в представлении Units
scheduler.blockTime(3, [0,8*60], { unit: [1,4] });
~~~

### Related samples
- [Blocking dates](https://docs.dhtmlx.com/scheduler/samples/03_extensions/25_advanced_limitation.html)

### Details

:::note
 Метод требует включенного плагина [limit](guides/extensions-list.md#limit). 
:::

Метод можно использовать несколькими способами, например:


~~~js
//блокирует весь день 3 мая 2009 года
scheduler.blockTime(new Date(2009,5,3), "fullday");

//блокирует события с полуночи до 10 утра 3 июня 2009 года
scheduler.blockTime(new Date(2009,6,3), [0,10*60]);

//блокирует события с полуночи до 8 утра и с 18 до полуночи каждую субботу
scheduler.blockTime(6, [0,8*60,18*60,24*60]);

//блокирует все события каждое воскресенье
scheduler.blockTime(0, "fullday");

//блокирует события с полуночи до 8 утра каждую среду
//НО только для элементов с id=1, id=4 в представлении Units
scheduler.blockTime(3, [0,8*60], { unit: [1,4] });

//то же, что и выше, но с использованием объекта конфигурации для параметров
scheduler.blockTime({
    days: 3,
    zones: [0,8*60],
    sections: {
        unit: [1,4]
    }
});

~~~

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
//запрещает создание событий с 3 мая 2012 года до 'end_date' 
start_date:new Date(2012,4,3)
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
//запрещает создание событий с 'start_date' до 3 сентября 2012 года
end_date:new Date(2012,8,3)
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="days">days</b></td>
  <td> дни недели или конкретные даты, которые нужно заблокировать</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
days:[0, 2, 6] //блокирует воскресенье, вторник и субботу
days:"fullweek" //блокирует всю неделю
days:new Date(2012,6,1) //блокирует 1 июля 2012 года
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="zones">zones</b></td>
  <td>временные интервалы в минутах, которые нужно заблокировать</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
zones:[4*60,8*60,12*60,15*60] //два заблокированных интервала: 04:00-08:00, 12:00-15:00
zones:"fullday" //блокирует весь день
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="css">css</b></td>
  <td>имя CSS-класса для применения</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
css:"gray" //добавляет DIV с примененным CSS-классом 'gray'
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="invert_zones">invert_zones</b></td>
  <td>определяет, нужно ли инвертировать временные зоны, заданные в 'zones' (по умолчанию false)</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
//результат: два заблокированных интервала: 00:00-08:00 и 17:00-24:00
zones: [8*60, 17*60], invert_zones: true 
//результат: два заблокированных интервала: 00:00-08:00 и 17:00-24:00
zones: [0, 8*60, 17*60, 24*60], invert_zones: false
~~~
  </td>
  </tr> 
  <tr>
  <td rowspan="2"><b id="sections">sections</b></td>
  <td>позволяет блокировать даты только для конкретных элементов в определённых представлениях.<br> Обратите внимание, что указанные даты будут заблокированы только в этих представлениях</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
//блокирует даты только для элемента с id=5 в представлении Units
//и для элементов с id=2 и id=3 в представлении Timeline
sections: { unit: 5, timeline: [2,3]}
~~~
  </td>
  </tr> 
  </tbody>
</table>

### Related API
- [addMarkedTimespan](api/method/addmarkedtimespan.md)
- [deleteMarkedTimespan](api/method/deletemarkedtimespan.md)
- [unblockTime](api/method/unblocktime.md)

### Change log
- устарел с версии v5.1
