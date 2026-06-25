---
title: "확장 기능 전체 목록"
sidebar_label: "확장 기능 전체 목록"
---

# 확장 기능 전체 목록

dhtmlxScheduler에는 표준 동작에 기능을 추가하는 여러 확장 기능이 포함되어 있습니다.

확장 기능을 사용하려면 [`plugins()`](api/method/plugins.md) 메서드로 활성화합니다.

:::info
v6.0 버전에서 확장 기능 코드 파일은 스케줄러 코드베이스의 **ext** 폴더에서 제거되었고 *dhtmlxscheduler.js* 파일에 포함되었습니다.

dhtmlxScheduler 5.3 및 그 이전 버전의 경우, [마이그레이션 문서](migration.md#53---60)를 확인하십시오.
:::

## 활성 링크 (Active Links)

월 보기와 주 보기에서 날짜 수를 클릭 가능한 링크로 표시하여 지정된 보기에서 관련 날짜를 엽니다.

~~~js
scheduler.plugins({
    active_links: true
});
~~~

#### 관련 자료

문서: [월 보기](views/month.md)

API: [active_link_view](api/config/active_link_view.md)

샘플: [링크로 표시된 월 일수](https://docs.dhtmlx.com/scheduler/samples/03_extensions/06_links_plugin.html)

## 아젠다 뷰 (Agenda View)

Agenda 뷰의 코드 파일.

~~~js
scheduler.plugins({
    agenda_view: true
});
~~~

#### 관련 자료

문서: [아젠다 뷰](views/agenda.md)

샘플: [아젠다 뷰](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)

## All Timed

다일 다중 이벤트를 일반적인 방식으로 표시합니다(일일 이벤트는 이미 표시되는 방식으로 표시됩니다).

~~~js
scheduler.plugins({
    all_timed: true
});
~~~

#### 관련 자료

API: [all_timed](api/config/all_timed.md)

샘플: [다중 날짜 이벤트를 일반 방식으로 표시](https://docs.dhtmlx.com/scheduler/samples/03_extensions/26_multi_day_visible.html)

## 충돌 관리 (Collision)

시간 슬롯 내 이벤트 수를 관리합니다.

~~~js
scheduler.plugins({
    collision: true
});
~~~

#### 관련 자료

문서: [타임 슬롯에서 이중 이벤트 방지](guides/collisions.md)

샘플: [타임 슬롯 내 이벤트 수 제어](https://docs.dhtmlx.com/scheduler/samples/03_extensions/15_collision.html)

## 컨테이너 자동 크기 조정 (Container Autoresize)

스케줄러 컨테이너에 대한 자동 리사이즈를 활성화합니다(콘텐츠에 맞춰 크기가 변경됨).

~~~js
scheduler.plugins({
    container_autoresize: true
});
~~~

#### 관련 자료

문서: [dhtmlxScheduler를 Plain JS/HTML에서 사용하기](guides/initialization.md#scheduler-autoresizing)

API: [container_autoresize](api/config/container_autoresize.md)

샘플: [스케줄러 컨테이너의 자동 크기 조정](https://docs.dhtmlx.com/scheduler/samples/03_extensions/28_container_autoresize.html)

## 쿠키 (Cookie)

스케줄러의 현재 상태(모드 및 날짜)를 쿠키에 저장합니다.

~~~js
scheduler.plugins({
    cookie: true
});
~~~

#### 관련 자료

샘플: [쿠키로 작업하기](https://docs.dhtmlx.com/scheduler/samples/03_extensions/08_cookies_plugin.html)

## Daytimeline

:::note
이 확장 기능은 PRO 버전에서만 사용할 수 있습니다.
:::

타임라인 뷰의 "Days" 모드에 대한 코드 파일.

~~~js
scheduler.plugins({
    daytimeline: true
});
~~~

#### 관련 자료

문서: [타임라인 뷰](views/timeline.md)

샘플: [일을 타임라인 행으로 표시](https://docs.dhtmlx.com/scheduler/samples/06_timeline/14_days_as_sections.html)

## Scheduler 간 드래그 앤 드롭 (Drag-n-Drop between Schedulers)

:::info
이 확장 기능은 Scheduler PRO 버전(상용(2021년 10월 6일 이후), Enterprise 및 Ultimate 라이선스)에서만 사용할 수 있습니다.
:::

여러 스케줄러 간에 드래그 앤 드롭 작업을 가능하게 하며, 한 스케줄러에서 다른 스케줄러로 이벤트를 드래그하거나 그 반대를 수행할 수 있습니다.

~~~js
scheduler.plugins({
    drag_between: true
});
~~~

#### 관련 자료

문서: [다중 스케줄러 간 드래그 앤 드롭](guides/drag-between.md)

## 편집기 (Editors)

라이트박스의 [라디오](guides/radio.md), [콤보](guides/combo.md), [체크박스](guides/checkbox.md) 컨트롤용 코드 파일.

~~~js
scheduler.plugins({
    editors: true
});
~~~

#### 관련 자료

문서: [라이트박스 편집자](guides/lightbox-editors.md)

샘플: [라이트박스의 라디오 버튼](https://docs.dhtmlx.com/scheduler/samples/02_customization/14_radio_buttons_section.html)

## 확장 (Expand)

스케줄러의 오른쪽 구석에 "expand" 아이콘을 추가합니다. 이 아이콘을 클릭하면 스케줄러의 크기가 원래 크기에서 '전체 화면'으로, 다시 원래 크기로 변경됩니다.

~~~js
scheduler.plugins({
    expand: true
});
~~~

#### 관련 자료

API: [`expand()`](api/method/expand.md), [`collapse()`](api/method/collapse.md)

이벤트: [onBeforeExpand](api/event/onbeforeexpand.md), [onBeforeCollapse](api/event/onbeforecollapse.md), [onExpand](api/event/onexpand.md), [onCollapse](api/event/oncollapse.md)

샘플: [전체 화면 뷰](https://docs.dhtmlx.com/scheduler/samples/03_extensions/05_expand_plugin.html)

## Export 서비스 (Export service)

온라인 내보내기 서비스를 활성화할 수 있는 가능성을 제공합니다.

~~~js
scheduler.plugins({
    export_api: true
});
~~~

#### 관련 자료

문서: [PDF로 내보내기](export/pdf.md), [PNG로 내보내기](export/png.md)

샘플: [PDF/PNG로 내보내기](https://docs.dhtmlx.com/scheduler/samples/04_export/06_online_export.html)

## Grid 뷰 (Grid View)

:::info
이 확장 기능은 PRO 버전에서만 사용할 수 있습니다.
:::

그리드 뷰 코드 파일.

~~~js
scheduler.plugins({
    grid_view: true
});
~~~

#### 관련 자료

문서: [그리드 뷰](views/grid.md)

샘플: [그리드 뷰](https://docs.dhtmlx.com/scheduler/samples/03_extensions/27_grid_view.html)

## HTML 템플릿 (HTML Templates)

HTML 코드로 템플릿 정의를 허용합니다.

~~~js
scheduler.plugins({
    html_templates: true
});
~~~

#### 관련 자료

문서: [Templates](guides/templates.md#specifying-templates-with-code)

샘플: [HTML로 템플릿 지정](https://docs.dhtmlx.com/scheduler/samples/03_extensions/09_html_templates_plugin.html)

## 키보드 네비게이션 (Keyboard Navigation)

키보드 네비게이션을 활성화합니다.

~~~js
scheduler.plugins({
    key_nav: true
});
~~~

#### 관련 자료

문서: [Keyboard Navigation](guides/keyboard-navigation.md)

샘플: [키보드 네비게이션 및 WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)

샘플: [스케줄러의 키보드 네비게이션](https://docs.dhtmlx.com/scheduler/samples/03_extensions/07_navigation_plugin.html)

## 레거시 (Legacy)

더 이상 사용되지 않는 API를 활성화합니다.

~~~js
scheduler.plugins({
    legacy: true
});
~~~

#### 관련 자료

문서: [이전 버전에서의 마이그레이션](migration.md)

## 제한 (Limit)

날짜 차단 및 하이라이팅 기능을 제공합니다.

~~~js
scheduler.plugins({
    limit: true
});
~~~

#### 관련 자료

문서: [날짜 차단 및 표시](guides/limits.md)

샘플: [이벤트 생성을 위한 날짜 제한](https://docs.dhtmlx.com/scheduler/samples/03_extensions/16_limitation.html)

## 맵 뷰 (Map View)

맵 뷰 코드 파일.

~~~js
scheduler.plugins({
    map_view: true
});
~~~

#### 관련 자료

문서: [맵 뷰](views/map.md)

샘플: [맵 뷰](https://docs.dhtmlx.com/scheduler/samples/03_extensions/19_map_view.html)

## 미니 달력(날짜 선택기) (Mini Calendar (Date Picker))

미니 달력용 플러그인.

~~~js
scheduler.plugins({
    minical: true
});
~~~

#### 관련 자료

문서: [미니 달력(날짜 선택기)](guides/minicalendar.md), [시간과 날짜](guides/time.md#mini-calendar-in-the-lightbox)

샘플: [스케줄러 헤더의 미니 달력](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)

## 다중 섹션 (Multisection)

:::info
이 확장 기능은 PRO 버전에서만 사용할 수 있습니다.
:::

타임라인 뷰에서 여러 섹션에 이벤트를 할당하거나 단위 뷰에서 여러 유닛에 이벤트를 배치할 수 있는 기능을 제공합니다.

~~~js
scheduler.plugins({
    multisection: true
});
~~~

#### 관련 자료

문서: [타임라인 뷰](views/timeline.md), [유닛 뷰](views/units.md)

API: [multisection](api/config/multisection.md)

샘플: [타임라인 및 유닛 뷰의 다중 섹션 이벤트](https://docs.dhtmlx.com/scheduler/samples/12_multisection_events/01_multisection_events.html)

## 다중 선택 (Multiselect)

라이트박스의 [multiselect](guides/multiselect.md) 컨트롤용 플러그인.

~~~js
scheduler.plugins({
    multiselect: true
});
~~~

#### 관련 자료

문서: [라이트박스 편집자](guides/lightbox-editors.md)

샘플: [라이트박스의 다중 선택 컨트롤](https://docs.dhtmlx.com/scheduler/samples/03_extensions/21_multiselect_options.html)

## 다중 소스 (Multisource)

여러 소스에서 데이터를 불러올 수 있는 기능을 제공합니다.

~~~js
scheduler.plugins({
    multisource: true
});
~~~

#### 관련 자료

문서: [데이터 로딩](guides/loading-data.md#loading-data-from-multiple-sources)

샘플: [여러 소스에서 데이터 로딩](https://docs.dhtmlx.com/scheduler/samples/03_extensions/13_multisource.html)

## Outerdrag

외부 DHTMLX 컴포넌트(예: dhtmlxTree)에서 이벤트를 드래그 앤 드롭할 수 있도록 합니다.

~~~js
scheduler.plugins({
    outerdrag: true
});
~~~

#### 관련 자료

문서: [드래그 앤 드롭 작업](guides/drag-between.md)

샘플: [dhtmlxTree 외부 드래그와의 통합](https://docs.dhtmlx.com/scheduler/samples/10_integration/02_dhtmlxtree_outer_drag.html)

## PDF

PDF 문서로의 내보내기를 제공합니다.

- [PDF로 내보내기(버전 4.0)](export/pdf-legacy.md)

- [PDF로 내보내기(버전 4.1 이상)](export/pdf.md)

## 빠른 정보 (Quick Info)

이벤트 세부 정보를 담은 팝업을 제공합니다.

~~~js
scheduler.plugins({
    quick_info: true
});
~~~

#### 관련 자료

문서: [Mobile Responsive Scheduler](guides/touch-support.md)

샘플: [터치형 일정 관리기](https://docs.dhtmlx.com/scheduler/samples/03_extensions/29_quick_info.html)

## 읽기 전용(Readonly)

라이트박스 및 특정 이벤트에 대해 읽기 전용 모드를 제공합니다.

~~~js
scheduler.plugins({
    readonly: true
});
~~~

#### 관련 자료

문서: [읽기 전용 모드](guides/readonly.md)

샘플: [읽기 전용 라이트박스](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)

## 반복 (Recurring)

반복 이벤트를 지원합니다.

~~~js
scheduler.plugins({
    recurring: true
});
~~~

#### 관련 자료

문서: [반복 이벤트](guides/recurring-events.md)

샘플: [반복 이벤트](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)

## 반복(레거시) (Recurring Legacy)

반복 이벤트를 위한 레거시 엔진.

~~~js
scheduler.plugins({
    recurring_legacy: true
});
~~~

#### 관련 자료

문서: [반복 이벤트(버전 v7.1까지)](guides/recurring-events-legacy.md)

## 직렬화 (Serialize)

ICal, XML, JSON 형식으로 직렬화하는 기능을 제공합니다.

~~~js
scheduler.plugins({
    serialize: true
});
~~~

#### 관련 자료

문서: [XML, JSON, iCal로의 데이터 직렬화](export/serialization.md)

샘플: [스케줄러 이벤트 직렬화](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)

## 타임라인 (Timeline)

:::info
이 확장 기능은 PRO 버전에서만 사용할 수 있습니다.
:::

타임라인 뷰 플러그인.

~~~js
scheduler.plugins({
    timeline: true
});
~~~

#### 관련 자료

문서: [타임라인 뷰](views/timeline.md)

샘플: [막대 모드](https://docs.dhtmlx.com/scheduler/samples/06_timeline/02_lines.html)

## 툴팁 (Tooltip)

이벤트에 툴팁을 활성화합니다.

~~~js
scheduler.plugins({
    tooltip: true
});
~~~

#### 관련 자료

문서: [툴팁](guides/tooltips.md)

샘플: [툴팁](https://docs.dhtmlx.com/scheduler/samples/03_extensions/20_tooltip.html)

## 트리타임라인 (Treetimeline)

:::info
이 확장 기능은 PRO 버전에서만 사용할 수 있습니다.
:::

타임라인 뷰의 "트리" 모드에 대한 확장.

~~~js
scheduler.plugins({
    treetimeline: true
});
~~~

#### 관련 자료

문서: [타임라인 뷰](views/timeline.md)

샘플: [트리 모드](https://docs.dhtmlx.com/scheduler/samples/06_timeline/03_tree.html)

## 단위 (Units)

:::info
이 확장 기능은 PRO 버전에서만 사용할 수 있습니다.
:::

유닛 뷰 확장.

~~~js
scheduler.plugins({
    units: true
});
~~~

#### 관련 자료

문서: [유닛 뷰](views/units.md)

샘플: [유닛 뷰](https://docs.dhtmlx.com/scheduler/samples/03_extensions/02_units_view.html)

## URL

스케줄러의 상태(날짜, 이벤트의 ID, 뷰)를 URL에 저장합니다.

예:

```text
10_url_date_plugin.html#date=2027-08-01,mode=month
10_url_date_plugin.html#event=15
```

~~~js
scheduler.plugins({
    url: true
});
~~~

#### 관련 자료

샘플: [URL에 스케줄러 상태 저장](https://docs.dhtmlx.com/scheduler/samples/03_extensions/10_url_date_plugin.html)

## 주간 아젠다 (Week Agenda)

:::info
이 확장 기능은 PRO 버전에서만 사용할 수 있습니다.
:::

주간 아젠다 뷰 코드 파일.

~~~js
scheduler.plugins({
    week_agenda: true
});
~~~

#### 관련 자료

문서: [주간 아젠다 뷰](views/weekagenda.md)

샘플: [WeekAgenda 뷰](https://docs.dhtmlx.com/scheduler/samples/03_extensions/24_week_agenda.html)

## 연도 뷰 (Year)

연도 뷰 코드 파일.

~~~js
scheduler.plugins({
    year_view: true
});
~~~

#### 관련 자료

문서: [연도 뷰](views/year.md)

샘플: [연도 뷰](https://docs.dhtmlx.com/scheduler/samples/03_extensions/04_year_view.html)