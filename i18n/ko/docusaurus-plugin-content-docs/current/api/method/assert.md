---
sidebar_label: "assert"
title: "assert method"
description: "주어진 표현식이 false일 경우, 화면 오른쪽 상단에 빨간색 팝업으로 errorMessage가 표시됩니다."
---

# assert

### Description

@short: 주어진 표현식이 false일 경우, 화면 오른쪽 상단에 빨간색 팝업으로 errorMessage가 표시됩니다.

@signature: assert: (expression: boolean, errorMessage: string) =\> void

### Parameters

- `expression` - (required) *boolean* - 표현식이 참일 경우 true, assert가 실패할 경우 false
- `errorMessage` - (required) *string* - 빨간색 팝업에 표시될 에러 메시지

### Example

~~~jsx
scheduler.attachEvent("onLoadEnd", function(){
   scheduler.assert(scheduler.getTaskCount(), "no data loaded");
});
~~~

### Details

dhtmlxScheduler 코드베이스 내에서 **scheduler.assert()**는 컴포넌트가 유효하지 않은 상태일 때 이를 식별하는 데 사용됩니다.

에러 표시 방식을 사용자 정의하려면 [show_errors](api/config/show_errors.md) 설정을 사용하세요.

에러는 또한 [onError](api/event/onerror.md) 이벤트를 통해 프로그래밍 방식으로 모니터링할 수 있습니다.

### Change log
- added in v6.0
