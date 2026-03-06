---
title: "데이터 직렬화: XML, JSON, iCal"
sidebar_label: "데이터 직렬화: XML, JSON, iCal"
---

# 데이터 직렬화: XML, JSON, iCal

## 준비하기

이 기능을 사용하려면 **serialize** 확장 기능을 활성화하면 됩니다.

~~~js
scheduler.plugins({
    serialize: true
});
~~~

## XML로 내보내기

스케줄러 데이터를 XML 문자열로 변환하려면 [toXML](api/method/toxml.md) 메서드를 사용하세요:

~~~js
var xml = scheduler.toXML(); //xml string
~~~


[Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)


## JSON으로 내보내기

스케줄러 데이터를 JSON 문자열로 변환하려면 [toJSON](api/method/tojson.md) 메서드를 사용하세요:

~~~js
var json_string = scheduler.toJSON(); //json string
~~~

:::note
이 메서드는 JavaScript 객체가 아닌 JSON 문자열을 반환합니다. 만약 JSON 객체가 필요하다면 [getEvents](api/method/getevents.md) 메서드를 사용하세요.
:::


[Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)


## iCal로 내보내기

스케줄러 데이터를 iCal 문자열로 변환하려면 [toICal](api/method/toical.md) 메서드를 사용하세요:

~~~js
var ical_string = scheduler.toICal(); //ical string
~~~

또한, [iCal 가져오기-내보내기 작업을 위한 외부 스크립트](guides/ical-export-import.md)도 있습니다.


[Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)


## 직렬화 시 포함되는 속성

:::note
이 방식은 iCal 포맷에는 적용되지 않습니다.
:::

기본적으로 내보내기에는 표준 속성(프로퍼티)만 포함됩니다:

1. id
2. text
3. start_date (*직렬화 형식은 [date_format](api/config/date_format.md) 프로퍼티로 제어됩니다*)
4. end_date

사용자 정의 속성을 포함하려면 **data_attributes** 메서드를 오버라이드할 수 있습니다. 간단한 예시는 다음과 같습니다:

~~~js
scheduler.data_attributes = function(){
    return [
        ["id"],["text"],["date_start"],["date_end"],
        ["custom_attribute"]
    ];
};
~~~

이 메서드는 속성 이름의 목록을 반환합니다.

직렬화 전에 속성 데이터를 처리할 포맷팅 함수를 지정할 수도 있습니다.

날짜를 XML에 추가하기 전에 포맷팅이 필요한 경우 유용합니다.

~~~js
scheduler.data_attributes = function(){
    return [
        ["id"],
        ["text"],
        ["start_date",scheduler.templates.format_date],
        ["end_date",scheduler.templates.format_date]];
}
~~~

## 반복 이벤트 직렬화

:::note
이 기술은 iCal 포맷에는 적용되지 않습니다.
:::

"recurring" 확장 기능을 사용할 경우, 반복 이벤트와 관련된 추가 속성을 정의해야 합니다:

~~~js
scheduler.data_attributes = function(){
    var empty = function(a){ return a||""; }
    return [["id"],
        ["text"],
        ["start_date",scheduler.templates.xml_format],
        ["end_date",scheduler.templates.xml_format],
        ["rec_type",empty],
        ["event_length",empty],
        ["event_pid",empty]];
}
~~~

## XML 파일로 데이터 저장하기

직렬화를 사용하면 데이터베이스 없이도 XML 파일에 데이터를 저장할 수 있습니다.

- 먼저, **serialize** 확장 기능을 활성화합니다:

~~~js
scheduler.plugins({
    serialize: true
});
~~~

- 다음으로, 데이터를 저장할 숨겨진 폼을 페이지에 추가합니다:

~~~xml
<form id="xml_form" action="xml_writer.php" method="post" target="hidden_frame" >
    <input type="hidden" name="data" value="" id="data">
</form>
~~~

- 페이지에 "저장" 버튼을 추가합니다

~~~html
<input type="button" name="save" value="save" onclick="save()" >
~~~

~~~js
function save(){
    var form = document.getElementById("xml_form");
    form.elements.data.value = scheduler.toXML();
    form.submit();
}
~~~

- 서버 측에서는 데이터를 기존 파일에 기록합니다. xml_writer.php는 다음과 같을 수 있습니다:

~~~php
<?php
    file_put_contents("./data.xml",$_POST["data"]);
?>
~~~

빈 data.xml 파일은 다음과 같습니다:

~~~xml
<data></data>
~~~

이 설정을 사용하면 스케줄러는 data.xml에서 이벤트를 불러올 수 있으며, "저장" 버튼을 누르면 현재 스케줄러 상태를 XML로 직렬화하여 파일에 다시 저장합니다.

이렇게 하면 다음에 스케줄러를 불러올 때 이전에 저장한 이벤트가 표시됩니다.

## 문제 해결

저장 시 원하지 않는 데이터 이스케이프가 발생한다면, PHP 설정에서 "magic_quotes"가 꺼져 있는지 확인하세요.
