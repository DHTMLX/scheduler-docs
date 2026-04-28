---
sidebar_label: updateCalendar
title: "updateCalendar method"
description: "отображает указанную дату в мини-календаре"
---

# updateCalendar

### Description

@short: Отображает указанную дату в мини-календаре

@signature: updateCalendar: (calendar: any, new_date: Date) =\> void

### Parameters

- `calendar` - (required) *object* - объект мини-календаря
- `new_date` - (required) *Date* - новая дата для отображения в мини-календаре

### Example

~~~jsx
const calendar = scheduler.renderCalendar({
    container:"cal_here", 
    navigation:true,
    handler:function(date){
        scheduler.setCurrentView(date, scheduler._mode);
    }
});
...
scheduler.updateCalendar(calendar, new Date(2027,01,01));
~~~

### Details

:::note
 Метод требует активации плагина [minical](guides/extensions-list.md#mini-calendar-date-picker). 
:::

### Related Guides
- [Мини-календарь (Date Picker)](guides/minicalendar.md)
