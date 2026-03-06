---
sidebar_label: "setLoadMode"
title: "setLoadMode method"
description: "데이터를 부분적으로 로드하는 모드를 설정하여 동적 로딩을 가능하게 합니다."
---

# setLoadMode

### Description

@short: 데이터를 부분적으로 로드하는 모드를 설정하여 동적 로딩을 가능하게 합니다.

@signature: setLoadMode: (mode: string) =\> void

### Parameters

- `mode` - (required) *string* - 로딩 모드

### Example

~~~jsx
scheduler.config.load_date = "%Y.%m.%d";  
scheduler.init('scheduler_here',new Date(2009,10,1),"month");

scheduler.setLoadMode("month")  
scheduler.load("data/events.php");
~~~

### Related samples
- [Loading data from a database](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/05_loading_database.html)

### Details

:::note
  
이 메서드는 **scheduler.init()** 호출 후, 스케줄러에 데이터를 로드하기 전에 사용해야 합니다. 
 
:::

기본적으로 스케줄러는 모든 데이터를 한 번에 로드합니다. 이는 이벤트가 많은 경우 비효율적일 수 있습니다. 이런 경우에는 현재 뷰에 필요한 데이터만 부분적으로 로드하는 것이 좋습니다.

**mode** 파라미터는 다음 미리 정의된 값 중 하나를 받습니다:

- day;  
- week;  
- month;  
- year.

예를 들어, 모드를 'month'로 설정하면 스케줄러는 현재 월에 해당하는 데이터만 요청하며, 필요에 따라 추가 데이터를 로드합니다. 
[로딩 모드에 대해 자세히 알아보기](guides/loading-data.md#dynamic-loading).

#### 요청

생성되는 요청은 다음과 같습니다:

~~~php
Data?from=DATEHERE&to=DATEHERE
~~~

*여기서 DATEHERE는 [load_date](api/config/load_date.md) 설정에 따라 포맷된 유효한 날짜입니다.*

<br>

서버 측에서 [dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html)를 사용할 경우, 데이터 파싱을 처리하기 위한 추가 서버 측 작업은 필요하지 않습니다.

### Related API
- [load_date](api/config/load_date.md)
- [load_format](api/template/load_format.md)

### Related Guides
- ["데이터 불러오기"](guides/loading-data.md#dynamic-loading)
