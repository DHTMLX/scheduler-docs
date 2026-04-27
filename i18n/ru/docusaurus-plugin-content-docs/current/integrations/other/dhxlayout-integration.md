--- 
title: "Интеграция с dhtmlxLayout"
sidebar_label: "Интеграция с dhtmlxLayout"
---

# Интеграция с dhtmlxLayout

:::warning
Описанная функциональность устарела и больше не поддерживается.
:::

Хороший способ разместить [несколько планировщиков](guides/multiple-per-page.md) на странице — использовать dhtmlxLayout. Он не только обеспечивает красивую рамку, но и гарантирует корректное взаимодействие с другими элементами на странице и поведение при изменении размера страницы.

:::note
Обратите внимание, что dhtmlxLayout не является частью библиотеки dhtmlxScheduler.
Существует две версии Layout на выбор, в зависимости от версии библиотеки dhtmlxSuite.
:::

## dhtmlxSuite v5+

В этой версии dhtmlxLayout может использоваться как отдельный продукт или как часть библиотеки dhtmlxSuite. Чтобы использовать dhtmlxLayout v5.X в вашем приложении, вам следует [приобрести лицензию](https://dhtmlx.com/docs/products/dhtmlxSuite/).

**Чтобы привязать экземпляр dhtmlxScheduler к ячейке макета**, используйте метод [attachScheduler()](https://docs.dhtmlx.com/api__dhtmlxcell_attachscheduler.html).

**Примечание**, привязывая планировщик к ячейке, он автоматически инициализируется. Поэтому сначала сконфигурируйте планировщик перед размещением его в макете.

~~~js
function init() {
    const dhxLayout = new dhtmlXLayoutObject(document.body, "2U");

    sched1 = Scheduler.getSchedulerInstance();
    sched1.config.multi_day = true;
    dhxLayout.cells("a").attachScheduler(new Date(2027,05,30),"week",null,sched1);
    sched1.load("/data/units")
        
    sched2 = Scheduler.getSchedulerInstance();
    dhxLayout.cells("b").attachScheduler(new Date(2027,05,30),"month",null,sched2);
    sched2.load("/data/units")
}
~~~

[Интеграция с dhtmlxLayout (sкин dhx_terrace, Suite v5.1)](https://docs.dhtmlx.com/scheduler/samples/10_integration/05_dhtmlxlayout_terrace.html)

## dhtmlxSuite v6+

Начиная с dhtmlxSuite 6.0, dhtmlxLayout нельзя получить отдельно от всей библиотеки Suite.
Если вы собираетесь использовать этот подход, вам следует приобрести лицензию на
[Suite 6.X library](https://dhtmlx.com/docs/products/dhtmlxSuite/#licensing).

dhtmlxScheduler версии [5.3](whats-new.md#53) и выше реализует общий интерфейс View, который используется в dhtmlxSuite v6+ и может быть
[прикреплён к любой ячейке напрямую](https://docs.dhtmlx.com/suite/layout/api/cell/layout_cell_attach_method/):

~~~js
// создайте и настройте экземпляр планировщика
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

// после привязки планировщика будет сгенерировано событие onSchedulerReady
scheduler.attachEvent("onSchedulerReady", function () {
    requestAnimationFrame(function(){
        // здесь можно задать начальный вид и дату и загрузить данные
        scheduler.setCurrentView(new Date(2027,5,3), "week");
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

- Обратите внимание, что `dhtmlxSuite Layout` асинхронен, планировщик не будет инициализирован сразу после вызова `.attach`.
- Вам нужно обработать событие "onSchedulerReady" для любых настроек после инициализации.
- В данный момент **нет способа задать разметку планировщика, когда он используется вместе с dhtmlxSuite v6+**, что означает, что вам нужно использовать конфигурацию [header](api/config/header.md) для указания элементов навигационной панели.