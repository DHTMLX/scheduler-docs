---
title: "스케일 및 이벤트 박스 크기 조정하기 (v6.0)"
sidebar_label: "스케일 및 이벤트 박스 크기 조정하기 (v6.0)"
---

# 스케일 및 이벤트 박스 크기 조정하기 (v6.0)

*이 문서는 dhtmlxScheduler 6.0 버전 및 그 이전 버전에 해당합니다. 7.0 이상 버전의 경우 [여기](guides/sizing.md)에서 자세한 내용을 확인하세요.*

여기서는 스케일 단위와 이벤트 박스의 크기를 조정하는 네 가지 일반적인 시나리오에 대해 설명합니다:

**문제 1:** [1시간보다 짧은 이벤트가 스케줄러에서 1시간 이벤트와 동일한 크기로 표시됩니다. 짧은 이벤트가 스케일에 맞게 표시되도록 하는 것이 목표입니다.](guides/sizing-legacy.md#howtomakeshorteventsfitthescale)
  
**문제 2:** [동일한 시간대 내에 발생하는 짧은 이벤트들이 서로 겹쳐서 표시됩니다. 이러한 겹침을 방지하는 것이 목적입니다.](guides/sizing-legacy.md#preventingshorteventsfromoverlapping)
  
**문제 3:** [스케일 단위의 높이를 변경한 후, 스트라이프 배경도 이에 맞게 조정해야 합니다.](guides/sizing-legacy.md#howtochangethebackgroundaccordingtothesetscale)
  
**문제 4:** [기본 스케일 간격이 1시간으로 설정되어 있지만, 이를 30분 등으로 변경해야 할 필요가 있습니다.](guides/sizing-legacy.md#howtochangethescalespacing)

## 짧은 이벤트가 스케일에 맞게 표시되도록 하기 {#howtomakeshorteventsfitthescale}

먼저, 이벤트 박스의 기본 동작을 살펴보면 다음과 같습니다:

+ 각 스케일 단위(1시간)의 기본 높이는 44px입니다.
+ 이벤트 박스의 최소 높이도 44px입니다.
+ 1시간보다 짧은 이벤트는 44px 높이로 표시되어, 15분 이벤트도 1시간 이벤트와 동일하게 보입니다.
+ 1시간보다 긴 이벤트는 스케일에 비례하여 높이가 결정됩니다(예: 90분 이벤트는 1시간이 44px일 때 63px로 표시됨).

30분 이벤트가 스케일에 맞게 표시되도록 하려면 두 가지 방법이 있습니다:

- 스케일 단위의 높이를 늘립니다.
- 이벤트 박스의 표시 방식을 커스터마이즈합니다.

![30-minute_custom_event.png](/img/30-minute_custom_event.png)

### 솔루션 1. 스케일 단위의 높이 변경

스케일 단위의 높이는 `scheduler.config.hour_size_px` 설정 옵션을 사용하여 조정할 수 있습니다.
  
예를 들어, 단위 높이를 두 배로 늘리려면 다음과 같이 설정합니다:

~~~js
scheduler.config.hour_size_px = 88;

scheduler.init(...);
~~~

이렇게 하면 스케일 단위 높이가 88px이 되어, 30분 이벤트는 44px 높이로 표시되어 스케일에 맞게 됩니다.


[Changing the Y-Axis step](https://docs.dhtmlx.com/scheduler/samples/02_customization/09_timestep.html)


### 솔루션 2. 이벤트 박스 커스터마이징

이벤트 박스의 표시 방식을 변경하려면 `scheduler.renderEvent` 메서드를 사용하여 이벤트에 대한 커스텀 템플릿을 지정할 수 있습니다.

~~~js
scheduler.renderEvent = function(container, ev) {
    // 여기에 커스터마이즈 코드를 작성하세요
}
~~~

자세한 내용은 ["커스텀 이벤트 박스"](guides/custom-events-display.md) 챕터에서 확인할 수 있습니다.


[Custom event box](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)


## 짧은 이벤트가 겹치지 않도록 하기 {#preventingshorteventsfromoverlapping}

짧은 이벤트가 서로 겹치지 않고 개별적으로 표시되도록 하려면, `scheduler.config.separate_short_events` 옵션을 활성화하세요:

~~~js
scheduler.config.separate_short_events = true;
~~~

![overlapping.png](/img/overlapping.png)

## 설정한 스케일에 따라 배경 변경하기 {#howtochangethebackgroundaccordingtothesetscale}

스케줄러의 배경은 이미지로 제어됩니다. 이를 변경하려면 CSS 클래스 **.dhx_scale_holder**를 다음과 같이 오버라이드 하세요:

~~~html
<style>
.dhx_scale_holder {
     background-image: url("imgs/myNewImage.png");
}
</style>
~~~

그런 다음 스케줄러를 초기화합니다:

~~~js
scheduler.init(...);
~~~

![changing_background.png](/img/changing_background.png)

## 스케일 간격 변경하기 {#howtochangethescalespacing}

기본 스케일 간격을 변경하려면 `scheduler.templates.hour_scale` 템플릿을 재정의해야 합니다. 30분 간격으로 설정하려면 다음과 같이 템플릿을 수정할 수 있습니다:

~~~js
var format = scheduler.date.date_to_str("%H:%i");
var step = 30;
        
scheduler.templates.hour_scale = function(date){
    var html="";
    for (var i="0;" i<60/step; i++){
        html+="<div>"+format(date)+"</div>";
        date = scheduler.date.add(date,step,"minute");
    }
    return html;
}

~~~

![scale_spacing.png](/img/scale_spacing.png)

**관련 샘플:**


[Custom Y-Axis](https://docs.dhtmlx.com/scheduler/samples/02_customization/21_custom_hour_scale.html)
