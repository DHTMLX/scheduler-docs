---
sidebar_label: "load"
title: "load method"
description: "외부 소스에서 스케줄러로 데이터를 로드합니다."
---

# load

### Description

@short: 외부 소스에서 스케줄러로 데이터를 로드합니다.

@signature: load: (url: string, callback?: SchedulerCallback) =\> void

### Parameters

- `url` - (required) *string* - 서버 측 URL (정적 파일이거나 지원되는 형식 중 하나로 데이터를 출력하는 서버 측 스크립트일 수 있습니다)
- `callback` - (optional) *function* - 로딩이 완료된 후 호출되는 함수

### Example

~~~jsx
scheduler.load("data"); // 데이터 형식이 자동으로 감지됩니다.
// 또는
scheduler.load("data",function(){
    alert("데이터가 성공적으로 로드되었습니다");
});
~~~

### Related samples
- [Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)
- [Loading data from a database](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/05_loading_database.html)

### Details

동적으로 데이터를 로드할 때, 두 번째 인자로 제공된 콜백 함수는 초기 데이터 로드 시에만 호출됩니다.
후속 데이터 로드는 이후에 발생하지만, 콜백은 다시 호출되지 않습니다.

스케줄러에 데이터가 로드될 때마다 콜백을 실행하려면, [onLoadEnd](api/event/onloadend.md) 이벤트를 사용하는 것을 고려하세요.

### 마이그레이션

버전 5.2부터 스케줄러는 데이터 형식을 자동으로 감지합니다.

5.2 이전 버전에서는 이 메서드가 세 개의 매개변수를 받았습니다:

- **url** - (*string*) 서버 측 URL (정적 파일이거나 XML 데이터를 출력하는 서버 측 스크립트일 수 있습니다)
- **type** - (*string*) <i>('json', 'xml', 'ical')</i> 데이터 유형 지정, 기본값은 <i>'xml'</i>
- **callback** - (*function*) 로딩 후 호출할 함수

### Related API
- [onLoadEnd](api/event/onloadend.md)
- [onLoadStart](api/event/onloadstart.md)
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)

### Related Guides
- ["데이터 포맷 예시"](guides/data-formats.md)
- ["데이터 불러오기"](guides/loading-data.md)

### Change log
- 두 번째 **type** 매개변수는 버전 5.2부터 제거되었습니다.
