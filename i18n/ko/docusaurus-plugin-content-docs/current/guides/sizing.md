---
title: "스케일 및 이벤트 박스 크기 조정"
sidebar_label: "스케일 및 이벤트 박스 크기 조정"
---

# 스케일 및 이벤트 박스 크기 조정 

*만약 dhtmlxScheduler 6.0 이하 버전을 사용 중이라면, 자세한 내용은 [여기](guides/sizing-legacy.md)에서 확인할 수 있습니다.*

이 문서에서는 이벤트 박스와 시간 스케일의 크기를 조정하는 방법을 설명합니다.

## 짧은 이벤트 표시

먼저, 기본적으로 이벤트 박스가 어떻게 동작하는지 살펴보겠습니다:

+ 스케일 단위의 기본 높이는 44px입니다(1시간에 해당), 자세한 내용은 [hour_size_px](api/config/hour_size_px.md)에서 확인할 수 있습니다.
+ 이벤트 박스의 최소 높이는 **scheduler.xy.min_event_height** 설정에 의해 20px로 지정되어 있습니다.
+ 이벤트는 20px보다 작을 수 없으므로, 15분 및 5분 이벤트 모두 같은 높이로 표시됩니다.
+ 높이가 42px 미만인 이벤트는 특별한 표시 모드를 사용하며, 짧은 이벤트 처리를 위해 추가 CSS 클래스가 적용됩니다:
    + 42px 미만 이벤트: `.dhx_cal_event--small`
    + 30px 미만 이벤트: `.dhx_cal_event--xsmall`

![30_minute_short_event](/img/30_minute_short_event.png)

이러한 짧은 이벤트를 더 잘 보이도록 하려면 시간 스케일의 높이를 늘릴 수 있습니다:

~~~js
scheduler.config.hour_size_px = 90;
scheduler.render();// 또는 scheduler.init(...)
~~~

![30_minute_long_event](/img/30_minute_long_event.png)

### 이벤트 박스 커스터마이징

이벤트 박스의 렌더링 방식을 완전히 커스터마이즈할 수 있습니다. [renderEvent](api/method/renderevent.md) 메서드를 사용하여 render 함수를 오버라이드하면, 직접 이벤트 템플릿을 정의할 수 있습니다:

~~~js
scheduler.renderEvent = function(container, ev) {
    //여기에 커스터마이징 코드를 작성하세요
}
~~~

자세한 내용은 관련 챕터 ["커스텀 이벤트 박스"](guides/custom-events-display.md)를 참고하세요.


[Custom event box](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)


## 짧은 이벤트가 겹치지 않도록 하기

짧은 이벤트가 서로 겹치지 않도록 하려면, [separate_short_events](api/config/separate_short_events.md) 옵션을 *true*로 설정하세요:

~~~js
scheduler.config.separate_short_events = true;
~~~

:::note
버전 7.0부터는 이 설정이 기본적으로 활성화되어 있습니다. 이전 버전의 Scheduler를 사용하는 경우에만 수동으로 설정해주시면 됩니다.
:::

## 스케일 간격 변경 방법

스케일의 기본 간격을 조정하려면 [hour_scale](api/template/hour_scale.md) 템플릿을 오버라이드할 수 있습니다. 예를 들어, 스케일 간격을 30분으로 설정하려면 다음과 같이 템플릿을 수정하세요:

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
