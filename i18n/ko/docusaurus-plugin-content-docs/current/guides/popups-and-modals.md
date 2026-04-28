--- 
title: "팝업 메시지와 모달 상자" 
sidebar_label: "팝업 메시지와 모달 상자" 
---

# 팝업 메시지 및 모달 상자

메시지는 Scheduler에서 오류를 알리거나, 작업을 확인하거나 거부하거나, 여러 옵션 중 하나를 선택하는 등 사용자를 위한 알림에 사용됩니다.  
Scheduler 메시지는 [dhtmlxMessage 저장소의 포크 버전](https://github.com/DHTMLX/message)을 기초로 사용합니다.  
따라서 dhtmlxMessage의 모든 기능은 dhtmlxScheduler 메시지에도 적용됩니다.

메시지에는 두 가지 주요 유형이 있습니다: [간단한 팝업 메시지 박스](#basic-popup-message)와 [버튼이 있는 모달 메시지 박스](#modal-message-boxes)로, 애플리케이션의 작업을 차단합니다.

모달 메시지 박스는 세 가지 가능한 유형 중 하나일 수 있습니다:

- [경고 메시지 박스](#alert-message-box-alert)
- [확인 메시지 박스](#confirm-message-box-confirm)
- [모달박스](#modal-box-modal)

## 기본 팝업 메시지

기본 팝업 메시지 박스를 만들려면 [scheduler.message](api/method/message.md) 메서드를 사용합니다. 메서드의 필수 매개변수는 메시지의 텍스트입니다:

~~~js
scheduler.message("The event is updated");
~~~

메시지 상자에는 세 가지 유형이 있습니다:

- 기본 메시지 박스 (**type:"info"**)

![default_message](/img/default_message.png)

- 오류 메시지 박스 (**type:"error"**)

![오류_메시지](/img/error_message.png)

- 경고 메시지 박스 (**type:"warning"**)

![경고_메시지](/img/warning_message.png)

필요한 메시지 박스를 만들려면 해당 값으로 *type* 속성을 정의해야 합니다: 

~~~js
// 오류 메시지 박스 만들기
scheduler.message({
    text: "Click on the buttons to explore Scheduler message types", 
    expire: -1, 
    type: "error"
});
~~~

[다양한 팝업 및 모달 상자 유형](https://docs.dhtmlx.com/scheduler/samples/09_api/11_popups_and_messages.html)

메시지 상자에 다른 스타일을 적용하려면 [여기](#styling)에서 설명한 대로 type 매개변수를 통해 CSS 클래스를 지정하면 됩니다.

### 메시지 박스 위치 지정

기본적으로 팝업 메시지 박스는 창의 오른쪽 상단에 표시됩니다. 상위 애플리케이션의 작업을 차단하는 [모달 메시지 박스](#modal-message-boxes)와 달리 상위 애플리케이션을 덮어 쓰고 작업을 차단하지 않습니다. 메시지 박스의 위치를 변경하려면 **scheduler.message.position** 속성을 사용합니다:

~~~js
scheduler.message.position = 'bottom';
~~~

메시지 위치에는 네 가지 가능한 값이 있습니다:

- **top** - 기본값으로 창의 오른쪽 상단 코너에 메시지 박스를 표시합니다

- **bottom** - 창의 오른쪽 하단 코너에 메시지 박스를 표시합니다

- **left** - Scheduler 아래 창의 왼쪽에 메시지 박스를 표시합니다

- **right** - Scheduler 아래 창의 오른쪽에 메시지 박스를 표시합니다

### 만료 간격

메시지 박스의 만료 간격은 *expire* 매개변수를 통해 사용자 정의할 수 있습니다. 이는 메시지 박스가 사라지는 시간(밀리초 단위)입니다. 기본값은 4000밀리초입니다.

이 값을 변경하거나 만료 기간을 완전히 취소하려면 expire 매개변수를 "-1"로 설정합니다. 이 경우 마우스 클릭 시에만 사라집니다.

~~~js
scheduler.message({
    type:"error", 
    text:"Invalid data format",
    expire:10000
});
~~~

### API를 통한 메시지 박스 숨김

지정한 메시지 박스를 수동으로 숨기고 자동 숨김을 기다리지 않으려면 **scheduler.message.hide(boxId)** 메서드를 사용할 수 있습니다. 하나의 매개변수를 받습니다:

- **boxId** - 박스의 생성자에서 지정된 박스 아이디

~~~js
scheduler.message({
    id:"myBox",
    text:"Page is loaded"
});

scheduler.message.hide("myBox");
~~~

## 모달 메시지 박스

모달 메시지 박스는 필요한 동작이 수행될 때까지(일반적으로 버튼 클릭) 상위 앱의 작업을 차단합니다. 버튼 클릭으로 닫히며, 실행되는 경우 콜백 함수가 있습니다.

세 가지 유형의 모달 메시지 박스가 존재합니다:

- [경고 메시지 박스](#alert-message-box-alert) - 버튼이 있는 경고 박스;
- [확인 메시지 박스](#confirm-message-box-confirm) - 두 개의 버튼(확인 또는 취소)으로 이루어진 확인 상자;
- [모달박스](#modal-box-modal) - 무한대의 버튼 수를 가진 모달 메시지 박스.

박스의 공통 속성은 다음과 같습니다:

- **id** - 메시지 박스의 아이디;
- **title** - 머리글의 텍스트;
- **type** - 메시지 박스의 유형(경고 또는 오류);
- **text** - 메시지 박스 본문의 텍스트;
- **ok** - "OK" 버튼의 텍스트;
- **cancel** - "Cancel" 버튼의 텍스트(확인 박스의 경우);
- **callback** - 버튼 클릭 시 호출되는 함수. 클릭된 버튼에 따라 true 또는 false를 매개변수로 받습니다;
- **position** - 현재 값은 오직 "top"만 지원하며, 다른 값은 중앙 정렬로 간주됩니다;
- **width** - 모달 박스의 너비(CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) 또는
  [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) 값으로 설정; 예: "100px", "50%");
- **height** - 모달 박스의 높이(CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) 또는
  [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) 값으로 설정; 예: "100px", "50%").

## Alert Message Box (#alert) {#alert-message-box-alert}

![alert](/img/alert.png)

경고 메시지 박스에는 "OK" 버튼이 포함되어 있습니다. "OK" 버튼의 텍스트를 설정하려면 *ok* 매개변수를 텍스트 값으로 사용합니다:

- 짧은 형식 (메시지 텍스트만 포함 - 매개변수 '텍스트'의 암시적 사용. 다른 매개변수는 기본값):

~~~js
scheduler.alert("Text");
~~~

- 전체 형식 (여러 사용 가능한 매개변수를 포함. 명시되지 않은 매개변수는 기본값):

~~~js
scheduler.alert({
    text: "some text",
    title: "Alert",
    ok: "Ok",
    callback: function(){...}
});
~~~

## Confirm Message Box (#confirm) {#confirm-message-box-confirm}

![confirm](/img/confirm.png)

확인 메시지 박스에는 두 개의 버튼이 있습니다: "OK" 버튼과 "Cancel" 버튼. 버튼의 텍스트는 해당 이름의 속성으로 정의됩니다.

- 짧은 형식

~~~js
scheduler.confirm("ConfirmText");
~~~

- 전체 형식

~~~js
scheduler.confirm({
    title:"Confirm",
    text:"This is a simple confirm",
    ok:"Ok",
    cancel:"Cancel",
    callback: function(result){
        if(result){
            scheduler.message("You clicked Ok");
        }else{
            scheduler.message("You clicked Cancel");
        }
    }
});
~~~

## Modal Box (#modal) {#modal-box-modal}

![modalbox](/img/modalbox.png)

모달박스는 몇 가지 고유한 특징을 가집니다:

- 그 *text*에는 어떤 HTML 콘텐츠도 포함될 수 있습니다;
- *buttons* 배열에 있는 텍스트 값을 가진 다수의 버튼이 있을 수 있습니다;
- *callback* 함수는 선택된 버튼의 인덱스를 매개변수로 받습니다.

~~~js
scheduler.modalbox({
    title:"Settings",
    text: " ... html code here... ",
    buttons:["Save", "Defaults", "Cancel"],
    callback: function(result){
        scheduler.alert(result);
    }
});
~~~

### 모달박스 버튼 구성 설정

모달박스 버튼 구성을 정의하는 두 가지 주요 방법이 있습니다:

- 짧은 형식:

~~~js
scheduler.modalbox({
    // other settings
    buttons:["Save", "Delete", "Cancel"],
    callback: function(result){
           switch(result){
            case "0":
                //Save
                break;
            case "1":
                //Delete
                break;
            case "2":
                //Cancel
                break;
        }    
    }
});
~~~

콜백 함수의 결과는 배열에서 누른 버튼의 문자열 인덱스("0", "1", "2",...)와 같습니다. 각 버튼은 레이블에서 소문자로 변환된 CSS 클래스를 받게 되는데, 예를 들면 *scheduler_**save**_button*, *scheduler_**delete**_button*, *scheduler_**cancel**_button* 와 같습니다.

이 클래스를 사용해 버튼의 스타일을 적용할 수 있습니다:

~~~js
.scheduler_delete_button div{
    background:red;
}
~~~

同樣 이름의 버튼이 여러 팝업에서 사용되어 서로 다르게 스타일링해야 하는 경우에는 **type** 구성을 사용할 수 있습니다:

~~~js
scheduler.modalbox({
    // other settings
    type:"special_popup",
    buttons:["Save", "Delete", "Cancel"]
});
~~~

- *type*은 "scheduler_" 문자열로 접두어가 붙고 팝업 요소의 클래스 이름으로 추가됩니다:

~~~js
.scheduler_special_popup .scheduler_delete_button div{
      background:red;
}
~~~

- 전체 형식:

더 긴 구성 형식을 사용해 버튼의 CSS 클래스와 콜백 값을 명시적으로 정의할 수 있습니다:

~~~js
scheduler.modalbox({
    // other settings
    buttons: [
        { label:"Save",   css:"link_save_btn",   value:"save" },
        { label:"Cancel", css:"link_cancel_btn", value:"cancel" },
        { label:"Delete", css:"link_delete_btn", value:"delete" }
    ],
    callback: function(result){
        switch(result){
            case "save":
                //Save
                break;
            case "cancel":
                //Cancel
                break;
            case "delete":
                //Delete
                break;
        }
    }
});
~~~


**label** 매개변수는 필수이며, **css**와 **value** 옵션은 생략될 수 있습니다. 누락된 매개변수는 버튼 구성의 짧은 형식과 같이 계산됩니다: CSS는 소문자로 변환된 버튼 레이블에서 상속되고 버튼의 인덱스가 값으로 사용됩니다.

**css**는 "scheduler_" 문자열로 접두어를 붙여 버튼 요소에 클래스 이름으로 추가됩니다:

~~~css
.scheduler_link_delete_btn div{
      background:red;
}
~~~

## 모달 메시지 박스 숨김

모달 메시지 박스를 수동으로 숨기려면 **scheduler.modalbox.hide()** 메서드를 사용할 수 있습니다. 매개변수로는 모달박스의 div 컨테이너를 받습니다:

~~~js
const box = scheduler.modalbox({    
    title: "Settings",
    text: " ... html code here... ",
    buttons: ["Save", "Defaults", "Cancel"],
    callback: function(result){
        scheduler.alert(result);
    }
});

scheduler.modalbox.hide(box);
~~~

경고(alert) 및 확인(confirm) 모달 박스의 경우에도 동일하게 **scheduler.modalbox.hide()** 메서드를 사용해야 합니다:

~~~js
const box = scheduler.confirm({
    text: "Continue?",
    ok:"Yes", 
    cancel:"No",
    callback: function(result){
        scheduler.message("Result: "+result);
    }
});

scheduler.modalbox.hide(box);
~~~

## 스타일링

어떤 유형의 메시지 박스든 원하는 모양을 얻기 위해 사용자 정의 스타일을 정의할 수 있습니다. 일반적으로 적절한 CSS 클래스는 *type* 매개변수를 통해 지정됩니다: CSS 클래스를 정의하고 매개변수를 그 이름으로 설정합니다.

'type' 매개변수를 설정할 때 염두에 두어야 할 몇 가지 규칙이 있습니다:

- 경고(alert) 및 확인(confirm) 박스에 대해 CSS 클래스를 설정하려면 해당 박스를 '윈도우 관련(window-related)' 방식으로 초기화해야 합니다.
- 메시지 박스에 CSS 클래스를 설정하려면 해당 박스를 '공통(common)' 방식으로 초기화해야 합니다.
- CSS 클래스의 이름은 'scheduler-' 접두사를 붙여야 합니다.
- 스타일을 올바르게 적용하려면 .scheduler-some div 형태의 클래스를 사용해 Scheduler 메시지 내부의 요소를 대상으로 한다고 지정해야 합니다.

~~~js
<style type="text/css">
.scheduler-myCss div{
    font-weight:bold;
    color:wheat;
    background-color:crimson;
}
</style>


scheduler.message({ type:"myCss", text:"some text" });
~~~

## 모달 창 및 키보드 상호 작용

모달 박스의 키보드 기능은 **scheduler.message.keyboard** 속성으로 제어됩니다. 최초 값은 *true*입니다.

기본적으로 모달 박스는 페이지의 키보드 이벤트를 차단합니다. 사용할 수 있는 키는 다음과 같습니다:

- "space"와 "enter" - 모달 박스의 결과로 *true* 값을 설정합니다;
- "escape" - 모달 박스의 결과로 *false* 값을 설정합니다.

**keyboard** 속성을 *false*로 설정하면 키보드 이벤트를 사용할 수 있게 되며, 위에서 언급한 키는 작동하지 않게 됩니다:

~~~js
scheduler.message.keyboard = false; 
scheduler.modalbox({...});
~~~

이를 통해 모달 박스 안의 입력란 등에 값을 입력하는 등 전체 키보드를 사용할 수 있습니다.