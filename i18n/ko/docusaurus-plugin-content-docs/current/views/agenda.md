---
title: "아젠다 뷰"
sidebar_label: "아젠다 뷰"
---

# 아젠다 뷰

*dhtmlxScheduler 6.0 이하 버전을 사용 중이라면 [여기](views/agenda-legacy.md)에서 자세한 내용을 확인하세요.*

아젠다 뷰는 다가오는 이벤트를 명확하고 정돈된 방식으로 목록으로 보여줍니다.

![agenda_view](/img/agenda_view.png)


[Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)


:::note
기본적으로 왼쪽 목록은 현재 달의 첫째 날부터 이벤트를 표시하기 시작합니다. 이를 조정하려면 [agenda_start](api/config/agenda_start.md) 및 [agenda_end](api/config/agenda_end.md) 속성을 사용하거나 **scheduler.date.agenda_start** 및 **scheduler.date.agenda_end** 함수를 오버라이드할 수 있습니다.
:::

## 초기화

아젠다 뷰를 스케줄러에 추가하려면 다음 단계를 따르세요:

1) 페이지에서 아젠다 확장 기능을 활성화합니다:

~~~js
scheduler.plugins({
    agenda_view: true
});
~~~
  
2) 스케줄러의 HTML에 뷰 탭을 추가합니다:

~~~html
<div id="scheduler_here" class="dhx_cal_container" ...>
    <div class="dhx_cal_navline">
       ...
       <div class="dhx_cal_tab" data-tab="agenda"></div>
    </div>
    ...    
</div>
~~~
  
3) 탭의 라벨을 설정합니다:

~~~js
//'agenda_tab'은 탭의 div를 참조합니다. 기본 라벨은 'Agenda'입니다.
scheduler.locale.labels.agenda_tab = "나의 아젠다"; 
~~~


[Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)


## GUI 세부 정보 

- 목록의 빈 셀을 더블 클릭하면 새 이벤트를 생성할 수 있습니다.
- 이벤트 행을 더블 클릭하면 라이트박스가 열려 이벤트를 수정하거나 삭제할 수 있습니다.

## 로컬라이제이션 팁

아젠다 뷰에는 로케일에 두 개의 라벨이 포함되어 있습니다:

- **scheduler.locale.labels.agenda_tab** - 뷰 탭의 라벨
- **scheduler.locale.labels.full_day** - 하루 종일 또는 여러 날 이벤트에 표시되는 라벨

일반적으로 첫 번째 라벨은 뷰 탭을 추가할 때 설정하며, 두 번째 라벨은 앱에서 영어 이외의 언어를 사용할 경우에만 커스터마이즈하면 됩니다.

## 이전/다음/오늘 버튼 

기본적으로 아젠다 뷰는 한 달간의 이벤트를 표시합니다. 이전, 다음, 오늘 버튼을 통해 사용자가 월 단위로 이동할 수 있습니다. 표시 범위는 **scheduler.date.agenda_start()** 및 **scheduler.date.add_agenda()** 함수를 재정의하여 조정할 수 있습니다.

**scheduler.date.agenda_start(date)**는 지정된 날짜를 기준으로 뷰에 표시할 구간의 시작 날짜를 반환합니다. 기본적으로 해당 월의 첫째 날을 반환합니다.

예를 들어, 한 주 단위로 표시하고 싶다면 다음과 같이 함수를 재정의할 수 있습니다:

~~~js
scheduler.date.agenda_start = function(date){
  return scheduler.date.week_start(new Date(date)); 
};

scheduler.date.add_agenda = function(date, inc){
  return scheduler.date.add(date, inc, "week"); 
}; 
~~~

이렇게 하면 표시 범위가 한 주로 제한됩니다.

## 표시 가능한 날짜 범위 설정

[agenda_end](api/config/agenda_end.md) 및 [agenda_start](api/config/agenda_start.md) 속성을 설정하여 표시 범위를 고정할 수도 있습니다:

~~~js
scheduler.config.agenda_start = new Date(2023, 5, 1); 
scheduler.config.agenda_end = new Date(2023, 6, 1);   
~~~

## 관련 가이드

- ["일반 설정 안내"](guides/configuration.md)
- ["Agenda View Templates"](views/agenda-view-templates.md)
- ["데이터 불러오기"](guides/loading-data.md)
- ["스킨(Skins)"](guides/skins.md)
- ["Localization"](guides/localization.md)
