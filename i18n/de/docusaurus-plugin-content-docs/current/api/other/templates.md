---
sidebar_label: "templates"
title: "templates config"
description: "Legt den Formatierungsstil für templates fest, die in Daten, Titeln und Tooltips innerhalb des Schedulers verwendet werden."
---

# templates

### Description

@short: Legt den Formatierungsstil für templates fest, die in Daten, Titeln und Tooltips innerhalb des Schedulers verwendet werden.

@signature: templates: SchedulerTemplates

### Example

~~~jsx
// legt das Datumsformat fest, das im Header der Day- und Units-Views angezeigt wird
scheduler.templates.day_date = function(date){
    return scheduler.date.date_to_str(scheduler.config.default_date);
};
~~~

### Details

Details zu den Eigenschaften des **templates**-Objekts finden Sie in einem eigenen Abschnitt auf der Haupt-API-Seite <br> unter ['Scheduler API: Templates'](api/overview/templates_overview.md).
