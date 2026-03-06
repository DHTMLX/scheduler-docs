---
title: "Интеграция с jQuery"
sidebar_label: "Интеграция с jQuery"
---

# Интеграция с jQuery

Начиная с версии 4.0, dhtmlxScheduler поддерживает интеграцию с jQuery.

Вот как можно инициализировать стандартный Gantt с помощью jQuery:

~~~js
$(function(){
    $(".myscheduler").dhx_scheduler({
        date:new Date(2019,4,25),
        mode:"month"
    });
        
    scheduler.load("data/events");
});
~~~

В этом примере:

- **".myscheduler"** - jQuery-совместимый CSS селектор для контейнера, в котором будет создан Gantt (в PRO-версии возможно инициализировать Gantt одновременно в нескольких контейнерах).
- Метод **dhx_scheduler()** создает экземпляр dhtmlxScheduler. В качестве параметра принимает объект конфигурации:
  - **date** - (*Date*) устанавливает начальную дату Gantt (по умолчанию - текущая дата)
  - **mode** - (*string*) определяет начальный режим отображения (по умолчанию - "week")
  - другие параметры конфигурации (обычно задаются через scheduler.config.xxxxx) также могут быть переданы этим способом
:::note
Gantt, инициализированный через jQuery-метод, поддерживает те же настройки конфигурации и API, что и стандартный Gantt.
:::


[JQuery integration](https://docs.dhtmlx.com/scheduler/samples/10_integration/06_jquery.html)
