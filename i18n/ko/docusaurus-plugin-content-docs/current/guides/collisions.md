---
title: "타임 슬롯에서 중복 이벤트 방지하기"
sidebar_label: "타임 슬롯에서 중복 이벤트 방지하기"
---

# 타임 슬롯에서 중복 이벤트 방지하기

여러 상황에서 동일한 시간대에 예약할 수 있는 이벤트 수를 제한하는 것이 중요할 수 있습니다. 예를 들어, 이미 해당 시간대에 하나의 이벤트가 예약되어 있다면 두 번째 이벤트 추가를 막고 싶을 수 있습니다.

## 충돌 감지 활성화하기 {#activating-the-monitoring-for-collisions}

하나의 시간대에 허용되는 이벤트 수를 관리하려면 [**collision**](guides/extensions-list.md#collision) 확장 기능을 사용할 수 있습니다.

~~~js title="'collision' 확장 기능 활성화하기"
scheduler.plugins({
    collision: true
});
~~~

*이 확장 기능을 페이지에 활성화하면, 사용자가 새로운 이벤트를 생성하거나 기존 이벤트를 이동할 때 동일한 시간대에 두 개의 이벤트가 배치되는 것을 자동으로 방지합니다.*

## 시간대별 허용 이벤트 수 관리하기

기본적으로 하나의 시간대에는 한 개의 이벤트만 허용됩니다. 이 제한을 변경하려면 [collision_limit](api/config/collision_limit.md) 속성을 사용하세요:

~~~js title="시간대별 2개 이상의 이벤트 생성 방지"
scheduler.config.collision_limit = 2;      // 한 시간대에 2개의 이벤트만 허용
~~~

[Controlling the number of events in a time slot](https://docs.dhtmlx.com/scheduler/samples/03_extensions/15_collision.html)


*['collision' 확장 기능](guides/extensions-list.md#collision)이 활성화된 상태에서 사용자가 이미 이벤트가 있는 시간대에 이벤트를 추가하거나 이동하려고 하면, 스케줄러는 [onEventCollision](api/event/oneventcollision.md) 이벤트를 발생시킵니다. 이 이벤트는 [collision_limit](api/config/collision_limit.md) 속성에 설정된 제한을 확인합니다.*


참고로, [onEventCollision](api/event/oneventcollision.md) 이벤트는 데이터 로딩 중에는 발생하지 않습니다. 데이터 로딩 시에도 이벤트 제한을 적용하려면 다음과 같이 코드를 추가해야 합니다:

~~~js title="시간대별 2개 이상의 이벤트 생성/로딩 방지"
scheduler.config.collision_limit = 2; // 한 시간대에 2개의 이벤트만 허용
scheduler.attachEvent("onEventLoading", function(ev){ /*!*/
    return scheduler.checkCollision(ev);             /*!*/
});                                                   /*!*/

~~~
[checkCollision](api/method/checkcollision.md) 메서드는 이벤트가 기존 이벤트와 겹치는지 확인하고, 필요시 [onEventCollision](api/event/oneventcollision.md) 이벤트를 발생시킵니다.

## 특정 시간대에 등록된 이벤트 수 확인하기

특정 시간대에 몇 개의 이벤트가 예약되어 있는지 확인하려면 [getEvents](api/method/getevents.md) 메서드를 사용할 수 있습니다:

~~~js title="시간대별 이벤트 수 확인하기"
var count = scheduler.getEvents(ev.start_date, ev.end_date).length;
~~~

[getEvents](api/method/getevents.md) 메서드는 모든 이벤트를 검사하여 날짜를 비교하므로, 이벤트 수가 매우 많을 경우 시간이 다소 소요될 수 있습니다.

## 중복 예약/이벤트 방지를 위한 전체 체크리스트

타임 슬롯에서 이벤트 충돌을 방지하기 위한 절차를 요약하면 다음과 같습니다:

1) 페이지에 *collision* 확장 기능을 포함하세요:

~~~js
scheduler.plugins({
    collision: true
});
~~~

2) 서버에서 데이터를 로딩하는 동안 사용자가 새로운 이벤트를 생성하지 못하도록 방지하세요.

이렇게 하면 캘린더가 완전히 채워지기 전에는 이벤트를 추가할 수 없습니다. [onLoadEnd](api/event/onloadend.md), [onLoadStart](api/event/onloadstart.md) 이벤트 핸들러와 [readonly](api/config/readonly.md) 속성을 함께 사용하세요:

~~~js
// 데이터 소스에서 데이터 로딩이 시작되기 전에 스케줄러를 읽기 전용으로 설정
scheduler.attachEvent("onLoadStart", function(){
    scheduler.config.readonly = true;
});

// 데이터 소스에서 데이터 로딩이 완료된 후 스케줄러를 편집 가능으로 설정
scheduler.attachEvent("onLoadEnd", function(){
    scheduler.config.readonly = false;
});
~~~

3) 많은 레코드를 한 번에 로딩해야 하는 경우 성능 향상을 위해 동적 로딩을 활성화하세요.

동적 로딩을 활성화하려면 데이터를 로딩하기 전에 [setLoadMode](api/method/setloadmode.md) 메서드를 호출하세요:

~~~js title="동적 로딩 활성화"
scheduler.setLoadMode("month");
scheduler.load("/some");
~~~

4) PHP 커넥터의 유효성 검사를 사용하여 서버 측에서 충돌 이벤트를 검증하세요. 자세한 내용은 [data validation](https://docs.dhtmlx.com/connector__php__validation.html#processingincaseofvalidationerror) 문서를 참고하세요.

유효성 검사에 실패하면 클라이언트에서 데이터를 다시 로딩할 수 있습니다.

유효성 검사 실패를 처리하려면 DataProcessor 이벤트 [onValidationError](https://docs.dhtmlx.com/api__dataprocessor_onvalidationerror_event.html)와 
[onAfterUpdate](https://docs.dhtmlx.com/api__dataprocessor_onafterupdate_event.html)를 사용하고, Scheduler의 [clearAll](api/method/clearall.md), [load](api/method/load.md) 메서드로 데이터를 다시 로딩하세요:


a. [onValidationError](https://docs.dhtmlx.com/api__dataprocessor_onvalidationerror_event.html)

유효성 검사 오류가 발생한 후, 데이터가 전송되기 전에 발생합니다:

~~~js
dp.attachEvent("onValidationError", function(id, details){
   // 서버에서 실제 데이터를 다시 로딩
   scheduler.clearAll();
   scheduler.load("/data");
});
~~~

파라미터:

- id - (string) 오류가 발생한 항목의 id
- details -    (object) 오류 상세 정보

b. [onAfterUpdate](https://docs.dhtmlx.com/api__dataprocessor_onafterupdate_event.html)

서버 응답이 처리된 후에 발생합니다:

~~~js
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
     if(action == "invalid" || action == "error"){
          // 서버에서 실제 데이터를 다시 로딩
          scheduler.clearAll();
          scheduler.load("/data");
     }
});
~~~

파라미터:

- id - (string)    업데이트된 항목의 id
- action - (string)    응답 상태(작업 유형), 자세한 내용은 아래 참고
- tid - (string) 새 id (insert 작업에만 해당)
- response - (mixed) 파싱된 응답을 담고 있는 xml node/json 객체

가능한 응답 상태는 다음과 같습니다:

- updated; 
- inserted;
- deleted;
- invalid;
- error.
