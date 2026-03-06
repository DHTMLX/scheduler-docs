---
title: "Year View"
sidebar_label: "Year View"
---

# Year View 

Year View는 캘린더에서 하나 이상의 연도를 표시합니다.

![year_view](/img/year_view.png)


[Year view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/04_year_view.html)


## 초기화

스케줄러에서 Year View를 활성화하려면 다음 단계를 따르세요:

1. 페이지에서 Year 확장 기능을 활성화합니다:
~~~js
scheduler.plugins({
    year_view: true
});
~~~
2. 스케줄러의 마크업에 뷰의 탭을 추가합니다:
~~~html
<div id="scheduler_here" class="dhx_cal_container" ...>
    <div class="dhx_cal_navline">
       ...
       <div class="dhx_cal_tab" name="year_tab"></div>
    </div>
    ...    
</div>
~~~
3. 탭의 라벨을 설정합니다:
~~~js
//'year_tab'은 해당 div의 이름입니다
scheduler.locale.labels.year_tab ="Year"; 
~~~


[Year view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/04_year_view.html)


## GUI 세부 정보 

- 이벤트가 할당된 날짜는 강조 표시됩니다.
- 날짜 위에 마우스를 올리면, 해당 날짜에 예약된 모든 이벤트가 나열된 툴팁이 나타납니다. 툴팁의 'details' 아이콘을 클릭하면 라이트박스가 열립니다(읽기 전용 모드가 활성화되어 있지 않은 경우).


## 뷰에 표시되는 월 수 설정

각 행과 열에 표시되는 월의 수를 제어하려면 [year_x](api/config/year_x.md) 및 [year_y](api/config/year_y.md) 속성을 조정하세요:

~~~js
//Year View에 6개월만 표시됩니다
scheduler.config.year_x = 2; //한 행에 2개월
scheduler.config.year_y = 3; //한 열에 3개월

~~~


## 관련 가이드

- ["일반 설정 안내"](guides/configuration.md)
- ["Year View Templates"](views/year-view-templates.md)
- ["데이터 불러오기"](guides/loading-data.md)
- ["이벤트 객체 작업"](guides/event-object-operations.md)
- ["Blocking and Marking Dates"](guides/limits.md)
- ["스킨(Skins)"](guides/skins.md)
