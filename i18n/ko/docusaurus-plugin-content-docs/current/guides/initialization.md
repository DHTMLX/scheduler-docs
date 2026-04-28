---
title: "dhtmlxScheduler를 순수 JS/HTML에서 사용하기"
sidebar_label: "dhtmlxScheduler를 순수 JS/HTML에서 사용하기"
---

import { FrameworkIcon } from '@site/src/components/FrameworkIcon';

# dhtmlxScheduler를 순수 JS/HTML에서 사용하기

 dhtmlxScheduler를 사용하는 애플리케이션을 개발할 때, 가장 먼저 필요한 것은 Scheduler를 초기화하거나 간단히 말하면 페이지에 Scheduler를 표시하는 것입니다.

 이 가이드는 Plain JS 및 HTML에서 dhtmlxScheduler를 초기화하는 방법에 대해 설명합니다. 프런트엔드 프레임워크와의 통합 가이드를 아래에서 확인할 수도 있습니다.

<div className="framework-grid">

  <a className="framework-card" href="../../integrations/react/quick-start/">
    <FrameworkIcon name="react" className="framework-icon" />
    <div className="framework-title">React</div>
    <div className="framework-desc">
      props와 이벤트가 있는 이미 만들어진 <code>ReactScheduler</code> 컴포넌트를 사용합니다.
    </div>
  </a>

  <a className="framework-card" href="../../integrations/angular/howtostart-angular/">
    <FrameworkIcon name="angular" className="framework-icon" />
    <div className="framework-title">Angular</div>
    <div className="framework-desc">
      얇은 래퍼를 사용하여 Angular 프로젝트에 Scheduler를 통합합니다.
    </div>
  </a>

  <a className="framework-card" href="../../integrations/vue/howtostart-vue/">
    <FrameworkIcon name="vue" className="framework-icon" />
    <div className="framework-title">Vue</div>
    <div className="framework-desc">
      작은 래퍼와 반응형 구성을 가진 Vue 앱 내에서 Scheduler를 사용합니다.
    </div>
  </a>

  <a className="framework-card" href="../../integrations/svelte/howtostart-svelte/">
    <FrameworkIcon name="svelte" className="framework-icon" />
    <div className="framework-title">Svelte</div>
    <div className="framework-desc">
      구성 및 이벤트를 바인드하는 간단한 컴포넌트로 Svelte에 Scheduler를 삽입합니다.
    </div>
  </a>

  <a className="framework-card" href="../../integrations/salesforce/howtostart-salesforce/">
    <FrameworkIcon name="salesforce" className="framework-icon" />
    <div className="framework-title">Salesforce</div>
    <div className="framework-desc">
      Salesforce Lightning Web Components에서 Scheduler를 사용하고 org 데이터에 연결합니다.
    </div>
  </a>

</div>


페이지에서 Scheduler를 초기화하는 방법은 두 가지가 있습니다:

- [마크업을 통한 Scheduler 초기화](#initializing-scheduler-via-markup)
- [헤더 구성 속성을 통한 초기화](#initializing-scheduler-via-header-config)

## 마크업을 통한 Scheduler 초기화

마크업을 통해 기본 Scheduler를 페이지에 표시하려면 3단계를 따르세요:

1. 페이지에 [dhtmlxScheduler 코드 파일들](#required-code-files)을 포함합니다.
2. 페이지에 DIV 컨테이너를 만들고 해당 요소의 자식 DIV 컨테이너들을 정의합니다.
3. 새로 생성한 컨테이너에서 [init](api/method/init.md) 메서드를 사용해 dhtmlxScheduler를 초기화합니다. 메서드의 매개변수로 Scheduler가 표시될 HTML 컨테이너(또는 그 ID)를 전달합니다.

~~~html
<!DOCTYPE html>
<html>
<head>
   <script src="../scheduler/dhtmlxscheduler.js" type="text/javascript"></script>
   <link rel="stylesheet" href="../scheduler/dhtmlxscheduler.css" 
        type="text/css">
</head>
<body>
    <!--스케줄러와 표준 'div' 세트의 컨테이너-->
   <div id="scheduler_here" class="dhx_cal_container">
        <div class="dhx_cal_navline">
            <div class="dhx_cal_prev_button">&nbsp;</div>
            <div class="dhx_cal_next_button">&nbsp;</div>
            <div class="dhx_cal_today_button"></div>
            <div class="dhx_cal_date"></div>
            <div class="dhx_cal_tab" data-tab="day"></div>
            <div class="dhx_cal_tab" data-tab="week" ></div>
               <div class="dhx_cal_tab" data-tab="month"></div>
           </div>
        <div class="dhx_cal_header"></div>
        <div class="dhx_cal_data"></div>       
   </div>
   <script>
     scheduler.init("scheduler_here"); /*!*/
   </script>
</body>
</html>
~~~

![Scheduler initialization](/img/init_scheduler_front.png)


[Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)


## 헤더 구성 속성을 통한 Scheduler 초기화

이 방법으로 초기화해야만 [반응형](guides/initialization.md#making-scheduler-responsive)으로 작동합니다.

페이지에 기본 Scheduler를 표시하려면 다음 단계를 따르세요:

1. 페이지에 [dhtmlxScheduler 코드 파일들](#required-code-files)을 포함합니다.
2. 페이지에 DIV 컨테이너를 생성합니다.
3. [헤더 구성 객체](api/config/header.md)에서 Scheduler의 구조를 명시합니다.
4. 새로 생성한 컨테이너에서 [init](api/method/init.md) 메서드를 사용해 초기화합니다. 매개변수로 Scheduler가 표시될 HTML 컨테이너(또는 아이디)를 전달합니다.

~~~html
<!DOCTYPE html>
<html>
<head>
   <script src="../scheduler/dhtmlxscheduler.js"></script>
   <link rel="stylesheet" href="../scheduler/dhtmlxscheduler.css" 
        type="text/css">
</head>
<body>
   <!--스케줄러 컨테이너-->
   <div id="scheduler_here">
   </div>
</body>   
<script>
    // 스케줄러의 구조 설정
    scheduler.config.header = [
        "day",
        "week",
        "month",
        "date",
        "prev",
        "today",
        "next"
    ];
    scheduler.init('scheduler_here',new Date(2027,0,1),"week"); /*!*/
</script>
</html>
~~~


[Responsive scheduler](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/13_touch_ui.html)

 
## Required code files

필수 코드 파일은 다음과 같습니다:

- *dhtmlxscheduler.js*
- *dhtmlxscheduler.css* (다양한 스킨도 확인해 볼 수 있습니다. [스킨 가이드](guides/skins.md) 참조)

~~~html
<script src="../scheduler/dhtmlxscheduler.js"></script>
<link rel="stylesheet" href="../scheduler/dhtmlxscheduler.css" type="text/css">
~~~

dhtmlxScheduler 패키지의 파일들을 어디에서 찾을 수 있는지 빠르게 살펴보겠습니다.

- <b>sources</b> - 라이브러리의 원본 코드 파일들. 파일들이 미니파이되지 않았고 읽기 쉽습니다. 패키지는 주로 컴포넌트 디버깅 용도로 사용됩니다.
:::note
참고로 **Trial** 버전의 Scheduler 라이브러리에는 **sources** 폴더가 포함되어 있지 않습니다.
:::
- <b>samples</b> - 코드 예제들.
- <b>codebase</b> - 라이브러리의 압축된 코드 파일들. 파일 크기가 훨씬 작고 프로덕션에서의 사용에 적합합니다. <b>앱에서는 이 폴더의 파일을 사용해야 합니다.</b>


## Scheduler 크기 지정

Scheduler는 위의 예제에서처럼 컨테이너 요소의 전체 크기를 차지합니다(예: 위의 예에서 *scheduler_here* DIV). 컨테이너의 높이를 지정하지 않거나 0으로 설정하면 Scheduler의 높이도 0이 되어 표시되지 않습니다.

샘플에서 일반적으로 문서 본문과 Scheduler 컨테이너 요소에 100% 너비와 높이를 부여하여 Scheduler를 전체 화면으로 만듭니다:

~~~html
<style>
    html, body{
        margin:0px;
        padding:0px;
        height:100%;
        overflow:hidden;
    }
</style>
</head>
<body>
 <div id="scheduler_here" class="dhx_cal_container" style="width:100%; height:100%;">
~~~

만약 기본 크기가 지정되지 않은 div에 *scheduler_here* 요소를 넣으면 문제가 발생할 수 있습니다:

~~~html
<style>
    html, body{
        margin:0px;
        padding:0px;
        height:100%;
        overflow:hidden;
    }
</style>
</head>
<body>
 <div class="outer_container"> /*!*/
   <div id="scheduler_here" class="dhx_cal_container" style="width:100%;height:100%;">
~~~

이 경우 Scheduler가 올바르게 표시되지 않는 이유는 "scheduler_here"의 크기가 부모의 100%로 설정되었고 부모의 크기가 지정되지 않았기 때문입니다.

상대 크기(%, percents)를 *.dhx_cal_container* 요소에 사용할 경우 부모 요소에도 높이가 설정되어 있어야 합니다. 그렇지 않으면 최종 높이가 0이 되어 Scheduler가 표시되지 않을 수 있습니다.

또는 메인 Scheduler DIV의 크기에 대해 다른 단위를 사용할 수 있습니다. 다음 요소들은 외부 요소의 스타일과 상관없이 예상 크기를 갖습니다:

~~~html
<div id="scheduler_here" class="dhx_cal_container" style="width:100%; height:100vh;">
~~~

또는:

~~~html
<div id="scheduler_here" class="dhx_cal_container" style="width:100%; height:800px;">
~~~

### Scheduler 자동 크기 조정

dhtmlxScheduler의 기본 재사이징 동작을 바꾸는 확장인 **container_autoresize**가 Scheduler에 적용되면 가로/세로가 컨테이너에 맞춰 자동으로 조정됩니다. 이 경우 내부 스크롤바 없이 모든 이벤트와 데이터를 표시할 수 있도록 Scheduler의 높이와 너비가 확장될 수 있습니다.

이 동작은 Scheduler의 콘텐츠가 모두 보이도록 보장하므로, 페이지 스크롤 없이 Scheduler 내용을 완전히 확인해야 하는 사용 사례에 적합합니다.

#### 사용법

**container_autoresize** 확장을 활성화하려면 Scheduler 설정에 아래와 같이 확장을 포함합니다:

~~~js
scheduler.plugins({
    container_autoresize: true
});
~~~


[컨테이너 자동 크기 조정 예제](https://docs.dhtmlx.com/scheduler/samples/03_extensions/28_container_autoresize.html)


이 간단한 설정 변경으로 컨텐츠에 맞게 Scheduler의 크기가 조정되도록 하는 **container_autoresize** 동작이 활성화됩니다.

#### 컨테이너 자동 크기 조정과 헤더 고정 처리

**container_autoresize** 확장 기능이 활성화되면 Scheduler는 모든 콘텐츠에 맞춰 크기를 조정합니다. 이로 인해 Scheduler가 화면을 벗어나고 외부 컨테이너나 페이지 스크롤이 생길 수 있습니다.

이 모드에서 페이지를 스크롤하면 네비게이션 및 시간 헤더도 함께 스크롤되어 스크롤을 내려도 더 이상 보이지 않게 됩니다. 일반적으로 이는 의도된 동작이지만, 헤더를 고정시키려는 시나리오도 있습니다. 이 경우 약간의 추가 코드와 스타일이 필요합니다.

헤더를 고정하려면 sticky 위치를 약간의 추가 스타일과 함께 사용할 수 있습니다. 예시:

~~~js
<style>
    
  .dhx_cal_container{
    overflow: visible!important;
   }
  .dhx_cal_navline,
  .dhx_cal_header {
      position: sticky;
      z-index: 10;
      background:var(--dhx-scheduler-container-background);
    
  }
  .dhx_cal_navline{
      z-index: 11;
      top:0;
  }
  .dhx_cal_header{
      /* 상단 좌표는 JS에서 할당됩니다 */
      margin-left: -1px;
      box-shadow: 0 1px 0px 0px var(--dhx-scheduler-base-colors-border);
  }
</style>
~~~

또한 헤더의 올바른 상단 위치를 보장하기 위해 필요한 JavaScript가 있습니다. 네비게이션 패널은 다른 스타일과 콘텐츠에 따라 높이가 달라질 수 있으므로, 이 높이를 동적으로 계산해 헤더의 top 좌표로 적용해야 합니다:

~~~js
scheduler.attachEvent("onViewChange", function(){
   const navBar = scheduler.$container.querySelector(".dhx_cal_navline");
   const header = scheduler.$container.querySelector(".dhx_cal_header");
   if(navBar && header){
       header.style.top = `${navBar.offsetHeight}px`;
   }
});
~~~

전체 데모는 아래 스니펫에서 확인할 수 있습니다:

관련 샘플  [Container autoresize and sticky header](https://snippet.dhtmlx.com/syo8wm9s)

## Scheduler를 반응형으로 만들기

헤더 구성 속성으로 Scheduler를 초기화하면 클라이언트의 화면 크기에 맞는 헤더 구조를 선택할 수 있습니다.
또한 작은 화면에서 요소와 글꼴 크기를 반응형으로 만드는 특정 스타일이 적용됩니다.

자세한 내용은 별도의 기사에서 확인할 수 있습니다: [Mobile Responsive Scheduler](guides/touch-support.md).

## ES6/7 및 TypeScript 앱에 파일 가져오기

다음 명령을 사용해 파일을 가져옵니다:

~~~js
import { scheduler } from 'dhtmlx-scheduler';
~~~


상용, 엔터프라이즈 또는 Ultimate 버전의 경우 명령은 다음과 같습니다:

~~~js
import { scheduler, Scheduler } from 'dhtmlx-scheduler';
~~~


## Vite로 Scheduler 사용하기

프로젝트에서 Vite를 사용하는 경우, 애플리케이션에 Scheduler가 올바르게 포함되도록 **vite.config.js** 파일에 다음 설정이 필요합니다:

~~~js title="vite.config.js"
optimizeDeps: {
    include: [
        'dhtmlx-scheduler',
    ]
}
~~~


RequireJS 기반 애플리케이션에 파일 포함하기
------------------------------------------- 

RequireJS 기반 애플리케이션에 dhtmlxScheduler 파일을 포함하려면 아래 예제의 로직을 따라야 합니다:

~~~js
requirejs(["codebase/dhtmlxscheduler"], function(dhx){
    const scheduler = dhx.scheduler;
    const Scheduler = dhx.Scheduler;// Enterprise 빌드를 위한 것

    scheduler.init('scheduler_here',new Date(),"week");
    scheduler.parse([
        {
            id: 1, text: "Event 1", start_date: "2027-07-15 09:00", 
            end_date: "2027-07-15 10:00"
        },
        {
            id: 2, text: "Event 2", start_date: "2027-07-15 10:00", 
            end_date: "2027-07-15 11:00"
        }
    ]);
});
~~~


dhtmlxScheduler 라이브러리는 `scheduler`와 `Scheduler`(상용, 엔터프라이즈 또는 Ultimate 버전에서)라는 필드를 가진 객체를 반환합니다 - 이 객체들에 대해서는 [여기](guides/multiple-per-page.md)를 참조하십시오.

:::note
RequireJS에서 Scheduler를 커스텀 확장과 함께 사용할 때는 RequireJS용 `shim` 구성을 명시하고 Scheduler에서 확장으로의 의존성을 직접 설정해야 합니다.
:::

다음 예제는 커스텀 확장 파일 *custom_tooltip_plugin.js*를 올바르게 설정하는 방법을 보여줍니다:

~~~js
requirejs.config({
    paths: {
        "dhtmlxscheduler": "../../codebase/dhtmlxscheduler",
        "ext/dhtmlxscheduler_custom_tooltip": "../custom_tooltip_plugin"
    },
    shim: {
        "ext/dhtmlxscheduler_custom_tooltip": ["dhtmlxscheduler"]
    }
});
 
requirejs(["dhtmlxscheduler"], 
function (dhx) {
    const scheduler = dhx.scheduler;
 
    scheduler.init('scheduler_here',new Date(),"week");
    scheduler.parse([
        {
            id: 1, text: "Event 1", start_date: "2027-07-15 09:00", 
            end_date: "2027-07-15 10:00"
        },
        {
            id: 2, text: "Event 2", start_date: "2027-07-15 10:00", 
            end_date: "2027-07-15 11:00"
        }
    ]);
});
~~~


패키지 내 어떤 파일의 모듈 이름이 항상 *codebase 폴더 내부의 상대 경로*에 *파일명*을 붙여 지정되는지 확인하십시오. 예시:

핵심 라이브러리:

- "dhtmlxscheduler": "./vendor/dhtmlxscheduler/dhtmlxscheduler"