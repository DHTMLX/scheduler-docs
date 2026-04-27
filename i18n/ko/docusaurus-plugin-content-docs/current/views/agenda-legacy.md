---
title: "Agenda View (v6.0)"
sidebar_label: "Agenda View (v6.0)"
---

# Agenda View (v6.0)

*이 문서는 dhtmlxScheduler 버전 6.0 및 이전 버전에 대한 내용을 다룹니다. dhtmlxScheduler 7.0 이상 버전에 대한 자세한 내용은 [여기](views/agenda.md)를 확인하세요.*

Agenda 뷰는 다가오는 이벤트의 목록을 표시합니다.

![agenda_view_old](/img/agenda_view_old.png)


[Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)


:::note
기본적으로 이 뷰의 왼쪽 목록에는 현재 날짜부터 시작하는 이벤트가 표시됩니다. 이 동작을 조정하려면 [agenda_start](api/config/agenda_start.md) 및 [agenda_end](api/config/agenda_end.md) 속성을 사용하세요.
:::

## 초기화

Agenda 뷰를 스케줄러에 추가하려면 다음 단계를 따르세요:

1) 페이지에서 Agenda 확장 기능을 활성화합니다:

~~~js
scheduler.plugins({
    agenda_view: true
});
~~~
  
2) 스케줄러 마크업에 뷰 탭을 추가합니다:

~~~html
<div id="scheduler_here" class="dhx_cal_container" ...>
    <div class="dhx_cal_navline">
       ...
       <div class="dhx_cal_tab" name="agenda_tab"></div>
    </div>
    ...    
</div>
~~~
  
3) 탭의 라벨을 설정합니다:

~~~js
//'agenda_tab'은 div의 이름입니다. 기본 라벨은 'Agenda'입니다.
scheduler.locale.labels.agenda_tab = "My Agenda"; 
~~~


[Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)


## GUI 세부사항 

- 목록의 빈 셀을 더블 클릭하면 새 이벤트를 생성할 수 있습니다.
- 이벤트를 수정하거나 삭제하려면, 이벤트 설명 왼쪽에 있는 'Details' 아이콘을 더블 클릭하여 라이트박스를 열고 변경하세요.

## 로컬라이제이션 팁

Agenda 뷰에는 로케일에 3개의 라벨이 포함되어 있습니다:

- **scheduler.locale.labels.(agendaName)_tab** - 뷰 탭의 라벨
- **scheduler.locale.labels.date** - 날짜 열의 헤더
- **scheduler.locale.labels.description** - 설명 열의 헤더

일반적으로 첫 번째 라벨은 뷰 탭을 스케줄러에 추가할 때 설정합니다. 나머지 라벨은 애플리케이션을 영어 이외의 언어로 현지화할 때만 변경하면 됩니다.

## 표시 날짜 범위 설정

Agenda 뷰에 표시되는 날짜의 범위를 지정하려면, [agenda_end](api/config/agenda_end.md) 및 [agenda_start](api/config/agenda_start.md) 속성을 사용하세요:

~~~js
//2026년 6월 1일부터의 날짜를 표시하려면
scheduler.config.agenda_start = new Date(2026, 5, 1); 

//2027년 6월 1일까지의 날짜를 표시하려면
scheduler.config.agenda_end = new Date(2027, 5, 1);   
~~~

## 다음/이전/오늘 버튼 활성화 

Agenda 뷰에서 Next, Previous, Today 버튼을 활성화하려면 **scheduler.date.agenda_start()** 및 **scheduler.date.add_agenda()** 함수를 재정의해야 합니다.

**scheduler.date.agenda_start(date)**는 주어진 날짜에 대해 표시할 구간의 시작을 반환합니다. 기본적으로 고정된 날짜를 반환하므로 Agenda 뷰는 내비게이션 버튼 클릭에 반응하지 않습니다.

이 함수들을 예를 들어 현재 월을 반환하도록 재정의할 수 있습니다:

~~~js
scheduler.date.agenda_start = function(date){
  return scheduler.date.month_start(new Date(date)); 
};

scheduler.date.add_agenda = function(date, inc){
  return scheduler.date.add(date, inc, "month"); 
}; 
~~~

이후에는 내비게이션 버튼이 정상적으로 동작합니다.

**Related sample** [Next/Previous/Today buttons in Agenda view](https://snippet.dhtmlx.com/5/5a5d072f2)


## 열 너비 조정

Agenda 뷰에서 열의 너비는 CSS 클래스를 사용하여 조정할 수 있습니다:

~~~css
<style>
  .dhx_agenda_line div{
     width: 300px; 
  }
  .dhx_v_border{
     left: 299px; 
  }
</style>
~~~

![Columns Width](/img/agenda_columns_width.png)

**Related sample** [Adjusting width of columns](https://snippet.dhtmlx.com/5/8a2c1eb40)

## 관련 가이드

- ["일반 설정 안내"](guides/configuration.md)
- ["Agenda View Templates"](views/agenda-view-templates-legacy.md)
- ["데이터 불러오기"](guides/loading-data.md)
- ["스킨(Skins)"](guides/skins.md)
- ["Localization"](guides/localization.md)
