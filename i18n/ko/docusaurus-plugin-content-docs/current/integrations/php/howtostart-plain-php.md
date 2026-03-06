---
title: "dhtmlxScheduler와 PHP"
sidebar_label: "dhtmlxScheduler와 PHP"
---

# dhtmlxScheduler와 PHP 

이 튜토리얼은 프레임워크에 의존하지 않고 PHP로 Scheduler를 구축하는 데 필요한 모든 필수 정보를 제공합니다.

설정에는 데이터 저장을 위해 MySQL을 사용하며, 데이터베이스 접근을 위해 [PDO 인터페이스](https://www.php.net/manual/en/ref.pdo-mysql.php)를 활용합니다. 이 튜토리얼을 따라하려면 PHP 5.4 이상과 [PDO_MYSQL](https://www.php.net/manual/en/ref.pdo-mysql.php) 확장 기능이 활성화되어 있어야 하며, MySQL 또는 MariaDB가 필요합니다.

서버 사이드 통합을 다른 플랫폼이나 프레임워크에서 진행하고 싶다면, 다음과 같은 튜토리얼도 참고할 수 있습니다:

- ["dhtmlxScheduler와 ASP.NET Core"](integrations/dotnet/howtostart-dotnet-core.md)
- ["dhtmlxScheduler와 ASP.NET MVC"](integrations/dotnet/howtostart-dotnet.md)
- ["dhtmlxScheduler와 Node.js"](integrations/node/howtostart-nodejs.md)
- ["dhtmlxScheduler와 PHP:Slim"](integrations/php/howtostart-php-slim4.md)
- ["dhtmlxScheduler와 PHP:Laravel 연동하기"](integrations/php/howtostart-php-laravel.md)
- ["dhtmlxScheduler와 SalesForce LWC 통합하기"](integrations/salesforce/howtostart-salesforce.md)
- ["dhtmlxScheduler와 Ruby on Rails 연동하기"](integrations/other/howtostart-ruby.md)
- ["dhtmlxScheduler와 dhtmlxConnector 연동하기"](integrations/other/howtostart-connector.md)

또한 [GitHub의 전체 데모](https://github.com/DHTMLX/scheduler-howto-php-plain)를 확인하고, 단계별 안내를 따라 애플리케이션을 빌드할 수 있습니다.

:::note
전체 소스 코드는 [GitHub에서 확인할 수 있습니다](https://github.com/DHTMLX/scheduler-howto-php-plain).
:::

## 1단계. 프로젝트 생성

애플리케이션을 위한 새 디렉토리를 만들어 시작하세요.

빈 폴더를 생성하고 이름을 `scheduler-howto-php-plain`으로 지정합니다.

## 2단계. 페이지에 Scheduler 추가

다음으로, 스케줄러를 호스팅할 페이지를 만듭니다.

`scheduler-howto-php-plain` 폴더 내에 `index.html` 파일을 만들고 아래 내용을 추가하세요.

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

앱을 실행하면, 스케줄러가 페이지에 표시됩니다:

![Scheduler initialization](/img/php_plain.png)

## 3단계. 데이터베이스 준비

이 시점에서 스케줄러는 비어 있습니다. 다음 단계는 데이터베이스를 설정하고 애플리케이션과 연결하는 것입니다.

### 데이터베이스 생성

선호하는 MySQL 클라이언트(예: phpMyAdmin)나 커맨드 라인을 통해 데이터베이스를 만들 수 있습니다. 아래 SQL을 활용하여 새 데이터베이스와 캘린더 이벤트용 테이블을 생성하세요:

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

MySQL 콘솔을 사용할 경우, 위 SQL을 *dump.sql* 파일로 저장한 뒤 아래처럼 실행하세요:

~~~
$ mysql -uuser -ppass scheduler < mysql_dump.sql
~~~

## 4단계. 데이터 불러오기

데이터베이스가 준비되었으니, 이제 스케줄러에 데이터를 불러올 차례입니다.

프로젝트 디렉토리 내에 `data`라는 새 폴더를 만드세요.

먼저, 데이터베이스 연결 정보를 설정 파일 `data/config.php`에 정의합니다:

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

"localhost", "scheduler_howto_php", "root", "" 부분을 실제 데이터베이스 설정에 맞게 수정하세요.

다음으로, 클라이언트가 데이터베이스에서 데이터를 불러오고 변경사항을 저장할 때 호출할 PHP 스크립트를 추가합니다.

`data` 폴더 내에 `api.php` 파일을 만들고, 데이터베이스 연결을 여는 코드로 시작하세요:

~~~js title="data/api.php"
<?php
require_once("config.php");
$db = new PDO($dsn, $username, $password, $options);
~~~

그 다음, 데이터베이스에서 스케줄러 이벤트를 가져오는 함수를 구현합니다:

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

이후, 들어오는 요청에 응답하는 리퀘스트 핸들러를 만듭니다:

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

데이터베이스에 이벤트를 추가하면, 이제 스케줄러에 해당 이벤트들이 표시됩니다.

### 동적 로딩(Dynamic loading)

현재는 스케줄러가 데이터베이스의 모든 이벤트 레코드를 한 번에 불러옵니다. 데이터가 적은 경우에는 괜찮지만, 예약 시스템 등에서 오래된 기록이 쌓이면 데이터 전송량이 급격히 늘어날 수 있습니다. 몇 달간 사용하면, 페이지를 불러올 때마다 수 메가바이트의 이벤트를 요청하게 될 수도 있습니다.

이런 문제는 동적 로딩을 활성화하여 방지할 수 있습니다. 스케줄러가 현재 표시되는 날짜 범위를 파라미터로 서버에 전송하면, 서버는 해당 범위 내의 이벤트만 반환합니다. 사용자가 다른 날짜 범위로 이동할 때마다, 스케줄러는 해당 기간에 해당하는 데이터만 불러옵니다.

클라이언트 측에서 동적 로딩을 활성화하려면 *setLoadMode* 옵션을 "day", "week", "month" 중 하나로 설정하세요. 예를 들어, 아래 코드를 클라이언트 코드에 추가합니다:

~~~js title="index.html"
scheduler.init("scheduler_here", new Date(2019, 0, 20), "week");
scheduler.setLoadMode("day"); /*!*/

// load data from the backend
scheduler.load("data/api.php");
~~~

서버 측에서는, `read` 함수를 다음과 같이 수정하여 처리할 수 있습니다:

~~~js title="data/api.php"
function read($db, $requestParams){
    $queryParams = [];
    $queryText = "SELECT * FROM `events`";
 
    // handle dynamic loading
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

## 5단계. 변경사항 저장

### 백엔드 핸들러 구현

지금까지는 스케줄러가 백엔드에서 데이터를 읽어올 수 있었습니다. 다음 단계는 변경사항을 데이터베이스에 저장할 수 있게 하는 것입니다.

클라이언트는 JSON 모드로 동작하며, 이벤트 액션을 수행하기 위해 POST 요청을 보냅니다. 요청 포맷 및 라우트에 대한 자세한 내용은 [Server-Side Integration](guides/server-integration.md#request-parameters)에서 확인할 수 있습니다.

데이터베이스에서 이벤트를 생성, 수정, 삭제하는 함수를 추가하세요.

`data/api.php`에 아래 함수를 추가합니다:

~~~js title="data/api.php"
// create a new event
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
// update an event
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
// delete an event
function delete($db, $id){
    $queryText = "DELETE FROM `events` WHERE `id`=? ;";
    $query = $db->prepare($queryText);
    $query->execute([$id]);
}
~~~

그런 다음, POST 요청 핸들러를 아래와 같이 업데이트하세요:

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
새 이벤트가 생성되면, 해당 데이터베이스 ID가 응답의 **tid** 속성으로 클라이언트에 반환됩니다. 응답 JSON에는 필요에 따라 추가 속성을 포함할 수 있으며, 이는 클라이언트 측 핸들러에서 접근할 수 있습니다.
:::

### 클라이언트 측 데이터 저장 활성화

다음으로, 방금 생성한 API와 연동할 수 있도록 클라이언트 측을 설정합니다:

~~~js title="index.html"
scheduler.init("scheduler_here", new Date(2019, 0, 20), "week");
scheduler.setLoadMode("day");
 
// 백엔드에서 데이터 불러오기
scheduler.load("data/api.php"); /*!*/
 
// 백엔드로 업데이트 전송
var dp = scheduler.createDataProcessor({ /*!*/
    url: "data/api.php", /*!*/
    mode: "JSON" /*!*/
}); /*!*/
~~~

이제 애플리케이션을 재시작하면, 스케줄러에서 이벤트를 생성, 삭제, 수정할 수 있으며, 모든 변경 사항이 페이지를 새로고침해도 유지됩니다.

![Scheduler CRUD](/img/php_plain_crud.png)

이 단계에서, 이벤트를 MySQL 데이터베이스에 저장하는 기본적인 스케줄러가 완성되었습니다.

## 반복 이벤트

"매일 반복"과 같은 반복 이벤트를 활성화하려면, 스케줄러 페이지에 적절한 확장 기능을 추가해야 합니다:

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

반복 이벤트 정보를 저장하려면 "events" 테이블에 추가 컬럼이 필요합니다. 반복 이벤트를 지원하는 테이블을 생성하는 SQL 쿼리는 다음과 같습니다:

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

또는, 이전 단계의 기존 events 테이블을 다음과 같이 업데이트할 수 있습니다:

~~~
ALTER TABLE `events` ADD COLUMN `event_pid` int(11) DEFAULT '0';
ALTER TABLE `events` ADD COLUMN `event_length` bigint(20) unsigned DEFAULT '0';
ALTER TABLE `events` ADD COLUMN `rec_type` varchar(25) DEFAULT '';
~~~

### 백엔드 업데이트

PHP 스크립트에 몇 가지 조정이 필요합니다.

먼저, `INSERT` 액션의 SQL 쿼리를 새 컬럼을 포함하도록 수정합니다.

다음으로, 반복 이벤트의 특수한 경우를 처리해야 합니다. 반복 시리즈의 단일 항목을 삭제할 때는 새로운 레코드를 생성해야 하므로, 클라이언트가 *insert* 액션을 호출합니다:

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
        // 반복 이벤트 컬럼
        $event["event_pid"] ? $event["event_pid"] : 0,  /*!*/
        $event["event_length"] ? $event["event_length"] : 0,  /*!*/
        $event["rec_type"]  /*!*/
    ];
    $query = $db->prepare($queryText);
    $query->execute($queryParams);
    return $db->lastInsertId();
}
~~~

또한, `POST` 요청 핸들러도 업데이트해야 합니다. 클라이언트는 건너뛴 반복 항목을 삽입한 후 서버가 "deleted" 상태를 반환하길 기대합니다:

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
            // 반복 시리즈에서 단일 항목 삭제
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

업데이트 핸들러도 SQL 쿼리에 유사한 변경이 필요합니다. 또한, 반복 시리즈를 수정할 때 해당 시리즈의 모든 수정된 항목을 삭제해야 합니다:

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
        // 반복 시리즈를 업데이트할 때 모든 수정된 항목을 삭제해야 함 /*!*/
        //https://docs.dhtmlx.com/scheduler/ server_integration.html#recurringevents /*!*/
        $subQueryText = "DELETE FROM `events` WHERE `event_pid`=? ;"; /*!*/
        $subQuery = $db->prepare($subQueryText); /*!*/
        $subQuery->execute([$id]); /*!*/
    } /*!*/
    $query = $db->prepare($queryText);
    $query->execute($queryParams);
}
~~~

마지막으로, `DELETE` 액션은 두 가지 특수한 경우를 처리해야 합니다:
  
- 이벤트의 `event_pid`가 비어 있지 않으면, 반복 시리즈의 수정된 인스턴스를 삭제하는 것입니다. 이 경우 레코드를 삭제하지 않고 `rec_type='none'`으로 설정하여 해당 항목이 스케줄러에서 제외되도록 합니다.
  
- 전체 반복 시리즈를 삭제할 때는, 해당 시리즈의 모든 수정된 인스턴스도 함께 삭제해야 합니다.

~~~js title="data/api.php"
function delete($db, $id){
    // 반복 이벤트 지원을 위한 일부 로직
    // https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
    $subQueryText = "SELECT * FROM `events` WHERE id="?" LIMIT 1;";
    $subQuery = $db->prepare($subQueryText);
    $subQuery->execute([$id]);
    $event = $subQuery->fetch();
    if ($event["event_pid"]) {
        // 반복 시리즈의 수정된 항목 삭제
        // event_pid 값이 있는 이벤트가 삭제되면, 삭제하는 대신 rec_type==none으로 업데이트해야 함
        $subQueryText="UPDATE `events` SET `rec_type`='none' WHERE `id`=?;";
        $subQuery = $db->prepare($subQueryText);
        $subQuery->execute([$id]);
    }else{
        if ($event["rec_type"] && $event["rec_type"] != "none") { /*!*/
            // 반복 시리즈를 삭제하면 해당 시리즈의 모든 수정된 항목도 삭제
            $subQueryText = "DELETE FROM `events` WHERE `event_pid`=? ;";
            $subQuery = $db->prepare($subQueryText);
            $subQuery->execute([$id]);
        }
        /*
        반복 이벤트 데이터 처리 종료
        */
        $queryText = "DELETE FROM `events` WHERE `id`=? ;";
        $query = $db->prepare($queryText);
        $query->execute([$id]);
    }
}
~~~

## 애플리케이션 보안

dhtmlxScheduler는 클라이언트 측에서 동작하며, 유연성을 위해 내장 보안 기능을 제공하지 않습니다. 클라이언트 측 보안만으로는 충분하지 않으므로, 백엔드 개발자가 애플리케이션 보안을 책임져야 합니다. 주요 고려 사항은 다음과 같습니다:

- SQL 인젝션: 본 예제는 모든 작업에 파라미터화된 SQL 쿼리를 사용하여 SQL 인젝션 공격을 방지합니다.

- XSS 공격: 클라이언트는 사용자 입력을 백엔드로 전송하기 전에, 또는 서버 데이터를 표시하기 전에 별도의 필터링을 하지 않습니다. 본 예제에는 XSS 필터링이 포함되어 있지 않으니, 실제 애플리케이션에 적용할 경우 반드시 추가해야 합니다.

XSS 공격을 방지하려면, HTML에 삽입되는 모든 문자열을 반드시 이스케이프 처리해야 합니다.

이 예제에서는, 클라이언트로 이벤트를 불러올 때 *"text"* 속성을 이스케이프 처리하는 것으로 충분합니다:

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
 
    // 안전하지 않은 텍스트 이스케이프 처리
    foreach($events as $index=>$event){
        $events[$index]["text"] = htmlentities($event["text"]);
    }
    return $events;
}
~~~

## 에러 처리

백엔드에서 작업 수행에 실패할 경우, 클라이언트는 "error" 상태의 응답을 기대합니다.

이것은 메서드 호출을 try-catch 블록으로 감싸서 처리할 수 있습니다. `data/app.php` 파일에서 switch-case 블록을 다음과 같이 교체하세요:

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
                // 반복 시리즈에서 단일 항목 삭제
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

클라이언트 측에서는 dataProcessor의 [onAfterUpdate](https://docs.dhtmlx.com/api__dataprocessor_onafterupdate_event.html) 이벤트를 이용해 에러를 감지할 수 있습니다:

~~~js title="index.html"
dp.init(scheduler);
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
    if(action == "error"){
        // 여기에 처리 코드 작성
    }
});
~~~

## 문제 해결

PHP 통합을 위한 위 단계를 따라도 스케줄러에 이벤트가 표시되지 않는다면, ["백엔드 통합 문제 해결"](guides/troubleshooting.md) 문서에서 문제의 원인을 파악하는 방법을 안내합니다.

## 다음 단계

이제 완전히 동작하는 Scheduler가 준비되었으니, [GitHub](https://github.com/DHTMLX/scheduler-howto-php-plain)에서 전체 코드를 확인하거나 프로젝트에 복제 및 다운로드할 수 있습니다.

또한, [Scheduler의 다양한 기능 가이드](/guides/)나 [다른 백엔드 프레임워크와의 통합 튜토리얼](integrations/howtostart-guides.md)도 참고해 보세요.

