---
sidebar_label: "load_format"
title: "load_format template"
description: "definiert das Anforderungsformat, das im dynamischen Lade-Modus verwendet wird"
---

# load_format

### Description

@short: Definiert das Anforderungsformat, das im dynamischen Lade-Modus verwendet wird

@signature: load_format: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - das Datum, das formatiert werden muss

### Returns
- ` text` - (string) - HTML-Text zur Darstellung im Scheduler

### Example

~~~jsx
scheduler.templates.load_format = function(date){
    var dateToStr_func = scheduler.date.date_to_str(scheduler.config.load_date);
    return  dateToStr_func(date);
    
}
~~~

### Details

Standardmäßig folgen die Anfragen folgendem Format:

~~~js
some.php?from=DATEHERE&to=DATEHERE
~~~

wobei DATEHERE einen gültigen Datumswert darstellt, der gemäß der Option [load_date](api/config/load_date.md) formatiert ist *(basierend auf der Standarddefinition der **load_format** Vorlage).*

### Related API
- [setLoadMode](api/method/setloadmode.md)
- [load_date](api/config/load_date.md)

### Related Guides
- [Daten laden](guides/loading-data.md#dynamic-loading)
