---
sidebar_label: "markCalendar"
title: "markCalendar method"
description: "为特定日期添加一个 CSS 类"
---

# markCalendar

### Description

@short: 为特定日期添加一个 CSS 类

@signature: markCalendar: (calendar: any, date: Date, css: string) =\> void

### Parameters

- `calendar` - (required) *object* - 日历实例
- `date` - (required) *Date* - 需要高亮显示的日期
- `css` - (required) *string* - 要应用的 CSS 类名

### Example

~~~jsx
<style>
my_style{
    color:red !important; // 使用 'important' 关键字确保样式应用于该日期
}                        
</style>
<script>
    // 获取日历对象有两种方式：

    // 通过创建一个迷你日历
    var calendar = scheduler.renderCalendar({...});

    // 或者通过选择迷你日历的容器元素
    var calendar = document.querySelector(".dhx_mini_calendar");
    
    ...
    scheduler.markCalendar(calendar, new Date(2027,3,1), "my_style");
</script>
~~~

### Details

:::note
 该方法需要启用 [minical](guides/extensions-list.md#minicalendardatepicker) 插件。 
:::

:::note

请注意，此方法仅适用于迷你日历，不适用于整个 scheduler。
 
:::

### Related API
- [unmarkCalendar](api/method/unmarkcalendar.md)

### Related Guides
- [미니 캘린더(날짜 선택기)](guides/minicalendar.md)
