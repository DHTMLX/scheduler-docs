---
sidebar_label: init
title: "init метод"
description: "конструктор объекта dhtmlxScheduler"
---

# init

### Description

@short: Конструктор объекта dhtmlxScheduler

@signature: init: (container: string|HTMLElement, date?: Date, view?: string) =\> void

### Parameters

- `container` - (required) *string | HTMLElement* - HTML-контейнер (или его идентификатор), в котором будет инициализирован объект dhtmlxScheduler
- `date` - (optional) *Date* - начальная дата планировщика (по умолчанию — текущая дата)
- `view` - (optional) *string* - имя начального вида (по умолчанию — "week")

### Example

~~~jsx
scheduler.init("scheduler_here",new Date(2027,0,6),"month");
~~~

### Related samples
- Базовая инициализация
- Вид Agenda