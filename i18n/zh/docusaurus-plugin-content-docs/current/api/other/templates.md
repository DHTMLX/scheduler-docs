---
sidebar_label: "templates"
title: "templates config"
description: "设置调度器中用于日期、标题和tooltip的templates的格式样式"
---

# templates

### Description

@short: 设置调度器中用于日期、标题和tooltip的templates的格式样式

@signature: templates: SchedulerTemplates

### Example

~~~jsx
// 设置Day和Units视图头部显示的日期格式
scheduler.templates.day_date = function(date){
    return scheduler.date.date_to_str(scheduler.config.default_date);
};
~~~

### Details

关于**templates**对象属性的详细信息，可以在主API页面的专门章节中找到<br> ['Scheduler API: Templates'](api/overview/templates_overview.md)。
