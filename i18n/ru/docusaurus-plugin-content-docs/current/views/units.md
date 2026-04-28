---
title: "Units View"
sidebar_label: "Units View"
---

# Units View 

:::info
Данный вид доступен исключительно в версии Scheduler PRO.
:::

Вид Units организует ось X на основе определённого свойства событий, а не только времени.

![units_view](/img/units_view.png)

## Инициализация {#initialization}

Чтобы добавить Units view в планировщик, выполните следующие шаги:

1. Включите расширение Units на странице:
~~~js
scheduler.plugins({
    units: true
});
~~~
2. Добавьте вкладку вида в разметку планировщика:
~~~html
<div id="scheduler_here" class="dhx_cal_container" ...>
    <div class="dhx_cal_navline">
       ...
       <div class="dhx_cal_tab" name="unit_tab"></div>
    </div>
    ...    
</div>
~~~
3. Задайте метку для вкладки:
~~~js
//'unit_tab' — это имя нашего div
scheduler.locale.labels.unit_tab = "Unit"
~~~
4. Используйте метод [createUnitsView](api/method/createunitsview.md) для создания вида:
~~~js
scheduler.createUnitsView({
    name:"unit",
    property:"unit_id", // свойство события для отображения юнитов
    list:[              // определяет юниты, отображаемые в виде
        {key:1, label:"Section A"},
        {key:2, label:"Section B"},
        {key:3, label:"Section C"}  
    ]
});
~~~


[Units view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/02_units_view.html)


## Загрузка данных в вид {#loadingdatatotheview}

В отличие от стандартных видов, таких как Day, Month или Year, многоресурсные виды, такие как Units и Timeline, требуют наличия дополнительного обязательного поля в событиях:

* [property](api/method/createunitsview.md) - (string) имя свойства данных, используемого для назначения событий определённым юнитам

~~~js
scheduler.createUnitsView({
    name:"unit",
    property:"unit_id", 
    list:[             
        {key:1, label:"Section A"},
        {key:2, label:"Section B"},
        {key:3, label:"Section C"}  
    ]
});

scheduler.init('scheduler_here');
scheduler.parse([
    {id:1, text:"Task1", start_date:"2027-09-17 12:00", end_date:"2027-09-18 21:00", 
    unit_id:"1"},
     {id:2, text:"Task2", start_date:"2027-09-17 09:00", end_date:"2027-09-17 21:00", 
    unit_id:"3"},
     {id:3, text:"Task3", start_date:"2027-09-17 15:00", end_date:"2027-09-18 15:00", 
    unit_id:"2"}
]);                                 
~~~
События назначаются юнитам по совпадению значения **unit_id** с соответствующим **list.key**.


[Units view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/02_units_view.html)


## Динамическое изменение секций {#changingsectionsdynamically}

Для динамического обновления списка юнитов в Units view используйте методы [serverList](api/method/serverlist.md) и [updateCollection](api/method/updatecollection.md).

## Отображение юнитов на несколько дней {#displayingunitsformultipledays}

Чтобы отобразить юниты, охватывающие несколько дней, используйте параметр [days](api/method/createunitsview.md):

~~~js
scheduler.createUnitsView({
    name:"week_unit",
    property:"section_id",
    list:sections,
    days:3 /*!*/
});
~~~

![multiday_units](/img/multiday_units.png)


[Multiday Units view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/31_units_view_multiple_days.html)


Это добавит вторую горизонтальную шкалу, отображающую дни.

 Для настройки формата этой второй шкалы используйте шаблон scheduler.templates[name+"_second_scale_date"]:

~~~js
scheduler.templates.units_second_scale_date = function(date) {
    return scheduler.templates.week_scale_date(date);
};
~~~

Обратите внимание:

1. Первая шкала определяется как обычно с помощью scale_text_template. Высоту можно настроить через [scale_height](api/other/xy.md).
2. Вы можете скрыть ненужные временные интервалы во второй горизонтальной шкале, следуя подходу, описанному в [Скрытие единиц времени на оси X в представлении](guides/custom-scales.md).
3. Параметры [size](api/method/createunitsview.md) и [step](api/method/createunitsview.md) не применяются к мультидневным юнитам.
4. Экспорт в PDF поддерживается только с [новым сервисом](export/pdf.md), а не с [старыми инструментами экспорта](export/pdf-legacy.md).
5. Чтобы изменить начальный день отображаемого интервала, используйте функцию scheduler.date.(units_name)_start:
~~~js
scheduler.date.units_start = function (date) {
    return scheduler.date.week_start(date);
};
~~~ 


## Назначение событий нескольким юнитам {#assigningeventstoseveralunits}

Начиная с версии 4.1, появилась возможность назначать события нескольким юнитам одновременно.

![multiple_sections](/img/multiple_sections.png)


Для включения этой функции:

1. Активируйте расширение **Multisection** на странице
2. Установите свойство [multisection](api/config/multisection.md) в *true*
3. (Необязательно) Активируйте расширение "multiselect", чтобы использовать контрол [Multiselect](guides/multiselect.md) для удобного переключения секций

~~~js
<script src="codebase/dhtmlxscheduler.js"></script>
<link rel="stylesheet" href="codebase/dhtmlxscheduler.css" type="text/css">

<script>
    scheduler.plugins({
        multisection: true, /*!*/
        multiselect: true,
        units: true
    });
    scheduler.config.multisection = true; /*!*/
    scheduler.init('scheduler_here');
</script>
~~~


После этого вы можете указать несколько секций (по умолчанию разделитель - запятая, см. [section_delimiter](api/config/section_delimiter.md)) в соответствующем свойстве события, и оно будет отображаться во всех этих юнитах:

~~~js
scheduler.createUnitsView({
    name: "unit",
    list: [
        {key: 1, label: "James Smith"},
        {key: 2, label: "John Williams"},
        {key: 3, label: "David Miller"},
        {key: 4, label: "Linda Brown"}],
    property: "section_id", /*!*/
    ...
});
scheduler.init('scheduler_here', new Date(2027, 5, 30), "unit");

scheduler.parse([
    { id:1, text:"Task A", section_id:'1',         ...},/*!*/
    { id:2, text:"Task B", section_id:'1,3',     ...},/*!*/
    { id:3, text:"Task C", section_id:'4',         ...},/*!*/
    { id:4, text:"Task D", section_id:'2,3,4',     ...}/*!*/
]);
~~~


[Multisection events in Timeline and Units view](https://docs.dhtmlx.com/scheduler/samples/12_multisection_events/01_multisection_events.html)


## Данные для секций оси X {#dataforthexaxissections}

Значения, отображаемые на оси X, задаются через параметр [list](api/method/createunitsview.md):

~~~js
scheduler.createUnitsView({
    name:"unit",
    ...
    list:[
        {key:1, label:"Section A"},
        {key:2, label:"Section B"},
        {key:3, label:"Section C"} 
    ]
});
~~~

Каждый элемент [list](api/method/createunitsview.md) должен содержать два обязательных свойства:

- **key** - уникальный идентификатор
- **label** - отображаемое имя

## Данные для секций оси X с сервера {#dataforthexaxissectionsfromtheserver}

Для загрузки данных секций с сервера используйте:

- На клиенте - метод [serverList](api/method/serverlist.md):

~~~js
scheduler.createUnitsView({
    name:"unit",
    property:"type_id",
    list:scheduler.serverList("units"),
    size:20,                                     
    step:1
});
~~~
*где [serverList](api/method/serverlist.md) возвращает список с именем 'units'*.

- На сервере 

Ответ для метода [load](api/method/load.md) должен включать коллекцию с именем серверного списка, отформатированную в JSON следующим образом:

~~~js
{ 
   "data":[
      {
          "id":"1",
          "start_date":"2027-03-02 15:00:00",
          "end_date":"2027-03-04 16:00:00",
          "text":"Team meeting",
          "type_id":"1"
      },
      {
          "id":"2",
          "start_date":"2027-03-02 17:00:00",
          "end_date":"2027-03-04 18:00:00",
          "text":"Strategy meeting",
          "type_id":"2"
      }
   ], 
   "collections": {/*!*/
      "units":[/*!*/      
         {"value":"1","label":"Conference room 1"},/*!*/
         {"value":"2","label":"Conference room 2"},/*!*/
         {"value":"3","label":"Conference room 3"}/*!*/
      ]/*!*/
   }/*!*/
}

~~~


В качестве альтернативы можно использовать коннектор [OptionsConnector](https://docs.dhtmlx.com/connector__php__optionsconnector.html):

~~~php
<?php
    include('connector-php/codebase/scheduler_connector.php');//подключение файла

    $res="mysql_connect(""localhost","root","");//подключение к серверу с БД
    mysql_select_db("sampleDB");//подключение к БД, 'sampleDB' — имя БД

    $list = new OptionsConnector($res, $dbtype);
    $list->render_table("types","type_id","type_id(value),name(label)");
    
    $scheduler = new schedulerConnector($res, $dbtype);
    //используем то же имя, что и на клиенте — 'units'
    $scheduler->set_options("units", $list); 
    $scheduler->render_table("events","id","start_date,end_date,text,type_id");
?>
~~~

![server_list_db](/img/server_list_db.png)


Также можно сформировать коллекцию вручную без использования dhtmlxConnector. В этом случае обновите коллекцию методом [updateCollection](api/method/updatecollection.md):

~~~js
scheduler.updateCollection("units", new_sections_array);
~~~


[Loading Units sections from the server](https://docs.dhtmlx.com/scheduler/samples/03_extensions/17_connector_units.html)


## Прокрутка юнитов {#scrollingunits}

Если юнитов много, для горизонтальной прокрутки можно использовать параметры [size](api/method/createunitsview.md) и [step](api/method/createunitsview.md):

~~~js
scheduler.createUnitsView({
    name:"unit",
    ...
    size:10, // количество видимых юнитов одновременно
    step:5   // количество юнитов для прокрутки за шаг
});
~~~

![Units scrolling](/img/units_scroll.png)


[Horizontal scrolling sections in Units view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/18_scroll_units.html)


## Пропуск событий, не относящихся ни к одному юниту {#skippingeventsthatdontbelongtoanyoftheunits}

По умолчанию события, не совпадающие ни с одним из определённых юнитов, отображаются в первом юните. Начиная с версии 3.0, вы можете полностью пропускать такие события.

Для этого установите свойство [skip_incorrect](api/method/createunitsview.md):

~~~js 
scheduler.createUnitsView({
    name:"unit",
    ...
    skip_incorrect:true
});

~~~


## Связанные руководства

- [Общие инструкции по настройке](guides/configuration.md)
- [Шаблоны Units View](views/units-view-templates.md)
- [Загрузка данных](guides/loading-data.md)
- [Операции с объектом события](guides/event-object-operations.md)
- [Блокировка и выделение дат](guides/limits.md)
- [Скины](guides/skins.md)
