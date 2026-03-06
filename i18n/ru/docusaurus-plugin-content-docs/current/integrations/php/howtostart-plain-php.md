---
title: "dhtmlxScheduler с PHP"
sidebar_label: "dhtmlxScheduler с PHP"
---

# dhtmlxScheduler с PHP

В этом руководстве приведены все необходимые детали для создания планировщика (Scheduler) на PHP без использования каких-либо фреймворков.

В качестве хранилища данных используется MySQL, а для доступа к базе данных применяется [интерфейс PDO](https://www.php.net/manual/en/ref.pdo-mysql.php). Для выполнения шагов потребуется PHP версии 5.4 или выше с включённым расширением [PDO_MYSQL](https://www.php.net/manual/en/ref.pdo-mysql.php), а также MySQL или MariaDB.

Если вас интересует серверная интеграция с использованием других платформ или фреймворков, доступны руководства для:

- [dhtmlxScheduler с ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxScheduler с ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxScheduler с Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxScheduler с PHP: Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxScheduler с PHP:Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxScheduler с SalesForce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxScheduler с Ruby on Rails](integrations/other/howtostart-ruby.md)
- [dhtmlxScheduler с dhtmlxConnector](integrations/other/howtostart-connector.md)

Также вы можете ознакомиться с [полной демонстрацией на GitHub](https://github.com/DHTMLX/scheduler-howto-php-plain) и следовать пошаговым инструкциям для создания приложения.

:::note
Полный исходный код [доступен на GitHub](https://github.com/DHTMLX/scheduler-howto-php-plain).
:::

## Шаг 1. Создание проекта

Начните с создания новой директории для вашего приложения.

Создайте пустую папку и назовите её `scheduler-howto-php-plain`.

## Шаг 2. Добавление Scheduler на страницу

Далее создайте страницу, на которой будет размещён планировщик.

Внутри папки `scheduler-howto-php-plain` создайте файл `index.html` и добавьте следующий код:


~~~js title="scheduler-howto-php-plain/index.html"
<!doctype html>
<html>
    <head>
      <title> Getting started with dhtmlxScheduler</title>
      <meta charset="utf-8">
      <script src="https://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler.js"></script>
      <link href="https://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler.css" 
              rel="stylesheet" type="text/css" charset="utf-8">
        <style>
            html, body{
                margin:0px;
                padding:0px;
                height:100%;
                overflow:hidden;
            }
        </style> 
    </head> 
    <body> 
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
    <script>
        scheduler.init('scheduler_here', new Date(2019,0,20), "week");
        scheduler.load("data/api.php");
    </script> 
    </body> 
</html>
~~~

После запуска приложения планировщик должен отобразиться на странице:

![Scheduler initialization](/img/php_plain.png)

## Шаг 3. Подготовка базы данных

На данный момент планировщик пуст. Следующий шаг - создать базу данных и подключить её к приложению.

### Создание базы данных

Вы можете создать базу данных через любой удобный клиент MySQL (например, phpMyAdmin) или через командную строку. Используйте следующий SQL-код для создания новой базы данных и таблицы для событий календаря:

~~~
CREATE DATABASE  IF NOT EXISTS `scheduler_howto_php`;
USE `scheduler_howto_php`;
 
DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
  `id` int(11) AUTO_INCREMENT,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `text` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET="utf8;"
~~~

Если вы предпочитаете использовать консоль MySQL, сохраните приведённый выше SQL в файл *dump.sql*, затем выполните команду:

~~~
$ mysql -uuser -ppass scheduler < mysql_dump.sql
~~~

## Шаг 4. Загрузка данных

После подготовки базы данных можно приступить к загрузке данных в планировщик.

Создайте новую папку с именем `data` в директории вашего проекта.

Сначала определите параметры подключения к базе данных в конфигурационном файле `data/config.php`:

~~~js title="data/config.php"
<?php
$dsn = "mysql:host=localhost;dbname=scheduler_howto_php";
$username = "root";
$password = "";
 
$options = array(
    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'",
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
);
~~~

Обязательно замените "localhost", "scheduler_howto_php", "root" и "" на ваши реальные параметры подключения к базе данных.

Далее добавьте PHP-скрипт, который будет использоваться клиентом для загрузки данных из базы и сохранения изменений в планировщике.

Создайте файл `api.php` в папке `data` и начните с открытия соединения с базой данных:

~~~js title="data/api.php"
<?php
require_once("config.php");
$db = new PDO($dsn, $username, $password, $options);
~~~

Затем реализуйте функцию для получения событий из базы данных:

~~~js title="data/api.php"
function read($db, $requestParams){
    $queryParams = [];
    $queryText = "SELECT * FROM `events`";
    $query = $db->prepare($queryText);
    $query->execute($queryParams);
    $events = $query->fetchAll();
    return $events;
}
~~~

Далее создайте обработчик запросов для ответа на входящие запросы:

~~~js title="data/api.php"
switch ($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        $result = read($db, $_GET);
        break;
    case "POST":
        // we'll implement this later
    break;
    default: 
        throw new Exception("Unexpected Method"); 
    break;
}
header("Content-Type: application/json");
echo json_encode($result);
~~~

Если вы добавите несколько событий в базу данных, они появятся в планировщике.

### Динамическая загрузка

В текущей реализации планировщик загружает все записи о событиях из базы данных за один раз. Такой подход подходит, если объём данных небольшой. Однако для приложений вроде систем бронирования или планирования, где со временем накапливается много записей, объём передаваемых данных может значительно увеличиться. Через несколько месяцев активного использования приложение может загружать несколько мегабайт событий при каждом открытии страницы.

Этого можно избежать, включив динамическую загрузку. В этом режиме планировщик отправляет параметры с отображаемым диапазоном дат, а сервер возвращает только те события, которые попадают в этот диапазон. Каждый раз при переходе пользователя к другому диапазону дат планировщик загружает только соответствующие данные.

Чтобы включить динамическую загрузку на клиенте, используйте опцию *setLoadMode* и укажите "day", "week" или "month". Например, добавьте в клиентский код:

~~~js title="index.html"
scheduler.init("scheduler_here", new Date(2019, 0, 20), "week");
scheduler.setLoadMode("day"); /*!*/

// загрузка данных с сервера
scheduler.load("data/api.php");
~~~

На сервере обработайте это, изменив функцию `read` следующим образом:

~~~js title="data/api.php"
function read($db, $requestParams){
    $queryParams = [];
    $queryText = "SELECT * FROM `events`";
 
    // обработка динамической загрузки
    if (isset($requestParams["from"]) && isset($requestParams["to"])) { /*!*/
        $queryText .= " WHERE `end_date`>=? AND `start_date` < ?;";  /*!*/
        $queryParams = [$requestParams["from"], $requestParams["to"]];  /*!*/
    }  /*!*/
    $query = $db->prepare($queryText);
    $query->execute($queryParams);
    $events = $query->fetchAll();
    return $events;
}
~~~

## Шаг 5. Сохранение изменений

### Реализация обработчиков на сервере

На данный момент планировщик может только читать данные с сервера. Следующий шаг - реализовать сохранение изменений обратно в базу данных.

Клиент работает в режиме JSON, отправляя POST-запросы для выполнения действий над событиями. Подробнее о формате запросов и маршрутах читайте в [Интеграция с серверной стороной](guides/server-integration.md).

Добавьте функции для создания, обновления и удаления событий в базе данных.

В файле `data/api.php` добавьте следующее:

~~~js title="data/api.php"
// создание нового события
function create($db, $event){
    $queryText = "INSERT INTO `events` SET
        `start_date`=?,
        `end_date`=?,
        `text`=?";
    $queryParams = [
        $event["start_date"],
        $event["end_date"],
        $event["text"]
    ];
    $query = $db->prepare($queryText);
    $query->execute($queryParams);
    return $db->lastInsertId();
}
// обновление события
function update($db, $event, $id){
    $queryText = "UPDATE `events` SET
        `start_date`=?,
        `end_date`=?,
        `text`=?
        WHERE `id`=?";
    $queryParams = [
        $event["start_date"],
        $event["end_date"],
        $event["text"],
        $id
    ];
    $query = $db->prepare($queryText);
    $query->execute($queryParams);
}
// удаление события
function delete($db, $id){
    $queryText = "DELETE FROM `events` WHERE `id`=? ;";
    $query = $db->prepare($queryText);
    $query->execute([$id]);
}
~~~

Затем обновите обработчик POST-запросов для использования этих функций:

~~~js title="data/api.php"
$db = new PDO($dsn, $username, $password, $options);
switch ($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        $result = read($db, $_GET);
        break;
    case "POST": /*!*/
        $requestPayload = json_decode(file_get_contents("php://input")); /*!*/
        $id = $requestPayload->id; /*!*/
        $action = $requestPayload->action; /*!*/
        $body = (array) $requestPayload->data; /*!*/
        $result = [ /*!*/
            "action" => $action /*!*/
        ]; /*!*/
        if ($action == "inserted") {; /*!*/
            $databaseId = create($db, $body); /*!*/
            $result["tid"] = $databaseId; /*!*/
        } elseif($action == "updated") { /*!*/
            update($db, $body, $id); /*!*/
        } elseif($action == "deleted") { /*!*/
            delete($db, $id); /*!*/
        } /*!*/
    break; /*!*/
    default: 
        throw new Exception("Unexpected Method"); 
    break;
}
 
header("Content-Type: application/json");
echo json_encode($result);
~~~

:::note
При создании нового события его идентификатор из базы данных возвращается клиенту в свойстве **tid** объекта ответа. В ответе JSON могут быть добавлены и другие свойства, которые можно использовать на стороне клиента.
:::

### Включение сохранения данных на клиентской стороне

Далее будет настроена клиентская часть для работы с созданным нами API:

~~~js title="index.html"
~~~js
scheduler.init("scheduler_here", new Date(2019, 0, 20), "week");
scheduler.setLoadMode("day");
 
// загрузка данных с backend
scheduler.load("data/api.php"); /*!*/
 
// отправка изменений на backend
var dp = scheduler.createDataProcessor({ /*!*/
  url: "data/api.php", /*!*/
  mode: "JSON" /*!*/
}); /*!*/
~~~

Теперь, после перезапуска приложения, вы сможете создавать, удалять и изменять события в планировщике, и все изменения будут сохранены после обновления страницы.

![Scheduler CRUD](/img/php_plain_crud.png)

На этом этапе у вас есть базовый планировщик, который сохраняет свои события в базе данных MySQL.

## Повторяющиеся события

Чтобы включить повторяющиеся события (например, "повторять событие ежедневно"), необходимо добавить соответствующее расширение на страницу планировщика:

~~~html
...
<body>
  ...
  <script>
  scheduler.plugins({
  recurring: true /*!*/
  });
  scheduler.init('scheduler_here', new Date(2019,0,20), "week");
  ...
  </script> 
</body>
~~~

Таблице "events" требуются дополнительные столбцы для хранения информации о повторяющихся событиях. Вот SQL-запрос для создания таблицы с поддержкой повторяющихся событий:

~~~
CREATE DATABASE  IF NOT EXISTS `scheduler_howto_php`;
USE `scheduler_howto_php`;
 
DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
  `id` int(11) AUTO_INCREMENT,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `text` varchar(255) DEFAULT NULL,
  `event_pid` int(11) DEFAULT 0,  
  `event_length` bigint(20) unsigned DEFAULT 0,
  `rec_type` varchar(25) DEFAULT '',
  PRIMARY KEY (`id`)
) DEFAULT CHARSET="utf8;"
~~~

Либо вы можете обновить существующую таблицу событий из предыдущего шага следующими запросами:

~~~
ALTER TABLE `events` ADD COLUMN `event_pid` int(11) DEFAULT '0';
ALTER TABLE `events` ADD COLUMN `event_length` bigint(20) unsigned DEFAULT '0';
ALTER TABLE `events` ADD COLUMN `rec_type` varchar(25) DEFAULT '';
~~~

### Обновление backend

В PHP-скриптах необходимо внести некоторые изменения.

Во-первых, обновите SQL-запрос действия `INSERT`, чтобы он включал новые столбцы.

Далее, обработайте особый случай для повторяющихся событий: удаление одного вхождения из серии требует создания новой записи, поэтому клиент вызовет для этого действие *insert*:

~~~js title="data/api.php"
function create($db, $event){
    $queryText = "INSERT INTO `events` SET
        `start_date`=?,
        `end_date`=?,
        `text`=?,
        `event_pid`=?,  /*!*/
        `event_length`=?,  /*!*/
        `rec_type`=?";  /*!*/
  $queryParams = [
  $event["start_date"],
  $event["end_date"],
  $event["text"],
  // столбцы для повторяющихся событий
  $event["event_pid"] ? $event["event_pid"] : 0, /*!*/
  $event["event_length"] ? $event["event_length"] : 0, /*!*/
  $event["rec_type"] /*!*/
  ];
  $query = $db->prepare($queryText);
  $query->execute($queryParams);
  return $db->lastInsertId();
}
~~~

Обработчик `POST`-запроса также требует обновления, так как клиент ожидает от сервера статус “deleted” после вставки пропущенного вхождения:

~~~js title="data/api.php"
switch ($_SERVER["REQUEST_METHOD"]) {
  case "GET":
  $result = read($db, $_GET);
  break;
  case "POST":
  $requestPayload = json_decode(file_get_contents("php://input"));
  $id = $requestPayload->id;
  $action = $requestPayload->action;
  $body = (array) $requestPayload->data;
  $result = [
  "action" => $action
  ];
  if ($action == "inserted") {
  $databaseId = create($db, $body);
  $result["tid"] = $databaseId;
  // удаление одного вхождения из серии повторяющихся событий
  if ($body["rec_type"] === "none") {
  $result["action"] = "deleted";/*!*/
  }
  } elseif($action == "updated") {
  update($db, $body, $id);
  } elseif($action == "deleted") {
  delete($db, $id);
  }
  break;
  default: 
  throw new Exception("Unexpected Method"); 
  break;
}
~~~

Обработчик обновления требует аналогичных изменений в SQL-запросе. Кроме того, при изменении серии повторяющихся событий необходимо удалить все изменённые вхождения этой серии:

~~~js title="data/api.php"
function update($db, $event, $id){
    $queryText = "UPDATE `events` SET
        `start_date`=?,
        `end_date`=?,
        `text`=?,
        `event_pid`=?, /*!*/
        `event_length`=?, /*!*/
        `rec_type`=? /*!*/
        WHERE `id`=?";
  $queryParams = [
  $event["start_date"],
  $event["end_date"],
  $event["text"],
  $event["event_pid"] ? $event["event_pid"] : 0, /*!*/
  $event["event_length"] ? $event["event_length"] : 0, /*!*/
  $event["rec_type"], /*!*/
  $id
  ];
  if ($event["rec_type"] && $event["rec_type"] != "none") { /*!*/
  // все изменённые вхождения должны быть удалены при обновлении серии /*!*/
  // https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents /*!*/
        $subQueryText = "DELETE FROM `events` WHERE `event_pid`=? ;"; /*!*/
  $subQuery = $db->prepare($subQueryText); /*!*/
  $subQuery->execute([$id]); /*!*/
  } /*!*/
  $query = $db->prepare($queryText);
  $query->execute($queryParams);
}
~~~

Наконец, действие `DELETE` должно обрабатывать два особых случая:
    
- Если у события непустое `event_pid`, значит удаляется изменённое вхождение серии. Вместо удаления записи установите `rec_type='none'`, чтобы планировщик пропустил это вхождение.
     
- При удалении всей серии повторяющихся событий необходимо также удалить все изменённые вхождения этой серии.

~~~js title="data/api.php"
function delete($db, $id){
  // логика, специфичная для поддержки повторяющихся событий
  // https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
    $subQueryText = "SELECT * FROM `events` WHERE id="?" LIMIT 1;";
  $subQuery = $db->prepare($subQueryText);
  $subQuery->execute([$id]);
  $event = $subQuery->fetch();
  if ($event["event_pid"]) {
  // удаление изменённого вхождения из серии повторяющихся событий
  // Если событие с event_pid было удалено - его нужно обновить,
  // установив rec_type==none вместо удаления.
        $subQueryText="UPDATE `events` SET `rec_type`='none' WHERE `id`=?;";
  $subQuery = $db->prepare($subQueryText);
  $subQuery->execute([$id]);
  }else{
  if ($event["rec_type"] && $event["rec_type"] != "none") { /*!*/
  // при удалении серии повторяющихся событий удалите все изменённые вхождения 
  // этой серии
            $subQueryText = "DELETE FROM `events` WHERE `event_pid`=? ;";
  $subQuery = $db->prepare($subQueryText);
  $subQuery->execute([$id]);
  }
  /*
  завершение обработки данных повторяющихся событий
        */
        $queryText = "DELETE FROM `events` WHERE `id`=? ;";
  $query = $db->prepare($queryText);
  $query->execute([$id]);
  }
}
~~~

## Безопасность приложения

dhtmlxScheduler работает на стороне клиента и не содержит встроенных средств безопасности для обеспечения гибкости. Поскольку защита только на клиенте недостаточна, ответственность за безопасность приложения лежит на backend-разработчиках. Основные моменты:

- SQL-инъекции: В этом примере для всех операций используются параметризованные SQL-запросы, что предотвращает атаки SQL-инъекций.

- XSS-атаки: Клиент не фильтрует пользовательский ввод перед отправкой на сервер, так же как и серверные данные перед отображением. В этом примере не реализована фильтрация XSS, поэтому, если вы планируете использовать этот пример в приложении, фильтрацию необходимо добавить.

Чтобы предотвратить XSS-атаки, убедитесь, что все строки, вставляемые в HTML, корректно экранированы.

В данном примере достаточно экранировать свойство *“text”* событий при их загрузке на клиент:

~~~js title="data/api.php"
function read($db, $requestParams){
  $queryParams = [];
    $queryText = "SELECT * FROM `events`";
  if (isset($requestParams["from"]) && isset($requestParams["to"])) {
        $queryText .= " WHERE `end_date`>=? AND `start_date` < ?;";
  $queryParams = [$requestParams["from"], $requestParams["to"]];
  }
  $query = $db->prepare($queryText);
  $query->execute($queryParams);
  $events = $query->fetchAll(PDO::FETCH_ASSOC);
 
  // экранирование небезопасного текста
  foreach($events as $index=>$event){
  $events[$index]["text"] = htmlentities($event["text"]);
  }
  return $events;
}
~~~

## Обработка ошибок

Если backend не может выполнить действие, клиент ожидает получить в ответ статус "error".

Для этого оберните вызовы методов в блок try-catch. В файле `data/app.php` замените блок `switch-case` на следующий:

~~~js title="data/api.php"
try {
  switch ($_SERVER["REQUEST_METHOD"]) {
  case "GET":
  $result = read($db, $_GET);
  break;
  case "POST":
  $requestPayload = json_decode(file_get_contents("php://input"));
  $id = $requestPayload->id;
  $action = $requestPayload->action;
  $body = (array) $requestPayload->data;
  $result = [
  "action" => $action
  ];
  if ($action == "inserted") {
  $databaseId = create($db, $body);
  $result["tid"] = $databaseId;
  // удаление одного вхождения из серии повторяющихся событий
  if ($body["rec_type"] === "none") {
  $result["action"] = "deleted";/*!*/
  }
  } elseif($action == "updated") {
  update($db, $body, $id);
  } elseif($action == "deleted") {
  delete($db, $id);
  }
  break;
  default: 
  throw new Exception("Unexpected Method"); 
  break;
  }
} catch (Exception $e) {
  http_response_code(500);
  $result = [
  "action" => "error",
  "message" => $e->getMessage()
  ];
}
~~~

На клиентской стороне ошибки можно отлавливать с помощью события [onAfterUpdate](https://docs.dhtmlx.com/api__dataprocessor_onafterupdate_event.html) объекта dataProcessor:

~~~js title="index.html"
dp.init(scheduler);
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
  if(action == "error"){
  // обработка ошибки
  }
});
~~~

## Устранение неполадок

Если после выполнения этих шагов Scheduler не отображает события при интеграции с PHP, обратитесь к статье [Устранение проблем с интеграцией Backend](guides/troubleshooting.md) для поиска возможных причин.

## Что дальше

Теперь у вас есть полностью рабочий Scheduler. Вы можете ознакомиться с полным кодом на [GitHub](https://github.com/DHTMLX/scheduler-howto-php-plain), где его можно клонировать или скачать для ваших проектов.

Также рекомендуем ознакомиться с [руководствами по различным функциям Scheduler](/guides/) или с туториалами по [интеграции Scheduler с другими backend-фреймворками](integrations/howtostart-guides.md).
