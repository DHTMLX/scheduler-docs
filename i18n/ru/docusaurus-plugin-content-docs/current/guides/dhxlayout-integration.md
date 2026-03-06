---
title: "Интеграция с dhtmlxLayout"
sidebar_label: "Интеграция с dhtmlxLayout"
---

# Интеграция с dhtmlxLayout

Использование dhtmlxLayout - удобный способ организовать [несколько планировщиков](guides/multiple-per-page.md) на странице. Он предоставляет привлекательную рамку и помогает управлять взаимодействием с другими элементами страницы, плавно адаптируясь к изменениям размера страницы.

:::note
Обратите внимание, что dhtmlxLayout не входит в библиотеку dhtmlxScheduler. Существуют две версии Layout в зависимости от используемой версии библиотеки dhtmlxSuite.
:::

## dhtmlxSuite v5+

В этой версии dhtmlxLayout может использоваться как самостоятельный продукт или как часть библиотеки dhtmlxSuite. Для включения dhtmlxLayout v5.X в ваш проект требуется [покупка лицензии](https://dhtmlx.com/docs/products/dhtmlxSuite5/).

**Чтобы добавить экземпляр dhtmlxScheduler в ячейку layout**, используйте метод [attachScheduler()](https://docs.dhtmlx.com/api__dhtmlxcell_attachscheduler.html).
  
**Обратите внимание**, что при добавлении планировщика в ячейку он автоматически инициализируется. Поэтому настройте планировщик перед вставкой его в layout.

~~~js
function init() {
    var dhxLayout = new dhtmlXLayoutObject(document.body, "2U");

    sched1 = Scheduler.getSchedulerInstance();
    sched1.config.multi_day = true;
    dhxLayout.cells("a").attachScheduler(new Date(2019,05,30),"week",null,sched1);
    sched1.load("/data/units")
        
    sched2 = Scheduler.getSchedulerInstance();
    dhxLayout.cells("b").attachScheduler(new Date(2019,05,30),"month",null,sched2);
    sched2.load("/data/units")
}
~~~


[Integration with dhtmlxLayout (dhx_terrace skin, Suite v5.1)](https://docs.dhtmlx.com/scheduler/samples/10_integration/05_dhtmlxlayout_terrace.html)


## dhtmlxSuite v6+

Начиная с dhtmlxSuite 6.0, dhtmlxLayout доступен только как часть полной библиотеки Suite. Для его использования необходимо приобрести лицензию на [библиотеку Suite 6.X](https://dhtmlx.com/docs/products/dhtmlxSuite/#licensing).

Начиная с [версии 5.3](guides/what-s-new.md#53), dhtmlxScheduler реализует общий интерфейс View, совместимый с dhtmlxSuite v6+, и может быть [подключён напрямую к любой ячейке](https://docs.dhtmlx.com/suite/layout/api/cell/layout_cell_attach_method/):

~~~js
// создаём и настраиваем экземпляр планировщика
scheduler.config.header = [
   "day",
   "week",
   "month",
   "date",
   "prev",
   "today",
   "next"
];
scheduler.config.multi_day = true;

// после подключения планировщика будет вызван onSchedulerReady
scheduler.attachEvent("onSchedulerReady", function () {
    requestAnimationFrame(function(){
        // здесь можно установить начальный вид, дату и загрузить данные
        scheduler.setCurrentView(new Date(2017,5,3), "week");
        scheduler.load("../common/events.json");
    });
    
});

const layout = new dhx.Layout("layout", {
    rows: [{
        id: "scheduler-cell",
        header: "Appointment Scheduler",
        html:"<div></div>"
    }]
});
layout.cell("scheduler-cell").attach(scheduler);
~~~

### Обратите внимание

- Учтите, что `dhtmlxSuite Layout` работает асинхронно, поэтому планировщик не будет готов сразу после вызова `.attach`.
- Необходимо отслеживать событие "onSchedulerReady" для выполнения любых задач после инициализации.
- В настоящее время **нет возможности указать разметку планировщика при использовании с dhtmlxSuite v6+**. Это означает, что элементы управления навигационной панели должны настраиваться через параметры [header](api/config/header.md).
