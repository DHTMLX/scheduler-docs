---
title: "Grid View"
sidebar_label: "Grid View"
---

# Grid View 

:::info
이 뷰는 Scheduler PRO 버전에만 포함되어 있습니다.
:::

Grid 뷰는 다가오는 이벤트 목록을 보여주며, Agenda 뷰와 달리 원하는 만큼의 컬럼을 설정할 수 있습니다.

![grid_view](/img/grid_view.png)


[Grid view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/27_grid_view.html)


## 초기화 {#initialization}

스케줄러에 Grid 뷰를 추가하려면 다음 단계를 따르세요:

1. 페이지에서 "grid view" 확장 기능을 활성화하세요:
~~~js
scheduler.plugins({
    grid_view: true
});
~~~
2. 뷰의 탭을 스케줄러 마크업에 추가하세요:
~~~html
<div id="scheduler_here" class="dhx_cal_container" ...>
    <div class="dhx_cal_navline">
       ...
       <div class="dhx_cal_tab" name="grid_tab"></div>
    </div>
    ...    
</div>
~~~
3. 탭의 라벨을 설정하세요:
~~~js
//'grid_tab'은 div의 이름입니다
scheduler.locale.labels.grid_tab = "Grid";
~~~
4. [createGridView](api/method/creategridview.md) 메서드를 호출하세요: 
~~~js
scheduler.createGridView({
    name:"grid",
    fields:[    // 그리드의 컬럼 정의
        {id:"id",   label:'Id',   sort:'int',  width:80,  align:'right'},
        {id:"date", label:'Date', sort:'date', width:'*'},
        {id:"text", label:'Text', sort:'str',  width:200, align:'left'}
    ],
    from:new Date(2027, 3, 10),//허용된 날짜 범위의 왼쪽 경계
    to:new Date(2027, 5, 23)    //허용된 날짜 범위의 오른쪽 경계
});
~~~


[Grid view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/27_grid_view.html)


## 날짜 범위 제한하기 {#limitingdaterange}

이 확장 기능을 사용하면 활성 날짜를 제한할 수 있어 사용자가 지정된 범위를 벗어날 수 없습니다.

예를 들어, **2024년 1월 1일**부터 **2025년 1월 1일**까지로 활성 날짜를 제한하려면 다음과 같이 설정합니다:


~~~js
scheduler.createGridView({
     name:"grid",
    ..
    from:new Date(2025, 0, 1),
    to:new Date(2027, 0, 1)
});

~~~

## 네비게이션 활성화 {#activatingnavigation}

그리드에서 ![navigation_buttons](/img/navigation_buttons.png) 버튼으로 네비게이션을 사용하려면 [paging](api/method/creategridview.md) 속성을 켜기만 하면 됩니다:


~~~js
scheduler.createGridView({
    name:"grid",
    ...
    paging:true
});
~~~

[Grid view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/27_grid_view.html)


네비게이션이 활성화되면 ![navigation_buttons](/img/navigation_buttons.png) 버튼을 클릭할 때마다 그리드가 한 달씩 앞으로 또는 뒤로 스크롤됩니다.


기본 시간 간격을 조정하려면 **unit** 및 **step** 속성을 사용하세요:

- **unit** - (<i>minute, hour, day, week, month, year</i>) 스크롤할 때 사용할 시간 단위입니다. 기본값은 'month'입니다.
- **step** - (<i>number</i>) 한 번에 스크롤할 단위의 수입니다. 기본값은 1입니다.


~~~js
//2주씩 스크롤하기
scheduler.createGridView({
    name:"grid",
    ...
    paging:true,
    unit:"week",
    step:2
});
~~~

## 정렬 {#sorting}

컬럼 헤더를 클릭하면 그리드가 어떤 컬럼을 기준으로 정렬되어 있는지와 오름차순 또는 내림차순인지 표시됩니다.


같은 헤더를 다시 클릭하면 정렬 순서가 반대로 바뀝니다.

컬럼마다 데이터 타입(숫자, 문자열, 날짜)이 다를 수 있으므로, 각 타입에 맞는 정렬 방식이 필요합니다.

이를 위해 뷰에서는 올바른 처리를 위해 3가지 정렬 타입을 지원합니다:

1. **int**;
2. **date**;
3. **str**.


컬럼의 정렬을 활성화하고 정렬 타입을 지정하려면 [sort](api/method/creategridview.md) 속성을 사용하세요.


~~~js
scheduler.createGridView({
    name:"grid",
    fields:[
        {id:"date",  label:'Date', sort:'date'},
        {id:"text",  label:'Text', sort:'str'}
    ]
});

~~~


## 커스텀 정렬 함수 {#customsortingfunctions}

직접 정렬 로직을 사용하려면, 함수를 정의하고 [sort](api/method/creategridview.md) 파라미터에 할당하세요.

이 함수는 인접한 값 쌍마다 호출되며, 1, -1, 0 중 하나를 반환해야 합니다:


- **1** - 첫 번째 값이 두 번째 값보다 앞에 와야 할 때;
- **-1** - 두 번째 값이 첫 번째 값보다 앞에 와야 할 때;
- **0** - 두 값이 같을 때.

다음은 일반적인 정렬 함수 예시입니다:


~~~js
scheduler.createGridView({
    name:"grid",
    fields:[
        {id:"id",   label:'Id',      sort: sortById},
        {id:"text", label:'Text', sort:'str'}
    ]
});

function sortById(a,b){
    a = a.id;
    b = b.id;
    return a>b?1:(a<b?-1:0);
}
~~~


## 데이터 템플릿 {#datatemplates}

기본적으로 각 컬럼은 **id**로 지정된 속성의 데이터를 표시합니다.
  
컬럼에 표시되는 내용을 커스터마이즈하고 싶다면 템플릿을 사용할 수 있습니다. 이 경우, 컬럼에는 템플릿 함수가 반환하는 데이터가 표시됩니다.
  
  
데이터 템플릿은 [template](api/method/creategridview.md) 속성을 컬럼에 지정하여 할당합니다.


~~~js
scheduler.createGridView({
    name:"grid",
    fields:[
      {id:"date",label:'Date',template:function(start,end,ev){return "1# "+ev.text}},
       ...
    ]
});

~~~


템플릿 함수는 3개의 파라미터를 받습니다:

- **start** - 이벤트의 시작 날짜
- **end** - 이벤트의 종료 날짜
- **ev** - 이벤트 객체


## 관련 가이드

- ["일반 설정 안내"](guides/configuration.md)
- ["그리드 뷰 템플릿"](views/grid-view-templates.md)
- ["데이터 불러오기"](guides/loading-data.md)
- ["이벤트 객체 작업"](guides/event-object-operations.md)
- ["Blocking and Marking Dates"](guides/limits.md)
- ["스킨(Skins)"](guides/skins.md)
