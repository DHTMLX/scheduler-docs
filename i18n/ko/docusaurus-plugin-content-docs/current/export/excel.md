---
title: "Excel 및 iCal로 내보내기"
sidebar_label: "Excel 및 iCal로 내보내기"
---

# Excel 및 iCal로 내보내기

버전 4.2부터 dhtmlxScheduler는 스케줄러의 모든 데이터를 Excel 및 iCal 형식으로 내보낼 수 있는 기능을 제공합니다.

## 요청 크기 한도

내보내기 메서드(exportToPDF, exportToPNG 등)에 사용되는 일반 API 엔드포인트 https://export.dhtmlx.com/scheduler가 있습니다. 최대 요청 크기는 10 MB입니다.

## Excel로 내보내기

스케줄러의 데이터를 Excel 문서로 내보내려면 다음 단계를 수행합니다:

1. 온라인 내보내기 서비스 기능을 활성화하려면 페이지에 <b>"https://export.dhtmlx.com/scheduler/api.js"</b> 파일을 포함하세요:
~~~html
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>  /*!*/
<link rel="stylesheet" href="codebase/dhtmlxscheduler.css" type="text/css">
~~~
2. 스케줄러의 데이터를 내보내기 위해 <b>exportToExcel</b> 메서드를 호출합니다:
~~~html
<input value="Export to Excel" type="button" onclick="scheduler.exportToExcel()">/*!*/

<script>
    scheduler.init("scheduler_here",new Date(2027,5,30),"month");
    scheduler.load("data/events");
</script>
~~~

#### export 메서드의 매개변수

The **exportToExcel()** 메서드는 매개변수로 여러 속성을 가진 객체를 받습니다(모든 속성은 선택 사항):

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) 출력 파일의 이름으로 확장자 '.xlsx'가 붙습니다</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>columns</b></td>
  <td>(<i>array</i>) 출력 시트의 열을 구성합니다 <ul> <li>'id' - (string/number) 열에 매핑될 이벤트 속성의 id</li> <li>'header' - (string) 열의 헤더</li> <li>'width' - (number) 열의 너비(픽셀)</li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) 요청의 API 엔드포인트를 설정합니다. 내보내기 서비스의 로컬 설치와 함께 사용할 수 있습니다. 기본 값은 <strong>https://export.dhtmlx.com/scheduler</strong>입니다</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>start</b></td>
  <td>(<i>string|object</i>) 출력에 표시될 데이터 범위의 시작 날짜를 설정합니다</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>end</b></td>
  <td>(<i>string|object</i>) 출력에 표시될 데이터 범위의 종료 날짜를 설정합니다</td>
  </tr>
  </tbody>
</table>


선택적 속성으로 내보내기 메서드 호출:
~~~js
scheduler.exportToExcel({
    name:"My document.xls", 
    columns:[
        { id:"text",  header:"Title", width:150 },
        { id:"start_date",  header:"Start date", width:250 }
    ],
    server:"https://myapp.com/myexport/scheduler",
    start: new Date(1999, 01, 01),
    end:  new Date(2027, 01, 01)
});
~~~

#### 날짜 형식 설정

Excel 파일로 내보낼 날짜 형식을 지정하려면 xml_format 템플릿을 사용합니다:

~~~js
scheduler.templates.xml_format = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
~~~

**관련 샘플** [날짜 형식 설정](https://snippet.dhtmlx.com/5/6d3de8fa2)

날짜 형식 규격은 [여기](guides/settings-format.md)에서 확인하십시오.

## iCal로 내보내기

스케줄러의 데이터를 iCal 문자열로 내보내려면 다음 단계를 수행합니다:

- 온라인 내보내기 서비스 기능을 활성화하려면 페이지에 <b>"https://export.dhtmlx.com/scheduler/api.js"</b> 파일을 포함하세요:
~~~html
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>  /*!*/
<link rel="stylesheet" href="codebase/dhtmlxscheduler.css" type="text/css">
~~~

- 스케줄러의 데이터를 iCal로 내보내려면 <b>exportToICal</b> 메서드를 호출합니다:

~~~html
<input value="Export to iCal" type="button" onclick="scheduler.exportToICal()">/*!*/

<script>
    scheduler.init("scheduler_here",new Date(2027,5,30),"month");
    scheduler.load("data/events");
</script>
~~~

#### export 메서드의 매개변수

The **exportToICal()** 메서드는 다음 속성(선택 사항)을 가진 객체를 매개변수로 받습니다:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) 요청의 API 엔드포인트를 설정합니다. 내보내기 서비스의 로컬 설치와 함께 사용할 수 있습니다. 기본 값은 <strong>https://export.dhtmlx.com/scheduler</strong>입니다</td>
  </tr>
  </tbody>
</table>


선택적 속성으로 내보내기 메서드 호출:
~~~js
scheduler.exportToICal({
    server:"https://myapp.com/myexport/scheduler"
});
~~~