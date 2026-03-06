---
sidebar_label: "exportToPDF"
title: "exportToPDF method"
description: "Scheduler를 PDF 포맷으로 내보냅니다."
---

# exportToPDF

### Description

@short: Scheduler를 PDF 포맷으로 내보냅니다.

@signature: exportToPDF: (_export_?: any) =\> void

### Parameters

- `export` - (optional) *object* - 내보내기 설정이 포함된 객체 (자세한 내용은 아래 참조)

### Example

~~~jsx
scheduler.exportToPDF();
 
//또는
scheduler.exportToPDF({
  name: "myscheduler.pdf"
});

scheduler.exportToPDF({
    name:"myscheduler.pdf",
    format:"A4",
    orientation:"portrait",
    zoom:1,
    header:"<h1>My company</h1>",
    footer:"<h4>Bottom line</h4>",
    server:"https://myapp.com/myexport/scheduler"
});
~~~

### Details

:::note
 이 메서드는 **export** 확장 기능의 일부이므로, 페이지에 반드시 포함해야 합니다:
~~~html
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>  
~~~
자세한 내용은 ["Export to PDF"](export/pdf.md) 문서를 참고하세요.
 
:::

**exportToPDF()** 메서드는 내보내기를 사용자 정의할 수 있는 다양한 선택적 속성을 가진 객체를 인자로 받습니다:


<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) 내보내는 PDF 파일의 이름을 지정합니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>format</b></td>
  <td>(<i>'A0', 'A1', 'A2', 'A3', 'A4', 'A5'</i>) 내보내는 PDF의 크기 포맷을 정의합니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>orientation</b></td>
  <td>(<i>'portrait', 'landscape'</i>) PDF의 페이지 방향을 설정합니다.</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>zoom</b></td>
  <td>(<i>number</i>) 내보내는 PDF 콘텐츠의 줌 레벨을 제어합니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) PDF에 헤더로 추가할 HTML 콘텐츠입니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) PDF에 푸터로 추가할 HTML 콘텐츠입니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) 내보내기 요청을 처리하는 API 엔드포인트의 URL입니다. 로컬 내보내기 서비스로도 지정할 수 있으며 기본값은 <strong>https://export.dhtmlx.com/scheduler</strong>입니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>additional_settings</b></td>
  <td>(<i>object</i>) 추가 구성 옵션을 포함하는 객체로, 다음 항목들을 포함합니다:<ul><li><b>format</b> - (<i>string</i>) 출력 파일 포맷을 지정합니다. 예: <i>'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'</i></li><li><b>landscape</b> - (<i>boolean</i>) 출력이 세로 모드인지 가로 모드인지 제어합니다. "format"이 설정된 경우에만 적용됩니다.</li><li><b>width</b> - (<i>string|number|"content"</i>) 출력 페이지의 너비를 설정하며, 다중 페이지 내보내기에 유용합니다.</li><li><b>height</b> - (<i>string|number|"content"</i>) 출력 페이지의 높이를 설정하며, 다중 페이지 내보내기에 사용됩니다.</li></ul></td>
  </tr>
  </tbody>
</table>

### Related Guides
- ["Export to PDF"](export/pdf.md)
