---
sidebar_label: event_groups
title: "event_groups 설정"
description: "이벤트 그룹 컬렉션을 설정합니다"
---

# event_groups

### 설명

@short: 이벤트 그룹 컬렉션을 설정합니다

@signature: event_groups: EventGroupsConfig | false

### 예제

~~~js
scheduler.config.event_groups = { list: "calendars", property: "calendarId", default: "work" };
scheduler.serverList("calendars", [
    { key: "work", label: "Work", color: "#537cfa", textColor: "#fff" },
    { key: "personal", label: "Personal", color: "#39a675", active: false }
]);
~~~

### 세부 정보

이벤트 그룹은 핵심 기능이므로 플러그인이 필요하지 않습니다. 설정 객체가 있으면 활성화되고, `false`, `null` 또는 값이 없으면 다음 렌더링에서 비활성화됩니다. 기본값은 `list: "event_groups"`와 `property: "group"`입니다.

### 설정 옵션

| 옵션 | 타입 | 설명 |
| --- | --- | --- |
| `list` | *string* | 그룹 정의를 저장하는 컬렉션 이름입니다. 기본값은 `"event_groups"`입니다. |
| `property` | *string* | 그룹 키를 저장하는 이벤트 속성입니다. 기본값은 `"group"`입니다. |
| `default` | *string \| number \| boolean* | 활성 그룹을 가리킬 때 새 이벤트에 할당되는 키입니다. |

각 컬렉션 항목은 `key`, `label`과 선택적인 `color`, `textColor`, `active` 속성을 사용합니다. 비활성 그룹의 이벤트는 숨겨집니다. 알 수 없거나 비어 있는 값, 배열 및 기타 multisection 값은 그룹 색상 없이 표시됩니다. multisection 속성을 `property`로 사용하지 마세요.

`default`가 활성 그룹을 가리키면 새 이벤트에 할당됩니다. 그렇지 않으면 Scheduler가 첫 번째 활성 그룹을 사용합니다. 이벤트 그룹은 기본 lightbox에 섹션을 추가하지 않으므로 사용자가 그룹을 선택해야 한다면 `select` 섹션을 추가하세요.

### 관련 API

- [eventGroups](api/other/eventgroups.md)

### 관련 가이드

- [이벤트 그룹](guides/event-groups.md)
- [사용자 지정 이벤트 색상](guides/custom-events-color.md)