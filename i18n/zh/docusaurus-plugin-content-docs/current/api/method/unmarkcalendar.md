---
sidebar_label: "unmarkCalendar"
title: "unmarkCalendar method"
description: "从指定日期移除一个 CSS 类"
---

# unmarkCalendar

### Description

@short: 从指定日期移除一个 CSS 类

@signature: unmarkCalendar: (calendar: any, date: Date, css: string) =\> void

### Parameters

- `calendar` - (required) *object* - 迷你日历对象
- `date` - (required) *Date* - 要取消标记的日期
- `css` - (required) *string* - 要移除的 CSS 类名

### Example

~~~jsx
// 获取日历对象有两种方式：

// 通过创建一个迷你日历
var calendar = scheduler.renderCalendar({
    container:"cal_here", 
    navigation:true,
    handler:function(date){
        scheduler.setCurrentView(date, scheduler._mode);
    }
});

// 或者通过选择包含迷你日历的容器
var calendar = document.querySelector(".dhx_mini_calendar");

scheduler.markCalendar(calendar, new Date(2010,3,1), "my_style");
...
scheduler.unmarkCalendar(calendar, new Date(2010,3,1), "my_style");
~~~

### Details

:::note
 该方法需要激活 [minical](guides/extensions-list.md#minicalendardatepicker) 插件。 
::: 

:::note

请注意，此方法仅适用于迷你日历，不适用于调度器本身。
 
:::

### Related API
- [markCalendar](api/method/markcalendar.md)

### Related Guides
- [미니 캘린더(날짜 선택기)](guides/minicalendar.md)
