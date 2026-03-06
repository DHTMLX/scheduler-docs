---
title: "시작하기"
sidebar_label: "시작하기"
---

# 시작하기

이 튜토리얼에서는 데이터베이스에서 데이터를 불러오고 다시 저장하는 기본 스케줄러를 만드는 과정을 안내합니다. 
여기에서 제공하는 최종 예제는 dhtmlxScheduler로 앱을 구축하기 위한 탄탄한 기반이 될 수 있습니다.

![init_scheduler_front.png](/img/init_scheduler_front.png)


[Loading data from a database](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/05_loading_database.html)


## 1단계. 새 HTML 파일 생성 및 필수 코드 파일 추가

먼저, 새로운 HTML 파일을 만들고 필요한 스케줄러 스크립트와 스타일을 포함하세요.

필요한 파일은 다음과 같습니다:

- *dhtmlxscheduler.js*
- *dhtmlxscheduler_material.css* (Material 스킨용; [다른 사용 가능한 스킨](guides/skins.md)도 확인할 수 있습니다)

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

dhtmlxScheduler 패키지 구조를 간단히 살펴보면, 각 파일의 위치를 쉽게 알 수 있습니다:

- <b>sources</b> - 소스 코드 파일로, 난독화되지 않아 디버깅에 주로 사용됩니다.
- <b>samples</b> - 예제 코드 스니펫이 들어 있습니다.
- <b>docs</b> - 컴포넌트의 전체 문서입니다.
- <b>codebase</b> - 프로덕션 환경에 최적화된 난독화된(minified) 파일이 들어 있습니다. <b>프로젝트에서는 이 폴더의 파일을 사용하세요.</b>

## 2단계. 관련 DIV 요소 정의

스케줄러를 초기화하기 전에, UI 요소를 위한 필수 DIV 컨테이너를 설정해야 합니다.

스케줄러에 일반적으로 필요한 'div' 세트는 다음과 같습니다:

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

브라우저에서 올바른 전체화면 동작을 보장하려면, 아래와 같은 CSS 스타일을 추가하세요:

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

전체화면 모드를 사용하지 않는 경우에는 이 스타일이 필요하지 않습니다. 대신, 메인 **div**에 원하는 CSS 속성을 직접 지정하세요:

~~~html
<div id="scheduler_here" class="dhx_cal_container"/>
...
~~~

## 4단계. 초기화

모든 준비가 끝나면, 스케줄러를 초기화할 수 있습니다. 
스케줄러는 정적 객체이므로, 페이지당 한 번만 인스턴스화해야 합니다. 
스케줄러 인스턴스는 **dhtmlxScheduler** 또는 간단히 **scheduler**로 참조할 수 있습니다.

~~~js
scheduler.init('scheduler_here', new Date(),"month");
~~~

## 5단계. 데이터 불러오기

이 시점에서 앱을 실행하면 스케줄러가 표시되지만, 아직 이벤트가 없습니다.

데이터로 채우려면, 먼저 인라인 객체를 데이터 소스로 사용해보세요. 
[parse](api/method/parse.md) 메서드를 사용하여 인라인 객체에서 데이터를 불러올 수 있습니다.

각 이벤트 객체는 다음과 같은 속성을 포함합니다:

- **id** - (*string, number*) 이벤트 식별자
- **start_date** - (*string*) 이벤트 시작 날짜, 기본 형식 "%m/%d/%Y %H:%i"
- **end_date** - (*string*) 이벤트 종료 날짜, 기본 형식 "%m/%d/%Y %H:%i"
- **text** - (*string*) 이벤트 설명

~~~js
var events = [
   {id:1, text:"Meeting",   start_date:"04/11/2018 14:00",end_date:"04/11/2018 17:00"},
   {id:2, text:"Conference",start_date:"04/15/2018 12:00",end_date:"04/18/2018 19:00"},
   {id:3, text:"Interview", start_date:"04/24/2018 09:00",end_date:"04/24/2018 10:00"}
];

scheduler.parse(events); // 데이터 소스와 형식 지정
~~~

또한 [서버에서 데이터 불러오기](#step7loadingdatafromtheserver)도 가능합니다.

:::note
서버 사이드와의 연동에 대한 자세한 내용은 ["Server-Side Integration"](guides/server-integration.md) 문서를 참고하세요.
:::

## 6단계. 데이터베이스 구조

:::note
인라인 객체 대신 데이터베이스에서 데이터를 불러오려면 아래 단계를 따르세요.
:::

서버에서 데이터를 불러오려면, 다음과 같은 구조의 데이터베이스 테이블이 필요합니다:

![db_table](/img/db_table.png)

아래 SQL 코드를 사용해 테이블을 생성할 수 있습니다:

~~~js
CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `text` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
)
~~~

이 필드 외에 필요하다면 추가 컬럼을 생성할 수 있으며, 클라이언트로 전송 후 [라이트박스에 매핑](guides/custom-details-form.md)할 수 있습니다.

참고로, 데이터베이스의 datetime 형식 '%Y-%m-%d %H:%i'는 스케줄러의 기본 형식 '%m/%d/%Y %H:%i'와 다릅니다. 
이를 올바르게 처리하려면 [xml_date](api/config/xml_date.md) 옵션을 사용해 스케줄러의 날짜 형식을 업데이트해야 합니다.

아래와 같이, 스케줄러를 초기화하기 전에 설정 옵션을 지정하세요:

~~~js
scheduler.config.xml_date="%Y-%m-%d %H:%i";
...
scheduler.init('scheduler_here',new Date(),"month");
~~~

## 7단계. 서버에서 데이터 불러오기

데이터베이스에서 데이터를 불러오려면 [load](api/method/load.md) 메서드를 사용하여, 데이터 처리를 담당하는 서버 사이드 스크립트의 URL을 지정합니다.

:::note
[dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html) 라이브러리를 사용하면 빠르게 시작할 수 있습니다. 그러나 새로운 프로젝트의 경우 더 유연한 백엔드 API를 직접 구축하는 것이 좋습니다. 자세한 내용은 ["Server-Side Integration"](guides/server-integration.md)를 참고하세요.
:::
  
아래와 같이 메서드를 호출하면 됩니다:

~~~js
// CRUD 작업을 처리하는 서버 사이드 스크립트의 URL 지정
scheduler.load("data/connector.php");
~~~

## 8단계. 서버 사이드 스크립트

아래는 dhtmlxScheduler를 위한 예시 서버 사이드 스크립트입니다:

~~~php
<?php 
require_once("../codebase/connector/scheduler_connector.php");
 
$res="mysql_connect(""localhost","root","");
mysql_select_db("schedulerDB");

$conn = new SchedulerConnector($res);

$conn->render_table("events","id","start_date,end_date,text");
~~~

### 데이터베이스 컬럼 매핑

**$connector->render_table**에서 컬럼의 순서가 중요합니다.  
처음 세 컬럼은 실제 컬럼명과 상관없이 클라이언트 측 이벤트 객체의 *start_date*, *end_date*, *text* 속성에 대응됩니다:

~~~js
$conn->render_table("events","EventId","Start,End,Name,details","");
// JS: event.id, event.start_date, event.end_date, event.text, event.text, event.details
~~~

#### 추가 컬럼 매핑

추가 컬럼은 이름 그대로 매핑됩니다:

~~~js
$conn->render_table("events","id","start_date,end_date,text,custom,details","");
// JS: event.start_date, event.end_date, event.text, event.custom, event.details
~~~

별칭(alias)도 다음과 같이 사용할 수 있습니다:

~~~js
$conn->render_table("events","id",
    "start_date,end_date,text,custom_column(customProperty),details","");
// JS: event.start_date, event.end_date, event.text, event.customProperty, event.details
~~~

## 9단계. 데이터 저장

이제 스케줄러가 데이터베이스에서 데이터를 불러올 수 있지만, 변경 사항을 자동으로 저장하지는 않습니다. 
저장을 활성화하려면 <a href="https://docs.dhtmlx.com/dataprocessor__index.html">dataProcessor</a>를 사용하세요.

dataProcessor 사용 방법은 간단합니다-초기화하고 스케줄러에 연결만 하면 됩니다:

~~~js
var dp = scheduler.createDataProcessor("data/connector.php");
dp.init(scheduler);
~~~
  
이제 데이터베이스와 연동하여 데이터를 불러오고 저장하는 기본 스케줄러가 완성되었습니다.

여기서부터는 필요에 따라 기능을 추가하거나 확장할 수 있습니다.


[Loading data from a database](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/05_loading_database.html)
