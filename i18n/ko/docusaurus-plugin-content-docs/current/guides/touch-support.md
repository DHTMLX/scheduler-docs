---
title: "Mobile Responsive Scheduler"
sidebar_label: "Mobile Responsive Scheduler"
---

# Mobile Responsive Scheduler 

dhtmlxScheduler는 다음과 같은 터치 디바이스를 지원합니다:

- iOS 기기(iPad, iPhone, iPod)
- Windows 10 태블릿 및 터치 스크린 모니터
- Android 기기

_스케줄러는 스마트폰에서도 동작하지만, 화면 공간이 제한적이므로 일부 수동 설정이 필요할 수 있습니다._

**도움이 되는 팁!**

+ 터치 지원은 기본적으로 활성화되어 있으며, 모든 스케줄러 모드에서 동작합니다.
+ 터치 디바이스를 대상으로 하는 앱의 경우, ['material' skin](guides/skins.md#material-skin) 사용을 권장합니다. 이 스킨은 버튼이 크고 터치하기 쉽습니다.
+ 모바일 사용자가 예상된다면 [Quick Info](guides/extensions-list.md#quick-info) 추가를 추천합니다.
+ 아래 meta 태그를 페이지에 추가하면 스케줄러의 모든 요소가 더 커지고 터치하기 쉬워집니다:
  
~~~js
<meta name="viewport" content="width="device-width," initial-scale="1"">
~~~

## 반응형 레이아웃 {#responsive-layout}

[header 구성 프로퍼티를 사용해 Scheduler를 초기화](guides/initialization.md)할 때, 클라이언트의 화면 크기에 맞는 헤더 레이아웃을 선택할 수 있습니다. 
이 설정은 작은 화면에 맞춰 요소와 폰트 크기를 조정하는 스타일도 적용합니다.

### 헤더

예를 들어, 헤더를 여러 행으로 분할할 수 있습니다:

![header_responsive](/img/header_responsive.png)

위 스크린샷은 작은 화면에서의 Scheduler를 보여줍니다.

이 설정은 동적으로 전환할 수 있으므로, 큰 화면과 작은 화면에 각각 다른 헤더 구성을 정의할 수 있습니다:

~~~js
// define configs
const compactHeader = {
    rows: [
        { 
            cols: [
                "prev",
                "date",
                "next",
            ]
        },
        { 
            cols: [
                "day",
                "week",
                "month",
                "spacer",
                "today"
            ]
        }
    ]
};
            
const fullHeader = [
    "day",
    "week",
    "month",
    "date",
    "prev",
    "today",
    "next"
];

// add a switch to select an appropriate config for a current screen size

function resetConfig(){
    let header;
    if (window.innerWidth < 1000) {
        header = compactHeader;
    } else {
        header = fullHeader;
    
    }
    scheduler.config.header = header;
    return true;
}

// apply the config initially and each time scheduler repaints or resizes:

resetConfig();
scheduler.attachEvent("onBeforeViewChange", resetConfig);
scheduler.attachEvent("onSchedulerResize", resetConfig);

scheduler.config.responsive_lightbox = true; // responsive lightbox

scheduler.init("scheduler_here");
~~~


[Responsive scheduler](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/13_touch_ui.html)


### 라이트박스

Scheduler API에는 라이트박스가 다양한 화면 크기에 맞게 조정되도록 하는 [responsive_lightbox](api/config/responsive_lightbox.md) 옵션이 포함되어 있습니다.

~~~~js
scheduler.config.responsive_lightbox = true; //disabled by default
//set this to true to enable lightbox responsiveness
~~~~

아래는 작은 화면에서 라이트박스가 조정되는 방식입니다:

![lightbox_responsive](/img/lightbox_responsive.png)


[Responsive scheduler](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/13_touch_ui.html)


라이트박스가 반응형일 때의 스타일을 직접 커스터마이즈할 수 있습니다. 
이때 라이트박스에는 <b>dhx_cal_light_responsive</b>라는 추가 CSS 클래스가 적용되며, 이를 스타일에서 타겟팅할 수 있습니다.

기본적으로 이 클래스에는 1024px 미만의 작은 화면에서만 적용되는 미디어 쿼리가 포함되어 있어, 해당 디바이스에서 라이트박스의 외형을 조정할 수 있습니다.

## 터치 관련 설정 옵션 {#touchconfigurationoptions}

모바일 및 반응형 지원과 관련된 설정 옵션은 아래와 같습니다:


- [header](api/config/header.md) - 헤더 레이아웃 제어
- [touch](api/config/touch.md) - 스케줄러의 터치 지원 토글
- [touch_drag](api/config/touch_drag.md) - 롱터치와 스크롤을 구분하는 시간(밀리초) 설정
- [touch_tip](api/config/touch_tip.md) - 우측 상단에 메시지 프롬프트 표시 토글
- [touch_swipe_dates](api/config/touch_swipe_dates.md) - 날짜 전환을 위한 스와이프 제스처 토글
- [responsive_lightbox](api/config/responsive_lightbox.md) - 라이트박스의 반응형 스타일 활성화(기본값: 비활성)


## 스케줄러의 터치 제스처 {#touch-gestures-in-the-scheduler}

- **더블 탭** - 더블 클릭과 동일하게 동작하며, 이벤트 편집 또는 생성 창을 엽니다.
- **롱탭 후 드래그** - 이벤트를 이동하거나 생성할 때 사용합니다.
- **스와이프** - 다음 또는 이전 시간대로 뷰를 전환합니다([기본값: 비활성](api/config/touch_swipe_dates.md)).

## 'Quick info' 확장 {#quick-info-extension}

터치 기능을 향상시키기 위해, 라이브러리에는 ["Quick Info" 확장](guides/extensions-list.md#quick-info)이 포함되어 있습니다.

이 확장은 표준 사이드바 버튼과 작은 편집 폼(터치 디바이스에서 누르기 어려운)을 더 크고 사용하기 쉬운 컨트롤로 대체합니다.

큰 버튼의 스케줄러를 활성화하려면 ["Quick Info"](guides/extensions-list.md#quick-info) 확장을 페이지에 추가하세요:

~~~js
<script>
    scheduler.plugins({
        quick_info: true
    });
    scheduler.init('scheduler_here',new Date(2019,5,30),"day");
      ...
<script>
~~~


[Touch-oriented scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/29_quick_info.html)


활성화되면, 스케줄러는 표준 버튼을 더 큰 버튼으로 교체합니다:

![quick_info_extension.png](/img/quick_info_extension.png)

:::note
quick-info 선택 사이드 메뉴와 표준 스케줄러의 선택 메뉴는 모두 [icons_select](api/config/icons_select.md)에 정의된 동일한 구성을 사용합니다.
:::

확장에서 제공하는 기능은 다음과 같습니다:

- **3개의 템플릿**

- [quick_info_content](api/template/quick_info_content.md) - 팝업 편집 폼의 내용 정의
- [quick_info_date](api/template/quick_info_date.md) - 팝업 편집 폼에 표시되는 날짜 정의
- [quick_info_title](api/template/quick_info_title.md) - 팝업 편집 폼의 제목 정의


- **1개의 설정 옵션**

- [quick_info_detached](api/config/quick_info_detached.md) - 이벤트 폼이 화면 측면에서 나타날지, 선택된 이벤트 근처에서 나타날지 제어

- **2개의 메서드**

- [hideQuickInfo](api/method/hidequickinfo.md) - 팝업 이벤트 폼이 열려 있다면 숨김
- [showQuickInfo](api/method/showquickinfo.md) - 특정 이벤트의 팝업 이벤트 폼 표시

- **2개의 이벤트**

- [onQuickInfo](api/event/onquickinfo.md) - 팝업 편집 폼이 나타날 때 발생
- [onAfterQuickInfo](api/event/onafterquickinfo.md) - 팝업 이벤트 폼이 닫힌 후 발생
