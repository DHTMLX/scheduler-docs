---
title: "Как начать"
sidebar_label: "Как начать"
---

# Как начать

В этом руководстве показано, как создать базовый планировщик, который загружает данные из базы данных и сохраняет их обратно. 
Итоговый пример может служить прочной основой для создания приложений с dhtmlxScheduler.

![init_scheduler_front.png](/img/init_scheduler_front.png)


[Loading data from a database](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/05_loading_database.html)


## Шаг 1. Создайте новый HTML-файл и подключите необходимые файлы

Начните с создания нового HTML-файла и подключения необходимых скриптов и стилей планировщика.

Вам понадобятся следующие файлы:

- *dhtmlxscheduler.js*
- *dhtmlxscheduler_material.css* (для темы Material; вы также можете [ознакомиться с другими доступными темами](guides/skins.md))

~~~html
<!DOCTYPE html>
<html>
<head>
   <title>How to start</title>
   <script src="../scheduler/dhtmlxscheduler.js" type="text/javascript"></script>
   <link rel="stylesheet" href="../scheduler/dhtmlxscheduler_material.css" 
           type="text/css">
</head>
<body>
       //your code will be here
</body>
</html>
~~~

Давайте кратко рассмотрим структуру пакета dhtmlxScheduler, чтобы знать, где искать эти файлы:

- <b>sources</b> - исходные файлы, не минифицированные и удобные для чтения, в основном используются для отладки.
- <b>samples</b> - примеры кода.
- <b>docs</b> - полная документация по компоненту.
- <b>codebase</b> - минифицированные файлы, оптимизированные для использования в продакшене. <b>Используйте файлы из этой папки в своих проектах.</b>

## Шаг 2. Определите необходимые DIV-элементы

Перед инициализацией планировщика создайте необходимые контейнеры DIV для его элементов интерфейса.

Обычно для планировщика требуется следующий набор 'div':

~~~js
<div id="scheduler_here" class="dhx_cal_container">
    <div class="dhx_cal_navline">
        <div class="dhx_cal_prev_button">&nbsp;</div>
        <div class="dhx_cal_next_button">&nbsp;</div>
        <div class="dhx_cal_today_button"></div>
        <div class="dhx_cal_date"></div>
        <div class="dhx_cal_tab" name="day_tab"></div>
        <div class="dhx_cal_tab" name="week_tab"></div>
        <div class="dhx_cal_tab" name="month_tab"></div>
       </div>
    <div class="dhx_cal_header"></div>
    <div class="dhx_cal_data"></div>       
</div>
~~~

## Шаг 3. Стилизация

Чтобы обеспечить корректную работу во весь экран во всех браузерах, добавьте следующий CSS-стиль для планировщика:

~~~css
<style type="text/css" media="screen">
    html, body{
        margin:0px;
        padding:0px;
        height:100%;
        overflow:hidden;
    }   
</style>
~~~

Если вы не используете полноэкранный режим, этот стиль не обязателен. Вместо этого задайте нужные CSS-свойства непосредственно для основного **div**:

~~~html
<div id="scheduler_here" class="dhx_cal_container"/>
...
~~~

## Шаг 4. Инициализация

Когда всё готово, можно инициализировать планировщик. Обратите внимание, что планировщик - это статический объект, и его нужно создавать только один раз на странице. 
Обращаться к экземпляру планировщика можно через **dhtmlxScheduler** или просто **scheduler**.

~~~js
scheduler.init('scheduler_here', new Date(),"month");
~~~

## Шаг 5. Загрузка данных

На этом этапе при запуске приложения появится планировщик, но без событий.

Чтобы заполнить его данными, начните с простого встроенного объекта в качестве источника данных. 
Используйте метод [parse](api/method/parse.md) для загрузки данных из встроенного объекта.

Каждый объект события включает:

- **id** - (*string, number*) идентификатор события.
- **start_date** - (*string*) дата начала события, формат по умолчанию "%m/%d/%Y %H:%i".
- **end_date** - (*string*) дата окончания события, формат по умолчанию "%m/%d/%Y %H:%i".
- **text** - (*string*) описание события.

~~~js
var events = [
   {id:1, text:"Meeting",   start_date:"04/11/2018 14:00",end_date:"04/11/2018 17:00"},
   {id:2, text:"Conference",start_date:"04/15/2018 12:00",end_date:"04/18/2018 19:00"},
   {id:3, text:"Interview", start_date:"04/24/2018 09:00",end_date:"04/24/2018 10:00"}
];

scheduler.parse(events); // указываем источник и формат данных
~~~

Вы также можете [загружать данные с сервера](#step7loadingdatafromtheserver).

:::note
Подробнее об интеграции с серверной частью читайте в статье [Интеграция с серверной стороной](guides/server-integration.md).
:::

## Шаг 6. Структура базы данных

:::note
Следуйте этим шагам, если хотите загружать данные из базы данных, а не из встроенного объекта.
:::

Если вы решили загружать данные с сервера, потребуется таблица базы данных со следующей структурой:

![db_table](/img/db_table.png)

Создать её можно с помощью следующего SQL-кода:

~~~js
CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `text` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
)
~~~

Кроме этих полей, вы можете добавить дополнительные столбцы, которые затем можно отправлять на клиент и [сопоставлять с lightbox](guides/custom-details-form.md#mapping_db_fields_to_the_form).

Обратите внимание, что формат даты и времени в базе ('%Y-%m-%d %H:%i') отличается от формата по умолчанию в планировщике ('%m/%d/%Y %H:%i'). 
Чтобы корректно обрабатывать это, обновите формат даты планировщика через опцию [xml_date](api/config/xml_date.md).

Обязательно задайте параметры конфигурации до инициализации планировщика, например:

~~~js
scheduler.config.xml_date="%Y-%m-%d %H:%i";
...
scheduler.init('scheduler_here',new Date(),"month");
~~~

## Шаг 7. Загрузка данных с сервера

Чтобы загрузить данные из базы, используйте метод [load](api/method/load.md), передав URL серверного скрипта, который обрабатывает операции с данными.

:::note
Библиотека [dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html) поможет быстро начать, как показано здесь. Для новых проектов рекомендуется создавать backend API вручную для большей гибкости. Подробнее смотрите в [Интеграция с серверной стороной](guides/server-integration.md).
:::
  
Вот как вызвать этот метод:

~~~js
// укажите URL серверного скрипта, который обрабатывает CRUD-операции
scheduler.load("data/connector.php");
~~~

## Шаг 8. Серверный скрипт

Пример серверного скрипта для dhtmlxScheduler:

~~~php
<?php 
require_once("../codebase/connector/scheduler_connector.php");
 
$res="mysql_connect(""localhost","root","");
mysql_select_db("schedulerDB");

$conn = new SchedulerConnector($res);

$conn->render_table("events","id","start_date,end_date,text");
~~~

### Сопоставление столбцов базы данных

Обратите внимание, что порядок столбцов в **$connector->render_table** имеет значение. Первые три столбца соответствуют свойствам *start_date*, *end_date* и *text* объекта события на клиенте, независимо от их реальных названий в БД:

~~~js
$conn->render_table("events","EventId","Start,End,Name,details","");
// JS: event.id, event.start_date, event.end_date, event.text, event.text, event.details
~~~

#### Сопоставление дополнительных столбцов

Любые дополнительные столбцы будут сопоставлены по их именам напрямую:

~~~js
$conn->render_table("events","id","start_date,end_date,text,custom,details","");
// JS: event.start_date, event.end_date, event.text, event.custom, event.details
~~~

Можно также использовать алиасы, например:

~~~js
$conn->render_table("events","id",
    "start_date,end_date,text,custom_column(customProperty),details","");
// JS: event.start_date, event.end_date, event.text, event.customProperty, event.details
~~~

## Шаг 9. Сохранение данных

Теперь планировщик может загружать данные из базы, но изменения не будут сохраняться автоматически. 
Чтобы включить сохранение, используйте <a href="https://docs.dhtmlx.com/dataprocessor__index.html">dataProcessor</a>.

Использовать dataProcessor очень просто - инициализируйте его и свяжите с планировщиком:

~~~js
var dp = scheduler.createDataProcessor("data/connector.php");
dp.init(scheduler);
~~~
  
Готово! Теперь у вас есть базовый планировщик, который загружает и сохраняет данные в базу данных.

Далее вы можете настраивать и расширять его под свои задачи.


[Loading data from a database](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/05_loading_database.html)
