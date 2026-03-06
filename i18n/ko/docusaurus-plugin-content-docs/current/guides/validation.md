---
title: "Validation"
sidebar_label: "Validation"
---

# Validation

Validation(유효성 검사)는 사용자가 입력한 데이터가 정확한지 확인하고 잘못된 값이 저장되는 것을 방지합니다. 예를 들어, 설명 없이 이벤트가 생성되는 것을 막을 수 있습니다.

일반적으로 데이터 유효성 검사는 사용자 입력을 포착하고 유효성을 확인할 수 있는 [dhtmlxScheduler API](api/overview/events_overview.md)의 이벤트를 사용하여 수행합니다:

## 클라이언트 측 유효성 검사

데이터 유효성 검사를 위해 자주 사용되는 주요 이벤트는 다음과 같습니다:

- [onEventSave](api/event/oneventsave.md) - 사용자가 lightbox의 'Save' 버튼을 클릭할 때 발생
- [onBeforeEventCreated](api/event/onbeforeeventcreated.md) - 새로운 이벤트가 Scheduler에 추가되기 전에 발생
- [onBeforeEventChanged](api/event/onbeforeeventchanged.md) - 이벤트가 업데이트되기 전에 발생

가장 간단한 유효성 검사 방법은 [onEventSave](api/event/oneventsave.md) 이벤트를 사용하는 것입니다. 이 이벤트는 폼에서 'Save' 버튼이 클릭될 때 발생합니다. *true*를 반환하면 변경 사항이 저장되고, *false*를 반환하면 저장이 취소되며 lightbox가 계속 열려 있습니다.

예를 들어, 설명이 없거나 너무 짧은 텍스트가 입력된 이벤트의 저장을 막으려면 다음과 같은 코드를 사용할 수 있습니다:

~~~js
scheduler.attachEvent("onEventSave", function(id,ev){
    if (!ev.text) {
        dhtmlx.alert("Text must not be empty");
        return false;
    }
    if (ev.text.length < 20) {
        dhtmlx.alert("Text too small");
        return false;
    }
    return true;
});
~~~


[Validating lightbox fields](https://docs.dhtmlx.com/scheduler/samples/02_customization/08_validation.html)


## 서버 측 유효성 검사

위 방법의 한계는 Scheduler 내에서 인라인 편집이나 드래그를 통해 변경이 이루어질 경우 이벤트가 발생하지 않는다는 점입니다.

모든 변경 사항(편집, 생성, 삭제 포함)을 처리하려면 [dataProcessor](guides/server-integration.md) 객체, 특히 [onBeforeUpdate](https://docs.dhtmlx.com/api__dataprocessor_onbeforeupdate_event.html) 이벤트를 사용하세요. 이 이벤트는 데이터가 서버로 전송되기 전에 발생하며, lightbox뿐만 아니라 Scheduler에서 이루어지는 모든 수정을 포괄합니다.

~~~js
scheduler.init("scheduler_here");
scheduler.load("data.php");
 
var dp = new gantt.dataProcessor("data.php");
dp.init(scheduler);

dp.attachEvent("onBeforeUpdate", function (id, status, data) {
    if (!data.text) {
        dhtmlx.message("The event's text can't be empty!");
        return false;
    }
    return true;
});
~~~
 
여기서:

- **id** - (*string*) 이벤트의 id입니다.
- **status** - (*'updated', 'inserted', 'deleted'*) 이벤트의 작업 상태입니다.
- **data** - (*object*) 전송할 데이터입니다.

유효성 검사에 실패하면 변경 사항은 서버로 전송되지 않고 클라이언트 측에 남아 있으므로 필요에 따라 추가 처리가 가능합니다.
