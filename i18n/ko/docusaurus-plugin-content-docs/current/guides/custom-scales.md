---
title: "뷰의 X축에서 시간 단위 숨기기"
sidebar_label: "뷰의 X축에서 시간 단위 숨기기"
---

# 뷰의 X축에서 시간 단위 숨기기

이 라이브러리는 뷰의 수평 스케일에서 불필요한 시간 단위를 숨길 수 있도록 지원합니다. 예를 들어, 주말을 숨기고 평일만 표시하고 싶을 때 유용하게 사용할 수 있습니다.

## 적용 방법

뷰의 스케일에서 시간 단위(예: 타임라인 뷰의 시간, 주간 뷰의 일)를 숨기려면 **ignore_(viewName)** 메서드를 사용하면 됩니다. 
이 메서드는 단위의 날짜를 매개변수로 받는 함수입니다. 해당 단위에 대해 *true*를 반환하면, 그 단위는 숨겨집니다.

예를 들어, 월간 뷰에서 주말을 숨기고 싶다면 아래와 같이 작성할 수 있습니다:

~~~js
// 0은 일요일, 6은 토요일을 의미합니다
scheduler.ignore_month = function(date){
    if (date.getDay() == 6 || date.getDay() == 0) // 토요일과 일요일 숨기기
        return true;
};
~~~

![hiding_time_units](/img/hiding_time_units.png)


[Hiding week days in the scale of Month view](https://docs.dhtmlx.com/scheduler/samples/11_scales/01_month_ignore.html)


## 숨겨진 스케일 단위 위치에 마커 표시하기

스케일 단위가 숨겨진 위치를 표시하려면 [addMarkedTimespan](api/method/addmarkedtimespan.md) 메서드를 사용할 수 있습니다. 예를 들어, 타임라인 뷰에서는 10:00부터 18:00까지의 시간만 표시되고 나머지는 숨겨집니다. 
경계 셀의 양쪽에 각각 20분씩, 총 40분 길이의 마커로 숨겨진 시간을 강조할 수 있습니다.

~~~html
.yellow_section {
    background-color: #ffa749;
    opacity: 0.25;
}
~~~

~~~js
scheduler.addMarkedTimespan({
    days: "fullweek",
    zones:[9.5*60, 20.5*60],
    invert_zones:true,
    css: "yellow_section"
});
~~~


![highlighting_hidden_hours](/img/highlighting_hidden_hours.png)


[Displaying a marker at the place of hidden scale units](https://docs.dhtmlx.com/scheduler/samples/11_scales/07_timeline_hours_marker.html)
