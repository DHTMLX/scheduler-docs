---
sidebar_label: unmarkCalendar
title: "unmarkCalendar метод"
description: "удаляет CSS-класс с указанной даты"
---

# unmarkCalendar

### Description

@short: Удаляет CSS-класс с указанной даты

@signature: unmarkCalendar: (calendar: any, date: Date, css: string) =\> void

### Parameters

- `calendar` - (required) *object* - объект мини-календаря
- `date` - (required) *Date* - дата, которую нужно снять пометку
- `css` - (required) *string* - имя CSS-класса, который нужно удалить

### Example

~~~jsx
// существует два способа получить объект календаря:

// создание мини-календаря
const calendar = scheduler.renderCalendar({
    container:"cal_here", 
    navigation:true,
    handler:function(date){
        scheduler.setCurrentView(date, scheduler._mode);
    }
});

// или выбор контейнера с мини-календарём
var calendar = document.querySelector(".dhx_mini_calendar");

scheduler.markCalendar(calendar, new Date(2025,3,1), "my_style");
...
scheduler.unmarkCalendar(calendar, new Date(2027,3,1), "my_style");
~~~

### Details

:::note
 Метoд требует активированного плагина minical (mini-calendar-date-picker) для активации. 
::: 

:::note

Примечание: метод применяется только к мини-календарю, а не к scheduler!
 
:::

### Related API
- [markCalendar](api/method/markcalendar.md)

### Related Guides
- [Мини-календарь (Date Picker)](guides/minicalendar.md)