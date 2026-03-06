---
title: "导出为 PDF"
sidebar_label: "导出为 PDF"
---

# 导出为 PDF

*本文档适用于 dhtmlxScheduler 4.1 及以上版本的导出功能。如需 4.0 或更早版本，请参阅[此指南](export/pdf-legacy.md)。*

自 4.1 版本起，dhtmlxScheduler 提供了一种新的方式，通过[在线导出服务](export/pdf.md#defaultexporttopdf)将调度器导出为 PDF 文件。

:::note
该服务可免费使用，但在 GPL 许可下生成的 PDF 会带有库的水印。购买许可证后，在有效的支持期内（所有 PRO 许可证为 12 个月），水印将被移除。
:::

## 使用导出服务 {#usingexportservices}

有多种导出服务可用，可以在本地安装用于将 Scheduler 导出为 PDF。

请注意，导出服务与 Scheduler 包是分开的。如需了解使用条款，请参阅[相关文档](https://dhtmlx.com/docs/products/dhtmlxScheduler/export.shtml)。

## 请求大小限制 {#limitsonrequestsize}

API 端点 <b>*https://export.dhtmlx.com/scheduler*</b> 处理导出请求（如 *exportToPDF*、*exportToPNG* 等）。最大允许请求大小为 **10 MB**。

## 默认导出为 PDF {#defaultexporttopdf}

要将调度器导出为 PDF，请按照以下步骤操作:

- 通过 [plugins](api/method/plugins.md) 方法启用 <b>export_api</b> 插件:

~~~js
scheduler.plugins({
      export_api: true
});
~~~

:::note
对于 7.0 之前的 Scheduler 版本，需要在页面中引入 **https://export.dhtmlx.com/scheduler/api.js** 脚本以启用在线导出服务，例如:

~~~js
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>
~~~
:::

- 使用 <a href="#parametersoftheexportmethod">exportToPDF</a> 方法进行导出:

~~~html
<input value="Export to PDF" type="button" onclick='scheduler.exportToPDF()'>/*!*/
~~~


[Export to PDF/PNG](https://docs.dhtmlx.com/scheduler/samples/04_export/06_online_export.html)


## 导出方法的参数 {#parametersoftheexportmethod}

[exportToPDF()](api/method/exporttopdf.md) 方法可接受一个可选的对象参数，包含多种属性:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) 导出 PDF 的文件名</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>format</b></td>
  <td>(<i>'A0', 'A1', 'A2', 'A3', 'A4', 'A5'</i>) PDF 输出的纸张尺寸</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>orientation</b></td>
  <td>(<i>'portrait', 'landscape'</i>) PDF 页面的方向</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>zoom</b></td>
  <td>(<i>number</i>) PDF 输出的缩放级别</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) PDF 顶部包含的 HTML 内容</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) PDF 底部包含的 HTML 内容</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) 导出请求的 API 端点 URL。如果使用本地导出服务可设置此项。默认值为 <strong>https://export.dhtmlx.com/scheduler</strong></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>additional_settings</b></td>
  <td>(<i>object</i>) 其他导出选项，包括: <ul> <li><b>format</b> - (<i>string</i>) 输出文件格式:<i>'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'</i></li> <li><b>landscape</b> - (<i>boolean</i>) 页面方向，仅在指定 "format" 时适用</li> <li><b>width</b> - (<i>string|number|"content"</i>) 输出页面宽度，多页导出时有效</li> <li><b>height</b> - (<i>string|number|"content"</i>) 输出页面高度，多页导出时有效</li> </ul></td>
  </tr>
  </tbody>
</table>


~~~js title="调用 exportToPDF 并带参数的示例"
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

## 输出文件名 {#nameoftheoutputfile}

如需自定义导出 PDF 的文件名，请在 [exportToPDF](export/pdf.md#parametersoftheexportmethod) 参数中的 **name** 属性设置:

~~~js
scheduler.exportToPDF({
    name:"my_beautiful_scheduler.pdf"/*!*/
});
~~~

## 输出文件的页眉/页脚 {#headerfooteroftheoutputfile}

可以通过 [exportToPDF](export/pdf.md#parametersoftheexportmethod) 参数中的 **header** 和 **footer** 属性为导出的 PDF 添加页眉和页脚:

:::note
这些属性中可以使用任意 HTML。插入图片时，请确保 "src" 属性为绝对 URL。
:::

~~~js
scheduler.exportToPDF({
    name:"myscheduler.pdf",
    header:"<h1>My company</h1>",/*!*/
    footer:"<h4>Bottom line</h4>"/*!*/
});
~~~

## 输出文件的自定义样式 {#customstylefortheoutputfile}

可通过引入包含自定义 CSS 类的样式表来应用自定义样式:

- 通过链接外部样式表:

~~~js
scheduler.exportToPDF({
    name:"calendar.pdf",
    header:'<link rel="stylesheet" href="http://mysite.com/custom.css">' /*!*/
});
~~~

- 或者通过在 `<style>` 标签内嵌入样式:

~~~js
scheduler.exportToPDF({
    name:"calendar.pdf",
    header:'<style>... custom css classes here ...</style>' /*!*/
});
~~~

请注意，此方式仅适用于全网可访问的 HTTP URL。对于本地或内网环境，可直接在 header 中嵌入所有样式，例如:

~~~js
scheduler.exportToPDF({
    header:"<style>.tier1{background: red; color:white;}</style>"
});
~~~

## 导出 HTML 元素 {#exportinghtmlelements}

将 Scheduler 导出为 PDF 时，出于安全考虑，对 HTML 元素存在一些限制。

某些元素如 `<canvas>`、`<svg>`、`<script>` 以及 Base64 编码的 *src* 属性图片并不完全支持。但对于导出 SVG 和 Base64 格式图片有安全的替代方式:

- 使用 `<img>` 标签，*src* 属性指向 SVG 图片 URL（适用于 PNG 和 JPG 导出，不适用于 Base64），例如:

~~~html
<img src="https://www.svgrepo.com/download/530597/hat.svg">
~~~

- 使用 CSS 样式，如 *background* 或 *background-image*，通过 `url()` 指向图片 URL 或 Base64 字符串（适用于 PNG、JPG 和 SVG）:

~~~css
.red {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH1ggDCwMADQ4NnwAAAFVJREFUGJWNkMEJADEIBEcbSDkXUnfSgnBVeZ8LSAjiwjyEQXSFEIcHGP9oAi+H0Bymgx9MhxbFdZE2a0s9kTZdw01ZhhYkABSwgmf1Z6r1SNyfFf4BZ+ZUExcNUQUAAAAASUVORK5CYII=") 100%/contain no-repeat;
    display: inline-block;
    width: 32px;
    height: 32px;
}
~~~

如果您有自定义的导出模块，并且需要导出不受支持的 HTML 元素，可以联系技术支持获取如何修改模块以绕过限制的建议。但请注意，这样做可能会使服务器面临 XSS 安全风险。
