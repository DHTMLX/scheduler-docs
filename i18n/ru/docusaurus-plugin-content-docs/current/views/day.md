---
title: "Дневной вид"
sidebar_label: "Дневной вид"
---

# Дневной вид

Дневной вид отображает календарь для одного дня.

![day_view](/img/day_view.png)


## Инициализация

Дневной вид включён по умолчанию в [базовую разметку планировщика](guides/scheduler-markup.md). Это означает, что нет необходимости добавлять дополнительный код для активации этого вида в планировщике.

~~~js
// стандартная инициализация. Дневной вид добавляется автоматически
scheduler.init('scheduler_here', new Date(2027,0,10), "week");
...
scheduler.load("/data/events");
~~~


[Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)


## Удаление вкладки Дневного вида

Если вы хотите убрать вкладку Дневного вида из планировщика, просто удалите соответствующий div из [разметки планировщика](guides/scheduler-markup.md):

~~~js
// удалите этот div, чтобы скрыть вкладку Day
<div class="dhx_cal_tab" name="day_tab"></div>
~~~

## Связанные руководства

- [Общие инструкции по настройке](guides/configuration.md)
- [Шаблоны для дневного вида](views/day-view-templates.md)
- [Загрузка данных](guides/loading-data.md)
- [Операции с объектом события](guides/event-object-operations.md)
- [Блокировка и выделение дат](guides/limits.md)
- [Скины](guides/skins.md)
