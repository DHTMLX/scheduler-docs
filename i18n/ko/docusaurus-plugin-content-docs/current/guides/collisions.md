---
title: "시간 슬롯에서의 이중 이벤트 방지"
sidebar_label: "시간 슬롯에서의 이중 이벤트 방지"
---

# 시간 슬롯에서의 이중 이벤트 방지

많은 사용 사례에서 시간 슬롯당 이벤트 수를 제한해야 할 수 있습니다. 예를 들어, 같은 시간에 이미 다른 이벤트가 정의되어 있다면 두 번째 이벤트의 생성을 거부해야 할 수 있습니다.

## 충돌 모니터링 활성화

시간 슬롯의 이벤트 수를 제어하려면 [**collision**](guides/extensions-list.md#collision) 확장을 사용하세요.

~~~js title="'collision' 확장 기능 활성화하기"
scheduler.plugins({
    collision: true
});
~~~

*페이지에서 확장을 활성화하면 확장이 활성화됩니다.
이 시점부터 스케줄러는 같은 시간 슬롯에 2개의 이벤트를 배치하도록 허용하지 않습니다(생성 또는 이동).*


## 시간 슬롯당 허용되는 이벤트 수 관리

기본적으로 시간 슬롯당 허용되는 이벤트 수는 1입니다. 이 수치를 조정하려면 [collision_limit](api/config/collision_limit.md) 속성을 사용하세요:

[Denying creating more than 2 events per time slot](Denying creating more than 2 events per time slot)
~~~js
scheduler.config.collision_limit = 2;      //allows creating 2 events per time slot
~~~

[시간 슬롯의 이벤트 수 제어](https://docs.dhtmlx.com/scheduler/samples/03_extensions/15_collision.html)


*['collision' extension](guides/extensions-list.md#collision)이 활성화된 상태에서, 사용자가 이미 점유된 시간 슬롯 안에서 새 이벤트를 만들거나 기존 이벤트를 수정하려고 할 때마다,
스케줄러는 [onEventCollision](api/event/oneventcollision.md) 이벤트를 호출하고 이 이벤트는
[collision_limit](api/config/collision_limit.md) 속성으로 설정된 값을 확인합니다.*


하지만, [onEventCollision](api/event/oneventcollision.md) 이벤트는 데이터를 로드하는 동안에는 트리거되지 않는다는 점을 기억하십시오. 따라서 스케줄러에 데이터를 로드하는 동안 시간 슬롯의 아이템 수를 제어하려면 이전 코드를 조금 확장해야 합니다:

[Denying creating/loading more than 2 events per time slot](Denying creating/loading more than 2 events per time slot)
~~~js
scheduler.config.collision_limit = 2; //allows creating 2 events per time slot
scheduler.attachEvent("onEventLoading", function(ev){ /*!*/
    return scheduler.checkCollision(ev);             /*!*/
});                                                   /*!*/

~~~
[checkCollision](api/method/checkcollision.md) 메서드는 이미 다른 이벤트에 의해 점유된 시간에 이벤트가 발생하는지 확인하고
onEventCollision 이벤트를 호출합니다.


## 시간 슬롯에 존재하는 이벤트 수 얻기

시간 슬롯에 존재하는 이벤트 수를 얻으려면 [getEvents](api/method/getevents.md) 메서드를 사용하세요:

[시간 슬롯의 이벤트 수 얻기](Getting the number of events in a time slot)
~~~js
const count = scheduler.getEvents(ev.start_date, ev.end_date).length;
~~~

참고로 [getEvents](api/method/getevents.md) 메서드는 모든 이벤트를 순회하며 날짜를 비교하므로 수천 개의 이벤트를 사용하는 경우 시간이 걸릴 수 있습니다.


## 이중 예약/이벤트 방지에 대한 전체 체크리스트

다음은 시간 슬롯의 이벤트 충돌을 피하기 위해 완료해야 하는 단계의 목록입니다:

1) 페이지에 *collision* 확장을 포함합니다:

~~~js
scheduler.plugins({
    collision: true
});
~~~

2) 서버에서 데이터를 로드하는 동안 새 이벤트의 생성을 차단합니다.

따라서 데이터가 로드되지 않았고 달력이 비어 있을 때 사용자가 이벤트를 만들 수 없도록 합니다.
이 목적을 달성하려면 아래와 같이 onLoadEnd와 onLoadStart 이벤트 핸들러와 readonly 속성을 사용해야 합니다:

~~~js
// 데이터 소스에서 데이터를 로딩하기 시작하기 전에 스케줄러를 읽기 전용으로 만듭니다
scheduler.attachEvent("onLoadStart", function(){
    scheduler.config.readonly = true;
});

// 데이터 소스에서 데이터 로딩이 완료된 후에만 스케줄러를 편집 가능하게 만듭니다
scheduler.attachEvent("onLoadEnd", function(){
    scheduler.config.readonly = false;
});
~~~

3) 레코드가 많아 한 번에 모두 로드되는 경우 데이터 로딩 속도를 높이기 위해 동적 로딩을 활성화합니다.

동적 로딩을 활성화하려면 [setLoadMode](api/method/setloadmode.md) 메서드를 호출하고 그 후 스크립트를 로드합니다:

[Enabling the dynamic loading](Enabling the dynamic loading)
~~~js
scheduler.setLoadMode("month");
scheduler.load("/some");
~~~

4) 서버 측 API에서 충돌하는 이벤트를 검증합니다. 충돌이 감지되면 응답에 오류 상태를 반환하고 클라이언트에서 처리합니다.

또한 확인 실패 시 클라이언트 측에서도 데이터를 다시 로드할 수 있습니다.

정확성 검사를 처리하려면 DataProcessor 이벤트 [onValidationError] 및 [onAfterUpdate]를 사용하고, 데이터를 다시 로드하려면 Scheduler 메서드 [clearAll]과 [load]를 사용하세요:

a. [onValidationError](https://docs.dhtmlx.com/api__dataprocessor_onvalidationerror_event.html)

검증 오류가 발생한 뒤 데이터 전송 전에 발생합니다

~~~js
dp.attachEvent("onValidationError", function(id, details){
   //reload actual data from the server
   scheduler.clearAll();
   scheduler.load("/data");
});
~~~

매개변수:

- id - (string) 오류가 발생한 항목의 ID
- details -    (object) 오류 세부 정보

b. [onAfterUpdate](https://docs.dhtmlx.com/api__dataprocessor_onafterupdate_event.html)

서버 측 응답을 수신하고 처리한 후 발생합니다

~~~js
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
     if(action == "invalid" || action == "error"){
          //reload actual data from the server
          scheduler.clearAll();
          scheduler.load("/data");
     }
});
~~~

매개변수:

- id - (string) 업데이트된 항목의 ID
- action - (string) 응답 상태(작업 유형), 아래의 세부 정보를 참조
- tid - (string) 새 ID(삽입 작업에만 적용)
- response - (mixed) xml 노드/JSON 객체, 파싱된 xml/json 응답을 포함

가능한 응답 상태는 다음과 같습니다:

- updated; 
- inserted;
- deleted;
- invalid;
- error.