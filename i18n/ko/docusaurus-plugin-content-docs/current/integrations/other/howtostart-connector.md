---
title: "dhtmlxScheduler와 dhtmlxConnector 연동하기"
sidebar_label: "dhtmlxScheduler와 dhtmlxConnector 연동하기"
---

# dhtmlxScheduler와 dhtmlxConnector 연동하기

이 튜토리얼에서는 데이터베이스에 연결하여 이벤트를 불러오고 저장하는 기본 스케줄러를 만드는 과정을 안내합니다. 
여기에서 제공하는 최종 예제 코드는 dhtmlxScheduler로 애플리케이션을 구축할 때 훌륭한 기반이 될 수 있습니다.

이 튜토리얼은 PHP로 Scheduler를 구현하는 과정을 설명합니다. 다른 백엔드 언어를 선호한다면 아래의 관련 가이드를 참고하세요:

- ["dhtmlxScheduler와 Node.js"](integrations/node/howtostart-nodejs.md)
- ["dhtmlxScheduler와 ASP.NET Core"](integrations/dotnet/howtostart-dotnet-core.md)
- ["dhtmlxScheduler와 ASP.NET MVC"](integrations/dotnet/howtostart-dotnet.md)
- ["dhtmlxScheduler와 PHP"](integrations/php/howtostart-plain-php.md)
- ["dhtmlxScheduler와 PHP:Slim"](integrations/php/howtostart-php-slim4.md)
- ["dhtmlxScheduler와 PHP:Laravel 연동하기"](integrations/php/howtostart-php-laravel.md)
- ["dhtmlxScheduler와 SalesForce LWC 통합하기"](integrations/salesforce/howtostart-salesforce.md)
- ["dhtmlxScheduler와 Ruby on Rails 연동하기"](integrations/other/howtostart-ruby.md)

아래 단계별 지침을 따라 애플리케이션을 구축하세요.

:::note
전체 소스 코드는 [GitHub에 호스팅되어 있습니다](https://github.com/DHTMLX/scheduler-howto-php-connector).
:::

![init_scheduler_front.png](/img/init_scheduler_front.png)


[Loading data from a database](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/05_loading_database.html)


## 1단계. HTML 파일 생성 및 필수 코드 파일 포함

먼저 새로운 HTML 파일을 생성하고, 스케줄러에 필요한 스크립트와 스타일시트를 추가하세요.

주요 포함 파일은 다음과 같습니다:

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
       //여기에 코드를 작성합니다
</body>
</html>
~~~

dhtmlxScheduler 패키지 구조를 간단히 살펴보면, 각 파일이 어디에 위치하는지 확인할 수 있습니다:

- <b>backend</b> - 패키지 샘플을 실행하는 데 유용한 node.js 앱이 포함되어 있습니다.
- <b>samples</b> - 예제 코드 스니펫이 들어 있습니다.
- <b>codebase</b> - 라이브러리 코드 파일이 들어 있습니다. *codebase/source* 폴더에는 비압축 버전이 있습니다.

## 2단계. 관련 DIV 요소 정의

스케줄러를 초기화하기 전에, 스케줄러가 사용할 필수 DIV 컨테이너를 설정해야 합니다.

일반적으로 스케줄러에 필요한 div 구성은 다음과 같습니다:

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

## 3단계. 스타일 적용

스케줄러가 다양한 브라우저에서 전체화면 모드로 정상 동작하려면 다음 스타일을 적용하세요:

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

전체화면 모드를 사용하지 않는 경우, 이 스타일은 필요하지 않습니다. 대신, 메인 **div**에 원하는 CSS를 직접 지정할 수 있습니다:

~~~js
<div id="scheduler_here" class="dhx_cal_container">
...
~~~

## 4단계. 초기화

준비가 끝나면 스케줄러를 초기화합니다. 스케줄러는 페이지 내에서 싱글턴(singleton)으로, 한 번만 인스턴스화할 수 있습니다.

스케줄러 인스턴스는 **dhtmlxScheduler** 또는 간단히 **scheduler**로 참조할 수 있습니다.

~~~js
scheduler.init('scheduler_here', new Date(),"month");
~~~

## 5단계. 데이터 불러오기

이 시점에서 앱을 실행하면 스케줄러가 표시되지만, 이벤트는 없습니다.

이벤트를 추가하려면 간단한 인라인 데이터 소스를 사용해보세요. 스케줄러는 [parse](api/method/parse.md) 메서드를 통해 인라인 객체에서 데이터를 불러올 수 있습니다.

각 이벤트 객체는 다음 속성을 가져야 합니다:

- **id** - (*string, number*) 고유 이벤트 식별자
- **start_date** - (*string*) 이벤트 시작 시간, 기본 포맷 "%m/%d/%Y %H:%i"
- **end_date** - (*string*) 이벤트 종료 시간, 기본 포맷 "%m/%d/%Y %H:%i"
- **text** - (*string*) 이벤트 설명

~~~js
var events = [
{id:1, text:"Meeting",   start_date:"2019-11-14 14:00",end_date:"2019-11-14 17:00"},
{id:2, text:"Conference",start_date:"2019-11-13 12:00",end_date:"2019-11-13 19:00"},
{id:3, text:"Interview", start_date:"2019-11-14 09:00",end_date:"2019-11-14 10:00"}
];

scheduler.parse(events);//데이터 소스와 포맷 지정
~~~

## 6단계. 데이터베이스 구조
:::note
인라인 객체 대신 데이터베이스에서 데이터를 불러오려면 이 단계와 다음 단계를 참고하세요.
:::

서버에서 데이터를 불러오려면, 다음과 같은 데이터베이스 테이블을 먼저 생성하세요:

![db_table](/img/db_table.png)

아래 SQL을 사용해 테이블을 만들 수 있습니다:

~~~js
CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `text` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
)
~~~

이 필드 외에도 필요한 추가 컬럼을 자유롭게 추가할 수 있으며, 
이 컬럼들은 클라이언트로 전달되어 [스케줄러의 lightbox에 매핑](guides/custom-details-form.md)할 수 있습니다.

데이터베이스의 DateTime 포맷 '%Y-%m-%d %H:%i'는 스케줄러의 기본 포맷 '%m/%d/%Y %H:%i'와 다릅니다. 
이를 올바르게 처리하려면, [date_format](api/config/date_format.md) 옵션을 사용해 스케줄러의 날짜 포맷을 업데이트하세요.

설정 옵션은 반드시 초기화 메서드를 호출하기 전에 배치해야 합니다:

~~~js
scheduler.init('scheduler_here',new Date(),"month");
~~~

## 7단계. 서버에서 데이터 불러오기 {#step7loadingdatafromtheserver}

데이터베이스에서 데이터를 가져오려면, [load](api/method/load.md) 메서드에 백엔드 스크립트의 URL을 지정하세요.

직접 백엔드를 구축할 수도 있지만, 이 튜토리얼에서는 빠른 솔루션으로 [PHP connector 라이브러리](https://docs.dhtmlx.com/connector__php__index.html)를 사용합니다.

아래와 같이 메서드를 사용하세요:

~~~js
// CRUD 작업을 처리하는 서버 스크립트의 URL을 지정
scheduler.load("data/connector.php");
~~~

## 8단계. 서버 측 스크립트

https://github.com/DHTMLX/connector-php 에서 connector 라이브러리를 다운로드하세요.

아래는 dhtmlxScheduler용 기본 PHP 서버 스크립트 예시입니다:

~~~php
<?php 
require_once("./connector/scheduler_connector.php");

$res = new PDO("mysql:host=localhost;dbname=scheduler", "username", "password");

$connector = new SchedulerConnector($res);
$connector->render_table("events","id","start_date,end_date,text");
~~~


데이터베이스 필드명은 자유롭게 지정할 수 있습니다. 스케줄러는 첫 세 개의 데이터 필드를 다음과 같이 예상합니다:

- 시작 날짜
- 종료 날짜
- 텍스트 설명

예를 들어, 필드명이 다르다면:

~~~php
$connector->render_table("events","id","event_start,event_end,event_text");
~~~

스케줄러는 이를 다음과 같이 해석합니다:

- *event_start* → *start_date*
- *event_end* → *end_date*
- *event_text* → *text*

:::note
반복 이벤트에 대해서는 [Recurring Events](guides/recurring-events.md#server-side-logic) 가이드를 참고하세요.
:::

:::note
반복 이벤트는 데이터베이스에 단일 레코드로 저장되며, 클라이언트 측에서 스케줄러가 확장합니다.
서버 측에서 개별 발생 건을 가져오려면, 반복 이벤트 파싱용 PHP helper 라이브러리를 사용하세요.

라이브러리는 GitHub에서 제공됩니다: [scheduler-helper-php](https://github.com/DHTMLX/scheduler-helper-php).
:::

## 9단계. 데이터 저장
이제 스케줄러가 데이터베이스에서 이벤트를 불러올 수 있지만, 변경 사항을 자동으로 저장하지는 않습니다.

저장을 활성화하려면 [dataProcessor](guides/server-integration.md#technique)를 사용하세요.

dataProcessor 사용은 매우 간단합니다. 초기화 후 스케줄러와 연결하면 됩니다.

~~~js
var dp = scheduler.createDataProcessor("data/connector.php");
dp.init(scheduler);
~~~

이제 데이터베이스에서 이벤트를 불러오고, 변경 사항을 저장할 수 있는 기본 스케줄러가 완성되었습니다.

필요에 따라 자유롭게 커스터마이즈하고 확장해 사용하세요.


[Loading data from a database](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/05_loading_database.html)


전체 동작 예제는 [GitHub](https://github.com/DHTMLX/scheduler-howto-php-connector)에서 확인할 수 있으며, 프로젝트에 클론하거나 다운로드하여 사용할 수 있습니다.
