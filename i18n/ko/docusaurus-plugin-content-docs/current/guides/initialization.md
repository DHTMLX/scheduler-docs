---
title: "dhtmlxScheduler를 순수 JS/HTML에서 사용하기"
sidebar_label: "dhtmlxScheduler를 순수 JS/HTML에서 사용하기"
---

import { FrameworkIcon } from '@site/src/components/FrameworkIcon';

# dhtmlxScheduler를 순수 JS/HTML에서 사용하기

dhtmlxScheduler로 애플리케이션을 개발할 때, 가장 먼저 해야 할 일은 스케줄러를 페이지에 세팅하고 표시하는 것입니다.

이 가이드는 순수 JS와 HTML을 사용하여 dhtmlxScheduler를 초기화하는 방법을 다룹니다. 프론트엔드 프레임워크와의 통합에 대해서는 아래 가이드들을 참고하세요:

<div className="framework-grid">

  <a className="framework-card" href="integrations/react/quick-start/">
    <FrameworkIcon name="react" className="framework-icon" />
    <div className="framework-title">React</div>
    <div className="framework-desc">
      Use the ready-made <code>ReactScheduler</code> component with props and events.
    </div>
  </a>

  <a className="framework-card" href="integrations/angular/howtostart-angular/">
    <FrameworkIcon name="angular" className="framework-icon" />
    <div className="framework-title">Angular</div>
    <div className="framework-desc">
      Integrate Scheduler into Angular projects using a thin wrapper.
    </div>
  </a>

  <a className="framework-card" href="integrations/vue/howtostart-vue/">
    <FrameworkIcon name="vue" className="framework-icon" />
    <div className="framework-title">Vue</div>
    <div className="framework-desc">
      Use Scheduler inside Vue apps with a small wrapper and reactive configuration.
    </div>
  </a>

  <a className="framework-card" href="integrations/svelte/howtostart-svelte/">
    <FrameworkIcon name="svelte" className="framework-icon" />
    <div className="framework-title">Svelte</div>
    <div className="framework-desc">
      Embed Scheduler in Svelte with a simple component that binds config and events.
    </div>
  </a>
</div>


스케줄러를 페이지에 초기화하는 방법은 두 가지가 있습니다:

- [스케줄러의 마크업을 이용하는 방법](#initializing-scheduler-via-markup)
- [header 설정 속성을 사용하는 방법](#initializingschedulerviaheaderconfig)

## 스케줄러를 마크업으로 초기화하기 {#initializing-scheduler-via-markup}

마크업을 통해 기본 스케줄러를 페이지에 설정하려면 아래 3단계를 따르세요:

1. 페이지에 [dhtmlxScheduler 코드 파일](#requiredcodefiles)을 포함합니다.
2. 페이지에 DIV 컨테이너와 필요한 자식 DIV 요소들을 추가합니다.
3. 생성한 컨테이너에서 [init](api/method/init.md) 메서드를 사용해 dhtmlxScheduler를 초기화합니다. 이 메서드는 스케줄러가 렌더링될 HTML 컨테이너(또는 그 id)를 인자로 받습니다.

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
   <script type="text/javascript">
     scheduler.init("scheduler_here"); /*!*/
   </script>
</body>
</html>
~~~

![Scheduler initialization](/img/init_scheduler_front.png)


[Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)


## header config로 스케줄러 초기화하기 {#initializingschedulerviaheaderconfig}

이 방법은 스케줄러를 [반응형](guides/initialization.md#makingschedulerresponsive)으로 만들고 싶을 때 권장됩니다.

기본 스케줄러를 페이지에 설정하려면 다음 단계를 따르세요:

1. 페이지에 [dhtmlxScheduler 코드 파일](#requiredcodefiles)을 포함합니다.
2. 페이지에 DIV 컨테이너를 추가합니다.
3. [header](api/config/header.md) 설정 객체에서 스케줄러의 구조를 정의합니다.
4. [init](api/method/init.md) 메서드를 사용해 컨테이너에서 dhtmlxScheduler를 초기화합니다. 이때 컨테이너(또는 그 id)를 인자로 전달합니다.

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
    scheduler.init('scheduler_here',new Date(2020,0,1),"week"); /*!*/
</script>
</html>
~~~


[Responsive scheduler](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/13_touch_ui.html)

 
## 필수 코드 파일 {#requiredcodefiles}

포함해야 할 파일은 다음과 같습니다:

- *dhtmlxscheduler.js*
- *dhtmlxscheduler.css* (사용 가능한 스킨은 ["스킨(Skins)"](guides/skins.md)에서 확인할 수 있습니다)

~~~html
<script src="../scheduler/dhtmlxscheduler.js"></script>
<link rel="stylesheet" href="../scheduler/dhtmlxscheduler.css" type="text/css">
~~~

아래는 dhtmlxScheduler 패키지 구조의 간단한 예시로, 파일 위치를 쉽게 찾을 수 있습니다:

- <b>sources</b> - 라이브러리의 소스 코드 파일들이 들어 있습니다. 이 파일들은 난독화되어 있지 않아 디버깅 용도로 주로 사용됩니다.
:::note
**Trial** 버전의 Scheduler 라이브러리에는 **sources** 폴더가 포함되어 있지 않습니다.
:::
- <b>samples</b> - 코드 샘플이 포함되어 있습니다.
- <b>codebase</b> - 라이브러리의 패키징된 코드 파일들이 있습니다. 이 파일들은 용량이 작고, 프로덕션 환경에서 사용하기에 적합합니다. <b>프로젝트에서는 이 폴더의 파일을 사용해야 합니다.</b>


## 스케줄러 크기 설정 {#schedulersizing}

스케줄러는 컨테이너 요소(*scheduler_here* div, 위 예시 참고)의 전체 크기를 채우지만, 컨테이너 자체를 확장하지는 않습니다. 
즉, 컨테이너에 높이가 지정되어 있지 않거나 0인 경우, 스케줄러도 높이가 0이 되어 화면에 표시되지 않습니다.

예시에서는 스케줄러가 전체 화면을 차지하도록, 문서의 body와 스케줄러 컨테이너에 100% 너비와 높이를 설정합니다:

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
 <div id="scheduler_here" class="dhx_cal_container">
~~~

*scheduler_here* 요소가 기본 크기 설정이 된 div 내부에 위치할 경우, 문제가 발생할 수 있습니다:

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
   <div id="scheduler_here" class="dhx_cal_container">
~~~

이 경우, "scheduler_here"는 부모의 100%로 설정되어 있지만, 부모에 크기가 지정되어 있지 않으므로 스케줄러가 제대로 표시되지 않습니다.

*.dhx_cal_container* 요소에 상대적 크기(%)를 사용하는 경우, 반드시 부모 요소에도 높이가 지정되어 있어야 합니다. 그렇지 않으면 계산된 높이가 0이 되어 스케줄러가 나타나지 않습니다.

또는, 메인 스케줄러 div의 크기를 다른 단위로 설정할 수도 있습니다. 아래 예시들은 외부 요소의 스타일에 상관없이 예상한 크기를 갖게 됩니다:

~~~html
<div id="scheduler_here" class="dhx_cal_container">
~~~

또는:

~~~html
<div id="scheduler_here" class="dhx_cal_container">
~~~

### 스케줄러 자동 리사이즈 {#scheduler-autoresizing}

**container_autoresize** 확장 기능은 스케줄러의 기본 리사이즈 동작을 변경합니다.  
기본적으로 dhtmlxScheduler는 컨테이너에 맞게 크기를 조절하고, 고정된 컨테이너 크기 내에서 모든 데이터를 볼 수 있도록 내부 스크롤바를 표시합니다.

**container_autoresize** 확장 기능을 활성화하면, 스케줄러는 모든 내용을 표시할 수 있도록 동적으로 크기를 조절합니다. 즉, 모든 이벤트와 데이터를 내부 스크롤 없이 보여주기 위해 높이와/또는 너비가 확장됩니다.

이 기능을 사용하면 스케줄러 내부에서 스크롤 없이 모든 내용을 한 번에 볼 수 있어, 전체 내용의 가시성이 필요한 경우 유용합니다.

#### 사용 방법

**container_autoresize** 확장 기능을 활성화하려면, 아래와 같이 스케줄러 설정에 포함시키면 됩니다:

~~~js
scheduler.plugins({
    container_autoresize: true
});
~~~


[Autoresizing the scheduler container](https://docs.dhtmlx.com/scheduler/samples/03_extensions/28_container_autoresize.html)


이 간단한 설정만으로 **container_autoresize** 기능이 활성화되어, 스케줄러가 콘텐츠에 따라 자동으로 크기를 조정하게 됩니다.

#### container_autoresize와 헤더 처리 방법

**container_autoresize** 확장 기능이 활성화되면, Scheduler는 모든 콘텐츠에 맞게 자동으로 크기가 조정됩니다. 이로 인해 Scheduler가 화면 크기를 초과하여 페이지나 외부 컨테이너에 스크롤바가 나타날 수 있습니다.

이 모드에서는 페이지를 스크롤할 때 내비게이션 및 시간 헤더도 함께 이동하므로, 아래로 스크롤할 때 헤더가 고정되어 보이지 않습니다. 일반적으로 이러한 동작이 문제가 되지 않지만, 헤더를 항상 고정해두고 싶은 경우도 있을 수 있습니다. 이 경우에는 추가적인 스타일링과 스크립트를 통해 헤더를 고정할 수 있습니다.

헤더를 고정하려면 CSS의 sticky 포지셔닝과 추가 스타일을 사용할 수 있습니다. 예시는 다음과 같습니다:

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
      /* top coordinate is assigned from JS */
      margin-left: -1px;
      box-shadow: 0 1px 0px 0px var(--dhx-scheduler-base-colors-border);
  }
</style>
~~~

또한, sticky time scale의 올바른 top 위치를 지정하여 내비게이션 패널 바로 아래에 오도록 하기 위해 JavaScript 코드가 필요합니다.

내비게이션 패널의 높이는 스타일과 내용에 따라 달라질 수 있으므로, 동적으로 높이를 계산하여 헤더의 top 위치에 적용해야 합니다. 예시는 다음과 같습니다:

~~~js
scheduler.attachEvent("onViewChange", function(){
   const navBar = scheduler.$container.querySelector(".dhx_cal_navline");
   const header = scheduler.$container.querySelector(".dhx_cal_header");
   if(navBar && header){
       header.style.top = `${navBar.offsetHeight}px`;
   }
});
~~~

아래 스니펫에서 전체 데모를 확인할 수 있습니다:

**Related sample** [Container autoresize and sticky header](https://snippet.dhtmlx.com/syo8wm9s)

## Scheduler 반응형 처리 {#makingschedulerresponsive}

Scheduler를 [header configuration property](#initializingschedulerviaheaderconfig)를 통해 초기화하면, 클라이언트의 화면 크기에 맞는 헤더 레이아웃을 선택할 수 있습니다. 또한, 작은 화면에서도 요소와 폰트가 잘 적응하도록 특정 스타일이 적용됩니다.

자세한 내용은 별도의 문서인 ["Mobile Responsive Scheduler"](guides/touch-support.md)에서 확인하실 수 있습니다.

## ES6/7 및 TypeScript 앱에 파일 가져오기 {#import-files-into-es67-and-typescript-apps}

다음 명령어로 파일을 가져올 수 있습니다:

~~~js
import { scheduler } from 'dhtmlx-scheduler';
~~~

Commercial, Enterprise 또는 Ultimate 버전에서는 다음과 같이 가져옵니다:

~~~js
import { scheduler, Scheduler } from 'dhtmlx-scheduler';
~~~

## Vite에서 Scheduler 사용하기 {#usingschedulerwithvite}

프로젝트에서 Vite를 사용하는 경우, 앱에 Scheduler가 제대로 포함되도록 **vite.config.js** 파일에 다음 설정을 추가하세요:

~~~js title="vite.config.js"
optimizeDeps: {
    include: [
        'dhtmlx-scheduler',
    ]
}
~~~

## RequireJS 기반 앱에 파일 포함하기 {#includefilesintoarequirejsbasedapp}
------------------------------------------- 

RequireJS 기반 앱에 dhtmlxScheduler 파일을 추가하려면, 아래 예시를 참고하세요:

~~~js
requirejs(["codebase/dhtmlxscheduler"], function(dhx){
    var scheduler = dhx.scheduler;
    var Scheduler = dhx.Scheduler;// for Enterprise builds
 
    scheduler.init('scheduler_here',new Date(),"week");
    scheduler.parse([
        {
            id: 1, text: "Event 1", start_date: "2022-07-15 09:00", 
            end_date: "2022-07-15 10:00"
        },
        {
            id: 2, text: "Event 2", start_date: "2022-07-15 10:00", 
            end_date: "2022-07-15 11:00"
        }
    ]);
});
~~~

dhtmlxScheduler 라이브러리는 `scheduler`와 `Scheduler`(Commercial, Enterprise, Ultimate 버전에서 제공)를 포함하는 객체를 반환합니다. 이는 [여기](guides/multiple-per-page.md)에서 설명된 *scheduler* 및 *Scheduler* 객체와 동일합니다.

:::note
Scheduler를 RequireJS에서 커스텀 확장과 함께 사용할 때, RequireJS의 `shim` 구성을 반드시 지정하고 확장 파일의 의존성을 Scheduler로 선언해야 합니다.
:::

아래 예시는 커스텀 확장 파일 *custom_tooltip_plugin.js*를 올바르게 설정하는 방법입니다:

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
    var scheduler = dhx.scheduler;
 
    scheduler.init('scheduler_here',new Date(),"week");
    scheduler.parse([
        {
            id: 1, text: "Event 1", start_date: "2022-07-15 09:00", 
            end_date: "2022-07-15 10:00"
        },
        {
            id: 2, text: "Event 2", start_date: "2022-07-15 10:00", 
            end_date: "2022-07-15 11:00"
        }
    ]);
});
~~~

패키지 내의 파일에 대한 모듈 이름은 반드시 *패키지의 'codebase' 폴더 내 상대 경로*와 *파일명*을 조합하여 지정해야 합니다. 예를 들어:

**코어 라이브러리:**

- "dhtmlxscheduler": "./vendor/dhtmlxscheduler/dhtmlxscheduler"
