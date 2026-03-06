---
sidebar_label: "agenda_day"
title: "agenda_day template"
description: "定义了Agenda视图中每日单元格内显示的内容"
---

# agenda_day

### Description

@short: 定义了Agenda视图中每日单元格内显示的内容

@signature: agenda_day: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 需要格式化的日期

### Returns
- ` text` - (string) - 在scheduler中显示的html内容

### Example

~~~jsx
const dayDateToStr = scheduler.date.date_to_str("%F %j");
const dayDowToStr = scheduler.date.date_to_str("%l");

scheduler.templates.agenda_day = function(date){ 
    return `<div class="dhx_agenda_day_date">${dayDateToStr(date)}</div>
    <div class="dhx_agenda_day_dow">${dayDowToStr(date)}</div>`;
};
~~~

### Related Guides
- [아젠다 뷰](views/agenda.md)

### Change log
- v7.0版本新增
