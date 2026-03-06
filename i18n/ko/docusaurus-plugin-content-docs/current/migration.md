---
title: "Migration From Older Versions"
sidebar_label: "Migration From Older Versions"
---

# Migration From Older Versions 

## 7.1 -> 7.2

v7.2로 업데이트되면서 일부 기본 설정이 변경되었습니다.

### `all_timed` 플러그인이 기본적으로 활성화됨

[all_timed](api/config/all_timed.md) 플러그인이 기본적으로 활성화되어 야간 이벤트가 표시됩니다. 이전 동작으로 되돌리려면 다음과 같이 설정을 조정할 수 있습니다:

~~~js
scheduler.config.all_timed = false;
~~~

### 날짜 함수가 더 이상 인자를 수정하지 않음

이전 버전에서는 `scheduler.date.day_start`, `scheduler.date.week_start`, `scheduler.date.date_part`와 같은 날짜 함수가 전달된 원본 날짜 객체를 변경했습니다:

~~~js
const date = new Date(2025, 1, 15, 13, 00);
const dayStart = scheduler.date.day_start(date);

console.log(dayStart);
// 2025-02-15 00:00:00

console.log(date);
// 2025-02-15 00:00:00
~~~

v7.2부터는 원본 날짜가 변경되지 않습니다:

~~~js
const date = new Date(2025, 1, 15, 13, 00);
const dayStart = scheduler.date.day_start(date);

console.log(dayStart);
// 2025-02-15 00:00:00

console.log(date);
// 2025-02-15 13:00:00
~~~

## 7.0 -> 7.1

v7.1 업데이트에는 여러 주요 변경 사항이 포함되어 있습니다.

### 반복 이벤트를 위한 새로운 엔진

`recurring` 플러그인이 활성화되면 [Recurring events](guides/recurring-events.md)를 위한 새로운 엔진이 사용됩니다:

~~~js
scheduler.plugin({
    recurring:true
});
~~~

이 새로운 플러그인은 반복 이벤트를 정의하는 데 다른 속성 집합을 사용하므로, 현재로서는 간단한 마이그레이션 경로가 없습니다. 마이그레이션 준비가 될 때까지 [이전 반복 이벤트 엔진](guides/recurring-events-legacy.md)을 legacy 플러그인으로 계속 사용할 수 있습니다:

~~~js
scheduler.plugin({
    recurring_legacy:true
});
~~~

### Undo 팝업

[undo_deleted](api/config/undo_deleted.md)로 제어되는 undo 기능이 이제 기본적으로 활성화되어 있습니다. 이 동작이 필요 없다면 설정을 통해 비활성화할 수 있습니다:

~~~js
scheduler.config.undo_deleted = false;
~~~

### Map View의 변경 사항

일부 속성이 더 이상 개별적으로 사용되지 않고 [map_settings](api/config/map_settings.md) 설정 객체의 일부가 되었습니다:

- **scheduler.config.map_error_position**
- **scheduler.config.map_initial_position**
- **scheduler.config.map_type**

이 속성들을 설정하는 새로운 방법은 다음과 같습니다:

~~~js
scheduler.config.map_settings = {
    initial_position: {
       lat: 48.724,
       lng: 8.215
    },
    error_position: {
       lat: 15,
       lng: 15
    },
    type: google.maps.MapTypeId.HYBRID
}
...
scheduler.init('scheduler_here',new Date(2024,05,11),"map");
~~~

또한, 아래 Map view 템플릿이 더 이상 사용되지 않으며 [map_info_content](api/template/map_info_content.md)로 대체되었습니다:

- **scheduler.templates.marker_date**
- **scheduler.templates.marker_text**

새로운 템플릿 사용 예시는 다음과 같습니다:

~~~
scheduler.templates.map_info_content = function(event){
    const formatDate = scheduler.templates.tooltip_date_format;
    return `<div><b>Text:</b> ${event.text}
        <div><b>Location:</b> ${event.event_location}</div>
        <div><b>Starts:</b> ${formatDate(event.start_date)}</div>
        <div><b>Ends:</b> ${formatDate(event.end_date)}</div>
    </div>`;
};
~~~

### 속성을 개별적으로 또는 공통 객체 내에서 사용 가능

[map_view_provider](api/config/map_view_provider.md) 속성은 개별적으로 또는 [map_settings](api/config/map_settings.md) 설정 객체 내에서 지정할 수 있습니다:

~~~js
scheduler.config.map_settings = {
    view_provider: "googleMap"
}
...
scheduler.init('scheduler_here',new Date(2024,05,11),"map");
~~~

### 개별적으로 사용되는 속성

다음 map 속성들은 [map_settings](api/config/map_settings.md) 객체 외부에 남아 있습니다:

- [map_end](api/config/map_end.md)
- [map_start](api/config/map_start.md)

## 6.0 -> 7.0

v7.0 업데이트에는 여러 주요 변경 사항이 포함되어 있습니다.

### 스킨이 이제 CSS 변수 사용

CSS 스킨(테마)이 완전히 개편되어 CSS 변수를 사용합니다. HTML 구조와 CSS 클래스 이름은 대부분 동일하지만, 이전 버전용으로 작성된 커스텀 CSS는 v7.0에서 예상대로 동작하지 않을 수 있습니다.

예를 들어, 이전에는 이벤트 배경색을 변경하려면 다음과 같이 스타일을 사용했습니다:

~~~html
<style>
    /*일/주간 뷰의 이벤트*/
    .dhx_cal_event.manager_event div{
        background-color: #009966 !important;
        color: black !important;
    }
    /*월간 뷰의 다중일 이벤트*/
    .dhx_cal_event_line.manager_event{
        background-color: #009966 !important;
        color: black !important;
    }
    /*고정 시간 이벤트, 월간 뷰*/
    .dhx_cal_event_clear.manager_event{
        color: black !important;
    }
</style>
~~~

v7.0부터는 다음과 같이 동일한 효과를 얻을 수 있습니다:

~~~html
<style>
    .manager_event {
        --dhx-scheduler-event-background: #009966;
        --dhx-scheduler-event-color: black;
    }
</style>
~~~

사용 가능한 변수 목록은 ["스킨 커스터마이제이션"](guides/custom-skins.md) 페이지에서 확인할 수 있습니다.

:::note
마이그레이션 후 원하는 스타일을 유지하려면 스타일을 업데이트해야 합니다.
:::

### 모든 테마가 하나의 CSS 파일로 통합

모든 테마가 이제 단일 **dhtmlxscheduler.css** 파일로 통합되었습니다.

특정 스킨을 선택하려면 `scheduler.skin` 속성을 사용하세요:

~~~js
scheduler.skin = "material";
~~~

또는 [setSkin](api/method/setskin.md) 메서드를 사용하세요:

~~~js
scheduler.setSkin("material");
~~~

:::note
`scheduler.setSkin()`을 사용하면 Scheduler가 다시 그려집니다.
:::

**terrace** 이외의 스킨에서 전환할 경우 다음 단계를 따르세요:

1) 기존 스킨 CSS 파일을 새 통합 CSS 파일로 교체:

~~~html
<!-- 기존 -->
<link rel="stylesheet" href="./codebase/dhtmlxscheduler_material.css" type="text/css">
<!-- 변경 -->
<link rel="stylesheet" href="./codebase/dhtmlxscheduler.css" type="text/css">
~~~

2) JavaScript로 스킨 활성화:

~~~js
scheduler.setSkin("material");
scheduler.init("scheduler_here");
~~~

### 더 이상 사용되지 않는 `scheduler.xy` 설정

다음 `scheduler.xy` 속성은 더 이상 사용되지 않습니다:

- scheduler.xy.nav_height
- scheduler.xy.event_header_height

이제 해당 높이는 다음과 같은 CSS 스타일로 제어됩니다:

~~~css
.dhx_cal_navline {
    height: 40px;
}

.dhx_cal_event dhx_title {
    height: 30px;
}
~~~

### 기본값 변경

[details_on_create](api/config/details_on_create.md) 및 [details_on_dblclick](api/config/details_on_dblclick.md) 속성의 기본값이 `false`에서 `true`로 변경되었습니다.

### Material 스킨 폰트

**Material** 스킨에는 더 이상 Roboto 폰트가 기본 포함되지 않습니다.

Material 스킨을 사용할 경우, 폰트를 수동으로 임포트해야 합니다:

~~~js
@import url(
'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap'
);
~~~

### 툴팁을 위한 새로운 API

툴팁은 이제 커스텀 요소에 쉽게 연결할 수 있도록 API가 재설계되었습니다. 자세한 내용은 ["툴팁 (Tooltips)"](guides/tooltips.md) 문서를 참조하세요.

### 일/주간 뷰 컬럼에 패딩 추가

일, 주, 유닛 뷰에는 컬럼 양쪽에 작은 패딩이 추가되었습니다. 이 공간에서 사용자가 더블 클릭으로 새 이벤트를 생성할 수 있습니다.

이 패딩을 제거하려면 [day_column_padding](api/config/day_column_padding.md)를 0으로 설정하세요:

~~~js
scheduler.config.day_column_padding = 0;
~~~

### Export 서비스 통합

v7.0부터 가져오기/내보내기 기능이 Scheduler 라이브러리에 통합되었습니다.

이전에 온라인 내보내기를 위해 **https://export.dhtmlx.com/scheduler/api.js** 파일을 포함했다면, 예를 들어:

~~~js
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>
~~~

해당 파일을 제거하고 **scheduler.plugins**로 **export_api** 확장 기능을 활성화하세요:

~~~js
scheduler.plugins({
    export_api: true
});
~~~

### Promise 구현 변경

**Bluebird** 라이브러리가 Scheduler 번들에서 제거되었습니다. [Promise](api/method/promise.md)는 이제 네이티브 Promise 구현을 사용합니다.

## 5.3 -> 6.0

v6.0 업데이트에서는 Scheduler 패키지에 두 가지 주요 구조적 변경이 있습니다:

1) 모든 확장 파일이 이제 *dhtmlxscheduler.js*에 번들로 포함됩니다. 추가 확장을 사용하려면 API를 사용해야 합니다.

- 이전에 별도의 확장 파일을 포함했다면, 예를 들어:

~~~js
<script src="../codebase/dhtmlxscheduler.js"></script>
<script src="../codebase/ext/dhtmlxscheduler_active_links.js"></script>
~~~

또는

~~~js
import "dhtmlx-scheduler";
import "dhtmlx-scheduler/ext/dhtmlxscheduler_active_links";
~~~

별도의 확장 파일을 제거하고 **scheduler.plugins**로 확장을 활성화하세요:

~~~js
scheduler.plugins({
   active_links: true
});
~~~

전체 확장 목록은 [여기](guides/extensions-list.md)에서 확인할 수 있습니다.

- 수정된 확장 파일이나 커스텀 확장 파일을 사용하는 경우, 이전과 같이 수동으로 포함하면 됩니다.

- **참고:** **dhtmlxscheduler_csp.js** 확장은 완전히 제거되었으며 더 이상 수동 활성화가 필요하지 않습니다.


2) 모든 로케일이 이제 *dhtmlxscheduler.js*에 포함되어 있습니다. 로케일을 활성화하려면 API를 사용하세요.

- 별도의 로케일 파일을 페이지에서 제거하고, 원하는 로케일을 **scheduler.i18n.setLocale**로 활성화하세요:

~~~js
scheduler.i18n.setLocale("de");
~~~

- 커스텀 로케일 파일은 이전과 같이 로드할 수 있습니다.

### DataProcessor 초기화

DataProcessor 생성자가 전역 **dataProcessor** 함수에서 **scheduler.DataProcessor** 함수로 이동했습니다.

앱에서 DataProcessor를 사용하는 경우, 초기화 코드를 다음과 같이 변경하세요:

~~~js
// 이전 방식
var dp = new dataProcessor("/scheduler/backend/events");
dp.init(scheduler);
dp.setTransactionMode("REST", false);
~~~

다음과 같이 변경:

~~~js
// 변경된 방식
var dp = new scheduler.DataProcessor("/scheduler/backend/events");
dp.init(scheduler);
dp.setTransactionMode("REST", false);
~~~

권장 방식은 **scheduler.createDataProcessor**를 사용하는 것입니다:

~~~js
// 권장 방식
var dp = scheduler.createDataProcessor({
    url: "/scheduler/backend/events",
    mode: "REST"
});
~~~

이 경우 **DataProcessor.init(scheduler)** 호출이 필요하지 않으며, 필요하다면 **DataProcessor.setTransactionMode**는 기존대로 사용할 수 있습니다.

### 더 이상 사용되지 않는 API

**dhtmlx** 객체는 dhtmlxscheduler.js에서 더 이상 정의되지 않으므로, 여러 메서드와 전역 객체가 6.0 버전부터 더 이상 지원되지 않습니다.

1) 다음 메서드가 더 이상 사용되지 않으며, 아래로 대체되었습니다:

<table class="my_table">

<tr><td class="version_info">더 이상 사용되지 않는 메서드</td><td class="version_info">대체 메서드</td></tr>

<tr><td>dhtmlx.alert</td><td>scheduler.alert</td></tr>
<tr><td>dhtmlx.confirm</td><td>scheduler.confirm</td></tr>
<tr><td>dhtmlx.modalbox</td><td>scheduler.modalbox</td></tr>
<tr><td>dhtmlx.uid</td><td>scheduler.uid</td></tr>
<tr><td>dhtmlx.copy</td><td>scheduler.copy</td></tr>
<tr><td>dhtmlx.mixin</td><td>scheduler.mixin</td></tr>
<tr><td>dhtmlx.defined</td><td>scheduler.defined</td></tr>
<tr><td>dhtmlx.bind</td><td>scheduler.bind</td></tr>
<tr><td>dhtmlx.assert</td><td>scheduler.assert</td></tr>
<tr><td>window.dataProcessor</td><td>scheduler.DataProcessor</td></tr>
</table>

메서드의 인자와 동작은 변경되지 않았습니다.

2) 다음 전역 객체가 더 이상 사용되지 않습니다:

- dhtmlxAjax
- dtmlXMLLoaderObject
- dhtmlDragAndDropObject
- dhtmlxEventable
- dhtmlxError

앱에서 여전히 필요하다면 **legacy** 플러그인으로 활성화할 수 있습니다:

~~~js
scheduler.plugins({
    legacy: true
});
~~~

## 5.2 -> 5.3

### 터치 제스처

[스와이프 제스처](guides/touch-support.md#touch-gestures-in-the-scheduler)의 기본 핸들러는 이제 기본적으로 비활성화되어 있습니다.

다시 활성화하려면 [scheduler.config.touch_swipe_dates](api/config/touch_swipe_dates.md) 설정을 다음과 같이 사용하세요:

~~~js
scheduler.config.touch_swipe_dates = true;
~~~

### 마크업 및 스타일

[box-sizing 모드](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing)가 ["Month View"](views/month.md)의 이벤트 요소에 대해 모든 스킨에서 **content-box**에서 **border-box**로 변경되었습니다.

이 변경은 **.dhx_cal_event_clear** 및 **.dhx_cal_event_line** 요소에 영향을 줍니다.

이 변경으로 눈에 띄는 차이는 없겠지만, Month 뷰의 이벤트 렌더링을 커스터마이즈했거나 사용자 지정 스킨을 사용하는 경우 스타일을 조정해야 할 수 있습니다.

## 5.1 -> 5.2

<h3 id="dnd">드래그 앤 드롭 동작</h3>

버전 5.2부터 이벤트를 이전처럼 헤더뿐만 아니라 본문 어느 부분을 클릭해서도 드래그할 수 있습니다. 이전 동작으로 되돌리려면 [drag_event_body](api/config/drag_event_body.md) 속성을 *false*로 설정하세요(기본값은 활성화):

~~~js
scheduler.config.drag_event_body = false;
~~~

### onXLE/onXLS 이벤트는 더 이상 권장되지 않음

이 이벤트들은 아직 동작하지만, 앞으로 제거될 예정입니다. 다음과 같이 대체하세요:

~~~js
scheduler.attachEvent("onXLS",function(){}); → 
scheduler.attachEvent("onLoadStart",function(){});

scheduler.attachEvent("onXLE",function(){}); → 
scheduler.attachEvent("onLoadEnd",function(){});
~~~

### "xml_date" 설정 및 템플릿, "xml_format" 템플릿 이름 변경

아래와 같이 새로운 API 이름으로 코드를 업데이트하세요:

- scheduler.config.xml_date →  [scheduler.config.date_format](api/config/date_format.md)
- scheduler.templates.xml_date → [scheduler.templates.parse_date](api/template/parse_date.md)
- scheduler.templates.xml_format → [scheduler.templates.format_date](api/template/format_date.md)

v5.2부터 **xml_date** 설정과 **xml_date**, **xml_format** 템플릿의 기본값이 *undefined*입니다. 명시적으로 할당하지 않으면 동작하지 않습니다.

단, Scheduler는 기존 이름도 계속 지원하므로, 커스터마이즈한 경우에도 계속 사용할 수 있습니다. 예시:

~~~js
// 이 코드는 여전히 동작합니다
scheduler.templates.xml_date = function(datestring){
    return new Date(datestring);
};
~~~

#### 기본 날짜 형식 변경

- v5.2 이전에는 **scheduler.config.xml_date**가 "%m/%d/%Y %H:%i"로 기본값을 지정했습니다.
- v5.2부터는 [scheduler.config.date_format](api/config/date_format.md)에서 "%Y-%m-%d %H:%i"로 제어합니다.

이전 기본 형식으로 되돌리려면 다음을 사용하세요:

~~~js
scheduler.config.date_format = "%m/%d/%Y %H:%i";
~~~

#### 향상된 날짜 파싱

v5.2부터 Scheduler는 파싱 시 날짜 형식을 자동 감지하려고 시도합니다. 이로 인해 **scheduler.date.str_to_date**, **scheduler.templates.format_date**, **scheduler.templates.parse_date**의 동작이 달라질 수 있습니다.

정확히 지정한 형식으로만 파싱하려면 다음을 활성화하세요:

~~~js
scheduler.config.parse_exact_format = true;
~~~

### [Multiselect](guides/multiselect.md#properties) 컨트롤의 "vertical" 설정은 이제 boolean만 허용

이전에는 *vertical*을 문자열로 지정할 수 있었습니다:

~~~js
{ name:"userselect", type:"multiselect", ..., vertical:"false" }
~~~

v5.2부터는 boolean 값만 허용합니다:

~~~js
{ name:"userselect", type:"multiselect", ..., vertical: false }
~~~

문자열 "false"를 사용했다면 boolean false로 변경하세요.

## 5.0 -> 5.1

스마트 렌더링과 수평 스크롤 기능이 도입되면서 Timeline, TreeTimeline 및 관련 모드의 마크업이 전면적으로 변경되었습니다.

주요 변경점은 TABLE, TR, TD 요소가 적절한 클래스명을 가진 DIV로 대체된 것입니다.

CSS 선택자가 타임라인 스타일링을 위해 table 태그를 대상으로 했다면, 새로운 마크업 구조에 맞게 선택자를 수정해야 합니다. 전체적인 DOM 구조는 비슷하므로 주로 CSS 선택자만 조정하면 됩니다.

변경 전후 CSS 선택자 비교:

변경 전:

- **.dhx_cal_data > table > tbody > tr > td.dhx_matrix_scell** - 왼쪽 라벨 컬럼
- **.dhx_cal_data > table > tbody > tr > td > div.dhx_matrix_line** - 날짜 셀이 있는 타임라인 행
- **.dhx_cal_data > table > tbody > tr > td > div.dhx_matrix_line > table > tbody > tr > td.dhx_matrix_cell** - 타임라인 행 내 개별 날짜 셀

변경 후:

- **.dhx_cal_data .dhx_timeline_table_wrapper .dhx_timeline_label_row .dhx_matrix_scell** - 왼쪽 라벨 컬럼
- **.dhx_cal_data .dhx_timeline_data_wrapper .dhx_matrix_line** - 날짜 셀이 있는 타임라인 행
- **.dhx_cal_data .dhx_timeline_data_wrapper .dhx_matrix_line .dhx_matrix_cell** - 타임라인 행 내 개별 날짜 셀

## 4.4 -> 5.0

### 제거된 스킨

**Glossy**와 **Classic** 스킨은 v5.0부터 지원 중단 및 제거되었습니다.

이 스킨에 의존하고 있다면 다른 [스킨](guides/skins.md)으로 전환하거나, 이전 버전의 CSS 파일을 계속 사용해야 합니다.

### 주요 CSS 리팩토링

버전 5.0에서 CSS가 대대적으로 개편되어, 커스터마이즈된 CSS를 많이 사용하는 경우 문제를 유발할 수 있습니다. dhtmlxScheduler의 스타일 우선순위가 높아져 기존 스타일이 동작하지 않을 수 있습니다.

보편적인 해결책은 없으며, 마이그레이션을 위해 CSS를 검토 및 조정해야 합니다.

### REST 모드 POST 경로 수정

이번 업데이트로 **REST** 모드에서 dataProcessor의 **POST**(insert) 경로가 수정되어, 더 이상 임시 이벤트 id를 서버로 전송하지 않습니다.

이전:

~~~js
POST /api/{tempId}

// 예시
POST /api/1234567890
~~~

이후:

~~~js
POST /api
~~~

## 4.x -> 4.3

v4.3부터 [Week Agenda View](views/weekagenda.md), [Grid View](views/grid.md), [Timeline View](views/timeline.md), [Units View](views/units.md), [Multisection Events](api/config/multisection.md) 확장 기능은 GNU GPL v2로 배포되는 Standard Edition에 포함되지 않습니다.

계속 사용하려면 4.2 이하 버전을 사용하거나, Commercial 또는 Enterprise 라이선스를 취득해야 합니다.

자세한 내용은 [여기](https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing)에서 확인하세요.

## 3.6 -> 4.0

공개 API는 완전히 이전 버전과 호환됩니다.

### 기본값 변경

- 기본 스킨이 "terrace"로 변경되었으며, ext/dhtmlxscheduler_dhx_terrace.js는 제거되었습니다. 클래식 스킨으로 되돌리려면 CSS 파일(codebase/dhtmlxscheduler_classic.css)을 포함하세요. 자세한 내용은 ["스킨(Skins)"](guides/skins.md) 참고.

- [multi_day](api/config/multi_day.md)가 기본적으로 활성화되었습니다. 비활성화하려면 다음을 추가하세요:

~~~js
scheduler.config.multi_day = false;
~~~

### 사용자 지정 스킨

Scheduler는 CSS 파일명을 기반으로 스킨을 자동 감지합니다. "terrace" 기반이 아닌 사용자 지정 스킨을 사용하는 경우 CSS 파일명을 *dhtmlxscheduler_(skin name).css*로 변경하세요.

자동 감지를 비활성화하려면 *scheduler.init* 호출 전에 다음을 설정하세요:

~~~
scheduler.skin = "{skin name}";
~~~

### 더 이상 권장되지 않는 API

아래 메서드는 더 이상 권장되지 않으며, Scheduler 5.x에서 제거될 예정입니다: getEventText, getEventStartDate, getEventEndDate, setEventText, setEventStartDate, setEventEndDate.

대신 *scheduler.getEvent()*를 사용하고, 이벤트 객체의 속성을 직접 접근하거나 수정하세요.

## 3.6 -> 3.7

완전히 이전 버전과 호환됩니다.

## 3.5 -> 3.6

완전히 이전 버전과 호환됩니다.

## 3.0 -> 3.5

공개 API는 완전히 이전 버전과 호환됩니다.

- 'Mark now' 기능이 dhtmlxscheduler_limit.js 확장으로 이동되었습니다.

- Scheduler는 이제 [dhtmlxConnector가 생성한 JSON](guides/server-integration.md#json-mode)을 지원합니다. 특별한 이유가 없다면 XML 대신 JSON을 사용하여 파일 크기를 줄이고 로딩 속도를 높일 수 있습니다.

## 2.3 -> 3.0

공개 API는 완전히 이전 버전과 호환됩니다.

- 파일 구조가 약간 변경되었습니다: ext/dhtmlxscheduler_ext.css 및 dhtmlxscheduler_recurring.css가 제거되고, 모든 스타일이 dhtmlxscheduler.css에 포함되었습니다.

- 일부 템플릿 인자가 통일성을 위해 변경되었습니다: scheduler.templates.agenda_text 및 scheduler.templates.map_text는 이제 (start_date, end_date, event)를 인자로 받습니다(기존에는 'event'만 받았음).

## 2.2 -> 2.3

- 완전히 이전 버전과 호환됩니다.

- 스웨덴어 로케일 파일명이 ISO 639-1 표준을 따르도록 변경되었습니다:

~~~
sources/locale_se.js => sources/locale_sv.js
sources/locale_recurring_se.js => sources/locale_recurring_sv.js
~~~

## 2.1 -> 2.2

- 완전히 이전 버전과 호환됩니다.

- 'createUnitsView' 명령이 다른 파라미터 집합을 허용하지만, 기존 문법도 계속 지원됩니다.

## 2.0 -> 2.1

- 포맷 규칙이 수정되었습니다: %d와 %m은 항상 2자리 숫자를 반환합니다. 이전 동작을 원하면 각각 %j와 %n을 사용하세요.

- 패키지 내부 일부 파일 경로가 변경되었습니다:

~~~
codebase/dhtmlxgrid_recurring.js => codebase/ext/dhtmlxgrid_recurring.js
codebase/dhtmlxgrid_recurring.css => codebase/ext/dhtmlxgrid_recurring.css
codebase/dhtmlxgrid_units.js => codebase/ext/dhtmlxgrid_units.js
~~~

## 1.0 -> 2.0

- API 및 데이터 포맷은 완전히 이전 버전과 호환됩니다.

- 'onEventChanged' 및 'onEventAdded' 이벤트는 데이터 로딩 중 더 이상 발생하지 않습니다.

- 스페인어 로케일 파일명이 locale_sp.js에서 locale_es.js로 변경되었습니다.

- 'drag_create' 옵션은 이제 드래그 앤 드롭으로 새 이벤트를 생성하는 것만 제어합니다; 더블 클릭으로 이벤트 생성은 'dblclick_create'로 제어합니다.

