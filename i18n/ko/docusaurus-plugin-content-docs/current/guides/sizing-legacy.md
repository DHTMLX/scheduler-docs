---
title: "스케일 및 이벤트 박스 크기 조정 (v6.0)"
sidebar_label: "스케일 및 이벤트 박스 크기 조정 (v6.0)"
---

# 스케일 및 이벤트 박스 크기 조정 (v6.0)

*이 문서는 dhtmlxScheduler 6.0 또는 이전 버전을 대상으로 합니다. dhtmlxScheduler 7.0+를 사용하는 경우 자세한 내용은 [여기](guides/sizing.md)를 참조하십시오.*

이 문서에서는 4가지 문제를 해결하는 예제를 통해 스케일의 크기와 이벤트 박스의 크기를 살펴보려 합니다:

**Problem 1:** [1시간 미만으로 지속되는 이벤트가 스케줄러에서 1시간 이벤트와 동일하게 보입니다. 짧은 이벤트가 스케일에 맞게 보이길 원합니다.](guides/sizing-legacy.md#how-to-make-short-events-fit-the-scale)

**Problem 2:** [1시간 미만이며 서로 다른 시간에 발생하지만 한 시간 이내에 겹치는 이벤트가 있습니다. 이러한 짧은 이벤트가 겹치지 않길 원합니다.](guides/sizing-legacy.md#preventing-short-events-from-overlapping)

**Problem 3:** [스케일 단위 높이를 변경하고 그에 따라 줄무늬 배경도 바뀌길 원합니다.](guides/sizing-legacy.md#how-to-change-the-background-according-to-the-set-scale)

**Problem 4:** [기본 스케일 간격은 1시간입니다. 이를 변경해 예를 들어 30분으로 만들고 싶습니다.](guides/sizing-legacy.md#how-to-change-the-scale-spacing)

## 짧은 이벤트를 스케일에 맞추는 방법

먼저 이벤트 박스의 기본 동작을 살펴보겠습니다:

+ 기본 스케일 단위 높이는 44px(또는 시 높이)입니다.
+ 이벤트 박스의 최소 높이는 44px입니다.
+ 1시간 미만으로 지속되는 이벤트는 44px의 크기를 차지합니다. 따라서 15분과 1시간 이벤트는 스케줄러에서 같은 모양으로 보일 것입니다.
+ 1시간 이상 지속되는 이벤트는 측면 스케일에 따라 높이가 결정됩니다(가정: 1시간은 44px에 해당합니다 — 예: 90분 이벤트의 높이는 63px가 됩니다).

예를 들어 30분 이벤트를 스케일에 맞추려면 두 가지 해결책이 있습니다:

- 스케일 단위의 높이를 늘리는 방법
- 이벤트 박스를 사용자 정의하는 방법

![30-minute_custom_event.png](/img/30-minute_custom_event.png)

### 해결책 1. 스케일 단위의 높이 변경

스케일 단위의 높이를 변경하려면 [hour_size_px](api/config/hour_size_px.md) 설정 옵션을 사용해야 합니다.
  
예를 들어 단위를 두 배로 늘리려면 다음과 같이 설정합니다:

~~~js
scheduler.config.hour_size_px = 88;

scheduler.init(...);
~~~

이제 스케일 단위의 높이가 88 px이므로 30분 이벤트가 44px를 차지하더라도 30분 높이에 맞춰 표시됩니다.

[Y축 간격 변경](https://docs.dhtmlx.com/scheduler/samples/02_customization/09_timestep.html)

### 해결책 2. 이벤트 박스를 커스터마이즈하기

이벤트 박스의 표시를 커스터마이즈하려면 [renderEvent](api/method/renderevent.md) 메서드를 사용해 사용자 정의 템플릿을 설정할 수 있습니다.

~~~js
scheduler.renderEvent = function(container, ev) {
    //your customizing code
}
~~~

관련 챕터의 자세한 내용은 - [Custom Event's Box](guides/custom-events-display.md)에서 확인하십시오.

[Custom event box](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)

## 짧은 이벤트가 겹치지 않게 하기

짧은 이벤트를 서로 구분되게 표시하고 겹칠 가능성을 없애려면 [separate_short_events](api/config/separate_short_events.md) 옵션을 *true*로 설정해야 합니다:

~~~js
scheduler.config.separate_short_events = true;
~~~

![overlapping.png](/img/overlapping.png)

## 설정된 스케일에 따라 배경을 변경하는 방법

스케줄러의 배경은 단순 이미지로 설정됩니다. 배경 이미지를 변경하려면 관련 CSS 클래스를 재정의해야 하는데, 이 클래스는 **.dhx_scale_holder** 입니다:

~~~html
<style>
.dhx_scale_holder {
     background-image: url("imgs/myNewImage.png");
}
</style>
~~~

~~~js
scheduler.init(...);
~~~

![changing_background.png](/img/changing_background.png)

## 스케일 간격 변경 방법

기본 스케일 간격을 변경하려면 [hour_scale](api/template/hour_scale.md) 템플릿을 재작성해야 합니다. 간격을 30분으로 맞추려면 아래와 같이 템플릿을 재작성할 수 있습니다:

~~~js
const format = scheduler.date.date_to_str("%H:%i");
const step = 30;
        
scheduler.templates.hour_scale = function(date){
    let html="";
    for (let i = 0; i < 60/step; i++){
        html += "<div style='height:22px;line-height:22px;'>" + format(date) + "</div>";
        date = scheduler.date.add(date,step,"minute");
    }
    return html;
}
~~~

![scale_spacing.png](/img/scale_spacing.png)

**관련 샘플:** [맞춤 Y축](https://docs.dhtmlx.com/scheduler/samples/02_customization/21_custom_hour_scale.html)