---
title: "날짜 차단 및 표시"
sidebar_label: "날짜 차단 및 표시"
---

# 날짜 차단 및 표시

라이브러리는 특정 날짜나 날짜 범위를 차단하고 표시(하이라이트)할 수 있는 **Limit** 확장을 제공합니다.

플러그인을 사용하려면 페이지에서 활성화하세요. 

:::note
참고: [](views/timeline.md)를 사용하는 경우, 'timeline' 확장은 'limit' 확장보다 먼저 활성화되어야 합니다:
:::

~~~js
scheduler.plugins({
    limit: true, /*!*/
    timeline: true
});
~~~


## 구성 옵션

확장 기능에서 사용할 수 있는 구성 옵션은 다음과 같습니다:

- [display_marked_timespans](api/config/display_marked_timespans.md) - 차단된(표시된) 시간 범위가 스케줄러에서 하이라이트될지 여부를 정의합니다
- [check_limits](api/config/check_limits.md) - 제한 검사 활성화/비활성화를 제어합니다
- [mark_now](api/config/mark_now.md) - 현재 시간을 표시하는 마커의 활성화/비활성화를 제어합니다
- [now_date](api/config/now_date.md) - [mark_now](api/config/mark_now.md) 옵션에 대한 날짜를 설정합니다
- [limit_end](api/config/limit_end.md) - 허용 가능한 날짜 범위의 끝 제한을 설정합니다
- [limit_start](api/config/limit_start.md) - 허용 가능한 날짜 범위의 시작 제한을 설정합니다
- [limit_view](api/config/limit_view.md) - 이벤트 보기 제한을 제어합니다


[현재 시간 표식](https://docs.dhtmlx.com/scheduler/samples/02_customization/23_current_time.html)


## 관련 이벤트 

스케줄러가 허용되지 않은 날짜로 이벤트를 생성/수정하려는 시도를 감지하면 [onLimitViolation](api/event/onlimitviolation.md) 이벤트가 생성됩니다.

## 특정 날짜를 차단하는 방법은?

스케줄러에서 제한을 지정하기 위해 사용할 수 있는 몇 가지 방법이 있습니다:


- [addMarkedTimespan](api/method/addmarkedtimespan.md) - 날짜를 표시하되 특정 설정으로 차단을 만들어 내며(제한에 대한 사용자 정의 스타일링 설정 허용)
- [markTimespan](api/method/marktimespan.md) - 기본 스타일 또는 사용자 정의 스타일을 적용하여 날짜를 표시 및/또는 차단합니다. 애플리케이션 내부 업데이트가 발생한 직후 표시가 취소됩니다. 하이라이팅에 사용할 수 있습니다


[차단 날짜](https://docs.dhtmlx.com/scheduler/samples/03_extensions/25_advanced_limitation.html)


## 특정 날짜를 표시하는 방법은?

지정된 날짜를 표시하는 데 사용할 수 있는 방법은 2가지가 있습니다:


- [addMarkedTimespan](api/method/addmarkedtimespan.md) - 날짜를 표시하지만 특정 설정으로 차단을 만들어 내며(제한에 대한 사용자 정의 스타일링 설정 허용)
- [markTimespan](api/method/marktimespan.md) - 기본 스타일 또는 사용자 정의 스타일을 적용하여 날짜를 표시 및/또는 차단합니다. 애플리케이션 내부 업데이트가 발생한 직후 표시가 취소됩니다. 하이라이팅에 사용할 수 있습니다


[포인터 하이라이트 처리](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)


## 표시/차단 제거

현재 표시/차단된 시간 범위를 제거하는 데 사용할 수 있는 방법이 몇 가지 있습니다:


- [deleteMarkedTimespan](api/method/deletemarkedtimespan.md) - [addMarkedTimespan](api/method/addmarkedtimespan.md) 메서드로 설정된 표시/차단을 제거
- [unmarkTimespan](api/method/unmarktimespan.md) - [markTimespan](api/method/marktimespan.md) 메서드로 설정된 표시/차단을 제거


[포인터 하이라이트 처리](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)


## 차단 우선순위

다수의 차단 메서드를 호출하고 서로 다른 구간을 차단하면 차단은 다음과 같은 우선순위로 적용됩니다(가장 높은 우선순위에서 가장 낮은 우선순위로):


1. 특정 항목에 대해 Date() 객체를 통해 지정된 날짜;
2. 특정 항목의 날짜들(**sections** 매개변수가 정의된 경우);
3. Date() 객체를 통해 지정된 날짜;
4. 기타 날짜.

- 같은 **type**을 가진 경우 더 높은 우선순위의 차단/표시는 같은 우선순위의 차단/표시를 덮어씁니다. 
- 동일한 우선순위를 가진 여러 차단/표시 메서드는 같은 시간 슬롯에서 동시에 적용됩니다.

예시:


~~~js
scheduler.addMarkedTimespan({ // 4th July, 2027 차단(수요일)
    days:  new Date(2027, 7, 4),
    zones: "fullday", 
    type:  "dhx_time_block",
    css:   "red_section" // 적용된 CSS 클래스의 이름
});
scheduler.addMarkedTimespan({ // 매주 일요일, 월요일, 수요일 차단
    days:  [0, 1, 3], 
    zones: "fullday",
    type:  "dhx_time_block", 
    css:   "blue_section" // 적용된 CSS 클래스의 이름
});
// id="2"인 항목에 대해 일요일과 수요일만 차단
scheduler.addMarkedTimespan({  
    days:  [0,3], 
    zones: "fullday",
    type:  "dhx_time_block", 
    css:   "gray_section",  // 적용된 CSS 클래스의 이름
    sections: { timeline: 2} 
});

~~~


이 메서드들을 호출한 결과는 다음과 같습니다:


1. 먼저, 타임라인 뷰의 항목(id="2")에 대해 매주 일요일과 수요일을 차단하고 이를 회색으로 색칠합니다.
2. 그런 다음 2012년 7월 4일을 차단하고 이를 빨간색으로 표시합니다.
3. 마지막으로 매주 일요일, 월요일, 수요일을 차단하고 이를 파란색으로 표시합니다.

![limits_priority.png](/img/limits_priority.png)

이 동작을 변경하고 우선순위에 관계없이 모든 표시를 표시하려면 [overwrite_marked_timespans](api/config/overwrite_marked_timespans.md) 설정을 사용할 수 있습니다:

~~~js
scheduler.config.overwrite_marked_timespans_config = false;
~~~