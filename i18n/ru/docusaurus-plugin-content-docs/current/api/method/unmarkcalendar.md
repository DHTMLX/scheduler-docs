---
sidebar_label: "unmarkCalendar"
title: "unmarkCalendar method"
description: "удаляет CSS класс с указанной даты"
---

# unmarkCalendar

### Description

@short: Удаляет CSS класс с указанной даты

@signature: unmarkCalendar: (calendar: any, date: Date, css: string) =\> void

### Parameters

- `calendar` - (required) *object* - объект мини-календаря
- `date` - (required) *Date* - дата, с которой нужно убрать отметку
- `css` - (required) *string* - имя CSS класса для удаления

### Example

~~~jsx
// существует два способа получить объект календаря:

// создание мини-календаря
var calendar = scheduler.renderCalendar({
    container:"cal_here", 
    navigation:true,
    handler:function(date){
        scheduler.setCurrentView(date, scheduler._mode);
    }
});

// или выбор контейнера с мини-календарём
var calendar = document.querySelector(".dhx_mini_calendar");

scheduler.markCalendar(calendar, new Date(2010,3,1), "my_style");
...
scheduler.unmarkCalendar(calendar, new Date(2010,3,1), "my_style");
~~~

### Details

:::note
 Метод требует активированного плагина [minical](guides/extensions-list.md#minicalendardatepicker). 
::: 

:::note

Учтите, что этот метод работает только с мини-календарём, а не с самим scheduler.
 
:::

### Related API
- [markCalendar](api/method/markcalendar.md)

### Related Guides
- [Мини-календарь (Date Picker)](guides/minicalendar.md)
