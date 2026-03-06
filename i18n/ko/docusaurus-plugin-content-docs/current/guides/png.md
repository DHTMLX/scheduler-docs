---
title: "Export to PNG"
sidebar_label: "Export to PNG"
---

# Export to PNG 

버전 4.1부터 dhtmlxScheduler는 스케줄러를 PNG 이미지로 내보낼 수 있는 [온라인 내보내기 서비스](export/png.md#defaultexporttopng)를 제공합니다.

:::note
이 서비스는 무료로 제공되지만, 내보내진 PNG에는 GPL 라이선스 하에서 라이브러리의 워터마크가 포함됩니다. 라이선스를 구매하면, 활성 지원 기간(모든 PRO 라이선스의 경우 12개월) 동안 워터마크 없이 내보내기가 가능합니다.
:::

## 내보내기 서비스 사용하기 {#usingexportservices}

여러 가지 내보내기 서비스를 사용할 수 있습니다. 온라인 서비스에 의존하지 않고 PNG로 Scheduler를 내보내기 위해 로컬에 설치할 수도 있습니다.

내보내기 서비스는 Scheduler 패키지에 포함되어 있지 않습니다. 각 서비스의 사용 조건에 대한 자세한 내용은 [관련 문서](https://dhtmlx.com/docs/products/dhtmlxScheduler/export.shtml)를 참고하세요.

## 요청 크기 제한 {#limitsonrequestsize} 

모든 내보내기 메서드(*exportToPDF*, *exportToPNG* 등)는 공통 API 엔드포인트 **https://export.dhtmlx.com/scheduler**를 사용합니다. 허용되는 최대 요청 크기는 **10 MB**입니다.

## 기본 PNG 내보내기 {#defaultexporttopng}
---------------------- 

스케줄러를 PNG 이미지로 내보내려면 다음 단계를 따라주세요:

- <b>export_api</b> 플러그인을 [plugins](api/method/plugins.md) 메서드를 사용하여 활성화합니다:

~~~js
scheduler.plugins({
      export_api: true
});
~~~

:::note
Scheduler 7.0 미만 버전의 경우, 온라인 내보내기 서비스를 활성화하려면 **https://export.dhtmlx.com/scheduler/api.js** 스크립트를 페이지에 포함해야 합니다. 예시:

~~~js
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>
~~~
:::

- <a href="#parametersoftheexportmethod">exportToPNG</a> 메서드를 사용하여 내보내기를 실행합니다:

~~~html
<input value="Export to PNG" type="button" onclick='scheduler.exportToPNG()'>/*!*/
~~~


[Export to PDF/PNG](https://docs.dhtmlx.com/scheduler/samples/04_export/06_online_export.html)


## 내보내기 메서드의 파라미터 {#parametersoftheexportmethod}

[exportToPNG()](api/method/exporttopng.md) 메서드는 여러 가지 선택적 속성을 가진 객체를 인자로 받을 수 있습니다:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) 출력 파일의 이름을 지정합니다</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>format</b></td>
  <td>(<i>'A0', 'A1', 'A2', 'A3', 'A4', 'A5'</i>) 출력 PNG 이미지의 포맷을 설정합니다</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>orientation</b></td>
  <td>(<i>'portrait', 'landscape'</i>) 출력 PNG 이미지의 방향을 설정합니다</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>zoom</b></td>
  <td>(<i>number</i>) 출력 PNG 이미지의 줌 레벨을 조절합니다</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) 출력 PNG 이미지에 헤더를 추가합니다. 여기에 어떤 HTML도 사용할 수 있습니다</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) 출력 PNG 이미지에 푸터를 추가합니다. 여기에 어떤 HTML도 사용할 수 있습니다</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) 내보내기 요청의 API 엔드포인트를 지정합니다. 로컬 내보내기 서비스를 사용하는 경우 유용합니다. 기본값은 <strong>https://export.dhtmlx.com/scheduler</strong>입니다</td>
  </tr>
  </tbody>
</table>


~~~js title="선택적 속성을 포함하여 내보내기 메서드를 호출하는 예시"
scheduler.exportToPNG({
    format:"A4",
    orientation:"portrait",
    zoom:1,
    header:"<h1>My company</h1>",
    footer:"<h4>Bottom line</h4>",
    server:"https://myapp.com/myexport/scheduler"
});
~~~

## 출력 파일 이름 지정 {#nameoftheoutputfile}

[exportToPNG](export/png.md#parametersoftheexportmethod) 메서드의 **name** 속성을 사용하여 내보내는 PNG의 파일명을 지정할 수 있습니다:

~~~js
scheduler.exportToPNG({
    name:"my_beautiful_scheduler.png"/*!*/
});
~~~

## 출력 파일의 헤더/푸터 {#headerfooteroftheoutputfile}

[exportToPNG](export/png.md#parametersoftheexportmethod) 메서드의 **header** 및 **footer** 속성을 사용하여 출력 PNG에 헤더나 푸터를 포함할 수 있습니다:

:::note
여기에는 어떤 HTML도 삽입할 수 있습니다. 이미지를 포함할 때는 "src" 속성에 전역 URL을 사용해야 합니다.
:::

~~~js
scheduler.exportToPNG({
    name:"myscheduler.png",
    header:"<h1>My company</h1>",
    footer:"<h4>Bottom line</h4>"
});
~~~

## 출력 파일에 커스텀 스타일 적용 {#customstylefortheoutputfile}

내보내는 스케줄러에 커스텀 스타일을 적용하려면 다음 방법 중 하나로 CSS를 추가하세요:

- 스타일시트 링크 포함:

~~~js
scheduler.exportToPNG({
    name:"calendar.png",
    header:'<link rel="stylesheet" href="http://mysite.com/custom.css">' /*!*/
});
~~~

- 또는 'style' 태그로 스타일을 직접 삽입:

~~~js
scheduler.exportToPNG({
    name:"calendar.png",
    header:'<style>... custom css classes here ...</style>' /*!*/
});
~~~

CSS가 로컬이나 인트라넷에 있다면 모든 스타일을 인라인으로 삽입할 수 있습니다:

~~~js
scheduler.exportToPNG({
    header:"<style>.tier1{   background: red;   color:white;}</style>"
});
~~~

## HTML 요소 내보내기 {#exportinghtmlelements}

Scheduler를 PNG로 내보낼 때, 보안상의 이유로 일부 HTML 요소의 내보내기는 제한됩니다.

`<canvas>`, `<svg>`, `<script>`와 Base64 *src* 속성을 가진 이미지와 같은 요소는 완전히 지원되지 않습니다. 하지만 SVG 및 Base64 형식의 이미지를 포함하는 안전한 방법이 있습니다:

- *src* 속성에 SVG 이미지 URL을 지정한 `<img>` 태그 사용 (PNG 및 JPG 내보내기에서는 동작하지만 Base64 내보내기에서는 동작하지 않습니다):

~~~html
<img src="https://www.svgrepo.com/download/530597/hat.svg">
~~~

- CSS의 *background* 또는 *background-image*에 이미지 URL 또는 Base64 인코딩 이미지를 사용하는 방법(PNG/JPG/SVG 내보내기에서 동작):

~~~css
.red {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH1ggDCwMADQ4NnwAAAFVJREFUGJWNkMEJADEIBEcbSDkXUnfSgnBVeZ8LSAjiwjyEQXSFEIcHGP9oAi+H0Bymgx9MhxbFdZE2a0s9kTZdw01ZhhYkABSwgmf1Z6r1SNyfFf4BZ+ZUExcNUQUAAAAASUVORK5CYII=") 100%/contain no-repeat;
    display: inline-block;
    width: 32px;
    height: 32px;
}
~~~

자체 내보내기 모듈을 사용하고 있고 온라인 내보내기 서버에서 지원하지 않는 HTML 요소를 내보내야 한다면, 지원팀에 문의하여 해당 제한을 제거하는 방법에 대해 안내를 받을 수 있습니다. 단, 이렇게 하면 서버가 XSS 취약성에 노출될 수 있다는 점을 염두에 두세요.
