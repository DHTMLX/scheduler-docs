---
sidebar_label: "updateCalendar"
title: "updateCalendar method"
description: "在迷你 calendar 中显示所选日期"
---

# updateCalendar

### Description

@short: 在迷你 calendar 中显示所选日期

@signature: updateCalendar: (calendar: any, new_date: Date) =\> void

### Parameters

- `calendar` - (required) *object* - 迷你 calendar 实例
- `new_date` - (required) *Date* - 要在迷你 calendar 中显示的日期

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
 该方法需要激活 [minical](guides/extensions-list.md#minicalendardatepicker) 插件。 
:::

### Related Guides
- [미니 캘린더(날짜 선택기)](guides/minicalendar.md)
