---
sidebar_label: "templates"
title: "templates config"
description: "задаёт стиль форматирования для templates, используемых в датах, заголовках и тултипах внутри scheduler"
---

# templates

### Description

@short: Задаёт стиль форматирования для templates, используемых в датах, заголовках и тултипах внутри scheduler

@signature: templates: SchedulerTemplates

### Example

~~~jsx
// задаёт формат даты, отображаемый в заголовке видов Day и Units
scheduler.templates.day_date = function(date){
    return scheduler.date.date_to_str(scheduler.config.default_date);
};
~~~

### Details

Подробная информация о свойствах объекта **templates** доступна в отдельном разделе на <br> главной странице API ['Scheduler API: Templates'](api/overview/templates_overview.md).
