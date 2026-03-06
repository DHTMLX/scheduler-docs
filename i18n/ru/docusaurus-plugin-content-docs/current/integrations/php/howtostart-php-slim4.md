---
title: "dhtmlxScheduler с PHP: Slim"
sidebar_label: "dhtmlxScheduler с PHP: Slim"
---

# dhtmlxScheduler с PHP: Slim

В этом руководстве описаны основные шаги по созданию планировщика на PHP с использованием Slim 4 Framework и REST API на серверной стороне.

:::note
Это руководство использует Slim Framework v4.x.
Если вы работаете с более старой версией, обратитесь к руководству [Slim Framework v3.x](integrations/other/howtostart-php.md).
:::

Дополнительно доступны руководства по интеграции с другими платформами и фреймворками:

- [dhtmlxScheduler с ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxScheduler с ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxScheduler с Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxScheduler с PHP](integrations/php/howtostart-plain-php.md)
- [dhtmlxScheduler с PHP:Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxScheduler с SalesForce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxScheduler с Ruby on Rails](integrations/other/howtostart-ruby.md)
- [dhtmlxScheduler с dhtmlxConnector](integrations/other/howtostart-connector.md)

При разработке PHP-приложения обычно используют существующий фреймворк, а не пишут всё с нуля.

В этом руководстве используется фреймворк [Slim 4](https://www.slimframework.com/) вместе с REST API на серверной стороне, а в качестве хранилища данных выступает MySQL. Операции CRUD реализуются через PDO и построены таким образом, чтобы их можно было легко использовать и с другими фреймворками.

[Готовый пример доступен на GitHub](https://github.com/DHTMLX/scheduler-howto-php-slim) для ознакомления. Следуйте приведённым ниже шагам, чтобы создать аналогичное приложение.

:::note
Полный исходный код можно найти [на GitHub](https://github.com/DHTMLX/scheduler-howto-php-slim).
:::

## Шаг 1. Инициализация проекта

### Создание проекта

В качестве отправной точки используется [skeleton-приложение](https://github.com/slimphp/Slim-Skeleton) для Slim 4.

Создайте приложение с помощью Composer:

~~~php
$ composer create-project slim/slim-skeleton scheduler-slim-howto
$ cd scheduler-slim-howto/
~~~

## Шаг 2. Добавление Scheduler на страницу

Следующий шаг - разместить планировщик на веб-странице, что включает два простых подшага.

### Создание представления

Создайте файл *basic.html* в директории `app/templates`:

~~~js title="app/templates/basic.html"
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
            scheduler.config.xml_date="%Y-%m-%d %H:%i";
            scheduler.init('scheduler_here', new Date(2019,0,20), "week");
            scheduler.load("/events");
 
            var dp = scheduler.createDataProcessor("/events");
            dp.init(scheduler);
            dp.setTransactionMode("REST"); // use to transfer data with REST
        </script> 
  </body> 
</html>
~~~

### Настройка маршрутов

Когда новая страница готова, нужно сделать её доступной через браузер. Добавьте маршрут в **app/routes.php**:

~~~js title="app/routes.php"
$app->get('/', function (Request $request, Response $response) {
$payload = file_get_contents('../app/templates/basic.html');
$response->getBody()->write($payload);
return $response;
});
~~~

Теперь, при запуске приложения, на странице будет отображаться планировщик:

![Инициализация Scheduler](/img/php_init_slim4.png)

## Шаг 3. Подготовка базы данных

После размещения планировщика следующим шагом будет создание базы данных и её привязка к приложению.

### Создание базы данных

Базу данных можно создать с помощью любого удобного MySQL-клиента (например, phpMyAdmin) или через командную строку. Ниже приведён SQL для создания базы и таблицы событий календаря:

~~~
CREATE DATABASE  IF NOT EXISTS `scheduler`;
USE `scheduler`;
 
DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
  `id` int(11) AUTO_INCREMENT,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `text` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET="utf8;"
~~~

Для импорта через консоль MySQL сохраните этот SQL в файл *dump.sql* и выполните:

~~~
$ mysql -uuser -ppass scheduler < mysql_dump.sql
~~~

Далее откройте *app/settings.php* и добавьте массив настроек базы данных, указав свои данные для подключения:

~~~js title="app/settings.php"
'pdo' => [
    'engine' => 'mysql',
    'host' => 'localhost',
    'database' => 'scheduler',
    'username' => 'user',
    'password' => 'pass',
    'charset' => 'utf8',
    'collation' => 'utf8_unicode_ci',

    'options' => [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => true,
    ],
]
~~~

После этого обновите *app/dependencies.php*, чтобы внедрить экземпляр PDO в контейнер приложения:

~~~js title="app/dependencies.php"
// Inject a new instance of PDO into the container
$containerBuilder->addDefinitions([
  PDO::class => function (ContainerInterface $container) {
    $config = $container->get('settings')['pdo'];
    $dsn = "{$config['engine']}:host="{$config["'host']};dbname="{$config["'database']};
        charset="{$config["'charset']}";
    $username = $config['username'];
    $password = $config['password'];
    return new PDO($dsn, $username, $password, $config['options']);
  },
]);
~~~

## Шаг 4. Загрузка данных

Планировщик уже настроен на запрос данных о событиях с эндпоинта "/events". Теперь нужно добавить обработчик для этого маршрута, чтобы возвращать реальные данные.

Поскольку для работы с планировщиком потребуется несколько обработчиков, используются [группы маршрутов](https://www.slimframework.com/docs/v4/objects/routing.html#route-groups) Slim 4 для их организации.

Откройте *app/routes.php* и добавьте группу для "/events" с GET-обработчиком:

~~~js title="app/routes.php"
$app->group('/events', function ($group) {
    $group->get('',  function (Request $request, Response $response, array $args) {
        $db = $this->get('PDO');
        $queryText = 'SELECT * FROM `events`';
        $params = $request->getQueryParams();
        $query = $db->prepare($queryText);
        $query->execute();
        $result = $query->fetchAll();
        $payload = json_encode($result);

        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    });
});
~~~

После добавления событий в базу они будут отображаться в планировщике.

### Динамическая загрузка

На этом этапе планировщик загружает все записи о событиях при запуске. Такой подход подходит для небольших объёмов данных, но если приложение используется для планирования или бронирования и старые записи не удаляются, количество данных может значительно возрасти. Со временем это приведёт к тому, что приложение будет загружать большой объём данных при каждом открытии страницы пользователем.

Динамическая загрузка позволяет избежать этого: планировщик отправляет текущий диапазон отображаемых дат в параметрах запроса, а сервер возвращает только соответствующие записи. Каждый раз при изменении видимого диапазона дат планировщик получает новый поднабор данных.

Для включения динамической загрузки на клиенте используйте метод *setLoadMode* с одним из значений: "day", "week" или "month". Например:

~~~js
scheduler.config.xml_date="%Y-%m-%d %H:%i";
scheduler.init("scheduler_here", new Date(2019, 0, 20), "week");
scheduler.setLoadMode("day");
scheduler.load("/events");
~~~

На сервере это можно реализовать следующим образом:

~~~js title="app/routes.php"
$app->group('/events', function ($group) {
        $group->get('',  function (Request $request, Response $response, array $args) {
            $db = $this->get('PDO');
            $queryText = 'SELECT * FROM `events`';
            $params = $request->getQueryParams(); /*!*/
            $queryParams = []; /*!*/
            if (isset($params['from']) && isset($params['to'])) { /*!*/
                $queryText .= " WHERE `end_date`>=? AND `start_date` < ?;"; /*!*/
                $queryParams = [$params['from'], $params['to']]; /*!*/
            } /*!*/
            $query = $db->prepare($queryText);
            $query->execute($queryParams); /*!*/
            $result = $query->fetchAll();
            $payload = json_encode($result);

            $response->getBody()->write($payload);
            return $response->withHeader('Content-Type', 'application/json');
        });
});
~~~


## Шаг 5. Сохранение изменений

### Реализация обработчиков на сервере

На данном этапе планировщик уже может получать данные с сервера. Следующий шаг - реализовать сохранение изменений обратно в базу данных.

Клиентская часть работает в режиме REST, то есть будет отправлять запросы POST, PUT и DELETE для управления событиями. 
[Ознакомьтесь с форматом запросов и всеми маршрутами, используемыми планировщиком](guides/server-integration.md).

Для этого необходимо определить контроллер, который будет обрабатывать действия с моделью данных, настроить соответствующие маршруты и активировать сохранение данных на клиенте.

Вернитесь к *app/routes.php* и добавьте обработчик POST-запросов в группу "/events". Этот обработчик будет отвечать за добавление новых событий:

~~~js title="app/routes.php"
$group->post('', function (Request $request, Response $response, array $args) {
    $db = $this->get('PDO');
    $body = $request->getParsedBody();

    $queryText = 'INSERT INTO `events` SET
            `start_date`=?,
            `end_date`=?,
            `text`=?';
    $queryParams = [
        $body['start_date'],
        $body['end_date'],
        $body['text']
    ];
    $query = $db->prepare($queryText);
    $query->execute($queryParams);
    $result = [
        'tid' => $db->lastInsertId(),
        'action' => 'inserted'
    ];

    $payload = json_encode($result);

    $response->getBody()->write($payload);
    return $response->withHeader('Content-Type', 'application/json');
});
~~~

:::note
Когда добавляется новая задача, её ID возвращается клиенту в свойстве `tid` объекта ответа.  
JSON-ответ может содержать и другие свойства, к которым может обращаться обработчик на клиенте.
:::

Аналогично добавьте обработчик для PUT-запросов:

~~~php
$group->put('/{id}', function (Request $request, Response $response, array $args) {
    $db = $this->get('PDO');
    $id = $request->getAttribute('route')->getArgument('id');
    parse_str(file_get_contents("php://input"), $body);
    $queryText = 'UPDATE `events` SET
            `start_date`=?,
            `end_date`=?,
            `text`=?
            WHERE `id`=?';
    $queryParams = [
        $body['start_date'],
        $body['end_date'],
        $body['text'],
        $id
    ];

    $query = $db->prepare($queryText);
    $query->execute($queryParams);

    $result = [
        'action' => 'updated'
    ];
    $payload = json_encode($result);

    $response->getBody()->write($payload);
    return $response->withHeader('Content-Type', 'application/json');
});
~~~

И для DELETE-запросов:

~~~php
$group->delete('/{id}', function (Request $request, Response $response, array $args) {
    $db = $this->get('PDO');
    $id = $request->getAttribute('route')->getArgument('id');
    $queryText = 'DELETE FROM `events` WHERE `id`=? ;';
    
    $query = $db->prepare($queryText);
    $query->execute([$id]);
    
    $result = [
        'action' => 'deleted'
    ];
    
    $payload = json_encode($result);

    $response->getBody()->write($payload);
    return $response->withHeader('Content-Type', 'application/json');
});
~~~

### Включение сохранения данных на клиенте

Для завершения настройки необходимо сконфигурировать клиентскую часть для работы с созданным API:

~~~js title="public/basic.phtml"
~~~js
scheduler.config.xml_date="%Y-%m-%d %H:%i";
scheduler.init("scheduler_here", new Date(2019, 0, 20), "week");
scheduler.setLoadMode("day");
 
// загрузка данных с сервера
scheduler.load("/events");
 
// отправка изменений обратно на сервер
var dp = scheduler.createDataProcessor("/events"); dp.init(scheduler); /*!*/ 
// настройка режима обмена данными
dp.setTransactionMode("REST"); /*!*/
~~~

После перезапуска приложения появится возможность создавать, удалять и изменять события в планировщике, при этом все изменения будут сохраняться после перезагрузки страницы.

![Scheduler CRUD](/img/php_crud_slim4.png)


## Повторяющиеся события

Чтобы реализовать поддержку повторяющихся событий (например, ежедневных), подключите соответствующее расширение на странице планировщика:

~~~html
...
<body>
  ...
  <script>
  scheduler.plugins({
  recurring: true /*!*/
  });
  scheduler.config.xml_date="%Y-%m-%d %H:%i";
  scheduler.init("scheduler_here", new Date(2019, 0, 20), "week");
  ...
  </script> 
</body>
~~~

Для хранения информации о повторениях в таблице "events" нужны дополнительные столбцы. Пример SQL-запроса для создания таблицы с поддержкой повторяющихся событий:

~~~
CREATE DATABASE  IF NOT EXISTS `scheduler`;
USE `scheduler`;
 
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

Либо можно обновить существующую таблицу events следующим образом:

~~~
ALTER TABLE `events` ADD COLUMN `event_pid` int(11) DEFAULT '0';
ALTER TABLE `events` ADD COLUMN `event_length` bigint(20) unsigned DEFAULT '0';
ALTER TABLE `events` ADD COLUMN `rec_type` varchar(25) DEFAULT '';
~~~

### Обновление серверной логики

Теперь обновите обработчики согласно [инструкции по повторяющимся событиям](guides/recurring-events.md#editingdeletingacertainoccurrenceintheseries).

Для маршрута `POST` измените SQL-запрос, чтобы добавить новые столбцы.

Также обработайте особый случай для повторяющихся событий: при удалении отдельного вхождения из серии повторений клиент инициирует действие *insert* для создания новой записи, отражающей это удаление:

~~~js title="app/routes.php"
$group->post('', function (Request $request, Response $response, array $args) {
  $db = $this->get('PDO');
  $body = $request->getParsedBody();

    $queryText = 'INSERT INTO `events` SET
                `start_date`=?,
                `end_date`=?,
                `text`=?,
                `event_pid`=?, 
                `event_length`=?, 
                `rec_type`=?'; 
  $queryParams = [
  $body['start_date'],
  $body['end_date'],
  $body['text'],
  // столбцы для повторяющихся событий
  $body['event_pid'] ? $body['event_pid'] : 0,
  $body['event_length'] ? $body['event_length'] : 0, 
  $body['rec_type'] 
  ];

  // обработка удаления одного вхождения из серии повторяющихся событий
  $resultAction = 'inserted'; /*!*/
  if ($body['rec_type'] === "none") { /*!*/
  $resultAction = 'deleted'; /*!*/
  } /*!*/
  /*
  конец обработки данных повторяющихся событий
    */

  $query = $db->prepare($queryText);
  $query->execute($queryParams);
  $result = [
  'tid' => $db->lastInsertId(),
  'action' => $resultAction
  ];

  $payload = json_encode($result);

  $response->getBody()->write($payload);
  return $response->withHeader('Content-Type', 'application/json');
});
~~~

Обработчик `PUT` также требует обновления SQL-запроса.  
Кроме того, необходимо учесть особый случай: при изменении серии повторяющихся событий все изменённые вхождения этой серии должны быть удалены:

~~~js title="app/routes.php"
$group->put('/{id}', function (Request $request, Response $response, array $args) {
  $db = $this->get('PDO');
  $id = $request->getAttribute('route')->getArgument('id');
  parse_str(file_get_contents("php://input"), $body);
    $queryText = 'UPDATE `events` SET
            `start_date`=?,
            `end_date`=?,
            `text`=?,
            `event_pid`=?,
            `event_length`=?,
            `rec_type`=?
            WHERE `id`=?';
  $queryParams = [
  $body['start_date'],
  $body['end_date'],
  $body['text'],

  $body['event_pid'] ? $body['event_pid'] : 0,
  $body['event_length'] ? $body['event_length'] : 0,
  $body['rec_type'],/*!*/
  $id
  ];
  if ($body['rec_type'] && $body['rec_type'] != 'none') {
  // при обновлении серии повторяющихся событий нужно удалить все изменённые вхождения
  // см. https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
            $subQueryText = 'DELETE FROM `recurring_events` WHERE `event_pid`=? ;';
  $subQuery = $db->prepare($subQueryText);
  $subQuery->execute([$id]);
  }

  $query = $db->prepare($queryText);
  $query->execute($queryParams);

  $result = [
  'action' => 'updated'
  ];
  $payload = json_encode($result);

  $response->getBody()->write($payload);
  return $response->withHeader('Content-Type', 'application/json');
});
~~~

Наконец, обработчик `DELETE` должен учитывать два особых случая:

- Если у удаляемого события заполнено поле `event_pid`, это означает, что это изменённое вхождение серии повторяющихся событий. Вместо удаления записи обновите поле `rec_type` на `'none'`, чтобы планировщик пропустил это вхождение.
- Если удаляется вся серия повторяющихся событий, необходимо также удалить все изменённые вхождения этой серии.

~~~js title="app/routes.php"
$group->delete('/{id}', function (Request $request, Response $response, array $args) {
  $db = $this->get('PDO');
  $id = $request->getAttribute('route')->getArgument('id');
  // логика для поддержки повторяющихся событий
  // https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
    $subQueryText = 'SELECT * FROM `recurring_events` WHERE id="?" LIMIT 1;';
  $subQuery = $db->prepare($subQueryText);
  $subQuery->execute([$id]);
  $event = $subQuery->fetch(PDO::FETCH_ASSOC);

  if ($event['event_pid']) {
  // удаление изменённого вхождения из серии повторяющихся событий
  // вместо удаления обновляем rec_type на 'none', чтобы пропустить это вхождение
        $subQueryText='UPDATE `recurring_events` SET `rec_type`='none' WHERE `id`=?;';
  $subQuery = $db->prepare($subQueryText);
  $query->execute($queryParams);

  $result = [
  'action' => 'deleted'
  ];

  $payload = json_encode($result);

  $response->getBody()->write($payload);
  return $response->withHeader('Content-Type', 'application/json');
  }

  if ($event['rec_type'] && $event['rec_type'] != 'none') {/*!*/
  // при удалении серии повторяющихся событий нужно удалить все изменённые вхождения
        $subQueryText = 'DELETE FROM `recurring_events` WHERE `event_pid`=? ;';
  $subQuery = $db->prepare($subQueryText);
  $subQuery->execute([$id]);
  }

  /*
  конец обработки данных повторяющихся событий
    */

    $queryText = 'DELETE FROM `events` WHERE `id`=? ;';

  $query = $db->prepare($queryText);
  $query->execute([$id]);

  $result = [
  'action' => 'deleted'
  ];

  $payload = json_encode($result);

  $response->getBody()->write($payload);
  return $response->withHeader('Content-Type', 'application/json');
});
~~~

### Разбор повторяющихся событий
Повторяющееся событие сохраняется в базе данных как одна запись, которую Scheduler может разделить на клиентской стороне.  
Если на серверной стороне требуется получить даты отдельных событий, доступна вспомогательная библиотека для разбора повторяющихся событий dhtmlxScheduler на PHP.  


[Эту готовую к использованию библиотеку вы можете найти на GitHub](https://github.com/DHTMLX/scheduler-helper-php).

## Безопасность приложения

dhtmlxScheduler работает на клиентской стороне и не содержит встроенных средств безопасности для сохранения гибкости.  
Поскольку только клиентский код не может гарантировать надежную защиту, крайне важно, чтобы разработчики backend обрабатывали вопросы безопасности.

Некоторые ключевые моменты, на которые стоит обратить внимание:

- SQL-инъекции. В примере для всех операций используются параметризованные SQL-запросы, что помогает предотвратить уязвимости, связанные с SQL-инъекциями.

- XSS-атаки. На клиентской стороне пользовательский ввод не очищается перед отправкой на сервер, так же как и серверные данные не очищаются перед отображением.  
В этом примере не реализована фильтрация XSS, поэтому, если вы планируете использовать этот пример в своем приложении, необходимо добавить соответствующую очистку данных.

Чтобы защититься от возможных XSS-атак, убедитесь, что все строки, вставляемые в HTML, правильно экранируются.  
В этом примере достаточно экранировать свойство “text” событий при их загрузке на клиентской стороне:

~~~js title="approutes.php"
$app->group('/events', function ($group) {
  $group->get('', function (Request $request, Response $response, array $args) {
  $db = $this->get('PDO');
        $queryText = 'SELECT * FROM `events`';
  $params = $request->getQueryParams();
  $queryParams = [];
  if (isset($params['from']) && isset($params['to'])) {
            $queryText .= " WHERE `end_date`>=? AND `start_date` < ?;";
  $queryParams = [$params['from'], $params['to']];
  }
  $query = $db->prepare($queryText);
  $query->execute($queryParams);
  $result = $query->fetchAll();

  // экранирование небезопасного текста
  foreach($result as $index=>$event){
  $result[$index]["text"] = htmlentities($event["text"]);
  }

  $payload = json_encode($result);

  $response->getBody()->write($payload);
  return $response->withHeader('Content-Type', 'application/json');
  });
~~~

## Обработка ошибок

Если действие завершается с ошибкой на backend, клиентская сторона ожидает ответ, указывающий на статус "error" для этого действия ([подробнее см. здесь](guides/server-integration.md#errorhandling)).

Вы можете добиться этого, настроив обработчик ошибок по умолчанию.  
Отредактируйте файл `src/Application/Handlers/HttpErrorHandler.php` и замените следующий участок кода:

~~~js title="rc/Application/Handlers/HttpErrorHandler.php"
if (
  !($exception instanceof HttpException)
  && ($exception instanceof Exception || $exception instanceof Throwable)
  && $this->displayErrorDetails
) {
  $error->setDescription($exception->getMessage());
}
~~~

на этот код:

~~~php
if (
  !($exception instanceof HttpException)
  && ($exception instanceof Exception || $exception instanceof Throwable)
  && $this->displayErrorDetails
) {
  $encodedPayload = json_encode([
  'action' => 'error', 'message' => $exception->getMessage()
  ]);
  $response = $this->responseFactory->createResponse();
  $response->getBody()->write($encodedPayload);
  return $response->withHeader('Content-Type', 'application/json');
}
~~~

На клиентской стороне такие ошибки можно отлавливать с помощью события [onAfterUpdate](https://docs.dhtmlx.com/api__dataprocessor_onafterupdate_event.html) dataProcessor:

~~~php
dp.init(scheduler);
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
  if(action == "error"){
  // обработка ошибки
  }
});
~~~

## Поиск и устранение неисправностей

Если вы выполнили все шаги по интеграции Scheduler с PHP, но события не отображаются на странице, обратитесь к статье [Устранение проблем с интеграцией Backend](guides/troubleshooting.md). 
В ней содержатся рекомендации по выявлению основных причин распространённых проблем.

## Что дальше

На этом этапе у вас есть полностью рабочий Scheduler. 
Полный исходный код доступен на [GitHub](https://github.com/DHTMLX/scheduler-howto-php-slim) для просмотра, клонирования или скачивания и использования в ваших проектах.

Дополнительно вы можете ознакомиться с [руководствами по различным возможностям Scheduler](/guides/) или туториалами по [интеграции Scheduler с другими backend-фреймворками](integrations/howtostart-guides.md).
