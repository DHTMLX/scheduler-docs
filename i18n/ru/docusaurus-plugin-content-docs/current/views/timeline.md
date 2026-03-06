---
title: "Вид 'Timeline'"
sidebar_label: "Вид 'Timeline'"
---

# Вид "Timeline"

:::info
Данный вид доступен только в версии Scheduler PRO.
:::

Вид Timeline отображает события по горизонтали, организуя отдельные временные линии (таймлайны) бок о бок слева направо.

![timeline_view](/img/timeline_view.png)

## Инициализация {#initialization}

Чтобы добавить вид Timeline в планировщик, выполните следующие шаги:

1. Включите расширение Timeline на странице:
  
- Timeline - для режимов 'Bar' и 'Cell'
- Timeline, Treetimeline - для режима 'Tree'
- Timeline, Daytimeline - для режима 'Days'

~~~js
scheduler.plugins({
    timeline: true,
    treetimeline: true,
    daytimeline: true  
});
~~~ 

2. Добавьте вкладку вида в разметку планировщика:
~~~html
<div id="scheduler_here" class="dhx_cal_container" ...>
    <div class="dhx_cal_navline">
       ...
       <div class="dhx_cal_tab" name="timeline_tab"></div>
    </div>
    ...    
</div>
~~~
3. Установите метку для вкладки:
~~~js
//'timeline_tab' соответствует имени нашего div
scheduler.locale.labels.timeline_tab ="Timeline"; 
~~~
4. Вызовите метод [createTimelineView](api/method/createtimelineview.md):
~~~js
scheduler.createTimelineView({
     name:"timeline",
     x_unit:"minute", // единица измерения по оси X
     x_date:"%H:%i",  // формат даты на оси X
     x_step:30,       // шаг на оси X в 'x_unit'
     x_size:24,       // общее количество шагов 'x_step' на оси X
     x_start:16,      // смещение по оси X в 'x_unit'
     x_length:48,     // количество шагов 'x_step' для прокрутки за раз
     y_unit:          // секции, отображаемые по оси Y
        [{key:1, label:"Section A"},
         {key:2, label:"Section B"},
         {key:3, label:"Section C"},
         {key:4, label:"Section D"}],
     y_property:"section_id", // свойство для сопоставления данных с секциями
     render:"bar"             // режим отображения
});
~~~


[Bar mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/02_lines.html)


:::note
При использовании режима 'Days' временная шкала должна охватывать ровно один день. Если в конфигурации указана более короткая или длинная длительность, таймлайн будет отображаться некорректно.
:::


### Пример конфигурации шкалы

Хотя метод [createTimelineView](api/method/createtimelineview.md) включает множество параметров, его использование довольно просто.

Пример: временная шкала с 09:00 до 15:00 с шагом 30 минут и прокруткой по дням.

![timeline_scale_01](/img/timeline_scale_01.png)


~~~js
{
    x_unit:"minute",// единицы шкалы — минуты
    x_step:30,  // шаг 30 минут, например, 09:00 - 09:30
    x_size:12,  // количество 30-минутных интервалов между 09:00 и 15:00
                // 15 - 9 = 6 часов = 360 минут = 360/30 = 12
    x_start:18, // шкала начинается с 09:00, это 9 часов от 00:00
                // 9 часов = 540 минут = 540/30 = 18 шагов 'x_step'
    x_length:48,// прокрутка на один день: 1 день = 24 часа = 1440 минут = 1440/30 = 48 шагов 'x_step'
    ...
}
~~~


## Конфигурация вида Timeline {#timelineviewconfiguration}

Все функции-шаблоны с именами, содержащими *(timeline)_some*, должны определяться после создания вида, так как они динамически назначаются конструктором таймлайна и будут перезаписаны вызовом [createTimelineView](api/method/createtimelineview.md). 

### Установка начальной даты для Timeline

Например, вот как установить начальную дату для вида Timeline.

Начальная дата любого вида управляется функцией *scheduler.date[\<viewName\> +"_start"]*. Чтобы изменить первый день шкалы таймлайна, переопределите функцию *scheduler.date.timeline_start* после вызова *scheduler.createTimelineView()*:

~~~js
// неделя начинается с понедельника
scheduler.config.start_on_monday = true;

// создаём таймлайн
scheduler.createTimelineView({
    name: "timeline",
    render: "tree",
    days: 7,
    folder_dy: 20,
    x_unit: "day",
    x_date: "%D %j %F",
    x_step: 1,
    x_size: 7,
    x_start: 0,
    x_length: 7,
    y_unit:[],
    y_property: "section_id"
});

// переопределяем функцию начальной даты после создания
scheduler.date.timeline_start = scheduler.date.week_start;

// инициализируем планировщик
scheduler.init("timeline_tree", new Date(), "timeline");
~~~

## API объекта Timeline {#timelineobjectapi}

Существует несколько методов для взаимодействия с видом Timeline.

### Создание вида timeline

Для начала создайте экземпляр таймлайна в планировщике:

~~~js
scheduler.createTimelineView({
    name:'timeline',
    ...
});

var timeline = scheduler.matrix.timeline;
~~~

После создания можно использовать приведённые ниже методы.

### Получение объекта timeline

Чтобы получить объект таймлайна, используйте метод [getView](api/method/getview.md). Он принимает имя вида в качестве параметра. Если параметр не передан, возвращается текущий вид.

~~~js
var timeline = scheduler.getView(); 
timeline.x_size = 8;
scheduler.setCurrentView();
~~~

### Установка диапазона шкалы

Для задания диапазона шкалы используйте метод **setRange()**. Требуется два параметра:

- **startDate**    - (*Date*) начало диапазона
- **endDate** - (*Date*) конец диапазона

~~~js
timeline.setRange(startDate, endDate);
~~~

### Задание колонок в левой панели

Содержимое левой панели можно задать двумя способами.

По умолчанию она содержит одну колонку. Подписи секций берутся из свойства **label** объекта **y_unit**, который можно настроить с помощью шаблона [timeline_scale_label](api/template/timelinename_scale_label.md).

Чтобы определить несколько колонок, используйте свойство **columns** в методе [createTimelineView](api/method/createtimelineview.md):

~~~js
scheduler.createTimelineView({
  name:    "timeline",
  x_unit:    "minute",
  x_date:    "%H:%i",
  x_step:    30,
  x_size: 24,
  x_start: 16,
  x_length:    48,
  y_unit:    sections,
  event_dy: "full",
  y_property:    "section_id",
  render:"bar",
  columns: [
    { label: "Room #",  width: 70, template: function(obj){ return obj.room_no; } },
    { label: "Type",  width: 90, template: function(obj){ return obj.room_type; } },
    { label: "Status",  width: 90, template: function(obj){ return obj.room_status; } }
  ]
});

~~~

Каждый объект колонки может иметь следующие свойства:

- label - `string` - необязательная подпись заголовка
- width - `number` - необязательная ширина колонки
- template - `function` - шаблон ячейки, получает объект секции


[Timeline Sidebar columns](https://docs.dhtmlx.com/scheduler/samples/06_timeline/19_columns_sidebar.html)


### Прокрутка к определённой позиции/дате/секции

:::note
Эта функциональность работает только при включённой горизонтальной прокрутке Timeline.
:::

Для прокрутки к определённой точке используйте метод **scrollTo()**. Поддерживаются различные типы параметров:

- Прокрутка к определённой дате (Date):

~~~js
timeline.scrollTo(new Date());
~~~

- Прокрутка к определённой позиции по пикселям:

~~~js
timeline.scrollTo(500);
~~~

- Прокрутка горизонтально и вертикально к определённой секции на определённую дату (объект с date и section):

~~~js
timeline.scrollTo({date:new Date(), section:4});
~~~

- Прокрутка к определённой позиции по пикселям горизонтально и вертикально (объект с left и top):

~~~js
timeline.scrollTo({left:300, top:500});
~~~


### Получение координат определённой позиции

- Для получения X-координаты определённой даты на шкале используйте **posFromDate()** с параметром Date:

~~~js
var left = timeline.posFromDate(new Date());
~~~

:::note
Этот метод возвращает 0 или максимальную X-координату, если дата вне шкалы.
:::

- Для получения Y-координаты определённой строки используйте **getSectionTop()** с номером секции:

~~~js
var top = timeline.getSectionTop(section.key);
~~~

:::note
Возвращает -1, если строка не найдена.
:::


- Чтобы найти дату и секцию по определённым координатам таймлайна, используйте **resolvePosition()** с объектом `(left: number, top: number)`:

~~~js
const position = timeline.resolvePosition({top: 120, left: 400});
~~~


- Для получения `Date` по определённой координате `left` на временной шкале используйте **dateFromPos()**:

~~~js
const date = timeline.dateFromPos(300);
~~~

- Для получения координаты `top` определённого события используйте **getEventTop()** с объектом события:

~~~js
const top = timeline.getEventTop(scheduler.getEvent(event.id));
~~~


### Получение позиции скролла 

Чтобы узнать текущую позицию скроллбара, вызовите **timeline.getScrollPosition()**, который возвращает объект с координатами прокрутки:

~~~js
var timeline = scheduler.getView();
timeline.getScrollPosition(); // { left: 0, top: 0 } 
~~~

Возвращаемый объект содержит:

- **left** - (*number*) позиция горизонтального скролла
- **top** - (*number*) позиция вертикального скролла

Также можно отслеживать изменения скролла через событие **onScroll**, которое получает новые значения left и top:

~~~js
var timeline = scheduler.getView();
timeline.attachEvent("onScroll", function(left, top){});
~~~

 
### Получение событий, назначенных секции 

Чтобы получить массив событий, назначенных определённой секции, используйте **timeline.selectEvents()** с объектом конфигурации:

~~~js
{
    section: string|number,
    date: Date,
    selectNested: boolean 
}
~~~

где:

- **section** - id секции
- **date** - необязательно, фильтрует события, пересекающиеся с заданной датой
- **selectNested** - необязательно, если true и секция - папка в древовидном таймлайне, выбирает события всех вложенных секций

Метод возвращает массив объектов событий.

~~~js
var timeline = scheduler.getView();
 
var events = timeline.selectEvents({
    section: section.key,
    date: date,
    selectNested: true
});
~~~


## Динамическое изменение свойств {#dynamicshangeofproperties}

Все объекты таймлайна хранятся в объекте [scheduler.matrix](api/other/matrix.md).
Вы можете получить доступ к любому виду таймлайна по имени и обновить его свойства. Изменения вступают в силу после обновления планировщика:

~~~js
scheduler.getView('timeline').x_size = 12;
scheduler.setCurrentView(); // перерисовывает планировщик
~~~


Здесь 'timeline' соответствует имени, заданному в методе [createTimelineView](api/method/createtimelineview.md):

~~~js
scheduler.createTimelineView({
    name:'timeline',
    ...
});
~~~

### Динамическое изменение секций

Когда возникает необходимость обновить список ресурсов в представлении Timeline на лету, рекомендуется использовать методы [serverList](api/method/serverlist.md) и [updateCollection](api/method/updatecollection.md).

## Загрузка данных {#dataloading}

В отличие от более простых представлений, таких как День, Месяц или Год, многоресурсные представления, такие как Units и Timeline, требуют наличия в каждом элементе данных дополнительного обязательного поля:

* [y_property](api/method/createtimelineview.md) - (*string*) определяет свойство данных, используемое для привязки событий к определённым секциям.

![timeline_loading](/img/timeline_loading.png)

~~~js
scheduler.createTimelineView({
     name:"timeline",
     ...
     y_unit:     
        [{key:1, label:"Room 1"},
         {key:2, label:"Room 2"},
         {key:3, label:"Room 3"}],
     y_property:"room_id", 
});

scheduler.init('scheduler_here');
scheduler.parse([
    {text:"Conference",    start_date:"17/09/2012 12:00", end_date:"18/09/2012 21:00", 
    room_id:"1"},
     {text:"Meeting",     start_date:"17/09/2012 09:00", end_date:"17/09/2012 21:00", 
    room_id:"2"},
     {text:"Conference", start_date:"17/09/2012 15:00", end_date:"18/09/2012 15:00", 
    room_id:"3"}
]);                                 
~~~

[Bar mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/02_lines.html)


## Назначение событий нескольким секциям {#assignmentofeventstoseveralsections}

Планировщик поддерживает назначение событий сразу нескольким секциям.

![multiple_sections](/img/multiple_sections.png)


Чтобы включить эту возможность:

1. Подключите расширение **Multisection** на вашей странице
2. Установите свойство [multisection](api/config/multisection.md) в *true*
3. (Опционально) Добавьте расширение "Multiselect" для удобного управления [Multiselect](guides/multiselect.md) в планировщике, чтобы было проще переключаться между секциями

~~~html
<script src="codebase/dhtmlxscheduler.js"></script>
<link rel="stylesheet" href="codebase/dhtmlxscheduler.css" type="text/css">

<script>
    scheduler.plugins({
        multisection: true, /*!*/
        multiselect: true,
        timeline: true
    });
    scheduler.config.multisection = true; /*!*/
    scheduler.init('scheduler_here');
</script>
~~~

После настройки вы можете перечислить несколько секций (по умолчанию, разделённых запятыми, как указано в [section_delimiter](api/config/section_delimiter.md)) 
в соответствующем свойстве данных события, и событие будет отображаться во всех этих секциях:

~~~js
scheduler.createTimelineView({
    name: "timeline",
    y_unit: [
        {key: 1, label: "James Smith"},
        {key: 2, label: "John Williams"},
        {key: 3, label: "David Miller"},
        {key: 4, label: "Linda Brown"}],
    y_property: "section_id", /*!*/
    ...
});
scheduler.init('scheduler_here', new Date(2012, 5, 30), "timeline");

scheduler.parse([
    { id:1, text:"Task A", section_id:'1',         ...},/*!*/
    { id:2, text:"Task B", section_id:'1,3',     ...},/*!*/
    { id:3, text:"Task C", section_id:'4',         ...},/*!*/
    { id:4, text:"Task D", section_id:'2,3,4',     ...}/*!*/
]);
~~~


[Multisection events in Timeline and Units view](https://docs.dhtmlx.com/scheduler/samples/12_multisection_events/01_multisection_events.html)


## Режимы отображения {#viewmodes}

В представлении Timeline доступны четыре режима:

- **Bar**

 ![timeline_bar_mode](/img/timeline_bar_mode.png)

 
[Bar mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/02_lines.html)
 

 


- **Cell** (по умолчанию)

 ![timeline_cell_mode](/img/timeline_cell_mode.png)

 
[Cell mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/01_slots.html)
  

 


- **Tree**

 ![timeline_tree_mode](/img/timeline_tree_mode.png)

 
[Tree mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/03_tree.html)
 

 


- **Days**

 ![timeline_days_mode](/img/timeline_days_mode.png)

 
[Days as Timeline rows](https://docs.dhtmlx.com/scheduler/samples/06_timeline/14_days_as_sections.html)


Желаемый режим можно выбрать с помощью параметра [render](api/method/createtimelineview.md):

~~~js
scheduler.createTimelineView({
    name: "timeline",
    render: "bar"
});
~~~

## Особенности режима 'Days' {#daysmodedetails}

При использовании режима Days учитывайте следующее:

1. Шкала времени должна покрывать ровно один день. Если настроить на меньший или больший период, timeline может отображаться некорректно:
~~~js
scheduler.createTimelineView({
    name:"timeline", 
    render:"days", 
    days:7,   
    // шкала времени настроена на 1 день /*!*/
    x_unit:"minute", /*!*/
    x_date:"%H:%i",  /*!*/
    x_step:30,       /*!*/
    x_size:24,       /*!*/
    x_start:16       /*!*/
});
~~~
2. Этот режим не поддерживает [функционал блокировки и выделения](guides/limits.md)
3. Формат подписей Y-оси управляется шаблоном scale_label:
~~~js
scheduler.templates.timeline_scale_label = function(key, label, section){
    // используются те же подписи, что и в представлении Day
    return scheduler.templates.day_date(label); 
};
~~~
4. Для изменения начального дня отображаемого интервала используйте функцию scheduler.date.(timeline_name)_start:
~~~js
scheduler.date.timeline_start = function (date) {
    date = scheduler.date.week_start(date);
    date = scheduler.date.add(date, config.x_step*config.x_start, config.x_unit); 
    return date;
};
~~~


## Интервал времени для ячеек {#timeintervalforviewcells}

По умолчанию каждая ячейка охватывает интервал в один день, и события располагаются соответственно. Чтобы изменить этот интервал, например, чтобы сосредоточиться на рабочих часах и исключить менее актуальное время, можно воспользоваться одним из следующих способов:

- Параметры [first_hour](api/method/createtimelineview.md) и [last_hour](api/method/createtimelineview.md):

~~~js
// интервал ячейки ограничен днем с 10:00 до 18:00
scheduler.createTimelineView({
    name:"timeline",
    first_hour:10,
    last_hour:18
});
~~~


[Changing the time interval for the view cells](https://docs.dhtmlx.com/scheduler/samples/11_scales/06_timeline_hours.html)


- Функция **ignore_(viewName)**, где **viewName** соответствует опции *name* для созданного Timeline через [createTimelineView](api/method/createtimelineview.md).
Эта функция получает дату ячейки и возвращает 'true' для часов, которые должны быть исключены:

~~~js
// интервал ячейки ограничен днем с 10:00 до 18:00
scheduler.ignore_timeline = function(date){   // "timeline" — имя представления
    // исключить нерабочие часы
    if (date.getHours() < 10 || date.getHours() > 18) return true;
};
~~~

Подробнее о методе **ignore_(viewName)** см. в разделе [Скрытие единиц времени на оси X в представлении](guides/custom-scales.md).


[Hiding hours in the scale of Timeline view](https://docs.dhtmlx.com/scheduler/samples/11_scales/04_timeline_ignore.html)

  

![timeline_scale_interval](/img/timeline_scale_interval.png)

:::note
Имейте в виду, что игнорируемый интервал не может быть равен или больше общего интервала, установленного для timeline.
:::

Например, если timeline охватывает полный день и вы попытаетесь исключить весь день через функцию **ignore_(viewName)**, это не даст ожидаемого эффекта. Планировщик всё равно отобразит этот день, но без шкалы и событий.

Чтобы полностью исключить такие интервалы, необходимо динамически изменять настройку **x_length** внутри функции **scheduler._click.dhx_cal_next_button**. Например, чтобы полностью исключить выходные из timeline, используйте следующий подход:

~~~js
scheduler._click.dhx_cal_next_button = function(dummy,step){
  var mode = scheduler.getState().mode;
  var minDate = scheduler.getState().min_date;
  var formFunc = scheduler.date.date_to_str("%D");

  // пропустить выходные
  if(mode=='timeline'){    
  if((formFunc(minDate)=='Fri' && step!=-1) || (formFunc(minDate)=='Mon' && step==-1))
      scheduler.matrix['timeline'].x_length = 24*3;
    else                    
      scheduler.matrix['timeline'].x_length = 24;                
  }
 scheduler.setCurrentView(scheduler.date.add( 
 scheduler.date[scheduler._mode+"_start"](scheduler._date),(step||1),scheduler._mode));  
};
~~~

**Related sample** [Игнорирование выходных](https://snippet.dhtmlx.com/r48113ix)


## Данные для секций Y-оси в режимах 'Bar' и 'Cell' {#dataforyaxissectionsinthebarandcellmodes}

Для указания значений Y-оси в режимах 'Bar' и 'Cell' используйте параметр [y_unit](api/method/createtimelineview.md):

~~~js
scheduler.createTimelineView({
    name:"timeline",
    ...
    y_unit:[
        {key:1, label:"James Smith"},
        {key:2, label:"John Williams"},
        {key:3, label:"David Miller"},
        {key:4, label:"Linda Brown"}
    ]
});
~~~

Каждый элемент [y_unit](api/method/createtimelineview.md) должен содержать два обязательных свойства:

- **key** - уникальный идентификатор элемента
- **label** - текстовая метка элемента

## Данные для секций Y-оси в режиме 'Tree' {#dataforyaxissectionsinthetreemode}

Режим 'Tree' позволяет группировать элементы в многоуровневые папки, что не только улучшает организацию, но и позволяет назначать события на целые папки на любом уровне иерархии.


Для настройки 'Tree' timeline используйте тот же параметр [y_unit](api/method/createtimelineview.md), что и в режимах 'Bar' и 'Cell', но с дополнительными свойствами:

~~~js
scheduler.createTimelineView({
    name:   "timeline",
    render:"tree",
    ...
    y_unit:[
        {key:"production", label:"Production Department", children:[
            {key:"p1", label:"Managers", children:[
                {key:"pm1", label:"John Williams"},
                {key:"pm2", label:"David Miller"}
            ]},
            {key:"p2", label:"Linda Brown"},
            {key:"p3", label:"George Lucas"}
        ]},
        {key:"sales", label:"Sales and Marketing", children:[
            {key:"s1", label:"Kate Moss"},
            {key:"s2", label:"Dian Fossey"}
        ]}
    ]
});
~~~

Элементы [y_unit](api/method/createtimelineview.md) включают:

- Два обязательных свойства:
  - **key** - id элемента
  - **label** - метка элемента
- Два необязательных свойства:
  - **open** - должна ли секция быть изначально раскрыта
  - **children** - массив вложенных объектов

## Данные для секций Y-оси в режиме 'Days' {#dataforyaxissectionsinthedaysmode}

Для режима 'Days' укажите количество дней на Y-оси с помощью параметра [days](api/method/createtimelineview.md):

~~~js
scheduler.createTimelineView({
    name:"timeline",
    ...
    days:7 // количество дней на Y-оси
});
~~~


## Данные для секций Y-оси с сервера {#dataforyaxissectionsfromtheserver}

Для загрузки секций Y-оси с сервера используйте:

- На клиенте - метод [serverList](api/method/serverlist.md):

~~~js
scheduler.createTimelineView({
    name:"timeline",
    ...
    y_unit:scheduler.serverList("sections"),
});
~~~

*Здесь [serverList](api/method/serverlist.md) получает список опций с именем 'sections'.*

- На сервере 

Ответ для метода [load](api/method/load.md) должен включать коллекцию с именем server list в формате JSON, как описано в [Примеры форматов данных](guides/data-formats.md#json-with-collections).

Также можно использовать коннектор [OptionsConnector](https://docs.dhtmlx.com/connector__php__optionsconnector.html):

~~~php
<?php
    include('connector-php/codebase/scheduler_connector.php');// подключение файла

    $res="mysql_connect(""localhost","root","");// подключение к серверу БД
    mysql_select_db("sampleDB");// выбор БД

    $list = new OptionsConnector($res, $dbtype);
    $list->render_table("types","type_id","type_id(value),name(label)");
    
    $scheduler = new schedulerConnector($res, $dbtype);
    // задаём то же имя, что и на клиенте — 'sections'
    $scheduler->set_options("sections", $list); 
    $scheduler->render_table("events","id","start_date,end_date,text,type_id");
?>
~~~

![server_list_db](/img/server_list_db.png)

Ответ должен соответствовать [формату JSON](guides/data-formats.md#json-with-collections) и включать объект "collections" с необходимыми коллекциями, на которые ссылается [serverList](api/method/serverlist.md).


Можно также создавать коллекции вручную без использования dhtmlxConnector. В этом случае для обновления коллекции используйте метод [updateCollection](api/method/updatecollection.md):

~~~js
scheduler.updateCollection("sections", new_sections_array);
~~~


[Loading Units sections from the server](https://docs.dhtmlx.com/scheduler/samples/03_extensions/17_connector_units.html)


## Динамическое добавление/удаление элементов {#dynamicadditionremovalofitems}

Для динамического добавления или удаления секций доступны методы:

- [addSection](api/method/addsection.md) 
- [deleteSection](api/method/deletesection.md)

~~~js
scheduler.createTimelineView({
    name:   "timeline",
    render:"tree",
    ...
    y_unit:[
        {key:"production", label:"Production Department", children:[
            {key:"p1", label:"Managers", children:[
                {key:"pm1", label:"John Williams"},
                {key:"pm2", label:"David Miller"}
            ]},
            {key:"p2", label:"Linda Brown"},
            {key:"p3", label:"George Lucas"}
        ]},
        {key:"sales", label:"Sales and Marketing", children:[
            {key:"s1", label:"Kate Moss"},
            {key:"s2", label:"Dian Fossey"}
        ]}
    ]
});
scheduler.addSection( {key:"pm3", label:"James Smith"}, "p1");
scheduler.addSection( {key:"s3", label:"Alex White"}, "sales");
scheduler.deleteSection("p3");
~~~

:::note
Методы [addSection](api/method/addsection.md) и [deleteSection](api/method/deletesection.md) требуют активного режима 'Tree' в timeline.
:::

## Вторая ось X {#secondxaxis}

Верхнюю часть основной оси времени можно дополнительно сгруппировать, добавив вторую ось X.

![timeline_second_axis](/img/timeline_second_axis.png)

Для добавления второй шкалы используйте параметр [second_scale](api/method/createtimelineview.md): 

~~~js
 scheduler.createTimelineView({
    name:    "timeline",
    ...
    second_scale:{
        x_unit: "day", // единица измерения оси (по умолчанию 'minute')
        x_date: "%F %d" // формат даты ("July 01")
    }
});
~~~


[Second time scale (X-Axis)](https://docs.dhtmlx.com/scheduler/samples/06_timeline/07_second_scale.html)


## Растягивание событий на всю ячейку {#stretchingeventsoverthecell}

Чтобы событие занимало всю ширину ячейки вне зависимости от своей длительности, включите параметр [round_position](api/method/createtimelineview.md):

~~~js
scheduler.createTimelineView({
    name:"timeline",
    render:"bar",
    ...
    round_position:true
});
~~~

С **round_position:false** (по умолчанию):

![stretching_events_01](/img/stretching_events_01.png)


С **round_position:true**:

![stretching_events_02](/img/stretching_events_02.png)


## Сортировка событий {#sortingofevents}

По умолчанию события в Timeline сортируются по дате начала. Чтобы применить свою логику сортировки, передайте функцию в параметр [sort](api/method/createtimelineview.md).

Эта функция получает пару соседних событий и возвращает:

- **1** - если первое событие должно идти перед вторым
- **-1** - если второе событие должно идти перед первым
- **0** - если они равны

~~~js title="Сортировка по длине текста"
scheduler.createTimelineView({
    name:   "timeline",
    render:"bar",
    ...
    sort:function(a, b){
        if (a.text.length > b.text.length) {
            // a идёт перед b
            return -1;
        } else if(a.text.length < b.text.length) {
            return 1;
        } else{
            return +a.start_date > +b.start_date ? 1 : -1;
        }
    }
});
~~~


## Горизонтальный скролл {#horizontalscroll}

В Timeline поддерживается горизонтальная прокрутка для навигации по дням, неделям или месяцам без использования кнопок навигации.

Чтобы включить горизонтальный скроллинг, задайте свойство **scrollable** в методе [createTimelineView](api/method/createtimelineview.md). Также можно настроить **column_width** и **scroll_position** как показано ниже:

~~~js
scheduler.createTimelineView({
    name: "timeline",
    x_unit:    "minute",
    x_date:    "%H:%i",
    x_step:    30,
    x_size: 24*7,
    x_start: 16,
    x_length: 48,
    y_unit:    sections,
    y_property:    "section_id",
    render: "bar",
    scrollable: true, /*!*/ 
    column_width: 70, /*!*/
    scroll_position:new Date(2018, 0, 15) /*!*/  
});
~~~

- **scrollable** - (*boolean*) включает горизонтальную прокрутку; по умолчанию *false*. Если *false* или не задано, колонки сжимаются по ширине timeline. Если *true*, ширина колонок не будет меньше **column_width**, и появится полоска прокрутки при необходимости.
- **column_width** - (*number*) необязательный, задаёт минимальную ширину колонок timeline; по умолчанию 100.
- **scroll_position** - (*Date*) необязательный, задаёт начальную позицию скролла timeline, принимает те же значения, что и `timeline.scrollTo()`.

В режиме scrollable в Timeline по умолчанию включён **smart rendering**. Это оптимизирует производительность за счёт отрисовки только видимых строк, колонок и событий, остальные подгружаются по мере прокрутки.


[Horizontal scroll for Timeline view](https://docs.dhtmlx.com/scheduler/samples/06_timeline/16_lines_performance.html)


:::note
Имейте в виду, что прокрутка timeline не бесконечна, диапазон времени ограничен. Для перехода между интервалами времени всё равно нужны элементы навигации.
:::


## Настройка автоскролла {#autoscrollconfiguration}

Автоскролл активируется по умолчанию при перемещении или изменении размера события возле краёв видимой области timeline.

Вы можете настроить чувствительность и скорость автоскролла через объект **autoscroll** внутри метода [createTimelineView](api/method/createtimelineview.md):

~~~js
scheduler.createTimelineView({
    name:"timeline",
    ...
    autoscroll: {            /*!*/
        range_x: 200,         /*!*/
        range_y: 100,         /*!*/
        speed_x: 20,          /*!*/
        speed_y: 10            /*!*/
    }                        /*!*/
});
~~~

- **range_x** - (*number*) горизонтальное расстояние до края viewport для активации автоскролла
- **range_y** - (*number*) вертикальное расстояние до края viewport для активации автоскролла
- **speed_x** - (*number*) скорость горизонтального автоскролла
- **speed_y** - (*number*) скорость вертикального автоскролла

## Заголовок колонки секций {#headerofthesectionscolumn}

По умолчанию заголовок над колонкой секций пустой. Добавить метку можно через объект [locale](api/other/locale.md) следующим образом:

~~~js
scheduler.locale.labels.<timelineName>_scale_header = "Label";
~~~

Замените \<timelineName\> на имя вашего timeline из [createTimelineView](api/method/createtimelineview.md). Например:

~~~js
scheduler.locale.labels.timeline_scale_header = "Users";
~~~

## Пользовательский контент в ячейках {#customcontentincells}

Возможно отображение собственного контента внутри ячеек Timeline, не только в режиме Cell, как показано в этом примере:


[Cell mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/01_slots.html)


Также можно определить шаблон для содержимого ячеек во всех режимах Timeline.

![Пользовательский контент в ячейках Timeline](/img/custom_cell_content.png)


[Display labels in timeline cells](https://docs.dhtmlx.com/scheduler/samples/06_timeline/17_timeline_cell_content.html)


Чтобы включить эту возможность для конкретного timeline, задайте свойство **cell_template** при создании timeline через [createTimelineView](api/method/createtimelineview.md):

~~~js
scheduler.createTimelineView({
    cell_template: true,
    ...
});
~~~

После этого будет вызван указанный шаблон. Например, следующий пример показывает количество событий на дату в режиме "tree":

~~~js
<style>
    .dhx_matrix_cell div.load-marker{
        position: absolute;
        width: 40%;
        height: 25px;
        transform: translate(70%, 20%);
        line-height: 25px;
        text-align: center;
        border-radius: 7px;
        color: white;
    }
    .load-marker-no{
        background: #e0e0e0;
    }
    .load-marker-light{
        background: #aed581;
    }
    .load-marker-high{
        background: #ff8a65;
    }

</style>

scheduler.templates.timeline_cell_value = function (evs, date, section){
    if(section.children){
        var timeline = scheduler.getView();
 
        var events = timeline.selectEvents({
            section: section.key,
            date: date,
            selectNested: true
        });
 
        var className = "";
        if(!events.length){
            className = "load-marker-no";
        }else if(events.length < 3){
            className = "load-marker-light";
        }else{
            className = "load-marker-high";
        }
 
        return "<div class='load-marker "+className+"'>"+
            events.length
        +"</div>";
 
    }
 
    return "";
};
~~~


[Display labels in timeline cells](https://docs.dhtmlx.com/scheduler/samples/06_timeline/17_timeline_cell_content.html)


## Изменение высоты секций {#changingheightsofsections}

По умолчанию высота секций и событий задаётся настройками **dy** и **event_dy** в [createTimelineView](api/method/createtimelineview.md).

Если объект секции содержит свойство **height**, его значение переопределит настройку **dy**:

~~~js

scheduler.createTimelineView({
    name:    "timeline",
    ...
    y_unit:    [
        {key: 1, label: "Room 1", height: 60},
        {key: 2, label: "Room 2", height: 60},
        {key: 3, label: "Room 3", height: 120},
        {key: 4, label: "Room 4", height: 900},
    ],
~~~

Также можно динамически изменять свойство **height** после инициализации планировщика.


[Collapse timeline rows](https://docs.dhtmlx.com/scheduler/samples/06_timeline/18_collapse_section.html)


## Связанные руководства

- [Общие инструкции по настройке](guides/configuration.md)
- [Шаблоны представления Timeline](views/timeline-view-templates.md)
- [Загрузка данных](guides/loading-data.md)
- [Блокировка и выделение дат](guides/limits.md)
- [Скины](guides/skins.md)
- [Локализация](guides/localization.md)
