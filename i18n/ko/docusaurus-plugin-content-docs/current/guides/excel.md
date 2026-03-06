---
title: "엑셀 및 iCal로 내보내기"
sidebar_label: "엑셀 및 iCal로 내보내기"
---

# 엑셀 및 iCal로 내보내기

버전 4.2부터 dhtmlxScheduler는 모든 스케줄러 데이터를 엑셀(Excel) 및 iCal 형식으로 내보내는 기능을 제공합니다.

## 요청 크기 제한

여러 내보내기 방법(*exportToPDF*, *exportToPNG* 등)에 사용되는 공용 API 엔드포인트 **https://export.dhtmlx.com/scheduler**가 있습니다. **최대 요청 크기는 10MB**입니다.

## 엑셀로 내보내기

스케줄러 데이터를 엑셀 파일로 내보내려면 다음 단계를 따르세요:

1. 온라인 내보내기 서비스를 활성화하려면 "https://export.dhtmlx.com/scheduler/api.js" 스크립트를 페이지에 추가하세요:
~~~html
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>  /*!*/
<link rel="stylesheet" href="codebase/dhtmlxscheduler.css" type="text/css">
~~~
2. exportToExcel 메서드를 사용하여 스케줄러 데이터를 내보냅니다:
~~~html
<input value="Export to Excel" type="button" onclick="scheduler.exportToExcel()">/*!*/

<script>
    scheduler.init("scheduler_here",new Date(2019,5,30),"month");
    scheduler.load("data/events");
</script>
~~~

#### 내보내기 메서드의 파라미터

**exportToExcel()** 메서드는 여러 속성을 포함하는 선택적 객체를 인자로 받을 수 있습니다:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) '.xlsx' 확장자를 포함한 출력 파일 이름</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>columns</b></td>
  <td>(<i>array</i>) 출력 시트의 컬럼을 설정합니다 <ul> <li>'id' - (string/number) 컬럼에 매핑될 이벤트 속성 ID</li> <li>'header' - (string) 컬럼 헤더 텍스트</li> <li>'width' - (number) 픽셀 단위의 컬럼 너비</li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) 내보내기 요청을 보낼 API 엔드포인트를 지정합니다. 로컬에 설치된 내보내기 서비스를 지정할 수도 있습니다. 기본값은 <strong>https://export.dhtmlx.com/scheduler</strong>입니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>start</b></td>
  <td>(<i>string|object</i>) 내보낼 데이터 범위의 시작 날짜를 설정합니다</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>end</b></td>
  <td>(<i>string|object</i>) 내보낼 데이터 범위의 종료 날짜를 설정합니다</td>
  </tr>
  </tbody>
</table>


~~~js title="Calling the export method with optional properties"
scheduler.exportToExcel({
    name:"My document.xls", 
    columns:[
        { id:"text",  header:"Title", width:150 },
        { id:"start_date",  header:"Start date", width:250 }
    ],
    server:"https://myapp.com/myexport/scheduler",
    start: new Date(1999, 01, 01),
    end:  new Date(2022, 01, 01)
});
~~~

#### 날짜 형식 설정

내보낸 엑셀 파일에서 날짜가 표시되는 방식을 제어하려면 **xml_format** 템플릿을 다음과 같이 설정하세요:

~~~js
scheduler.templates.xml_format = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
~~~

**Related sample** [Setting date format](https://snippet.dhtmlx.com/5/6d3de8fa2)

날짜 포맷에 대한 자세한 내용은 [여기](guides/settings-format.md)에서 확인할 수 있습니다.

## iCal로 내보내기

스케줄러 데이터를 iCal 문자열로 내보내려면 다음 절차를 따르세요:

- 온라인 내보내기 서비스를 활성화하려면 <b>"https://export.dhtmlx.com/scheduler/api.js"</b> 스크립트를 포함하세요:

~~~html
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>  /*!*/
<link rel="stylesheet" href="codebase/dhtmlxscheduler.css" type="text/css">
~~~

- <b>exportToICal</b> 메서드를 사용하여 스케줄러 데이터를 내보냅니다:

~~~html
<input value="Export to iCal" type="button" onclick="scheduler.exportToICal()">/*!*/

<script>
    scheduler.init("scheduler_here",new Date(2019,5,30),"month");
    scheduler.load("data/events");
</script>
~~~

#### 내보내기 메서드의 파라미터

**exportToICal()** 메서드는 다음 속성을 포함하는 선택적 객체를 인자로 받을 수 있습니다:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) 내보내기 요청을 보낼 API 엔드포인트를 지정합니다. 로컬에 설치된 내보내기 서비스를 지정할 수도 있습니다. 기본값은 <strong>https://export.dhtmlx.com/scheduler</strong>입니다.</td>
  </tr>
  </tbody>
</table>


~~~js title="Calling the export method with optional properties"
scheduler.exportToICal({
    server:"https://myapp.com/myexport/scheduler"
});
~~~
