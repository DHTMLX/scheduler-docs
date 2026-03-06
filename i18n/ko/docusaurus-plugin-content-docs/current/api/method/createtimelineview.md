---
sidebar_label: "createTimelineView"
title: "createTimelineView method"
description: "스케줄러에서 Timeline 뷰를 설정합니다."
---

# createTimelineView
:::info
 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 스케줄러에서 Timeline 뷰를 설정합니다.

@signature: createTimelineView: (config: any) =\> void

### Parameters

- `config` - (required) *object* - Timeline 뷰의 구성 객체

### Example

~~~jsx
// 오전 8시부터 오후 8시까지 30분 간격의 시간 스케일
scheduler.createTimelineView({
    name: "timeline",
    x_unit:    "minute",
    x_date:    "%H:%i",
    x_step:    30,
    x_size:    24,
    x_start: 16,
    x_length: 48,
    fit_events_offset: 15,
    y_unit:[    
         {key:1, label:"Section A"},
        {key:2, label:"Section B"},
        {key:3, label:"Section C"},
        {key:4, label:"Section D"}    
    ],
    y_property: "section_id",
    render:    "bar"
});
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Related samples
- [Cell mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/01_slots.html)
- [Bar mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/02_lines.html)
- [Tree mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/03_tree.html)
- [Days as Timeline rows](https://docs.dhtmlx.com/scheduler/samples/06_timeline/14_days_as_sections.html)

### Details

:::note
 이 메서드는 [timeline](guides/extensions-list.md#timeline) 플러그인이 활성화되어 있어야 합니다. 
:::


Timeline 뷰의 구성 객체는 다음 속성들을 지원합니다:

- <b>name</b>- (<i>string</i>) 뷰의 식별자입니다. 기존 Timeline 뷰와 동일한 이름을 정의하면 덮어씁니다.
- <b>render</b> - (<i>'cell', 'bar', 'tree', 'days'</i>) 뷰 모드를 정의합니다. 기본값은 'cell'입니다.
- <b>y_property</b> - (<i>string</i>) 이벤트를 특정 섹션에 연결하는 데 사용하는 데이터 속성입니다.
- <b>y_unit</b> - (<i>객체 배열</i>) 뷰 내 섹션을 정의합니다.<br> 각 객체는 다음 속성을 가진 섹션을 나타냅니다:
    - <b>children</b> - (<i>배열</i>) 'Tree' 모드에서만 사용되는 중첩 항목
    - <b>key</b> - (<i>string</i>) 섹션의 ID로, 이벤트의 속성과 매칭하여 이벤트를 할당합니다.
    - <b>label</b> - (<i>string</i>) 섹션의 표시 레이블
    - <b>open</b> - (<i>boolean</i>) 섹션이 처음에 확장되어 있는지 여부 ('Tree' 모드용)
- <b>days</b> - (<i>number</i>) Y축에 표시할 항목(일) 수로, 'Days' 모드에서만 관련 있습니다.
- <b>x_unit</b> - (<i>minute, hour, day, week, month, year</i>) X축의 단위입니다. 기본값은 'minute'입니다.
- <b>x_date</b> - (<i>string</i>) X축 날짜 형식(자세한 내용은 ["날짜 형식 지정"](guides/settings-format.md) 참고). 설정하지 않으면 [hour_date](api/config/hour_date.md) 형식을 사용합니다.
- <b>x_step</b> - (<i>number</i>) X축의 단위 <b>'x_unit'</b> 기준 스텝 크기입니다. 기본값은 1입니다.
- <b>x_start</b> - (<i>number</i>) X축에서의 오프셋으로 <b>'x_unit'</b> 단위입니다. 기본값은 0입니다.
- <b>x_size</b> - (<i>number</i>) X축 전체 길이로 <b>'x_step'</b> 개수로 표현합니다. 기본값은 24입니다.
- <b>x_length</b> - (<i>number</i>) 스케줄러 헤더의 'next' 버튼 클릭 시 스크롤되는 <b>'x_step'</b> 수입니다. 선택 사항이며 기본값은 1입니다.
이 파라미터는 약간 까다로우니 참고하세요:
    - <b>x_unit='minute'</b> 또는 <b>x_unit='hour'</b>일 때만 적용됩니다. 그렇지 않으면 생략할 수 있습니다.
    - 이 단위에서 <b>x_length</b>가 설정되지 않으면, 타임라인은 다른 스케일 파라미터(<b>x_start</b>, <b>x_step</b>, <b>x_size</b>)를 기반으로 부분적인 하루 구간을 표시하며, 일별 구간 스크롤이 가능합니다.
    - <b>x_length</b>를 설정할 경우, 'next' 버튼이 제대로 작동하도록 하루 전체를 커버하는 <b>x_steps</b> 수여야 합니다.
- <b>first_hour</b> - (<i>number</i>) 셀 내 시간 구간의 시작 시각으로, <b>x_unit="day"</b>일 때만 사용됩니다.
- <b>last_hour</b> - (<i>number</i>) 셀 내 시간 구간의 종료 시각으로, <b>x_unit="day"</b>일 때만 사용됩니다.
- <b>show_unassigned</b> (<i>boolean</i>) false일 경우, 섹션에 할당되지 않은 이벤트는 표시되지 않으며, true일 경우 첫 번째 섹션에 표시됩니다. 기본값은 false이며 선택 사항입니다.
- <b>section_autoheight</b> - (<i>boolean</i>) 셀 높이 자동 조정 활성화 여부입니다. 기본값은 true입니다.
- <b>dy</b> - (<i>number</i>) 최소 셀 높이입니다. <b>section_autoheight</b>가 false일 때 셀 높이가 고정되고, true일 때는 공간에 맞게 확장됩니다. 기본값은 50입니다.
- <b>dx</b> - (<i>number</i>) 섹션 이름을 표시하는 열의 너비입니다. 기본값은 200입니다.
- <b>event_dy</b> - (<i>number/string</i>) 이벤트 높이입니다. 'full'로 설정하면 셀 전체를 채웁니다. 기본값은 <b>scheduler.xy.bar_height-5</b>입니다.
- <b>event_min_dy</b> - (<i>number</i>) 이벤트 최소 높이입니다. 기본값은 <b>scheduler.xy.bar_height-5</b>입니다.
- <b>resize_events</b> - (<i>boolean</i>) 개별 이벤트 높이를 한 이벤트 높이 내에서 축소할 수 있는지 여부입니다 (<b>event_min_dy</b> 이하로 줄어들지 않음). 기본값은 true입니다.
- <b>fit_events</b> - (<i>boolean</i>) 섹션 높이를 모든 이벤트가 들어가도록 확장할지 아니면 고정(<b>dy</b>)할지 결정합니다. 3.0 버전부터 사용 가능하며, 기본값은 true입니다.
- <b>fit_events_offset</b> - (<i>number</i>) <b>fit_events</b>가 true일 때, 마지막 이벤트 아래에 추가되는 여백(픽셀)입니다.
- <b>round_position</b> - (<i>boolean</i>) 이벤트 길이와 상관없이 셀 전체 너비로 이벤트를 늘립니다. 기본값은 false이며, 'Bar' 및 'Tree' 모드에만 적용됩니다.
- <b>folder_events_available</b> - (<i>boolean</i>) 이벤트를 개별 홀더뿐 아니라 전체 폴더(모든 레벨)에 할당할 수 있게 합니다. 'Tree' 모드에서만 사용하며 기본값은 false입니다.
- <b>folder_dy</b> - (<i>number</i>) 폴더(자식 섹션을 포함하는 섹션)의 높이(픽셀)입니다. 'Tree' 모드에서만 사용됩니다.
- <b>second_scale</b> - (<i>object</i>) 기본 X축 위에 두 번째 X축을 추가하여 시간 구간을 그룹화합니다. 선택 사항이며 3.0 버전부터 사용 가능합니다.<br> 이 객체는 다음을 포함합니다:
    - <b>x_unit</b> - (<i>minute, hour, day, week, month, year</i>) 측정 단위로 기본값은 'minute'입니다.
    - <b>x_date</b> - (<i>string</i>) 날짜 형식(["날짜 형식 지정"](guides/settings-format.md) 참고). 설정하지 않으면 [hour_date](api/config/hour_date.md) 형식을 사용합니다.
- <b>scrollable</b> - (<i>boolean</i>) Timeline 뷰의 가로 스크롤 활성화 여부입니다. 기본값은 false입니다. false 또는 undefined일 경우, 날짜 열은 뷰포트 너비에 맞게 축소됩니다. true일 경우, 열 너비가 <b>column_width</b> 이하로 줄어들지 않으며 필요 시 가로 스크롤바가 표시됩니다.
- <b>column_width</b> - (<i>number</i>) 타임라인 날짜 열의 최소 너비로 기본값은 100입니다.
- <b>scroll_position</b> - (<i>Date</i>) 렌더링 후 타임라인을 특정 날짜로 스크롤합니다. <b>timeline.scrollTo()</b>와 동일한 인자를 받습니다.
- <b>autoscroll</b> - (<i>object</i>) 자동 스크롤 민감도 및 속도를 설정하는 객체로 다음 속성을 가집니다:
    - <b>range_x</b> - (<i>number</i>) 데이터 영역 가장자리에서 수평 자동 스크롤 거리
    - <b>range_y</b> - (<i>number</i>) 데이터 영역 가장자리에서 수직 자동 스크롤 거리
    - <b>speed_x</b> - (<i>number</i>) 수평 자동 스크롤 속도
    - <b>speed_y</b> - (<i>number</i>) 수직 자동 스크롤 속도
- <b>cell_template</b> - (<i>boolean</i>) 타임라인 셀에 사용자 정의 템플릿 렌더링 활성화 여부
- **smart_rendering** - (*boolean*) 보이는 행, 열, 이벤트만 렌더링하고 스크롤 시 나머지를 로드하는 스마트 렌더링을 활성화합니다. 스크롤 가능한 타임라인에 기본 활성화되어 있습니다.
- <b>columns</b>- (<i>array</i>) 좌측 패널에 표시할 열을 지정합니다. 지정하지 않으면 [timeline_scale_label](api/template/timelinename_scale_label.md) 템플릿이 사용됩니다.


## 속성 동적 변경

모든 타임라인 뷰는 **scheduler.matrix**에 저장됩니다.
이름으로 타임라인 뷰 설정에 접근하고 수정할 수 있습니다. 변경 사항은 스케줄러를 다시 그린 후 적용됩니다:

~~~js
scheduler.getView('timeline').x_size = 12;
scheduler.setCurrentView(); // 스케줄러 다시 그리기
~~~


여기서 "timeline"은 [createTimelineView](api/method/createtimelineview.md) 메서드에서 타임라인 뷰에 할당한 이름입니다:

~~~js
scheduler.createTimelineView({
    name:"timeline",
    ...
});
~~~

