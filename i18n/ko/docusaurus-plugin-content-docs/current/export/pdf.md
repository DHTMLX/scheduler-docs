---
title: "PDF로 내보내기"
sidebar_label: "PDF로 내보내기"
---

# PDF로 내보내기

*본 문서는 dhtmlxScheduler 4.1+의 PDF 내보내기에 관해 다룹니다. 만약 dhtmlxScheduler 4.0 또는 그 이전 버전을 사용 중이라면 세부 정보는 [여기](export/pdf-legacy.md)를 참조하십시오).*

버전 4.1부터 dhtmlxScheduler는 PDF 형식으로 스케줄러를 내보내는 새로운 방법을 제공합니다 - [온라인 내보내기 서비스](export/pdf.md#default-export-to-pdf).

:::info
서비스는 무료이지만, 출력된 PDF 파일에는 GPL 라이선스에 따른 워터마크가 포함됩니다. 라이선스를 구입하는 경우, 유효한 지원 기간(모든 PRO 라이선스의 경우 12개월) 동안 워터마크 없이 내보낸 결과물을 사용할 수 있습니다.
:::

## Export 서비스 사용하기

여러 가지 내보내기 서비스가 있습니다. 로컬 컴퓨터에 설치하고 Scheduler를 PDF로 로컬 내보내기가 가능합니다.

내보내기 서비스는 Scheduler 패키지에 포함되어 있지 않다는 점에 주의하십시오. 각 서비스의 사용 조건을 알아보려면 [해당 문서](https://dhtmlx.com/docs/products/dhtmlxScheduler/export.shtml)를 읽어보십시오.

## 요청 크기 제한

공통 API 엔드포인트 <b>*https://export.dhtmlx.com/scheduler*</b>가 내보내기 방법들(*exportToPDF*, *exportToPNG*, 등)을 제공합니다. **최대 요청 크기는 10 MB입니다**.

## 기본 PDF 내보내기

스케줄러를 PDF 문서로 내보내려면 아래 단계들을 완료합니다:

- 온라인 내보내기 서비스를 사용하려면 <b>export_api</b> 플러그인을 [plugins](api/method/plugins.md) 메서드를 통해 활성화합니다:

~~~js
scheduler.plugins({
    export_api: true
});
~~~

:::note
Scheduler 버전이 7.0 미만인 경우 온라인 내보내기 서비스를 활성화하려면 페이지에 **https://export.dhtmlx.com/scheduler/api.js** 파일을 포함해야 합니다. 예:

~~~js
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>
~~~
:::

- Scheduler를 내보내려면 <a href="#parametersoftheexportmethod">exportToPDF</a> 메서드를 호출합니다:

~~~html
<input value="Export to PDF" type="button" onclick='scheduler.exportToPDF()'>/*!*/
~~~

[Export to PDF/PNG](https://docs.dhtmlx.com/scheduler/samples/04_export/06_online_export.html)

## 내보내기 메서드의 매개변수

[exportToPDF()](api/method/exporttopdf.md) 메서드는 여러 속성을 가진 객체를 매개변수로 받습니다(모든 속성은 선택적입니다):


<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) 출력 파일의 이름</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>format</b></td>
  <td>(<i>'A0', 'A1', 'A2', 'A3', 'A4', 'A5'</i>) 출력 PDF 이미지의 형식</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>orientation</b></td>
  <td>(<i>'portrait', 'landscape'</i>) 출력 PDF 이미지의 방향을 설정합니다</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>zoom</b></td>
  <td>(<i>number</i>) 출력 PDF 이미지의 확대/축소 계수를 설정합니다</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) 출력 PDF 이미지에 추가될 헤더를 지정합니다. 여기에는 임의의 HTML을 사용할 수 있습니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) 출력 PDF 이미지에 추가될 푸터를 지정합니다. 여기에는 임의의 HTML을 사용할 수 있습니다.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) 요청에 대한 API 엔드포인트를 설정합니다. 로컬 설치된 내보내기 서비스와 함께 사용할 수 있습니다. 기본 값은 <strong>https://export.dhtmlx.com/scheduler</strong></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>additional_settings</b></td>
  <td>(<i>object</i>) 추가 설정을 가진 객체. 객체에는 다음 속성이 포함될 수 있습니다: <ul> <li><b>format</b> - (<i>string</i>) 출력 파일의 형식: <i>'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'</i></li> <li><b>landscape</b> - (<i>boolean</i>) 출력 파일의 세로/가로 방향. "format" 속성이 지정될 때만 작동합니다.</li> <li><b>width</b> - (<i>string|number|"content"</i>) 출력 페이지의 너비. 다중 페이지를 내보낼 때 사용됩니다. </li> <li><b>height</b> - (<i>string|number|"content"</i>) 출력 페이지의 높이. 다중 페이지를 내보낼 때 사용됩니다.</li> </ul></td>
  </tr>
  </tbody>
</table>


선택적 속성으로 내보내기 메서드 호출:
~~~js
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


## 출력 파일의 이름

출력 파일의 이름을 사용자 정의하려면 [exportToPDF](export/pdf.md#parameters-of-the-export-method) 메서드의 매개변수에서 **name** 속성을 사용하십시오:

~~~js
scheduler.exportToPDF({
    name:"my_beautiful_scheduler.pdf"/*!*/
});
~~~


## 출력 파일의 헤더/푸터

출력 PDF 파일에 헤더/푸터를 추가하려면 [exportToPDF](export/pdf.md#parameters-of-the-export-method) 메서드 매개변수에서 **header**/**footer** 속성을 사용하십시오:

:::note
참고: 매개변수를 지정하는 동안 임의의 HTML을 사용할 수 있습니다. 이미지를 지정할 때는 "src" 속성의 전역 경로를 값으로 설정해야 한다는 점을 기억하십시오.
:::

~~~js
scheduler.exportToPDF({
    name:"myscheduler.pdf",
    header:"<h1>My company</h1>",/*!*/
    footer:"<h4>Bottom line</h4>"/*!*/
});
~~~


## 출력 파일에 대한 커스텀 스타일

스케줄러에 커스텀 스타일을 적용하려면, 커스텀 CSS 클래스를 가진 스타일시트를 제공하십시오:

- 링크를 통해:

~~~js
scheduler.exportToPDF({
    name:"calendar.pdf",
    header:'<link rel="stylesheet" href="http://mysite.com/custom.css">' /*!*/
});
~~~


- 또는 'style' 태그를 통해:

~~~js
scheduler.exportToPDF({
    name:"calendar.pdf",
    header:'<style>... custom css classes here ...</style>' /*!*/
});
~~~


참고: 위의 솔루션은 전역 HTTP 참조에 대해 작동합니다. 기업 내(Intranet) 또는 로컬 환경에서 CSS 클래스가 지정된 경우, 아래와 같이 모든 스타일을 임베드할 수 있습니다.

~~~js
scheduler.exportToPDF({
    header:"<style>.tier1{background: red; color:white;}</style>"
});
~~~


## HTML 요소 내보내기

스케줄러를 PDF 형식으로 내보내는 동안 HTML 요소의 내보내기가 보안상의 이유로 제한될 수 있다는 점에 유의해야 합니다. 

일부 HTML 요소는 내보내기에 완전히 허용되지 않으며, 예를 들어 `<canvas>`, `<svg>`, `<script>` 및 Base64 이미지를 포함하는 *src* 속성을 가진 이미지가 있습니다. 하지만 SVG 및 Base64 형식의 이미지 내보내기는 안전한 방법이 있습니다:

- `<img>` 요소를 사용하여 SVG 형식의 이미지 URL을 가진 *src* 속성을 지정하면 PNG 및 JPG 형식에 적합하지만 Base64 형식에는 작동하지 않습니다. 예:

~~~html
<img src="https://www.svgrepo.com/download/530597/hat.svg">
~~~

- 스타일 요소를 사용하여 예를 들면 *background* 또는 *background-image*를 사용하고, 이미지 링크나 Base64 형식의 이미지를 값으로 하는 `url` 속성을 지정할 수 있습니다( PNG/JPG/SVG 형식에 적합).

~~~css
.red {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH1ggDCwMADQ4NnwAAAFVJREFUGJWNkMEJADEIBEcbSDkXUnfSgnBVeZ8LSAjiwjyEQXSFEIcHGP9oAi+H0Bymgx9MhxbFdZE2a0s9kTZdw01ZhhYkABSwgmf1Z6r1SNyfFf4BZ+ZUExcNUQUAAAAASUVORK5CYII=") 100%/contain no-repeat;
    display: inline-block;
    width: 32px;
    height: 32px;
}
~~~

만약 내보내기 모듈이 있고 온라인 내보내기 서버에서 지원하지 않는 HTML 요소를 내보내야 하는 경우, 모듈에서의 제약 해제에 필요한 변경 사항에 대한 지침을 얻기 위해 지원 요청을 제출할 수 있습니다. 다만 이 경우 서버가 XSS 공격에 취약해질 수 있다는 점을 감안해야 합니다.