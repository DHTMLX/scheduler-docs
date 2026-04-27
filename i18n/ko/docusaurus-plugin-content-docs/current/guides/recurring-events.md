---
title: "반복 이벤트"
sidebar_label: "반복 이벤트"
---

# 반복 이벤트

반복 이벤트는 이벤트 캘린더 애플리케이션에서 일반적으로 제공되는 기능으로, 사용자가 특정 간격으로 반복되는 이벤트를 생성할 수 있게 해 줍니다. 버전 7.1부터 Scheduler는 반복 이벤트에 대해 RFC-5545 기반 형식을 사용합니다. 

이 문서는 Scheduler에서 반복 이벤트를 사용하는 방법과 이를 데이터베이스에 저장하는 방법을 설명합니다.

:::note
이전 형식의 반복 이벤트에 대한 설명은 [여기](guides/recurring-events-legacy.md)에서 확인할 수 있습니다.
:::

기본적으로 Scheduler는 반복 이벤트를 지원하지 않습니다. 이러한 기능을 제공하려면 페이지에서 특별한 확장을 활성화해야 합니다 - **recurring**: 

~~~js
scheduler.plugins({
    recurring: true
});
~~~

반복 이벤트에 대한 지원이 활성화되면, 라이트박스의 형태가 아래와 같이 보이기 시작합니다: 

![recurring_lightbox](/img/recurring_lightbox.png)


## 구성 옵션

라이브러리는 반복 이벤트를 구성하기 위한 다음 옵션을 제공합니다:

- [repeat_date](api/config/repeat_date.md) - 'recurring' 라이트박스의 'End by' 필드의 날짜 형식을 설정합니다


~~~js
scheduler.config.repeat_date = "%m/%d/%Y";
...
scheduler.init('scheduler_here', new Date(2027, 7, 5), "month");
~~~


[Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## 'Recurring' 라이트박스

기본적으로 반복 확장 기능이 활성화되면 라이트박스에 "Repeat event" 섹션이 하나 더 생깁니다. 
또한 기본적으로 정의된 'recurring' 라이트박스는 다음과 같이 시작합니다:

~~~js
scheduler.config.lightbox.sections = [
    { name: "description", map_to: "text", type: "textarea", focus: true },
    { name: "recurring", type: "recurring", map_to: "rrule" },
    { name: "time", height: 72, type: "time", map_to: "auto" }
];
~~~


[Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## 형식 설명

반복 이벤트는 일반 이벤트의 모든 필드에 여러 추가 속성을 더한 하나의 레코드로 데이터베이스에 저장됩니다. 

1. **start_date** - (_datetime_) 시리즈의 시작 날짜를 정의합니다
2. **end_date** - (_datetime_) 시리즈의 종료 날짜를 정의합니다
3. **rrule** - (_string_) 반복 규칙을 정의합니다
4. **duration** - (_number_) 반복 인스턴스의 지속 시간
5. **recurring_event_id** - (_string|number_) 상위 시리즈의 ID; 시리즈의 수정되거나 삭제된 발생에 대해서만 채워집니다
6. **original_start** - (_datetime_) 수정된 인스턴스의 원래 날짜; 시리즈의 수정되거나 삭제된 발생에 대해서만 채워집니다
7. **deleted** - (_boolean_) 시리즈의 삭제된 인스턴스를 지정합니다; 삭제된 발생에 대해서만 채워집니다

**rrule**은 RFC-5545에 명시된 iCalendar 포맷을 따르며, 반복 패턴을 제어하는 빈도, 간격 및 기타 매개변수를 상세히 설명합니다.

### iCalendar 포맷과의 차이점

당사 포맷은 iCalendar 포맷과 두 가지 핵심 시점에서 다릅니다:

#### STDATE 및 DTEND를 별도로 저장하기

iCalendar 포맷에서 반복 시리즈의 시작 날짜와 종료 날짜는 일반적으로 **RRULE** 문자열의 일부인 **STDATE** 및 **DTEND** 속성으로 포함됩니다.
당사 포맷에서는 **stdate**와 **dtend**가 별도의 필드로 저장됩니다. 이 구분은 **RRULE** 문자열을 구문 분석하지 않고도 날짜별로 반복 이벤트를 더 쉽게 조작하고 조회할 수 있게 해줍니다.

다음은 2027년 6월 1일에 시작하여 2027년 12월 1일에 끝나도록 매주 월요일에 반복되는 반복 이벤트 시리즈의 예시입니다:

~~~js
{
    "id": 1,
    "text": "Weekly Team Meeting",
    "start_date": "2027-06-03 09:00:00",
    "duration": 3600,
    "end_date": "2027-12-02 10:00:00",
    "rrule": "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO",
    "recurring_event_id": null,
    "original_start": null
}
~~~

#### 예외 처리

예외, 즉 시리즈의 수정되거나 삭제된 발생은 부모 시리즈와 연결된 별도의 이벤트 레코드로 저장됩니다.
예외에는 추가 속성이 세 가지 있습니다: **recurring_event_id**, **original_start**, 그리고 **deleted**. 이 속성들은 수정되거나 삭제된 인스턴스를 쉽게 식별하고 부모 시리즈와의 관계를 파악하는 데 사용됩니다.

:::note
전통적인 iCalendar 포맷과 달리, 예외(수정되거나 삭제된 인스턴스)는 시리즈의 RRULE의 EXDATE 속성에 저장되지 않습니다.
:::

다음은 하나의 수정된 발생과 하나의 삭제된 발생이 포함된 반복 시리즈의 예입니다:

~~~js
[
    {
        "id": 1,
        "text": "Weekly Team Meeting",
        "start_date": "2027-06-03 09:00:00",
        "duration": 3600,
        "end_date": "2027-12-02 10:00:00",
        "rrule": "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO",
        "recurring_event_id": null,
        "original_start": null
    },
    {
        "id": 2,
        "text": "Special Team Meeting",
        "start_date": "2027-06-10 09:00:00",
        "end_date": "2027-06-10 11:00:00",
        "rrule": null,
        "recurring_event_id": 1,
        "original_start": "2027-06-10 09:00:00"
    },
    {
        "id": 3,
        "text": "Deleted Team Meeting",
        "start_date": "2027-06-17 09:00:00",
        "end_date": "2027-06-17 10:00:00",
        "rrule": null,
        "recurring_event_id": 1,
        "original_start": "2027-06-17 09:00:00",
        "deleted": true
    }
]
~~~

2027-06-10 09:00:00에 예정된 반복 이벤트는 `Special Team Meeting` 레코드로 대체되고, 2027-06-17 09:00:00에 예정된 이벤트는 건너뛰어집니다.

수정되거나 삭제된 발생의 **rrule**은 무시됩니다. 또한 삭제된 인스턴스의 **text**, **start_date**, 및 **end_date** 역시 무시되며, 이들 필드의 값은 Scheduler의 동작에 영향을 주지 않습니다.

## 시리즈의 특정 발생을 편집/삭제하기

시리즈의 특정 발생을 삭제하거나 수정할 수 있습니다. 

### 중요한 팁

- 반복 이벤트를 업데이트할 때마다 DB에 별도의 레코드가 생성됩니다.
- 특정 발생은 **recurring_event_id** 속성을 통해 상위 이벤트를 참조합니다.
- 시리즈의 발생 하나를 편집하면 이 업데이트의 **original_start** 필드는 수정되었을 때 발생해야 했던 날짜를 저장합니다. 예를 들어 어떤 발생이 2027-07-27 15:00에 일어났으나 2027-07-30 15:00로 이동되었다면, 타임스탬프는 처음 날짜를 반영합니다.

### 서버 측 로직

추가 필드 외에도 서버 측 컨트롤러에 특정 로직을 추가해야 합니다:

- 삭제된 인스턴스가 삽입된 경우 - 서버 응답은 "deleted" 상태를 가져야 합니다.
  - 삭제된 인스턴스는 **deleted** 속성의 비어 있지 않은 값으로 식별할 수 있습니다.
- 시리즈가 수정된 경우, 시리즈의 수정되거나 삭제된 모든 발생은 삭제되어야 합니다.
  - 시리즈는 **rrule** 속성의 값이 비어 있지 않고 **recurring_event_id**가 비어 있을 때 식별할 수 있습니다.
  - 시리즈의 수정된 발생은 **recurring_event_id**가 시리즈의 **id**와 일치하는 모든 레코드입니다.
- 비어 있지 않은 **recurring_event_id**를 가진 이벤트가 삭제되었다면, 삭제하는 대신 deleted="true"로 업데이트해야 합니다.

:::note
전체 코드 예제는 [여기](integrations/howtostart-guides.md)에서 확인할 수 있습니다.
:::


## 라이트박스의 recurring 블록에 대한 커스텀 컨트롤

버전 4.2부터 Scheduler는 라이트박스의 'recurring' 블록에 대해 사용자 정의 HTML을 지정할 수 있습니다.

#### 어떤 커스터마이즈를 할 수 있나요?

1) 마크업 변경
2) 불필요한 요소 제거(예: "yearly" 반복 유형)
3) 입력에 기본값 설정(예: 모든 시리즈를 "종료일 없음"으로 생성)

### 라이트박스의 recurring 블록 기본 템플릿

라이트박스의 반복 블록 컨트롤의 기본 템플릿은 아래 코드처럼 보이며, `loc` 객체는 Scheduler의 로케일 객체(지역별 레이블)입니다:

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
</div>
~~~

#### 기본 반복 선택 컨트롤

기본적으로 라이트박스의 반복 블록에는 다섯 가지 기본 반복 유형이 있으며, 아래 옵션을 포함합니다: "매일", "매주", "매월", "매년", "평일마다". 또한 필요 시 반복을 사용할 수 없도록 하는 "Custom" 옵션과 반복을 비활성화하는 "Never" 옵션이 포함됩니다:

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

"Custom" 반복 유형에는 특별한 반복 단위가 있습니다: "Day", "Week", "Month", "Year"와 반복 간격 입력값이 있습니다. "Week", "Month" 및 "Year" 단위는 별도의 섹션으로 구성되어 있으며, 필요한 유형을 선택하기 전까지 기본적으로 숨겨져 있습니다:

~~~html
<div class="dhx_form_repeat_custom ">
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

종료는 "NEVER", "ON", "AFTER" 값을 가지는 선택 컨트롤로 정의됩니다. "AFTER"가 선택되면 반복 이벤트 수를 입력하는 추가 입력이 생깁니다. "ON"이 선택되면 종료 날짜 입력이 추가됩니다:

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
~~~

### 사용자 정의 récurring 블록의 예

다음은 사용자 정의 반복 블록의 예를 만들어 보겠습니다. 예를 들어 월별(monthly)와 연간(yearly) 반복 유형을 제거하고 모든 이벤트에 대해 끝이 없는 날짜 옵션("no end date")을 갖도록 하고자 할 때의 예를 살펴보겠습니다.

1. 사용자 정의 양식의 마크업을 정의하고 페이지의 어디에나 두고 시작합니다(기본 템플릿을 복사하여 시작할 수 있습니다):

~~~html
<!-- 주의: 사용자 정의 recurring 양식의 id를 지정해야 합니다 -->
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

2. 'recurring' 섹션의 form 매개변수를 사용자 정의 양식의 id로 설정합니다:

~~~js
scheduler.config.lightbox.sections = [
    { name: "description", type: "textarea", map_to: "text", focus: true },
    { name: "recurring", type: "recurring", map_to: "rrule", 
        form: "my_recurring_form" }, /*!*/
    { name: "time", type: "time", map_to: "auto", height: 72 },
];
~~~

위의 사용자 정의 블록이 적용된 라이트박스는 아래 그림과 같습니다:

<div style="text-align:center;">![custom_recurring_form](/img/custom_recurring_form.png)</div>

다음 스니펫은 위에서 설명한 사용자 정의 반복 블록으로 라이트박스를 구현하는 방법을 보여 줍니다:

관련 샘플 [Lightbox with a custom recurring block](https://snippet.dhtmlx.com/0ha0edlk)
  
### 반복 블록 변경에 대한 주의사항

사용자 정의 구성으로 라이트박스의 recurring 블록을 적용하기 전에 다음 사항을 반드시 고려하십시오: 

1) 입력의 **name** 속성은 모든 입력에 대해 고정되어 있습니다. 다른 이름의 입력은 무시됩니다.
2) 직접 입력을 암시하는 입력을 제외한 모든 입력의 **value** 속성은 고정됩니다.
3) 새로운 양식을 지정하면 Scheduler는 이를 직접 사용하지 않고 라이트박스의 템플릿에 HTML 구조를 복제합니다. 즉, 코드에서 폼에 연결된 모든 이벤트 핸들러나 커스텀 속성은 라이트박스의 폼에 적용되지 않습니다. 이벤트 핸들러를 연결하려면 인라인 HTML 속성으로 지정하거나 라이트박스에 표시될 때 폼에 핸들러를 연결해야 합니다.

:::note
주의: Scheduler는 원래의 HTML 폼과 함께 작동하지 않고, 라이트박스 템플릿에 사본을 생성합니다.
:::


예를 들면 아래와 같습니다:

- 다음 줄은 라이트박스에 복사됩니다:

~~~html
<input onclick="handler()"> 
~~~

- 아래 줄은 라이트박스에 복사되지 않습니다:

~~~js
addEventListener(node, "click", function(){...})
~~~

## 커스텀 확인 모달 {#customconfirmationmodal}

사용자가 반복 이벤트를 수정하거나 드래그할 때, 스케줄러는 단일 발생만 수정할지, 그 이후의 이벤트들과 함께 수정할지, 또는 시리즈 전체를 수정할지 여부를 묻는 기본 모달을 표시합니다. 이를 `scheduler.ext.recurring.confirm`를 재정의하여 자체 UI로 바꿀 수 있습니다.

~~~js
scheduler.ext.recurring.confirm = function(context) {
  // context에는 다음이 포함됩니다:
  // - origin: "lightbox" | "dnd"
  // - occurrence: 수정 중인 발생 객체
  // - series: 상위 시리즈 이벤트 객체
  // - labels: { title, ok, cancel, occurrence, following, series }
  // - options: ["occurrence", "following", "series"]
  //
  // 반환 값은 "occurrence", "following", "series" 중 하나이거나 취소를 원하면 null
  // 비동기 UI를 원하면 Promise를 반환할 수도 있습니다.

  return new Promise(function(resolve) {
    myCustomDialog.show({
      title: context.labels.title,
      options: context.options,
      onSelect: function(choice) { resolve(choice); },
      onCancel: function() { resolve(null); }
    });
  });
};
~~~

컨텍스트 객체에는 다음 속성들이 있습니다:

| 속성 | 타입 | 설명 |
|---|---|---|
| `origin` | `"lightbox" \| "dnd"` | 작업이 라이트박스에서 시작되었는지 아니면 드래그 앤 드롭에서 시작되었는지 |
| `occurrence` | `object` | 수정 중인 특정 발생 |
| `series` | `object` | 상위 반복 이벤트 |
| `labels` | `object` | 지역화된 문자열: `title`, `ok`, `cancel`, `occurrence`, `following`, `series` |
| `options` | `string[]` | 사용 가능한 선택지, 예: `["occurrence", "following", "series"]` |

이 함수는 `"occurrence"`, `"following"`, `"series"`, 또는 취소를 원하면 `null`을 반환해야 합니다. 값을 직접 반환하거나 Promise로 반환할 수 있습니다.

React 구현의 경우, [React Scheduler 문서](integrations/react/overview.md#customizingtherecurrenceconfirmationmodal)를 참조하세요.


## 반복 이벤트의 레거시 형식

7.1 버전 이전의 Scheduler는 반복 이벤트에 대해 커스텀 형식을 사용했습니다. 포맷에 대한 세부 정보는 [여기](guides/recurring-events-legacy.md)에서 확인할 수 있습니다.