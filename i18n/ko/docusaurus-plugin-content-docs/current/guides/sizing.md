---
title: "스케일 및 이벤트 박스의 크기 조정"
sidebar_label: "스케일 및 이벤트 박스의 크기 조정"
---

# 스케일 및 이벤트 박스의 크기 조정

*dhtmlxScheduler 6.0 이하 버전을 사용하는 경우 세부 정보는 [여기](guides/sizing-legacy.md)를 참고하십시오.*

이 문서에서는 이벤트의 크기와 시간 스케일의 크기를 관리하는 방법에 대해 다룹니다.

## 짧은 이벤트 표시

먼저 기본 이벤트 박스의 동작을 살펴보겠습니다:

+ 기본 스케일 단위 높이는 44px(또는 시간 높이)로, [hour_size_px](api/config/hour_size_px.md)에서 정의됩니다.
+ 이벤트 박스의 최소 높이는 20px이며, 이는 **scheduler.xy.min_event_height** 설정에 의해 정의됩니다.
+ 이벤트의 높이가 20px보다 작아질 수 없으므로 15분 및 5분 이벤트의 높이는 동일합니다.
+ 높이가 42px 미만인 이벤트는 특수 디스플레이 모드를 사용하고 더 짧은 이벤트를 표시하기 위해 추가 CSS 클래스를 받습니다:
    + `.dhx_cal_event--small` - 42px 미만인 이벤트
    + `.dhx_cal_event--xsmall` - 30px 미만인 이벤트

![30_minute_short_event](/img/30_minute_short_event.png)

다음과 같이 시간 스케일의 높이를 늘려 이러한 이벤트의 가시성을 향상시킬 수 있습니다:

~~~js
scheduler.config.hour_size_px = 90;
scheduler.render();// 또는 scheduler.init(...)
~~~

![30_minute_long_event](/img/30_minute_long_event.png)

### 이벤트 박스 사용자 정의

이벤트 박스의 렌더링 함수를 완전히 재정의하는 것이 가능합니다. 이를 위해서는 이벤트의 템플릿을 직접 설정할 수 있는 [renderEvent](api/method/renderevent.md) 메서드를 사용해야 합니다:

~~~js
scheduler.renderEvent = function(container, ev) {
    //키워드 커스터마이징 코드
}
~~~

자세한 내용은 관련 챕터 - [맞춤 이벤트 박스](guides/custom-events-display.md)에서 확인하십시오.

[맞춤 이벤트 박스](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)

## 짧은 이벤트의 중첩 방지

짧은 이벤트를 서로 분리하여 중첩 가능성을 없애려면 [separate_short_events](api/config/separate_short_events.md) 옵션을 *true*로 설정해야 합니다:

~~~js
scheduler.config.separate_short_events = true;
~~~

:::note
이 구성은 v7.0부터 기본적으로 활성화됩니다. Scheduler의 이전 버전을 사용하는 경우에만 수동으로 활성화하면 됩니다.
:::

## 스케일 간격 변경 방법

기본 스케일 간격을 변경하려면 [hour_scale](api/template/hour_scale.md) 템플릿을 재정의해야 합니다.
스케일 간격을 30분으로 맞추려면 템플릿을 아래와 같이 재정의할 수 있습니다:

~~~js
const format = scheduler.date.date_to_str("%H:%i");
const step = 30;
        
scheduler.templates.hour_scale = function(date){
    let html="";
    for (let i = 0; i < 60/step; i++){
        html += "<div style='height:22px;line-height:22px;'>"+format(date)+"</div>";
        date = scheduler.date.add(date,step,"minute");
    }
    return html;
}
~~~

![scale_spacing.png](/img/scale_spacing.png)

관련 샘플: [맞춤 Y-축](https://docs.dhtmlx.com/scheduler/samples/02_customization/21_custom_hour_scale.html)