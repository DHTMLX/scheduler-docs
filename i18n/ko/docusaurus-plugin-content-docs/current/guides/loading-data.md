---
title: "데이터 불러오기"
sidebar_label: "데이터 불러오기"
---

# 데이터 불러오기

dhtmlxScheduler는 아래의 세 가지 형식으로 데이터 로딩을 지원합니다:

1. JSON
2. XML
3. ICal

["데이터 포맷 예시"](guides/data-formats.md)

## 인라인 데이터셋에서 데이터 불러오기 {#loadingdatafromaninlinedataset}

인라인 데이터셋에서 직접 데이터를 불러오려면 [parse](api/method/parse.md) 메서드를 사용합니다:

~~~js
scheduler.init('scheduler_here',new Date(2009,10,1),"month");
...
scheduler.parse([
    {text:"Meeting",    start_date:"2019-04-11 14:00", end_date:"2019-04-11 17:00"},
    {text:"Conference", start_date:"2019-04-15 12:00", end_date:"2019-04-18 19:00"},
    {text:"Interview",  start_date:"2019-04-24 09:00", end_date:"2019-04-24 10:00"}
],"json");
~~~


[Displaying events as a cascade](https://docs.dhtmlx.com/scheduler/samples/02_customization/24_cascade_event_display.html)


## 데이터 파일에서 데이터 불러오기 {#loadingdatafromadatafile}

외부 파일에서 데이터를 불러오려면 [load](api/method/load.md) 메서드를 사용합니다:

~~~js
scheduler.init('scheduler_here',new Date(2018,10,1),"month");
...
scheduler.load("data.json"); // 파일에서 데이터 불러오기
~~~


[Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)


## 데이터베이스에서 데이터 불러오기 {#loadingdatafromadatabase}

데이터베이스에서 데이터를 불러오는 방법은 두 가지가 있습니다. 두 방법 모두 클라이언트와 서버 측 처리가 필요합니다.

1) 첫 번째 방법은 REST API를 사용하여 서버와 통신합니다.

- 서버 측 구현은 선택한 프레임워크에 따라 다릅니다.
예를 들어 Node.js의 경우, Scheduler가 AJAX 요청을 보내는 URL에 대한 서버 라우트를 추가합니다.

이 라우트는 JSON 응답을 생성합니다.

~~~js
app.get('/data', function(req, res){
    db.event.find().toArray(function(err, data){
        // 모든 레코드에 id 속성 설정
        for (var i = 0; i < data.length; i++)
            data[i].id = data[i]._id;
        
        // 응답 출력
        res.send(data);
    });
});
~~~

- 클라이언트 측에서는 Scheduler가 데이터를 요청할 URL을 [load](api/method/load.md) 메서드에 지정합니다:

~~~js title="Loading from a database. Client-side code"
scheduler.init('scheduler_here', new Date(), "month");
scheduler.load("apiUrl");
~~~

:::note
REST API를 통한 서버 측 연동에 대한 자세한 내용은 ["Server-Side Integration"](guides/server-integration.md) 문서에서 확인할 수 있습니다.
:::

2) 두 번째 방법은 [PHP Connector](https://docs.dhtmlx.com/connector__php__index.html)를 사용하여 데이터베이스 테이블에서 데이터를 불러오는 방식입니다.

- 서버 측에서는 XML 또는 JSON 형식의 데이터를 반환하는 스크립트를 구현합니다:
  
~~~js title="Static loading from db. Server-side code"
include ('dhtmlxConnector/codebase/scheduler_connector.php');
 
$res="mysql_connect(""localhost","root","");
mysql_select_db("sampleDB");
 
$calendar = new SchedulerConnector($res);
$calendar->render_table("events","id","event_start,event_end,text","type");
~~~

- 클라이언트 측에서는 서버 스크립트 경로를 [load](api/method/load.md) 메서드에 지정합니다:
  
~~~js title="Static loading from db. Client-side code"
scheduler.init('scheduler_here', new Date(), "month");
scheduler.load("events.php");
~~~

:::note
자세한 내용은 ["dhtmlxScheduler와 dhtmlxConnector 연동하기"](integrations/other/howtostart-connector.md) 가이드에서 확인할 수 있습니다.
:::

## 여러 소스에서 데이터 불러오기 {#loadingdatafrommultiplesources}

여러 소스에서 데이터를 불러오려면 **multisource** 확장 기능을 사용할 수 있습니다:

~~~js
scheduler.plugins({
   multisource: true
});
~~~

:::note
여러 소스는 정적/동적 로딩 모두에서 사용할 수 있습니다.
:::

관련 파일을 포함한 후, [load](api/method/load.md) 메서드는 소스 배열을 인자로 받을 수 있습니다:

~~~js
scheduler.load(["first/source/some","second/source/other"]);
~~~

## 데이터 속성 {#data-properties}

### 필수 속성

데이터 항목이 올바르게 파싱되려면 최소한 다음 세 가지 속성이 필요합니다:

- **start_date** -  (*string*) 이벤트 시작 날짜
- **end_date** - (*string*) 이벤트 종료 날짜
- **text** - (*string*) 이벤트 설명

데이터베이스에서 불러올 때는 추가로 필수 속성이 필요합니다:

- **id** -  (*string, number*) 이벤트 식별자

기본적으로 JSON 및 XML 데이터는 **'%Y-%m-%d %H:%i'** 형식의 날짜 포맷을 사용합니다(자세한 내용은 [날짜 포맷 명세](guides/settings-format.md) 참고).

 이 포맷을 변경하려면 [date_format](api/config/date_format.md) 옵션을 사용하세요.

~~~js
scheduler.config.date_format="%Y-%m-%d %H:%i";
...
scheduler.init('scheduler_here', new Date(2019, 3, 18), "week");
~~~

### 사용자 정의 속성

필수 필드 외에도, 데이터 항목에 사용자 정의 속성을 추가할 수 있습니다. 이러한 추가 속성은 문자열로 파싱되며, 필요에 따라 클라이언트 측에서 활용할 수 있습니다.

사용자 정의 속성이 포함된 데이터 예시는 [여기](guides/data-formats.md#datawithcustomproperties) 에서 확인할 수 있습니다.

## 데이터베이스 구조 {#database-structure}

스케줄러 이벤트를 위한 데이터베이스를 설정할 때, 권장되는 구조는 다음과 같습니다:

- **events 테이블** - 스케줄러 이벤트 저장
    - **id** - (*string/int/guid*) - 이벤트 식별자. 기본키, 자동 증가.
    - **start_date** - (*DateTime*) - 이벤트 시작 날짜, null 불가.
    - **end_date** - (*DateTime*) - 이벤트 종료 날짜, null 불가.
    - **text** - (*string*) - 이벤트 설명.

반복 이벤트의 경우, 추가 컬럼이 필요합니다:

- **events 테이블** - 스케줄러 이벤트 저장
    - **id** - (*string/int/guid*) - 이벤트 식별자. 기본키, 자동 증가.
    - **start_date** - (*DateTime*) - 이벤트 시작 날짜, null 불가.
    - **end_date** - (*DateTime*) - 이벤트 종료 날짜, null 불가.
    - **text** - (*string*) - 이벤트 설명.
    - **event_pid** - (*string/int/guid*) - 부모 이벤트 시리즈 id 참조. null 또는 기본값(빈 문자열, 0) 가능.
    - **event_length** - (*string/bigint*) - 이벤트 기간 또는 수정된 반복의 타임스탬프. null 또는 기본값(빈 문자열, 0) 가능. 최대 길이(문자열)는 10.
    - **rec_type** - (*string*) - 반복 규칙. null 또는 기본값(빈 문자열) 가능. 최대 길이 50.

필요에 따라 추가 컬럼을 추가할 수 있으며, 클라이언트 API를 통해 접근할 수 있습니다.

## 동적 로딩 {#dynamic-loading}

기본적으로 dhtmlxScheduler는 모든 데이터를 한 번에 불러옵니다. 이는 대용량 데이터셋에서는 비효율적일 수 있습니다. 동적 로딩을 사용하면 현재 보이는 영역에 한정하여 데이터를 부분적으로 불러올 수 있습니다.

### 기법

동적 로딩을 활성화하려면 [setLoadMode](api/method/setloadmode.md) 메서드를 호출하세요:
~~~js title="Enabling the dynamic loading"
scheduler.setLoadMode("month");
scheduler.load("some.php");
~~~

이 메서드는 불러올 데이터 크기를 결정하는 로딩 모드를 인자로 받습니다: *day, week, month,* 또는 *year.*

예를 들어 'week' 모드로 설정하면, 스케줄러는 현재 주간에 해당하는 데이터만 요청하며, 필요 시 추가 데이터를 불러옵니다.


#### 로딩 모드 동작 방식

로딩 모드는 선택한 기간에 대해 데이터를 불러오는 간격을 정의합니다. 예를 들어, 2018-01-29부터 2018-02-05까지의 주간 뷰를 연 경우:

- "day" 모드의 경우

~~~js
scheduler.setLoadMode("day");
~~~

스케줄러는 일 단위로 데이터를 요청합니다. 예: 2018-01-29 ~ 2018-02-05

- "month" 모드의 경우

~~~js
scheduler.setLoadMode("month");
~~~

스케줄러는 월 단위로 전체 달의 데이터를 요청합니다. 예: 2018-01-01 ~ 2018-03-01

- "year" 모드의 경우

~~~js
scheduler.setLoadMode("year");
~~~

스케줄러는 연 단위로 전체 연도의 데이터를 요청합니다. 예: 2018-01-01 ~ 2019-01-01

요청된 간격은 항상 화면에 표시되는 간격 이상입니다.

로딩 간격은 다음에 영향을 미칩니다:

- 동적 로딩 호출 빈도

더 큰 간격은 로딩 호출 빈도를 줄여주며, 이미 불러온 데이터는 캐시됩니다.

- 각 요청의 처리 시간

더 큰 간격일수록 한 번에 더 많은 데이터를 처리하므로 시간이 더 오래 걸릴 수 있습니다.

#### 요청 형식

요청은 다음과 같은 형식입니다:

~~~js
some.php?from=DATEHERE&to=DATEHERE
~~~

*DATEHERE는 [load_date](api/config/load_date.md) 옵션에 지정된 유효한 날짜 형식이어야 합니다.* 


서버 측에서 <a href="https://docs.dhtmlx.com/connector__php__index.html">dhtmlxConnector</a>를 사용할 경우, 별도의 추가 처리가 필요 없습니다.


### 로딩 스피너

대용량 데이터셋을 사용할 때, 로딩 스피너를 표시하면 진행 상태를 알릴 수 있습니다.

로딩 스피너를 활성화하려면 [show_loading](api/config/show_loading.md) 속성을 *true*로 설정하세요:

~~~js
scheduler.config.show_loading = true;
...
scheduler.init('scheduler_here',new Date(2018,0,10),"month");
~~~

:::note
스피너 이미지를 커스터마이즈하려면 'imgs/loading.gif'를 원하는 이미지로 교체하세요.
:::

## 서버에서 Timeline 및 Units 섹션 데이터 불러오기 {#collections}

[Timeline](views/timeline.md) 및 [Units](views/units.md#loadingdatatotheview) 뷰에 데이터를 불러올 때는 섹션 배열이 필요합니다.

백엔드에서 Timeline 및 Units 섹션을 불러오려면, 좀 더 상세한 구성이 필요합니다:

- Timeline 뷰 초기화 시, 섹션 배열 대신 [serverList](api/method/serverlist.md) 메서드와 컬렉션 이름을 사용하세요:

~~~js
scheduler.createTimelineView({
   ....
   y_unit: scheduler.serverList("sections"),
   ...
});
~~~

- [load](api/method/load.md) 메서드로 데이터를 스케줄러에 불러옵니다:

~~~js
scheduler.load("data.json");
~~~

- 서버 측에서는 다음과 같은 구조로 응답을 반환해야 합니다:

~~~js title=""data.json""
{ 
   "data":[
      {
          "id":"1",
          "start_date":"2018-03-02 00:00:00",
          "end_date":"2018-03-04 00:00:00",
          "text":"dblclick me!",
          "type":"1"
      },
      {
          "id":"2",
          "start_date":"2018-03-09 00:00:00",
          "end_date":"2018-03-11 00:00:00",
          "text":"and me!",
          "type":"2"
      },
      {
          "id":"3",
          "start_date":"2018-03-16 00:00:00",
          "end_date":"2018-03-18 00:00:00",
          "text":"and me too!",
          "type":"3"
      },
      { 
          "id":"4",
          "start_date":"2018-03-02 08:00:00",
          "end_date":"2018-03-02 14:10:00",
          "text":"Type 2 event",
          "type":"2"
      }
   ], 
   "collections": {
      "sections":[
         {"value":"1","label":"Simple"},
         {"value":"2","label":"Complex"},
         {"value":"3","label":"Unknown"}
      ]
   }
}
~~~

이 예시에서 "data" 배열에는 캘린더 이벤트가 포함되어 있고, "collections" 객체에는 [serverList](api/method/serverlist.md) 메서드를 통해 참조되는 컬렉션이 포함되어 있습니다.
