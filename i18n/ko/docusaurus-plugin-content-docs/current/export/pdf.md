---
title: "PDF로 내보내기"
sidebar_label: "PDF로 내보내기"
---

# PDF로 내보내기

*이 문서는 dhtmlxScheduler 4.1+의 PDF 내보내기에 대해 다룹니다. 만약 dhtmlxScheduler 4.0 또는 그 이전 버전을 사용 중이라면 자세한 내용은 [여기](export/pdf-legacy.md)를 참조하십시오.*


버전 4.1부터, dhtmlxScheduler는 스케줄러를 PDF 형식으로 내보내는 새로운 접근 방식인 [온라인 내보내기 서비스](export/pdf.md#default-export-to-pdf)를 제공합니다.


:::info
서비스는 무료이지만, 출력된 PDF 파일에는 GPL 라이선스 아래 라이브러리 워터마크가 포함됩니다. 라이선스를 구입하는 경우, 유효한 지원 기간(모든 PRO 라이선스에 대해 12개월) 동안 워터마크 없이 내보내기 결과를 사용할 수 있습니다.
:::

## 내보내기 서비스 사용하기

다양한 내보내기 서비스가 제공됩니다. 이를 컴퓨터에 설치하고 Scheduler를 로컬에서 PDF로 내보낼 수 있습니다.

내보내기 서비스는 Scheduler 패키지에 포함되어 있지 않다는 점에 유의하십시오. 각 서비스의 이용 약관을 확인하려면 [해당 문서](https://dhtmlx.com/docs/products/dhtmlxScheduler/export.shtml)를 읽으십시오.


## 요청 크기 제한

공통 API 엔드포인트 `https://export.dhtmlx.com/scheduler`가 있으며, 이 엔드포인트는 `exportToPDF()` 및 `exportToPNG()`와 같은 내보내기 메서드를 제공합니다. 최대 요청 크기는 10 MB입니다.


## 기본 PDF 내보내기

스케줄러를 PDF 문서로 내보내려면 아래 단계를 완료하십시오:

- 온라인 내보내기 서비스를 사용하려면 [`plugins()`](api/method/plugins.md) 메서드를 통해 `export_api` 플러그인을 활성화하십시오:

~~~js
scheduler.plugins({
    export_api: true
});
~~~

:::note
Scheduler 버전이 7.0 미만인 경우 온라인 내보내기 서비스를 활성화하려면 페이지에 `https://export.dhtmlx.com/scheduler/api.js` 파일을 포함해야 합니다. 예:

~~~html
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>
~~~
:::

- 스케줄러를 PDF로 내보내려면 [`exportToPDF()`](#parameters-of-the-export-method) 메서드를 호출하십시오:

~~~html {1}
<input value="Export to PDF" type="button" onclick='scheduler.exportToPDF()'>
~~~


### 관련 샘플
- [Export to PDF/PNG](https://docs.dhtmlx.com/scheduler/samples/04_export/06_online_export.html)


## 내보내기 메서드의 매개변수

[`exportToPDF()`](api/method/exporttopdf.md) 메서드는 여러 속성을 가진 객체를 매개변수로 받습니다. 모든 속성은 선택적입니다:


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
  <td>(<i>'portrait', 'landscape'</i>) 출력 PDF 이미지의 방향을 설정</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>zoom</b></td>
  <td>(<i>number</i>) 출력 PDF 이미지의 확대 계수를 설정</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) 출력 PDF 이미지에 추가될 헤더를 지정합니다. 주의: 여기에는 HTML을 자유롭게 사용할 수 있습니다</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) 출력 PDF 이미지에 추가될 푸터를 지정합니다. 주의: 여기에는 HTML을 자유롭게 사용할 수 있습니다</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) 요청의 API 엔드포인트를 설정합니다. 로컬에 설치된 내보내기 서비스와 함께 사용할 수 있습니다. 기본값은 <strong>https://export.dhtmlx.com/scheduler</strong></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>additional_settings</b></td>
  <td>(<i>object</i>) 추가 설정이 포함된 객체. 객체는 다음 속성을 가질 수 있습니다: <ul> <li><b>format</b> - (<i>string</i>) 출력 파일의 형식: <i>'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'</i></li> <li><b>landscape</b> - (<i>boolean</i>) 출력 파일의 세로/가로 방향. 이 속성은 "format" 속성이 지정될 때만 작동합니다.</li> <li><b>width</b> - (<i>string|number|"content"</i>) 출력 페이지의 너비. 이 속성은 여러 페이지를 내보낼 때 사용됩니다. </li> <li><b>height</b> - (<i>string|number|"content"</i>) 출력 페이지의 높이. 이 속성은 여러 페이지를 내보낼 때 사용됩니다.</li> </ul></td>
  </tr>
  </tbody>
</table>

### 선택적 속성으로 내보내기 메서드 호출하기
~~~js
scheduler.exportToPDF({
    name: "myscheduler.pdf",
    format: "A4",
    orientation: "portrait",
    zoom: 1,
    header: "<h1>My company</h1>",
    footer: "<h4>Bottom line</h4>",
    server: "https://myapp.com/myexport/scheduler"
});
~~~


## 출력 파일의 이름

출력 파일의 이름을 사용자가 지정하려면 [`exportToPDF()`](export/pdf.md#parameters-of-the-export-method) 메서드 매개변수의 `name` 속성을 사용합니다:

~~~js {2}
scheduler.exportToPDF({
    name: "my_beautiful_scheduler.pdf"
});
~~~


## 출력 파일의 헤더/푸터

출력 PDF 파일에 헤더/푸터를 추가하려면 매개변수의 `header`/`footer` 속성을 사용합니다:

:::note
참고: 매개변수를 지정할 때 임의의 HTML을 사용할 수 있습니다. 이미지를 지정할 때는 `src` 속성의 경로를 전역 경로로 설정해야 한다는 점을 기억하십시오.
:::

~~~js {3-4}
scheduler.exportToPDF({
    name: "myscheduler.pdf",
    header: "<h1>My company</h1>",
    footer: "<h4>Bottom line</h4>"
});
~~~


## 출력 파일의 커스텀 스타일

스케줄러에 대해 사용자 정의 CSS 클래스로 스타일을 적용하려면 스타일시트를 제공하십시오:

- 링크를 통해:

~~~js {3}
scheduler.exportToPDF({
    name: "calendar.pdf",
    header: '<link rel="stylesheet" href="http://mysite.com/custom.css">'
});
~~~

- 또는 'style' 태그를 통해:

~~~js {3}
scheduler.exportToPDF({
    name: "calendar.pdf",
    header: '<style>... custom css classes here ...</style>'
});
~~~


위에서 언급한 솔루션은 전역 HTTP 참조에 대해 작동합니다. 내부망(Intranet) 또는 로컬 환경에서 CSS 클래스를 지정하는 경우, 모든 스타일을 아래와 같이 삽입할 수 있습니다:

~~~js
scheduler.exportToPDF({
    header: "<style>.tier1{background: red; color:white;}</style>"
});
~~~


## HTML 요소 내보내기

Scheduler를 PDF 형식으로 내보내는 동안, HTML 요소의 내보내기는 보안상의 이유로 제한될 수 있습니다.

일부 HTML 요소는 완전히 내보내기에 허용되지 않으며, 예로는 `<canvas>`, `<svg>`, `<script>` 및 Base64 이미지를 포함한 `src` 속성을 가진 이미지가 있습니다. 그러나 SVG 및 Base64 형식으로 이미지를 내보내는 안전한 방법이 있습니다:

- SVG 형식의 이미지 URL을 포함하는 `<img>` 요소를 사용할 수 있습니다( PNG 및 JPG 형식에 적합하지만 Base64 형식에는 작동하지 않음), 예:

~~~html
<img src="https://www.svgrepo.com/download/530597/hat.svg">
~~~

- 스타일 요소를 사용하고, 예를 들어 `background` 또는 `background-image`를 사용하며, 이미지의 URL 또는 Base64 형식의 이미지를 값으로 하는 `url` 속성을 지정할 수 있습니다( PNG/JPG/SVG 형식에 적합).

~~~css
.red {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH1ggDCwMADQ4NnwAAAFVJREFUGJWNkMEJADEIBEcbSDkXUnfSgnBVeZ8LSAjiwjyEQXSFEIcHGP9oAi+H0Bymgx9MhxbFdZE2a0s9kTZdw01ZhhYkABSwgmf1Z6r1SNyfFf4BZ+ZUExcNUQUAAAAASUVORK5CYII=") 100%/contain no-repeat;
    display: inline-block;
    width: 32px;
    height: 32px;
}
~~~


만약 내보내기 모듈이 있고 온라인 내보내기 서버에서 지원되지 않는 HTML 요소를 내보내야 하는 경우, 제한을 제거하기 위한 모듈 변경에 대한 지침을 받으려면 지원 요청을 제출할 수 있습니다. 다만 이 경우 서버가 XSS 공격에 취약해질 수 있다는 점을 염두에 두어야 합니다.