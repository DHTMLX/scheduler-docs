---
title: "dhtmlxScheduler с PHP: Slim 3"
sidebar_label: "dhtmlxScheduler с PHP: Slim 3"
---

# dhtmlxScheduler с PHP: Slim 3

В этом руководстве рассматриваются основные шаги по созданию планировщика на PHP с использованием Slim 3 Framework и REST API на серверной стороне.

:::note
Это руководство использует устаревшую версию Slim Framework v3.x. Для самой новой версии см. руководство [Slim Framework v4.x](integrations/php/howtostart-php-slim4.md).
:::

Также доступны руководства по интеграции с другими платформами и фреймворками:

- [dhtmlxScheduler с ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxScheduler с ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxScheduler с Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxScheduler с PHP](integrations/php/howtostart-plain-php.md)
- [dhtmlxScheduler с PHP:Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxScheduler с PHP: Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxScheduler с SalesForce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxScheduler с Ruby on Rails](integrations/other/howtostart-ruby.md)
- [dhtmlxScheduler с dhtmlxConnector](integrations/other/howtostart-connector.md)

При разработке PHP-приложений обычно используется готовый фреймворк, а не создание всего с нуля.

В данном случае используется [Slim 3](https://www.slimframework.com/) вместе с REST API на сервере и MySQL для хранения данных. Операции CRUD будут реализованы через PDO, что обеспечивает гибкость и возможность использования с другими фреймворками.

Вы можете ознакомиться с [полной демо-версией на GitHub](https://github.com/DHTMLX/scheduler-howto-php-slim/tree/slim-3.x). Следуйте пошаговым инструкциям для создания этого приложения.

:::note
Полный исходный код [доступен на GitHub](https://github.com/DHTMLX/scheduler-howto-php-slim/tree/slim-3.x).
:::

## Шаг 1. Инициализация проекта

### Создание проекта

В качестве отправной точки используйте [skeleton application](https://github.com/slimphp/Slim-Skeleton) для Slim 3.

Начните с создания приложения с помощью Composer:

~~~php
$ composer create-project slim/slim-skeleton scheduler-slim-howto
$ cd scheduler-slim-howto/
$ composer require illuminate/database "~5.1"
~~~

## Шаг 2. Добавление Scheduler на страницу

Далее добавьте планировщик на страницу. Это включает два простых шага.

### Создание view

Создайте файл *scheduler.phtml* в папке `templates`:

~~~js title="templates/scheduler.phtml"
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
            dp.setTransactionMode("REST"); // use to transfer data with REST
            dp.init(scheduler);
        </script>
    </body>
</html>
~~~

### Настройка маршрутов

Когда новая страница готова, настройте маршрут в **src/routes.php**, чтобы получить к ней доступ через браузер:

~~~js title="src/routes.php"
$app->get('/', function (Request $request, Response $response, array $args) {
    return $this->renderer->render($response, 'scheduler.phtml', $args);
});
~~~

Теперь вы можете запустить приложение и увидеть отображение планировщика:

![Scheduler initialization](/img/howtostart_slim_init.png)

## Шаг 3. Подготовка базы данных

На этом этапе планировщик пуст. Следующий шаг - создать базу данных и подключить её к приложению.

### Создание базы данных

Вы можете создать базу данных через любой удобный MySQL-клиент или из консоли. Вот SQL для создания базы и таблицы событий календаря:

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

Чтобы импортировать через консоль MySQL, сохраните вышеуказанный код в файл *dump.sql* и выполните:

~~~
$ mysql -uuser -ppass scheduler < mysql_dump.sql
~~~

Далее откройте *src/settings.php*, добавьте массив конфигурации базы данных и укажите свои учетные данные:

~~~js title="src/settings.php"
'pdo' => [
    'engine' => 'mysql',
    'host' => 'localhost',
    'database' => 'scheduler_howto_php',
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

Затем в *src/dependencies.php* добавьте экземпляр PDO в контейнер приложения:

~~~js title="src/dependencies.php"
// Добавление нового экземпляра PDO в контейнер
$container['database'] = function($container) {

   $config = $container->get('settings')['pdo'];
   $dsn = "{$config['engine']}:host="{$config["'host']};dbname="{$config["'database']};
   charset="{$config["'charset']}";
   $username = $config['username'];
   $password = $config['password'];

   return new PDO($dsn, $username, $password, $config['options']);
};
~~~

## Шаг 4. Загрузка данных

Планировщик уже настроен на вызов "/events" для получения событий. Теперь добавьте обработчик этого запроса, чтобы отдавать реальные данные.

Поскольку потребуется несколько обработчиков, [группы маршрутов](https://www.slimframework.com/docs/v3/objects/router.html#route-groups) помогут их организовать.

Откройте *src/routes.php* и добавьте группу для "/events" с действием GET:

~~~js title="src/routes.php"
$app->group('/events', function () {
    $this->get('', function (Request $request, Response $response, array $args) {
        $db = $this->database;
        $queryText = 'SELECT * FROM `events`';

        $query = $db->prepare($queryText);
        $query->execute();
        $result = $query->fetchAll();

        return $response->withJson($result);
    });
});
~~~

После добавления событий в базу они появятся в планировщике.


### Динамическая загрузка

На этом этапе планировщик загружает все события сразу, что допустимо для небольших наборов данных. Однако, если приложение используется для планирования или бронирования и старые записи не удаляются, количество событий быстро возрастет, что приведет к большим объемам данных при каждой загрузке страницы.

Динамическая загрузка позволяет запрашивать только события, видимые в текущем диапазоне дат. Каждый раз при смене вида гридом, планировщик получает только соответствующие данные.

Для этого на клиенте установите опцию *setLoadMode* в "day", "week" или "month":

~~~js
scheduler.config.xml_date="%Y-%m-%d %H:%i";
scheduler.init("scheduler_here", new Date(2019, 0, 20), "week");
scheduler.setLoadMode("day");
scheduler.load("/events");
~~~

На сервере обработайте фильтры по датам следующим образом:

~~~js title="src/routes.php"
$app->group('/events', function () {
    $this->get('', function (Request $request, Response $response, array $args) {
        $db = $this->database;
        $queryText = 'SELECT * FROM `events`';

        $params = $request->getQueryParams(); /*!*/
        $queryParams = []; /*!*/

        if (isset($params['from']) && isset($params['to'])) {/*!*/
            $queryText .= " WHERE `end_date`>=? AND `start_date` < ?;";/*!*/
            $queryParams = [$params['from'], $params['to']];/*!*/
        }/*!*/

        $query = $db->prepare($queryText);
        $query->execute($queryParams);/*!*/
        $result = $query->fetchAll();

        return $response->withJson($result);
    });
});
~~~

## Шаг 5. Сохранение изменений

### Реализация серверных обработчиков

Теперь планировщик может читать данные с сервера. Следующий шаг - реализовать сохранение изменений в базу данных.

Клиент работает в режиме REST, отправляя запросы POST, PUT и DELETE для действий с событиями. 
[Подробнее о формате запросов и маршрутах, используемых планировщиком](guides/server-integration.md).

Определите контроллер для обработки этих действий, настройте маршруты и включите сохранение на клиенте.

Добавьте обработчик POST в *src/routes.php* для вставки новых событий:

~~~js title="src/routes.php"
$this->post('', function (Request $request, Response $response, array $args) {
    $db = $this->database;
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

    return $response->withJson($result);
});
~~~

:::note
При добавлении нового события сервер возвращает его ID в свойстве `tid` ответа. JSON-ответ может содержать дополнительные свойства, доступные на клиенте.
:::

Аналогично, добавьте обработчик PUT для обновления событий:

~~~php
$this->put('/{id}', function (Request $request, Response $response, array $args) {
    $db = $this->database;
    $id = $request->getAttribute('route')->getArgument('id');
    $body = $request->getParsedBody();

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

    return $response->withJson($result);
});
~~~

И обработчик DELETE для удаления событий:

~~~php
$this->delete('/{id}', function (Request $request, Response $response, array $args) {
    $db = $this->database;
    $id = $request->getAttribute('route')->getArgument('id');
    $queryText = 'DELETE FROM `events` WHERE `id`=? ;';

    $query = $db->prepare($queryText);
    $query->execute([$id]);

    $result = [
        'action' => 'deleted'
    ];

    return $response->withJson($result);
});
~~~

### Включение сохранения данных на клиентской стороне

Далее настроим клиентскую часть для работы с только что созданным API:

~~~js title="templates/basic.phtml"
~~~js
scheduler.config.xml_date="%Y-%m-%d %H:%i";
scheduler.init("scheduler_here", new Date(2019, 0, 20), "week");
scheduler.setLoadMode("day");

// загрузка данных с backend
scheduler.load("/events");

// отправка изменений на backend
var dp = scheduler.createDataProcessor("/events"); /*!*/
dp.init(scheduler);/*!*/

// установка режима обмена данными
dp.setTransactionMode("REST");/*!*/
~~~

После перезапуска приложения вы сможете создавать, удалять и изменять события в планировщике. Все изменения сохраняются и остаются после обновления страницы.

![Scheduler CRUD](/img/howtostart_slim_crud.png)

## Повторяющиеся события

Чтобы включить функции повторения (например, "повторять событие ежедневно"), необходимо добавить соответствующее расширение на страницу планировщика:

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

Для хранения данных о повторениях в таблице "events" необходимы дополнительные столбцы. Вот SQL-запрос для создания таблицы с поддержкой повторяющихся событий:

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

Либо вы можете обновить существующую таблицу events из предыдущего шага следующими командами:

~~~
ALTER TABLE `events` ADD COLUMN `event_pid` int(11) DEFAULT '0';
ALTER TABLE `events` ADD COLUMN `event_length` bigint(20) unsigned DEFAULT '0';
ALTER TABLE `events` ADD COLUMN `rec_type` varchar(25) DEFAULT '';
~~~

###  Обновление backend

Также необходимо обновить обработчики на сервере, как описано в [этом разделе](guides/recurring-events.md#editingdeletingacertainoccurrenceintheseries).

Начнем с маршрута `POST`: обновите SQL-запрос, чтобы добавить новые столбцы.

Кроме того, обработайте особый случай для повторяющихся событий: удаление отдельного экземпляра серии повторяющихся событий требует создания новой записи. Клиент вызовет действие *insert* для этого:

~~~js title="src/routes.php"
$this->post('', function (Request $request, Response $response, array $args) {
  $db = $this->database;
  $body = $request->getParsedBody();

    $queryText = 'INSERT INTO `recurring_events` SET
                `start_date`=?,
                `end_date`=?,
                `text`=?,
                `event_pid`=?,/*!*/
                `event_length`=?,/*!*/
                `rec_type`=?';/*!*/
  $queryParams = [
  $body['start_date'],
  $body['end_date'],
  $body['text'],
  // recurring events columns
  $body['event_pid'] ? $body['event_pid'] : 0,/*!*/
  $body['event_length'] ? $body['event_length'] : 0,/*!*/
  $body['rec_type']/*!*/
  ];

  // удаление одного экземпляра из серии повторяющихся событий
  $resultAction = 'inserted';/*!*/
  if ($body['rec_type'] === "none") {/*!*/
  $resultAction = 'deleted';//!
  }
  /*
  конец обработки данных повторяющихся событий
    */

  $query = $db->prepare($queryText);
  $query->execute($queryParams);

  $result = [
  'tid' => $db->lastInsertId(),
  'action' => $resultAction
  ];

  return $response->withJson($result);
});
~~~

Обработчик `PUT` также необходимо обновить аналогичным образом. Дополнительно, при изменении серии повторяющихся событий все измененные экземпляры этой серии должны быть удалены:

~~~js title="src/routes.php"
$this->put('/{id}', function (Request $request, Response $response, array $args) {
  $db = $this->database;

  $id = $request->getAttribute('route')->getArgument('id');
  $body = $request->getParsedBody();

    $queryText = 'UPDATE `recurring_events` SET
            `start_date`=?,
            `end_date`=?,
            `text`=?,
            `event_pid`=?,/*!*/
            `event_length`=?,/*!*/
            `rec_type`=?/*!*/
            WHERE `id`=?';
  $queryParams = [
  $body['start_date'],
  $body['end_date'],
  $body['text'],

  $body['event_pid'] ? $body['event_pid'] : 0,/*!*/
  $body['event_length'] ? $body['event_length'] : 0,/*!*/
  $body['rec_type'],//!

  $id
  ];

  if ($body['rec_type'] && $body['rec_type'] != 'none') {/*!*/
  // все измененные экземпляры должны быть удалены при обновлении серии повторяющихся событий
  // https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
        $subQueryText = 'DELETE FROM `recurring_events` WHERE `event_pid`=? ;';
  $subQuery = $db->prepare($subQueryText);
  $subQuery->execute([$id]);
  }

  $query = $db->prepare($queryText);
  $query->execute($queryParams);

  $result = [
  'action' => 'updated'
  ];

  return $response->withJson($result);
});
~~~

Наконец, для действия `DELETE` требуется обработка двух особых случаев:

- Если у удаляемого события заполнен `event_pid`, это означает, что пользователь удаляет измененный экземпляр серии повторяющихся событий. Вместо удаления записи из базы данных необходимо установить `rec_type='none'`, чтобы планировщик пропустил это событие.

- Если пользователь удаляет всю серию повторяющихся событий, необходимо также удалить все измененные экземпляры этой серии.

~~~js title="src/routes.php"
$this->delete('/{id}', function (Request $request, Response $response, array $args) {
  $db = $this->database;
  $id = $request->getAttribute('route')->getArgument('id');

  // логика поддержки повторяющихся событий
  // https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
    $subQueryText = 'SELECT * FROM `recurring_events` WHERE id="?" LIMIT 1;';/*!*/
  $subQuery = $db->prepare($subQueryText);/*!*/
  $subQuery->execute([$id]);/*!*/
  $event = $subQuery->fetch(PDO::FETCH_ASSOC);/*!*/

  if ($event['event_pid']) {/*!*/
  // удаление измененного экземпляра из серии повторяющихся событий
  // Вместо удаления обновляем rec_type на 'none' для этого события
       $subQueryText='UPDATE `recurring_events` SET `rec_type`='none' WHERE `id`=?;';
  $subQuery = $db->prepare($subQueryText);
  $subQuery->execute([$id]);

  $result = [
  'action' => 'deleted'
  ];

  return $response->withJson($result);
  }

  if ($event['rec_type'] && $event['rec_type'] != 'none') {//!
  // при удалении серии повторяющихся событий удаляются все измененные экземпляры
        $subQueryText = 'DELETE FROM `recurring_events` WHERE `event_pid`=? ;';
  $subQuery = $db->prepare($subQueryText);
  $subQuery->execute([$id]);
  }

  /*
  конец обработки данных повторяющихся событий
    */
    $queryText = 'DELETE FROM `recurring_events` WHERE `id`=? ;';

  $query = $db->prepare($queryText);
  $query->execute([$id]);

  $result = [
  'action' => 'deleted'
  ];
  
  return $response->withJson($result);
});
~~~

###  Разбор серии повторяющихся событий

Повторяющиеся события хранятся в базе данных как отдельные записи, но могут быть развернуты в отдельные экземпляры на клиентской стороне с помощью Scheduler.

Если вам требуется работать с отдельными датами событий на сервере, рассмотрите возможность использования PHP-библиотеки для разбора повторяющихся событий в dhtmlxScheduler.

[Готовую к использованию библиотеку можно найти на GitHub](https://github.com/DHTMLX/scheduler-helper-php).

## Безопасность приложения

dhtmlxScheduler — это клиентское решение и не содержит встроенных средств безопасности, чтобы оставаться гибким. Поэтому только клиентская часть не обеспечивает надежную защиту.

Это означает, что ответственность за безопасность приложения лежит на backend-разработчиках. Основные моменты:

- SQL-инъекции: В этом примере используются параметризованные SQL-запросы, что помогает защититься от атак через инъекции.

- XSS-атаки: Клиентская часть не фильтрует пользовательский ввод перед отправкой на сервер и не очищает данные сервера перед отображением на странице. В этом примере не реализована фильтрация XSS, поэтому рекомендуется добавить защиту, если вы планируете использовать этот код в своем приложении.


## Обработка ошибок

Если backend не может выполнить действие, клиент ожидает ответ со статусом "error", как описано [здесь](guides/server-integration.md#errorhandling).

Один из способов реализовать это — добавить [middleware](https://www.slimframework.com/docs/v3/concepts/middleware.html), который оборачивает ваши обработчики в блок `try-catch` и отправляет сообщение об ошибке клиенту в случае возникновения исключения.

Вы можете определить этот middleware в *src/routes.php*:

~~~js title="src/routes.php"
$schedulerApiMiddleware = function ($request, $response, $next) {
  try {
  $response = $next($request, $response);
  } catch (Exception $e) {
  // Сбросить ответ и отправить детали ошибки
  $response = new SlimHttpResponse();
  return $response->withJson([
  'action' => 'error',
  'message' => $e->getMessage()
  ]);
  }
  return $response;
};
~~~

Затем подключите его к вашей группе маршрутов:

~~~js title="src/routes.php"
$app->group('/events', function () {
  ...
})->add($schedulerApiMiddleware);
~~~

На клиентской стороне вы можете отлавливать эти ошибки с помощью события [onAfterUpdate](https://docs.dhtmlx.com/api__dataprocessor_onafterupdate_event.html) объекта dataProcessor:

~~~php
dp.init(scheduler);
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
  if(action == "error"){
  // обработка ошибки
  }
});
~~~

## Устранение неполадок

Если вы выполнили все шаги, но Scheduler по-прежнему не отображает события на странице, ознакомьтесь со статьей [Устранение проблем с интеграцией Backend](guides/troubleshooting.md). В ней приведены рекомендации по поиску и устранению причин проблемы.


## Что дальше

На этом этапе у вас есть полностью рабочий Scheduler. Полный исходный код доступен на [GitHub](https://github.com/DHTMLX/scheduler-howto-php-slim/tree/slim-3.x) - вы можете клонировать, скачать и адаптировать его под свои проекты.

Также вы можете изучить [руководства по различным возможностям Scheduler](/guides/) или туториалы по [интеграции Scheduler с другими backend-фреймворками](integrations/howtostart-guides.md).
