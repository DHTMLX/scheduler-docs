---
sidebar_label: "exportToPNG"
title: "exportToPNG method"
description: "Scheduler를 PNG 이미지로 내보낼 수 있습니다."
---

# exportToPNG

### Description

@short: Scheduler를 PNG 이미지로 내보낼 수 있습니다.

@signature: exportToPNG: (_export_?: any) =\> void

### Parameters

- `export` - (optional) *object* - 내보내기 옵션을 포함하는 객체 (자세한 내용은 아래 참조)

### Example

~~~jsx
scheduler.exportToPNG();
 
//또는
scheduler.exportToPNG({
      name:"my_beautiful_scheduler.png"
});

scheduler.exportToPNG({
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
 이 메서드는 **export** 확장의 일부이므로, 페이지에 반드시 포함해야 합니다:
~~~html
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>  
~~~
자세한 내용은 ["Export to PNG"](export/png.md) 문서를 참고하세요.
 
:::

**exportToPNG()** 메서드는 다양한 선택적 속성을 가진 객체를 인자로 받습니다:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) 내보낼 PNG 파일의 이름</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>format</b></td>
  <td>(<i>'A0', 'A1', 'A2', 'A3', 'A4', 'A5'</i>) PNG 출력의 페이지 크기</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>orientation</b></td>
  <td>(<i>'portrait', 'landscape'</i>) PNG 이미지의 레이아웃 방향</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>zoom</b></td>
  <td>(<i>number</i>) 내보낼 PNG의 줌 레벨 설정</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) PNG 이미지 상단에 포함할 HTML 콘텐츠</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) PNG 이미지 하단에 포함할 HTML 콘텐츠</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) 내보내기 요청에 사용되는 API 엔드포인트. 로컬에 설치된 export 서비스로도 지정 가능하며 기본값은 <strong>https://export.dhtmlx.com/scheduler</strong> 입니다.</td>
  </tr>
  </tbody>
</table>

### Related Guides
- ["Export to PNG"](export/png.md)
