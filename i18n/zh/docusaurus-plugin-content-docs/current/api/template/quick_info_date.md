---
sidebar_label: "quick_info_date"
title: "quick_info_date template"
description: "定义在弹出编辑表单中显示的日期"
---

# quick_info_date

### Description

@short: 定义在弹出编辑表单中显示的日期

@signature: quick_info_date: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - 事件的开始日期
- `end` - (required) *Date* - 事件的结束日期
- `event` - (required) *object* - 事件详情

### Returns
- ` text` - (string) - 用于在scheduler中显示的html文本

### Example

~~~jsx
scheduler.templates.quick_info_date = function(start, end, ev){
    if (scheduler.isOneDayEvent(ev)){
        return scheduler.templates.day_date(start, end, ev) + " " +
            scheduler.templates.event_header(start, end, ev);
    }else{
        return scheduler.templates.week_date(start, end, ev);
    }
};
~~~

### Details

:::note
 该模板仅在启用[quick_info](guides/extensions-list.md#quickinfo) 插件时生效。 
:::

### Related Guides
- [공통 템플릿](guides/common-templates.md#touch-support)
- [전체 확장 기능 목록](guides/extensions-list.md#quickinfo)
