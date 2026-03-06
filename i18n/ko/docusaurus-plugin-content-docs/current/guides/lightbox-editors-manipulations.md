---
title: "Lightbox 조작하기"
sidebar_label: "Lightbox 조작하기"
---

# Lightbox 조작하기

## 컨트롤 값 가져오기/설정하기 {#gettingsettingthecontrolvalue}

섹션의 컨트롤 값을 가져오거나 업데이트하려면 [formSection](api/method/formsection.md) 객체를 다음과 같이 사용하세요:

~~~js
// 값을 가져오기
var value = scheduler.formSection('description').getValue();

// 값을 설정하기
scheduler.formSection('description').setValue('abc');
~~~


[Setting/getting values of lightbox's controls](https://docs.dhtmlx.com/scheduler/samples/02_customization/22_opertions_with_lightbox.html)


## 한 번의 클릭으로 라이트박스 열기 {#opening-the-lightbox-on-a-single-click}

라이트박스를 한 번의 클릭으로 열도록 설정할 수 있습니다. 이는 [onClick](api/event/onclick.md) 이벤트와 [showLightbox](api/method/showlightbox.md) 메서드를 함께 사용하여 구현할 수 있습니다:

~~~js
scheduler.attachEvent("onClick", function (id, e){
    scheduler.showLightbox(id);
    return true;
});
~~~

**Related sample** [Opening the lightbox on one click](https://snippet.dhtmlx.com/5/50e639d2a)

이 설정을 적용하면, 이벤트 박스를 마우스 왼쪽 버튼으로 클릭할 때 라이트박스가 열립니다.

## 라이트박스가 열려 있는지 확인하기 {#checking-whether-the-lightbox-is-opened}

라이트박스가 현재 열려 있는지 닫혀 있는지 확인하려면, [getState](api/method/getstate.md) 메서드가 반환하는 state 객체의 **lightbox_id** 속성을 확인하세요. 
라이트박스가 열려 있으면 해당 라이트박스에 있는 이벤트의 id를 반환하고, 그렇지 않으면 'null' 또는 'undefined'를 반환합니다:

~~~js
if (scheduler.getState().lightbox_id){
    // 라이트박스가 열려 있을 때 처리 코드
} else {
    // 라이트박스가 닫혀 있을 때 처리 코드
}
~~~

## 이벤트 객체의 속성을 라이트박스 섹션에 매핑하기 {#mapping-properties-of-an-event-object-to-the-lightbox-sections}

이벤트 객체의 속성을 라이트박스 섹션에 연결하려면 다음 단계를 따르세요:

- 데이터 소스가 [지원되는 형식](guides/data-formats.md)으로 이벤트를 제공하는지 확인하세요.

~~~js
{ 
   "data":[
      {
          "id":"1",
          "start_date":"2019-03-02 00:00:00",
          "end_date":"2019-03-04 00:00:00",
          "text":"Graduation ceremony",
          "type":"1",
          "location":"London"
      },
      ...
   ]                                       
}
~~~

데이터 소스가 반환하는 모든 속성은 이벤트 객체에 추가되며, [클라이언트 사이드 API](guides/event-object-operations.md)를 통해 접근할 수 있습니다.

- 라이트박스 컨트롤을 특정 속성에 매핑하려면 섹션의 **map_to** 속성에 이벤트 속성명을 지정하세요:

~~~js
scheduler.config.lightbox.sections="["
    {name:"description", height:70, map_to:"text", type:"textarea" , focus:true},
    {name:"locationInput", height:35, map_to:"location", type:"textarea" },
    {name:"typeSelect", map_to:"type", type:"select", options:scheduler.serverList("types")},
    {name:"time", type:"time", map_to:"auto"}
];
~~~

[time](guides/time.md) 및 [recurring](guides/recurring-events.md#recurringlightbox) 컨트롤은 예외로, 항상 고정된 속성(**event.start_date/event.end_date** 및 **event.rec_type/event.event_length/event.event_pid**)에 매핑됩니다.

## Time 컨트롤에서 자동 종료 날짜 {#automatic-end-date-in-the-time-control}

이벤트의 기본 지속 시간을 설정하고, 해당 지속 시간을 유지하도록 종료 날짜가 자동으로 업데이트되게 하려면 다음 속성을 설정하세요:

~~~js
// auto_end_time 파라미터에 분 단위로 이벤트 지속 시간 지정
scheduler.config.event_duration = 60; 
scheduler.config.auto_end_date = true;
~~~


[Automatic end date](https://docs.dhtmlx.com/scheduler/samples/02_customization/11_auto_end_date.html)


이렇게 하면 사용자가 라이트박스에서 이벤트의 시작 시간이나 날짜를 변경할 때마다 종료 시간과 날짜가 자동으로 조정되어 이벤트 지속 시간이 60분( [event_duration](api/config/event_duration.md) 옵션에 지정된 대로)으로 유지됩니다.

## 라이트박스 컨트롤의 기본값 설정하기 {#setting-the-default-value-for-a-lightboxs-control}

라이트박스 섹션의 기본값을 지정하려면 해당 섹션의 **default_value** 속성을 사용하세요.

예를 들어, 이벤트 위치에 대한 커스텀 섹션을 추가하고 'Location'으로 이름을 지정한 경우, 새 이벤트를 생성할 때 기본적으로 비어 있습니다. 이를 특정 주소(예: Greenwich Observatory)로 기본 표시하려면 다음과 같이 라이트박스를 설정하세요:

~~~js
scheduler.config.lightbox.sections = [
    { name:"description", height:50, map_to:"text", type:"textarea", focus:true },
    { name:"location", height:43, map_to:"event_location", type:"textarea", 
    default_value:"Blackheath Avenue London,Greenwich,Greater London SE10 8XJ,UK"},
    { name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

**default_value**는 라이트박스 섹션 자체의 기본 내용을 설정하며, 새 이벤트의 기본값을 설정하는 것이 아님에 유의하세요. 즉, 라이트박스가 열리고 이벤트가 저장된 후에만 새 이벤트에 지정한 값이 할당됩니다.

새 이벤트가 생성될 때 바로 기본값을 할당하려면 [onEventCreated](api/event/oneventcreated.md) 이벤트를 사용하세요:

~~~js
scheduler.attachEvent("onEventCreated", function(id,e){
    scheduler.getEvent(id).location = 'Blackheath Avenue London, Greenwich...';
    scheduler.updateEvent(id); // 업데이트된 이벤트 렌더링
    return true;
});
~~~

## 날짜-시간 컨트롤 순서 변경 및 시간 선택기 제거 {#changingtheorderofdatetimecontrolsandremovingtimeselectors}

'Time period' 섹션에서 날짜-시간 컨트롤의 순서를 변경하거나 생략하려면 **time_format** 속성을 설정하세요:

~~~js
scheduler.config.lightbox.sections="["
  {name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
  {name:"time", ..., time_format:["%H:%i","%m","%d","%Y"]}
];
~~~

:::note
이 설정은 배열 내 요소의 순서만 변경하며, 데이터 표시 형식 자체는 변경하지 않습니다.
:::

예시:

~~~js
// 기본값
time_format:["%H:%i", "%m", "%d", "%Y"] 
// 월이 먼저 오도록
time_format:["%m","%d", "%Y", "%H:%i"]
// 연도 선택기 생략
time_format:["%H:%i", "%m", "%d"]
// 잘못된 사용법
time_format:["%H:%i", "%M", "%d", "%Y"] // "%m"이 실수로 "%M"으로 변경됨
~~~

## 읽기 전용 모드 {#readonlymode}

읽기 전용 모드에 대한 자세한 내용은 ["읽기 전용 모드"](guides/readonly.md) 챕터를 참고하세요.

## 일부 이벤트에서 섹션 숨기기 {#makingasectionhiddenforsomeevents}

특정 이벤트에 대해 섹션을 숨기려면, 해당 섹션의 **set_value** 메서드를 다음과 같이 오버라이드하세요:


~~~js
scheduler.form_blocks.textarea.set_value="function(node,value,ev){"
    node.firstChild.value="value||""";
    var style = ev.some_property?"":"none";
    node.style.display="style;" // 에디터 영역
    node.previousSibling.style.display="style;" // 섹션 헤더
    scheduler.setLightboxSize(); // 라이트박스 크기 조정
}
~~~

### '종일 이벤트' 옵션

라이트박스에서 '종일 이벤트' 옵션을 활성화하려면 [full_day](api/config/full_day.md) 옵션을 *true*로 설정하세요:

~~~js
scheduler.config.full_day  = true;
~~~

이 옵션을 활성화하면 **Time period** 섹션의 왼쪽에 **Full Day** 체크박스가 나타납니다. 선택 시 해당 섹션의 모든 입력 필드가 비활성화되고, 이벤트 지속 시간이 현재 셀 날짜의 **0:00 AM**부터 다음날 **0:00 AM**까지로 설정됩니다.


[Full day events](https://docs.dhtmlx.com/scheduler/samples/02_customization/12_full_day_event.html)


## 라이트박스의 종류 {#types-of-lightbox}

라이트박스는 두 가지 스타일로 제공됩니다:

- 표준형(와이드)
- 쇼트형

기본 스킨에서는 표준형(와이드) 라이트박스만 사용할 수 있고, 'glossy' 또는 'classic' 스킨에서는 두 가지 중 선택할 수 있습니다.

선호하는 타입을 선택하려면 [wide_form](api/config/wide_form.md) 속성을 사용하세요:

~~~js
scheduler.config.wide_form = true;
~~~


**표준형(와이드) 라이트박스**:

![scheduler_wide_form.png](/img/scheduler_wide_form.png)

**쇼트형**:

![scheduler_standard_form.png](/img/scheduler_standard_form.png)


### 섹션 헤더에 버튼 추가하기

섹션 헤더에 커스텀 버튼을 추가하려면 다음 단계를 따르세요:

- 섹션 객체에 'button' 속성을 추가하세요:

~~~js
{name:"description", height:130, map_to:"text", type:"textarea", button:"help"}
~~~

- 버튼의 라벨을 정의하세요:

~~~js
// 'help'는 'button' 속성의 값과 일치해야 합니다.
scheduler.locale.labels.button_help = "Help label";
~~~

- 버튼 클릭 핸들러를 제공하세요:

~~~
scheduler.form_blocks.textarea.button_click="function(index,button,shead,sbody){"
    // 커스텀 코드 작성
}
~~~

여기서:

- **index** - (*number*) 섹션의 0부터 시작하는 인덱스
- **button** - (*HTMLElement*) 버튼 요소
- **shead** - (*HTMLElement*) 섹션 헤더 요소
- **sbody** - (*HTMLElement*) 섹션 바디 요소


다음 CSS 클래스를 사용하여 버튼 이미지를 커스터마이즈할 수 있습니다:

~~~js
.dhx_custom_button_help{
    background-image:url(imgs/but_help.gif);
}
~~~

## 선택 컨트롤 연결하기 {#linkingselectcontrols}

라이트박스 내의 select 컨트롤을 서로 연동할 수 있습니다. 아래와 같이 select 컨트롤의 [onchange 속성](guides/select.md#properties)을 사용하면 됩니다:

~~~js
var update_select_options = function(select, options) { // 헬퍼 함수
    select.options.length = 0;
    for (var i="0;" i<options.length; i++) {
        var option = options[i];
        select[i] = new Option(option.label, option.key);
    }
};

var parent_onchange = function(event) {
    var new_child_options = child_select_options[this.value];
    update_select_options(scheduler.formSection('child').control, new_child_options);
};
scheduler.attachEvent("onBeforeLightbox", function(id){
    var ev = scheduler.getEvent(id);
    if (!ev.child_id) {
        var parent_id = ev.parent_id||parent_select_options[0].key;
        var new_child_options = child_select_options[parent_id];
        update_select_options(
            scheduler.formSection('child').control, new_child_options
        );
    }
    return true;
});

scheduler.config.lightbox.sections="["
    ...
    {name:"parent", height:23, type:"select", options: parent_select_options, 
     map_to:"parent_id", onchange:parent_onchange },
    {name:"child", height:23, type:"select", options: child_select_options, 
     map_to:"child_id" }
    ...
];
~~~


[Linking select controls in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/26_linked_selects_in_lightbox.html)


![linking_controls](/img/linking_controls.png)

<b>onchange</b> 이벤트는 사용자가 부모 섹션에서 다른 옵션을 선택할 때 발생하며, 이에 따라 자식 섹션의 옵션이 업데이트됩니다.

## 라이트박스 섹션 동적 변경 {#dynamic-changing-of-the-lightbox-sections}

라이트박스 섹션을 동적으로 변경할 수 있습니다. 즉, 특정 설정에 따라 라이트박스의 다양한 섹션을 숨기거나, 차단하거나, 표시할 수 있습니다.

이를 위해 [resetLightbox()](api/method/resetlightbox.md) 메서드를 사용할 수 있습니다. 사용 방법은 다음과 같습니다:

1. 먼저, 라이트박스에 사용할 두 개의 컨트롤 배열을 생성합니다.

~~~js
var full_lightbox = [
    { name: "description", height: 200, map_to: "text", type: "textarea", focus: true},
    { name: "hidden", height: 23, map_to: "hidden", type: "textarea"},
    { name: "time", height: 72, type: "time", map_to: "auto"}
];
var restricted_lightbox = [
    { name: "description", height: 200, map_to: "text", type: "textarea", focus: true},
    { name: "time", height: 72, type: "time", map_to: "auto"}
];
~~~

2. 다음을 구현하세요:

- 새 라이트박스를 열기 전에 <b>resetLightbox()</b> 메서드를 호출하여 현재 컨트롤을 초기화하고, 원하는 컨트롤 배열로 새 라이트박스를 생성하세요.

- 이벤트 id로 이벤트 객체를 가져와 어떤 라이트박스 구성을 적용할지 조건을 지정하세요. 아래 예시에서는 "restricted" 속성을 조건으로 사용합니다.

~~~js
scheduler.attachEvent("onBeforeLightbox", function(event_id) {
    scheduler.resetLightbox();
    var ev = scheduler.getEvent(event_id);
    scheduler.config.lightbox.sections = (ev.restricted) ?
        restricted_lightbox : full_lightbox;
    return true;
});
~~~

3. 이벤트의 'restricted' 속성 값에 따라 "restricted_lightbox" 구성이 사용됩니다. 설정되지 않은 경우 전체 라이트박스가 표시됩니다.

~~~js
scheduler.init('scheduler_here', new Date(2017, 5, 30), "week");
scheduler.parse([
    { start_date: "2017-06-27 04:00", end_date: "2017-06-27 7:00", 
        text: "Restricted event", hidden: "You won't see me", restricted: true },
    { start_date: "2017-06-29 05:00", end_date: "2017-06-29 11:00", 
        text: "Full access", hidden: "Hidden text" }
]);
~~~

![dinamicchanges_lightbox](/img/dinamicchanges_lightbox.png)


[Dynamic changing of lightbox configurations](https://docs.dhtmlx.com/scheduler/samples/02_customization/29_changing_lightbox_configurations.html)
