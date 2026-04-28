---
title: "PNG로 내보내기"
sidebar_label: "PNG로 내보내기"
---

# PNG로 내보내기

버전 4.1부터 dhtmlxScheduler는 [온라인 내보내기 서비스](export/png.md#default-export-to-png)를 제공하여 스케줄러를 PNG 형식으로 내보낼 수 있습니다.

:::info
서비스는 무료이지만, 출력 PNG 파일에는 GPL 라이선스에 따른 라이브러리 워터마크가 포함됩니다. 라이선스를 구매하시면 유효한 지원 기간(모든 PRO 라이선스의 경우 12개월) 동안 워터마크 없이 내보내기 결과를 사용할 수 있습니다.
:::

## 내보내기 서비스 사용하기

여러 내보내기 서비스가 있습니다. 로컬 컴퓨터에 설치한 뒤 Scheduler를 PNG로 로컬 내보내기가 가능합니다.

내보내기 서비스는 Scheduler 패키지에 포함되어 있지 않습니다. 각 서비스의 이용 약관을 알아보려면 해당 기사([corresponding article](https://dhtmlx.com/docs/products/dhtmlxScheduler/export.shtml))를 읽으세요.

## 요청 크기 제한

공통 API 엔드포인트 **https://export.dhtmlx.com/scheduler** 는 내보내기 방법들(exportToPDF, exportToPNG 등)을 제공합니다. **최대 요청 크기 10 MB**입니다.

## 기본 PNG 내보내기

스케줄러를 PNG 이미지로 내보내려면 다음 단계를 따라야 합니다:

- 온라인 내보내기 서비스를 사용하려면 [plugins](api/method/plugins.md) 방법을 통해 <b>export_api</b> 플러그인을 활성화하세요:

~~~js
scheduler.plugins({
      export_api: true
});
~~~

:::note
Scheduler 버전이 7.0 미만인 경우, 온라인 내보내기 서비스를 활성화하려면 페이지에 https://export.dhtmlx.com/scheduler/api.js 파일을 포함해야 합니다. 예를 들면:

~~~js
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>
~~~
:::

- 스케줄러를 PNG로 내보내려면 exportToPNG 메서드를 호출하세요:

~~~html
<input value="Export to PNG" type="button" onclick='scheduler.exportToPNG()'>/*!*/
~~~

[Export to PDF/PNG](https://docs.dhtmlx.com/scheduler/samples/04_export/06_online_export.html)

## export 메서드의 매개변수

[exportToPNG()](api/method/exporttopng.md) 메서드는 여러 속성을 가진 객체를 매개로 받습니다(모든 속성은 선택적입니다):

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) 출력 파일의 이름</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>format</b></td>
  <td>(<i>'A0', 'A1', 'A2', 'A3', 'A4', 'A5'</i>) 출력 PNG 이미지의 형식 </td>
  <td class="webixdoc_links0"><b>orientation</b></td>
  <td>(<i>'portrait', 'landscape'</i>) 출력 PNG 이미지의 방향을 설정합니다</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>zoom</b></td>
  <td>(<i>number</i>) 출력 PNG 이미지의 확대 계수를 설정합니다</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) 출력 PNG 이미지에 추가될 머리글을 지정합니다. 여기서는 임의의 HTML을 사용할 수 있습니다</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) 출력 PNG 이미지에 추가될 바닥글을 지정합니다. 여기서는 임의의 HTML을 사용할 수 있습니다</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) 요청의 API 엔드포인트를 설정합니다. 로컬로 내보내기 서비스를 설치한 경우에도 사용할 수 있습니다. 기본값은 <strong>https://export.dhtmlx.com/scheduler</strong></td>
  </tr>
  </tbody>
</table>

옵션 속성으로 export 메서드 호출:
~~~js
scheduler.exportToPNG({
    format:"A4",
    orientation:"portrait",
    zoom:1,
    header:"<h1>My company</h1>",
    footer:"<h4>Bottom line</h4>",
    server:"https://myapp.com/myexport/scheduler"
});
~~~

## 출력 파일의 이름

출력 파일에 대해 사용자 정의 이름을 설정하려면 [exportToPNG](export/png.md#parameters-of-the-export-method) 메서드에서 **name** 속성을 사용하세요:

~~~js
scheduler.exportToPNG({
    name:"my_beautiful_scheduler.png"/*!*/
});
~~~

## 출력 파일의 Header/Footer

출력 PNG 파일에 header/footer를 추가하려면 [exportToPNG](export/png.md#parameters-of-the-export-method) 메서드의 **header**/**footer** 속성을 사용하세요:

:::note
참고, 매개변수를 지정할 때 임의의 HTML을 사용할 수 있습니다. 이미지를 지정할 때는 "src" 속성의 경로를 전역 경로로 설정해야 한다는 점을 기억하세요.
:::

~~~js
scheduler.exportToPNG({
    name:"myscheduler.png",
    header:"<h1>My company</h1>",
    footer:"<h4>Bottom line</h4>"
});
~~~

## 출력 파일의 커스텀 스타일

스케줄러에 사용자 정의 스타일을 적용하려면, 사용자 정의 CSS 클래스를 포함한 스타일시트를 제공하세요:

- 링크를 통해:

~~~js
scheduler.exportToPNG({
    name:"calendar.png",
    header:'<link rel="stylesheet" href="http://mysite.com/custom.css">' /*!*/
});
~~~

- 또는 'style' 태그를 통해:

~~~js
scheduler.exportToPNG({
    name:"calendar.png",
    header:'<style>... custom css classes here ...</style>' /*!*/
});
~~~

참고: 앞서 언급한 솔루션은 전역 HTTP 참조에 대해 작동합니다. 사내(Intranet) 또는 로컬 환경에서 CSS 클래스를 지정한 경우에도 모든 스타일을 내장시키는 방식으로 사용할 수 있습니다:

~~~js
scheduler.exportToPNG({
    header:"<style>.tier1{   background: red;   color:white;}</style>"
});
~~~

## HTML 요소 내보내기

스케줄러를 PNG 형식으로 내보낼 때, HTML 요소의 내보내기는 보안상의 이유로 제한될 수 있습니다.

내보낼 수 없는 요소로는 예를 들면 `<canvas>`, `<svg>`, `<script>` 및 Base64 이미지가 포함된 src 속성을 가진 이미지가 있습니다. 다만 SVG 및 Base64 형식으로 이미지를 내보내는 안전한 방법이 있습니다:

- 이미지의 URL이 SVG 형식인 <img> 요소의 src 속성을 사용할 수 있습니다(PNG 및 JPG 형식에 적합하지만 Base64 형식에는 작동하지 않음), 예:

~~~html
<img src="https://www.svgrepo.com/download/530597/hat.svg">
~~~

- 스타일 요소를 사용하고, background 또는 background-image 와 같은 속성을 사용하여 이미지의 URL이나 Base64 형식의 이미지를 값으로 지정할 수 있습니다( PNG/JPG/SVG 형식에 적합)

~~~css
.red {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH1ggDCwMADQ4NnwAAAFVJREFUGJWNkMEJADEIBEcbSDkXUnfSgnBVeZ8LSAjiwjyEQXSFEIcHGP9oAi+H0Bymgx9MhxbFdZE2a0s9kTZdw01ZhhYkABSwgmf1Z6r1SNyfFf4BZ+ZUExcNUQUAAAAASUVORK5CYII=") 100%/contain no-repeat;
    display: inline-block;
    width: 32px;
    height: 32px;
}
~~~

웹 서버에 의해 허용되지 않는 HTML 요소를 온라인 내보내기 서버에서 내보내야 하는 경우, 모듈에 대한 지원 요청을 제출하여 제한을 제거하기 위해 필요한 변경에 대한 안내를 받을 수 있습니다. 다만 이 경우 서버가 XSS 공격에 취약해질 수 있다는 점을 감안해야 합니다.