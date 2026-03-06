---
sidebar_label: "api_date"
title: "api_date template"
description: "Legt das Datumsformat fest, das von API-Methoden zur Verarbeitung von Daten verwendet wird. Dies hilft dabei, eingehende Datumswerte korrekt zu interpretieren."
---

# api_date

### Description

@short: Legt das Datumsformat fest, das von API-Methoden zur Verarbeitung von Daten verwendet wird. Dies hilft dabei, eingehende Datumswerte korrekt zu interpretieren.

@signature: api_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - das Datum, das formatiert werden muss

### Returns
- ` text` - (string) - HTML-Text zur Darstellung im Scheduler

### Example

~~~jsx
scheduler.templates.api_date = function(date){
    return scheduler.date.str_to_date(scheduler.config.api_date);
};
~~~
