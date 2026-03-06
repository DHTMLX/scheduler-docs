---
sidebar_label: "init"
title: "init method"
description: "Это конструктор для создания экземпляра dhtmlxScheduler."
---

# init

### Description

@short: Это конструктор для создания экземпляра dhtmlxScheduler.

@signature: init: (container: string|HTMLElement, date?: Date, view?: string) =\> void

### Parameters

- `container` - (required) *string | HTMLElement* - HTML контейнер (или его ID), в котором будет инициализирован dhtmlxScheduler.
- `date` - (optional) *Date* - Начальная дата для scheduler (по умолчанию текущая дата).
- `view` - (optional) *string* - Начальный режим отображения (по умолчанию "week").

### Example

~~~jsx
scheduler.init("scheduler_here",new Date(2010,0,6),"month");
~~~

### Related samples
- [Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)
- [Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)
