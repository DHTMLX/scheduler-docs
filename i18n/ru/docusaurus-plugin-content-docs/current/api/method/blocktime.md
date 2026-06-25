---
sidebar_label: blockTime
title: "blockTime method"
description: "блокирует указанную дату и применяет к ней стиль по умолчанию 'dimmed'."
---

# blockTime
:::warning 
Метод устарел.
:::
### Description

@short: Блокирует указанную дату и применяет к ней стиль по умолчанию 'dimmed'.

@signature: blockTime: (date: Date|number, time_points: any[], items?: any) =\> void

### Parameters

- `date` - (required) *Date | number* - дата, которую следует заблокировать (если указан номер, параметр будет рассматриваться как номер дня недели <br> day: '0' — воскресенье, '6' — суббота )
- `time_points` - (required) *array* - массив <b>[start_minute,end_minute,..,start_minute_N,end_minute_N]</b>, <br> где каждая пара устанавливает определённый лимит диапазона. Массив может содержать любое число таких пар
- `items` - (optional) *object* - определяет конкретные элементы представления(й) для блокировки

### Example

~~~jsx
//блокирует события с 0 до 8 часов для каждой среды
//но только для элементов с id=1, id=4 во представлении Units
scheduler.blockTime(3, [0,8*60], { unit: [1,4] });
~~~

### Related samples
- [Blocking dates](https://docs.dhtmlx.com/scheduler/samples/03_extensions/25_advanced_limitation.html)

### Details

:::note
 Метод требует включенного плагина [limit](guides/extensions-list.md#limit). 
:::

Метод можно вызывать различными способами, как показано ниже:


~~~js
//блокирует весь день 3 мая 2009 года
scheduler.blockTime(new Date(2009,5,3), "fullday");

//блокирует события с 0 до 10 часов на 3 июня 2009 года
scheduler.blockTime(new Date(2009,6,3), [0,10*60]);

//блокирует события с 0 до 8 часов и с 18 до 24 часов для каждой субботы
scheduler.blockTime(6, [0,8*60,18*60,24*60]);

//блокирует все события для каждого воскресенья
scheduler.blockTime(0, "fullday");

//блокирует события с 0 до 8 часов для каждой среды
//НО только для элементов с id=1, id=4 во представлении Units
scheduler.blockTime(3, [0,8*60], { unit: [1,4] });

//делает то же, что и выше, но принимает параметры как конфигурационный объект
scheduler.blockTime({
    days: 3,
    zones: [0,8*60],
    sections: {
        unit: [1,4]
    }
});

~~~


### Related API
- [addMarkedTimespan](api/method/addmarkedtimespan.md)
- [deleteMarkedTimespan](api/method/deletemarkedtimespan.md)
- [unblockTime](api/method/unblocktime.md)

### Change log
- устарел с v5.1