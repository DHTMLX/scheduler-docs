---
sidebar_label: "updateCalendar"
title: "updateCalendar method"
description: "отображает выбранную дату в мини-календаре"
---

# updateCalendar

### Description

@short: Отображает выбранную дату в мини-календаре

@signature: updateCalendar: (calendar: any, new_date: Date) =\> void

### Parameters

- `calendar` - (required) *object* - экземпляр мини-календаря
- `new_date` - (required) *Date* - дата, которая будет показана в мини-календаре

### Example

~~~jsx
var calendar = scheduler.renderCalendar({
    container:"cal_here", 
    navigation:true,
    handler:function(date){
        scheduler.setCurrentView(date, scheduler._mode);
    }
});
...
scheduler.updateCalendar(calendar, new Date(2013,01,01));
~~~

### Details

:::note
 Метод требует активации плагина [minical](guides/extensions-list.md#minicalendardatepicker). 
:::

### Related Guides
- [Мини-календарь (Date Picker)](guides/minicalendar.md)
