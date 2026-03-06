---
title: "툴팁 (Tooltips)"
sidebar_label: "툴팁 (Tooltips)"
---

# 툴팁 (Tooltips)

*만약 dhtmlxScheduler 6.0 이하 버전을 사용 중이라면, 자세한 내용은 [여기](guides/tooltips-legacy.md)를 참고하세요.*

이벤트에 툴팁을 표시하려면, **Tooltip** 확장 기능을 페이지에서 한 번 활성화해야 합니다.

~~~js
scheduler.plugins({
    tooltip: true
});
~~~

활성화하면, 툴팁이 기본 설정으로 표시됩니다.

![tooltip](/img/tooltip.png)


[Tooltips](https://docs.dhtmlx.com/scheduler/samples/03_extensions/20_tooltip.html)


확장 기능을 활성화한 후에는 툴팁이 기본 구성으로 자동 표시됩니다.


## 커스텀 텍스트

기본적으로 툴팁에는 이벤트의 세 가지 속성이 표시됩니다:

1. 이벤트 시작 날짜
2. 이벤트 종료 날짜
3. 이벤트 텍스트

툴팁 텍스트를 커스터마이즈하려면 [tooltip_text](api/template/tooltip_text.md) 템플릿을 사용하세요:

~~~js
scheduler.templates.tooltip_text = function(start,end,event) {
    return "<b>Event:</b> "+event.text+"

<b>Start date:</b> "+
    scheduler.templates.tooltip_date_format(start)+"

"+
    "<b>End date:</b> "+scheduler.templates.tooltip_date_format(end);
};
~~~


## 툴팁 API {#tooltipapi}

### Tooltip 객체

툴팁 객체는 **scheduler.ext.tooltips.tooltip**으로 접근할 수 있습니다. 이 객체는 툴팁의 위치, 내용, 표시 여부를 제어하는 메서드를 제공합니다:

- **getNode()** - 툴팁의 HTML 요소를 반환합니다  
- **setViewport()** - 지정한 HTML 요소의 경계 내에서만 툴팁 위치를 제한합니다
    - **node** - (*HTMLElement*) 컨테이너 요소
- **show()** - document.body 기준 주어진 좌표에 툴팁을 표시합니다. 원하는 위치에 따라 다양한 파라미터를 받을 수 있습니다:
    - 특정 좌표에 표시하려면:
        - **left** - (*number*) X 좌표
        - **top** - (*number*) Y 좌표 
    - 마우스 이벤트 좌표에 표시하려면(*tooltip_offset_x/y* 및 viewport 적용):
        - **event** - (*Event*) 마우스 이벤트 객체  
- **hide()** - 툴팁 요소를 숨깁니다
- **setContent()**- 툴팁 내부의 HTML 내용을 설정합니다. 파라미터:
    - **html** - (*string*) 툴팁에 표시할 HTML 문자열

### 메서드

여러 메서드를 통해 DOM 요소 위에서 툴팁 동작을 제어할 수 있습니다.

#### scheduler.ext.tooltips.attach() {#attach}

세부 설정이 가능한 툴팁을 추가합니다. 툴팁 설정이 담긴 객체를 인자로 받습니다:

- **selector** - (*string*) 마우스 이벤트를 감지할 요소의 CSS 선택자
- **onmouseenter** - (*function*) 마우스가 요소에 진입할 때 호출, 파라미터:
     - **event** - (*Event*) 네이티브 마우스 이벤트
    - **node** -  (*HTMLElement*) 타겟 HTML 노드
- **onmousemove** - (*function*) 요소 내부에서 마우스가 움직일 때 호출, 파라미터:
    - **event** - (*Event*) 네이티브 마우스 이벤트
    - **node** -  (*HTMLElement*) 타겟 HTML 노드
- **onmouseleave** - (*function*) 마우스가 요소에서 벗어날 때 호출, 파라미터:    
    - **event** - (*Event*) 네이티브 마우스 이벤트
    - **node** -  (*HTMLElement*) 타겟 HTML 노드
- **global** - (*boolean*) 페이지 전체에서 마우스 이벤트를 감지할지(*true*) 또는 scheduler 요소 내부에서만 감지할지(*false*) 여부. 기본값은 *false*.

#### scheduler.ext.tooltips.tooltipFor() {#tooltipfor}

특정 Scheduler 요소에 툴팁을 추가합니다. **attach()**보다 간단한 방식입니다. 다음과 같은 객체를 받습니다:

- **selector** - (*string*) 툴팁을 추가할 Scheduler 요소의 CSS 선택자
- **html** - (*function*) 툴팁 템플릿 함수, 파라미터:
    - **event** - (*Event*) 네이티브 마우스 이벤트
    - **node** -  (*HTMLElement*) 타겟 HTML 노드
  함수는 툴팁 내용의 문자열을 반환해야 합니다.
- **global** - (*boolean*) 옵션, 페이지 전체에서 마우스 이벤트를 감지할지(*true*) 또는 scheduler 요소 내부에서만 감지할지(*false*) 여부. 기본값은 *false*.

#### scheduler.ext.tooltips.detach() {#detach}

툴팁을 제거합니다. 파라미터:

- **selector** - (*string*) Scheduler 요소의 CSS 선택자


## 다양한 요소에 툴팁 적용

기본적으로 툴팁은 Scheduler 이벤트에만 추가되지만, 다른 Scheduler 요소에도 툴팁을 설정할 수 있습니다.

관련 메서드는 [툴팁 API](#tooltipapi)에서 확인할 수 있습니다:

- [**scheduler.ext.tooltips.tooltipFor()**](#tooltipfor) 메서드 

[scheduler.ext.tooltips.tooltipFor()](#tooltipfor)는 Scheduler가 초기화된 이후에 호출해야 합니다. 예를 들어, [onSchedulerReady](api/event/onschedulerready.md) 이벤트 핸들러 내부에 둘 수 있습니다:

~~~js
scheduler.attachEvent("onSchedulerReady", function(){
    scheduler.ext.tooltips.tooltipFor({
        selector: ".dhx_matrix_scell",
        html: function (event, node) {
            const sectionId = scheduler.getActionData(event).section;
            const timeline = scheduler.getView("timeline");
            var section = timeline.y_unit[timeline.order[sectionId]];
            return `Tooltip for <b>${section.label}</b>`;
        }
    });
});

~~~


[Tooltips](https://docs.dhtmlx.com/scheduler/samples/06_timeline/12_section_tooltip.html)


또는 다음과 같이 사용할 수도 있습니다:

~~~js
scheduler.init("scheduler_here");

scheduler.ext.tooltips.tooltipFor({
    selector: ".dhx_matrix_scell",
    html: function (event, node) {
        const sectionId = scheduler.getActionData(event).section;
        const timeline = scheduler.getView("timeline");
        var section = timeline.y_unit[timeline.order[sectionId]];
        return `Tooltip for <b>${section.label}</b>`;
    }
});
~~~

이렇게 추가된 툴팁은 마우스 포인터를 따라가며 *[tooltip_offset_x](api/config/tooltip_offset_x.md)*, *[tooltip_offset_y](api/config/tooltip_offset_y.md)*, *[tooltip_timeout](api/config/tooltip_timeout.md)*, 그리고 [tooltip_hide_timeout](api/config/tooltip_hide_timeout.md) 설정을 따릅니다.

- [**scheduler.ext.tooltips.attach()**](#attach) 메서드 

이 메서드는 마우스 움직임에 따라 툴팁 동작을 더 세밀하게 설정할 수 있습니다.

## 툴팁 동작 커스터마이즈

기본 툴팁 동작을 제거하고, 커스텀 핸들러를 추가하여 원하는 대로 변경할 수 있습니다. 방법은 다음과 같습니다:

- [**scheduler.ext.tooltips.detach**](#detach)를 사용해 기본 툴팁 핸들러를 제거하세요:

~~~js
// tasks에서 기본 툴팁 핸들러 제거
scheduler.ext.tooltips.detach(`[${scheduler.config.event_attribute}]`);
~~~

- [**scheduler.ext.tooltips.attach()**](#attach)를 통해 커스텀 툴팁 동작을 추가하세요. 아래 예시는 테이블 위에서만 툴팁이 표시됩니다:

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

## 타임아웃 설정

툴팁의 표시 및 숨김 시간은 설정을 통해 조정할 수 있습니다.

작업(Task) 툴팁이 나타나기 전 지연 시간(밀리초 단위)은 [tooltip_timeout](api/config/tooltip_timeout.md) 속성으로 지정합니다:

~~~js
scheduler.config.tooltip_timeout = 50;
scheduler.init("scheduler_here");
~~~

마우스 커서가 영역에서 벗어난 후 툴팁이 유지되는 시간(밀리초 단위)은 [tooltip_hide_timeout](api/config/tooltip_hide_timeout.md) 속성으로 지정합니다:

~~~js
scheduler.config.tooltip_hide_timeout = 5000;
scheduler.init("scheduler_here");
~~~

## 위치 조정

툴팁의 위치는 다음 속성으로 기본 오프셋을 변경하여 조정할 수 있습니다:

- [tooltip_offset_x](api/config/tooltip_offset_x.md) - 툴팁의 수평 오프셋
- [tooltip_offset_y](api/config/tooltip_offset_y.md) - 툴팁의 수직 오프셋

~~~js
scheduler.config.tooltip_offset_x = 30;
scheduler.config.tooltip_offset_y = 40;
 
scheduler.init("scheduler_here");
~~~

## 표시 영역 제한

기본적으로 툴팁은 **document.body**에 부착됩니다. 필요하다면, Scheduler를 초기화하기 전에 툴팁 표시를 특정 컨테이너로 제한할 수 있습니다:

~~~js
scheduler.attachEvent("onSchedulerReady", function(){
    var tooltips = scheduler.ext.tooltips;
     tooltips.tooltip.setViewport(container);
});

scheduler.init("scheduler_here");
~~~
