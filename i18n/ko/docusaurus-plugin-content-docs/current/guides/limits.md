---
title: "Blocking and Marking Dates"
sidebar_label: "Blocking and Marking Dates"
---

# Blocking and Marking Dates

이 라이브러리에는 특정 날짜 또는 날짜 범위를 차단하고 강조할 수 있는 **Limit** 확장 기능이 포함되어 있습니다.

플러그인을 사용하려면, 페이지에서 활성화하세요.

:::note
참고: ["타임라인 뷰"](views/timeline.md)를 사용하는 경우 'limit' 확장은 'timeline' 확장보다 먼저 활성화되어야 합니다:
:::

~~~js
scheduler.plugins({
    limit: true, /*!*/
    timeline: true
});
~~~

## 설정 옵션 {#configurationoptions}

이 확장에서 사용할 수 있는 설정 옵션은 다음과 같습니다:


- [display_marked_timespans](api/config/display_marked_timespans.md) - 차단된(마킹된) 시간 구간이 스케줄러에서 강조 표시되는지 제어합니다
- [check_limits](api/config/check_limits.md) - 제한 확인을 켜거나 끕니다
- [mark_now](api/config/mark_now.md) - 현재 시간을 표시하는 마커를 켜거나 끕니다
- [now_date](api/config/now_date.md) - [mark_now](api/config/mark_now.md) 옵션에서 사용하는 날짜를 설정합니다
- [limit_end](api/config/limit_end.md) - 허용된 날짜 범위의 종료 제한을 정의합니다
- [limit_start](api/config/limit_start.md) - 허용된 날짜 범위의 시작 제한을 정의합니다
- [limit_view](api/config/limit_view.md) - 이벤트 조회를 제한합니다


[Current time marking](https://docs.dhtmlx.com/scheduler/samples/02_customization/23_current_time.html)


## 관련 이벤트 {#relatedevents}

허용되지 않은 날짜에 이벤트를 생성하거나 변경하려고 하면, [onLimitViolation](api/event/onlimitviolation.md) 이벤트가 발생합니다.

## 특정 날짜를 차단하는 방법? {#how-to-block-certain-dates}

스케줄러에서 제한을 설정하는 방법에는 여러 가지가 있습니다:


- [addMarkedTimespan](api/method/addmarkedtimespan.md) - 날짜를 마킹하며, 사용자 정의 스타일 옵션으로 차단할 수 있습니다
- [markTimespan](api/method/marktimespan.md) - 기본 또는 사용자 정의 스타일로 날짜를 마킹하거나 차단합니다; 마킹은 내부 업데이트 후 제거되므로, 강조에 유용합니다


[Blocking dates](https://docs.dhtmlx.com/scheduler/samples/03_extensions/25_advanced_limitation.html)


## 특정 날짜를 마킹하는 방법? {#how-to-mark-certain-dates}

다음 두 가지 메서드를 사용하여 특정 날짜를 강조할 수 있습니다:


- [addMarkedTimespan](api/method/addmarkedtimespan.md) - 날짜를 마킹하며, 사용자 정의 스타일 옵션으로 차단할 수 있습니다
- [markTimespan](api/method/marktimespan.md) - 기본 또는 사용자 정의 스타일로 날짜를 마킹하거나 차단합니다; 마킹은 내부 업데이트 후 제거되므로, 강조에 유용합니다


[Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)


## 마킹/차단 해제 {#removingmarkingblocking}

현재 마킹되거나 차단된 시간 구간을 해제하려면, 다음 메서드를 사용할 수 있습니다:


- [deleteMarkedTimespan](api/method/deletemarkedtimespan.md) - [addMarkedTimespan](api/method/addmarkedtimespan.md)로 설정된 마킹 또는 차단을 제거합니다
- [unmarkTimespan](api/method/unmarktimespan.md) - [markTimespan](api/method/marktimespan.md)로 설정된 마킹 또는 차단을 제거합니다


[Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)


## 차단 우선순위 {#blocking-priority}

여러 가지 차단 방법으로 서로 다른 범위를 지정한 경우, 차단 우선순위는 다음과 같이 적용됩니다(높은 순서부터 낮은 순서까지):


1. 특정 항목에 대해 Date() 객체로 지정된 날짜;
2. 특정 항목에 대한 날짜(**sections** 파라미터가 설정된 경우);
3. Date() 객체로 지정된 날짜;
4. 기타 날짜.

- 동일한 **type**을 가진 경우, 우선순위가 더 높은 차단이나 마킹이 더 낮은 우선순위를 덮어씁니다.
- 동일한 우선순위(시간이 겹치는 경우)의 차단이나 마킹은 함께 적용됩니다.

예시:


~~~js
scheduler.addMarkedTimespan({ // 2012년 7월 4일(수요일) 차단
    days:  new Date(2019, 7, 4),
    zones: "fullday", 
    type:  "dhx_time_block",
    css:   "red_section" // 적용되는 CSS 클래스
});
scheduler.addMarkedTimespan({ // 매주 일, 월, 수요일 차단
    days:  [0, 1, 3], 
    zones: "fullday",
    type:  "dhx_time_block", 
    css:   "blue_section" // 적용되는 CSS 클래스
});
// id="2인" 항목에 대해 매주 일요일, 수요일만 차단
scheduler.addMarkedTimespan({  
    days:  [0,3], 
    zones: "fullday",
    type:  "dhx_time_block", 
    css:   "gray_section",  // 적용되는 CSS 클래스
    sections: { timeline: 2} 
});

~~~


이 호출 이후, 스케줄러는 다음과 같이 동작합니다:


1. **Timeline 뷰에서 id="2인" 항목에 대해 매주 일요일과 수요일을 먼저 차단**하며, 회색으로 표시합니다.
2. 그 다음 **2012년 7월 4일**을 차단하고 빨간색으로 표시합니다.
3. 마지막으로 **매주 일요일, 월요일, 수요일**을 차단하며 파란색으로 표시합니다.

![limits_priority.png](/img/limits_priority.png)

모든 마커를 우선순위와 상관없이 표시하려면, [overwrite_marked_timespans](api/config/overwrite_marked_timespans.md) 옵션을 다음과 같이 설정하세요:

~~~js
scheduler.config.overwrite_marked_timespans_config = false;
~~~
