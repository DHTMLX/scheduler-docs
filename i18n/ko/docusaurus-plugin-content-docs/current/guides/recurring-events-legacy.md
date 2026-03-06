---
title: "Recurring Events (v7.1 이하)"
sidebar_label: "Recurring Events (v7.1 이하)"
---

# Recurring Events (v7.1 이하)

*이 문서는 DHTMLX Scheduler에서 반복 이벤트의 레거시 포맷을 다룹니다. DHTMLX Scheduler v7.1+의 최신 버전에 대한 자세한 내용은 [여기](guides/recurring-events.md)를 참고하세요.*

기본적으로 scheduler는 반복 이벤트를 처리하지 않습니다. 이 기능을 추가하려면, 페이지에서 **recurring_legacy**라는 확장 기능을 활성화해야 합니다.

~~~js
scheduler.plugins({
    recurring_legacy: true
});
~~~

반복 이벤트 지원이 활성화되면, 라이트박스에 아래와 같이 추가 섹션이 나타납니다:

![recurring_lightbox](/img/recurring_lightbox.png)

## 설정 옵션

라이브러리는 반복 이벤트를 설정할 수 있는 여러 옵션을 제공합니다:

- [repeat_date](api/config/repeat_date.md) - '반복' 라이트박스의 'End by' 필드에 사용할 날짜 포맷을 지정합니다
- [include_end_by](api/config/include_end_by.md) - 'End by' 필드의 날짜를 포함할지(포함/제외) 여부를 지정합니다
- [recurring_overflow_instances](api/config/recurring_overflow_instances.md) - 반복이 다음 달로 넘어가는 경우 처리 방식을 지정합니다
- [repeat_precise](api/config/repeat_precise.md) - 'weekly' 반복 이벤트에서 과거 날짜를 포함하지 않도록 설정합니다
- [occurrence_timestamp_in_utc](api/config/occurrence_timestamp_in_utc.md) - 타임존에 관계없이 반복 이벤트를 처리할 수 있도록 활성화합니다


~~~js
scheduler.config.repeat_date = "%m/%d/%Y";
scheduler.config.include_end_by = true;
...
scheduler.init('scheduler_here', new Date(2019, 7, 5), "month");
~~~


[Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## 'Recurring' 라이트박스

반복 확장 기능을 활성화하면, 라이트박스에 "Repeat event"라는 추가 섹션이 생깁니다. 기본 'recurring' 라이트박스 구성은 다음과 같습니다:

~~~js
[     
    {name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
    {name:"recurring", height:115, type:"recurring", map_to:"rec_type", 
        button:"recurring"},
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

필요하다면 추가 섹션을 넣을 수 있지만, "recurring"과 "time" 섹션은 반드시 포함되어야 하며, "time" 섹션은 항상 "recurring" 섹션 **뒤에** 위치해야 합니다.


[Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## 서버 연동

반복 이벤트는 데이터베이스에 하나의 레코드로 저장되며, 기존 이벤트 필드 외에 아래 3개의 추가 필드를 포함합니다:

1. **rec_type** - (_varchar_) 반복 패턴을 정의하며, 이 필드는 자동으로 채워집니다
2. **event_length** - (_long int_) 이벤트의 지속 시간을 초 단위로 표시합니다
3. **event_pid** - (_int_) 이벤트 시리즈의 부모 ID를 나타냅니다

일반적인 커넥터 쿼리는 다음과 같습니다:

~~~php
$scheduler->render_table("events_rec","event_id",
"start_date,end_date,text,rec_type,event_pid,event_length");
~~~

이 필드 외에도, 데이터베이스에서 필요한 다른 데이터를 함께 가져올 수 있습니다.

**start_date**와 **end_date**의 의미는 여기서 약간 다릅니다:

- **start_date** - 시리즈 내 첫 이벤트의 시작 날짜('yyyy-mm-dd hh:mm:ss' 형식, ["날짜 형식 지정"](guides/settings-format.md) 참고)
- **end_date** - 시리즈 내 마지막 이벤트의 종료 날짜('yyyy-mm-dd 00:00:00' 형식, ["날짜 형식 지정"](guides/settings-format.md) 참고)

예를 들어, 2019년 1월 3일 10:00부터 매일 반복되며 2019년 1월 13일 12:00에 종료되는 반복 이벤트는 다음과 같이 저장됩니다:

~~~js
id:1,
start_date:"2019-01-03 10:00:00",
end_date:"2019-01-13 00:00:00",
text:"some_text",
details:"",
rec_type:"day_1___",
event_length:"7200",
event_pid:"0" // 부모 이벤트는 0, 하위 이벤트는 부모 ID
~~~

클라이언트 측에서 **rec_type** 필드는 다음과 같은 형식의 문자열을 포함합니다:

~~~html
[type]_[count]_[day]_[count2]_[days]#[extra]
~~~

각 항목의 의미:

- *type* - 반복 유형: 'day','week','month','year'
- *count* - 지정된 유형 단위로 반복되는 간격
- *day*, *count2* - 매월 특정 요일(예: 첫 번째 월요일, 세 번째 금요일 등) 지정
- *days* - 반복되는 요일의 콤마 구분 목록
- *extra* - 반복 상세 표시를 조정할 수 있는 추가 정보

**rec_type** 예시:

- *"day_3___"* - 3일마다 반복
- *"month_2___"* - 2개월마다 반복
- *"month_1_1_2_"* - 매월 두 번째 월요일
- *"week_2___1,5"* - 2주마다 월요일과 금요일

*참고: 이중 또는 삼중 언더스코어는 해당 파라미터가 생략됨을 의미합니다.*

## 백엔드에서 시리즈 파싱

반복 이벤트는 데이터베이스에 단일 레코드로 저장되며, Scheduler가 클라이언트 측에서 이를 분할합니다. 서버 측에서 개별 반복 날짜가 필요하다면, ASP.NET/ASP.NET Core 및 PHP용 반복 이벤트 파싱 도우미 라이브러리를 사용할 수 있습니다.

이 라이브러리는 GitHub에서 제공됩니다:

- [ASP.NET/ASP.NET Core](https://github.com/DHTMLX/scheduler-recurring-events-dotnet)
- [PHP 5.4+](https://github.com/DHTMLX/scheduler-helper-php)

## 시리즈 내 특정 반복 항목 수정/삭제

반복 시리즈 내에서 특정 반복 항목만 수정 또는 삭제할 수 있습니다.

### 중요 사항

- 반복 이벤트를 수정할 때마다 데이터베이스에 별도의 레코드가 생성됩니다.
- 개별 반복 항목은 **event_pid** 속성을 통해 부모 이벤트와 연결됩니다.
- 반복 항목을 수정하면, **event_length** 필드는 실제 이벤트 길이가 아니라 원래 예정되었던 날짜의 타임스탬프(UNIX epoch 기준 초)를 저장합니다. 예를 들어, 2019년 7월 27일 15:00에 예정된 반복 항목을 2019년 7월 30일 15:00로 이동하면, 타임스탬프는 2019년 7월 27일 15:00을 반영합니다.
- 데이터베이스에 수정된 반복 항목이 있는 상태에서 라이트박스에서 '시리즈 수정(Edit series)'를 선택하면, 저장 후 모든 수정된 반복 항목은 삭제되고, 메인 반복 이벤트만 남으며 개별 반복 항목의 변경 내용은 사라집니다.

### 예시 시나리오

올림픽을 좋아하는 사용자가 런던 2012 올림픽(*7월 27일~8월 12일*)을 최대한 시청하고 싶다고 가정합니다. 퇴근 시간인 17:00부터 취침 전인 23:00까지 반복 이벤트를 생성합니다. 단, 개막식이 19:00에 시작하므로 첫 번째 반복 항목만 19:00~23:00으로 변경하고, 8월 1일은 마감일이라 시청하지 못할 것 같아 해당 날짜의 반복 항목은 삭제합니다.

#### 작업 요약:

1. **2012년 7월 27일**부터 **2012년 8월 12일**까지 **17:00~23:00** 반복 이벤트 생성
2. **2012년 7월 27일**의 반복 항목만 **19:00~23:00**으로 수정
3. **2012년 8월 1일**의 반복 항목을 시리즈에서 삭제

이 경우 데이터베이스에는 반복 이벤트와 관련된 3개의 레코드가 생성됩니다.

#### 데이터베이스에서의 단계별 처리:

반복 이벤트 생성:

![create_a_recurring_event.png](/img/create_a_recurring_event.png)

**2012년 7월 27일** 수정:

![edit_a_recurring_event.png](/img/edit_a_recurring_event.png)

**2012년 8월 1일** 삭제:

![delete_an_occurrence.png](/img/delete_an_occurrence.png)

### 서버 측 로직

추가 필드 외에도, 서버 컨트롤러는 다음과 같은 추가 로직을 처리해야 합니다:

- **rec_type == none**인 이벤트가 삽입되면, 응답에서 "deleted" 상태를 반환해야 합니다.
- **rec_type != none**인 이벤트가 수정 또는 삭제될 경우, 해당 **event_pid**와 일치하는 모든 레코드를 삭제해야 합니다.
- **event_pid**가 0이 아닌 이벤트가 삭제될 경우, 실제 삭제 대신 **rec_type == none**으로 업데이트해야 합니다.

:::note
전체 코드 예시는 [여기](integrations/howtostart-guides.md)에서 확인할 수 있습니다.
:::

[PHP Connector](https://github.com/DHTMLX/connector-php)를 사용하는 경우, 서버 측 코드는 다음과 같이 작성할 수 있습니다:

~~~php
function delete_related($action){
    global $scheduler;
    
    $status = $action->get_status();
    $type = $action->get_value("rec_type");
    $pid = $action->get_value("event_pid");
    // 시리즈가 변경/삭제되면 연결된 모든 이벤트 삭제
    if (($status == "deleted" || $status == "updated") && $type != ""){
        $scheduler->sql->query("DELETE FROM events_rec WHERE 
        event_pid='" . $scheduler->sql->escape($action->get_id()) . "'");
    }
    if ($status == "deleted" && $pid != 0){
        $scheduler->sql->query("UPDATE events_rec SET rec_type='none' WHERE 
        event_id='" . $scheduler->sql->escape($action->get_id()) . "'");
        $action->success();
    }
}
function insert_related($action){
    $status = $action->get_status();
    $type = $action->get_value("rec_type");
    if ($status == "inserted" && $type == "none")
        $action->set_status("deleted");
}

$scheduler->event->attach("beforeProcessing","delete_related");
$scheduler->event->attach("afterProcessing","insert_related");
~~~

## 전체 시퀀스 드래그 이동

사용자가 반복 이벤트 전체 시퀀스를 드래그해서 이동할 수 있도록 하려면, scheduler 초기화 전에 아래 코드를 추가하세요:

~~~js
scheduler.attachEvent("onBeforeEventChanged", function(dev){
    var parts = scheduler.getState().drag_id.toString().split("#");
     if (parts.length > 1) {

          var series = this.getEvent(parts[0]);

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

## 라이트박스 반복 블록의 커스텀 컨트롤

버전 4.2부터 dhtmlxScheduler에서는 라이트박스의 'recurring' 블록에 사용되는 HTML 폼을 커스터마이즈할 수 있습니다.

#### 커스터마이즈 가능한 내용

1. 폼 마크업 수정
2. 불필요한 요소 제거(예: 'yearly' 반복 유형 및 관련 입력값)
3. 입력값의 기본값 설정(예: '종료 날짜 없음' 옵션을 자동으로 체크하고 반복 종료 블록을 숨겨, 모든 시리즈가 종료 날짜 없이 생성되도록 함)

### 사용 예시

예시로 시작해보겠습니다. 예를 들어, 'monthly'와 'yearly' 반복 옵션을 제거하고 모든 이벤트에서 'no end date' 선택지를 사용할 수 있도록 하고 싶다고 가정해봅시다(즉, 반복 종료 설정 섹션을 없앰).

1. 먼저, 커스텀 폼의 마크업을 정의하고 페이지 내 원하는 위치에 배치하세요(처음에는 'schedulersourceslocalerecurring'에 있는 기본 템플릿을 복사해서 시작할 수 있습니다):
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
2. 다음으로, 'recurring' 섹션의 'form' 파라미터에 커스텀 폼의 ID를 지정하세요:
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

라이트박스의 반복 블록에 대한 기본 HTML 레이아웃은 <b>'schedulersourceslocalerecurring'</b> 폴더에서 다양한 언어별로 확인할 수 있습니다.


예를 들어, 영어 로케일의 경우 <b>'schedulersourceslocalerecurringrepeat_template_en.htm'</b> 파일을 참고하세요.

일반적으로 라이트박스의 반복 블록은 아래 3가지 주요 컨트롤 그룹으로 구성됩니다.

1) 반복 유형을 선택하는 컨트롤. 이 입력값들은 반드시 'repeat'라는 name 속성을 가지고, 값은 'daily', 'weekly', 'monthly', 'yearly' 중 하나여야 합니다.
폼에는 반드시 최소 하나 이상의 'repeat' 입력값이 있어야 합니다. 라디오 버튼, select, 또는 기본값을 지정하는 hidden input을 사용할 수 있습니다.

폼에서 반복 유형을 선택하는 유효한 예시는 다음과 같습니다:

- 라디오 버튼

~~~html
<label><input type="radio" name="repeat" value="day" />Daily</label>


<label><input type="radio" name="repeat" value="week"/>Weekly</label>


<label><input type="radio" name="repeat" value="month" />Monthly</label>


<label><input type="radio" name="repeat" value="year" />Yearly</label>
~~~

- 'Monthly'와 'Yearly' 옵션을 제외한 select input:

~~~html
<select name="repeat">
  <option value="day">Daily</option>
  <option value="week">Weekly</option>
</select>
~~~

- hidden input(이 경우 lightbox는 오직 'Daily' 시리즈만 생성):

~~~html
<input type="hidden" name="repeat" value="day" />
~~~

2) 반복 유형에 따라 반복 설정을 구성하는 섹션입니다. 예를 들어, 'Daily' 반복 유형의 경우 마크업은 아래와 같습니다:

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

특정 반복 유형과 관련된 마크업은 <b>id</b>가 <b>"dhx_repeat_&lt;반복유형&gt;"</b> 형식인 div 안에 감쌀 수 있습니다. 예를 들어 "dhx_repeat_day"와 같이 작성하면, 해당 반복 유형이 선택되었을 때만 표시됩니다.

3) 반복 종료를 설정하는 컨트롤입니다. 이는 name이 'end'인 입력값으로 정의합니다. 


가능한 값은 <b>'no'</b>, <b>'date_of_end'</b>, <b>'occurences_count'</b> 입니다.

'repeat' 컨트롤과 마찬가지로, 폼에는 이 타입의 입력값이 최소 하나 이상 있어야 합니다.

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

<b>'date_of_end'</b> 옵션을 위해서는 'date_of_end'라는 name의 input에 날짜를 입력해야 하며, <b>'occurences_count'</b> 옵션은 'occurences_count'라는 name의 input에서 발생 횟수를 가져옵니다.


옵션을 제거하거나 기본값으로 설정하려면 hidden input을 사용할 수 있습니다:

~~~html
<input type="hidden" name="end" value="date_of_end" />
<input type="hidden" name="date_of_end" value="01.01.2016" />
~~~
  
### 반복 블록 커스터마이징 시 참고 사항

라이트박스의 반복 블록을 커스터마이징하기 전 아래 사항을 반드시 참고하세요:

1. 모든 input의 'name' 속성은 고정되어 있습니다 - 다른 이름의 input은 무시됩니다.
2. 모든 input의 'value' 속성도 고정되어 있으며, 사용자가 직접 입력하는 값만 예외입니다.
3. 새로운 폼을 제공하면 dhtmlxScheduler는 해당 폼을 직접 사용하는 것이 아니라, HTML 구조만 라이트박스 템플릿에 복사합니다.
즉, 원본 폼의 DOM 요소에 연결된 이벤트 핸들러나 커스텀 속성은 라이트박스에 복사되지 않습니다.
만약 이벤트 핸들러를 추가하고 싶다면, 인라인 HTML 속성으로 추가하거나 라이트박스가 표시될 때 폼에 직접 연결해야 합니다.

:::note
dhtmlxScheduler는 원본 HTML 폼을 직접 사용하지 않고, 해당 폼의 복사본을 라이트박스 템플릿 내에 생성한다는 점을 유념하세요.
:::

예를 들어:

- 아래 코드는 라이트박스에 복사됩니다:

~~~html
<input onclick="handler()"> 
~~~

- 하지만 아래 코드는 복사되지 않습니다:

~~~js
addEventListener(node, "click", function(){...})
~~~
