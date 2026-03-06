---
title: "What's New"
sidebar_label: "What's New"
---

# What's New

이전 버전의 Scheduler에서 업그레이드하는 경우, 자세한 내용은 ["Migration From Older Versions"](migration.md)를 참고하세요.


## 7.2.5

<span class='release_date'>2025년 5월 20일. 버그 수정 릴리즈</span>

- [Lightbox time control](guides/time.md)에서 월별 일수 선택자가 올바르게 표시됩니다.
- Salesforce의 트라이얼 빌드에서 발생하던 스크립트 오류가 해결되었습니다.
- Scheduler v7.2에서 발생한 [Month view](views/month.md)에서 "오늘" 셀이 강조 표시되지 않는 문제가 수정되었습니다.
- [round_position](views/timeline.md#stretchingeventsoverthecell)이 활성화된 경우 이벤트 크기 조정 시 `end_date` 계산이 올바르게 수정되었습니다.
- 긴 내용을 표시할 때 [Tooltip](guides/tooltips.md)이 화면 밖으로 이동하는 현상이 해결되었습니다.

## 7.2.4

<span class='release_date'>2025년 5월 6일. 버그 수정 릴리즈</span>

### 수정 사항

- [ignore_timeline](views/timeline.md) 설정이 [Timeline view](views/timeline.md)에서 이벤트 이동 또는 크기 조정 시 올바르게 동작하지 않던 문제가 수정되었습니다.
- [ignore_timeline](views/timeline.md)이 활성화된 상태에서 새 이벤트 생성 시 `end_date` 계산이 올바르게 수정되었습니다.
- [lightbox](guides/lightbox-editors.md) 버튼 구성이 저장 후 혼동되는 문제가 해결되었습니다.
- [container_autoresize](guides/extensions-list.md#container-autoresize) 플러그인이 빈 [Agenda view](views/agenda.md)에서 컨테이너 크기를 예기치 않게 늘리는 문제가 해결되었습니다.
- [Units view](views/units.md)에서 특정 `size` 설정값과 [mark_now](api/config/mark_now.md) 옵션이 활성화된 경우 발생하는 스크립트 오류가 수정되었습니다.
- [Timeline view](views/timeline.md)에서 `smart_rendering`이 `false`로 설정된 경우 수평 스크롤 동작이 올바르게 수정되었습니다.

## 7.2.3

<span class='release_date'>2025년 4월 9일. 버그 수정 릴리즈</span>

### 수정 사항

- 차트의 가시적인 시간 범위를 벗어난 작업이 있을 때 그리드 셀이 포커스되지 않는 문제가 수정되었습니다.
- [multiUserBackend](guides/multiuser-live-updates.md) 확장에서 반복 이벤트 시리즈 전체 편집 시 잘못된 동작이 발생하던 문제가 해결되었습니다.
- [Timeline view](views/timeline.md)에서 `timeline_scalex_class`가 클래스를 두 번 추가하던 문제가 수정되었습니다.
- [Timeline view](views/timeline.md)에서 `scrollTo((section: x))`가 첫 번째 섹션으로 제대로 스크롤되지 않던 문제가 해결되었습니다.
- [lightbox](guides/lightbox-editors.md)에서 section `height` 설정이 올바르게 적용되도록 수정되었습니다.
- [Mini Calendar](guides/minicalendar.md)에서 `rtl` 설정이 무시되는 문제가 해결되었습니다.
- 여러 개의 [Timeline view](views/timeline.md)에서 `smart_rendering:true`와 `scrollable:false`를 사용할 때 스마트 렌더링이 첫 번째 타임라인에만 적용되던 문제가 수정되었습니다.
- [Timeline view](views/timeline.md)에서 `first_hour`/`last_hour`와 `round_position`을 함께 사용할 때 이벤트 날짜가 잘못 표시되던 문제가 해결되었습니다.

## 7.2.2

<span class='release_date'>2025년 2월 13일. 버그 수정 릴리즈</span>

- [recurring events](guides/recurring-events.md)의 수정된 발생에 대한 필터링 문제가 해결되었습니다.
- [month_date](api/template/month_date.md) 템플릿이 [Year view](views/year.md)에 올바르게 적용되도록 수정되었습니다.
- [Timeline view](views/timeline.md)에서 [multisection](views/units.md#assigningeventstoseveralunits) 이벤트와 `round_position: true`를 사용할 때 동작이 올바르게 수정되었습니다.
- [Timeline view](views/timeline.md)의 가시 범위를 벗어난 [recurring events](guides/recurring-events.md) 발생이 잘려나가지 않도록 방지하였습니다.
- "현재 및 이후" 옵션으로 [recurring events](guides/recurring-events.md)를 편집할 때 발생하는 문제가 수정되었습니다.

## 7.2.1

<span class='release_date'>2025년 1월 16일. 버그 수정 릴리즈</span>

- 서머타임(DST) 변경 시 [recurring occurrences](guides/recurring-events.md)가 사라지는 현상이 방지되었습니다.
- 새로 생성된 [recurring events](guides/recurring-events.md) 편집 시 발생하는 스크립트 오류가 수정되었습니다.
- 백엔드 데이터를 로드한 후 [occurrences](guides/recurring-events.md) 표시가 올바르게 수정되었습니다.
- [Units view](views/units.md)에서 사용 가능한 열을 초과하여 `size` 속성을 조정할 때 발생하는 오류가 수정되었습니다.
- [Tree Timeline view](views/timeline.md)에서 다중 레벨 폴더가 모든 중첩 단계에서 올바르게 표시되도록 수정되었습니다.
- 반복 이벤트의 lightbox를 열 때 `readonly_form` 설정 옵션으로 인해 발생하는 오류가 수정되었습니다.
- 특정 요일에 걸친 주간 반복 이벤트의 "현재 및 이후" 발생을 수정할 때 반복 패턴이 올바르게 수정되었습니다.

## 7.2

<span class='release_date'>2024년 12월 17일. 마이너 업데이트</span>

[블로그에서 릴리즈 리뷰 보기](https://dhtmlx.com/blog/dhtmlx-scheduler-7-2/)

### 주요 변경 사항

이 업데이트에는 일부 맵 구성 속성의 변경이 포함되어 있습니다. 자세한 내용은 [Migration notes](migration.md)를 참고하세요.

### 새로운 기능

- [현재 및 이후 반복 이벤트](guides/recurring-events.md) 편집 기능이 추가되었습니다.
- 협업 편집을 위한 새로운 [Live-Update 모듈](guides/multiuser-live-updates.md)이 도입되었습니다.

### 업데이트

- [overnight events](api/config/all_timed.md) 표시 방식이 개선되었습니다.
- [Mini Calendar](guides/minicalendar.md#event-handling)의 이벤트 핸들러가 업데이트되었습니다.
- [Date functions](api/other/date.md)가 비파괴적으로 변경되었습니다.

### 수정 사항

- LWC 환경에서 컨테이너 크기 조정 리스너 관련 문제가 수정되었습니다.
- [scheduler_last_hour](api/config/last_hour.md) 설정 이후에 종료되는 이벤트에서 드래그 앤 드롭 문제가 해결되었습니다.
- [cascade_event_display](api/config/cascade_event_display.md) 모드에서 이벤트 표시가 올바르게 수정되었습니다.
- `all_timed` 확장 기능이 활성화된 상태에서 새로운 이벤트를 일 열의 하단으로 크기 조정할 때 드래그-리사이즈 동작이 수정되었습니다.
- 스마트 렌더링이 꺼진 스크롤 가능한 [Timeline view](views/timeline.md)에서 수직 스크롤 문제가 해결되었습니다.
- [Units](views/units.md) 뷰에서 스크롤 버튼 표시 문제가 수정되었습니다.
- [Units](views/units.md) 뷰에서 `skip_incorrect` 설정이 `false`일 때 할당되지 않은 이벤트 표시가 올바르게 수정되었습니다.

## 7.1.3

<span class='release_date'>2024년 11월 19일. 버그 수정 릴리즈</span>

- [Timeline](views/timeline.md) 및 [Units](views/units.md) 뷰에서 [드래그 앤 드롭 중 이벤트의 초기 위치가 강조 표시](api/config/drag_highlight.md)되지 않는 문제가 수정되었습니다.
- [Timeline view](views/timeline.md)에서 `last_hour` 설정에 영향을 받던 드래그 앤 드롭 동작이 올바르게 수정되었습니다.
- 특정 시간대에서 서머타임(DST) 전환 시 [recurring occurrences](guides/recurring-events.md)가 사라지는 현상이 방지되었습니다.
- [Mini Calendar](guides/minicalendar.md#in-the-lightbox) lightbox 컨트롤의 [Full day](api/config/full_day.md) 전환 시 종료 날짜가 반복적으로 증가하는 현상이 수정되었습니다.
- [ignore_year](guides/custom-scales.md) 및 [ignore_agenda](guides/custom-scales.md) 메서드의 기능이 복구되었습니다.

## 7.1.2

<span class='release_date'>2024년 10월 8일. 버그 수정 릴리즈</span>

- [multisection](views/units.md#assigningeventstoseveralunits) 확장 기능이 활성화된 상태에서 [Ctrl+C/Ctrl+V](guides/keyboard-navigation.md)로 붙여넣기 시 이벤트 위치가 잘못되는 문제가 수정되었습니다.
- [Collision extension](guides/collisions.md)이 새로운 [recurring events](guides/recurring-events.md)에서 올바르게 동작하도록 수정되었습니다.
- [Timeline view](views/timeline.md)에서 smart rendering 활성화 후 [scheduler.updateCollection()](api/method/updatecollection.md) 호출 시 섹션 높이가 올바르게 수정되었습니다.
- [multisection](views/units.md#assigningeventstoseveralunits) 이벤트에서 [onBeforeLightbox](api/event/onbeforelightbox.md)가 취소될 때 smart rendering이 새 이벤트의 일부를 숨기는 문제가 수정되었습니다.
- [recurring events](guides/recurring-events.md)에서 [getEvents](api/method/getevents.md) 메서드의 잘못된 동작이 수정되었습니다.
- 사용자 지정 일일 속성을 가진 [recurring events](guides/recurring-events.md) 처리 방식이 개선되었습니다.

## 7.1.1

<span class='release_date'>2024년 8월 27일. 버그 수정 릴리즈</span>

- [DataProcessor](api/method/createdataprocessor.md)에서 false 값을 전송할 수 없던 문제가 수정되었습니다.
- 모바일 기기에서 [Tooltip](guides/tooltips.md)이 클릭 후 사라지는 현상이 수정되었습니다.
- 페이지 스크롤 중 [Tooltip](guides/tooltips.md) 위치가 올바르게 조정되었습니다.
- [container_autoresize](guides/extensions-list.md#container-autoresize) 플러그인에서 멀티데이 섹션이 숨겨지는 문제가 해결되었습니다.
- [Quick Info](guides/touch-support.md#quick-info-extension) 팝업이 컨테이너 밖에 표시되는 현상이 수정되었습니다.
- 스마트 렌더링이 활성화된 [Timeline view](views/timeline.md)에서 확인되지 않은 이벤트가 스크롤 중 사라지는 현상이 방지되었습니다.
- smart rendering이 활성화된 상태에서 [scheduler.updateCollection()](api/method/updatecollection.md) 호출 후 [Timeline view](views/timeline.md)에서 잘못된 섹션 높이 문제가 수정되었습니다.

## 7.1

<span class='release_date'>2024년 7월 31일. 마이너 업데이트</span>

[블로그에서 릴리즈 리뷰 보기](https://dhtmlx.com/blog/dhtmlx-scheduler-7-1/)

### 주요 변경 사항

이 업데이트에는 일부 맵 구성 속성의 변경이 포함되어 있습니다. 자세한 내용은 [Migration notes](migration.md)를 참고하세요.

### 새로운 기능

- [recurring events](guides/recurring-events.md)를 RRULE 형식으로 저장하는 기능이 추가되었습니다.
- Map view에서 [다양한 맵 제공자](views/map.md)를 지원합니다.
- 이벤트 삭제를 [되돌릴 수 있는 기능](api/config/undo_deleted.md)이 추가되었습니다.
- 여러 이벤트를 동시에 업데이트할 수 있는 [batchUpdate](api/method/batchupdate.md) 메서드가 도입되었습니다.

### 업데이트

- Scheduler가 [드래그 앤 드롭 중 캘린더 이벤트의 원래 위치를 강조 표시](api/config/drag_highlight.md)합니다.

### 수정 사항

- [Timeline view](views/timeline.md)에서 **x_date** 속성을 동적으로 변경할 때 템플릿이 업데이트되지 않는 문제가 수정되었습니다.
- 멀티데이 [Units view](views/units.md)에서 헤더 정렬이 맞지 않는 문제가 수정되었습니다.
- [drag_between](guides/drag-between.md#drag-events) 확장 기능이 활성화된 상태에서 [destructor](api/method/destructor.md) 호출 후 발생하는 스크립트 오류가 수정되었습니다.
- [limit](guides/limits.md) 확장 기능이 [recurring series](guides/recurring-events.md) 편집을 방해하던 문제가 수정되었습니다.
- **show_unassigned**가 *true*로 설정된 [Tree Timeline view](views/timeline.md)에서 이벤트 드래그 앤 드롭 성능이 개선되었습니다.
- 스크롤 가능한 [Timeline view](views/timeline.md)에서 `smart_rendering`이 *false*일 때 동작이 올바르게 수정되었습니다.
- 스크롤 가능한 [Timeline view](views/timeline.md)에서 뷰 변경 후 스크롤 위치 문제가 해결되었습니다.

## 7.0.5

<span class='release_date'>2024년 5월 30일. 버그 수정 릴리즈</span>

### 수정 사항

- [Timeline](views/timeline.md)에서 **event_dy:"full"** 사용 시 섹션 높이가 잘못 표시되는 문제가 수정되었습니다.
- [Year view](views/year.md)에서 누락된 "오늘" 마커가 복원되었습니다.
- [Day](views/day.md) 및 [Week](views/week.md) 뷰에서 이벤트 위치가 올바르게 조정되었습니다.

## 7.0.4

<span class='release_date'>2024년 5월 22일. 버그 수정 릴리즈</span>

### 수정 사항

- [textarea](guides/textarea.md) 컨트롤에 `placeholder` 옵션이 추가되었습니다.
- [Keyboard Navigation](guides/keyboard-navigation.md)에서 셀 선택 문제가 수정되었습니다.
- [Agenda view](views/agenda.md)에서 [Quick Info](guides/touch-support.md#quick-info-extension) 팝업 표시 문제가 해결되었습니다.
- [Agenda view](views/agenda.md) 템플릿의 타입 정의가 조정되었습니다.
- [start_on_monday](api/config/start_on_monday.md)가 비활성화되어 있고 뷰에서 여러 열이 [숨겨진](guides/custom-scales.md) 경우 [Month view](views/month.md)에서 다중일 이벤트 표시 문제가 해결되었습니다.

## 7.0.3

<span class='release_date'>2024년 3월 15일. 버그 수정 릴리즈</span>

### 수정 사항

- [Month view](views/month.md)에서 [textColor](guides/custom-events-color.md) 속성이 적용되지 않던 문제를 해결하였습니다.
- [Agenda view](views/agenda.md)에서 [color](guides/custom-events-color.md) 속성이 올바르게 동작하도록 수정하였습니다.
- [Day Timeline view](views/timeline.md)에서 [Keyboard Navigation](guides/keyboard-navigation.md) 사용 시 발생하던 오류를 수정하였습니다.

## 7.0.2

<span class='release_date'>2024년 2월 20일. 버그 수정 릴리스</span>

### 수정 사항

- [DHTMLX Suite](https://docs.dhtmlx.com/suite/)와의 호환성 저하 현상 해결
- [Timeline view](views/timeline.md)에서 [mark_now](api/config/mark_now.md) 마커에 영향을 주던 회귀 문제 수정
- 일부 경우에 잘못된 Scheduler 레이아웃을 유발하던 [theme initialization](guides/skins.md) 문제 해결
- [Grid view](views/grid.md)에서 정렬 후 선택된 이벤트의 선택 스타일이 사라지는 문제 수정
- [Timeline's smart rendering mode](views/timeline.md#horizontalscroll)에서 드래그 앤 드롭 시 이벤트가 중복 생성되던 현상 수정
- [Greek locale](guides/localization.md) 관련 오류 수정
- [destructor](api/method/destructor.md) 호출 시 Scheduler 인스턴스가 완전히 해제되지 않던 메모리 누수 문제 해결

## 7.0.1

<span class='release_date'>2024년 2월 5일. 버그 수정 릴리스</span>

### 수정 사항

- [Units](views/units.md) 뷰에서 현재 날짜에 스케줄러 표시 시 레이아웃 문제 수정
- [scrollable timeline](views/timeline.md#horizontalscroll)에서 [Quick Info](guides/touch-support.md#quick-info-extension) 팝업 위치 조정
- [RTL](guides/rtl-mode.md) 모드 활성화 시 [Keyboard Navigation](guides/keyboard-navigation.md)으로 선택된 타임슬롯 위치 오류 수정
- [Day](views/day.md)/[Week](views/week.md) 뷰에서 드래그-리사이즈 후 [Month](views/month.md) 뷰에서 다중일 이벤트 생성이 안되던 문제 해결

### 업데이트

- [Day](views/day.md)/[Week](views/week.md) 뷰의 [multi-day section 높이](api/config/multi_day_height_limit.md)가 기본값 200px로 제한됩니다.

## <b>7.0</b>

<span class='release_date'>2024년 1월 31일. 주요 업데이트</span>

[블로그에서 릴리스 리뷰 보기](https://dhtmlx.com/blog/dhtmlx-scheduler-7-0/)

### 주요 변경 사항

이 릴리스에서는 Scheduler 패키지 구조와 기능 동작에 변경이 있습니다. 원활한 이전을 위해 [Migration notes](migration.md) 확인을 권장합니다.

### 신규 기능

- CSS 변수 기반의 [Skins customization](guides/custom-skins.md)
- 새로운 [Dark skin](guides/skins.md#dark-skin) 도입
- 신규 [Agenda view](views/agenda.md) 추가

### 업데이트

- [Terrace skin](guides/skins.md#terrace-skin) 업데이트
- npm을 통한 [프로페셔널 Scheduler 버전 설치 옵션](guides/installation.md) 추가
- [Map View](views/map.md)에서 마커 커스터마이즈 기능 개선
- Day/Week/Units 뷰에서 [short events](guides/sizing.md) 기본 표시 개선
- [Day](views/day.md)/[Week](views/week.md)/[Units](views/units.md) 뷰에서 배경 그리드 이미지 제거
- 코어에서 [Bluebird Promise](api/method/promise.md) 라이브러리 제거
- 고해상도 및 작은 화면에서의 스케일링과 반응성 개선
- [Day](views/day.md)/[Week](views/week.md)/[Units](views/units.md) 뷰의 컬럼에서 [여유 공간 예약](api/config/day_column_padding.md) 기능 추가
- 타입 정의 업데이트
- Export API가 이제 별도의 JS 파일 없이 [scheduler.plugins](guides/extensions-list.md#export-service)의 일부로 제공됩니다. 자세한 내용은 [Migration](migration.md) 가이드 참고

### 수정 사항

- [French locale](guides/localization.md) 사용 시 [recurring form](guides/recurring-events.md) 표시 문제 수정
- [Timeline view](views/timeline.md)에서 first_hour/last_hour 설정 사용 시 드래그 앤 드롭 후 이벤트 지속 시간 오류 수정
- [Timeline view](views/timeline.md) 왼쪽 패널에서 마우스 휠 사용 시 예기치 않은 스크롤 현상 해결
- [Timeline view](views/timeline.md)에서 Smart Rendering 활성화 후 고해상도 화면에서 수직 스크롤 시 발생하는 시각적 지연 수정
- `all_timed` 확장 활성화 시 [Units view](views/units.md)에서 드래그 앤 드롭 기능 복구
- GPL 빌드에서 Multiselect 플러그인 복원

## 6.0.5

<span class='release_date'>2023년 7월 31일. 버그 수정 릴리스</span>

### 수정 사항

- SalesForce LWC에서 [lightbox](guides/lightbox-editors.md)가 동작하지 않던 문제 수정
- [ignore_week](guides/custom-scales.md) 사용 시 [container_autoresize](guides/extensions-list.md#container-autoresize) 관련 문제 수정 (주가 숨겨진 요일로 시작할 때 발생)

### 개선 사항

- 타입 정의에 [scheduler.form_blocks](guides/custom-lightbox-editor.md) 추가

## 6.0.4

<span class='release_date'>2023년 5월 31일. 버그 수정 릴리스</span>

### 수정 사항

- [Recurring series](guides/recurring-events.md) 인스턴스 편집 시 [dataProcessor](guides/server-integration.md) 동작 오류 수정
 - [Recurring series](guides/recurring-events.md)에서 커스텀 속성이 사라지는 현상 해결
 - [container_autoresize](guides/extensions-list.md#container-autoresize) 활성화 상태에서 [scheduler.destructor()](api/method/destructor.md) 호출 후 발생하는 스크립트 오류 수정
 - [Timeline view](views/timeline.md)에서 이벤트 드래그 앤 드롭 시 자동 스크롤이 차단되던 회귀 문제 해결
 - [onContextMenu](api/event/oncontextmenu.md) 이벤트 핸들러가 기본 컨텍스트 메뉴를 자동으로 차단하도록 수정

## 6.0.3

<span class='release_date'>2022년 11월 4일. 버그 수정 릴리스</span>

### 수정 사항

- [Year view](views/year.md)에서 [onEmptyClick](api/event/onemptyclick.md) 이벤트 핸들러에 잘못된 날짜 인자가 전달되던 회귀 문제 수정
- lightbox의 'time' 섹션 [height 속성](guides/time.md) 동작 오류 수정
- [second_scale](views/timeline.md#secondxaxis) 사용 시 타임라인 뷰의 시간 스케일 높이 오류 수정
- [onEventCancel](api/event/oneventcancel.md) 이벤트 인자에서 새로운 이벤트 플래그 값을 boolean으로 수정
- [Tree Timeline](views/timeline.md) 뷰에서 [smart_rendering](api/method/createtimelineview.md) 활성화 및 섹션이 [closed](views/timeline.md#dataforyaxissectionsinthetreemode) 상태로 처음 로드될 때 스크롤 시 스크립트 오류 수정

## 6.0.2

<span class='release_date'>2022년 7월 25일. 버그 수정 릴리스</span>

### 수정 사항

- [Custom Skins](guides/custom-skins.md) 생성 스크립트에서 회귀 문제 수정
- Content Security Policy가 활성화된 페이지에서 스크립트 오류 수정
- [router object](guides/server-integration.md#custom-routing)로 초기화할 때 DataProcessor 동작 오류 수정
- [Year view](views/year.md) 셀의 DOM 속성명 오타 수정

## 6.0.1

<span class='release_date'>2022년 6월 23일. 버그 수정 릴리스</span>

### 수정 사항

- Salesforce LWC와의 호환성 개선
- 툴팁 위치 오류로 인해 잘려 보이던 현상 수정
- [Tree Timeline](views/timeline.md) 뷰에서 [columns](views/timeline.md#headerofthesectionscolumn)" 표시 오류 수정
- [show_quick_info](api/config/show_quick_info.md) 비활성화 시 마우스 클릭으로 [Quick Info](guides/touch-support.md#quick-info-extension) 팝업이 뜨지 않도록 수정 (단, [showQuickInfo](api/method/showquickinfo.md) 메서드를 통한 호출은 허용)
- 일부 상황에서 [repeat_date](api/config/repeat_date.md) 설정이 잘못 동작하던 현상 수정

## <b>6.0</b>

<span class='release_date'>2022년 5월 19일. 주요 업데이트</span>

[블로그에서 릴리스 리뷰 보기](https://dhtmlx.com/blog/dhtmlx-scheduler-6-0/)

### 주요 변경 사항

이 버전에서는 Scheduler 패키지 구조와 기능에 변경이 있습니다. 원활한 업데이트를 위해 [Migration notes](migration.md#53---60) 확인을 권장합니다.

### 신규 기능

- [Scheduler 및 DataProcessor 인스턴스용 destructor 추가](guides/multiple-per-page.md#destructor-of-scheduler-and-dataprocessor-instances)
- [Timeline 섹션의 높이 설정](views/timeline.md#changingheightsofsections) 기능
- Timeline 왼쪽 패널에서 [여러 컬럼 지정](views/timeline.md#headerofthesectionscolumn)" 지원
- [Timeline object](views/timeline.md#timelineobjectapi)에" **resolvePosition**, **dateFromPos**, **getEventTop** 메서드 추가

### API

- 새로운 [week_agenda_date](api/template/week_agenda_date.md) 템플릿 추가
- [ajax](api/other/ajax.md), [env](api/other/env.md), [i18n](api/other/i18n.md) 객체 도입
- 새로운 [Promise](api/method/promise.md) 메서드 추가
- [destructor()](api/method/destructor.md) 메서드 및 [onDestroy](api/event/ondestroy.md) 이벤트 추가
- 디버그 헬퍼: [assert()](api/method/assert.md) 메서드, [show_errors](api/config/show_errors.md) 속성, [onError](api/event/onerror.md) 이벤트 추가
- [bind()](api/method/bind.md), [copy()](api/method/copy.md), [defined()](api/method/defined.md), [mixin()](api/method/mixin.md) 등 신규 메서드 추가
- dataProcessor 생성 함수가 전역 범위(window.dataProcessor)에서 scheduler 객체([scheduler.DataProcessor](api/method/dataprocessor.md))로 이동
- [createDataProcessor()](api/method/createdataprocessor.md) 메서드 추가
- [popup messages](guides/popups-and-modals.md)용 공개 헬퍼가 **dhtmlx**에서 **scheduler** 객체로 이동
- [serialize()](api/method/serialize.md) 메서드 추가
- [overwrite_marked_timespans](api/config/overwrite_marked_timespans.md) 속성 도입

### 업데이트

- 모든 확장은 이제 [plugins()](api/method/plugins.md) 메서드를 통해 활성화해야 함
- 로케일 파일 제거, Scheduler 현지화를 위한 새로운 [API](api/other/i18n.md) 도입
- `Scheduler.getSchedulerInstance`가 새 인스턴스 생성 시 구성 객체를 받을 수 있도록 변경
- CSP 확장 제거, [csp mode가 기본 활성화](api/config/csp.md)
- [attachEvent()](api/method/attachevent.md) 메서드에 세 번째 파라미터로 `settings` 객체 추가
- [DataProcessor의 Routing 옵션](guides/server-integration.md#custom-routing) 추가
- [dhtmlxScheduler를 ES6 모듈로 가져오기](guides/initialization.md#import-files-into-es67-and-typescript-apps) 지원

## 5.3.14

<span class='release_date'>2022년 3월 29일. 버그 수정 릴리스</span>

### 수정 사항

- [scheduler.addEvent()](api/method/addevent.md) 메서드로 추가된 반복 이벤트의 드래그 앤 드롭 동작 오류 수정
- 반복 이벤트 활성화 시 [scheduler.formSection()](api/method/formsection.md)에서 발생하던 스크립트 오류 해결
- [first_hour](api/config/first_hour.md) 설정에 따라 숨겨져야 할 이벤트가 표시되던 문제 해결
- 선택된 이벤트가 없을 때 빈 영역 클릭 시마다 [onEventUnselected](api/event/oneventunselected.md) 이벤트가 예기치 않게 발생하던 현상 제거
- 선택된 이벤트 삭제 시 [onEventUnselected](api/event/oneventunselected.md) 이벤트가 발생하도록 업데이트

## 5.3.13

<span class='release_date'>2021년 11월 9일. 버그 수정 릴리스</span>

### 수정 사항

- [Lightbox](guides/configuring-the-lightbox.md)를 [scheduler.hideLightbox](api/method/hidelightbox.md)로 닫은 후 [반복 시리즈](guides/recurring-events.md) 편집본이 사라지는 문제를 수정했습니다.
- [auto_end_date](api/config/auto_end_date.md) 설정의 동적 비활성화 동작을 올바르게 수정했습니다.
- 시리즈 이벤트의 `start_date`에 밀리초가 포함된 경우 반복 시리즈 내 [수정된 인스턴스](guides/recurring-events.md#editingdeleting-a-certain-occurrence-in-the-series) 처리를 개선했습니다.
- 일부 경우 [Keyboard Navigation](guides/keyboard-navigation.md) 모듈로 인해 이벤트 크기 조정 시 스크롤 위치가 이동하는 문제를 수정했습니다.
- [Keyboard Navigation](guides/keyboard-navigation.md)이 활성화된 경우, [Lightbox](guides/configuring-the-lightbox.md) 및 `dhtmlx.modalbox`에서 modal focus가 tabindex를 올바르게 따르도록 포커스 동작을 개선했습니다.
- [Week View](views/week.md)에서 "Today" 버튼이 오늘 열의 첫 번째 셀에 포커스되도록 동작을 수정했습니다(기존에는 첫 번째 열의 첫 셀에 포커스됨).
- [Smart Rendering](api/method/createtimelineview.md)이 활성화된 [Timeline view](views/timeline.md#horizontalscroll)에서 [scheduler.showEvent](api/method/showevent.md) 동작 문제를 해결했습니다.

## 5.3.12

<span class='release_date'>2021년 8월 24일. 버그 수정 릴리스</span>

### 수정 사항

- 섹션 목록에 중복 키가 있을 때 [Tree Timeline](views/timeline.md#dataforyaxissectionsinthetreemode) 뷰에서 무한 루프가 발생하는 문제를 수정했습니다.
- `After N occurrences` 제한을 사용할 때 월별 [반복 이벤트](guides/recurring-events.md) 동작을 올바르게 수정했습니다.
- `lastDay` 모드에서 이벤트 인스턴스의 분(minute)과 초(second)를 보존하도록 [recurring_overflow_instances](api/config/recurring_overflow_instances.md) 설정을 수정했습니다.
- [onBeforeEventDragOut](api/event/onbeforeeventdragout.md)에서 `false`를 반환할 때 드래그된 이벤트가 스케줄러 밖으로 이동하지 못하는 문제를 해결했습니다.
- 긴 레이블에서 원치 않는 줄 바꿈이 발생하지 않도록 [Tree Timeline](views/timeline.md#dataforyaxissectionsinthetreemode) 섹션 [labels](api/template/timelinename_scale_label.md)에 대한 기본 CSS를 업데이트했습니다.

## 5.3.11

<span class='release_date'>2021년 2월 9일. 버그 수정 릴리스</span>

### 수정 사항

- [Cookie extension](guides/extensions-list.md#cookie)이 활성화된 상태에서 날짜를 변경할 때 발생하는 스크립트 오류를 수정했습니다.
- dataProcessor의 [transaction mode](https://docs.dhtmlx.com/api__dataprocessor_settransactionmode.html)가 "JSON"일 때 Content-Type 헤더 값을 올바르게 수정했습니다.
- [Terrace](guides/skins.md#terrace-skin) 스킨 사용 시 [모바일 기기](guides/touch-support.md)에서 Lightbox의 CSS를 개선했습니다.
- [반복 이벤트](guides/recurring-events.md)에서 대상 월에 해당 날짜가 없고 "monthly" 반복이 설정된 경우 일부 이벤트가 다음 달로 이동하는 문제를 수정했습니다.
- [scheduler.updateCollection()](api/method/updatecollection.md)으로 Lightbox를 닫은 후에도 모달 오버레이가 남아있는 문제를 해결했습니다.

### 업데이트

- 붙여넣은 이벤트의 위치를 검증하거나 조정할 수 있도록 [onBeforeEventPasted](api/event/onbeforeeventpasted.md) API 이벤트를 추가했습니다.
- 새로운 [recurring_overflow_instances](api/config/recurring_overflow_instances.md) 설정 옵션을 도입했습니다.

## 5.3.10

<span class='release_date'>2020년 11월 11일. 버그 수정 릴리스</span>

### 수정 사항

- 일부 단위가 [숨겨진](guides/custom-scales.md) 경우 [column_width](views/timeline.md#horizontalscroll) 동작을 수정했습니다.
- iPad의 Safari에서 터치 지원 문제를 수정했습니다.
- [Grid view](views/grid.md)에서 [onDblClick](api/event/ondblclick.md) 및 [onClick](api/event/onclick.md) 이벤트에서 *false*를 반환할 때 올바르게 동작하지 않던 문제를 해결했습니다.
- [Timeline view](views/timeline.md)에서 이벤트 바 하단 근처를 클릭할 때 이벤트가 다음 섹션으로 이동하던 드래그 앤 드롭 동작을 수정했습니다.

## 5.3.9

<span class='release_date'>2020년 6월 4일. 버그 수정 릴리스</span>

### 수정 사항

- [scrollable timeline](views/timeline.md#horizontalscroll)에서 아래로 스크롤한 후 마지막 행을 드래그하면 발생하는 표시 문제를 수정했습니다.
- 두 개의 [scrollable timelines](views/timeline.md#horizontalscroll) 간 전환 시 나타나는 표시 오류를 해결했습니다.
- 터치 기기에서 [timeline](views/timeline.md)을 스크롤할 때 발생하는 스크립트 오류를 수정했습니다.
- [custom headers](guides/server-integration.md#custom-request-headers-and-parameters)를 사용할 때 `dataProcessor`가 보내는 POST/PUT/DELETE 요청의 Content-Type 헤더를 올바르게 수정했습니다.
- 타임라인 행에 CSS 클래스를 적용할 수 있도록 [timeline_row_class](api/template/timelinename_row_class.md) 템플릿을 추가했습니다.

## 5.3.8

<span class='release_date'>2020년 5월 14일. 버그 수정 릴리스</span>

### 수정 사항

- [Lightbox](guides/lightbox-editors.md)의 모달 오버레이 높이가 잘못 표시되는 문제를 수정했습니다.
- Bootstrap 모달 내부에서 스케줄러를 초기화할 때 크기 조정 문제를 해결했습니다.

### 업데이트

- 스케줄러가 컨테이너 크기 변화를 자동으로 감지하고 그에 따라 크기를 조정하도록 개선했습니다.
- [header config](api/config/header.md)에서 사용할 수 있는 [Mini Calendar](guides/minicalendar.md) 컨트롤을 추가했습니다.

## 5.3.7

<span class='release_date'>2020년 4월 30일. 버그 수정 릴리스</span>

- [Timeline view](views/timeline.md#horizontalscroll)에서 수평 스크롤바가 활성화된 경우 [Container Autoresize](guides/extensions-list.md#container-autoresize) 확장 기능의 문제를 수정했습니다.
- [Timeline view](views/timeline.md)의 [show_unassigned](api/method/createtimelineview.md) 설정 옵션을 올바르게 수정했습니다.

## 5.3.6

<span class='release_date'>2020년 2월 27일. 버그 수정 릴리스</span>

- `scrollable:true` 또는 `smart_rendering:true`가 활성화된 [Day Timeline view](views/timeline.md#viewmodes)에서 이벤트 표시 문제를 수정했습니다.
- [dataProcessor](guides/server-integration.md)와 함께 `scrollable:true`를 사용할 때 [Day Timeline view](views/timeline.md#viewmodes)에서 새 이벤트를 드래그한 후 발생하는 스크립트 오류를 해결했습니다.
- [header config](guides/initialization.md)에 `date` 요소가 없을 때 발생하는 스크립트 오류를 수정했습니다.
- [header config](guides/initialization.md)에 `week` 또는 `month` 탭이 없을 때 [Material skin](guides/skins.md#material-skin)의 `day` 탭 스타일을 개선했습니다.

## 5.3.5

<span class='release_date'>2020년 1월 31일. 버그 수정 릴리스</span>

### 수정 사항

- [header config](guides/initialization.md) 사용 시 [Terrace skin](guides/skins.md#terrace-skin)에서 네비게이션 패널 오른쪽 '다음' 버튼의 스타일을 수정했습니다.
- [URL extension](guides/extensions-list.md#url)에서 일부 경우 URL로 이벤트를 강조 표시하지 못하던 문제를 해결했습니다.
- [Material skin](guides/skins.md#material-skin)에서 `@import`로 스케줄러 스타일을 불러올 때 발생하는 문제를 수정했습니다.

### 업데이트

- 스케줄러 초기화 시 [header config](guides/initialization.md)나 [default markup](guides/initialization.md#initializing-scheduler-via-markup)이 제공되지 않으면 자동으로 기본 헤더를 추가하여 스크립트 오류를 방지하도록 했습니다.

## 5.3.4

<span class='release_date'>2019년 12월 10일. 버그 수정 릴리스</span>

### 수정 사항

- 마우스가 섹션 열 위에 있을 때 [scrollable timeline](views/timeline.md#horizontalscroll)에서 수직 스크롤 문제가 발생하는 현상을 수정했습니다.
- [dataProcessor](guides/server-integration.md)가 중첩 객체를 직렬화할 때 발생하는 문제를 해결했습니다.
- [custom lightbox](guides/custom-details-form.md)로 새 이벤트를 생성할 때 발생하는 스크립트 오류를 수정했습니다.

## 5.3.3

<span class='release_date'>2019년 10월 30일. 버그 수정 릴리스</span>

### 업데이트

- 일반적인 잘못된 설정에 대한 오류 메시지를 더욱 명확하게 개선했습니다.
- 여러 공개 샘플의 HTML 마크업을 정리했습니다.

## 5.3.2

<span class='release_date'>2019년 10월 9일. 버그 수정 릴리스</span>

### 수정 사항

- [Mini Calendar](guides/minicalendar.md)에서 사용자 정의 [calendar_date template](api/template/calendar_date.md)이 정의된 경우 클릭 [handler](api/method/rendercalendar.md) 동작을 수정했습니다.
- [resize](api/config/drag_resize.md) 시 [Day/Week views](/views/)에서 이벤트 종료 날짜 반올림 문제를 수정했습니다.

## 5.3.1

<span class='release_date'>2019년 10월 2일. 버그 수정 릴리스</span>

### 업데이트

- 기본적으로 [responsive_lightbox](api/config/responsive_lightbox.md)를 비활성화했습니다.

## 5.3

<span class='release_date'>2019년 10월 2일. 마이너 업데이트</span>

[블로그의 릴리스 리뷰](https://dhtmlx.com/blog/dhtmlxscheduler-5-3-minor-update-rtl-support-improved-responsiveness/)

### 주요 변경 사항

이번 업데이트에서는 일부 컴포넌트 구성요소의 동작이 조정되었습니다. 기존 코드에 문제가 발생할 것으로 예상되지는 않으나, 원활한 전환을 위해 [Migration notes](migration.md#53---60)를 확인하는 것을 권장합니다.

### 새로운 기능

1. [RTL 지원](guides/rtl-mode.md)이 추가되었습니다.
2. 모바일 반응성 개선([["Mobile Responsive Scheduler"](guides/touch-support.md)]).
3. DHTMLX Suite 6 Layout과 통합(["dhtmlxLayout와의 통합"](integrations/other/dhxlayout-integration.md)).

### 업데이트

1. Date/Time lightbox 컨트롤에 [year range](guides/time.md#properties) 설정을 추가했습니다.
2. 기본적으로 스케줄러 날짜 변경을 위한 수평 스와이프를 비활성화했습니다(["Mobile Responsive Scheduler"](guides/touch-support.md#touch-gestures-in-the-scheduler)).
3. 마크업 대신 설정에서 스케줄러 헤더를 지정할 수 있도록 했습니다(["dhtmlxScheduler를 순수 JS/HTML에서 사용하기"](guides/initialization.md)).
4. setCurrentView() 및 updateView()를 더 명확하게 대체하는 [render](api/method/render.md) 메서드를 도입했습니다.
5. [hideLightbox](api/method/hidelightbox.md) 메서드를 공개 API에 추가했습니다.

### 수정 사항

- [Material skin](guides/skins.md#material-skin)에서 [multiselect](guides/multiselect.md#properties) 컨트롤의 vertical 설정이 동작하지 않던 문제를 수정했습니다.

## 5.2.5

<span class='release_date'>2019년 9월 23일. 버그 수정 릴리스</span>

### 수정 사항

- [v5.2.4](#524)에서 발생한 ["툴팁 (Tooltips)"](guides/tooltips.md) 확장 기능의 회귀 문제를 해결했습니다.

## 5.2.4

<span class='release_date'>2019년 9월 19일. 버그 수정 릴리스</span>

### 수정 사항

- [readonly form](guides/readonly.md#read-only-mode-for-the-entire-lightbox)에서 [lightbox configuration](guides/lightbox-editors.md)을 변경할 수 없던 문제를 해결했습니다([Scheduler 초기화](api/method/init.md) 이후).
- Angular 8 호환성 문제를 해결했습니다.

## 5.2.3

<span class='release_date'>2019년 8월 20일. 버그 수정 릴리스</span>

### 수정 사항

- [scrollable Timeline](views/timeline.md#horizontalscroll)에서 드래그 앤 드롭 시 이벤트 바 애니메이션 문제를 수정했습니다.
- ["Day View"](views/day.md) / ["주간 보기"](views/week.md)에서 이벤트를 하루의 끝으로 이동할 때 [multiday section](api/config/multi_day.md)으로 이동하던 문제를 해결했습니다.
- [scrollable Timeline](views/timeline.md#horizontalscroll)의 `scroll_position` 설정이 제대로 동작하지 않던 문제를 복구했습니다.
- 마우스 클릭 후 [multi-section events](views/timeline.md#assignmentofeventstoseveralsections)의 위치 오류를 수정했습니다.
- [Timeline view](views/timeline.md#viewmodes)의 `cell` 모드에서 [ignore_timeline](guides/custom-scales.md) 사용 시 툴팁에 의해 발생하는 스크립트 오류를 해결했습니다.

## 5.2.2

<span class='release_date'>2019년 8월 7일. 버그 수정 릴리스</span>

### 수정 사항

- 일반적인 잘못된 설정에 대한 오류 메시지를 더 명확하게 추가했습니다.
- [readonly form](guides/readonly.md#read-only-mode-for-the-entire-lightbox)에서 라벨을 더블 클릭할 때 발생하는 스크립트 오류를 수정했습니다.
- `smart_rendering:true`와 `section_autoheight:false`를 함께 사용할 때 [Timeline view](views/timeline.md)에서 표시 오류를 수정했습니다.
- [Year view](views/year.md)에서 [scheduler.ignore_year](guides/custom-scales.md)로 이벤트가 있는 날짜를 숨길 때 발생하는 스크립트 오류를 수정했습니다.

## 5.2.1

<span class='release_date'>2019년 6월 11일. 버그 수정 릴리스</span>


### 수정 사항

- [load](api/method/load.md)에 설명된 IE11에서의 데이터 타입 감지 문제를 해결했습니다.
- [timeline.scrollTo](views/timeline.md#timelineobjectapi) 메서드가 [수평 스크롤바](views/timeline.md#horizontalscroll)가 없는 타임라인에서도 정상적으로 동작하도록 수정했습니다.
- [Timeline view](views/timeline.md)에서 [showEvent](api/method/showevent.md) 메서드의 기능을 복원했습니다.
- [scrollable timeline](views/timeline.md#horizontalscroll)에서 `smart_rendering:false` 설정 시 수직 스크롤 동작을 수정했습니다.
- [multiday units view](views/units.md#displayingunitsformultipledays)에서 [multisection](views/units.md#assigningeventstoseveralunits) 확장과 [step](views/units.md#scrollingunits) 옵션이 설정된 경우 이벤트 위치 지정 문제를 해결했습니다.
- [Daily Timeline](views/timeline.md#daysmodedetails)에서 이벤트 크기 조정 문제를 수정했습니다.

## 5.2

<span class='release_date'>2019년 6월 6일. 마이너 업데이트</span>

[블로그의 릴리즈 리뷰 보기](https://dhtmlx.com/blog/dhtmlxscheduler-5-2-custom-content-timeline-view-enhanced-drag-n-drop/)

### 주요 변경 사항

여러 API 메서드의 동작이 변경되었습니다. 기존 코드에 영향을 주지 않을 수 있지만, 원활한 이전을 위해 [Migration notes](migration.md#51---52)를 확인하는 것이 좋습니다.

### 새로운 기능

1. [타임라인 셀에 커스텀 HTML 콘텐츠](views/timeline.md#customcontentincells) 지원 추가 (PRO 버전).
2. [이벤트 본문 드래그 앤 드롭](api/config/drag_event_body.md) 기능 활성화.

### 업데이트

- [load](api/method/load.md)와 [parse](api/method/parse.md)의 데이터 형식 파라미터가 선택 사항이 되었으며, scheduler가 형식을 자동 감지합니다.
- [날짜-문자열 변환 함수](guides/date-formats.md)가 제공된 형식과 다른 날짜 문자열 형식도 자동 감지할 수 있습니다.
- [dhtmlxConnector 라이브러리](https://github.com/DHTMLX/connector-php)가 더 이상 dhtmlxScheduler 패키지에 포함되지 않습니다.
- 샘플 패키지가 PHP/Apache 서버 없이도 실행할 수 있도록 변경되었습니다.
- [타임라인 오브젝트](views/timeline.md#timelineobjectapi)를 위한 새로운 메서드가 추가되었습니다.
- ["Multiselect"](guides/multiselect.md) 컨트롤이 JSON 형식 옵션 로딩을 지원합니다.
- [onLoadStart](api/event/onloadstart.md), [onBeforeParse](api/event/onbeforeparse.md), [onParse](api/event/onparse.md), [onLoadEnd](api/event/onloadend.md)와 같은 새로운 이벤트가 추가되어, 기존 **onXLS** 및 **onXLE** 이벤트를 대체합니다.

### 수정 사항

- 새로운 이벤트 생성 시 [clearAll](api/method/clearall.md)가 `scheduler.endLightbox(false)` 이전에 호출되면 발생하는 잘못된 동작을 수정했습니다.
- iPad에서 [timeline horizontal scroll](views/timeline.md#horizontalscroll) 사용 시 발생하는 깜빡임 현상을 해결했습니다.
- [scrollable timeline](views/timeline.md#horizontalscroll)에서의 다양한 표시 문제를 수정했습니다.
- Units view의 [](api/template/unitsname_scale_text.md) 가 인자에 section date를 포함하도록 수정했습니다.
- [Units view](views/units.md)에서 섹션이 로드되지 않은 상태에서 이벤트를 생성할 때 발생하는 스크립트 오류를 수정했습니다.
- ["Multiselect"](guides/multiselect.md) 컨트롤의 `vertical` 속성이 이제 boolean 값만 허용하며, `"vertical:'false'"`와 같은 문자열 값은 boolean `true`로 해석됩니다.

## 5.1.6

<span class='release_date'>2019년 1월 11일. 버그 수정 릴리즈</span>

### 수정 사항

- Month view에서 `start_on_monday = false` 설정 시 토/일요일에 예약된 이벤트의 위치를 수정했습니다.
- 현재 시간 표시 마커가 있는 scrollable timeline에서 발생하던 스크립트 오류를 수정했습니다.
- 수평 스크롤 후 scrollable timeline에서 `onYScaleClick` 핸들러로 전달되는 인자 값이 잘못되는 문제를 해결했습니다.
- 섹션 재로딩 후 scrollable timeline이 새로고침 전까지 비어 있게 되는 문제를 수정했습니다.
- 일부 Tree timeline 폴더 셀이 수평 스크롤 이후 표시되지 않는 렌더링 문제를 수정했습니다.
- `all_timed` 확장 사용 시 이벤트 리사이즈 동작을 수정하여 마지막 이벤트 조각만 크기 조절이 가능하도록 했습니다.
- `all_timed="short"` 모드에서 이벤트 리사이즈 중 이벤트가 사라지는 문제를 해결했습니다.

## 5.1.1

<span class='release_date'>2018년 12월 14일. 버그 수정 릴리즈</span>

### 수정 사항

- 타임라인에서 키보드 네비게이션 포커스가 강조 표시되지 않는 문제를 수정했습니다.
- `second_scale`이 지정된 경우 `timeline_scale_header`의 초기 높이 문제를 수정했습니다.
- 섹션 내에 이벤트가 하나만 있을 때 `event_min_dy`가 섹션 높이에 영향을 주지 않는 문제를 수정했습니다.
- 동일 이벤트를 여러 번 클릭할 때 퀵 인포 팝업이 자동으로 닫히는 문제를 해결했습니다.
- `Year view`에서 이벤트 삭제 후 발생하는 스크립트 오류를 수정했습니다.
- 이벤트가 로드되지 않았을 때 스크롤된 타임라인의 초기 표시 오류를 수정했습니다.
- 스크롤이 없는 타임라인에서도 스마트 렌더링을 활성화했습니다.
- timeline에서 key_nav 확장 사용 시 날짜 변경 후 스크롤 위치가 초기화되는 문제를 수정했습니다.
- `onBeforeViewChange` 이벤트에서 `old_date` 인자 값이 잘못 전달되는 경우를 수정했습니다.
- 무시된 시간 셀이 있는 scrollable timeline의 표시 문제를 해결했습니다.
- 일/주간 뷰에서 새 이벤트 생성 시 스크롤 동작을 개선했습니다.
- `onAfterSchedulerResize` 이벤트가 `Timeline view`에서 발생하지 않는 문제를 수정했습니다.
- `Week view`에서 이벤트 렌더링 성능을 개선했습니다.

## 5.1

<span class='release_date'>2018년 11월 29일. 마이너 업데이트</span>

[블로그의 릴리즈 리뷰 보기](https://dhtmlx.com/blog/dhtmlxscheduler-5-1-horizontal-scroll-and-new-server-side-integrations/)

### 주요 변경 사항

Timeline view의 HTML 구조가 크게 변경되었습니다. 마이그레이션을 위해 일부 코드 수정이 필요할 수 있습니다. 자세한 내용은 [Migration](migration.md#50---51) 문서를 참고하세요.

### 주요 변경점

1. [Timeline view에서 수평 스크롤](views/timeline.md#horizontalscroll) 도입 (PRO 버전).
2. Timeline view의 스마트 렌더링 및 성능 개선 (PRO 버전).
3. 다양한 서버사이드 플랫폼과의 통합 추가. [관련 튜토리얼 보기](integrations/howtostart-guides.md).

### 부가 변경점

- [Timeline 오브젝트의 API](views/timeline.md#timelineobjectapi) 업데이트.
- [Timeline view에서 자동 스크롤](views/timeline.md#autoscrollconfiguration) 지원 추가.
- 타임라인 뷰에서 섹션이 있는 열의 헤더에 라벨 추가 기능 지원.

## <b>5.0</b>

<span class='release_date'>2018년 5월 17일. 주요 업데이트</span>

[블로그의 릴리즈 리뷰 보기](https://dhtmlx.com/blog/dhtmlxscheduler-5-0-material-design/)

### 주요 변경 사항

1. Classic 및 Glossy 스킨 제거. [마이그레이션 세부 정보](migration.md#44---50) 참고.
2. Scheduler의 전반적인 CSS 리팩토링 진행. [영향 확인하기](migration.md#44---50).

### 주요 변경점

1. 새로운 [Material skin](guides/skins.md#material-skin) 추가.
2. [REST API를 활용한 서버사이드 통합](guides/server-integration.md) 도입.
3. [스킨 커스터마이징](guides/custom-skins.md) 기능 강화.

### 부가 변경점

- Microsoft 기기용 터치 지원 업데이트.
- 반복 이벤트 폼에 [히브리어 로케일](guides/localization.md) 추가.
- 네트워크 및 서버 오류를 위한 [onLoadError](api/event/onloaderror.md) 이벤트 도입.

### 버그 수정 및 개선

- ES6/TS import 호환성 문제 수정.
- 키보드 네비게이션 지원 개선.
- 기타 다양한 버그 수정.

## 4.4.9

<span class='release_date'>2017년 6월 6일. 버그 수정 릴리즈</span>

### 수정 사항

- WAI-ARIA 속성 비활성화 시 발생한 WAI-ARIA 지원 회귀 문제 수정.
- WAI-ARIA 지원 개선 및 JAWS 호환성 강화.
- 키보드 네비게이션 관련 다양한 버그 및 개선사항 반영.
- 샘플의 잘못된 서버 설정 코드 수정.
- Cookie 확장에서 cookie와 ajax 로딩 타임아웃 간 충돌 해결.
- Year view에서 이벤트 생성 관련 버그 수정.
- 확대된 페이지에서 드래그 앤 드롭 시 마우스 위치 문제 수정.
- all-timed 확장에서 터치 기기 드래그 앤 드롭 문제 수정.
- *server_utc* 설정으로 인해 잘못된 시간 범위가 발생하는 동적 로딩 문제 수정.
- 로케일 관련 소소한 버그 수정.

## 4.4

<span class='release_date'>2017년 2월 2일. 마이너 업데이트</span>

[블로그의 릴리즈 리뷰 보기](https://dhtmlx.com/blog/scheduler-4-4-released-accessibility-support-minor-improvements/)

### 주요 변경 사항

1. [키보드 네비게이션](guides/keyboard-navigation.md) 추가.
2. [WAI-ARIA 지원](guides/accessibility.md#wai-aria-attributes) 도입.
3. [고대비 테마](guides/accessibility.md#high-contrast-themes) 추가.


### 부가 변경점

- Month view에서 markTimespan 사용 가능.
- 특정 날짜에서 반복 마커 제거 기능 추가.
- Year view에서 요일 건너뛰기 옵션 도입.
- Multiselect 컨트롤에 *delimiter* 옵션 추가.
- 최신 dhtmlxSuite와의 외부 드래그 앤 드롭 호환성 업데이트.
- 퍼블릭 저장소의 CSP 개선 사항 병합.
- [Timeline](views/timeline.md) 성능 소폭 개선.
- z-index 값 정규화 및 최신 [dhtmlxCombo](guides/combo.md) 스타일 업데이트.

### 버그 수정 및 개선

- addEventNow가 새 이벤트의 ID를 반환하도록 보장.
- Week view에서 드래그 앤 드롭 및 무시된 열 문제 수정.
- 정의되지 않은 터치 이벤트에 대한 체크 추가.
- iPad에서 클릭 및 키보드 포커스 문제 해결.
- scheduler.clearAll 이후 dataprocessor 상태 초기화.
- SVG 요소에서 발생하는 이벤트 핸들러 JS 오류 수정.
- Tooltip 확장에서 다양한 버그 해결.
- container_autosize 확장에서 여러 문제 수정.
- 기타 다수의 수정 사항 반영.

## 4.3.35

<span class='release_date'>2016년 5월 26일. 버그 수정 릴리즈</span>

### 수정 사항

- 최신 DHTMLX Suite 라이브러리 통합
- scheduler 내 SVG 요소 지원 추가
- 타임라인에서 반올림된 날짜로 이벤트 드래그 및 생성 시 날짜 오류 수정
- markTimespan이 있는 영역에서 더블 클릭 시 *scheduler.config.dblclick_create* 설정 준수
- *scheduler.ignore_timeline* 활성화 시 타임라인에서 `onXScaleClick` 인자 오류 수정
- 브라우저 확대 사용 시 레이아웃 정렬 문제 개선
- 무시된 열 및 Year view 표시 문제 수정
- 멀티터치 스크린 오류 해결
- 모바일 기기에서 키보드 포커스 동작 개선
- 일광 절약 시간제(DST) 관련 다양한 문제 수정
- 월별 타임라인에서 31일에 예약된 이벤트가 정상적으로 표시되도록 수정
- `addEventNow`가 새로 생성된 이벤트의 ID를 반환하도록 수정
- scheduler 컨테이너가 DOM에서 제거될 때 `window.onresize` 처리 문제 수정

## 4.3.25

<span class='release_date'>2016년 3월 3일. 버그 수정 릴리즈</span>

### Fixes

- Day, Week, Units 보기의 다중일 영역에서 탭 및 더블탭이 트리거되도록 터치 지원이 향상되었습니다.
- 터치 드래그 시작 시 이벤트가 사라지는 회귀 문제가 수정되었습니다.
- Timeline에서 무시된 열이 설정된 경우 onYScaleClick 콜백이 올바르게 동작하도록 수정했습니다.
- Timeline에서 드래그 앤 드롭 취소 후 이벤트 객체 상태가 올바르게 유지되도록 수정했습니다.
- Tree Timeline의 폴더 항목에 *timeline_scale_class* 템플릿이 적용되었습니다.
- dataProcessor 요청이 진행 중일 때 스케줄러를 초기화하면 발생하는 JavaScript 오류를 방지했습니다.
- dataProcessor에서 autoUpdate가 비활성화된 상태에서 반복 시리즈 추가/수정 시 잘못된 상태가 발생하는 문제를 수정했습니다.
- Day 및 Week 보기에서 처음 또는 마지막 시간이 활성화된 경우 이벤트 가시성이 향상되었습니다.
- Multiday Units View에서 더블클릭으로 이벤트를 생성할 때 기본 섹션 선택이 올바르게 작동하도록 수정했습니다.
- Chrome의 버그로 인해 클릭 및 더블클릭 이벤트가 간헐적으로 동작하지 않는 문제를 해결했습니다.
- Safari에서 일광절약시간제 문제를 수정했습니다.
- 기타 사소한 수정 사항

## 4.3

<span class='release_date'>2015년 2월 4일. 소규모 업데이트</span>

1. Timeline 보기에서 "Days" 모드 추가 (PRO 버전) ([details](views/timeline.md#daysmodedetails))
2. Units 보기에서 여러 날짜에 걸친 단위 표시 기능 추가 (PRO 버전) ([details](views/units.md#displayingunitsformultipledays))
3. 'expand' 확장에 대한 새로운 이벤트 도입 ([details](guides/extensions-list.md#expand))
4. Limit 확장에 새로운 옵션 추가 ([details](api/config/now_date.md), [details](guides/extensions-list.md#limit))
5. Tooltip 확장에 새로운 옵션 추가 ([details](api/config/touch_tooltip.md), [details](guides/extensions-list.md#tooltip))
6. URL 확장을 사용하여 이벤트 연결 가능 ([details](guides/extensions-list.md#url))
7. 일광절약시간제 관련 문제 수정
8. Timeline 보기에서 터치 기기로 새 이벤트 생성 시 발생하는 문제 해결
9. Week Agenda, Grid View, Timeline view, Units View, Multisection 이벤트 추가 (PRO 버전) ([details](views/weekagenda.md), [details](views/grid.md), [details](views/timeline.md), [details](views/units.md), [details](api/config/multisection.md))

## 4.2

<span class='release_date'>2014년 11월 12일. 소규모 업데이트</span>

1. 반복 이벤트 폼 레이아웃 사용자 정의 기능 추가 ([details](guides/recurring-events.md#custom-control-for-the-lightboxs-recurring-block))
2. DataProcessor에 REST 모드와 JSON 응답 지원 추가 ([details](guides/server-integration.md#rest-json-mode))
3. 다중 섹션 이벤트의 드래그 앤 드롭 개선 (PRO 버전) ([details](api/config/multisection_shift_all.md))
4. Ajax 및 서버 오류 처리를 위한 API 이벤트 추가 ([details](api/event/onloaderror.md))
5. Timeline 보기 성능 향상
6. 렌더링 지연 옵션 추가 ([details](api/config/delay_render.md))
7. iCal 및 Excel로의 데이터 내보내기 개선 ([details](export/excel.md))
8. DHTMLX Suite 4.0과의 호환성 문제 수정
9. 기타 사소한 수정 사항

## 4.1

<span class='release_date'>2014년 6월 13일. 소규모 업데이트</span>

1. 새로운 "Flat" 스킨 도입 ([details](guides/skins.md#flat-skin))
2. Timeline 및 Units 보기에서 이벤트를 여러 섹션에 할당 가능 (PRO 버전) ([details](views/timeline.md#assignmentofeventstoseveralsections), [details](views/units.md#assigningeventstoseveralunits))
3. Month 보기에서 다중일 이벤트를 드래그 앤 드롭으로 크기 조정 가능 ([details](views/month.md#resizingeventsbydragndropver4141))
4. 스케줄러 간 드래그 앤 드롭 기능 추가 ([details](guides/drag-between.md#drag-events))
5. PNG 형식의 데이터 내보내기 기능 추가 ([details](export/png.md))
6. PDF로 데이터 내보내기 위한 새로운 메서드 도입 ([details](export/pdf.md))
7. 드래그 중 시간 스케일에 이벤트 지속시간 강조 표시 ([details](api/config/drag_highlight.md))
8. Grid 보기에서 스크롤 시간 간격 변경 가능 (PRO 버전) ([details](views/grid.md#activatingnavigation))
9. Timeline 보기의 가시 영역 밖으로 이벤트 드래그 방지 옵션 추가 ([details](api/config/limit_drag_out.md))
10. Windows 터치 기기에서의 버그 수정
11. 다양한 시간대에서 샘플이 올바르게 동작하도록 업데이트

## <b>4.0</b>

<span class='release_date'>2013년 7월 2일. 주요 업데이트</span>

1. 특정 일 또는 시간을 제거할 수 있는 유연한 시간 스케일 추가 ([details](guides/custom-scales.md))
2. Month 보기에서 "더 많은 이벤트" 링크 지원 ([details](views/month.md#limitingthenumberofeventsinacell))
3. jQuery 통합 ([details](integrations/other/jquery-integration.md))
4. Backbone 통합 ([details](integrations/legacy/backbone-integration.md))
5. 기본 스킨을 "terrace"로 변경; 다중일 이벤트가 기본적으로 표시됨
6. 반복 이벤트의 대체 시작일 로직 추가 ([details](api/config/repeat_precise.md))
7. .Net 웹 서비스에서 JSON 데이터 로드 지원
8. 문서 대폭 개선

## 3.7

<span class='release_date'>2013년 2월 20일. 소규모 업데이트</span>

1. 태블릿 및 터치 모니터를 위한 터치 지원 추가 ([details](guides/touch-support.md))
2. 루마니아어 로케일 추가

## 3.6

<span class='release_date'>2012년 12월 3일. 소규모 업데이트</span>

1. Windows 8 에디션 도입
2. lightbox 폼의 날짜 형식 설정 확장
3. Timeline 보기에서 서브데이 네비게이션 추가
4. Timeline 보기에서 사용자 정의 정렬 기능 추가
5. PDF로 다중 페이지 내보내기 기능 추가 ([details](export/pdf-multi.md))

## 3.5

<span class='release_date'>2012년 8월 24일. 소규모 업데이트</span>

1. 한 페이지에 여러 스케줄러 표시 가능 ([details](guides/multiple-per-page.md))
2. Connectors에서 JSON 직접 로딩 지원 ([details](guides/server-integration.md#json-mode))
3. 사용자 정의 이벤트 렌더링 개선 ([details](guides/custom-events-display.md))
4. Timeline 보기에서 드래그, 크기 조정, 이벤트 높이 조절 기능 강화
5. 새로운 'dhx_terrace' 스킨 도입 ([details](guides/skins.md#contrast-white-skin))
6. 날짜 차단을 위한 새로운 옵션 추가 ([details](guides/limits.md#how-to-block-certain-dates))
7. 시간 간격 표시 기능 추가 ([details](guides/limits.md#how-to-mark-certain-dates))
8. 시간 간격 강조 표시 기능 추가 ([details](api/method/marktimespan.md))
9. 새로운 API 메서드 추가: updateView, showEvent, getRenderedEvent, getActionData ([details](api/method/updateview.md), [details](api/method/showevent.md), [details](api/method/getrenderedevent.md), [details](api/method/getactiondata.md))
10. JSMessage 포함
11. Grid view 추가 (PRO 버전) ([details](views/grid.md))
12. 새로운 구성 옵션 도입
13. lightbox 섹션 객체 접근 간소화 ([details](api/method/formsection.md))
14. 'CTRL+C', 'CTRL+X', 'CTRL+V' 키보드 명령 지원 ([details](guides/keyboard-navigation.md))

## <b>3.0</b>

<span class='release_date'>2011년 7월 27일. 주요 업데이트</span>

1. WeekAgenda 보기 추가 (PRO 버전) ([details](views/weekagenda.md))
2. 넷북에 최적화된 lightbox 폼 도입 ([details](guides/lightbox-editors-manipulations.md#types-of-lightbox))
3. 연쇄 이벤트 표시 기능 추가 ([details](api/config/cascade_event_display.md))
4. 이벤트 색상 지정 간소화 ([details](guides/custom-events-color.md))
5. 상세 정보 폼의 드래그 앤 드롭 지원
6. 상세 정보 폼에 사용자 정의 버튼 추가 ([details](guides/changing-lightbox-buttons.md))
7. Day 및 Week 보기에서 현재 시간 표시 마커 추가
8. Timeline 보기에서 다중 행 헤더 지원
9. 근무 시간 한계 설정 가능 ([details](guides/collisions.md#activating-the-monitoring-for-collisions))
10. lightbox 값 접근을 위한 API 제공 ([details](guides/lightbox-editors-manipulations.md))

## 2.3

<span class='release_date'>2010년 8월 30일. 소규모 업데이트</span>

### 주요 변경 사항

1. Map 보기 추가 ([details](views/map.md))
2. Timeline 보기의 Cell 모드 도입 (PRO 버전) ([details](views/timeline.md#viewmodes))
3. Timeline 보기의 Tree 모드 도입 (PRO 버전) ([details](views/timeline.md#viewmodes))
4. 모든 보기에서 툴팁 지원 ([details](guides/tooltips.md))
5. Timeline 모드에서 더블클릭 또는 드래그 앤 드롭으로 새 이벤트 생성 지원
6. Timeline 모드에서 이벤트 드래그 앤 드롭 이동 지원
7. 외부 드래그 앤 드롭으로 새 이벤트 생성 지원 ([details](integrations/legacy/dhtmlx-dnd.md))

### 사소한 변경 사항

- 주 번호 형식 옵션 추가 ([details](guides/settings-format.md))
- full_day 구성 옵션 추가 ([details](guides/custom-details-form.md))
- event_duration 및 auto_end_date 구성 옵션 추가 ([details](guides/custom-details-form.md))
- 상세 정보 폼에 다중 선택 섹션 추가 ([details](guides/custom-details-form.md))
- 상세 정보 폼에 체크박스, 콤보, 라디오 섹션 추가 ([details](guides/custom-details-form.md))
- 반복 이벤트 충돌 방지 기능 추가
- 타임라인 관련 핸들러에 추가 파라미터 지원
- 미니캘린더 확장 API 확장 ([details](guides/minicalendar.md))
- 사용자 정의 폼 구현 간소화 ([details](guides/custom-details-form.md))

### 버그 수정 및 개선 사항

- 특정 iCal 데이터 소스 처리 오류 수정
- 겹치는 이벤트 렌더링 문제 수정

## 2.2

<span class='release_date'>2010년 4월 14일. 소규모 업데이트</span>

### 주요 변경 사항

1. XML, iCal, JSON 내보내기 기능 추가 ([details](export/serialization.md))
2. PDF 내보내기 기능 추가 ([details](export/pdf.md))
3. JSON 데이터 로딩 지원 ([details](guides/data-formats.md))
4. 'Collision detection' 확장 추가 ([details](guides/collisions.md))
5. 'Date-scale limitation' 확장 추가 ([details](guides/collisions.md#activating-the-monitoring-for-collisions))
6. 미니캘린더 확장 추가 ([details](guides/minicalendar.md))
7. Timeline 보기 추가 ([details](views/timeline.md))
8. 서버에서 옵션 리스트 자동 가져오기 지원 ([details](guides/select.md#populating-the-control-with-data))

### 사소한 변경 사항

- 단축키 및 일부 요소 크기 설정 가능
- Units 보기에서 단계별 스크롤 지원 (PRO 버전) ([details](views/units.md#scrollingunits))
- 아랍어, 헝가리어, 인도네시아어, 폴란드어, 슬로베니아어 로케일 추가 ([details](guides/localization.md#included-locales))
- 18개의 신규 샘플 추가

### 버그 수정 및 개선 사항

- 다양한 시간 이동 관련 버그 수정
- Agenda 보기에서 반복 이벤트 문제 해결
- Year 보기에서 반복 이벤트 문제 해결

## 2.1

<span class='release_date'>2009년 12월 2일. 소규모 업데이트</span>

### 주요 변경 사항

1. Agenda 보기 추가 ([details](views/agenda.md))
2. Year 보기 추가 ([details](views/year.md))
3. 여러 개의 소규모 확장 추가
4. 스케줄러용 스킨 빌더 도입
5. 샘플 수 두 배로 증가

### 전체 업데이트 목록

+ agenda view 추가  
+ year view 추가  
+ 소규모 확장 기능 추가  
+ @onEventSave 이벤트가 추가됨  
+ @onSchedulerResize 이벤트가 도입됨  
+ 핀란드어와 네덜란드어 로케일 지원  
+ 중국어 로케일 추가  
+ 스케줄러에 포르투갈어 번역 포함  
+ @time_picker 템플릿 사용 가능  
+ @event_date 템플릿 도입  
+ 다중 주 이벤트의 레이아웃 문제 수정 (#808)  
+ IE6에서의 에디터 렌더링 문제 수정  
+ 복잡한 동적 패턴에서 이벤트 바 크기 수정  
+ 비가시 이벤트에서 js 명령 실행 시 오류 해결  
+ @time_step이 문자열로 정의된 경우 처리 방식 수정 (#788)  
+ IE에서 불필요한 스크롤 제거 (#776)  
+ 주 스케일 레이블의 종료 날짜 수정 (#621)  
+ 항목 추가 시 드래그 문제 수정 (#782)  
+ unit view 내 다중 일 이벤트 배치 개선 (#784)  
+ 종료 날짜가 시작 날짜보다 이전으로 설정되는 것 방지 (#781)  
+ 알 수 없는 CSS 처리 문제 수정  
+ Chrome 및 Safari에서 외곽선 표시 수정  
+ 스크롤 가능한 페이지에서 lightbox 위치 문제 수정  
+ 하계|동계 시간 전환 문제 해결  
+ 이벤트 삭제 또는 추가 시 multi_day 영역 렌더링 문제 수정  
+ 편집 모드에서 크기 조정 후 반복 보기 문제 해결  
+ "onClick" 이벤트가 비활성화된 경우 이벤트 에디터가 닫히지 않는 문제 수정 (#617)  
+ 문자열을 날짜로 변환할 때 12AM 처리 방식 수정  

## <b>2.0</b> 

<span class='release_date'>2009년 7월 20일. 주요 업데이트</span>

### 주요 변경 사항

1. [Recurring events](guides/recurring-events.md) 지원 추가 
2. [Units view](views/units.md) 생성 기능 도입 (PRO 버전) 
3. 다중 일 이벤트가 Day 및 Week 모드에서 표시됨 (@scheduler.config.multi_day = true;) 
4. Month view가 데이터 오버플로를 방지하도록 자동 크기 조정 가능 
5. 커스텀 뷰 생성 지원 추가 

## <b>1.0</b> 

<span class='release_date'>2009년 5월 20일. 최초 릴리스</span>

- Day/Week/Month 뷰 포함  
- 드래그 앤 드롭 기능 지원  
- Ajax 지원 웹 API 사용 가능
