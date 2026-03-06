---
title: "반복 이벤트"
sidebar_label: "반복 이벤트"
---

# 반복 이벤트

반복 이벤트는 이벤트 캘린더 애플리케이션에서 유용하게 사용되는 기능으로, 사용자가 원하는 간격으로 반복되는 이벤트를 설정할 수 있게 해줍니다. 7.1 버전부터 Scheduler는 반복 이벤트에 대해 [RFC-5545](https://datatracker.ietf.org/doc/html/rfc5545) 표준 형식을 채택하고 있습니다.

이 가이드는 Scheduler에서 반복 이벤트를 다루는 방법과 데이터베이스에 저장하는 방법을 설명합니다.

:::note
이전 반복 이벤트 형식에 대한 설명은 [여기](guides/recurring-events-legacy.md)에서 확인할 수 있습니다.
:::

기본적으로 Scheduler에는 반복 이벤트 기능이 활성화되어 있지 않습니다. 이 기능을 사용하려면 페이지에서 **recurring** 플러그인을 활성화해야 합니다.

~~~js
scheduler.plugins({
    recurring: true
});
~~~

반복 이벤트를 활성화하면, 라이트박스 인터페이스에 아래와 같이 추가 섹션이 표시됩니다:

![recurring_lightbox](/img/recurring_lightbox.png)

## 설정 옵션 {#configurationoptions}

라이브러리는 반복 이벤트를 커스터마이즈할 수 있는 다음 옵션을 제공합니다:

- [repeat_date](api/config/repeat_date.md) - 'recurring' 라이트박스의 'End by' 필드에 사용되는 날짜 형식을 제어합니다.

~~~js
scheduler.config.repeat_date = "%m/%d/%Y";
...
scheduler.init('scheduler_here', new Date(2019, 7, 5), "month");
~~~


[Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## 'Recurring' 라이트박스 {#recurringlightbox}

반복 확장 기능을 활성화하면, 라이트박스에 "Repeat event"라는 추가 섹션이 생깁니다. 'recurring' 라이트박스의 기본 구성은 다음과 같습니다:

~~~js
[     
    {name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
    {name:"recurring", height:115, type:"recurring", map_to:"rec_type", 
        button:"recurring"},
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

다른 섹션을 추가할 수 있지만, "recurring"과 "time" 섹션은 반드시 남겨두어야 하며, "time" 섹션은 항상 "recurring" 섹션 **뒤에** 위치해야 합니다.


[Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## 포맷 설명 {#formatdescription}

반복 이벤트는 데이터베이스에 단일 레코드로 저장되며, 표준 이벤트 필드 외에도 몇 가지 추가 속성이 포함됩니다:

1. **start_date** - (_datetime_) 시리즈의 시작 날짜
2. **end_date** - (_datetime_) 시리즈의 종료 날짜
3. **rrule** - (_string_) 반복 규칙을 정의
4. **duration** - (_number_) 각 반복 인스턴스의 지속 시간
5. **recurring_event_id** - (_string|number_) 상위 시리즈의 ID; 수정 또는 삭제된 발생에만 설정됨
6. **original_start** - (_datetime_) 수정된 발생의 원래 날짜; 수정 또는 삭제된 인스턴스에만 설정됨
7. **deleted** - (_boolean_) 삭제된 발생을 표시; 삭제된 인스턴스에만 설정됨

**rrule** 속성은 RFC-5545에서 정의된 iCalendar 형식을 따르며, 빈도, 간격 및 기타 반복 세부 정보를 지정합니다.

### iCalendar 형식과의 차이점

우리의 포맷이 iCalendar 포맷과 다른 점은 두 가지가 있습니다:

#### STDATE와 DTEND의 별도 저장

iCalendar에서는 반복 시리즈의 시작 및 종료 날짜를 **RRULE** 문자열 내 **STDATE**와 **DTEND** 속성으로 포함하는 것이 일반적이지만, 우리 포맷에서는 **start_date**와 **end_date**를 별도의 필드로 저장합니다. 이를 통해 **RRULE** 문자열을 파싱하지 않고도 날짜별로 반복 이벤트를 더 쉽게 다루고 조회할 수 있습니다.

예를 들어 2024년 6월 1일부터 2024년 12월 1일까지 매주 월요일 반복되는 이벤트 시리즈는 다음과 같이 저장됩니다:

~~~
{
  "id": 1,
  "text": "Weekly Team Meeting",
  "start_date": "2024-06-03 09:00:00",
  "duration": 3600,
  "end_date": "2024-12-02 10:00:00",
  "rrule": "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO",
  "recurring_event_id": null,
  "original_start": null
}
~~~

#### 예외 처리

예외(즉, 수정되거나 삭제된 발생)는 상위 시리즈와 연결된 별도의 이벤트 레코드로 저장됩니다. 이러한 예외 레코드는 **recurring_event_id**, **original_start**, **deleted**의 세 가지 추가 속성을 포함합니다. 이를 통해 어떤 인스턴스가 변경 또는 삭제되었는지, 그리고 해당 인스턴스가 메인 시리즈와 어떻게 연결되는지 알 수 있습니다.

:::note
표준 iCalendar 포맷과 달리, 예외(수정 또는 삭제된 인스턴스)는 **RRULE**의 **EXDATE** 속성에 저장되지 **않습니다**.
:::

예를 들어, 하나의 수정된 발생과 하나의 삭제된 발생이 있는 반복 시리즈는 다음과 같이 저장됩니다:
~~~
[
  {
    "id": 1,
    "text": "Weekly Team Meeting",
    "start_date": "2024-06-03 09:00:00",
    "duration": 3600,
    "end_date": "2024-12-02 10:00:00",
    "rrule": "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO",
    "recurring_event_id": null,
    "original_start": null
  },
  {
    "id": 2,
    "text": "Special Team Meeting",
    "start_date": "2024-06-10 09:00:00",
    "end_date": "2024-06-10 11:00:00",
    "rrule": null,
    "recurring_event_id": 1,
    "original_start": "2024-06-10 09:00:00"
  },
  {
    "id": 3,
    "text": "Deleted Team Meeting",
    "start_date": "2024-06-17 09:00:00",
    "end_date": "2024-06-17 10:00:00",
    "rrule": null,
    "recurring_event_id": 1,
    "original_start": "2024-06-17 09:00:00",
    "deleted": true
  }
]
~~~

`2024-06-10 09:00:00`에 예정된 이벤트는 `Special Team Meeting` 레코드로 대체되고, `2024-06-17 09:00:00` 이벤트는 생략됩니다.

수정되거나 삭제된 인스턴스의 **rrule**은 무시된다는 점에 유의하세요.

또한, 삭제된 발생의 **text**, **start_date**, **end_date** 필드는 Scheduler 동작에 영향을 주지 않습니다.


## 시리즈 내 특정 발생 편집/삭제 {#editingdeleting-a-certain-occurrence-in-the-series}

반복 시리즈 내에서 특정 발생을 삭제하거나 편집할 수 있습니다.

### 중요 팁

- 반복 이벤트의 각 변경 사항은 데이터베이스에 새로운 레코드를 생성합니다.
- 개별 발생은 **recurring_event_id** 속성을 통해 메인 시리즈와 연결됩니다.
- 발생이 편집될 때, **original_start** 필드는 해당 발생이 원래 예정되었던 날짜를 저장합니다(새 날짜가 아님). 예를 들어, 2024년 7월 27일 15:00에 예정된 발생이 2024년 7월 30일 15:00로 이동되면, **original_start**는 여전히 2024년 7월 27일 15:00으로 남아 있습니다.


### 서버 사이드 로직 {#server-side-logic}

추가 필드 외에, 서버 사이드 컨트롤러는 다음과 같은 로직을 구현해야 합니다:

- 삭제된 인스턴스가 추가될 때, 서버 응답에 "deleted" 상태가 포함되어야 합니다.
    - 삭제된 인스턴스는 **deleted** 속성이 비어 있지 않을 때 인식됩니다.
- 시리즈가 수정되면, 해당 시리즈에 연결된 모든 수정 및 삭제된 발생을 삭제해야 합니다.
    - 시리즈는 **rrule**이 비어 있지 않고 **recurring_event_id**가 비어 있는 경우로 식별됩니다.
    - 수정된 발생은 **recurring_event_id**가 시리즈의 **id**와 일치하는 모든 레코드입니다.
- **recurring_event_id**가 비어 있지 않은 이벤트가 삭제될 경우, 해당 레코드를 제거하는 대신 **deleted="true**로" 업데이트해야 합니다.

:::note
완전한 코드 예제는 [여기](integrations/howtostart-guides.md)에서 확인할 수 있습니다.
:::


## 라이트박스 반복 블록의 커스텀 컨트롤 {#custom-control-for-the-lightboxs-recurring-block}

4.2 버전부터 dhtmlxScheduler는 라이트박스의 'recurring' 섹션에 대해 커스텀 HTML 폼을 정의할 수 있습니다.

#### 어떤 커스터마이징이 가능한가요?

1. 폼의 마크업을 변경할 수 있습니다.
2. 불필요한 요소(예: 'yearly' 반복 옵션 및 해당 입력란)를 제거할 수 있습니다.
3. 입력값의 기본값을 설정할 수 있습니다(예: 항상 '종료일 없음' 옵션을 선택하고 반복 종료 지정 블록을 숨기기).

### 사용 예시

아래는 'monthly'와 'yearly' 반복 옵션을 제거하고, 'no end date' 옵션을 기본값으로 설정(반복 종료 블록 숨김)하는 예시입니다.

1. 페이지 어딘가에 커스텀 폼의 마크업을 정의합니다(기본 템플릿은 'schedulersourceslocalerecurring'에서 복사하여 시작할 수 있습니다):
~~~html
<div class="dhx_form_repeat" id="my_recurring_form"> /*!*/
  <form>
    <div>
      <select name="repeat">
        <option value="day">Daily</option>
        <option value="week">Weekly</option>
      </select>
    </div>
    <div>
      <div id="dhx_repeat_day">
        <input type="hidden" name="day_type" value="d"/>
        <input type="hidden" name="day_count" value="1" />
      </div>
      <div id="dhx_repeat_week">
        Repeat every week next days:


       <label><input type="checkbox" name="week_day" value="1" />Monday</label>
       <label><input type="checkbox" name="week_day" value="2" />Tuesday</label>
       <label><input type="checkbox" name="week_day" value="3" />Wednesday</label>
       <label><input type="checkbox" name="week_day" value="4" />Thursday</label>
       <label><input type="checkbox" name="week_day" value="5" />Friday</label>
       <label><input type="checkbox" name="week_day" value="6" />Saturday</label>
       <label><input type="checkbox" name="week_day" value="0" />Sunday</label>
       <input type="hidden" name="week_count" value="1" />
      </div>
    </div>

    <input type="hidden" value="no" name="end">
  </form>
</div>
~~~
2. 'recurring' 섹션의 'form' 파라미터를 커스텀 폼의 ID로 설정합니다: 
~~~js
scheduler.config.lightbox.sections = [
    {name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
    {name:"recurring", type:"recurring", map_to:"rec_type", button:"recurring", 
      form:"my_recurring_form"},/*!*/
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

<div>![custom_recurring_form](/img/custom_recurring_form.png)</div>

### 주요 구성 요소

라이트박스의 반복 블록에 대한 기본 HTML 구조는 다양한 언어에 맞게 <b>'schedulersourceslocalerecurring'</b> 디렉터리에 위치해 있습니다.


예를 들어, 영어 로케일은 <b>'schedulersourceslocalerecurringrepeat_template_en.htm'</b> 파일을 사용합니다.

라이트박스의 반복 블록은 일반적으로 3가지 그룹의 컨트롤로 구성되어 있습니다:

1) 반복 유형을 선택하는 컨트롤. 이 입력들은 모두 'repeat'라는 이름을 공유하며 값은 'daily', 'weekly', 'monthly', 'yearly' 중 하나입니다. 
폼에는 반드시 값이 지정된 'repeat' 입력이 최소 하나 이상 포함되어 있어야 합니다. 라디오 버튼, 셀렉트 드롭다운, 또는 숨겨진 입력을 사용해 기본 유형을 지정할 수 있습니다.

다음은 폼에서 반복 유형을 선택하는 유효한 예시입니다:

- 라디오 버튼:

~~~html
<label><input type="radio" name="repeat" value="day" />Daily</label>


<label><input type="radio" name="repeat" value="week"/>Weekly</label>


<label><input type="radio" name="repeat" value="month" />Monthly</label>


<label><input type="radio" name="repeat" value="year" />Yearly</label>
~~~

- 'Monthly'와 'Yearly' 옵션을 제외한 셀렉트 입력:

~~~html
<select name="repeat">
  <option value="day">Daily</option>
  <option value="week">Weekly</option>
</select>
~~~

- 숨겨진 입력(이 경우 'Daily' 시리즈만 생성됨):

~~~html
<input type="hidden" name="repeat" value="day" />
~~~

2) 선택된 반복 유형에 따라 반복 상세 설정을 위한 섹션. 예를 들어, 'Daily' 반복 유형 블록은 다음과 같습니다:

~~~html
<div class="dhx_repeat_center">
   <div id="dhx_repeat_day">
     <label>
       <input class="dhx_repeat_radio" type="radio" 
               name="day_type" value="d"/>Every
     </label>
       <input class="dhx_repeat_text" type="text" 
               name="day_count" value="1" />day


     <label>
       <input class="dhx_repeat_radio" type="radio" 
               name="day_type" checked value="w"/>Every workday
     </label>
  </div>
...
</div>         
~~~

특정 반복 유형과 관련된 마크업은 <b>id</b>를 <b>"dhx_repeat_&lt;repeat type&gt;"</b> 형식(예: "dhx_repeat_day")으로 지정한 div로 감쌀 수 있습니다. 
이 블록은 해당 반복 유형이 선택될 때만 표시됩니다.

3) 반복 종료 시점을 지정하는 컨트롤. 이 입력의 이름은 'end'입니다. 


가능한 값은 <b>'no'</b>, <b>'date_of_end'</b>, <b>'occurences_count'</b>가 있습니다.

'repeat' 컨트롤과 마찬가지로, 폼에는 이 타입의 입력이 최소 하나 이상 포함되어야 합니다.

~~~html
<div class="dhx_repeat_right">
  <label>
    <input type="radio" name="end" value="no" checked/>No end date
  </label>


  <label>
    <input type="radio" name="end" value="date_of_end" />After</label>
    <input type="text" name="date_of_end" />
  


  <label>
    <input type="radio" name="end" value="occurences_count" />After</label>
    <input type="text" name="occurences_count" value="1" />Occurrences
</div>
~~~

<b>'date_of_end'</b> 모드에서는 'date_of_end'라는 이름의 입력에 날짜를 입력해야 합니다. 마찬가지로, <b>'occurences_count'</b> 모드에서는 'occurences_count'라는 이름의 입력에서 반복 횟수를 가져옵니다. 


원하지 않는 반복 유형을 제거하거나 숨겨진 입력을 사용해 미리 지정할 수 있습니다:

~~~html
<input type="hidden" name="end" value="date_of_end" />
<input type="hidden" name="date_of_end" value="01.01.2024" />
~~~
  
### 반복 블록 변경 시 주의사항

라이트박스의 반복 블록을 커스터마이즈하기 전에 다음 사항을 반드시 확인하세요:

1. 모든 입력의 'name' 속성은 고정되어 있습니다. 이름이 다른 입력은 무시됩니다. 
2. 직접 사용자 입력을 받는 입력을 제외한 모든 입력의 'value' 속성은 고정되어 있습니다. 
3. 새로운 폼을 제공할 경우, dhtmlxScheduler는 이를 직접 사용하지 않고 라이트박스 템플릿 내부에 HTML 구조를 복제합니다. 
즉, 폼의 DOM 요소에 연결된 이벤트 핸들러나 커스텀 속성은 라이트박스에서 적용되지 않습니다. 
이벤트 핸들러를 추가하려면 인라인 HTML 속성으로 포함하거나, 폼이 라이트박스에 표시될 때 직접 연결해야 합니다.

:::note
dhtmlxScheduler는 원본 HTML 폼이 아닌, 해당 폼의 복사본을 라이트박스 템플릿 내부에 생성하여 사용한다는 점을 유념하세요.
:::

예시:

- 이 코드는 라이트박스에 복사되어 동작합니다:

~~~html
<input onclick="handler()"> 
~~~

- 하지만 아래와 같은 방식은 복사되지 않습니다:

~~~js
addEventListener(node, "click", function(){...})
~~~

## 이전 버전 반복 이벤트 포맷 {#legacyformatofrecurringevents}

버전 7.1까지 Scheduler는 반복 이벤트에 대해 커스텀 포맷을 사용했습니다. 이 포맷에 대한 자세한 내용은 [여기](guides/recurring-events-legacy.md)에서 확인할 수 있습니다.
