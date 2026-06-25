---
title: "툴팁"
sidebar_label: "툴팁"
---

# 툴팁

*dhtmlxScheduler 6.0 이하를 사용 중이시면, 자세한 내용은 [여기](guides/tooltips-legacy.md)를 참조하십시오.*

이벤트에 대한 툴팁을 표시하려면 페이지에서 한 번만 **Tooltip** 확장을 활성화해야 합니다.

~~~js
scheduler.plugins({
    tooltip: true
});
~~~

그 후에는 툴팁이 기본 설정으로 표시됩니다.

![툴팁](/img/tooltip.png)

[툴팁](https://docs.dhtmlx.com/scheduler/samples/03_extensions/20_tooltip.html)

확장이 활성화되면 툴팁이 기본 설정으로 자동으로 표시됩니다.

## 커스텀 텍스트

기본적으로 툴팁은 이벤트의 3가지 속성을 표시합니다:

1. 이벤트의 시작 날짜.
2. 이벤트의 종료 날짜.
3. 이벤트 텍스트.

툴팁에 대한 커스텀 텍스트를 설정하려면 [tooltip_text](api/template/tooltip_text.md) 템플릿을 사용하세요:

~~~js
scheduler.templates.tooltip_text = function(start,end,event) {
    return "<b>Event:</b> "+event.text+"

<b>Start date:</b> "+
    scheduler.templates.tooltip_date_format(start)+

"+ 
    "<b>End date:</b> "+scheduler.templates.tooltip_date_format(end);
};
~~~

## Tooltip API

### Tooltip 객체

툴팁 객체에 접근하려면 **scheduler.ext.tooltips.tooltip**를 사용합니다. 이 객체를 통해 위치, 내용 및 가시성을 일련의 메서드를 통해 조작할 수 있습니다:

- **getNode()** - 툴팁의 HTML 요소를 반환합니다  
- **setViewport()** - 툴팁의 위치를 지정된 HTML 요소의 경계에 고정합니다
    - **node** - (*HTMLElement*) 해당 HTML 요소
- **show()** - 특정 좌표(document.body를 기준)에서 툴팁을 표시합니다. 표시 위치에 따라 다른 매개변수를 받을 수 있습니다:
    - 특정 좌표에 툴팁을 표시하려면, 다음을 전달합니다:
        - **left** - (*number*) X 좌표
        - **top** - (*number*) Y 좌표 
    - 마우스 이벤트 좌표에서 툴팁을 표시하려면 (*tooltip_offset_x/y*와 뷰포트가 고려됨), 다음을 전달합니다:
        - **event** - (*Event*) 마우스 이벤트 객체  
- **hide()** - 툴팁 요소를 숨깁니다
- **setContent()**- 툴팁에 HTML 콘텐츠를 넣습니다. 매개변수:
    - **html** - (*string*) 툴팁의 HTML 콘텐츠 문자열

### 메서드

DOM 요소 위에서 마우스를 hover 할 때 툴팁의 동작을 제어할 수 있는 여러 메서드가 있습니다.

<h4 id="attach">scheduler.ext.tooltips.attach()</h4>

확장 구성으로 툴팁을 추가합니다. 메서드는 툴팁 설정이 담긴 객체를 매개변수로 받습니다. 메서드를 통해 조정할 수 있는 설정은 다음과 같습니다:

- **selector** - (*string*) 마우스 이벤트를 수신할 요소의 CSS 셀렉터를 정의합니다
- **onmouseenter** - (*function*) 마우스 포인터가 요소에 들어갈 때 호출되는 핸들러. 매개변수:
     - **event** - (*Event*) 네이티브 마우스 이벤트
    - **node** -  (*HTMLElement*) HTML 노드
- **onmousemove** - (*function*) 요소 내부에서 마우스 포인터가 움직일 때 호출되는 핸들러. 매개변수:
    - **event** - (*Event*) 네이티브 마우스 이벤트
    - **node** -  (*HTMLElement*) HTML 노드
- **onmouseleave** - (*function*) 마우스 포인터가 요소를 벗어날 때 호출되는 핸들러. 매개변수:
    - **event** - (*Event*) 네이티브 마우스 이벤트
    - **node** -  (*HTMLElement*) HTML 노드
- **global** - (*boolean*) 모듈이 페이지 전체의 마우스 이벤트를 수신할지(false: Scheduler 요소 안에서만, true: 페이지 전체) 여부를 정의합니다. 기본값은 *false*.

<h4 id="tooltipfor">scheduler.ext.tooltips.tooltipFor()</h4>

지정된 Scheduler 요소에 대해 툴팁을 추가합니다. 이는 **attach()** 메서드의 더 간단한 버전입니다. 매개변수로 *툴팁 세부 정보가 담긴 객체*를 받습니다. 이 객체는 다음 속성을 가집니다:

- **selector** - (*string*) 툴팁을 추가할 Scheduler 요소의 CSS 셀렉터
- **html** - (*function*) 툴팁의 템플릿. 템플릿 함수는 차례로 두 매개변수를 받습니다:
    - **event** - (*Event*) 네이티브 마우스 이벤트
    - **node** -  (*HTMLElement*) HTML 노드
  그리고 템플릿 문자열을 반환합니다.
- **global** - (*boolean*) 선택적으로, 모듈이 페이지 전체의 마우스 이벤트를 수신할지 여부를 정의합니다(false일 때는 Scheduler 요소 내부에서만 수신). 기본값은 *false*.

<h4 id="detach">scheduler.ext.tooltips.detach()</h4>

툴팁을 제거합니다. 매개변수로는 다음이 필요합니다:

- **selector** - (*string*) Scheduler 요소의 CSS 선택자

## 다양한 요소를 위한 툴팁

기본적으로 툴팁은 Scheduler 이벤트에만 추가되지만, 다른 Scheduler 요소에도 툴팁을 설정할 수 있습니다.

이를 위한 두 가지 해당 메서드는 [tooltip API](#tooltip-api) 에 있습니다:

- [**scheduler.ext.tooltips.tooltipFor()**](#methods) 메서드

참고: [scheduler.ext.tooltips.tooltipFor()](#methods) 메서드는 Scheduler 초기화가 완료된 후에 호출되어야 합니다. 예를 들어 [onSchedulerReady](api/event/onschedulerready.md) 이벤트 핸들러 안에 아래와 같이 메서드를 지정할 수 있습니다:

~~~js
scheduler.attachEvent("onSchedulerReady", function(){
    scheduler.ext.tooltips.tooltipFor({
        selector: ".dhx_matrix_scell",
        html: function (event, node) {
            const sectionId = scheduler.getActionData(event).section;
            const timeline = scheduler.getView("timeline");
            const section = timeline.y_unit[timeline.order[sectionId]]; 
            return `Tooltip for <b>${section.label}</b>`;
        }
    });
});
~~~

[툴팁](https://docs.dhtmlx.com/scheduler/samples/06_timeline/12_section_tooltip.html)

또는 다음과 같은 방식으로도 가능합니다:

~~~js
scheduler.init("scheduler_here");

scheduler.ext.tooltips.tooltipFor({
    selector: ".dhx_matrix_scell",
    html: function (event, node) {
        const sectionId = scheduler.getActionData(event).section;
        const timeline = scheduler.getView("timeline");
        const section = timeline.y_unit[timeline.order[sectionId]];
        return `Tooltip for <b>${section.label}</b>`;
    }
});
~~~

이 방식으로 추가된 툴팁은 마우스 포인터를 따라다니고, [tooltip_offset_x](api/config/tooltip_offset_x.md), [tooltip_offset_y](api/config/tooltip_offset_y.md), [tooltip_timeout](api/config/tooltip_timeout.md) 및
[tooltip_hide_timeout](api/config/tooltip_hide_timeout.md) 설정을 사용합니다.

- [**scheduler.ext.tooltips.attach()**](#methods) 메서드

이 메서드는 마우스 포인터의 움직임에 맞춰 툴팁 동작을 조정하도록 확장 구성으로 툴팁을 추가할 수 있게 해줍니다.

## 툴팁 동작의 커스터마이징

툴팁의 기본 동작을 수정할 가능성이 있습니다. 기본 툴팁 핸들러를 제거하고 사용자 정의 핸들러를 추가하면 됩니다. 아래 단계를 따라 주세요:

- **scheduler.ext.tooltips.detach**로 내장 툴팁 핸들러를 작업에서 제거합니다:

~~~js
// 내장 툴팁 핸들러를 작업에서 제거
scheduler.ext.tooltips.detach(`[${scheduler.config.event_attribute}]`);
~~~

- 원하는 툴팁 동작을 [scheduler.ext.tooltips.attach()](#methods) 메서드를 통해 추가합니다. 아래 예에서는 툴팁이 테이블 위에만 표시되도록 설정합니다:

~~~js
scheduler.ext.tooltips.tooltipFor({
  selector: `[${scheduler.config.event_attribute}]`,
  html: (event: MouseEvent) => {
     if (scheduler.config.touch && !scheduler.config.touch_tooltip) {
     return;
   }
 
   const evNode = event.target.closest(`[${scheduler.config.event_attribute}]`);
   const evId = evNode.getAttribute(scheduler.config.event_attribute);
   if(scheduler.getEvent(evId)){
     const ev = scheduler.getEvent(evId);
     return scheduler.templates.tooltip_text(ev.start_date, ev.end_date, ev);
   }
   return null;
  },
  global: false
});
~~~

## 타임아웃

툴팁 표시 및 숨김 시간을 관련 설정으로 구성할 수 있습니다.

작업에 대한 툴팁이 나타나기 전의 시간 간격(밀리초 단위)을 지정하려면 [tooltip_timeout](api/config/tooltip_timeout.md) 속성을 사용합니다:

~~~js
scheduler.config.tooltip_timeout = 50;
scheduler.init("scheduler_here");
~~~

사용자가 커서를 다른 위치로 옮긴 후 툴팁이 표시되는 시간의 길이(밀리초 단위)를 정의하려면 [tooltip_hide_timeout](api/config/tooltip_hide_timeout.md) 속성을 사용합니다:

~~~js
scheduler.config.tooltip_hide_timeout = 5000;
scheduler.init("scheduler_here");
~~~

## 위치

툴팁의 위치는 기본 위치의 오프셋을 두 구성 속성을 바꿔 설정할 수 있습니다:

- [tooltip_offset_x](api/config/tooltip_offset_x.md) - 툴팁 위치의 수평 오프셋 설정
- [tooltip_offset_y](api/config/tooltip_offset_y.md) - 툴팁 위치의 수직 오프셋 설정

~~~js
scheduler.config.tooltip_offset_x = 30;
scheduler.config.tooltip_offset_y = 40;
 
scheduler.init("scheduler_here");
~~~

## 표시 영역

기본적으로 툴팁은 **document.body**에 부착됩니다. 필요하다면 Scheduler가 초기화되기 전에 컨테이너에 표시를 제한할 수 있습니다. 아래 코드를 사용하세요:

~~~js
scheduler.attachEvent("onSchedulerReady", function(){
    const tooltips = scheduler.ext.tooltips;
    tooltips.tooltip.setViewport(container);
});

scheduler.init("scheduler_here");
~~~