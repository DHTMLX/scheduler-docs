---
title: "반복 이벤트"
sidebar_label: "반복 이벤트"
---

# 반복 이벤트

반복 이벤트는 이벤트 캘린더 애플리케이션에서 흔히 사용되는 기능으로, 사용자가 지정된 간격으로 반복되는 이벤트를 생성할 수 있게 해줍니다. v7.1부터 Scheduler는 반복 이벤트에 대해 RFC-5545 기반 형식을 사용합니다.

이 문서는 Scheduler에서 반복 이벤트를 사용하는 방법과 이를 데이터베이스에 저장하는 방법을 설명합니다.

:::note
레거시 형식의 반복 이벤트에 대한 설명은 [여기](guides/recurring-events-legacy.md)에서 확인할 수 있습니다.
:::

기본적으로 Scheduler는 반복 이벤트를 직접적으로 지원하지 않습니다. 이러한 기능을 제공하려면 페이지에서 `recurring` 확장을 활성화해야 합니다:

~~~js
scheduler.plugins({
    recurring: true
});
~~~

반복 이벤트에 대한 지원이 활성화되면 라이트박스는 아래와 같이 보이기 시작합니다:

![recurring_lightbox](/img/recurring_lightbox.png)


## 구성 옵션

라이브러리는 반복 이벤트를 구성하기 위한 다음 옵션을 제공합니다:

- [`repeat_date`](api/config/repeat_date.md) - 'recurring' 라이트박스의 'End by' 필드의 날짜 형식을 설정합니다

~~~js
scheduler.config.repeat_date = "%m/%d/%Y";
...
scheduler.init('scheduler_here', new Date(2027, 7, 5), "month");
~~~

**관련 샘플** [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)

## 'Recurring' 라이트박스

기본적으로 반복 확장이 활성화되면 라이트박스에 하나의 추가 섹션인 "Repeat event"가 생깁니다. 그리고 기본적인 'recurring' 라이트박스의 정의는 아래와 같이 시작합니다:

~~~js
scheduler.config.lightbox.sections = [
    { name: "description", map_to: "text", type: "textarea", focus: true },
    { name: "recurring", type: "recurring", map_to: "rrule" },
    { name: "time", height: 72, type: "time", map_to: "auto" }
];
~~~

**관련 샘플** [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## 형식 설명

반복 이벤트는 일반 이벤트의 모든 필드에 더하여 여러 추가 속성을 포함하는 단일 레코드로 데이터베이스에 저장됩니다:

1. **start_date** - (_datetime_) 시리즈의 시작 날짜를 정의합니다
2. **end_date** - (_datetime_) 시리즈의 종료 날짜를 정의합니다
3. **rrule** - (_string_) 반복 규칙을 정의합니다
4. **duration** - (_number_) 반복 인스턴스의 지속 시간
5. **recurring_event_id** - (_string|number_) 상위 시리즈의 ID이며, 수정되었거나 삭제된 시리즈의 발생에 대해서만 채워집니다
6. **original_start** - (_datetime_) 편집된 인스턴스의 원래 날짜이며, 수정되었거나 삭제된 발생에 대해서만 채워집니다
7. **deleted** - (_boolean_) 시리즈의 삭제된 인스턴스를 지정하며, 삭제된 발생에 대해서만 채워집니다

**rrule** 은 RFC-5545에 명시된 iCalendar 형식을 따르며, 반복 패턴을 제어하는 주기, 간격 및 기타 매개변수를 자세히 설명합니다.

### iCalendar 형식과의 차이점

저희 형식은 iCalendar 형식과 두 가지 핵심 시점에서 다릅니다:

#### STDATE와 DTEND의 분리 저장:

iCalendar 형식에서 반복 시리즈의 시작일과 종료일은 일반적으로 **RRULE** 문자열의 일부로 **STDATE**와 **DTEND** 속성으로 포함됩니다.
저희 형식에서는 **stdate**와 **dtend**를 별도의 필드로 저장합니다. 이 분리는 RRULE 문자열을 구문 분석하지 않고도 날짜별로 반복 이벤트를 더 쉽게 조작하고 쿼리할 수 있게 해줍니다.

다음은 2027년 6월 1일 시작하여 2027년 12월 1일까지만 반복하도록 설정된 반복 이벤트 시리즈의 예시입니다:

~~~js
{
    "id": 1,
    "text": "주간 팀 미팅",
    "start_date": "2027-06-03 09:00:00",
    "duration": 3600,
    "end_date": "2027-12-02 10:00:00",
    "rrule": "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO",
    "recurring_event_id": null,
    "original_start": null
}
~~~

#### 예외 처리

예외(시리즈의 수정되었거나 삭제된 발생)는 상위 시리즈와 연결된 별도 이벤트 레코드로 저장됩니다. 예외에는 세 가지 추가 속성이 있습니다: **recurring_event_id**, **original_start**, 그리고 **deleted**. 이러한 속성은 수정되었거나 삭제된 인스턴스의 식별과 상위 시리즈와의 관계를 쉽게 만들어 줍니다.

:::note
전통적인 iCalendar 형식과 달리 예외(수정되었거나 삭제된 인스턴스)는 시리즈의 RRULE의 EXDATE 속성에 저장되지 않는다는 점에 주의하십시오.
:::

다음은 하나의 수정된 발생과 하나의 삭제된 발생이 있는 반복 시리즈의 예시입니다:

~~~js
[
    {
        "id": 1,
        "text": "주간 팀 미팅",
        "start_date": "2027-06-03 09:00:00",
        "duration": 3600,
        "end_date": "2027-12-02 10:00:00",
        "rrule": "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO",
        "recurring_event_id": null,
        "original_start": null
    },
    {
        "id": 2,
        "text": "특별 팀 미팅",
        "start_date": "2027-06-10 09:00:00",
        "end_date": "2027-06-10 11:00:00",
        "rrule": null,
        "recurring_event_id": 1,
        "original_start": "2027-06-10 09:00:00"
    },
    {
        "id": 3,
        "text": "삭제된 팀 미팅",
        "start_date": "2027-06-17 09:00:00",
        "end_date": "2027-06-17 10:00:00",
        "rrule": null,
        "recurring_event_id": 1,
        "original_start": "2027-06-17 09:00:00",
        "deleted": true
    }
]
~~~

2027-06-10 09:00:00에 예정된 반복 이벤트는 `Special Team Meeting` 레코드로 대체되며, 2027-06-17 09:00:00에 예정된 이벤트는 건너뛰어집니다.

수정되거나 삭제된 발생의 **rrule**은 무시됩니다.

삭제된 인스턴스의 **text**, **start_date**, 및 **end_date** 역시 무시되며, 이들 필드의 값은 Scheduler의 동작에 영향을 주지 않습니다.

## 시리즈의 특정 발생을 편집/삭제하기

시리즈의 특정 발생을 삭제하거나 편집하는 것이 가능합니다.

### 주요 팁

- 반복 이벤트의 각 업데이트마다 DB에 별도 레코드가 생성됩니다.
- 특정 발생은 **recurring_event_id** 속성으로 상위 이벤트를 참조합니다.
- 시리즈의 특정 발생을 편집한 경우, 이 업데이트에 대해 **original_start** 필드가 수정되었을 때 원래 발생해야 했던 시점을 저장합니다. 예를 들어 2027년 7월 27일 15:00에 발생한 발생이 7월 30일 15:00으로 이동했다면, 타임스탬프는 첫 날짜를 반영합니다.

### 서버 측 로직

추가 필드 외에도 서버 측 컨트롤러에 특정 로직이 필요합니다:

- 삭제된 인스턴스가 삽입되었으면 서버 응답은 "deleted" 상태를 가져야 합니다.
  - 삭제된 인스턴스는 **deleted** 속성의 비어 있지 않은 값으로 식별할 수 있습니다.
- 시리즈가 수정되었다면 시리즈의 모든 수정된 및 삭제된 발생은 삭제되어야 합니다.
  - 시리즈는 비어 있지 않은 값의 **rrule** 속성과 비어 있는 값의 **recurring_event_id** 속성으로 식별됩니다.
  - 시리즈의 수정된 발생은 **recurring_event_id**가 시리즈의 **id**와 일치하는 모든 레코드입니다.
- 비어 있지 않은 **recurring_event_id**를 가진 이벤트가 삭제되었다면, 삭제 처리 대신 `deleted="true"`로 업데이트해야 합니다.

:::note
전체 코드 예제는 [여기](integrations/howtostart-guides.md)에서 확인할 수 있습니다.
:::

## 라이트박스의 반복 블록에 대한 사용자 정의 컨트롤

버전 4.2부터 Scheduler는 라이트박스의 반복 블록에 대한 사용자 정의 HTML을 지정할 수 있습니다.

#### 어떤 커스터마이즈를 할 수 있나요?

1. 마크업 변경
2. 불필요한 요소 제거(예: "매년" 반복 타입)
3. 입력 값에 기본값 설정(예: 모든 시리즈를 "종료일 없음"으로 생성하도록)

### 라이트박스의 반복 블록 컨트롤의 기본 템플릿

라이트박스의 반복 블록 컨트롤의 기본 템플릿은 아래 코드와 같이 보이며, `loc` 객체는 Scheduler의 로케일 객체(지역별 레이블)입니다:

~~~html
<div class="dhx_form_rrule">
    <div class="dhx_form_repeat_pattern">
        <select>
            <option value="NEVER">${loc.repeat_never}</option>
            <option value="DAILY">${loc.repeat_daily}</option>
            <option value="WEEKLY">${loc.repeat_weekly}</option>
            <option value="MONTHLY">${loc.repeat_monthly}</option>
            <option value="YEARLY">${loc.repeat_yearly}</option>
            <option value="WORKDAYS">${loc.repeat_workdays}</option>
            <option value="CUSTOM">${loc.repeat_custom}</option>
        </select>
    </div>
    <div class="dhx_form_repeat_custom dhx_hidden">
        <div class="dhx_form_repeat_custom_interval">
            <input name="repeat_interval_value" type="number" min="1">
            <select name="repeat_interval_unit">
                <option value="DAILY">${loc.repeat_freq_day}</option>
                <option value="WEEKLY">${loc.repeat_freq_week}</option>
                <option value="MONTHLY">${loc.repeat_freq_month}</option>
                <option value="YEARLY">${loc.repeat_freq_year}</option>
            </select>
        </div>
        <div class="dhx_form_repeat_custom_additional">
            <div class="dhx_form_repeat_custom_week dhx_hidden">
                <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                    value="MO" />${loc.day_for_recurring[1]}</label>
                <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                    value="TU" />${loc.day_for_recurring[2]}</label>
                <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                    value="WE" />${loc.day_for_recurring[3]}</label>
                <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                    value="TH" />${loc.day_for_recurring[4]}</label>
                <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                    value="FR" />${loc.day_for_recurring[5]}</label>
                <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                    value="SA" />${loc.day_for_recurring[6]}</label>
                <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                    value="SU" />${loc.day_for_recurring[0]}</label>
            </div>
            <div class="dhx_form_repeat_custom_month dhx_hidden">
                <select name="dhx_custom_month_option">
                    <option value="month_date"></option>
                    <option value="month_nth_weekday"></option>
                </select>
            </div>
            <div class="dhx_form_repeat_custom_year dhx_hidden">
                <select name="dhx_custom_year_option">
                    <option value="month_date"></option>
                    <option value="month_nth_weekday"></option>
                </select>
            </div>
        </div>
    </div>
    <div class="dhx_form_repeat_ends">
        <div>${loc.repeat_ends}</div>
        <div class="dhx_form_repeat_ends_options">
            <select name="dhx_custom_repeat_ends">
                <option value="NEVER">${loc.repeat_never}</option>
                <option value="AFTER">${loc.repeat_radio_end2}</option>
                <option value="ON">${loc.repeat_on_date}</option>
            </select>
            <div class="dhx_form_repeat_ends_extra">
                <div class="dhx_form_repeat_ends_after dhx_hidden">
                    <label><input name="dhx_form_repeat_ends_after" type="number"
                        min="1">${loc.repeat_text_occurrences_count}</label>
                </div>
                <div class="dhx_form_repeat_ends_on dhx_hidden">
                    <input type="date" name="dhx_form_repeat_ends_ondate">
                </div>
            </div>
        </div>
    </div>
</div>
~~~

#### 주요 반복 선택 컨트롤

기본적으로 라이트박스의 반복 블록은 다섯 가지 기본 반복 유형을 갖고 있으며, 아래 옵션을 제공합니다: "매일", "매주", "매월", "매년", "평일마다". 또한 필요에 따라 반복을 생성하기 위한 "사용자 정의" 옵션과 반복을 비활성화하는 "Never" 옵션이 포함됩니다:

~~~html
<div class="dhx_form_repeat_pattern">
    <select>
        <option value="NEVER">Never</option>
        <option value="DAILY">Every day</option>
        <option value="WEEKLY">Every week</option>
        <option value="MONTHLY">Every month</option>
        <option value="YEARLY">Every year</option>
        <option value="WORKDAYS">Every weekday</option>
        <option value="CUSTOM">Custom</option>
    </select>
</div>
~~~

"Custom" 반복 유형에는 특수 반복 유형 단위가 있으며: "일", "주", "월", "년" 그리고 반복 간격 입력이 있습니다. 기본적으로 이 단위 섹션은 필요한 유형을 선택하기 전까지 숨겨져 있습니다:

~~~html
<div class="dhx_form_repeat_custom">
    <div class="dhx_form_repeat_custom_interval">
        <input name="repeat_interval_value" type="number" min="1">
        <select name="repeat_interval_unit">
            <option value="DAILY">${loc.repeat_freq_day}</option>
            <option value="WEEKLY">${loc.repeat_freq_week}</option>
            <option value="MONTHLY">${loc.repeat_freq_month}</option>
            <option value="YEARLY">${loc.repeat_freq_year}</option>
        </select>
    </div>

    <div class="dhx_form_repeat_custom_additional">
        <div class="dhx_form_repeat_custom_week dhx_hidden">
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="MO" />${loc.day_for_recurring[1]}</label>
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="TU" />${loc.day_for_recurring[2]}</label>
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="WE" />${loc.day_for_recurring[3]}</label>
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="TH" />${loc.day_for_recurring[4]}</label>
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="FR" />${loc.day_for_recurring[5]}</label>
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="SA" />${loc.day_for_recurring[6]}</label>
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="SU" />${loc.day_for_recurring[0]}</label>
        </div>

        <div class="dhx_form_repeat_custom_month dhx_hidden">
            <select name="dhx_custom_month_option">
                <option value="month_date"></option>
                <option value="month_nth_weekday"></option>
            </select>
        </div>

        <div class="dhx_form_repeat_custom_year dhx_hidden">
            <select name="dhx_custom_year_option">
                <option value="month_date"></option>
                <option value="month_nth_weekday"></option>
            </select>
        </div>
    </div>
</div>
~~~

#### 반복 종료를 지정하는 블록

반복 종료는 아래 값들로 이루어진 선택 컨트롤로 정의됩니다: "NEVER", "ON", "AFTER". "AFTER" 옵션을 선택하면 반복 횟수에 대한 추가 입력이 나타나고, "ON" 옵션을 선택하면 종료 날짜 입력이 추가로 나타납니다:

~~~html
<div class="dhx_form_repeat_ends">
    <div>${loc.repeat_ends}</div>
        <div class="dhx_form_repeat_ends_options">
            <select name="dhx_custom_repeat_ends">
                <option value="NEVER">${loc.repeat_never}</option>
                <option value="AFTER">${loc.repeat_radio_end2}</option>
                <option value="ON">${loc.repeat_on_date}</option>
            </select>
            <div class="dhx_form_repeat_ends_extra">
                <div class="dhx_form_repeat_ends_after dhx_hidden">
                    <label><input name="dhx_form_repeat_ends_after" type="number"
                        min="1">${loc.repeat_text_occurrences_count}</label>
                </div>
                <div class="dhx_form_repeat_ends_on dhx_hidden">
                    <input type="date" name="dhx_form_repeat_ends_ondate">
                </div>
            </div>
        </div>
    </div>
</div>
~~~

### 사용자 정의 반복 블록의 예

사용자 정의 반복 블록의 예시를 만들어 보겠습니다. 예를 들어 모든 이벤트에 대해 "종료일 없음" 옵션을 사용하고, "월간" 및 "년간" 반복 유형을 제거하고 싶다고 가정합시다.

1. 사용자 정의 폼의 마크업을 정의하고 페이지 어디에나 배치합니다(기본 템플릿을 복사해 시작합니다):

~~~html
<!-- 사용자 정의 반복 폼의 ID를 지정해야 한다는 점에 주의 -->
<div class="dhx_form_rrule" id="my_recurring_form" style="display:none;">
    <div class="dhx_form_repeat_pattern">
        <select>
            <option value="NEVER">Never</option>
            <option value="DAILY">Every day</option>
            <option value="WEEKLY">Every week</option>
            <option value="WORKDAYS">Every weekday</option>
            <option value="CUSTOM">Custom</option>
        </select>
    </div>
    <div class="dhx_form_repeat_custom">
        <div class="dhx_form_repeat_custom_interval">
            <input name="repeat_interval_value" type="number" min="1">
            <select name="repeat_interval_unit">
                <option value="DAILY">Day</option>
                <option value="WEEKLY">Week</option>
            </select>
        </div>

        <div class="dhx_form_repeat_custom_additional">
            <div class="dhx_form_repeat_custom_week dhx_hidden">
                <label><input class="dhx_repeat_checkbox" type="checkbox" 
                    name="week_day" value="MO" />Monday</label>
                <label><input class="dhx_repeat_checkbox" type="checkbox" 
                    name="week_day" value="TU" />Tuesday</label>
                <label><input class="dhx_repeat_checkbox" type="checkbox" 
                    name="week_day" value="WE" />Wednesday</label>
                <label><input class="dhx_repeat_checkbox" type="checkbox" 
                    name="week_day" value="TH" />Thursday</label>
                <label><input class="dhx_repeat_checkbox" type="checkbox" 
                    name="week_day" value="FR" />Friday</label>
                <label><input class="dhx_repeat_checkbox" type="checkbox" 
                    name="week_day" value="SA" />Saturday</label>
                <label><input class="dhx_repeat_checkbox" type="checkbox" 
                    name="week_day" value="SU" />Sunday</label>
            </div>
        </div>
    </div>
</div>
~~~

2. 라이트박스의 반복 섹션의 **form** 파라미터를 커스텀 폼의 ID로 설정합니다:

~~~js {3}
scheduler.config.lightbox.sections = [
    { name: "description", type: "textarea", map_to: "text", focus: true },
    { name: "recurring", type: "recurring", map_to: "rrule", form: "my_recurring_form" },
    { name: "time", type: "time", map_to: "auto", height: 72 }
];
~~~

위에서 커스텀 반복 블록을 가진 라이트박스가 표시되는 모습은 아래 그림과 같습니다:

<div style="text-align:center;">![custom_recurring_form](/img/custom_recurring_form.png)</div>

아래의 스니펫은 위에서 설명한 커스텀 반복 블록이 있는 라이트박스를 구현하는 방법을 보여줍니다:

**관련 샘플** [Lightbox with a custom recurring block](https://snippet.dhtmlx.com/0ha0edlk)

### 반복 블록 변경에 대한 참고사항

라이트박스의 반복 블록에 사용자 정의 구성을 적용하기 전에 다음 사항에 주의하십시오:

1. **name** 속성은 모든 입력에 대해 하드코딩되어 있습니다: 서로 다른 이름의 입력은 무시됩니다.
2. **value** 속성은 직접 입력을 암시하지 않는 입력을 제외하고 모두 고정됩니다.
3. 새 폼을 지정하면 Scheduler는 이를 직접 사용하지 않고 라이트박스 템플릿에 HTML 구조를 복제합니다. 이는 코드에서 DOM 요소에 부착된 모든 이벤트 핸들러나 사용자 정의 속성이 라이트박스의 폼에 적용되지 않음을 의미합니다. 이벤트 핸들러를 부착하려면 인라인 HTML 속성으로 지정하거나, 라이트박스에 표시될 때 `addEventListener()`로 폼에 핸들러를 연결해야 합니다.

:::note
주의, Scheduler는 원래의 HTML 폼과 함께 동작하지 않으며 라이트박스의 템플릿 안에 복사본만 생성합니다.
:::

예를 들어:

- 라이트박스로 복사되는 줄:

~~~html
<input onclick="handler()">
~~~

- 라이트박스로 복사되지 않는 줄:

~~~js
node.addEventListener("click", () => {
    ...
});
~~~

## 사용자 정의 확인 모달 {#customconfirmationmodal}

사용자가 반복 이벤트를 편집하거나 끌어다 놓기를 하는 경우, Scheduler는 이 발생만 수정할지, 이 후속의 발생까지 함께 수정할지, 아니면 전체 시리즈를 수정할지 묻는 기본 모달을 표시합니다. 이를 overridden `scheduler.ext.recurring.confirm`를 통해 직접 UI로 대체할 수 있습니다.

~~~js
scheduler.ext.recurring.confirm = (context) => {
    // context에는 다음이 포함됩니다:
    // - origin: "lightbox" | "dnd"
    // - occurrence: 수정 중인 발생 이벤트 객체
    // - series: 상위 시리즈 이벤트 객체
    // - labels: { title, ok, cancel, occurrence, following, series }
    // - options: ["occurrence", "following", "series"]
    //
    // 취소를 위해서는 "occurrence", "following", "series" 중 하나를 반환하거나 null을 반환합니다.
    // 비동기 UI의 경우 Promise를 반환할 수도 있습니다.

    return new Promise((resolve) => {
        myCustomDialog.show({
            title: context.labels.title,
            options: context.options,
            onSelect: (choice) => { resolve(choice); },
            onCancel: () => { resolve(null); }
        });
    });
};
~~~

context 객체는 다음 속성을 가집니다:

| 속성 | 유형 | 설명 |
|---|---|---|
| `origin` | `"lightbox" \| "dnd"` | 동작이 라이트박스에서 시작되었는지, 아니면 드래그 앤 드롭으로 시작되었는지 여부 |
| `occurrence` | `object` | 수정 중인 특정 발생 |
| `series` | `object` | 상위 반복 이벤트 |
| `labels` | `object` | 지역화된 문자열: `title`, `ok`, `cancel`, `occurrence`, `following`, `series` |
| `options` | `string[]` | 사용 가능한 선택지. 예: `["occurrence", "following", "series"]` |

함수는 `"occurrence"`, `"following"`, `"series"`, 또는 취소를 뜻하는 `null`을 반환해야 합니다. 값을 직접 반환하거나 Promise로 반환할 수 있습니다.

React 구현에 대해서는 [React Scheduler 문서](integrations/react/overview.md#customizing-the-recurrence-confirmation-modal)를 참조하십시오.


## 레거시 형식의 반복 이벤트

v7.1 이전의 Scheduler는 반복 이벤트에 대해 사용자 정의 형식을 사용했습니다. 형식의 세부 정보는 [여기](guides/recurring-events-legacy.md)에서 확인할 수 있습니다.