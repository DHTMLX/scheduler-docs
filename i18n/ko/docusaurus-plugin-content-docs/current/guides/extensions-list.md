---
title: "전체 확장 기능 목록"
sidebar_label: "전체 확장 기능 목록"
---

# 전체 확장 기능 목록 

dhtmlxScheduler는 기본 기능을 확장하는 다양한 확장 기능을 제공합니다.

확장 기능을 활성화하려면 [scheduler.plugins](api/method/plugins.md) 메서드를 사용하여 활성화하세요.

:::info
v6.0부터 확장 기능 코드 파일이 **ext** 폴더에서 제거되고 *dhtmlxscheduler.js* 파일에 통합되었습니다. 

dhtmlxScheduler 5.3 이하 버전을 사용하는 경우 [마이그레이션 가이드](migration.md#53---60)를 참조하세요.
:::

## Active Links {#active-links}

Month 및 Week 뷰에서 일자 숫자를 클릭 가능한 링크로 표시하며, 이를 클릭하면 선택한 뷰에서 해당 날짜가 열립니다.

~~~js
scheduler.plugins({
    active_links: true
});
~~~

#### 관련 자료

문서: ["Month View"](views/month.md#presentingdaysnumbersasclickablelinks)


API: [active_link_view](api/config/active_link_view.md) 


[Month days as links](https://docs.dhtmlx.com/scheduler/samples/03_extensions/06_links_plugin.html)


## Agenda View {#agenda-view} 

Agenda 뷰를 위한 코드 파일입니다.

~~~js
scheduler.plugins({
    agenda_view: true
});
~~~

#### 관련 자료

문서: ["아젠다 뷰"](views/agenda.md) 


[Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)


## All Timed {#all-timed} 

여러 날에 걸친 이벤트를 단일 날짜 이벤트와 동일한 스타일로 표시합니다.

~~~js
scheduler.plugins({
    all_timed: true
});
~~~

#### 관련 자료

API: [all_timed](api/config/all_timed.md) 


[Displaying multi-day events in the regular way](https://docs.dhtmlx.com/scheduler/samples/03_extensions/26_multi_day_visible.html)


## Collision {#collision} 

동일한 시간대에 발생하는 이벤트 수를 처리합니다.

~~~js
scheduler.plugins({
    collision: true
});
~~~


#### 관련 자료

문서: ["타임 슬롯에서 중복 이벤트 방지하기"](guides/collisions.md) 


[Controlling the number of events in a time slot](https://docs.dhtmlx.com/scheduler/samples/03_extensions/15_collision.html)


## Container Autoresize {#container-autoresize} 

스케줄러 컨테이너의 크기를 콘텐츠에 맞게 자동으로 조정합니다.

~~~js
scheduler.plugins({
    container_autoresize: true
});
~~~

#### 관련 자료

문서: ["dhtmlxScheduler를 순수 JS/HTML에서 사용하기"](guides/initialization.md#scheduler-autoresizing)


API: [container_autoresize](api/config/container_autoresize.md) 


[Autoresizing the scheduler container](https://docs.dhtmlx.com/scheduler/samples/03_extensions/28_container_autoresize.html)


## Cookie {#cookie} 

쿠키를 사용하여 현재 스케줄러 상태(모드 및 날짜)를 저장합니다.

~~~js
scheduler.plugins({
    cookie: true
});
~~~

#### 관련 자료

[Work with cookies](https://docs.dhtmlx.com/scheduler/samples/03_extensions/08_cookies_plugin.html)


## Daytimeline {#daytimeline} 

:::info
이 확장 기능은 PRO 버전에서만 사용 가능합니다.
:::

Timeline 뷰에 "Days" 모드를 제공합니다.

~~~js
scheduler.plugins({
    daytimeline: true
});
~~~


#### 관련 자료

문서: ["타임라인 뷰"](views/timeline.md)


[Days as Timeline rows](https://docs.dhtmlx.com/scheduler/samples/06_timeline/14_days_as_sections.html)


## Drag-n-Drop between Schedulers {#drag-n-drop-between-schedulers} 

:::info
이 확장 기능은 Scheduler PRO 버전(2021년 10월 6일 이후 Commercial, Enterprise, Ultimate 라이선스)에서만 사용 가능합니다.
:::

여러 개의 스케줄러 간에 이벤트를 드래그 앤 드롭하여 한 스케줄러에서 다른 스케줄러로 이벤트를 이동할 수 있습니다.

~~~js
scheduler.plugins({
    drag_between: true
});
~~~

#### 관련 자료

문서: [Drag-and-drop between Schedulers](guides/drag-between.md#drag-events)


## Editors {#editors}

라이트박스에서 사용되는 [radio](guides/radio.md), [combo](guides/combo.md), 
[checkbox](guides/checkbox.md) 컨트롤의 코드를 포함합니다.

~~~js
scheduler.plugins({
    editors: true
});
~~~


#### 관련 자료

문서: ["Lightbox 컨트롤"](guides/lightbox-editors.md) 


[Radio button in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/14_radio_buttons_section.html)


## Expand {#expand} 

스케줄러 오른쪽 상단에 "확장" 아이콘을 추가합니다. 클릭 시 스케줄러가 원래 크기와 전체 화면 모드 사이에서 전환됩니다.

~~~js
scheduler.plugins({
    expand: true
});
~~~


#### 관련 자료

API: [expand](api/method/expand.md), [collapse](api/method/collapse.md) 


이벤트: [onBeforeExpand](api/event/onbeforeexpand.md), [onBeforeCollapse](api/event/onbeforecollapse.md), [onExpand](api/event/onexpand.md), [onCollapse](api/event/oncollapse.md)
 

[Full-screen view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/05_expand_plugin.html)


## Export service {#export-service} 

온라인 내보내기 서비스를 활성화합니다.

~~~js
scheduler.plugins({
    export_api: true
});
~~~

#### 관련 자료

문서: ["Export to PDF"](export/pdf.md) , ["Export to PNG"](export/png.md)


[Export to PDF/PNG](https://docs.dhtmlx.com/scheduler/samples/04_export/06_online_export.html)


## Grid View {#grid-view}

:::info
이 확장 기능은 PRO 버전에서만 사용 가능합니다.
:::

Grid 뷰를 위한 코드 파일입니다.

~~~js
scheduler.plugins({
    grid_view: true
});
~~~


#### 관련 자료

문서: ["Grid View"](views/grid.md)


[Grid view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/27_grid_view.html)


## HTML Templates {#html-templates} 

HTML 코드를 사용하여 템플릿을 정의할 수 있습니다.

~~~js
scheduler.plugins({
    html_templates: true
});
~~~

#### 관련 자료

문서: [Templates](guides/templates.md#specifying-templates-via-markup)


[Specifying templates with HTML](https://docs.dhtmlx.com/scheduler/samples/03_extensions/09_html_templates_plugin.html)


## Keyboard Navigation {#keyboard-navigation} 

키보드를 사용한 내비게이션을 활성화합니다.

~~~js
scheduler.plugins({
    key_nav: true
});
~~~

#### 관련 자료

문서: ["키보드 내비게이션"](guides/keyboard-navigation.md)


[Keyboard Navigation and WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)


[Keyboard navigation in the scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/07_navigation_plugin.html)


## Legacy {#legacy} 

더 이상 사용되지 않는 API 지원을 활성화합니다.

~~~js
scheduler.plugins({
    legacy: true
});
~~~

#### 관련 자료

문서: ["Migration From Older Versions"](migration.md)


## Limit {#limit} 

특정 날짜를 차단 및 강조 표시할 수 있는 옵션을 제공합니다.

~~~js
scheduler.plugins({
    limit: true
});
~~~

#### 관련 자료

문서: ["Blocking and Marking Dates"](guides/limits.md)


[Limiting dates for creating events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/16_limitation.html)


## Map View {#map-view}

Map 뷰를 위한 코드 파일입니다.

~~~js
scheduler.plugins({
    map_view: true
});
~~~

#### 관련 자료

문서: ["Map View"](views/map.md)


[Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/19_map_view.html)


## Mini Calendar (Date Picker) {#mini-calendar-date-picker} 

미니 캘린더를 추가하는 플러그인입니다.

~~~js
scheduler.plugins({
    minical: true
});
~~~

#### 관련 자료

문서: ["미니 캘린더(날짜 선택기)"](guides/minicalendar.md), ["시간 및 날짜"](guides/time.md#mini-calendar-in-the-lightbox)


[Mini calendar in the scheduler header](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)


## Multisection {#multisection} 

:::info
이 확장 기능은 PRO 버전에서만 사용 가능합니다.
:::

Timeline 뷰에서 여러 구역 또는 Units 뷰에서 여러 유닛에 이벤트를 할당할 수 있습니다.

~~~js
scheduler.plugins({
    multisection: true
});
~~~

#### 관련 자료

문서: ["타임라인 뷰"](views/timeline.md#assignmentofeventstoseveralsections), ["Units View"](views/units.md#assigningeventstoseveralunits)


API: [multisection](api/config/multisection.md)


[Multisection events in Timeline and Units view](https://docs.dhtmlx.com/scheduler/samples/12_multisection_events/01_multisection_events.html)


## Multiselect {#multiselect} 

라이트박스에서 [multiselect](guides/multiselect.md) 컨트롤을 지원합니다.

~~~js
scheduler.plugins({
    multiselect: true
});
~~~

#### 관련 자료

문서: ["Lightbox 컨트롤"](guides/lightbox-editors.md)


[Multiselect control in the lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/21_multiselect_options.html)


## Multisource {#multisource} 

여러 소스에서 데이터를 불러올 수 있도록 지원합니다.

~~~js
scheduler.plugins({
    multisource: true
});
~~~

#### 관련 자료

문서: ["데이터 불러오기"](guides/loading-data.md#loadingdatafrommultiplesources)


[Loading data from multiple sources](https://docs.dhtmlx.com/scheduler/samples/03_extensions/13_multisource.html)


## Outerdrag {#outerdrag} 

dhtmlxTree와 같은 외부 DHTMLX 컴포넌트에서 이벤트를 드래그할 수 있습니다.

~~~js
scheduler.plugins({
    outerdrag: true
});
~~~


#### 관련 자료

문서: ["드래그 앤 드롭(Drag-and-Drop) 작업"](guides/drag-between.md)


[Integration with dhtmlxTree](https://docs.dhtmlx.com/scheduler/samples/10_integration/02_dhtmlxtree_outer_drag.html)


## PDF {#pdf}

PDF 문서로 내보내기를 지원합니다.

- [Export to PDF (version 4.0)](export/pdf-legacy.md)

- [Export to PDF (version 4.1+)](["Export to PDF"](export/pdf.md))


## Quick Info {#quick-info} 

이벤트 세부 정보를 표시하는 팝업을 제공합니다.

~~~js
scheduler.plugins({
    quick_info: true
});
~~~


#### 관련 자료

문서: ["Mobile Responsive Scheduler"](guides/touch-support.md)


[Touch-oriented scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/29_quick_info.html)


## Readonly {#readonly} 

라이트박스 및 특정 이벤트에 대해 읽기 전용 모드를 활성화합니다.

~~~js
scheduler.plugins({
    readonly: true
});
~~~


#### 관련 자료

문서: ["읽기 전용 모드"](guides/readonly.md)


[Read-only lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)


## Recurring {#recurring}

반복 이벤트 지원을 추가합니다.

~~~js
scheduler.plugins({
    recurring: true
});
~~~


#### 관련 자료

문서: ["반복 이벤트"](guides/recurring-events.md)


[Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)
 

## Recurring Legacy {#recurring-legacy} 

반복 이벤트에 대한 레거시 지원입니다.

~~~js
scheduler.plugins({
    recurring_legacy: true
});
~~~

#### 관련 자료

문서: ["Recurring Events (v7.1 이하)"](guides/recurring-events-legacy.md)


## Serialize {#serialize} 

ICal, XML, JSON 형식으로 데이터 직렬화를 지원합니다.

~~~js
scheduler.plugins({
    serialize: true
});
~~~


#### 관련 자료

문서: ["데이터 직렬화: XML, JSON, iCal"](export/serialization.md)


 

[Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)


## Timeline {#timeline} 

:::info
이 확장 기능은 PRO 버전에서만 사용 가능합니다.
:::

Timeline 뷰 플러그인입니다.

~~~js
scheduler.plugins({
    timeline: true
});
~~~


#### 관련 자료

문서: ["타임라인 뷰"](views/timeline.md)


[Bar mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/02_lines.html)


## Tooltip {#tooltip} 

이벤트에 툴팁을 활성화합니다.

~~~js
scheduler.plugins({
    tooltip: true
});
~~~


#### 관련 자료

문서: ["툴팁 (Tooltips)"](guides/tooltips.md)


[Tooltips](https://docs.dhtmlx.com/scheduler/samples/03_extensions/20_tooltip.html)


## Treetimeline {#treetimeline} 

:::info
이 확장 기능은 PRO 버전에서만 사용 가능합니다.
:::

Timeline 뷰에 "Tree" 모드를 제공합니다.

~~~js
scheduler.plugins({
    treetimeline: true
});
~~~


#### 관련 자료

문서: ["타임라인 뷰"](views/timeline.md)


[Tree mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/03_tree.html)


## Units {#units} 

:::info
이 확장 기능은 PRO 버전에서만 사용 가능합니다.
:::

Units 뷰 확장 기능입니다.

~~~js
scheduler.plugins({
    units: true
});
~~~


#### 관련 자료

문서: ["Units View"](views/units.md)


[Units view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/02_units_view.html)


## URL {#url} 

스케줄러의 상태(날짜, 이벤트 ID, 뷰)를 URL에 저장합니다.

예시: 
~~~js
<code>10_url_date_plugin.html#date=2014-08-01,mode=month</code> 
또는 
<code>10_url_date_plugin.html#event="15"</code>
~~~

~~~js
scheduler.plugins({
    url: true
});
~~~


#### 관련 자료

[Saving the scheduler state in URL](https://docs.dhtmlx.com/scheduler/samples/03_extensions/10_url_date_plugin.html)


## Week Agenda {#week-agenda}

:::info
이 확장 기능은 PRO 버전에서만 사용 가능합니다.
:::

Week Agenda 뷰를 위한 코드 파일입니다.

~~~js
scheduler.plugins({
    week_agenda: true
});
~~~


#### 관련 자료

문서: ["Week Agenda View"](views/weekagenda.md)


[WeekAgenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/24_week_agenda.html)


## Year {#year}

Year 뷰를 위한 코드 파일입니다.

~~~js
scheduler.plugins({
    year_view: true
});
~~~

#### 관련 자료

문서: ["Year View"](views/year.md)


[Year view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/04_year_view.html)
