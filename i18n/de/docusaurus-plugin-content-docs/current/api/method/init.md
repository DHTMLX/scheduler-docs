---
sidebar_label: "init"
title: "init method"
description: "Dies ist der Konstruktor zur Erstellung einer dhtmlxScheduler-Instanz."
---

# init

### Description

@short: Dies ist der Konstruktor zur Erstellung einer dhtmlxScheduler-Instanz.

@signature: init: (container: string|HTMLElement, date?: Date, view?: string) =\> void

### Parameters

- `container` - (required) *string | HTMLElement* - Das HTML-Container-Element (oder dessen ID), in dem der dhtmlxScheduler eingerichtet wird.
- `date` - (optional) *Date* - Das Startdatum für den Scheduler (Standard ist das aktuelle Datum).
- `view` - (optional) *string* - Der anfängliche View-Modus (Standard ist "week").

### Example

~~~jsx
scheduler.init("scheduler_here",new Date(2027,0,6),"month");
~~~

### Related samples
- [Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)
- [Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)
