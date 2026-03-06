---
title: "Custom View"
sidebar_label: "Custom View"
---

# Custom View 

표준 뷰가 요구 사항에 맞지 않을 때, 커스텀 뷰를 생성하는 것이 한 가지 방법입니다.

## 뷰 탭
커스텀 뷰를 시작하려면 스케줄러에 새로운 탭을 추가해야 하며, 이 탭이 새로운 뷰를 나타냅니다. 일반적으로 다음과 같이 작성합니다:

~~~js
<div class="dhx_cal_tab" data-tab="workweek"></div>
~~~

참고 사항:

- 탭의 이름은 다음 패턴을 따라야 합니다: (viewName)_tab
- 탭에는 "dhx_cal_tab"이라는 클래스가 반드시 포함되어야 하며, 이 클래스가 첫 번째로 나와야 합니다.

뷰의 레이블을 설정하려면 다음을 사용합니다:

~~~js
scheduler.locale.labels.{viewName}_tab = "someName"
~~~

## 뷰 동작을 위한 메서드
뷰의 동작 방식을 정의하는 세 가지 필수 메서드가 있습니다. 이 메서드들은 뷰의 구간(예: Week 뷰의 경우 한 주, Month 뷰의 경우 한 달 등)과 사용자가 헤더의 'Next' 또는 'Prev' 버튼을 클릭할 때 활성 날짜를 결정합니다.

1. **scheduler.date.(viewName)_start (active_date)** - 스케줄러의 활성 날짜를 받아 뷰 구간의 시작 날짜를 반환합니다(예: Week 뷰의 경우 활성 주의 첫째 날, Month 뷰의 경우 활성 달의 첫째 날 등).
2. **scheduler.date.get_(viewName)_end (start_date)** - 시작 날짜(이전 메서드에서 반환된)를 받아 뷰 구간의 종료 날짜를 반환합니다(예: 활성 주 또는 달의 마지막 날).
3. **scheduler.date.add_(viewName)(date, inc)** - 사용자가 헤더에서 'Next' 또는 'Prev'를 클릭할 때 활성 날짜가 얼마나 앞으로 또는 뒤로 이동할지 정의합니다.

## 뷰 템플릿 구성
마지막으로, 헤더 날짜와 X축 스케일을 위한 템플릿을 설정해야 합니다:

- **뷰 헤더** - scheduler.templates.(viewName)_date = function(start_date, end_date)(...)
- **X축** - scheduler.templates.(viewName)_scale_date = function(date)(...)

예시:

~~~js
scheduler.templates.workweek_date = scheduler.templates.week_date;
scheduler.templates.workweek_scale_date = scheduler.templates.week_scale_date;
~~~

## 단계별 예제

'workweek'라는 커스텀 뷰를 만드는 방법을 살펴보겠습니다. 이 뷰는 Week 뷰와 유사하지만, 주중 근무일만 표시합니다.

![custom_view](/img/custom_view.png)

단계는 다음과 같습니다:
1. 뷰 탭 추가:
~~~js
<div id="scheduler_here" class="dhx_cal_container" ...>
   <div class="dhx_cal_navline">
       ...
       <div class="dhx_cal_tab" name="workweek_tab"></div>
   </div>
</div>
~~~
2. 탭의 레이블 설정:
~~~js
scheduler.locale.labels.workweek_tab = "Work week"
~~~
3. 뷰 구간의 시작 날짜(활성 주의 월요일)를 반환하는 메서드 정의:
~~~js
scheduler.date.workweek_start = function(date) {
    return scheduler.date.week_start(date);//
}
~~~
여기서는 Week 뷰와 동일하게 week_start() 메서드를 재사용합니다. 두 뷰 모두 시작 날짜가 동일하기 때문입니다.
4. 뷰 구간의 종료 날짜(활성 주의 금요일)를 반환하는 메서드 정의:
~~~js
scheduler.date.get_workweek_end="function(start_date){" 
    return scheduler.date.add(start_date,5,"day"); 
}
~~~
add() 메서드는 지정한 시간 구간만큼 날짜를 더하거나 뺍니다. 자세한 내용은 [여기](api/other/date.md)에서 확인할 수 있습니다.
5. 'Next' 또는 'Prev' 버튼 클릭 시 활성 날짜 변경 방식을 정의하는 메서드:
~~~js
scheduler.date.add_workweek="function(date,inc){" 
    return scheduler.date.add(date,inc*7,"day");
}
~~~
add() 메서드는 시간 구간을 더하거나 빼는 역할을 합니다. 자세한 내용은 [여기](api/other/date.md)에서 확인할 수 있습니다.
6. 뷰 헤더의 날짜 템플릿 정의:
~~~js
scheduler.templates.workweek_date = scheduler.templates.week_date;
~~~
이 템플릿은 Week 뷰와 동일하므로 기본 Week 뷰 템플릿을 재사용합니다 - [week_date](api/template/week_date.md)
7. 뷰의 X축 템플릿 정의:
~~~js
scheduler.templates.workweek_scale_date = scheduler.templates.week_scale_date;
~~~
이 템플릿 역시 Week 뷰에서 가져와 일관성을 유지합니다 - [week_scale_date](api/template/week_scale_date.md)


[Custom view](https://docs.dhtmlx.com/scheduler/samples/02_customization/07_custom_view.html)


## 커스텀 뷰를 기본 뷰로 설정하기
스케줄러에서 처음 표시되는 뷰는 [init](api/method/init.md)에 설명된 대로 초기화 시에 설정됩니다. 하지만 커스텀 뷰의 템플릿이 완전히 처리되기 전에 초기화가 이뤄질 수 있어, 이 경우 초기화가 실패할 수 있습니다.


이를 방지하려면 커스텀 뷰의 템플릿이 모두 준비된 후에 스케줄러를 초기화해야 하며, [onTemplatesReady](api/event/ontemplatesready.md) 이벤트 핸들러 안에서 커스텀 뷰를 생성하는 것이 좋습니다. 이 이벤트는 모든 템플릿이 완전히 처리된 후 발생합니다:

~~~js
scheduler.attachEvent("onTemplatesReady",function(){
    // 여기에 커스텀 뷰 생성 코드를 작성하세요
});

scheduler.init(container, date, "custom view name");
~~~
