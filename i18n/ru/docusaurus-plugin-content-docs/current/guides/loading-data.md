---
title: "Загрузка данных"
sidebar_label: "Загрузка данных"
---

# Загрузка данных

dhtmlxScheduler поддерживает загрузку данных в трех форматах:

1. JSON;
2. XML;
3. ICal.

[Примеры форматов данных](guides/data-formats.md)

## Загрузка данных из встроенного набора данных {#loadingdatafromaninlinedataset}

Для загрузки данных непосредственно из встроенного набора используется метод [parse](api/method/parse.md):


~~~js
scheduler.init('scheduler_here',new Date(2009,10,1),"month");
...
scheduler.parse([
    {text:"Meeting",    start_date:"2019-04-11 14:00", end_date:"2019-04-11 17:00"},
    {text:"Conference", start_date:"2019-04-15 12:00", end_date:"2019-04-18 19:00"},
    {text:"Interview",  start_date:"2019-04-24 09:00", end_date:"2019-04-24 10:00"}
],"json");

~~~


[Displaying events as a cascade](https://docs.dhtmlx.com/scheduler/samples/02_customization/24_cascade_event_display.html)


## Загрузка данных из файла {#loadingdatafromadatafile}

Для загрузки данных из внешнего файла используется метод [load](api/method/load.md):

~~~js
scheduler.init('scheduler_here',new Date(2018,10,1),"month");
...
scheduler.load("data.json"); //загрузка данных из файла
~~~


[Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)


## Загрузка данных из базы данных {#loadingdatafromadatabase}

Существует два подхода к загрузке данных из базы данных. Оба требуют обработки на клиентской и серверной сторонах.

1) Первый подход использует REST API для взаимодействия с сервером.

- Реализация на сервере зависит от выбранного фреймворка.
Например, в Node.js добавляется маршрут сервера для URL, по которому Scheduler отправляет AJAX-запрос.

Этот маршрут формирует ответ в формате JSON.

~~~js
app.get('/data', function(req, res){
    db.event.find().toArray(function(err, data){
        //установка свойства id для всех записей
        for (var i = 0; i < data.length; i++)
            data[i].id = data[i]._id;
        
        //вывод ответа
        res.send(data);
    });
});
~~~

- На клиентской стороне используется метод [load](api/method/load.md) с указанием URL, по которому Scheduler будет запрашивать данные:

~~~js title="Loading from a database. Client-side code"
scheduler.init('scheduler_here', new Date(), "month");
scheduler.load("apiUrl");
~~~

:::note
Более подробная информация о серверной интеграции с REST API доступна в статье [Интеграция с серверной стороной](guides/server-integration.md).
:::

2) Второй подход предполагает загрузку данных из таблиц базы данных с помощью [PHP Connector](https://docs.dhtmlx.com/connector__php__index.html).

- На серверной стороне реализуется скрипт, возвращающий данные в формате XML или JSON:
  
~~~js title="Static loading from db. Server-side code"
include ('dhtmlxConnector/codebase/scheduler_connector.php');
 
$res="mysql_connect(""localhost","root","");
mysql_select_db("sampleDB");
 
$calendar = new SchedulerConnector($res);
$calendar->render_table("events","id","event_start,event_end,text","type");
~~~

- На клиентской стороне используется метод [load](api/method/load.md) с указанием пути к серверному скрипту:
  
~~~js title="Static loading from db. Client-side code"
scheduler.init('scheduler_here', new Date(), "month");
scheduler.load("events.php");
~~~


:::note
Дополнительные подробности приведены в руководстве [dhtmlxScheduler с dhtmlxConnector](integrations/other/howtostart-connector.md).
:::

## Загрузка данных из нескольких источников {#loadingdatafrommultiplesources}

Для загрузки данных из нескольких источников доступно расширение **multisource**:

~~~js
scheduler.plugins({
   multisource: true
});
~~~

:::note
Несколько источников могут использоваться как для статической, так и для динамической загрузки.
:::

После подключения соответствующего файла, метод [load](api/method/load.md) может принимать массив источников:

~~~js
scheduler.load(["first/source/some","second/source/other"]);
~~~

## Свойства данных {#dataproperties}
-------------------------  

### Обязательные свойства

Для корректного разбора данных каждой записи необходимы как минимум три свойства:

- **start_date** -  (*string*) дата начала события;
- **end_date** - (*string*) дата окончания события;
- **text** - (*string*) описание события.

При загрузке из базы данных требуется дополнительное обязательное свойство:

- **id** -  (*string, number*) идентификатор события.

По умолчанию, для данных в формате JSON и XML используется формат даты **'%Y-%m-%d %H:%i'** (см. [спецификацию формата даты](guides/settings-format.md)).

 Для изменения формата используйте опцию [date_format](api/config/date_format.md).

~~~js
scheduler.config.date_format="%Y-%m-%d %H:%i";
...
scheduler.init('scheduler_here', new Date(2019, 3, 18), "week");
~~~

### Пользовательские свойства

Помимо обязательных полей, к данным можно добавлять пользовательские свойства. Дополнительные свойства разбираются как строки и могут использоваться на клиентской стороне по необходимости.

Примеры данных с пользовательскими свойствами доступны [здесь](guides/data-formats.md#datawithcustomproperties).

## Структура базы данных {#databasestructure}

При создании базы данных для событий планировщика ожидается следующая структура:

- **таблица events** - хранит события планировщика
    - **id** - (*string/int/guid*) - идентификатор события. Первичный ключ с автоинкрементом.
    - **start_date** - (*DateTime*) - дата начала события, не может быть пустой.
    - **end_date** - (*DateTime*) - дата окончания события, не может быть пустой.
    - **text** - (*string*) - описание события.

Для повторяющихся событий требуются дополнительные столбцы:

- **таблица events** - хранит события планировщика
    - **id** - (*string/int/guid*) - идентификатор события. Первичный ключ с автоинкрементом.
    - **start_date** - (*DateTime*) - дата начала события, не может быть пустой.
    - **end_date** - (*DateTime*) - дата окончания события, не может быть пустой.
    - **text** - (*string*) - описание события.
    - **event_pid** - (*string/int/guid*) - ссылка на id родительской серии событий. Может быть пустым или по умолчанию пустая строка/ноль.
    - **event_length** - (*string/bigint*) - длительность события или отметка времени измененного вхождения. Может быть пустым или по умолчанию пустая строка/ноль. Максимальная длина (для строк) - 10.
    - **rec_type** - (*string*) - правило повторения. Может быть пустым или по умолчанию пустая строка. Максимальная длина - 50.

Дополнительные столбцы могут быть добавлены по необходимости; они будут доступны через клиентский API.

## Динамическая загрузка {#dynamic-loading}
--------------------  
 
По умолчанию dhtmlxScheduler загружает все данные сразу, что может быть неэффективно при больших объемах данных. Динамическая загрузка позволяет получать данные частями, ограниченными текущей видимой областью.

### Техника

Включите динамическую загрузку с помощью метода [setLoadMode](api/method/setloadmode.md):
~~~js title="Enabling the dynamic loading"
scheduler.setLoadMode("month");
scheduler.load("some.php");
~~~

Метод принимает режим загрузки, определяющий объем данных для загрузки: *day, week, month* или *year*.

Например, при установке режима 'week' планировщик будет запрашивать данные только для текущей недели, подгружая дополнительные данные по мере необходимости.


#### Как работают режимы загрузки

Режимы загрузки определяют интервал данных, который загружается для выбранного периода. Например, при открытии представления Неделя для дат с 2018-01-29 по 2018-02-05:

- Для режима "day"

~~~js
scheduler.setLoadMode("day");
~~~

Планировщик запрашивает данные по дням, например, с 2018-01-29 по 2018-02-05.

- Для режима "month"

~~~js
scheduler.setLoadMode("month");
~~~

Планировщик запрашивает данные по полным месяцам, например, с 2018-01-01 по 2018-03-01.

- Для режима "year"

~~~js
scheduler.setLoadMode("year");
~~~

Планировщик запрашивает данные по полным годам, например, с 2018-01-01 по 2019-01-01.

Запрашиваемый интервал всегда не меньше отображаемого.

Интервал загрузки влияет на:

- частоту динамических запросов

Большие интервалы уменьшают частоту запросов, так как уже полученные данные кэшируются.

- длительность обработки каждого запроса

Большие интервалы означают больше данных за один запрос, что увеличивает время обработки.

#### Запрос

Запросы имеют следующий формат:

~~~js
some.php?from=DATEHERE&to=DATEHERE
~~~

*где DATEHERE - это валидная дата в формате, определяемом опцией [load_date](api/config/load_date.md).* 


При использовании <a href="https://docs.dhtmlx.com/connector__php__index.html">dhtmlxConnector</a> на сервере не требуется дополнительная обработка для разбора таких запросов.


### Индикатор загрузки

При работе с большими объемами данных полезно отображать индикатор загрузки.

Включите индикатор загрузки, установив свойство [show_loading](api/config/show_loading.md) в *true*:

~~~js
scheduler.config.show_loading = true;
...
scheduler.init('scheduler_here',new Date(2018,0,10),"month");
~~~

:::note
Чтобы изменить изображение индикатора, замените 'imgs/loading.gif' на свою картинку.
:::

## Загрузка данных для секций Timeline и Units с сервера {#loadingdatawithtimelineandunitssectionsfromtheserver}

При загрузке данных в представления [Timeline](views/timeline.md) и [Units](views/units.md#loadingdatatotheview) необходимо предоставить массив секций.

Для загрузки секций Timeline и Units с бэкенда требуется более подробная настройка:

- При инициализации Timeline вместо массива секций используйте метод [serverList](api/method/serverlist.md) с именем коллекции:

~~~js
scheduler.createTimelineView({
   ....
   y_unit: scheduler.serverList("sections"),
   ...
});
~~~

- Загрузите данные в планировщик с помощью метода [load](api/method/load.md):

~~~js
scheduler.load("data.json");
~~~

- На серверной стороне ответ должен быть структурирован следующим образом:

~~~js title=""data.json""
{ 
   "data":[
      {
          "id":"1",
          "start_date":"2018-03-02 00:00:00",
          "end_date":"2018-03-04 00:00:00",
          "text":"dblclick me!",
          "type":"1"
      },
      {
          "id":"2",
          "start_date":"2018-03-09 00:00:00",
          "end_date":"2018-03-11 00:00:00",
          "text":"and me!",
          "type":"2"
      },
      {
          "id":"3",
          "start_date":"2018-03-16 00:00:00",
          "end_date":"2018-03-18 00:00:00",
          "text":"and me too!",
          "type":"3"
      },
      { 
          "id":"4",
          "start_date":"2018-03-02 08:00:00",
          "end_date":"2018-03-02 14:10:00",
          "text":"Type 2 event",
          "type":"2"
      }
   ], 
   "collections": {
      "sections":[
         {"value":"1","label":"Simple"},
         {"value":"2","label":"Complex"},
         {"value":"3","label":"Unknown"}
      ]
   }
}
~~~

В этом примере массив "data" содержит события календаря, а объект "collections" хранит коллекции, на которые ссылается метод [serverList](api/method/serverlist.md).
