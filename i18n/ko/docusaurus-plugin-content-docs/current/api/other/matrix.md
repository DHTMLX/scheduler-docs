---
sidebar_label: "matrix"
title: "matrix config"
description: "페이지에 지정된 모든 타임라인의 구성 객체를 저장합니다."
---

# matrix

### Description

@short: 페이지에 지정된 모든 타임라인의 구성 객체를 저장합니다.

@signature: matrix: any

### Example

~~~jsx
scheduler.createTimelineView({
    name:    "myTimeline",
    x_unit:    "minute",
    x_date:    "%H:%i",
    x_step:    30,
    x_size: 24,
    x_start: 16,
    x_length:    48,
    y_unit:    sections,
    y_property:    "section_id",
    render:"bar"
});

var configObj = scheduler.matrix;
~~~

### Related samples
- [Tooltips](https://docs.dhtmlx.com/scheduler/samples/06_timeline/12_section_tooltip.html)

### Details

**configObj** 변수는 다음과 같은 구조를 가집니다:

~~~js
{
    myTimeline:{
        name:    "myTimeline",
        x_unit:    "minute",
        ...
    }
}
~~~

:::note

이 프로퍼티를 사용하면 타임라인 구성을 실시간으로 조정할 수 있습니다. <br>
하지만 설정을 크게 변경해야 할 경우, 여러 구성 객체를 정의하고 현재 타임라인을 교체하는 것이 일반적으로 **matrix** 프로퍼티를 직접 수정하는 것보다 더 좋습니다.
 
:::

예를 들어, 위 예제의 타임라인에서 x_step, x_size, x_start 값을 업데이트하려면:

~~~
// 한 가지 방법은 다음과 같습니다:
configObj.x_step = 50;
configObj.x_size = 28;
configObj.x_start = 20;
scheduler.updateView();

// 하지만 더 효과적인 방법은 다음과 같습니다:

scheduler.createTimelineView({
    name:    "myTimeline",
    x_unit:    "minute",
    x_date:    "%H:%i",
    x_step:    50,
    x_size: 28,
    x_start: 20,
    x_length:    48,
    y_unit:    sections,
    y_property:    "section_id",
    render:"bar"
});
~~~
*만약 이미 존재하는 이름으로 타임라인을 생성하면, scheduler는 새로운 타임라인을 추가하지 않고 기존 타임라인을 업데이트합니다.*
