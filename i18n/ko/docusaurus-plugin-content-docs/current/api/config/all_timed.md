---
sidebar_label: "all_timed"
title: "all_timed config"
description: "'short' 옵션은 멀티데이 이벤트를 일반적인 형식으로 표시합니다 (1일 이벤트가 표시되는 방식과 유사)."
---

# all_timed

### Description

@short: 'short' 옵션은 멀티데이 이벤트를 일반적인 형식으로 표시합니다 (1일 이벤트가 표시되는 방식과 유사).

@signature: all_timed: boolean | string


**Default value:** 'short'

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Displaying multi-day events in the regular way](https://docs.dhtmlx.com/scheduler/samples/03_extensions/26_multi_day_visible.html)

### Details

:::note
 이 속성은 [all_timed](guides/extensions-list.md#all-timed) 플러그인이 활성화되어 있어야 사용 가능합니다. 
:::

문자열로 사용할 경우, 이 파라미터는 *'short'* 값만 허용합니다.

<br>

이 파라미터에는 세 가지 가능한 값이 있습니다:

- **'short'**  - 24시간 미만(하루에 시작해서 다른 하루에 끝나는) 멀티데이 이벤트만 일반적인 형식으로 표시합니다.
- **true** - 모든 멀티데이 이벤트를 일반적인 형식으로 표시합니다.
- **false** - 모든 멀티데이 이벤트를 스케줄러 상단의 라인 형태로 표시합니다 (멀티데이 이벤트의 기본 표시 모드).

멀티데이 섹션에 어떤 이벤트가 나타나고, 어떤 이벤트가 일 단위 컬럼에 표시될지 더 세밀하게 제어하려면,
모듈의 `isMainAreaEvent` 메서드를 다음과 같이 오버라이드할 수 있습니다:

~~~js
const { isMainAreaEvent } = scheduler.ext.allTimed;
scheduler.ext.allTimed.isMainAreaEvent = function(event) {
    if(event.multidaySection){
        return false;
    }else{
        return isMainAreaEvent(event);
    }
};
~~~

### Change log
- 이 플러그인은 7.2 버전부터 기본 활성화되어 있습니다.
