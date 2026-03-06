---
title: "dhtmlxScheduler с dhtmlxConnector"
sidebar_label: "dhtmlxScheduler с dhtmlxConnector"
---

# dhtmlxScheduler с dhtmlxConnector

В этом руководстве показано, как создать базовый планировщик, который подключается к базе данных для загрузки и сохранения событий. 
Приведённый здесь итоговый пример кода может служить хорошей основой для построения приложений с использованием dhtmlxScheduler.

В руководстве описаны шаги по реализации Scheduler на PHP. Если вы предпочитаете другой язык для бэкенда, вы можете найти соответствующие руководства здесь:

- [dhtmlxScheduler с Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxScheduler с ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxScheduler с ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxScheduler с PHP](integrations/php/howtostart-plain-php.md)
- [dhtmlxScheduler с PHP: Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxScheduler с PHP:Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxScheduler с SalesForce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxScheduler с Ruby on Rails](integrations/other/howtostart-ruby.md)

Следуйте пошаговым инструкциям для создания приложения.

:::note
Полный исходный код [размещён на GitHub](https://github.com/DHTMLX/scheduler-howto-php-connector).
:::

![init_scheduler_front.png](/img/init_scheduler_front.png)


[Loading data from a database](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/05_loading_database.html)


## Шаг 1. Создание HTML-файла и подключение необходимых файлов

Начните с создания нового HTML-файла и добавления необходимых скриптов и стилей планировщика.

Ключевые файлы для подключения:

- *dhtmlxscheduler.js*
- *dhtmlxscheduler.css*

~~~js
<!DOCTYPE html>
<html>
<head>
   <title>How to start</title>
   <script src="../scheduler/dhtmlxscheduler.js" type="text/javascript"></script>
   <link rel="stylesheet" href="../scheduler/dhtmlxscheduler.css" type="text/css">
</head>
<body>
       //your code will be here
</body>
</html>
~~~

Давайте кратко рассмотрим структуру пакета dhtmlxScheduler, чтобы понять, где расположены эти файлы:

- <b>backend</b> - содержит приложение node.js, полезное для запуска примеров пакета.
- <b>samples</b> - включает пример кода.
- <b>codebase</b> - содержит файлы библиотеки. В папке *codebase/source* находятся не минифицированные версии.

## Шаг 2. Определение связанных DIV-элементов

Перед инициализацией планировщика создайте необходимые контейнеры DIV, которые будет использовать планировщик.

Обычно для планировщика требуется следующий набор div-элементов:

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

Чтобы планировщик корректно работал в полноэкранном режиме во всех браузерах, примените следующий стиль:

~~~js
<style>
    html, body{
        margin:0px;
        padding:0px;
        height:100%;
        overflow:hidden;
    }   
</style>
~~~

Если вы не используете полноэкранный режим, этот стиль не обязателен. Вместо этого можно задать нужные CSS-свойства непосредственно основному **div**:

~~~js
<div id="scheduler_here" class="dhx_cal_container">
...
~~~

## Шаг 4. Инициализация

Когда подготовка завершена, инициализируйте планировщик. Обратите внимание, что на странице может быть только один экземпляр планировщика - это синглтон.

Обращаться к экземпляру планировщика можно как **dhtmlxScheduler**, так и просто **scheduler**.

~~~js
scheduler.init('scheduler_here', new Date(),"month");
~~~

## Шаг 5. Загрузка данных

На этом этапе, если запустить приложение, планировщик появится, но без событий.

Чтобы добавить события, начните с простого встроенного источника данных. Планировщик может загружать данные из объектов с помощью метода [parse](api/method/parse.md).

Каждый объект события должен содержать следующие свойства:

- **id** - (*string, number*) уникальный идентификатор события.
- **start_date** - (*string*) время начала события, формат по умолчанию "%m/%d/%Y %H:%i".
- **end_date** - (*string*) время окончания события, формат по умолчанию "%m/%d/%Y %H:%i".
- **text** - (*string*) описание события.

~~~js
var events = [
{id:1, text:"Meeting",   start_date:"2019-11-14 14:00",end_date:"2019-11-14 17:00"},
{id:2, text:"Conference",start_date:"2019-11-13 12:00",end_date:"2019-11-13 19:00"},
{id:3, text:"Interview", start_date:"2019-11-14 09:00",end_date:"2019-11-14 10:00"}
];

scheduler.parse(events);//указываем источник данных и формат
~~~

## Шаг 6. Структура базы данных 
:::note
Обращайтесь к этому и следующим шагам, если планируете загружать данные из базы данных, а не из встроенных объектов.
:::

Если вы хотите загружать данные с сервера, начните с создания таблицы базы данных примерно такого вида:

![db_table](/img/db_table.png)

Создать её можно с помощью следующего SQL-запроса:

~~~js
CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `text` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
)
~~~

Помимо этих полей, вы можете добавить любые дополнительные столбцы, которые затем можно отправлять на клиент и 
[сопоставлять с полями lightbox планировщика](guides/custom-details-form.md).

Обратите внимание, что формат даты и времени в базе данных '%Y-%m-%d %H:%i' отличается от стандартного формата планировщика '%m/%d/%Y %H:%i'. 
Чтобы корректно это обработать, обновите формат даты планировщика с помощью опции [date_format](api/config/date_format.md).

Убедитесь, что любые параметры конфигурации задаются до вызова метода инициализации, например:

~~~js
scheduler.init('scheduler_here',new Date(),"month");
~~~

## Шаг 7. Загрузка данных с сервера {#step-7-loading-data-from-the-server}

Для получения данных из вашей базы используйте метод [load](api/method/load.md), указав URL вашего серверного скрипта.

Хотя вы можете создать свой собственный бэкенд, используя наши [руководства](integrations/howtostart-guides.md), в этом уроке используется [библиотека PHP connector](https://docs.dhtmlx.com/connector__php__index.html) как быстрое решение.

Используйте метод так:

~~~js
// укажите URL серверного скрипта, обрабатывающего CRUD-операции
scheduler.load("data/connector.php");
~~~

## Шаг 8. Серверный скрипт

Скачайте библиотеку connector с https://github.com/DHTMLX/connector-php

Вот базовый PHP-скрипт для dhtmlxScheduler:

~~~php
<?php 
require_once("./connector/scheduler_connector.php");

$res = new PDO("mysql:host=localhost;dbname=scheduler", "username", "password");

$connector = new SchedulerConnector($res);
$connector->render_table("events","id","start_date,end_date,text");
~~~


Вы можете называть поля базы данных как угодно. Планировщик ожидает, что первые три поля данных будут:

- дата начала
- дата окончания
- текстовое описание

Например, если ваши поля называются иначе:

~~~php
$connector->render_table("events","id","event_start,event_end,event_text");
~~~

Планировщик интерпретирует их как:

- *event_start* → *start_date*
- *event_end* → *end_date*
- *event_text* → *text*

:::note
Подробнее о повторяющихся событиях читайте в руководстве [Recurring Events](guides/recurring-events.md).
:::

:::note
Повторяющиеся события хранятся в базе как одна запись и разворачиваются на клиенте планировщиком.
Чтобы получить отдельные экземпляры на сервере, используйте PHP helper library для разбора повторяющихся событий.

Библиотека доступна на GitHub: [scheduler-helper-php](https://github.com/DHTMLX/scheduler-helper-php).
:::

## Шаг 9. Сохранение данных 
На этом этапе планировщик может загружать события из базы, но не будет автоматически сохранять изменения обратно.

Чтобы включить сохранение, используйте [dataProcessor](guides/server-integration.md#technique).

Использовать dataProcessor просто: инициализируйте его и свяжите с планировщиком.

~~~js
var dp = scheduler.createDataProcessor("data/connector.php");
dp.init(scheduler);
~~~

Готово. Теперь у вас есть базовый планировщик, который загружает события из базы и сохраняет изменения обратно.

Вы можете доработать и расширить его под свои задачи.


[Loading data from a database](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/05_loading_database.html)


Полностью рабочий пример доступен на [GitHub](https://github.com/DHTMLX/scheduler-howto-php-connector), где вы можете клонировать или скачать его для своих проектов.
