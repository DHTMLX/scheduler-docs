---
title: "스케줄러 마크업"
sidebar_label: "스케줄러 마크업"
---

# 스케줄러 마크업

표준 스케줄러의 마크업은 다음과 같습니다:

~~~html
<div id="scheduler_here" class="dhx_cal_container" style='width:100%; height:100%;'>
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

## 탭 위치 지정

버전 7.0부터, **.dhx_cal_navline** 요소는 플렉스 컨테이너이며 탭은 **order** 스타일에 따라 배치됩니다.

### 버전 6.0 및 이전

#### 기본 ('terrace') 스킨

초기에 기본 ('terrace') 스킨은 탭 위치를 설정하는 CSS 속성(예: `style="right:204px;"`)을 무시하고, 탭을 특정 로직으로 배치합니다: 기본 뷰는 왼쪽에 세그먼트 버튼으로 표시되지만, 추가 뷰는 오른쪽에 개별 버튼으로 배치됩니다.

마크업에서 위치를 수동으로 설정하려면(예: 마크업에서), [fix_tab_position](api/config/fix_tab_position.md) 매개변수를 *false*로 설정하여 기본 동작을 비활성화하고 CSS 속성으로 좌표를 설정합니다:

~~~js
scheduler.config.fix_tab_position = false;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

다음 CSS 클래스를 사용하여 세그먼트 버튼을 만들 수 있음을 주의하세요:

- **dhx_cal_tab_last** - 오른쪽 테두리를 둥글게 만듭니다
- **dhx_cal_tab_first** - 왼쪽 테두리를 둥글게 만듭니다
- **dhx_cal_tab_standalone** - 양쪽 테두리를 모두 둥글게 만듭니다

예를 들어 기본 스킨에서 'day'-'week'-'month' 세그먼트 버튼을 수동으로 설정하려면 다음과 같이 마크업을 지정하면 됩니다:
~~~html
<div class="dhx_cal_tab dhx_cal_tab_first" data-tab="day" style="left:14px;"></div>
<div class="dhx_cal_tab" data-tab="week"  style="left: 75px;"></div>
<div class="dhx_cal_tab dhx_cal_tab_last" data-tab="month" style="left:136px"></div>
~~~

## 뷰 탭 추가/삭제

### 탭 추가

헤더에 새 탭을 추가하려면 **"dhx_cal_navline"** 요소의 자식 노드로 **"dhx_cal_tab"** 클래스를 가진 div를 추가합니다:

~~~html
<div class="dhx_cal_navline">
    ...
    <div class="dhx_cal_tab" data-tab="day"></div>
    <div class="dhx_cal_tab" data-tab="week"></div>
    <div class="dhx_cal_tab" data-tab="timeline"></div>
    <div class="dhx_cal_tab" data-tab="month"></div>
</div>
~~~

클릭 시 열릴 뷰는 **data-tab** 속성으로 정의되며 **(viewName)**으로 지정됩니다.

:::note
참고로 탭에는 여러 개의 CSS 클래스를 적용할 수 있지만 **"dhx_cal_tab"** 클래스가 먼저 와야 합니다.
:::

### 탭 삭제

헤더에서 탭을 제거하려면 관련 div를 마크업에서 제거합니다:

헤더에서 'month' 탭 제거:

~~~html
<div class="dhx_cal_navline">
    ...
    <div class="dhx_cal_tab" data-tab="day"></div>
    <div class="dhx_cal_tab" data-tab="week"></div>
</div>
~~~

:::note
탭이 제거되더라도 관련 뷰는 [setCurrentView](api/method/setcurrentview.md) 및 [updateView](api/method/updateview.md) 메서드를 통해 프로그래밍적으로 계속 접근할 수 있습니다.
:::

## 네비게이션 버튼 숨기기

스케줄러 헤더에서 네비게이션 버튼을 숨기려면 관련 div에 *'display:none'* 스타일을 설정합니다:

헤더에서 네비게이션 버튼 숨기기:
~~~html
<style>
    .dhx_cal_prev_button, .dhx_cal_next_button{
        display:none;
    }
</style>

<div id="scheduler_here" class="dhx_cal_container" style='width:100%; height:100%;'>
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

## 스케줄러 헤더 숨기기

전체 스케줄러의 헤더를 숨기려면 *'display:none'*를 설정합니다:

~~~html
<style>
    .dhx_cal_navline{
        display:none;
    }
</style>

~~~