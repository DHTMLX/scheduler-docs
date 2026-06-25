--- 
title: "키보드 네비게이션" 
sidebar_label: "키보드 네비게이션" 
---

# 키보드 네비게이션

스케줄러와 그 요소에 키나 키 조합으로 접근할 수 있습니다. 이 문서는 Scheduler의 키보드 탐색 특성에 대한 모든 필요한 정보를 제공합니다. 포커스 동작, 준비된 단축키의 사용 및 사용자 정의 단축키 생성 등

## 기능 활성화 방법

스케줄러에서 키보드 탐색을 사용하려면 페이지에서 **key_nav** 확장을 활성화해야 합니다. 

~~~js
scheduler.plugins({
    key_nav: true;
});
~~~

## 키보드 탐색 중 포커스 동작

### Scheduler에서의 포커스

Tab 키를 누르면 Scheduler는 일반 요소와 마찬가지로 포커스를 얻습니다. 그 후, Scheduler를 탐색하려면 화살표 키 및 기타 키를 사용할 수 있습니다. 

두 번째로 Tab 키를 누르면 포커스가 Scheduler를 벗어나 페이지의 다른 위치로 이동합니다.

### 모달 윈도우에서의 포커스

모달 윈도우(라이트박스, 확인 창)가 열리면 포커스가 Scheduler에서 이 창으로 이동하고, 이 창 안에서 탐색이 일반 양식처럼 이루어집니다. 창이 닫히면 포커스는 다시 Scheduler로 돌아갑니다.

포커스를 Scheduler로 되돌리려면 [focus](api/method/focus.md) 메서드를 사용해야 합니다. 

~~~js
scheduler.focus();
~~~

Scheduler가 다시 포커스를 얻으면 내부의 활성 요소, 또는 첫 번째 행, 또는 가장 최근에 선택된 요소에 포커스를 놓습니다.

모달 창에서의 기본 내비게이션 동작은 다음과 같습니다:

- *Enter* - 확인하고 닫기
- *Escape* - 변경 없이 닫기

포커스가 양식의 특정 버튼에 있을 경우, *Space* 또는 *Enter*를 누르면 포커스된 버튼이 눌려 해당 버튼의 동작이 실행되며, 다른 액션은 실행되지 않습니다.

## 포커스가 있는 셀의 스타일링

셀에 포커스가 설정되면 회색/노란색으로 강조됩니다. 이 스타일을 변경하려면 .dhx_focus_slot CSS 클래스를 사용하세요:

~~~js
<style>
    .dhx_focus_slot{
        background-color: #fff;
    }
</style>
~~~

## 스코프

키 클릭 시 호출되는 동작은 컨텍스트에 따라 달라집니다. 즉, 서로 다른 요소들(스코프)에 서로 다른 동작을 연결할 수 있습니다. Scheduler에는 다음과 같은 컨텍스트 요소(스코프)가 있습니다:

- **"scheduler"** - 전체 스케줄러
- **"timeSlot"** - 하나의 시간 슬롯
- **"event"** - 하나의 이벤트
- **"minicalDate"** - 미니 달력의 날짜
- **"minicalButton"** - 미니 달력의 화살표 버튼

동일한 단축키가 여러 스코프에 연결된 경우, 더 구체적인 단축키가 작동합니다. 즉, 같은 단축키가 Scheduler와 그 요소에 모두 연결된 경우, 요소에 연결된 단축키가 우선적으로 호출됩니다.

### 단축키 추가

새로운 키보드 단축키를 만들려면 [addShortcut](api/method/addshortcut.md) 메서드를 사용하고 세 매개변수를 전달해야 합니다:

- **shortcut** - (*string*) 새 단축키 키나 키 조합 이름
- **handler** - (*function*) 단축키 호출 시 호출될 핸들러 함수
- **scope** - (*string*) 핸들러 함수를 연결할 컨텍스트 요소의 이름

~~~js
scheduler.addShortcut("shift+w", function(e){ 
    const target = e.target;
    if(target.closest("[event_id]"))
        const eventId = target.getAttribute("event_id");

    if(eventId) 
        scheduler.showQuickInfo(eventId);
},"event");
~~~

### 단축키 제거

스코프에서 단축키를 제거하려면 [removeShortcut](api/method/removeshortcut.md) 메서드를 사용해야 합니다. 이 메서드는 두 개의 매개변수를 받습니다:

- **shortcut** - (*string*) 단축키의 이름
- **scope** - (*string*) 단축키가 연결된 컨텍스트 요소의 이름

~~~js
scheduler.removeShortcut("shift+w","event");
~~~

### 단축키 핸들러 얻기

키보드 단축키의 핸들러를 얻으려면 [getShortcutHandler](api/method/getshortcuthandler.md) 메서드를 사용합니다. 이 메서드는 두 매개변수를 받습니다:

- **shortcut** - (*string*) 단축키의 이름
- **scope** - (*string*) 단축키가 연결된 컨텍스트 요소의 이름

~~~js
const shortcut_handler = scheduler.getShortcutHandler("shift+w","event");
~~~

이 메서드는 단축키 호출의 핸들러를 담은 함수를 반환합니다. 

## 단축키 구문

키보드 단축키는 다음 키 또는 키 조합으로 구성될 수 있습니다:

- 수정 키 + 문자 키("ctrl+a");
- 수정 키 + 비문자 키("ctrl+space");
- 문자 키("a");
- 비문자 키("space")

하나의 동작에 대해 여러 키 조합이 있을 수 있습니다. 이 경우 모든 조합은 쉼표로 구분하여 나열됩니다: "ctrl+a, ctrl+space".

### 단축키에 사용할 수 있는 키 목록

- 수정 키: **shift**, **alt**, **ctrl**, **meta**;
- 비문자 키: **backspace**, **tab**, **enter**, **esc**, **space**, **up**, **down**, **left**, **right**, **home**, **end**, **pageup**, **pagedown**, **delete**,
  **insert**, **plus**, **f1-f12**.

## 기존 단축키

스케줄러를 탐색하는 데 사용할 수 있는 미리 정의된 단축키 세트가 있습니다:

### 일반 키보드 단축키

- **Tab** - 스케줄러에 포커스 설정
- **Alt+1,Alt+2,Alt+3,...** - 보기 간 전환
- **Ctrl+Left/Right** - 다음/이전 날짜로 이동
- **Ctrl+Up/Down** - 데이터 영역 스크롤
- **Ctrl+Enter** - 새 이벤트 생성
- **E, Shift+E** - 다음/이전 이벤트 선택
- **Home** - 현재 날짜로 전환
- **Ctrl+C, Ctrl+X, Ctrl+V** - 이벤트 복사/잘라내기/붙여넣기

### 시간 슬롯 단축키

- **Up/Down/Left/Right Arrow Keys** - 시간 슬롯 간 탐색
- **Shift+Up/Down/Left/Right Arrow Keys** - 시간 슬롯 확장
- **Enter** - 선택된 시간 슬롯에 이벤트 생성

### 이벤트 단축키

- **Up/Down/Left/Right Arrow Keys** - 시간 슬롯으로 이동
- **Enter** - 라이트박스 열기

### 미니 달력 단축키

- **Tab** - 미니 달력에 포커스 설정
- **Up/Down/Left/Right Arrow Keys** - 버튼/셀 간 탐색
- **Enter** - 버튼/셀 클릭

[Keyboard Navigation and WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)

[Keyboard navigation in the scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/07_navigation_plugin.html)

### 관련 이벤트

- [onEventCopied](api/event/oneventcopied.md)
- [onEventCut](api/event/oneventcut.md)
- [onEventPasted](api/event/oneventpasted.md)