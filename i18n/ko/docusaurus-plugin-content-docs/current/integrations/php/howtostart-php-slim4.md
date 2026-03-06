---
title: "dhtmlxScheduler와 PHP:Slim"
sidebar_label: "dhtmlxScheduler와 PHP:Slim"
---

# dhtmlxScheduler와 PHP:Slim 

이 튜토리얼은 Slim 4 프레임워크와 서버 측의 REST API를 결합하여 PHP 기반 Scheduler를 구축하는 필수 단계를 제공합니다.

:::note
이 튜토리얼은 Slim Framework v4.x를 사용합니다.
이전 버전을 사용 중이라면 [Slim Framework v3.x](integrations/other/howtostart-php.md) 가이드를 참고하세요.
:::

다른 플랫폼 및 프레임워크와의 통합을 위한 추가 튜토리얼도 제공됩니다:

- ["dhtmlxScheduler와 ASP.NET Core"](integrations/dotnet/howtostart-dotnet-core.md)
- ["dhtmlxScheduler와 ASP.NET MVC"](integrations/dotnet/howtostart-dotnet.md)
- ["dhtmlxScheduler와 Node.js"](integrations/node/howtostart-nodejs.md)
- ["dhtmlxScheduler와 PHP"](integrations/php/howtostart-plain-php.md)
- ["dhtmlxScheduler와 PHP:Laravel 연동하기"](integrations/php/howtostart-php-laravel.md)
- ["dhtmlxScheduler와 SalesForce LWC 통합하기"](integrations/salesforce/howtostart-salesforce.md)
- ["dhtmlxScheduler와 Ruby on Rails 연동하기"](integrations/other/howtostart-ruby.md)
- ["dhtmlxScheduler와 dhtmlxConnector 연동하기"](integrations/other/howtostart-connector.md)

PHP 애플리케이션을 개발할 때는 처음부터 모든 것을 직접 구축하기보다는 기존 프레임워크를 사용하는 것이 일반적입니다.

이 가이드에서는 [Slim 4](https://www.slimframework.com/) 프레임워크와 서버 측 REST API를 함께 사용하며, 데이터 저장소로는 MySQL을 사용합니다. CRUD 연산은 PDO를 통해 처리되며, 다른 프레임워크와 함께 사용할 수 있을 만큼 유연하게 설계되어 있습니다.

[완성된 데모가 GitHub에 준비되어 있습니다](https://github.com/DHTMLX/scheduler-howto-php-slim). 아래 단계를 따라 유사한 애플리케이션을 만들어보세요.

:::note
전체 소스 코드는 [GitHub](https://github.com/DHTMLX/scheduler-howto-php-slim)에서 확인할 수 있습니다.
:::

## 1단계. 프로젝트 초기화

### 프로젝트 생성

시작점은 Slim 4 프레임워크용 [스켈레톤 애플리케이션](https://github.com/slimphp/Slim-Skeleton)을 사용하는 것입니다.

Composer를 이용해 애플리케이션을 생성합니다:

~~~php
$ composer create-project slim/slim-skeleton scheduler-slim-howto
$ cd scheduler-slim-howto/
~~~

## 2단계. 페이지에 Scheduler 추가

다음 단계는 웹 페이지에 스케줄러를 배치하는 것으로, 두 가지 간단한 하위 단계로 구성됩니다.

### 뷰 생성

`app/templates` 디렉터리 내에 *basic.html* 파일을 생성합니다:

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

### 라우트 설정

새로운 페이지가 준비되면, 브라우저에서 접근할 수 있도록 라우트를 추가해야 합니다. **app/routes.php**에 다음을 추가하세요:

~~~js title="app/routes.php"
$app->get('/', function (Request $request, Response $response) {
$payload = file_get_contents('../app/templates/basic.html');
$response->getBody()->write($payload);
return $response;
});
~~~

이제 앱을 실행하면 페이지에 스케줄러가 표시됩니다:

![Scheduler initialization](/img/php_init_slim4.png)

## 3단계. 데이터베이스 준비

스케줄러가 준비되었으니, 다음 단계는 데이터베이스를 설정하고 애플리케이션과 연결하는 것입니다.

### 데이터베이스 생성

데이터베이스는 선호하는 MySQL 클라이언트(예: phpMyAdmin) 또는 커맨드라인을 통해 생성할 수 있습니다. 아래는 캘린더 이벤트용 데이터베이스와 테이블을 생성하는 SQL 예시입니다:

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

MySQL 콘솔을 통해 가져오려면, 위 SQL을 *dump.sql* 파일로 저장한 후 다음 명령을 실행하세요:

~~~
$ mysql -uuser -ppass scheduler < mysql_dump.sql
~~~

다음으로, *app/settings.php*를 열고 데이터베이스 설정 배열을 추가한 후 본인 환경에 맞게 수정하세요:

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

이후, *app/dependencies.php*를 수정하여 PDO 인스턴스를 애플리케이션 컨테이너에 주입하세요:

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

## 4단계. 데이터 불러오기

스케줄러는 이미 "/events" 엔드포인트에서 이벤트 데이터를 요청하도록 설정되어 있습니다. 이제 이 라우트에 실제 데이터를 제공하는 핸들러를 추가할 차례입니다.

스케줄러에는 여러 핸들러가 필요하므로, Slim 4의 [route groups](https://www.slimframework.com/docs/v4/objects/routing.html#route-groups)를 사용해 이를 정리합니다.

*app/routes.php*를 열고 "/events" 그룹과 GET 액션을 추가하세요:

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

이벤트가 데이터베이스에 추가되면, 스케줄러에서 확인할 수 있습니다.

### 동적 로딩

이 단계에서는 스케줄러가 시작 시 모든 이벤트 레코드를 불러옵니다. 이 방식은 데이터셋이 적을 때는 괜찮지만, 오래된 기록을 삭제하지 않고 계획이나 예약 용도로 사용할 경우 데이터가 점점 많아질 수 있습니다. 시간이 지나면 사용자가 페이지를 불러올 때마다 대량의 데이터를 요청하게 될 수 있습니다.

동적 로딩을 사용하면, 스케줄러가 현재 표시 중인 날짜 범위를 요청 파라미터로 전송하여, 서버는 관련 레코드만 반환합니다. 사용자가 보이는 날짜 범위를 바꿀 때마다 스케줄러는 새로운 데이터 하위 집합을 받아옵니다.

클라이언트 측에서 동적 로딩을 활성화하려면, *setLoadMode* 메서드에 "day", "week" 또는 "month" 중 하나의 값을 사용하세요. 예시:

~~~js
scheduler.config.xml_date="%Y-%m-%d %H:%i";
scheduler.init("scheduler_here", new Date(2019, 0, 20), "week");
scheduler.setLoadMode("day");
scheduler.load("/events");
~~~

서버 측에서는 다음과 같이 처리할 수 있습니다:

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


## 5단계. 변경사항 저장

### 백엔드 핸들러 구현하기

이 시점에서 스케줄러는 백엔드에서 데이터를 가져올 수 있습니다. 다음 단계는 변경 사항을 데이터베이스에 저장할 수 있도록 하는 것입니다.

클라이언트 측은 REST 모드로 동작하므로 이벤트를 관리하기 위해 POST, PUT, DELETE 요청을 보냅니다. 
[스케줄러에서 사용하는 요청 형식과 모든 라우트에 대해 참고하세요](guides/server-integration.md#request-parameters).

이를 위해, 데이터 모델에서 동작을 처리하는 컨트롤러를 정의하고, 해당 라우트를 설정하며, 클라이언트 측에서 데이터 저장 기능을 활성화해야 합니다.

*app/routes.php*로 돌아가서 "/events" 그룹에 대한 POST 요청 핸들러를 추가하세요. 이 핸들러는 새로운 이벤트 삽입을 처리합니다:

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
새로운 작업이 추가되면, 해당 작업의 ID가 응답 객체의 `tid` 속성으로 클라이언트에 반환됩니다.  
응답 JSON에는 다른 속성도 포함될 수 있으며, 클라이언트 측 핸들러에서 접근할 수 있습니다.
:::

마찬가지로, PUT 요청에 대한 핸들러를 추가하세요:

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

DELETE 요청에 대한 핸들러도 추가하세요:

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

### 클라이언트 측에서 데이터 저장 활성화하기

마지막으로, 클라이언트 측에서 방금 설정한 API와 상호작용할 수 있도록 구성해야 합니다:

~~~js title="public/basic.phtml"
scheduler.config.xml_date="%Y-%m-%d %H:%i";
scheduler.init("scheduler_here", new Date(2019, 0, 20), "week");
scheduler.setLoadMode("day");
 
// 백엔드에서 데이터 가져오기
scheduler.load("/events");
 
// 변경 사항을 백엔드로 전송
var dp = scheduler.createDataProcessor("/events"); dp.init(scheduler); /*!*/ 
// 데이터 교환 모드 설정
dp.setTransactionMode("REST"); /*!*/
~~~

애플리케이션을 재시작하면, 스케줄러에서 이벤트를 생성, 삭제, 수정할 수 있으며 페이지를 새로고침해도 모든 변경 사항이 유지됩니다.

![Scheduler CRUD](/img/php_crud_slim4.png)


## 반복 이벤트

반복 이벤트(예: 매일 반복)를 지원하려면, 스케줄러 페이지에 해당 확장 기능을 포함해야 합니다:

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

"events" 테이블에는 반복 정보 저장을 위한 추가 컬럼이 필요합니다. 반복 이벤트를 지원하는 테이블을 생성하는 SQL 쿼리는 다음과 같습니다:

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

또는 기존 events 테이블을 다음과 같이 업데이트할 수 있습니다:

~~~
ALTER TABLE `events` ADD COLUMN `event_pid` int(11) DEFAULT '0';
ALTER TABLE `events` ADD COLUMN `event_length` bigint(20) unsigned DEFAULT '0';
ALTER TABLE `events` ADD COLUMN `rec_type` varchar(25) DEFAULT '';
~~~

### 백엔드 업데이트

다음으로, [반복 이벤트 가이드](guides/recurring-events.md#editingdeleting-a-certain-occurrence-in-the-series)에 설명된 대로 핸들러를 업데이트하세요.

`POST` 라우트부터 시작하여, SQL 쿼리에 새로운 컬럼을 포함하도록 수정합니다.

또한 반복 이벤트의 특수 케이스를 처리해야 합니다: 반복 시리즈에서 특정 발생을 삭제할 때, 클라이언트는 해당 삭제를 나타내는 새 레코드를 생성하기 위해 *insert* 동작을 트리거합니다:

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
        // 반복 이벤트용 컬럼
        $body['event_pid'] ? $body['event_pid'] : 0,
        $body['event_length'] ? $body['event_length'] : 0, 
        $body['rec_type'] 
    ];

    // 반복 시리즈에서 단일 발생 삭제 처리
    $resultAction = 'inserted'; /*!*/
    if ($body['rec_type'] === "none") { /*!*/
        $resultAction = 'deleted'; /*!*/
    } /*!*/
    /*
    반복 이벤트 데이터 처리 종료
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

`PUT` 핸들러도 SQL 쿼리에 유사한 업데이트가 필요합니다.  
또한 반복 시리즈를 수정할 때, 해당 시리즈의 모든 수정된 발생을 삭제해야 하는 특수 케이스도 처리해야 합니다:

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
        // 반복 시리즈 업데이트 시, 모든 수정된 발생을 삭제
        // see https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
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

마지막으로, `DELETE` 핸들러는 두 가지 특수 케이스를 고려해야 합니다:

- 삭제할 이벤트에 `event_pid`가 비어있지 않다면, 이는 반복 시리즈의 수정된 인스턴스를 의미합니다. 이 레코드를 삭제하는 대신, 해당 `rec_type`을 `'none'`으로 업데이트하여 스케줄러가 해당 발생을 건너뛰도록 해야 합니다.
- 전체 반복 시리즈를 삭제할 때는, 해당 시리즈의 모든 수정된 인스턴스도 함께 삭제해야 합니다.

~~~js title="app/routes.php"
$group->delete('/{id}', function (Request $request, Response $response, array $args) {
    $db = $this->get('PDO');
    $id = $request->getAttribute('route')->getArgument('id');
    // 반복 이벤트 지원을 위한 로직
    // https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
    $subQueryText = 'SELECT * FROM `recurring_events` WHERE id="?" LIMIT 1;';
    $subQuery = $db->prepare($subQueryText);
    $subQuery->execute([$id]);
    $event = $subQuery->fetch(PDO::FETCH_ASSOC);

    if ($event['event_pid']) {
        // 반복 시리즈에서 수정된 발생 삭제
        // 삭제 대신, rec_type을 'none'으로 업데이트하여 해당 발생을 건너뜀
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
        // 반복 시리즈 삭제 시, 모든 수정된 발생도 함께 삭제
        $subQueryText = 'DELETE FROM `recurring_events` WHERE `event_pid`=? ;';
        $subQuery = $db->prepare($subQueryText);
        $subQuery->execute([$id]);
    }

    /*
        반복 이벤트 데이터 처리 종료
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

### 반복 시리즈 파싱하기
반복 이벤트는 데이터베이스에 단일 레코드로 저장되며, Scheduler는 클라이언트 측에서 이를 분할할 수 있습니다. 
개별 이벤트의 날짜가 서버 측에서 필요하다면, dhtmlxScheduler의 반복 이벤트를 PHP에서 파싱할 수 있도록 도와주는 헬퍼 라이브러리가 제공됩니다. 


[이 사용 준비가 된 라이브러리를 GitHub에서 확인할 수 있습니다.](https://github.com/DHTMLX/scheduler-helper-php)

## 애플리케이션 보안

dhtmlxScheduler는 클라이언트 측에서 동작하며, 유연성을 유지하기 위해 내장 보안 기능을 포함하지 않습니다. 
클라이언트 측 코드만으로는 신뢰할 수 있는 보안을 보장할 수 없으므로, 백엔드 개발자가 보안 문제를 처리하는 것이 필수적입니다. 

고려해야 할 주요 사항은 다음과 같습니다:

- SQL 인젝션. 예제에서는 모든 작업에 대해 파라미터화된 SQL 쿼리를 사용하여 SQL 인젝션 취약점을 방지합니다.

- XSS 공격. 클라이언트 측에서는 사용자 입력을 백엔드로 전송하기 전에, 또는 서버 데이터를 화면에 표시하기 전에 별도의 정제 과정을 거치지 않습니다.  
이 예제에는 XSS 필터링이 포함되어 있지 않으므로, 이 샘플을 앱에 사용할 계획이라면 적절한 정제 과정을 추가해야 합니다.

잠재적인 XSS 공격을 방지하기 위해, HTML에 삽입되는 모든 문자열이 적절하게 이스케이프 처리되었는지 확인해야 합니다. 
이 예제에서는 이벤트의 "text" 속성을 클라이언트 측에서 로드할 때 이스케이프 처리하면 충분합니다:

~~~js title="app/routes.php"
$app->group('/events', function ($group) {
    $group->get('',  function (Request $request, Response $response, array $args) {
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

        // escaping unsafe text
        foreach($result as $index=>$event){
            $result[$index]["text"] = htmlentities($event["text"]);
        }

        $payload = json_encode($result);

        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    });
~~~

## 오류 처리

백엔드에서 작업이 실패할 경우, 클라이언트 측에서는 해당 작업의 "error" 상태를 나타내는 응답을 기대합니다([자세한 내용 보기](guides/server-integration.md#error-handling)).

이것은 기본 Error Handler를 커스터마이징하여 구현할 수 있습니다. 
`src/Application/Handlers/HttpErrorHandler.php` 파일을 수정하고, 다음 부분을:

~~~js title="src/Application/Handlers/HttpErrorHandler.php"
if (
    !($exception instanceof HttpException)
    && ($exception instanceof Exception || $exception instanceof Throwable)
    && $this->displayErrorDetails
) {
    $error->setDescription($exception->getMessage());
}
~~~

다음 코드로 교체하세요:

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

클라이언트 측에서는 dataProcessor의 [onAfterUpdate](https://docs.dhtmlx.com/api__dataprocessor_onafterupdate_event.html) 이벤트를 사용하여 이러한 오류를 감지할 수 있습니다:

~~~php
dp.init(scheduler);
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
    if(action == "error"){
        // do something here
    }
});
~~~

## 문제 해결

Scheduler를 PHP와 통합하는 모든 단계를 수행했음에도 이벤트가 페이지에 나타나지 않는 경우, ["백엔드 통합 문제 해결"](guides/troubleshooting.md) 문서를 참고하세요. 
이 문서는 일반적인 문제의 근본 원인을 파악하는 데 도움이 됩니다.

## 다음 단계

이제 완전히 동작하는 Scheduler를 갖추게 되었습니다. 
전체 코드는 [GitHub](https://github.com/DHTMLX/scheduler-howto-php-slim)에서 확인, 복제, 다운로드하여 프로젝트에 사용할 수 있습니다.

또한, [Scheduler의 다양한 기능을 다루는 가이드](/guides/)나 [다른 백엔드 프레임워크와의 통합 튜토리얼](integrations/howtostart-guides.md)도 살펴볼 수 있습니다.

