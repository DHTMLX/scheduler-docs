---
title: "여러 사용자"
sidebar_label: "여러 사용자"
---

# 여러 사용자

스케줄러는 별도의 캘린더를 기본적으로 지원하지 않지만, 여러 데이터 피드를 하나의 스케줄러 인스턴스에 불러와서 이를 시뮬레이션할 수 있습니다.

~~~js
// 두 개의 데이터 피드 로드
scheduler.load("events_shared.php?user="1"");
scheduler.load("events_shared.php?user="2"");
scheduler.config.readonly = true;
~~~

서버 측에서는 다음과 같이 처리할 수 있습니다:

~~~php
$scheduler->render_sql("select * from events_shared where event_type="1" AND 
userId = ".$user_id,"event_id","start_date,end_date,text,event_type,userId");
~~~

이 방법을 사용하면 여러 소스의 데이터를 동시에 표시할 수 있습니다. 위 예시의 **userId**는 단순한 예시일 뿐이며, 실제로는 필요에 맞는 규칙을 적용할 수 있습니다.

이 접근 방식은 더 발전된 시나리오로 확장할 수도 있습니다. 예를 들어, 사용자가 모든 이벤트를 볼 수 있지만 자신의 이벤트만 수정할 수 있도록 할 수 있습니다:

~~~js
// 첫 번째 데이터 피드에 대해 저장 활성화
var dp =  scheduler.createDataProcessor("events.php?user");
dp.init(scheduler);
        
// 자신의 이벤트에만 편집 작업 허용
function allow_own(id){
    var ev = this.getEvent(id);
    return ev.userId == 1;
}
scheduler.attachEvent("onClick",allow_own);
scheduler.attachEvent("onDblClick",allow_own);

// 새 이벤트의 기본 속성
scheduler.attachEvent("onEventCreated",function(id){
    const ev = this.getEvent(id);
    // userId는 DataProcessor를 통해 백엔드로 전송됩니다.
    // 반드시 확인 필요
    ev.userId = CURRENT_USER_ID; 
});
~~~
