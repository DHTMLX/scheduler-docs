---
title: "스케줄러 마크업"
sidebar_label: "스케줄러 마크업"
---

# 스케줄러 마크업

아래는 표준 스케줄러 마크업 예시입니다:

~~~html
<div id="scheduler_here" class="dhx_cal_container">
    <div class="dhx_cal_navline">
        <div class="dhx_cal_prev_button">&nbsp;</div>
        <div class="dhx_cal_next_button">&nbsp;</div>
        <div class="dhx_cal_today_button"></div>
        <div class="dhx_cal_date"></div>
        <div class="dhx_cal_tab" data-tab="day"></div>
        <div class="dhx_cal_tab" data-tab="week"></div>
        <div class="dhx_cal_tab" data-tab="month"></div>
       </div>
    <div class="dhx_cal_header"></div>
    <div class="dhx_cal_data"></div>       
</div>
~~~

![markup](/img/markup.png)

## 탭 위치 지정 {#tabs-positioning}

버전 7.0부터 **.dhx_cal_navline** 요소는 flex 레이아웃을 사용하며, 탭은 **order** CSS 속성에 따라 정렬됩니다.

### 6.0 버전 이하

#### 기본('terrace') 스킨

기본('terrace') 스킨에서는, 탭 위치를 지정할 때와 같은 CSS 속성이 무시됩니다. 대신, 탭은 스케줄러의 자체 규칙에 따라 배치됩니다: 기본 뷰는 왼쪽에 세그먼트 버튼 그룹으로, 추가 뷰는 오른쪽에 개별 버튼으로 표시됩니다.

탭 위치를 수동으로 제어하려면(예: 마크업에서 직접), [fix_tab_position](api/config/fix_tab_position.md) 파라미터를 *false*로 설정하여 기본 위치 지정 동작을 비활성화하고, CSS로 탭 좌표를 지정하세요:

~~~js
scheduler.config.fix_tab_position = false;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

아래 CSS 클래스를 적용하여 세그먼트 버튼 효과를 낼 수 있습니다:

- **dhx_cal_tab_last** - 오른쪽 테두리 둥글게 처리
- **dhx_cal_tab_first** - 왼쪽 테두리 둥글게 처리
- **dhx_cal_tab_standalone** - 양쪽 테두리 모두 둥글게 처리

예를 들어, 기본 스킨에서 'day'-'week'-'month' 세그먼트 버튼을 수동으로 배치하려면 다음과 같은 마크업을 사용하세요:
~~~html
<div class="dhx_cal_tab dhx_cal_tab_first" data-tab="day"></div>
<div class="dhx_cal_tab" data-tab="week"></div>
<div class="dhx_cal_tab dhx_cal_tab_last" data-tab="month"></div>
~~~


## 뷰 탭 추가/삭제 {#addingdeletingviewstabs}

### 탭 추가

헤더에 새로운 탭을 추가하려면, **"dhx_cal_navline"** 요소 안에 **"dhx_cal_tab"** 클래스를 가진 div를 추가하면 됩니다:

~~~html
<div class="dhx_cal_navline">
    ...
    <div class="dhx_cal_tab" data-tab="day"></div>
    <div class="dhx_cal_tab" data-tab="week"></div>
    <div class="dhx_cal_tab" data-tab="timeline"></div>
    <div class="dhx_cal_tab" data-tab="month"></div>
</div>
~~~

**data-tab** 속성은 탭 클릭 시 열릴 뷰를 지정하며, 형식은 **(viewName)**입니다.

:::note
여러 CSS 클래스를 탭에 적용할 수 있지만, **"dhx_cal_tab"** 클래스는 항상 첫 번째로 지정해야 합니다.
:::

### 탭 삭제

헤더에서 탭을 삭제하려면, 해당 div를 마크업에서 제거하면 됩니다:

~~~js title="헤더에서 'month' 탭 제거하기"
~~~html
<div class="dhx_cal_navline">
  ...
  <div class="dhx_cal_tab" data-tab="day"></div>
  <div class="dhx_cal_tab" data-tab="week"></div>
</div>
~~~

:::note
마크업에서 탭을 제거해도 뷰 자체가 비활성화되는 것은 아니며, [setCurrentView](api/method/setcurrentview.md) 및 [updateView](api/method/updateview.md) 메서드를 통해 프로그래밍적으로 접근할 수 있습니다.
:::


## 네비게이션 버튼 숨기기 {#hidingthenavigationbuttons}

스케줄러 헤더에서 네비게이션 버튼을 숨기려면, 아래와 같이 해당 div에 *'display:none'*을 적용하세요:

~~~js title="헤더에서 네비게이션 버튼 숨기기"
<style>
  .dhx_cal_prev_button, .dhx_cal_next_button{
  display:none;
  }
</style>

<div id="scheduler_here" class="dhx_cal_container">
  <div class="dhx_cal_navline">
  <div class="dhx_cal_prev_button">&nbsp;</div>
  <div class="dhx_cal_next_button">&nbsp;</div>
  <div class="dhx_cal_today_button"></div>
  ...
  </div>
  <div class="dhx_cal_header"></div>
  <div class="dhx_cal_data"></div> 
</div>
~~~


## 스케줄러 헤더 숨기기 {#hidingtheschedulersheader}

스케줄러 헤더 전체를 숨기려면, navline에 *'display:none'*을 지정하세요:

~~~html
<style>
  .dhx_cal_navline{
  display:none;
  }
</style>

~~~
