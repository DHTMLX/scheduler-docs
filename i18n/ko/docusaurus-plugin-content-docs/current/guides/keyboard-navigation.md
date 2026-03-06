---
title: "키보드 내비게이션"
sidebar_label: "키보드 내비게이션"
---

# 키보드 내비게이션

Scheduler와 그 요소들은 개별 키 또는 키 조합을 사용하여 접근할 수 있습니다. 이 문서에서는 Scheduler의 키보드 내비게이션과 관련된 모든 사항, 포커스 동작 방식, 내장 단축키, 그리고 사용자 정의 단축키 생성 방법에 대해 설명합니다.

## 기능 활성화 {#enablingthefunctionality}

Scheduler에서 키보드 내비게이션을 활성화하려면, 페이지에서 **key_nav** 확장 기능을 활성화하면 됩니다.

~~~js
scheduler.plugins({
    key_nav: true
});
~~~

## 키보드 내비게이션 중 포커스 동작 {#focusbehaviorduringkeyboardnavigation}

### Scheduler에 포커스 맞추기 

Tab 키를 누르면 다른 요소와 마찬가지로 Scheduler에 포커스가 설정됩니다. 포커스가 설정된 후에는 방향키 및 기타 단축키를 사용하여 Scheduler 내에서 이동할 수 있습니다.

Tab 키를 다시 누르면 Scheduler에서 포커스가 다른 페이지 요소로 이동합니다.

### 모달 창에 포커스 맞추기 

모달 창(예: lightbox 또는 confirm 창)이 열리면, 포커스가 Scheduler에서 해당 창으로 이동하여 일반 폼처럼 내부를 탐색할 수 있습니다. 창을 닫으면 포커스가 다시 Scheduler로 돌아옵니다.

프로그래밍적으로 Scheduler에 포커스를 다시 맞추려면 [focus](api/method/focus.md) 메서드를 사용하세요:

~~~js
scheduler.focus();
~~~

Scheduler가 포커스를 다시 얻으면 내부의 활성 요소, 첫 번째 행 또는 최근에 선택된 항목에 포커스를 둡니다.

모달 창 내에서의 기본 내비게이션 동작은 다음과 같습니다:

- *Enter* - 확인 및 닫기
- *Escape* - 변경사항을 저장하지 않고 닫기

포커스가 폼 버튼에 있을 때 *Space* 또는 *Enter*를 누르면 기본 동작 대신 해당 버튼의 동작이 실행됩니다.

## 포커스된 셀 스타일링 {#stylingcellsinfocus}

포커스된 셀은 기본적으로 회색/노란색 배경으로 강조 표시됩니다. 이 스타일을 변경하려면 **.dhx_focus_slot** CSS 클래스를 수정하면 됩니다:

~~~js
<style>
    .dhx_focus_slot{
        background-color: #fff;
    }
</style>
~~~

## 범위(Scopes) {#scopes}

키보드 동작은 컨텍스트에 따라 다르므로, Scheduler 내의 다양한 요소(범위)에 서로 다른 단축키를 지정할 수 있습니다. 사용 가능한 범위는 다음과 같습니다:

- **"scheduler"** - 전체 Scheduler
- **"timeSlot"** - 타임 슬롯
- **"event"** - 이벤트
- **"minicalDate"** - 미니 캘린더의 날짜
- **"minicalButton"** - 미니 캘린더의 화살표 버튼

동일한 단축키가 여러 범위에 지정된 경우, 더 구체적인 요소에 연결된 단축키가 우선 적용됩니다. 예를 들어, 이벤트에 지정된 단축키는 전체 Scheduler에 지정된 동일한 단축키보다 우선합니다.

### 단축키 추가하기

새로운 키보드 단축키를 추가하려면, [addShortcut](api/method/addshortcut.md) 메서드를 세 가지 매개변수와 함께 사용하세요:

- **shortcut** - (*string*) 키 또는 키 조합
- **handler** - (*function*) 단축키가 실행될 때 호출할 함수
- **scope** - (*string*) 핸들러를 연결할 컨텍스트 요소

~~~js
scheduler.addShortcut("shift+w", function(e){ 
    var target = e.target;
    if(target.closest("[event_id]"))
        var eventId = target.getAttribute("event_id");

    if(eventId) 
        scheduler.showQuickInfo(eventId);
},"event");
~~~

### 단축키 제거하기

특정 범위에서 단축키를 제거하려면, [removeShortcut](api/method/removeshortcut.md) 메서드를 두 가지 매개변수와 함께 사용하세요:

- **shortcut** - (*string*) 단축키의 키 또는 키 조합
- **scope** - (*string*) 단축키를 제거할 컨텍스트 요소

~~~js
scheduler.removeShortcut("shift+w","event");
~~~

### 단축키 핸들러 가져오기

[getShortcutHandler](api/method/getshortcuthandler.md)를 사용하여 단축키의 핸들러 함수를 가져올 수 있습니다. 다음 매개변수를 사용합니다:

- **shortcut** - (*string*) 키 또는 키 조합
- **scope** - (*string*) 단축키가 연결된 컨텍스트 요소

~~~js
var shortcut_handler = scheduler.getShortcutHandler("shift+w","event");
~~~

이 메서드는 해당 단축키를 처리하는 함수를 반환합니다.

## 단축키 문법 {#shortcut-syntax}

키보드 단축키는 다음과 같이 구성할 수 있습니다:

- 수정 키와 문자 키 조합(예: "ctrl+a")
- 수정 키와 비문자 키 조합(예: "ctrl+space")
- 단일 문자 키(예: "a")
- 단일 비문자 키(예: "space")

여러 키 조합이 동일한 동작을 트리거하도록 할 수 있으며, 각 조합을 쉼표로 구분하여 나열합니다(예: "ctrl+a, ctrl+space").

### 단축키에 사용할 수 있는 키 목록

- 수정 키: **shift**, **alt**, **ctrl**, **meta**
- 비문자 키: **backspace**, **tab**, **enter**, **esc**, **space**, **up**, **down**, **left**, **right**, **home**, **end**, **pageup**, **pagedown**, **delete**, **insert**, **plus**, **f1-f12**

## 기존 단축키 {#existingshortcuts}

Scheduler에는 내비게이션을 위한 사전 정의된 단축키 세트가 포함되어 있습니다:

### 일반 키보드 단축키

- **Tab** - Scheduler에 포커스
- **Alt+1, Alt+2, Alt+3, ...** - 뷰 전환
- **Ctrl+Left/Right** - 이전/다음 날짜로 이동
- **Ctrl+Up/Down** - 데이터 영역 스크롤
- **Ctrl+Enter** - 새 이벤트 생성
- **E, Shift+E** - 다음/이전 이벤트 선택
- **Home** - 현재 날짜로 이동
- **Ctrl+C, Ctrl+X, Ctrl+V** - 이벤트 복사, 잘라내기, 붙여넣기

### 타임 슬롯 단축키

- **위/아래/왼쪽/오른쪽 방향키** - 타임 슬롯 간 이동
- **Shift+위/아래/왼쪽/오른쪽 방향키** - 선택된 타임 슬롯 확장
- **Enter** - 선택된 타임 슬롯에 이벤트 생성

### 이벤트 단축키

- **위/아래/왼쪽/오른쪽 방향키** - 타임 슬롯으로 이동
- **Enter** - lightbox 열기

### 미니 캘린더 단축키

- **Tab** - 미니 캘린더에 포커스
- **위/아래/왼쪽/오른쪽 방향키** - 버튼 및 날짜 탐색
- **Enter** - 선택된 버튼 또는 날짜 활성화

[Keyboard Navigation and WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)


[Keyboard navigation in the scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/07_navigation_plugin.html)


### 관련 이벤트

- [onEventCopied](api/event/oneventcopied.md)
- [onEventCut](api/event/oneventcut.md)
- [onEventPasted](api/event/oneventpasted.md)
