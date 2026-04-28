--- 
title: "데이터 로딩" 
sidebar_label: "데이터 로딩" 
---

# 데이터 로딩

dhtmlxScheduler는 여러 형식으로 데이터를 로드할 수 있습니다. 대부분의 애플리케이션은 **JSON**을 사용합니다. **iCalendar (.ics)** 및 **XML**은 또한 호환성 또는 가져오기 시나리오를 위해 지원됩니다.

### 관련 가이드

- [데이터 형식 개요](guides/data-formats.md)

## 인라인 데이터 세트에서 데이터 로드

인라인 데이터 세트에서 데이터를 로드하려면 [`parse()`](api/method/parse.md) 메소드를 사용하세요:

~~~js
scheduler.init("scheduler_here", new Date(2027, 4, 1), "month");
...
scheduler.parse([
    { id: "1", text: "Meeting", start_date: "2027-05-11 14:00", end_date: "2027-05-11 17:00" },
    { id: "2", text: "Conference", start_date: "2027-05-15 12:00", end_date: "2027-05-18 19:00" },
    { id: "3", text: "Interview", start_date: "2027-05-24 09:00", end_date: "2027-05-24 10:00" }
]);
~~~

### 관련 샘플

- [이벤트를 계단식으로 표시하기](https://docs.dhtmlx.com/scheduler/samples/02_customization/24_cascade_event_display.html)

### 관련 API

- [`parse()`](api/method/parse.md)

### 관련 가이드

- [데이터 형식](guides/data-formats.md)

## 데이터 파일에서 데이터 로드

데이터 파일에서 데이터를 로드하려면 [`load()`](api/method/load.md) 메소드를 사용하세요:

~~~js
scheduler.init("scheduler_here", new Date(2027, 4, 1), "month");
...
scheduler.load("data.json"); // 파일에서 데이터 불러오기
~~~

### 관련 샘플

- [Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)

### 관련 API

- [`load()`](api/method/load.md)

### 관련 가이드

- [데이터 형식](guides/data-formats.md)

## 백엔드에서 데이터 로드

REST 엔드포인트를 노출시켜 JSON 형식으로 Scheduler 이벤트를 반환하면 백엔드에서 데이터를 로드합니다.

- 서버 측 구현은 스택에 따라 다릅니다. 예를 들어, Node.js에서는 이벤트 데이터를 반환하는 경로를 추가할 수 있습니다:

~~~js
app.get("/data", async (request, response) => {
    const events = await db.event.find().toArray();
    response.json(events);
});
~~~

- 클라이언트 측에서는 데이터 URL과 함께 [`load()`](api/method/load.md)를 호출합니다:

~~~js
scheduler.init("scheduler_here", new Date(2027, 4, 1), "month");
scheduler.load("/data");
~~~

:::note
서버로 변경 사항을 저장하려면 [`createDataProcessor()`](api/method/createdataprocessor.md)를 사용하세요. 서버 측 통합에 대해 참조 [Server-Side Integration](guides/server-integration.md).
:::

### Related API

- [`createDataProcessor()`](api/method/createdataprocessor.md)

### Related Guides

- [Server-Side Integration](guides/server-integration.md)

## 다중 소스에서 데이터 로드

다중 소스에서 데이터를 로드하려면 필요한 엔드포인트를 요청하고 결과를 합친 다음 [`parse()`](api/method/parse.md)를 호출합니다:

~~~js
Promise.all([
    fetch("/api/events").then((response) => response.json()),
    fetch("/api/holidays").then((response) => response.json())
]).then(([events, holidays]) => {
    scheduler.parse([...events, ...holidays]);
});
~~~

### Related API

- [`parse()`](api/method/parse.md)

### Related Guides

- [데이터 형식](guides/data-formats.md)

## 데이터 속성

### 필수 속성

정확하게 구문 분석되려면 각 이벤트에 다음 속성이 포함되어야 합니다:

- **id** - (*string|number*) 고유 이벤트 ID
- **start_date** - (*date|string*) 이벤트의 시작 날짜
- **end_date** - (*date|string*) 이벤트의 종료 날짜
- **text** - (*string*) 이벤트 제목/설명

JSON 및 XML 데이터의 기본 날짜 형식은 **'%Y-%m-%d %H:%i'** 입니다(날짜 형식 명세 참조: [date format specification](guides/settings-format.md))

이를 변경하려면 [`date_format`](api/config/date_format.md) 구성 옵션을 사용하세요.

~~~js
scheduler.config.date_format = "%Y-%m-%d %H:%i";
...
scheduler.init("scheduler_here", new Date(2027, 4, 18), "week");
~~~

### Custom properties

위의 필수 속성에 국한되지 않으며 데이터 항목에 임의의 사용자 정의 속성을 추가할 수 있습니다.
추가 데이터 속성은 문자열로 구문 분석되며 클라이언트 쪽으로 로드되어 필요에 따라 사용할 수 있습니다.

맞춤 속성이 포함된 데이터 예제는 [여기](guides/data-formats.md)에서 확인할 수 있습니다.

### Related API

- [`date_format`](api/config/date_format.md)

### Related Guides

- [Event object](guides/event-object-operations.md)

## 데이터베이스 구조

데이터베이스를 설정할 때 Scheduler 이벤트에 기대되는 구조는 다음과 같습니다:

- **events table** - Scheduler 이벤트를 정의
- **id** - (*string/int/guid*) 이벤트 ID. 기본 키, 자동 증가.
- **start_date** - (*DateTime*) 이벤트의 시작 날짜, 널 불가.
- **end_date** - (*DateTime*) 이벤트의 종료 날짜, 널 불가.
- **text** - (*string*) 작업의 설명.

반복 이벤트가 있는 경우 다음 필드를 추가합니다:

- **rrule** - (*string*) RFC-5545 형식의 반복 규칙
- **duration** - (*number*) 각 항목의 지속 시간(초)
- **recurring_event_id** - (*string/int/guid*) 수정/삭제된 발생의 상위 시퀀스 ID
- **original_start** - (*DateTime*) 편집/삭제된 항목의 원래 시작 날짜
- **deleted** - (*boolean*) 삭제된 발생 여부 표시

추가 열은 자유롭게 정의할 수 있으며, 클라이언트에 로드되어 클라이언트 측 API에서 사용할 수 있습니다.

### Related Guides

- [Recurring Events](guides/recurring-events.md)

## 동적 로딩

기본적으로 dhtmlxScheduler는 모든 데이터를 한 번에 로드합니다. 큰 이벤트 컬렉션을 사용하는 경우 문제가 될 수 있습니다.
이러한 상황에서는 동적 로딩 모드를 사용하고 Scheduler의 현재 보기 영역을 채우는 데 필요한 부분만 로드할 수 있습니다.

### 기법

동적 로딩을 활성화하려면 [`setLoadMode()`](api/method/setloadmode.md) 메소드를 호출하세요:

~~~js
scheduler.setLoadMode("month");
scheduler.load("/api/events");
~~~

매개변수로 로딩 모드를 받으며, 이 모드는 로드할 데이터의 크기를 정의합니다: *day, week, month 또는 year.* 

예를 들어 'week' 모드를 설정하면 스케줄러는 현재 주에 대한 데이터만 요청하고 나머지는 필요할 때 로드합니다.

#### 로딩 모드 작동 방식

사전 정의된 로딩 모드는 설정된 기간 내의 데이터 로딩 간격을 지정합니다. 예를 들어 다음 날짜의 주 보기를 열 경우: 2027-02-02에서 2027-02-09까지.
선택한 모드에 따라 동적 로딩은 다음과 같이 진행됩니다:

- "day" 모드의 경우

~~~js
scheduler.setLoadMode("day");
~~~

스케줄러는 날짜별로 데이터를 요청합니다. 예: 2027-02-02에서 2027-02-09까지.

- "month" 모드의 경우

~~~js
scheduler.setLoadMode("month");
~~~

스케줄러는 한 달 단위로 데이터를 요청합니다. 예: 2027-02-01에서 2027-03-01까지.

- "year" 모드의 경우

~~~js
scheduler.setLoadMode("year");
~~~

스케줄러는 연도 단위로 데이터를 요청합니다. 예: 2027-01-01에서 2028-01-01까지.

어떤 경우에도 요청된 간격은 렌더링된 간격보다 작지 않습니다.

로딩 간격은 다음을 정의합니다:

- 동적 로딩 호출의 빈도

로딩 간격이 커질수록 동적 로딩 호출 빈도가 줄어듭니다. Scheduler는 이미 로드된 데이터 부분을 메모리에 보관하고 그 부분에 대한 호출을 반복하지 않습니다.

- 개별 요청 처리의 지속 시간

로딩 간격이 커질수록 더 많은 데이터가 한 번에 로드되므로 요청 처리 시간이 길어집니다.

#### 요청

생성된 요청은 다음과 같이 보입니다:

~~~js
/api/events?from=DATEHERE&to=DATEHERE
~~~

*DATEHERE는 [`load_date`](api/config/load_date.md) 옵션으로 정의된 형식의 유효한 날짜 값입니다.*

### Related API

- [`setLoadMode()`](api/method/setloadmode.md)
- [`load_date`](api/config/load_date.md)

### Loading spinner

대용량 데이터 크기를 다룰 때 로딩 스피너를 표시하는 것이 유용합니다. 사용자가 애플리케이션이 실제로 무언가를 하고 있음을 알 수 있습니다.

스케줄러에 대한 로딩 스피너를 활성화하려면 [`show_loading`](api/config/show_loading.md) 속성을 *true*로 설정하세요.

~~~js
scheduler.config.show_loading = true;
...
scheduler.init("scheduler_here", new Date(2027, 4, 10), "month");
~~~

:::note
스피너 이미지를 변경하려면 'imgs/loading.gif'를 사용자 지정 이미지로 바꾸세요.
:::

## 타임라인 및 유닛 섹션의 데이터 서버에서 로딩 {#collections}

Timeline 및 Units 보기에 데이터를 로드하는 동안 뷰에 로드될 섹션 배열이 필요합니다.

백엔드에서 Timeline 및 Units 섹션 데이터를 로드하려면 좀 더 확장된 구성이 필요합니다:

- Timeline 뷰 초기화 중, sections 배열 대신 [`serverList()`](api/method/serverlist.md) 메소드를 사용하고 컬렉션의 이름을 인수로 전달합니다:

~~~js
scheduler.createTimelineView({
    ....
    y_unit: scheduler.serverList("sections"),
    ...
});
~~~

- 스케줄러로 데이터를 로드하려면 [`load()`](api/method/load.md) 메소드를 사용합니다:

~~~js
scheduler.load("data.json");
~~~

데이터를 수동으로 가져오는 경우(예: 헤더를 추가하기 위해) 같은 페이로드를 [`parse()`](api/method/parse.md)로 전달할 수 있습니다:

~~~js
fetch("/api/timeline")
    .then((response) => response.json())
    .then((payload) => scheduler.parse(payload, "json"));
~~~

- 백엔드에서 scheduler 데이터 응답을 구현하는 동안 다음 형식을 사용합니다:

~~~js title="data.json"
{
    "data":[
        {
            "id":"1",
            "start_date":"2027-03-02 00:00:00",
            "end_date":"2027-03-04 00:00:00",
            "text":"dblclick me!",
            "type":"1"
        },
        {
            "id":"2",
            "start_date":"2027-03-09 00:00:00",
            "end_date":"2027-03-11 00:00:00",
            "text":"and me!",
            "type":"2"
        },
        {
            "id":"3",
            "start_date":"2027-03-16 00:00:00",
            "end_date":"2027-03-18 00:00:00",
            "text":"and me too!",
            "type":"3"
        },
        {
            "id":"4",
            "start_date":"2027-03-02 08:00:00",
            "end_date":"2027-03-02 14:10:00",
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

위의 예에서 "data" 배열은 달력 이벤트를 포함하고 있고, "collections" 해시는 [`serverList()`](api/method/serverlist.md) 메서드를 통해 참조될 수 있는 컬렉션을 포함합니다.

### Related API

- [`serverList()`](api/method/serverlist.md)

### Related Guides

- [Timeline view](views/timeline.md)
- [Units view](views/units.md)