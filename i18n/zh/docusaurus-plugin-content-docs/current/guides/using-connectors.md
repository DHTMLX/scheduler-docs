---
title: "커넥터 코드 샘플"
sidebar_label: "커넥터 코드 샘플"
---

# 커넥터 코드 샘플

dhtmlxScheduler 라이브러리에는 서버 측 작업을 보다 쉽게 만들어주는 유용한 서버 사이드 헬퍼인 dhtmlxConnector가 포함되어 있습니다.

[dhtmlxConnector](http://docs.dhtmlx.com/connector__php__index.html)는 클라이언트 측과 데이터베이스 테이블을 직접 연결해주는 미들웨어 역할을 하므로, 데이터 교환 프로토콜의 세부 사항에 대해 걱정할 필요가 없습니다.

dhtmlxConnector를 [dataProcessor](http://docs.dhtmlx.com/dataprocessor__index.html)와 함께 사용하면, 통신 로직을 직접 작성하지 않아도 모든 클라이언트-서버 상호작용을 원활하게 처리할 수 있습니다.


<table border="1">
  <caption>표 1. 다양한 플랫폼용 dhtmlxConnector 패키지</caption>
  <tr>
  <td>PHP</td>
  <td><a href="https://github.com/DHTMLX/connector-php">https://github.com/DHTMLX/connector-php</a></td>
  </tr>
  <tr>
  <td>.Net</td>
  <td><a href="http://dhtmlx.com/x/download/regular/dhtmlxConnector_net.zip">http://dhtmlx.com/x/download/regular/dhtmlxConnector_net.zip</a></td>
  </tr>
  <tr>
  <td>Java</td>
  <td><a href="https://github.com/DHTMLX/connector-java">https://github.com/DHTMLX/connector-java</a></td>
  </tr>
  <tr>
  <td>ColdFusion</td>
  <td><a href="https://github.com/DHTMLX/connector-cf">https://github.com/DHTMLX/connector-cf</a></td>
  </tr>
</table>


## 기술

PHP Connector로 서버에서 데이터를 불러오려면 다음 단계를 따르세요:

### 클라이언트 측

- [load](api/method/load.md) 메서드를 호출하여, [JSON](data_formats.html#json) 형식의 Gantt 데이터를 반환하는 URL을 전달합니다.

- dataProcessor를 초기화하고 scheduler에 연결합니다. dataProcessor 생성자에는 동일한 서버 사이드 스크립트의 경로가 필요합니다.
  
~~~js
scheduler.init('scheduler_here', new Date(), "month");
scheduler.load("events.php");

var dp = scheduler.createDataProcessor("events.php");
dp.init(scheduler);
~~~
  
### 서버 측: 

- dhtmlxConnector를 사용하는 일반적인 서버 스크립트 예시는 다음과 같습니다:
  
~~~js
//events.php
include('connector-php/codebase/scheduler_connector.php');//파일 포함

$res="mysql_connect(""localhost","root","");//DB가 있는 서버에 연결
mysql_select_db("sampleDB");//DB에 연결. 'sampleDB'는 DB 이름
 
$calendar = new schedulerConnector($res);//커넥터 초기화
$calendar->render_table("events","id","event_start,event_end,text","type");
~~~
  
- dhtmlxConnector는 각 컴포넌트에 특화된 커넥터를 제공합니다. dhtmlxScheduler의 경우 <b>scheduler_connector.php</b>를 포함해야 합니다.
- <b>render_table</b> 메서드는 한 개의 테이블에서 데이터를 불러옵니다.

 매개변수:

    - *데이터베이스 테이블 이름*
    - *식별자 필드 이름(옵션)*
    - *이벤트 데이터 속성으로 사용할 필드 목록*
  
  여러 테이블에서 데이터를 불러와야 할 때는 dhtmlxConnector 문서의 관련 챕터를 참고하세요 - 
  [기본 로딩: 여러 테이블 작업](http://docs.dhtmlx.com/connector__php__basis.html#work_with_several_tables). 
  

[Loading data from a database](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/05_loading_database.html)


### 요청 파라미터 형식

각 레코드별로 개별 요청을 보낼 때 Scheduler 요청 값 예시는 다음과 같습니다:

- **id**: 71
- **start_date**: 2014-11-04 15:00
- **end_date**: 2014-11-04 18:00
- **text**: Recinto Ferial - Valencia
- **details**: Details for Recinto Ferial - Valencia
- **!nativeeditor_status**: updated

Scheduler 요청 파라미터의 추가 예시는 
dataProcessor 문서의 [기본 동작 원칙](http://docs.dhtmlx.com/dataprocessor__basic_principles.html#schedulerrequestparamsexamples) 섹션에서 확인할 수 있습니다.

### 응답

응답은 다음과 같이 유효한 JSON 형식이어야 합니다:

- **type** - 작업 유형
- **sid** - 원본 작업/링크 ID
- **tid** - 작업/링크의 작업 후 ID

JSON 응답 예시는 다음과 같습니다:

~~~js
{"action":"updated", "sid":15, "tid":15}
~~~

응답 포맷에 대한 자세한 내용은 dataProcessor 문서의 [기본 동작 원칙](http://docs.dhtmlx.com/dataprocessor__basic_principles.html#responsedetails) 글에서 확인할 수 있습니다.

## JSON 형식으로 데이터 가져오기

기본적으로 dhtmlxScheduler는 XML 형식의 데이터를 기대합니다.


하지만 3.5 버전부터는 dhtmlxScheduler가 dhtmlxConnector로부터 직접 JSON 데이터를 받아올 수 있습니다.


~~~php
include ('connector-php/codebase/scheduler_connector.php');

$res="mysql_connect(""localhost", "root", "");
mysql_select_db("scheduler");

$scheduler = new JSONSchedulerConnector($res);
$scheduler->render_table("events","event_id","start_date,end_date,text,details");
~~~

JSONSchedulerConnector는 다음과 같은 JSON 데이터 피드를 생성합니다:

~~~js
[{ 
        id:"1",  
        start_date:"2009-05-24 00:00:00",   
        end_date:"2009-06-08 00:00:00",  
        text:"French Open",        
        details:"Details for French Open"
    },
    { 
        id:"2",  
        start_date:"2009-06-21 00:00:00",   
        end_date:"2009-07-05 00:00:00",  
        text:"Wimbledon",          
        details:"Details for Wimbledon"
}]
~~~


01_initialization_loading/10_loading_database_json.html


## XML 파일로 데이터 저장

라이브러리에는 [serialize](guides/extensions-list.md#serialize)라는 특별한 확장 기능도 포함되어 있어, 데이터베이스를 사용하지 않고도 데이터를 XML 파일로 저장할 수 있습니다.

자세한 내용은 <a href="export.html#savingdatainanxmlfile">데이터를 XML, JSON, iCal 형식으로 직렬화</a> 챕터에서 확인할 수 있습니다.
