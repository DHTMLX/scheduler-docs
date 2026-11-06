---
sidebar_label: eventGroups
title: "eventGroups API"
description: "활성 이벤트 그룹을 제어합니다"
---

# eventGroups

### 설명

@short: 활성 이벤트 그룹을 제어합니다

@signature: scheduler.ext.eventGroups: EventGroupsApi

### 예제

~~~js
scheduler.ext.eventGroups.setActive("personal", false);
if (scheduler.ext.eventGroups.isActive("work")) {
    scheduler.render();
}
~~~

### 세부 정보

`setActive(key, active)`는 알려진 그룹의 활성 상태를 변경하고 실제로 변경되면 `true`를 반환합니다. 먼저 `onBeforeEventGroupActiveChange`를 발생시키며 이 이벤트가 `false`를 반환하면 그룹을 변경하지 않습니다. 변경에 성공하면 Scheduler를 다시 그리고 `onEventGroupActiveChange`를 발생시킵니다. `isActive(key)`는 알려진 그룹의 활성 여부를 반환합니다.

### 관련 가이드

- [이벤트 그룹](guides/event-groups.md)