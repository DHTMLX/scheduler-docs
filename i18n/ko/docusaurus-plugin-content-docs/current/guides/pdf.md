---
title: "Export to PDF"
sidebar_label: "Export to PDF"
---

# Export to PDF 

*이 문서는 dhtmlxScheduler 버전 4.1 이상에서의 내보내기 방법을 다룹니다. 4.0 이하 버전의 경우 [이 가이드](export/pdf-legacy.md)를 참고하세요.*

버전 4.1부터 dhtmlxScheduler는 [온라인 내보내기 서비스](export/pdf.md#defaultexporttopdf)를 이용하여 스케줄러를 PDF 파일로 내보내는 새로운 방법을 제공합니다.

:::note
이 서비스는 무료로 사용할 수 있지만, GPL 라이선스 하에서 생성된 PDF에는 라이브러리 워터마크가 포함됩니다. 라이선스를 구매하면 활성 지원 기간(모든 PRO 라이선스의 경우 12개월) 동안 워터마크가 제거됩니다.
:::

## Export Services 사용하기 {#usingexportservices}

여러 가지 내보내기 서비스가 제공되며, 이를 로컬 환경에 설치하여 Scheduler를 PDF로 내보낼 수 있습니다.

내보내기 서비스는 Scheduler 패키지와 별개임을 유의하세요. 사용 조건에 대한 자세한 내용은 [관련 문서](https://dhtmlx.com/docs/products/dhtmlxScheduler/export.shtml)를 참고하세요.

## 요청 크기 제한 {#limitsonrequestsize}

API 엔드포인트 <b>*https://export.dhtmlx.com/scheduler*</b>는 (*exportToPDF*, *exportToPNG* 등) 내보내기 요청을 처리합니다. 허용되는 최대 요청 크기는 **10 MB**입니다.

## 기본 PDF 내보내기 {#defaultexporttopdf}

스케줄러를 PDF로 내보내려면 다음 단계를 따르세요:

- <b>export_api</b> 플러그인을 [plugins](api/method/plugins.md) 메서드를 사용하여 활성화합니다:

~~~js
scheduler.plugins({
      export_api: true
});
~~~

:::note
Scheduler 7.0 미만 버전의 경우 온라인 내보내기 서비스를 활성화하려면 **https://export.dhtmlx.com/scheduler/api.js** 스크립트를 페이지에 포함해야 합니다. 예시:

~~~js
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>
~~~
:::

- <a href="#parametersoftheexportmethod">exportToPDF</a> 메서드를 사용하여 내보내기를 수행합니다:

~~~html
<input value="Export to PDF" type="button" onclick='scheduler.exportToPDF()'>/*!*/
~~~


[Export to PDF/PNG](https://docs.dhtmlx.com/scheduler/samples/04_export/06_online_export.html)


## 내보내기 메서드의 파라미터 {#parametersoftheexportmethod}

[exportToPDF()](api/method/exporttopdf.md) 메서드는 다양한 속성이 포함된 선택적 객체 파라미터를 받을 수 있습니다:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) 내보낼 PDF의 파일명</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>format</b></td>
  <td>(<i>'A0', 'A1', 'A2', 'A3', 'A4', 'A5'</i>) PDF 출력의 용지 크기</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>orientation</b></td>
  <td>(<i>'portrait', 'landscape'</i>) PDF 페이지 방향</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>zoom</b></td>
  <td>(<i>number</i>) PDF 출력의 확대/축소 비율</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) PDF에 포함될 헤더의 HTML 내용</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) PDF에 포함될 푸터의 HTML 내용</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) 내보내기 요청을 위한 API 엔드포인트 URL. 로컬 내보내기 서비스를 사용할 경우 유용하며, 기본값은 <strong>https://export.dhtmlx.com/scheduler</strong> 입니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>additional_settings</b></td>
  <td>(<i>object</i>) 추가 내보내기 옵션, 예: <ul> <li><b>format</b> - (<i>string</i>) 출력 파일 형식: <i>'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'</i></li> <li><b>landscape</b> - (<i>boolean</i>) 페이지 방향, "format"이 지정된 경우에만 적용</li> <li><b>width</b> - (<i>string|number|"content"</i>) 출력 페이지의 너비 (멀티 페이지 내보내기에서 사용)</li> <li><b>height</b> - (<i>string|number|"content"</i>) 출력 페이지의 높이 (멀티 페이지 내보내기에서 사용)</li> </ul></td>
  </tr>
  </tbody>
</table>


~~~js title="옵션과 함께 exportToPDF 호출 예시"
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

## 출력 파일 이름 지정 {#nameoftheoutputfile}

내보낼 PDF의 파일명을 지정하려면 [exportToPDF](export/pdf.md#parametersoftheexportmethod) 옵션의 **name** 속성을 설정하세요:

~~~js
scheduler.exportToPDF({
    name:"my_beautiful_scheduler.pdf"/*!*/
});
~~~

## 출력 파일의 헤더/푸터 {#headerfooteroftheoutputfile}

내보낼 PDF에 헤더와 푸터를 추가하려면 [exportToPDF](export/pdf.md#parametersoftheexportmethod) 옵션의 **header** 및 **footer** 속성을 사용하세요:

:::note
이 속성에는 어떤 HTML도 사용할 수 있습니다. 이미지를 포함할 경우 "src" 속성에 절대 경로 URL을 사용해야 합니다.
:::

~~~js
scheduler.exportToPDF({
    name:"myscheduler.pdf",
    header:"<h1>My company</h1>",/*!*/
    footer:"<h4>Bottom line</h4>"/*!*/
});
~~~

## 출력 파일에 커스텀 스타일 적용 {#customstylefortheoutputfile}

CSS 클래스가 포함된 스타일시트를 추가하여 커스텀 스타일을 적용할 수 있습니다:

- 외부 스타일시트를 링크하는 방법:

~~~js
scheduler.exportToPDF({
    name:"calendar.pdf",
    header:'<link rel="stylesheet" href="http://mysite.com/custom.css">' /*!*/
});
~~~

- 또는 `<style>` 태그 내에 스타일을 직접 포함하는 방법:

~~~js
scheduler.exportToPDF({
    name:"calendar.pdf",
    header:'<style>... custom css classes here ...</style>' /*!*/
});
~~~

이 방법은 전역적으로 접근 가능한 HTTP URL에서 동작합니다. 로컬 또는 인트라넷 환경에서는 모든 스타일을 직접 포함할 수 있습니다. 예를 들어:

~~~js
scheduler.exportToPDF({
    header:"<style>.tier1{background: red; color:white;}</style>"
});
~~~

## HTML 요소 내보내기 {#exportinghtmlelements}

Scheduler를 PDF로 내보낼 때 보안상의 이유로 HTML 요소에 일부 제한이 있습니다.

`<canvas>`, `<svg>`, `<script>` 및 Base64로 인코딩된 *src* 속성의 이미지는 완전히 지원되지 않습니다. 그러나 SVG 및 Base64 형식의 이미지를 내보낼 때 사용할 수 있는 안전한 대안이 있습니다:

- *src* 속성이 SVG 이미지 URL을 가리키는 `<img>` 태그를 사용하세요(이 방법은 PNG 및 JPG 내보내기에서 동작하지만 Base64에는 적용되지 않음). 예시:

~~~html
<img src="https://www.svgrepo.com/download/530597/hat.svg">
~~~

- CSS의 *background* 또는 *background-image* 속성에 `url()`을 사용하여 이미지 URL 또는 Base64 문자열을 지정하세요(PNG, JPG, SVG 내보내기에서 동작):

~~~css
.red {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH1ggDCwMADQ4NnwAAAFVJREFUGJWNkMEJADEIBEcbSDkXUnfSgnBVeZ8LSAjiwjyEQXSFEIcHGP9oAi+H0Bymgx9MhxbFdZE2a0s9kTZdw01ZhhYkABSwgmf1Z6r1SNyfFf4BZ+ZUExcNUQUAAAAASUVORK5CYII=") 100%/contain no-repeat;
    display: inline-block;
    width: 32px;
    height: 32px;
}
~~~

자체 내보내기 모듈을 사용하고 있으며 지원되지 않는 HTML 요소를 내보내야 하는 경우, 모듈을 수정하여 제한을 우회하는 방법에 대해 지원팀에 문의할 수 있습니다. 단, 이렇게 하면 서버가 XSS 취약점에 노출될 수 있다는 점을 유의하세요.
