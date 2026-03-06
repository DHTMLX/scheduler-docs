---
sidebar_label: templates
title: "templates config"
description: "defines formatting of the templates for dates, titles and tooltips in the scheduler"
---

# templates

### Description

@short: Defines formatting of the templates for dates, titles and tooltips in the scheduler

@signature: templates: SchedulerTemplates

### Example

~~~jsx
//specifies the date in the header of the Day and Units views
scheduler.templates.day_date = function(date){
    return scheduler.date.date_to_str(scheduler.config.default_date);
};
~~~

### Details

The properties of the **templates** object are described in a separate chapter of <br> the root API page ['Scheduler API: Templates'](api/overview/templates_overview.md).
