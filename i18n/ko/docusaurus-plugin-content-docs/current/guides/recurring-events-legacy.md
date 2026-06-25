---
title: "반복 이벤트( v7.1까지 )" 
sidebar_label: "반복 이벤트( v7.1까지 )" 
---

# 반복 이벤트( v7.1까지 )

*The article refers to the legacy format of recurring events for DHTMLX Scheduler. If you use DHTMLX Scheduler v7.1+ see the details on the current version [here](guides/recurring-events.md).*

이 문서는 DHTMLX Scheduler의 반복 이벤트 레거시 형식에 관한 내용입니다. DHTMLX Scheduler v7.1+를 사용하는 경우 현재 버전에 대한 세부 정보는 [여기](guides/recurring-events.md)를 참조하세요.

기본적으로 스케줄러는 반복 이벤트를 지원하지 않습니다. 이러한 지원을 활성화하려면 페이지에서 특수 확장을 활성화해야 합니다 - **recurring_legacy**.

~~~js
scheduler.plugins({
    recurring_legacy: true
});
~~~

반복 이벤트 지원이 활성화되면, 라이트박스가 아래와 같이 보이기 시작합니다:

![recurring_lightbox_legacy](/img/recurring_lightbox_legacy.png)


## 구성 옵션

라이브러리는 반복 이벤트를 구성하기 위한 다음 옵션들을 제공합니다:

- [repeat_date](api/config/repeat_date.md) - 'recurring' 라이트박스의 'End by' 필드의 날짜 형식을 설정합니다
- [include_end_by](api/config/include_end_by.md) - 'End by' 필드에 지정된 날짜가 배타적이거나 포괄적으로 처리될지 정의합니다
- [recurring_overflow_instances](api/config/recurring_overflow_instances.md) - 다음 달로 넘어가는 반복의 동작을 정의합니다
- [repeat_precise](api/config/repeat_precise.md) - 'weekly' 반복인 이벤트에 과거 날짜를 포함하지 않도록 방지합니다
- [occurrence_timestamp_in_utc](api/config/occurrence_timestamp_in_utc.md) - 시간대와 무관하게 반복 이벤트를 다룰 수 있도록 허용합니다

~~~js
scheduler.config.repeat_date = "%m/%d/%Y";
scheduler.config.include_end_by = true;
...
scheduler.init('scheduler_here', new Date(2027, 7, 5), "month");
~~~


[Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## 'Recurring' 라이트박스

기본적으로 반복 확장이 활성화되면, 라이트박스에 한 섹션이 더 생깁니다 - "Repeat event". 그리고 'recurring' 라이트박스의 기본 정의는 아래와 같이 시작합니다:

~~~js
[     
    {name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
    {name:"recurring", height:115, type:"recurring", map_to:"rec_type", 
        button:"recurring"},
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

추가로 섹션을 더 추가할 수 있지만, 반드시 "recurring"과 "time" 섹션 두 가지를 유지해야 합니다. 또한, "time" 섹션은 반드시 "recurring" 섹션 뒤에 위치해야 합니다.


[Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## 서버 측 통합(Server-side Integration)

반복 이벤트는 일반 이벤트의 모든 필드에 추가로 3개의 필드를 포함하는 단일 레코드로 데이터베이스에 저장됩니다:

1. **rec_type** - (_varchar_) 반복 로직을 정의합니다. 이 필드는 자동으로 채워집니다
2. **event_length** - (_long int_) 이벤트의 실제 길이(초 단위)
3. **event_pid** - (_int_) 시퀀스의 부모 ID

따라서 백엔드는 일반 이벤트 필드와 함께 반복 필드를 반환해야 합니다. 예:

~~~js
{
  "id": 1,
  "start_date": "2027-01-03 10:00:00",
  "end_date": "2027-01-13 00:00:00",
  "text": "some_text",
  "rec_type": "day_1___",
  "event_length": 7200,
  "event_pid": 0
}
~~~

일반적으로 필수 필드 외에 데이터베이스에서 추가 데이터를 추가로 추출할 수 있습니다.

다만, **start_date** 및 **end_date** 필드의 의미는 약간 달라집니다:

- **start_date** - 시리즈의 첫 이벤트 시작 날짜를 'yyyy-mm-dd hh:mm:ss' 형식으로 나타냅니다( settings_format.md).
- **end_date** - 시리즈의 마지막 이벤트 종료 날짜를 'yyyy-mm-dd 00:00:00' 형식으로 나타냅니다( settings_format.md).

예를 들어 2027년 1월 3일 10:00에 시작하고 매일 반복되며 2027년 1월 13일 12:00에 종료되는 반복 이벤트는 데이터베이스에 아래와 같이 표시됩니다:

~~~js
id:1,
start_date:"2027-01-03 10:00:00",
end_date:"2027-01-13 00:00:00",
text:"some_text",
details:"",
rec_type:"day_1___",
event_length:"7200",
event_pid:"0" //0은 상위 이벤트를 위한 값이거나 하위 이벤트의 상위 이벤트 ID
~~~

클라이언트 측은 **rec_type** 필드로부터 아래 형식의 문자열 데이터를 얻습니다:

~~~html
[type]_[count]_[day]_[count2]_[days]#[extra]
~~~

다음과 같은 구성으로 해석됩니다:

- *type* - 반복의 유형: 'day','week','month','year'.
- *count* - 유형 단위에서의 이벤트 간 간격.
- *day* 및 *count2* - 달의 특정 일을 정의합니다( 예: 첫 번째 월요일, 다섯째 금요일 등 ).
- *days* - 영향을 받는 요일의 쉼표로 구분된 목록.
- *extra* - 반복 세부 정보의 표시를 바꾸는 데 사용할 수 있는 추가 정보.

**rec_type** 데이터의 예:

- *"day_3___"* - 매 3일마다
- *"month _2___"* - 매 2개월마다
- *"month_1_1_2_"* - 매달의 두 번째 월요일
- *"week_2___1,5"* - 매주 두 번째 주의 월요일과 금요일

*더블 언더라인이나 트리플 언더라인은 문자열의 관련 매개변수가 생략되었음을 나타냅니다.*


## 백엔드에서 시퀀스 파싱(Parsing series on the backend)

반복 이벤트는 데이터베이스에 단일 레코드로 저장되며, Scheduler가 클라이언트 측에서 이를 분할할 수 있습니다. 서버 측에서 개별 이벤트의 날짜를 얻어야 하는 경우 ASP.NET/ASP.NET Core/PHP용 반복 이벤트 파싱 도우미 라이브러리를 사용하십시오.

다음의 준비된 라이브러리를 GitHub에서 찾을 수 있습니다:

- [for ASP.NET/ASP.NET Core](https://github.com/DHTMLX/scheduler-recurring-events-dotnet)
- [for PHP 5.4+](https://github.com/DHTMLX/scheduler-helper-php)


## 시퀀스의 특정 발생(Edit/Delete a certain occurrence in the series)

시리즈의 특정 발생을 삭제하거나 편집하는 기능이 있습니다.

### 중요한 팁

- 반복 이벤트를 업데이트할 때마다 데이터베이스에 별도 레코드가 생성됩니다.
- 특정 발생은 **event_pid** 속성을 통해 상위 이벤트를 가리킵니다.
- 시리즈를 편집한 경우, 이 업데이트에 대해 해당 발생이 원래 있었어야 할 시점을 나타내는 타임스탬프가 저장되며, 실제 이벤트 길이가 아닌 값이 저장됩니다. 예를 들어 발생이 2027년 7월 27일 15:00에 발생했고 2027년 7월 30일 15:00으로 이동했다면, 타임스탬프는 처음 날짜를 반영합니다. 타임스탬프는 UNIX epoch으로부터의 초 단위로 측정됩니다.
- 시리즈의 편집 발생이 DB에 저장된 경우 라이트박스를 통해 "Edit series"를 저장하면 저장된 모든 레코드가 삭제됩니다. 남는 레코드는 주된 반복 이벤트뿐이며, 그 발생들의 차이는 사라져 동일해집니다.

### 예시를 살펴보자

당신은 올림픽 경기의 팬이고 2027년 런던 올림픽(27일 7월 - 12일 8월)을 최대한 많이 보고 싶다고 가정합니다. 그래서 *17:00에 시작*(퇴근 시간)하고 *23:00에 끝나는* 반복 이벤트를 만들고 싶습니다. 하지만 개막식은 *오직 19:00에 시작*하므로 해당 날짜의 첫 이벤트의 시간을 19:00-23:00로 변경하고 싶습니다. 또한 2027년 8월 1일에 마감일이 있어 집에 너무 늦게 도착할 가능성이 있습니다. 따라서 시리즈에서 2027년 8월 1일을 삭제해야 합니다.

#### 간단히 말해, 당신의 작업은 다음과 같습니다:

1. 2027년 7월 27일부터 2027년 8월 12일 사이에 **(17.00-23.00)** 의 반복 이벤트를 생성합니다.
2. 7월 27일에 특정 발생을 편집하여 시간대를 **_17.00-23.00에서 19.00-23.00으로_** 변경합니다.
3. 2027년 8월 1일의 특정 발생을 시리즈에서 삭제합니다.

결과적으로 데이터베이스에는 반복 이벤트에 대한 3개의 레코드가 남아 있어야 합니다.

#### 액션별로 DB에서 일어나는 변화:

생성:

![create_a_recurring_event.png](/img/create_a_recurring_event.png)

편집 **July 27,2027**:

![edit_a_recurring_event.png](/img/edit_a_recurring_event.png)

삭제 **August 1,2027**: 

![delete_an_occurrence.png](/img/delete_an_occurrence.png)


### 서버 측 로직(Server-side logic)

추가 필드 외에도 특정 로직을 서버 측 컨트롤러에 추가해야 합니다:

- 만약 rec_type==none인 이벤트가 삽입되면 응답은 "deleted" 상태여야 합니다.
- 만약 rec_type!=none인 이벤트가 업데이트되거나 삭제되면, 관련된 모든 event_pid를 가진 레코드를 삭제해야 합니다.
- 만약 event_pid 값을 가진 이벤트가 삭제되면, 삭제 대신 rec_type==none으로 업데이트되어야 합니다.

:::note
전체 코드 예제는 [여기](integrations/howtostart-guides.md)에서 확인할 수 있습니다
:::

이 로직을 백엔드 컨트롤러 또는 서비스에 구현하여 반복 시퀀스와 예외를 일관되게 유지하십시오.


## Dragging all sequence(시퀀스 전체 이동)

사용자에게 반복 이벤트를 끌어서 전체 시퀀스를 이동할 수 있는 기능을 추가하려면, 스케줄러 초기화 전에 다음 코드를 추가합니다:

~~~js
scheduler.attachEvent("onBeforeEventChanged",function(dev){
    let parts = scheduler.getState().drag_id.toString().split("#");
     if (parts.length > 1) {

          let series = this.getEvent(parts[0]);

          series.start_date.setHours(dev.start_date.getHours());
          series.start_date.setMinutes(dev.start_date.getMinutes());
          series.event_length = (dev.end_date - dev.start_date) / 1000;

          setTimeout(function(){
               scheduler.addEvent(series);
          }, 1);

          return false;
     }
     return true;
});
~~~


## 라이트박스의 반복 블록에 대한 맞춤 컨트롤(Custom control for the lightbox's recurring block)

버전 4.2부터, dhtxmlScheduler는 라이트박스의 'recurring' 블록에 대해 사용자 정의 HTML 양식을 지정할 수 있도록 합니다.

#### 어떤 커스터마이징을 할 수 있나요?

1. 폼 마크업을 변경하기
2. 필요 없는 요소 제거(예: 'yearly' 반복 타입 및 관련 입력들)
3. 입력에 기본값 설정(예: 모든 시리즈를 "종료일 없음"으로 생성하고 싶다면, 'no end date' 옵션을 체크하고 반복 종료를 지정하는 전체 블록을 숨깁니다)

### 사용 예

다음 예시로 시작해 봅시다. 월간과 연간 반복 타입을 제거하고 모든 이벤트에 대해 'no end date' 옵션을 사용하도록 하고 싶다고 가정합니다(즉, 반복 종료를 지정하는 블록을 제거).

1. 맞춤 폼의 마크업을 정의하고 페이지의 어딘가에 배치합니다(기본 템플릿은 <b>'schedulersourceslocalerecurring'</b>을 복사해 시작할 수 있습니다):
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
      <div style="display:none;" id="dhx_repeat_day">
        <input type="hidden" name="day_type" value="d"/>
        <input type="hidden" name="day_count" value="1" />
      </div>
      <div style="display:none;" id="dhx_repeat_week">
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
2. 'recurring' 섹션의 'form' 파라미터를 커스텀 양식의 id로 설정합니다:
~~~js
scheduler.config.lightbox.sections = [
    {name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
    {name:"recurring", type:"recurring", map_to:"rec_type", button:"recurring", 
      form:"my_recurring_form"},/*!*/
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~


<div style="text-align:center;">![custom_recurring_form_legacy](/img/custom_recurring_form_legacy.png)</div>

### 주요 부분

다양한 언어에 대한 기본 HTML 구조는 <b>'schedulersourceslocalerecurring'</b> 디렉토리에서 확인할 수 있습니다.

예를 들어, 영어 로케일의 경우 <b>'schedulersourceslocalerecurringrepeat_template_en.htm'</b> 파일을 확인하면 됩니다.

대부분의 경우 라이트박스의 반복 블록은 3개의 제어 그룹으로 구성됩니다:

1) 반복 유형을 선택하는 컨트롤들. 이 입력들의 이름은 'repeat'이고 값은 아래 중 하나입니다: 'daily', 'weekly', 'monthly', 'yearly'. 폼은 최소 하나의 'repeat' 입력을 가지고 있어야 합니다. 라디오 버튼, 셀렉트 또는 숨겨진 입력으로 기본 유형을 설정할 수 있습니다.

다음은 반복 유형을 선택하는 일반적인 방법들입니다. 

- 라디오 버튼

~~~html
<label><input type="radio" name="repeat" value="day" />Daily</label>


<label><input type="radio" name="repeat" value="week"/>Weekly</label>


<label><input type="radio" name="repeat" value="month" />Monthly</label>


<label><input type="radio" name="repeat" value="year" />Yearly</label>
~~~

- Select 입력, 'Monthly'와 'Yearly' 옵션 없이:

~~~html
<select name="repeat">
  <option value="day">Daily</option>
  <option value="week">Weekly</option>
</select>
~~~

- Hidden 입력(라이트박스는 자동으로 'Daily' 시리즈만 생성합니다):

~~~html
<input type="hidden" name="repeat" value="day" />
~~~

2) 반복 유형에 따라 반복 구성을 위한 블록. 예를 들어 'Daily' 반복 유형의 경우 다음과 같은 구조를 가집니다:

~~~html
<div class="dhx_repeat_center">
   <div style="display:none;" id="dhx_repeat_day">
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

특정 반복 유형에 관련된 마크업은 해당 반복 유형의 형식에 맞춰 <b>id</b> 형식으로 래핑될 수 있습니다. 예: "dhx_repeat_day". 이 경우 적절한 반복 유형이 선택될 때만 표시됩니다.

3) 반복 종료를 지정하는 제어들. 반복 종료는 'end' 이름의 입력으로 정의됩니다.

가능한 값은 <b>'no'</b>, <b>'date_of_end'</b>, <b>'occurences_count'</b>입니다.

참고로, 위의 'repeat' 컨트롤과 마찬가지로 이 형식의 입력도 최소 하나는 있어야 합니다.

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

'date_of_end' 모드의 날짜는 'date_of_end'라는 이름의 입력에 정의되어야 하며, 같은 방식으로 'occurences_count' 모드 역시 'occurences_count'라는 입력에서 발생 수를 가져옵니다.

원하는 경우 유형을 제거하거나 숨겨진 입력으로 미리 정의할 수 있습니다:

~~~html
<input type="hidden" name="end" value="date_of_end" />
<input type="hidden" name="date_of_end" value="01.01.2027" />
~~~
  
### 반복 블록 변경에 대한 주의사항

맞춤 구성을 적용하기 전에 다음과 같은 내용을 주의하시길 바랍니다:

1. 입력의 'name' 속성은 하드코딩되어 있습니다 - 다른 이름의 입력은 무시됩니다.
2. 모든 입력의 'value' 속성은 직접 입력을 암시하는 입력을 제외하고 고정되어 있습니다.
3. 새 양식을 지정하면 dhtmlxScheduler가 이를 직접 사용하지 않고 라이트박스의 템플릿에 HTML 구조를 복제합니다.
   즉, 코드에서 양식에 연결된 모든 이벤트 핸들러나 사용자 정의 속성은 라이트박스의 양식에 적용되지 않습니다.
   이벤트 핸들러를 연결하려면 인라인 HTML 속성으로 지정하거나, 라이트박스에 표시될 때 양식에 핸들러를 연결해야 합니다.

:::note
주의, dhtmlxScheduler는 원래의 HTML 양식과 함께 작동하지 않고 라이트박스의 템플릿에 복사본만 만듭니다.
:::


예를 들어:

- 아래 줄은 라이트박스로 복사됩니다:

~~~html
<input onclick="handler()"> 
~~~

- 아래 줄은 라이트박스로 복사되지 않습니다:

~~~js
addEventListener(node, "click", function(){...})
~~~