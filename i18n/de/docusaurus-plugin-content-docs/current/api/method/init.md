---
sidebar_label: init
title: "init method"
description: "a constructor of a dhtmlxScheduler object"
---

# init

### Description

@short: Ein Konstruktor eines dhtmlxScheduler-Objekts

@signature: init: (container: string|HTMLElement, date?: Date, view?: string) =\> void

### Parameters

- `container` - (required) *string | HTMLElement* - ein HTML-Container (oder dessen ID), in dem ein dhtmlxScheduler-Objekt initialisiert wird
- `date` - (optional) *Date* - das anfängliche Datum des Schedulers (standardmäßig das aktuelle Datum)
- `view` - (optional) *string* - der Name der anfänglichen Ansicht (standardmäßig, "week")

### Example

~~~jsx
scheduler.init("scheduler_here", new Date(2027, 0, 6), "month");
~~~

### Related samples
- [Grundlegende Initialisierung](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)
- [Agenda-Ansicht](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)