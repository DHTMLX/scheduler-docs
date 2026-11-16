---
sidebar_label: toolbar
title: "toolbar API"
description: "Toolbar 플러그인에 대한 런타임 접근을 제공합니다"
---

# toolbar

### 설명

@short: Toolbar 플러그인에 대한 런타임 접근을 제공합니다

@signature: scheduler.ext.toolbar: ToolbarApi

### 예제

~~~jsx
scheduler.plugins({ toolbar: true });
scheduler.init("scheduler_here");

scheduler.ext.toolbar.updateItem("today", { hidden: true });
~~~

### 세부 정보

이 API는 `scheduler.plugins({ toolbar: true })`와 `scheduler.init()` 이후 사용할 수 있습니다. `scheduler.config.header`를 변경하지 않고 렌더링된 Toolbar를 조작합니다.

| 메서드 | 설명 |
| --- | --- |
| `setItems(items)` | 선언적 헤더가 변경될 때까지 런타임 항목 구조를 교체합니다. |
| `updateItem(id, patch, occurrence?)` | 한 항목에 패치를 적용합니다. |
| `getItem(id, occurrence?)` | 항목 설정 복사본 또는 `null`을 반환합니다. |
| `getValue(id, occurrence?)` | 값을 가진 항목의 현재 값을 반환합니다. |
| `setValue(id, value, occurrence?)` | 변경 이벤트를 발생시키지 않고 값을 설정합니다. |
| `show(id, occurrence?)` / `hide(id, occurrence?)` | 항목을 표시하거나 숨깁니다. |
| `refresh()` | 현재 헤더 설정을 다시 읽고 Toolbar 상태를 업데이트합니다. |
| `getItemNode(id, occurrence?)` | 항목 루트 요소 또는 `null`을 반환합니다. |
| `getDefaultItems()` | 생성된 기본 항목 목록을 반환합니다. |

`occurrence`는 반복된 ID를 깊이 우선 시각 순서로 센 0부터 시작하는 위치이며 첫 항목에는 생략합니다. 같은 ID의 숫자 및 문자열 형식은 하나의 ID로 취급됩니다.

### 관련 가이드

- [Toolbar](guides/toolbar.md)
- [header](api/config/header.md)