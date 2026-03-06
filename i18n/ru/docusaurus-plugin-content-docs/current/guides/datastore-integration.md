---
title: "Интеграция с dhtmlxDataStore"
sidebar_label: "Интеграция с dhtmlxDataStore"
---

# Интеграция с dhtmlxDataStore

В этой статье описывается, как синхронизировать [несколько планировщиков](guides/multiple-per-page.md) с помощью объекта [dhtmlXDataStore](https://docs.dhtmlx.com/datastore__index.html). Планировщики получают данные из этого общего хранилища, поэтому любое изменение события в одном планировщике автоматически обновляется в других.

:::note
Обратите внимание: dhtmlxDataStore входит в пакет [dhtmlxSuite5](https://dhtmlx.com/docs/products/dhtmlxSuite5/) и не включён в dhtmlxScheduler по умолчанию. Однако, даже если у вас нет лицензии на dhtmlxSuite, вы всё равно можете бесплатно использовать dhtmlxDataStore с dhtmlxScheduler. Следуйте инструкциям ниже для настройки в вашем приложении.
:::

- [Скачайте пакет dhtmlxDataStore](https://files.dhtmlx.com/30d/33230caa09f4b5030ea5bfe374ef6d57/dhtmlxDataStore.zip)
- Добавьте *dhtmlxcommon.js* и *datastore.js* после загрузки dhtmlxscheduler.js на вашей странице. Важно соблюдать именно такой порядок подключения:

~~~js
<script src="dhtmlxscheduler.js"></script>
<script src="datastore/dhtmlxCommon/codebase/dhtmlxcommon.js"></script>
<script src="datastore/datastore.js"></script>
~~~

Типичный способ синхронизации планировщиков через DataStore выглядит так:

~~~js
function init() {
    var data = new dhtmlXDataStore({
        url:"data/data.json",
        scheme:{
            $init:function(obj){
                if (typeof obj.start_date == "string"){
                    obj.start_date = scheduler.templates.parse_date(obj.start_date);
                    obj.end_date = scheduler.templates.parse_date(obj.end_date);
                }
            }
        }
    });

    scheduler1 = Scheduler.getSchedulerInstance();
    scheduler1.init('scheduler_here',new Date(2019,05,12),"week");
    scheduler1.sync(data, { copy:true });
    

    scheduler2 = Scheduler.getSchedulerInstance();
    scheduler2.init('scheduler_here_too',new Date(2019,05,12),"month");
    scheduler2.sync(data, { copy:true });
}
~~~

Кратко о том, что происходит в приведённом выше коде:

1. Сначала мы инициализируем dhtmlXDataStore обычным способом (подробнее см. разделы [Инициализация](https://docs.dhtmlx.com/datastore__initialization.html) и [Схема данных](https://docs.dhtmlx.com/datastore__data_scheme.html) в [документации dhtmlXDataStore](https://docs.dhtmlx.com/datastore__index.html)).
2. Затем создаём два планировщика. Это делается стандартно, за исключением того, что мы используем метод [sync](https://docs.dhtmlx.com/api__datastore_sync.html) для их подключения к DataStore.

Метод [sync](https://docs.dhtmlx.com/api__datastore_sync.html) связывает планировщик с DataStore и принимает два параметра:

+ **data** - (обязательный) экземпляр dhtmlXDataStore, который предоставляет данные для планировщика.
+ **(copy:true)** - (обязательный) указывает планировщику создать собственную копию данных DataStore.

Второй параметр заслуживает особого внимания, так как он специфичен для dhtmlxScheduler и не описан в основной документации dhtmlXDataStore.

Эта опция инструктирует DataStore создавать отдельную копию данных для каждого планировщика. Таким образом, в приведённом примере _DataStore_, _scheduler1_ и _scheduler2_ имеют свои собственные наборы данных. Но вам не нужно заботиться о ручной синхронизации этих наборов - всё происходит автоматически. Когда вы что-то изменяете в одном планировщике, обновление отправляется в DataStore, который затем обновляет набор данных другого планировщика.

Может возникнуть вопрос, зачем нужен этот дополнительный шаг, если результат кажется одинаковым.

Вот почему: помимо основных свойств события, каждое событие содержит множество внутренних свойств, назначаемых Scheduler во время выполнения. Эти внутренние свойства могут изменяться в зависимости от выбранного представления. Например, если одно и то же событие открыто в обоих планировщиках, но отображается в разных представлениях, значения внутренних свойств могут рассинхронизироваться. Это несоответствие может привести к некорректному отображению события.

В таком случае использование параметра (**(copy:true)**) помогает избежать подобных проблем, обеспечивая корректную обработку данных. Кроме того, дублирование данных может быть полезно и в других ситуациях.

Например, если у вас на странице два планировщика, отображающих одни и те же события, но в разных часовых поясах (например, Москва и Лондон), совместное использование одного набора данных будет неудобно. Наличие отдельных наборов данных для каждого планировщика позволяет корректно отображать события в обоих поясах.


[Integration with dhtmlXDataStore](https://docs.dhtmlx.com/scheduler/samples/10_integration/04_datastore.html)
