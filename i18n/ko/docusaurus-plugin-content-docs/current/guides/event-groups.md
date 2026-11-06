---
sidebar_label: 이벤트 그룹
title: 이벤트 그룹
description: 이름 있는 컬렉션을 사용하여 Scheduler 이벤트의 색상을 지정하고 표시하거나 숨깁니다
---

# 이벤트 그룹

이벤트 그룹은 GPL 및 PRO 에디션 모두의 Scheduler 코어에서 사용할 수 있습니다. 이벤트는 설정 가능한 속성에 하나의 그룹 키를 갖습니다. 그룹은 캘린더, 이벤트 유형, 프로젝트 또는 팀을 나타낼 수 있으며 Sidebar나 플러그인은 필요하지 않습니다.

```js
scheduler.config.event_groups = { list: "event_groups", property: "group", default: "work" };
scheduler.serverList("event_groups", [
  { key: "work", label: "Work", color: "#537cfa", textColor: "#fff" },
  { key: "personal", label: "Personal", color: "#39a675", active: false }
]);
scheduler.init("scheduler_here", new Date(), "week");
scheduler.parse([{ id: 1, start_date: "2026-10-19 09:00", end_date: "2026-10-19 10:00", group: "work" }]);
```

`event_groups`를 `{}`로 설정하면 `event_groups` 컬렉션과 이벤트 속성 `group`을 사용합니다. 배열이 아닌 객체는 기능을 활성화하고, `undefined`, `null`, `false` 또는 설정 키 제거는 다음 렌더링에서 비활성화합니다. `init()` 이후의 설정 변경은 다음 `scheduler.render()`에서 적용됩니다. React, Vue, Angular 래퍼는 `config` prop 또는 입력을 통해 추가, 변경, 제거를 적용합니다. Scheduler 인스턴스마다 하나의 `event_groups` 설정, 컬렉션 이름 및 이벤트 속성만 활성화할 수 있습니다.

그룹 항목에는 `key`, `label`과 선택적인 `color`, `textColor`, `active` 필드가 있습니다. JSON 컬렉션에서는 `value`를 별칭으로 허용하여 `key`에 매핑합니다. 다른 필드는 애플리케이션 코드에서 계속 사용할 수 있습니다. 특히 `readonly`는 현재 내장 효과가 없습니다. 이 릴리스에는 그룹 추가, 편집 또는 삭제 컨트롤이 없습니다. 그룹은 `active === false`일 때만 숨겨집니다. 숨겨진 그룹의 이벤트는 로드된 상태로 유지되지만 뷰와 미니 캘린더 이벤트 표시에 나타나지 않습니다. 그룹을 숨겨도 units 열이나 timeline 행은 제거되지 않습니다. 사용자 뷰 필터와 래퍼 필터는 그룹 표시 여부와 함께 계속 적용됩니다.

키는 비어 있지 않은 문자열, 유한한 숫자 또는 boolean일 수 있습니다. 매칭은 lightbox select 컨트롤의 문자열 값을 따르므로 `1`과 `"1"`은 같은 그룹입니다. 일치하는 키의 첫 항목이 사용되고 잘못된 항목과 이후 중복 항목은 무시됩니다. `undefined`, `null`, `""`, 알 수 없는 키, 배열 및 기타 multisection 이벤트 값은 그룹에 속하지 않으며 계속 표시되고 그룹 색상은 적용되지 않습니다. multisection 속성을 그룹 속성으로 사용하지 마세요.

두 색상 채널은 독립적으로 결정됩니다. 이벤트의 `color` 또는 `textColor`, `event_class` 같은 이벤트 노드 CSS 규칙, 해당 그룹 색상, 테마 순서로 우선합니다. 비어 있거나 null인 그룹 색상은 CSS 또는 테마로 대체됩니다.

Scheduler UI나 `addEventNow()`로 만든 새 이벤트에는 설정된 `default` 그룹이 활성 상태면 해당 그룹이, 아니면 첫 번째 활성 그룹이 지정됩니다. 활성 그룹이 없으면 속성은 비어 있고 이벤트는 표시됩니다. Scheduler는 `undefined`, `null`, `""`만 채우며 `addEventNow()`에 전달된 값과 `onEventCreated`에서 변경한 값은 유지합니다. 애플리케이션 코드가 숨겨진 그룹을 지정하면 이벤트도 숨겨집니다. 로드된 이벤트와 일반 가져오기는 제공된 값을 유지합니다.

그룹 전환에는 `scheduler.ext.eventGroups.setActive(key, active)`, 상태 확인에는 `isActive(key)`를 사용하세요. `setActive`는 취소 가능한 `onBeforeEventGroupActiveChange(key, active)`를 발생시키고 변경에 성공하면 `onEventGroupActiveChange(key, active)`를 발생시킵니다. `scheduler.updateCollection("event_groups", items)` 또는 JSON `collections`로 그룹을 교체할 수 있으며 두 목록에 모두 있는 키의 활성 상태 변경 거부도 반영합니다. 항목을 직접 편집한 결과는 다음 명시적 렌더링에서 표시되지만 자동으로 다시 그리지는 않습니다.

사용자가 lightbox에서 이벤트 그룹을 변경하도록 하려면 select 섹션과 레이블을 추가하세요.

```js
scheduler.locale.labels.section_event_group = "Calendar";
scheduler.config.lightbox.sections = [
  { name: "description", type: "textarea", map_to: "text" },
  { name: "event_group", type: "select", options: scheduler.serverList("event_groups"), map_to: "group" },
  { name: "time", type: "time", map_to: "auto" }
];
```

이벤트 그룹은 기본 lightbox를 변경하거나 그룹 편집 컨트롤을 추가하지 않습니다.

[Sidebar 및 이벤트 그룹 목록 샘플](https://docs.dhtmlx.com/scheduler/samples/16_layout/02_sidebar.html)
