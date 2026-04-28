---
title: "XML, JSON, iCal으로의 데이터 직렬화"
sidebar_label: "XML, JSON, iCal으로의 데이터 직렬화"
---

# XML, JSON, iCal으로의 데이터 직렬화 

## 준비하기 

이러한 기능을 활성화하려면 **serialize** 확장을 활성화하십시오.

~~~js
scheduler.plugins({
    serialize: true
});
~~~

## XML로 내보내기 

스케줄러 데이터를 XML 문자열로 직렬화하려면 [toXML](api/method/toxml.md) 메서드를 사용하십시오:

~~~js
const xml = scheduler.toXML(); //xml string

~~~

[스케줄러 이벤트 직렬화](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)

## JSON으로 내보내기 

스케줄러 데이터를 JSON 문자열로 직렬화하려면 [toJSON](api/method/tojson.md) 메서드를 사용하십시오: 


~~~js
const json_string = scheduler.toJSON(); //json string
~~~


:::note
참고, 이 메서드는 JSON 문자열을 반환하며 객체가 아닙니다. JSON 객체가 필요하면 [getEvents](api/method/getevents.md) 메서드를 사용하십시오.
:::

[스케줄러 이벤트 직렬화](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)


## iCal로 내보내기 

스케줄러 데이터를 ICal 문자열로 직렬화하려면 [toICal](api/method/toical.md) 메서드를 사용하십시오: 


~~~js
const ical_string = scheduler.toICal(); //ical string
~~~


또한, iCal 가져오기-내보내기 작업용 외부 스크립트가 있습니다. [external script for iCal import-export operations](guides/ical-export-import.md)

[스케줄러 이벤트 직렬화](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)


## 직렬화의 속성

:::note
다음 기술은 iCal 형식에는 적용되지 않습니다.
:::

기본적으로 내보내기는 표준 속성(프로퍼티)만 포함합니다:

1. id
2. text
3. start_date (*직렬화 형식은 [date_format](api/config/date_format.md) 속성에 의해 정의됩니다*)
4. end_date

만약 일부 사용자 정의 속성을 포함해야 한다면 **data_attributes** 메서드를 재정의할 수 있습니다. 가장 단순한 경우에는 아래와 같이 보입니다:

~~~js
scheduler.data_attributes = function(){
    return [
        ["id"],["text"],["date_start"],["date_end"],
        ["custom_attribute"]
    ];
};
~~~

대체로, 이 메서드는 속성 이름의 목록을 정의합니다. 

그러나 직렬화되기 전에 속성 데이터가 어떻게 처리되어야 하는지 설명하는 서식 지정 함수(formatting function)을 정의할 수도 있습니다.

XML에 배치되기 전에 날짜를 변환해야 하는 경우에 유용할 수 있습니다

~~~js
scheduler.data_attributes = function(){
    return [
        ["id"],
        ["text"],
        ["start_date",scheduler.templates.format_date],
        ["end_date",scheduler.templates.format_date]];
}
~~~

## 반복 이벤트의 직렬화

:::note
다음 기술은 iCal 형식에는 적용되지 않습니다.
:::

만약 "recurring" 확장을 사용 중이라면 반복 이벤트에서 사용되는 추가 속성을 정의해야 합니다:

~~~js
scheduler.data_attributes = function(){
    const empty = function(a){ return a||""; }
    return [["id"],
        ["text"],
        ["start_date",scheduler.templates.xml_format],
        ["end_date",scheduler.templates.xml_format],
        ["rec_type",empty],
        ["event_length",empty],
        ["event_pid",empty]];
}
~~~

## XML 파일에 데이터 저장

직렬화를 통해 DB 없이도 데이터를 저장하는 간단한 루틴을 구현할 수 있습니다. 

- 먼저 우선 **serialize** 확장을 활성화합니다:

~~~js
scheduler.plugins({
    serialize: true
});
~~~


- 그런 다음, 페이지에 데이터 저장용 숨겨진 폼을 배치합니다:

~~~xml
<form id="xml_form" action="xml_writer.php" method="post" target="hidden_frame" >
    <input type="hidden" name="data" value="" id="data">
</form>
~~~


- 페이지에 "Save" 버튼을 배치합니다

~~~html
<input type="button" name="save" value="save" onclick="save()" >

~~~


~~~js
function save(){
    let form = document.getElementById("xml_form");
    form.elements.data.value = scheduler.toXML();
    form.submit();
}
~~~


- 서버 측에서 데이터를 기존 파일에 작성합니다. xml_writer.php는 아래와 같이 될 수 있습니다:

~~~php
<?php
    file_put_contents("./data.xml",$_POST["data"]);
?>
~~~


빈 data.xml은:

~~~xml
<data></data>
~~~


이제 scheduler를 data.xml에서 로드할 수 있으며, "save" 버튼을 누르면 현재 스케줄러 상태가 XML로 직렬화되어 파일에 다시 저장됩니다. 따라서 다음 로딩 시점에는 이전에 저장된 이벤트가 로드됩니다. 

## 문제 해결 

데이터 저장 중 원치 않는 데이터 이스케이프가 발생하는 경우, php 구성에서 "magic_quotes"가 비활성화되어 있는지 확인하십시오.