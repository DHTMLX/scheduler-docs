---
sidebar_label: createTimelineView
title: "createTimelineView 메서드"
description: "스케줄러에서 Timeline 뷰를 생성합니다"
---

# createTimelineView
:::info
 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 스케줄러에 Timeline 뷰를 생성합니다.

@signature: createTimelineView: (config: any) =\> void

### Parameters

- `config` - (required) *object* - Timeline 뷰의 구성 객체

### Example

~~~jsx
// 오전 8시부터 오후 8시까지 30분 간격의 시간 스케일
scheduler.createTimelineView({
    name: "timeline",
    x_unit: "minute",
    x_date: "%H:%i",
    x_step: 30,
    x_size: 24,
    x_start: 16,
    x_length: 48,
    fit_events_offset: 15,
    y_unit: [
        { key: 1, label: "Section A" },
        { key: 2, label: "Section B" },
        { key: 3, label: "Section C" },
        { key: 4, label: "Section D" }
    ],
    y_property: "section_id",
    render: "bar"
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
 [timeline](guides/extensions-list.md#timeline) 플러그인을 활성화해야 이 메서드를 사용할 수 있습니다.
:::


Timeline 뷰의 구성 객체는 다음 속성들을 지원합니다:

- `name` - (*string*) 뷰의 ID입니다. 이미 존재하는 Timeline 뷰의 이름을 지정하면 해당 뷰가 덮어씌워집니다
- `render` - (*'cell', 'bar', 'tree', 'days'*) 뷰의 모드. 기본값은 'cell'
- `y_property` - (*string*) 이벤트를 특정 섹션에 할당하는 데 사용될 데이터 속성의 이름
- `y_unit` - (*array of objects*) 뷰의 섹션을 정의합니다. 배열의 각 객체는 하나의 섹션을 정의하며 아래 속성을 가집니다:
    - `children` - (*array*) 중첩 아이템 객체의 배열(트리 모드에서만 해당)
    - `key` - (*string*) 섹션의 ID. 이 속성은 이벤트의 데이터 속성과 비교되어 이벤트를 섹션에 할당합니다
    - `label` - (*string*) 섹션의 레이블
    - `open` - (*boolean*) 섹션이 초기에 열려 있는지 여부를 지정합니다(트리 모드에서만 해당)
- `days` - (*number*) Y축의 항목 수(일)입니다. 'Days' 모드에서만 적용
- `x_unit` - (*minute, hour, day, week, month, year*) X축의 측정 단위. 기본값은 'minute'
- `x_date` - (*string*) [X-Axis](guides/settings-format.md)의 날짜 형식. 명시하지 않으면 [`hour_date`](api/config/hour_date.md) 형식이 사용됩니다
- `x_step` - (*number*) `x_unit`당 X축의 간격. 기본값은 1
- `x_start` - (*number*) X축의 시작 오프셋. 기본값은 0
- `x_size` - (*number*) X축의 길이로, 총 `x_step`의 수로 지정됩니다. 기본값은 24
- `x_length` - (*number*) 사용자가 스케줄러의 헤더에서 '다음' 버튼을 클릭했을 때 한 번에 스크롤될 `x_step`의 수. Optional. 기본값은 1.
다소 까다로운 매개변수이며 실수를 피하려면 아래를 기억하세요:
    - `x_unit='minute'` 또는 `x_unit='hour'`일 때만 사용할 수 있습니다. 다른 경우에는 매개변수를 지정할 필요가 없습니다.
    - 만약 `x_unit='minute'` 또는 `x_unit='hour'`이고 `x_length`를 지정하지 않으면, X축은 남은 스케일 매개변수(`x_start`, `x_step`, `x_size`)로 지정된 시간 간격을 표시합니다(하루를 전체로 보지 않음). 이를 통해 하루를 동일한 시간 간격으로 나누고 '다음' 버튼으로 스크롤할 수 있습니다.
    - 만약 `x_unit='minute'` 또는 `x_unit='hour'`이고 매개변수를 설정하기로 결정하면 하루 전체에 대해 설정하십시오(즉, `x_length`는 전체 하루를 채우는 데 필요한 `x_steps`의 수와 같아야 함). 이것은 '다음' 버튼의 올바른 작동을 보장합니다.
- `first_hour` - (*number*) 셀의 시간 간격 시작 시간을 설정합니다. 이 속성은 `x_unit="day"`일 때만 적용됩니다
- `last_hour` - (*number*) 셀의 시간 간격 종료 시간을 설정합니다. 이 속성은 `x_unit="day"`일 때만 적용됩니다
- `show_unassigned` - (*boolean*) 만약 *false*이면 어떤 섹션에도 속하지 않는 이벤트는 표시되지 않습니다. *true*인 경우 이러한 이벤트는 첫 번째 섹션에 배치됩니다. 기본값은 *false*. Optional
- `section_autoheight` - (*boolean*) 셀의 높이를 자동으로 조정하도록 합니다. 기본값은 *true*
- `dy` - (*number*) 셀의 최소 높이( `section_autoheight`가 *false*인 경우 `dy`와 같고, 그렇지 않으면 남는 공간을 채우도록 높이가 증가합니다). 기본값은 50
- `dx` - (*number*) 섹션 이름 열의 너비. 기본값은 200
- `event_dy` - (*number/string*) 이벤트의 높이. `full` 값을 가질 수 있으며 셀 전체를 차지할 수 있습니다. 기본값은 `scheduler.xy.bar_height-5`
- `event_min_dy` - (*number*) 최소 이벤트 높이. 기본값은 `scheduler.xy.bar_height-5`
- `resize_events` - (*boolean*) 개별 이벤트의 높이가 감소하여 총 높이가 한 개의 이벤트 높이와 같아지도록 할지 여부를 지정합니다(단, `event_min_dy` 값보다 작아질 수 없습니다). 기본값은 *true*
- `fit_events` - (*boolean*) 이 섹션의 높이를 증가시켜 모든 이벤트를 이 섹션에 맞추도록 할지 여부를 지정합니다. 아니면 고정합니다(`dy` 매개변수). 버전 3.0부터 사용 가능. 기본값은 *true*
- `fit_events_offset` - (*number*) 마지막 이벤트 아래에 추가 공간(픽셀 단위)을 더합니다. `fit_events`가 *true*로 설정되었을 때 적용됩니다
- `round_position` - (*boolean*) 이벤트를 전체 셀 너비에 걸쳐 늘려 표시합니다(이벤트 길이에 관계없이). 기본값은 *false*. 'Bar' 및 'Tree' 모드에서만 해당
- `folder_events_available` - (*boolean*) 개별 홀더뿐 아니라 폴더 전체(어떤 수준이든)에 대해 이벤트를 지정할 수 있도록 하려면 *true*로 설정합니다. 'Tree' 모드에서만 적용됩니다. 기본값은 *false*
- `folder_dy` - (*number*) 폴더의 높이(픽셀 단위)입니다(폴더는 자식 섹션이 있는 섹션). 'Tree' 모드에서만 적용됩니다
- `second_scale` - (*object*) 기본 X축 위에 두 번째 X축을 추가하고 원래 눈금에서 시간 간격을 그룹화하는 데 사용됩니다. 선택사항. 버전 3.0부터 사용 가능. 눈금 객체는 다음 속성을 가집니다:
    - `x_unit` - (*minute, hour, day, week, month, year*) 축의 측정 단위. 기본값은 'minute'
    - `x_date` - (*string*) 축의 날짜 형식. 명시하지 않으면 [`hour_date`](api/config/hour_date.md) 형식이 사용됩니다
- `scrollable` - (*boolean*) Timeline 뷰에서 수평 스크롤을 활성화합니다, 기본값은 false. *false* 또는 미정의일 경우 날짜 열은 시간 스케일이 뷰포트 너비에 맞게 축소됩니다. *true*일 경우 날짜 열은 `column_width` 값보다 작아지지 않으며 필요 시 수평 스크롤 바가 나타납니다.
- `column_width` - (*number*) 타임라인 날짜 열의 최소 너비를 정의합니다. 기본값은 100
- `scroll_position` - (*Date*) 렌더링 후 타임라인이 특정 위치로 스크롤되도록 렌더링합니다. `timeline.scrollTo()`와 동일한 인수를 사용합니다
- `autoscroll` - (*object*) 자동 스크롤의 민감도와 속도를 구성합니다. 자동 스크롤 객체에는 아래 속성이 포함됩니다:
    - `range_x` - (*number*) 데이터 영역의 가장자리에서의 수평 자동 스크롤 거리
    - `range_y` - (*number*) 데이터 영역의 가장자리에서의 수직 자동 스크롤 거리
    - `speed_x` - (*number*) 수평 자동 스크롤 속도
    - `speed_y` - (*number*) 수직 자동 스크롤 속도
- `cell_template` - (*boolean*) 타임라인에 지정된 템플릿 렌더링을 활성화합니다
- `smart_rendering` - (*boolean*) 타임라인에서 스마트 렌더링 기능을 활성화합니다(화면에 보이는 행, 열, 이벤트만 렌더링되고, 스크롤 중에 다른 요소가 렌더링됩니다). 가로 스크롤 가능 타임라인에서는 기본적으로 이 설정이 활성화됩니다.
- `columns` - (*array*) 왼쪽 패널의 열 목록입니다. 지정하지 않으면 패널의 내용에 [`timeline_scale_label`](api/template/timelinename_scale_label.md) 템플릿이 사용됩니다.


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
    name: "timeline",
    ...
});
~~~